"use client";

import { useState } from "react";
import { Video } from "@/types";
import { saveVideo, deleteVideo, toggleVideoVisibility } from "@/app/actions/videoActions";
import { Trash2, Eye, EyeOff, Plus, Edit } from "lucide-react";

export const extractYouTubeId = (url: string) => {
    if (!url) return '';
    if (!url.includes('youtube.com') && !url.includes('youtu.be')) return url;

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
    return videoId || url;
};

interface VideoManagerProps {
    initialVideos: Video[];
}

export function VideoManager({ initialVideos }: VideoManagerProps) {
    const [videos, setVideos] = useState<Video[]>(initialVideos);
    const [isEditing, setIsEditing] = useState(false);
    const [currentVideo, setCurrentVideo] = useState<Partial<Video>>({});

    const handleToggleVisibility = async (id: string) => {
        await toggleVideoVisibility(id);
        setVideos(videos.map(v => v.id === id ? { ...v, isVisible: !v.isVisible } : v));
    };

    const handleDelete = async (id: string) => {
        if (!confirm("確定要刪除此影片嗎？")) return;
        await deleteVideo(id);
        setVideos(videos.filter(v => v.id !== id));
    };

    const handleEdit = (video: Video) => {
        setCurrentVideo(video);
        setIsEditing(true);
    };

    const handleAddNew = () => {
        setCurrentVideo({
            id: Date.now().toString(),
            title: "",
            description: "",
            youtubeId: "",
            publishDate: new Date().toISOString().split('T')[0],
            tags: [],
            category: "New Buildings",
            isVisible: true
        });
        setIsEditing(true);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentVideo.title || !currentVideo.youtubeId) {
            alert("標題和 YouTube ID 為必填");
            return;
        }

        const videoToSave = currentVideo as Video;
        await saveVideo(videoToSave);

        // Update local state
        const index = videos.findIndex(v => v.id === videoToSave.id);
        if (index !== -1) {
            const newVideos = [...videos];
            newVideos[index] = videoToSave;
            setVideos(newVideos);
        } else {
            setVideos([...videos, videoToSave]);
        }

        setIsEditing(false);
        setCurrentVideo({});
    };

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">影片管理</h2>
                <button
                    onClick={handleAddNew}
                    className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90"
                >
                    <Plus size={18} /> 新增影片
                </button>
            </div>

            {isEditing && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <h3 className="text-xl font-bold mb-4">{currentVideo.id && videos.find(v => v.id === currentVideo.id) ? "編輯影片" : "新增影片"}</h3>
                        <form onSubmit={handleSave} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">標題</label>
                                <input
                                    type="text"
                                    value={currentVideo.title || ""}
                                    onChange={e => setCurrentVideo({ ...currentVideo, title: e.target.value })}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">描述</label>
                                <textarea
                                    value={currentVideo.description || ""}
                                    onChange={e => setCurrentVideo({ ...currentVideo, description: e.target.value })}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                                    rows={3}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">YouTube ID 或 影片網址</label>
                                <input
                                    type="text"
                                    value={currentVideo.youtubeId || ""}
                                    onChange={e => setCurrentVideo({ ...currentVideo, youtubeId: extractYouTubeId(e.target.value) })}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                                    placeholder="可貼上完整網址或影片 ID (例如: dQw4w9WgXcQ)"
                                    required
                                />
                                {currentVideo.youtubeId && (
                                    <div className="mt-2 aspect-video w-full rounded-md overflow-hidden bg-black">
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            src={`https://www.youtube.com/embed/${currentVideo.youtubeId}`}
                                            title="YouTube video preview"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">分類</label>
                                <select
                                    value={currentVideo.category || "New Buildings"}
                                    onChange={e => setCurrentVideo({ ...currentVideo, category: e.target.value as any })}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                                >
                                    <option value="New Buildings">新建物 (New Buildings)</option>
                                    <option value="Revamping">汰舊換新 (Revamping)</option>
                                    <option value="Consultancy">電力顧問 (Consultancy)</option>
                                    <option value="Self-Built">自建電廠 (Self-Built)</option>
                                    <option value="Special">創新太陽能 (Special)</option>
                                    <option value="Others">其他 (Others)</option>
                                    <option value="General">一般 (General)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">發布日期</label>
                                <input
                                    type="date"
                                    value={currentVideo.publishDate || ""}
                                    onChange={e => setCurrentVideo({ ...currentVideo, publishDate: e.target.value })}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                                />
                            </div>
                            <div className="flex justify-end gap-2 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                >
                                    取消
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                                >
                                    儲存
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">狀態</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">標題</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">分類</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">發布日期</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {videos.map((video) => (
                            <tr key={video.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button
                                        onClick={() => handleToggleVisibility(video.id)}
                                        className={`flex items-center gap-1 text-sm ${video.isVisible ? "text-green-600" : "text-gray-400"}`}
                                    >
                                        {video.isVisible ? <Eye size={18} /> : <EyeOff size={18} />}
                                        {video.isVisible ? "公開" : "隱藏"}
                                    </button>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        {video.youtubeId && (
                                            <img
                                                src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                                                alt={video.title}
                                                className="w-24 h-16 object-cover rounded"
                                            />
                                        )}
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">{video.title}</div>
                                            <div className="text-sm text-gray-500 truncate max-w-xs">{video.description}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                        {video.category}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {video.publishDate}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button
                                        onClick={() => handleEdit(video)}
                                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                                    >
                                        <Edit size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(video.id)}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {videos.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-6 py-10 text-center text-gray-500">
                                    目前沒有影片
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
