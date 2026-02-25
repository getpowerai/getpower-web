"use client";

import { useState } from "react";
import { CaseStudy } from "@/types";
import { saveCase, deleteCase } from "@/app/actions/caseActions";
import { Trash2, Plus, Edit2, X, Save, Upload, Loader2, Image as ImageIcon } from "lucide-react";

interface CaseManagerProps {
    initialCases: CaseStudy[];
}

export function CaseManager({ initialCases }: CaseManagerProps) {
    const [cases, setCases] = useState<CaseStudy[]>(initialCases);
    const [isEditing, setIsEditing] = useState(false);
    const [currentCase, setCurrentCase] = useState<Partial<CaseStudy>>({});
    const [uploading, setUploading] = useState(false);

    const handleAddNew = () => {
        setIsEditing(true);
        setCurrentCase({
            id: Date.now().toString(),
            title: "",
            clientName: "",
            location: "",
            description: "",
            challenge: "",
            solution: "",
            result: "",
            category: "New Buildings",
            images: [],
        });
    };

    const handleEdit = (c: CaseStudy) => {
        setIsEditing(true);
        setCurrentCase(c);
    };

    const handleDelete = async (id: string) => {
        if (confirm("確定要刪除此個案嗎？")) {
            await deleteCase(id);
            setCases(cases.filter((c) => c.id !== id));
        }
    };

    // Helper to extract YouTube ID
    const getYouTubeId = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) throw new Error("Upload failed");

            const data = await res.json();
            const currentImages = currentCase.images || [];
            setCurrentCase((prev) => ({ ...prev, images: [...currentImages, data.url] }));
        } catch (error) {
            console.error("Upload error:", error);
            alert("圖片上傳失敗，請重試");
        } finally {
            setUploading(false);
        }
    };

    const removeImage = (indexToRemove: number) => {
        const currentImages = currentCase.images || [];
        setCurrentCase((prev) => ({
            ...prev,
            images: currentImages.filter((_, index) => index !== indexToRemove)
        }));
    };

    const handleSave = async () => {
        if (!currentCase.title || !currentCase.location) {
            alert("請填寫必要欄位 (標題、地點)");
            return;
        }

        await saveCase(currentCase as CaseStudy);

        // Optimistic update
        const existingIndex = cases.findIndex((c) => c.id === currentCase.id);
        if (existingIndex !== -1) {
            const newCases = [...cases];
            newCases[existingIndex] = currentCase as CaseStudy;
            setCases(newCases);
        } else {
            setCases([...cases, currentCase as CaseStudy]);
        }

        setIsEditing(false);
        setCurrentCase({});
    };

    return (
        <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h2 className="text-base font-semibold leading-6 text-gray-900">精選個案列表</h2>
                        <p className="mt-2 text-sm text-gray-700">管理精選個案資料</p>
                    </div>
                    <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                        <button
                            type="button"
                            onClick={handleAddNew}
                            className="block rounded-md bg-accent px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                        >
                            <Plus className="inline-block w-4 h-4 mr-1" />
                            新增個案
                        </button>
                    </div>
                </div>

                {isEditing && (
                    <div className="mt-6 bg-gray-50 p-4 rounded-md border border-gray-200">
                        <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                            {/* Basic Info */}
                            <div className="sm:col-span-3">
                                <label className="block text-sm font-medium leading-6 text-gray-900">標題</label>
                                <input
                                    type="text"
                                    value={currentCase.title || ""}
                                    onChange={(e) => setCurrentCase({ ...currentCase, title: e.target.value })}
                                    className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm sm:leading-6"
                                />
                            </div>
                            <div className="sm:col-span-3">
                                <label className="block text-sm font-medium leading-6 text-gray-900">客戶名稱</label>
                                <input
                                    type="text"
                                    value={currentCase.clientName || ""}
                                    onChange={(e) => setCurrentCase({ ...currentCase, clientName: e.target.value })}
                                    className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm sm:leading-6"
                                />
                            </div>
                            <div className="sm:col-span-3">
                                <label className="block text-sm font-medium leading-6 text-gray-900">地點</label>
                                <input
                                    type="text"
                                    value={currentCase.location || ""}
                                    onChange={(e) => setCurrentCase({ ...currentCase, location: e.target.value })}
                                    className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm sm:leading-6"
                                />
                            </div>
                            <div className="sm:col-span-3">
                                <label className="block text-sm font-medium leading-6 text-gray-900">分類</label>
                                <select
                                    value={currentCase.category || "New Buildings"}
                                    onChange={(e) => setCurrentCase({ ...currentCase, category: e.target.value as any })}
                                    className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm sm:leading-6"
                                >
                                    <option value="New Buildings">新建物</option>
                                    <option value="Revamping">汰舊換新</option>
                                    <option value="Consultancy">電力顧問</option>
                                    <option value="Self-Built">自建電廠/出租屋頂</option>
                                    <option value="Special">創新太陽能</option>
                                </select>
                            </div>

                            {/* Descriptions */}
                            <div className="sm:col-span-6">
                                <label className="block text-sm font-medium leading-6 text-gray-900">簡介</label>
                                <textarea
                                    value={currentCase.description || ""}
                                    onChange={(e) => setCurrentCase({ ...currentCase, description: e.target.value })}
                                    rows={2}
                                    className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm sm:leading-6"
                                />
                            </div>
                            <div className="sm:col-span-6">
                                <label className="block text-sm font-medium leading-6 text-gray-900">挑戰</label>
                                <textarea
                                    value={currentCase.challenge || ""}
                                    onChange={(e) => setCurrentCase({ ...currentCase, challenge: e.target.value })}
                                    rows={2}
                                    className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm sm:leading-6"
                                />
                            </div>
                            <div className="sm:col-span-6">
                                <label className="block text-sm font-medium leading-6 text-gray-900">解決方案</label>
                                <textarea
                                    value={currentCase.solution || ""}
                                    onChange={(e) => setCurrentCase({ ...currentCase, solution: e.target.value })}
                                    rows={2}
                                    className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm sm:leading-6"
                                />
                            </div>
                            <div className="sm:col-span-6">
                                <label className="block text-sm font-medium leading-6 text-gray-900">成果</label>
                                <textarea
                                    value={currentCase.result || ""}
                                    onChange={(e) => setCurrentCase({ ...currentCase, result: e.target.value })}
                                    rows={2}
                                    className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm sm:leading-6"
                                />
                            </div>

                            {/* Images */}
                            <div className="sm:col-span-6">
                                <label className="block text-sm font-medium leading-6 text-gray-900">圖片 (可多選)</label>
                                <div className="mt-2 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                                    {currentCase.images?.map((img, index) => (
                                        <div key={index} className="relative aspect-[4/3] rounded-lg overflow-hidden border border-gray-200 group">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={img} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(index)}
                                                className="absolute top-1 right-1 p-1 bg-white rounded-full shadow-sm hover:bg-red-50 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                    <label className="relative aspect-[4/3] cursor-pointer rounded-lg border-2 border-dashed border-gray-300 hover:border-accent flex flex-col items-center justify-center bg-gray-50 hover:bg-yellow-50 transition-colors">
                                        {uploading ? (
                                            <Loader2 className="w-8 h-8 text-accent animate-spin" />
                                        ) : (
                                            <>
                                                <Upload className="w-8 h-8 text-gray-400" />
                                                <span className="mt-2 text-xs text-gray-500">上傳圖片</span>
                                            </>
                                        )}
                                        <input
                                            type="file"
                                            className="sr-only"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            disabled={uploading}
                                        />
                                    </label>
                                </div>
                            </div>

                            {/* YouTube Video */}
                            <div className="sm:col-span-6">
                                <label className="block text-sm font-medium leading-6 text-gray-900">YouTube 影片連結 (選填)</label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        value={currentCase.youtubeUrl || ""}
                                        onChange={(e) => setCurrentCase({ ...currentCase, youtubeUrl: e.target.value })}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm sm:leading-6"
                                        placeholder="https://www.youtube.com/watch?v=..."
                                    />
                                </div>
                                {currentCase.youtubeUrl && (
                                    <div className="mt-2 relative aspect-video rounded-lg overflow-hidden bg-black">
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            src={`https://www.youtube.com/embed/${getYouTubeId(currentCase.youtubeUrl)}`}
                                            title="YouTube video player"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                )}
                            </div>

                            {/* Video Description */}
                            <div className="sm:col-span-6">
                                <label className="block text-sm font-medium leading-6 text-gray-900">影片簡要說明</label>
                                <div className="mt-2">
                                    <textarea
                                        rows={2}
                                        value={currentCase.videoDescription || ""}
                                        onChange={(e) => setCurrentCase({ ...currentCase, videoDescription: e.target.value })}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm sm:leading-6"
                                        placeholder="請輸入影片的簡短介紹..."
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 flex gap-x-3 justify-end">
                            <button
                                type="button"
                                onClick={() => { setIsEditing(false); setCurrentCase({}); }}
                                className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            >
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
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">分類</th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">地點</th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">圖片數</th>
                                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                            <span className="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {cases.map((c) => (
                                        <tr key={c.id}>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">{c.title}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{c.category}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{c.location}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{c.images.length}</td>
                                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                                <button
                                                    onClick={() => handleEdit(c)}
                                                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(c.id)}
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
        </div>
    );
}
