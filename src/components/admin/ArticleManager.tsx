"use client";

import { useState } from "react";
import { Article } from "@/types";
import { saveArticle, deleteArticle } from "@/app/actions/articleActions";
import { Trash2, Plus, Edit } from "lucide-react";

import { RichTextEditor } from "./RichTextEditor";

interface ArticleManagerProps {
    initialArticles: Article[];
}

export function ArticleManager({ initialArticles }: ArticleManagerProps) {
    const [articles, setArticles] = useState<Article[]>(initialArticles);
    const [isEditing, setIsEditing] = useState(false);
    const [currentArticle, setCurrentArticle] = useState<Partial<Article>>({});

    const handleDelete = async (id: string) => {
        if (!confirm("確定要刪除此文章嗎？")) return;
        await deleteArticle(id);
        setArticles(articles.filter(a => a.id !== id));
    };

    const handleEdit = (article: Article) => {
        setCurrentArticle(article);
        setIsEditing(true);
    };

    const handleAddNew = () => {
        setCurrentArticle({
            id: Date.now().toString(),
            title: "",
            summary: "",
            content: "",
            publishDate: new Date().toISOString().split('T')[0],
            tags: [],
            category: "New Buildings",
            slug: "",
            image: ""
        });
        setIsEditing(true);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentArticle.title || !currentArticle.summary) {
            alert("標題和摘要為必填");
            return;
        }

        // Auto-generate slug if empty
        if (!currentArticle.slug) {
            currentArticle.slug = currentArticle.title
                .toLowerCase()
                .replace(/ /g, '-')
                .replace(/[^\w-]+/g, '');
        }

        const articleToSave = currentArticle as Article;
        await saveArticle(articleToSave);

        const index = articles.findIndex(a => a.id === articleToSave.id);
        if (index !== -1) {
            const newArticles = [...articles];
            newArticles[index] = articleToSave;
            setArticles(newArticles);
        } else {
            setArticles([...articles, articleToSave]);
        }

        setIsEditing(false);
        setCurrentArticle({});
    };

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">專欄文章管理</h2>
                <button
                    onClick={handleAddNew}
                    className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90"
                >
                    <Plus size={18} /> 新增文章
                </button>
            </div>

            {isEditing && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <h3 className="text-xl font-bold mb-4">{currentArticle.id && articles.find(a => a.id === currentArticle.id) ? "編輯文章" : "新增文章"}</h3>
                        <form onSubmit={handleSave} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">標題</label>
                                    <input
                                        type="text"
                                        value={currentArticle.title || ""}
                                        onChange={e => setCurrentArticle({ ...currentArticle, title: e.target.value })}
                                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">分類</label>
                                    <select
                                        value={currentArticle.category || "New Buildings"}
                                        onChange={e => setCurrentArticle({ ...currentArticle, category: e.target.value as any })}
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
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">摘要</label>
                                <textarea
                                    value={currentArticle.summary || ""}
                                    onChange={e => setCurrentArticle({ ...currentArticle, summary: e.target.value })}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                                    rows={2}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">內容</label>
                                <RichTextEditor
                                    content={currentArticle.content || ""}
                                    onChange={(content) => setCurrentArticle({ ...currentArticle, content })}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">發布日期</label>
                                    <input
                                        type="date"
                                        value={currentArticle.publishDate || ""}
                                        onChange={e => setCurrentArticle({ ...currentArticle, publishDate: e.target.value })}
                                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">圖片路徑</label>
                                    <input
                                        type="text"
                                        value={currentArticle.image || ""}
                                        onChange={e => setCurrentArticle({ ...currentArticle, image: e.target.value })}
                                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                                        placeholder="/images/..."
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">標籤 (以逗號分隔)</label>
                                <input
                                    type="text"
                                    value={currentArticle.tags?.join(", ") || ""}
                                    onChange={e => setCurrentArticle({ ...currentArticle, tags: e.target.value.split(",").map(t => t.trim()).filter(Boolean) })}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                                    placeholder="標籤1, 標籤2"
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
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">標題</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">分類</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">發布日期</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {articles.map((article) => (
                            <tr key={article.id}>
                                <td className="px-6 py-4">
                                    <div className="text-sm font-medium text-gray-900">{article.title}</div>
                                    <div className="text-sm text-gray-500 truncate max-w-xs">{article.summary}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                                        {article.category}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {article.publishDate}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button
                                        onClick={() => handleEdit(article)}
                                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                                    >
                                        <Edit size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(article.id)}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
