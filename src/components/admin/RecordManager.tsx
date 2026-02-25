"use client";

import { useState } from "react";
import { TrackRecord } from "@/types";
import { saveRecord, deleteRecord } from "@/app/actions/recordActions";
import { Trash2, Plus, Edit2, X, Save, Upload, Loader2, Image as ImageIcon } from "lucide-react";

const isYouTube = (url: string) => {
    if (!url) return false;
    return url.includes('youtube.com') || url.includes('youtu.be');
};

const getYouTubeEmbedUrl = (url: string) => {
    let videoId = '';
    try {
        if (url.includes('youtu.be/')) {
            videoId = url.split('youtu.be/')[1].split('?')[0];
        } else if (url.includes('youtube.com/watch')) {
            videoId = new URL(url).searchParams.get('v') || '';
        } else if (url.includes('youtube.com/embed/')) {
            videoId = url.split('youtube.com/embed/')[1].split('?')[0];
        } else if (url.includes('youtube.com/shorts/')) {
            videoId = url.split('youtube.com/shorts/')[1].split('?')[0];
        }
    } catch (e) {
        console.error("Error parsing YouTube URL", e);
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
};

interface RecordManagerProps {
    initialRecords: TrackRecord[];
}

export function RecordManager({ initialRecords }: RecordManagerProps) {
    const [records, setRecords] = useState<TrackRecord[]>(initialRecords);
    const [isEditing, setIsEditing] = useState(false);
    const [currentRecord, setCurrentRecord] = useState<Partial<TrackRecord>>({});
    const [uploading, setUploading] = useState(false);
    const [uploadingVideo, setUploadingVideo] = useState(false);

    const getTypeLabel = (type: string) => {
        const labels: Record<string, string> = {
            Factory: "工廠類型",
            Residential: "住宅類型",
            School: "學校類型",
            Other: "其他",
            Flexible: "輕量化軟式太陽能",
            Bifacial: "立面雙面發電系統",
            Movable: "移動式與易拆遷系統",
            BIPV: "BIPV 建築整合太陽能/防水型太陽能"
        };
        return labels[type] || type;
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        setUploading(true);
        try {
            const uploadedUrls: string[] = [];
            for (const file of files) {
                const formData = new FormData();
                formData.append("file", file);
                const res = await fetch("/api/upload", {
                    method: "POST",
                    body: formData,
                });

                if (!res.ok) throw new Error("Upload failed");

                const data = await res.json();
                uploadedUrls.push(data.url);
            }

            setCurrentRecord((prev) => {
                let newImage = prev.image;
                let newImages = [...(prev.images || [])];

                for (const url of uploadedUrls) {
                    if (!newImage) {
                        newImage = url;
                    } else {
                        newImages.push(url);
                    }
                }
                return { ...prev, image: newImage, images: newImages };
            });
        } catch (error) {
            console.error("Upload error:", error);
            alert("圖片上傳失敗，請重試");
        } finally {
            setUploading(false);
        }
    };

    const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadingVideo(true);
        try {
            const formData = new FormData();
            formData.append("file", file);
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) throw new Error("Upload failed");

            const data = await res.json();
            setCurrentRecord(prev => {
                const updatedVideos = [...(prev.videos || []), data.url];
                return { ...prev, videos: updatedVideos };
            });
        } catch (error) {
            console.error("Video upload error:", error);
            alert("影片上傳失敗，請重試");
        } finally {
            setUploadingVideo(false);
        }
    };

    const removeVideo = (indexToRemove: number) => {
        setCurrentRecord((prev) => {
            const allVideos = [...(prev.videos || [])];
            const updatedVideos = allVideos.filter((_, idx) => idx !== indexToRemove);

            return {
                ...prev,
                videos: updatedVideos
            };
        });
    };

    const removeImage = (indexToRemove: number) => {
        setCurrentRecord((prev) => {
            const allImages = [prev.image, ...(prev.images || [])].filter(Boolean) as string[];
            const updatedImages = allImages.filter((_, idx) => idx !== indexToRemove);

            return {
                ...prev,
                image: updatedImages.length > 0 ? updatedImages[0] : "",
                images: updatedImages.length > 1 ? updatedImages.slice(1) : []
            };
        });
    };

    const handleAddNew = () => {
        setIsEditing(true);
        setCurrentRecord({
            id: Date.now().toString(), // Simple ID generation
            type: "Factory",
            category: "New Buildings",
            title: "",
            location: "",
            capacity: "",
            year: new Date().getFullYear().toString(),
            image: "",
            images: [],
            videos: [],
        });
    };

    const handleEdit = (record: TrackRecord) => {
        setIsEditing(true);
        setCurrentRecord(record);
    };

    const handleDelete = async (id: string) => {
        if (confirm("確定要刪除此實績嗎？")) {
            await deleteRecord(id);
            setRecords(records.filter((r) => r.id !== id));
        }
    };

    const handleSave = async () => {
        if (!currentRecord.title || !currentRecord.location || !currentRecord.capacity) {
            alert("請填寫必要欄位");
            return;
        }

        // Ensure category always has a value before saving
        const recordToSave: TrackRecord = {
            ...currentRecord,
            category: currentRecord.category || "New Buildings",
            type: currentRecord.type || "Factory",
        } as TrackRecord;

        await saveRecord(recordToSave);

        // Optimistic update
        const existingIndex = records.findIndex((r) => r.id === currentRecord.id);
        if (existingIndex !== -1) {
            const newRecords = [...records];
            newRecords[existingIndex] = recordToSave;
            setRecords(newRecords);
        } else {
            setRecords([...records, recordToSave]);
        }

        setIsEditing(false);
        setCurrentRecord({});
    };

    return (
        <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h2 className="text-base font-semibold leading-6 text-gray-900">工程實績列表</h2>
                        <p className="mt-2 text-sm text-gray-700">管理所有工程實績資料</p>
                    </div>
                    <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                        <button
                            type="button"
                            onClick={handleAddNew}
                            className="block rounded-md bg-accent px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                        >
                            <Plus className="inline-block w-4 h-4 mr-1" />
                            新增實績
                        </button>
                    </div>
                </div>

                {isEditing && (
                    <div className="mt-6 bg-gray-50 p-4 rounded-md border border-gray-200">
                        <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label className="block text-sm font-medium leading-6 text-gray-900">標題</label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        value={currentRecord.title || ""}
                                        onChange={(e) => setCurrentRecord({ ...currentRecord, title: e.target.value })}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label className="block text-sm font-medium leading-6 text-gray-900">分類 (用於頁面篩選)</label>
                                <div className="mt-2">
                                    <select
                                        value={currentRecord.category || "New Buildings"}
                                        onChange={(e) => {
                                            const newCategory = e.target.value as any;
                                            setCurrentRecord({
                                                ...currentRecord,
                                                category: newCategory,
                                                type: newCategory === "Special" ? "Flexible" : "Factory"
                                            });
                                        }}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm sm:leading-6"
                                    >
                                        <option value="New Buildings">新建物</option>
                                        <option value="Revamping">汰舊換新</option>
                                        <option value="Consultancy">電力顧問</option>
                                        <option value="Self-Built">自建電廠/出租屋頂</option>
                                        <option value="Special">創新太陽能</option>
                                    </select>
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    {currentRecord.category === "Special" ? "類型" : "建築類型"}
                                </label>
                                <div className="mt-2">
                                    <select
                                        value={currentRecord.type || "Factory"}
                                        onChange={(e) => setCurrentRecord({ ...currentRecord, type: e.target.value as TrackRecord["type"] })}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm sm:leading-6"
                                    >
                                        {currentRecord.category === "Special" ? (
                                            <>
                                                <option value="Flexible">輕量化軟式太陽能</option>
                                                <option value="Bifacial">立面雙面發電系統</option>
                                                <option value="Movable">移動式與易拆遷系統</option>
                                                <option value="BIPV">BIPV 建築整合太陽能/防水型太陽能</option>
                                                <option value="Other">其他</option>
                                            </>
                                        ) : (
                                            <>
                                                <option value="Factory">工廠類型</option>
                                                <option value="Residential">住宅類型</option>
                                                <option value="School">學校類型</option>
                                                <option value="Other">其他</option>
                                            </>
                                        )}
                                    </select>
                                    {currentRecord.type === "Other" && (
                                        <input
                                            type="text"
                                            value={currentRecord.customType || ""}
                                            onChange={(e) => setCurrentRecord({ ...currentRecord, customType: e.target.value })}
                                            placeholder="請輸入其他類型說明 (非必填)"
                                            className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm sm:leading-6"
                                        />
                                    )}
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium leading-6 text-gray-900">地點</label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        value={currentRecord.location || ""}
                                        onChange={(e) => setCurrentRecord({ ...currentRecord, location: e.target.value })}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium leading-6 text-gray-900">容量</label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        value={currentRecord.capacity || ""}
                                        onChange={(e) => setCurrentRecord({ ...currentRecord, capacity: e.target.value })}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium leading-6 text-gray-900">年份</label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        value={currentRecord.year || ""}
                                        onChange={(e) => setCurrentRecord({ ...currentRecord, year: e.target.value })}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-6">
                                <label className="block text-sm font-medium leading-6 text-gray-900">圖片</label>
                                <div className="mt-2 flex flex-col gap-y-4">
                                    <div className="flex flex-wrap gap-4">
                                        {[currentRecord.image, ...(currentRecord.images || [])].filter(Boolean).map((img, idx) => (
                                            <div key={idx} className="relative w-32 h-24 rounded-lg overflow-hidden border border-gray-200">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img src={img as string} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(idx)}
                                                    className="absolute top-1 right-1 p-1 bg-white rounded-full shadow-sm hover:bg-gray-100 z-10"
                                                >
                                                    <X className="w-3 h-3 text-gray-500" />
                                                </button>
                                                {idx === 0 && (
                                                    <span className="absolute bottom-0 inset-x-0 bg-black/50 text-white text-[10px] text-center py-0.5">
                                                        封面照片
                                                    </span>
                                                )}
                                            </div>
                                        ))}

                                        <div className="w-32 h-24 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors">
                                            <label
                                                htmlFor="file-upload"
                                                className="relative cursor-pointer w-full h-full flex flex-col items-center justify-center"
                                            >
                                                {uploading ? (
                                                    <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
                                                ) : (
                                                    <Plus className="w-6 h-6 text-gray-400" />
                                                )}
                                                <span className="mt-2 block text-xs font-medium text-gray-900">
                                                    {uploading ? "上傳中..." : "上傳圖片"}
                                                </span>
                                                <input
                                                    id="file-upload"
                                                    name="file-upload"
                                                    type="file"
                                                    multiple
                                                    className="sr-only"
                                                    accept="image/*"
                                                    onChange={handleImageUpload}
                                                    disabled={uploading}
                                                />
                                            </label>
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-500">支援上傳多張圖片 (PNG, JPG, GIF up to 10MB)。第一張將作為封面照片顯示。</p>

                                    <div>
                                        <input
                                            type="text"
                                            value={currentRecord.image || ""}
                                            onChange={(e) => setCurrentRecord({ ...currentRecord, image: e.target.value })}
                                            placeholder="或直接輸入封面圖片網址..."
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm sm:leading-6 text-xs"
                                        />
                                    </div>
                                </div>
                            </div>
                            <label className="block text-sm font-medium leading-6 text-gray-900">影片 (選填)</label>
                            <div className="mt-2 flex flex-col gap-y-4">
                                {currentRecord.videos && currentRecord.videos.length > 0 && (
                                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                                        {currentRecord.videos.map((vid, index) => (
                                            <div key={index} className="relative w-full rounded-lg overflow-hidden border border-gray-200 bg-black aspect-video group">
                                                {isYouTube(vid) ? (
                                                    <iframe
                                                        src={getYouTubeEmbedUrl(vid)}
                                                        className="w-full h-full object-contain"
                                                        title="YouTube video player"
                                                    />
                                                ) : (
                                                    <video src={vid} controls className="w-full h-full object-contain" />
                                                )}
                                                <button
                                                    type="button"
                                                    onClick={() => removeVideo(index)}
                                                    className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-red-500 text-white rounded-full transition-colors z-10 backdrop-blur-sm opacity-0 group-hover:opacity-100"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div className="w-full sm:max-w-xs border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center p-6 bg-gray-50 hover:bg-gray-100 transition-colors">
                                    <label
                                        htmlFor="video-upload"
                                        className="relative cursor-pointer w-full flex flex-col items-center justify-center"
                                    >
                                        {uploadingVideo ? (
                                            <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
                                        ) : (
                                            <Upload className="w-8 h-8 text-gray-400" />
                                        )}
                                        <span className="mt-2 block text-sm font-medium text-gray-900">
                                            {uploadingVideo ? "上傳中..." : "上傳影片"}
                                        </span>
                                        <input
                                            id="video-upload"
                                            name="video-upload"
                                            type="file"
                                            className="sr-only"
                                            accept="video/*"
                                            onChange={handleVideoUpload}
                                            disabled={uploadingVideo}
                                        />
                                    </label>
                                </div>
                                <p className="text-xs text-gray-500">支援 MP4, WebM 格式。可上傳多部影片。</p>

                                <div>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            id="new-video-url"
                                            placeholder="或直接輸入影片網址新增..."
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm sm:leading-6 text-xs"
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    const target = e.target as HTMLInputElement;
                                                    if (target.value) {
                                                        const url = target.value;
                                                        setCurrentRecord(prev => ({ ...prev, videos: [...(prev.videos || []), url] }));
                                                        target.value = '';
                                                    }
                                                }
                                            }}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const input = document.getElementById('new-video-url') as HTMLInputElement;
                                                if (input && input.value) {
                                                    const url = input.value;
                                                    setCurrentRecord(prev => ({ ...prev, videos: [...(prev.videos || []), url] }));
                                                    input.value = '';
                                                }
                                            }}
                                            className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                        >
                                            <Plus className="h-4 w-4 text-gray-400" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 flex gap-x-3 justify-end">
                            <button
                                type="button"
                                onClick={() => { setIsEditing(false); setCurrentRecord({}); }}
                                className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            >
                                <X className="inline-block w-4 h-4 mr-1" />
                                取消
                            </button>
                            <button
                                type="button"
                                onClick={handleSave}
                                className="rounded-md bg-accent px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500"
                            >
                                <Save className="inline-block w-4 h-4 mr-1" />
                                儲存
                            </button>
                        </div>
                    </div>
                )}

                <div className="mt-8 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead>
                                    <tr>
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">標題</th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">類型</th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">地點</th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">容量</th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">圖片/影片</th>
                                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                            <span className="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {records.map((record) => (
                                        <tr key={record.id}>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">{record.title}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{record.category || "-"}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {record.type === "Other" && record.customType
                                                    ? `${getTypeLabel(record.type)} (${record.customType})`
                                                    : getTypeLabel(record.type)}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{record.location}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{record.capacity}</td>
                                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                                <button
                                                    onClick={() => handleEdit(record)}
                                                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(record.id)}
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}
