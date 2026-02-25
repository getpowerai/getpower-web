import Link from "next/link";
import { Video, BarChart3, LayoutDashboard, FileText } from "lucide-react";

export default function AdminPage() {
    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">後台管理系統</h1>
                    <p className="mt-2 text-sm text-gray-600">請選擇要管理的項目</p>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
                    <Link
                        href="/admin/articles"
                        className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-50 transition-colors"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-orange-100 rounded-full">
                                <FileText className="w-6 h-6 text-orange-600" />
                            </div>
                            <div>
                                <h5 className="mb-1 text-xl font-bold tracking-tight text-gray-900">專欄管理</h5>
                                <p className="font-normal text-gray-700">發布與管理綠能知識庫文章</p>
                            </div>
                        </div>
                    </Link>

                    <Link
                        href="/admin/videos"
                        className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-50 transition-colors"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-100 rounded-full">
                                <Video className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <h5 className="mb-1 text-xl font-bold tracking-tight text-gray-900">影音管理</h5>
                                <p className="font-normal text-gray-700">管理 Youtube 影片列表與顯示狀態</p>
                            </div>
                        </div>
                    </Link>

                    <Link
                        href="/admin/records"
                        className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-50 transition-colors"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-green-100 rounded-full">
                                <BarChart3 className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <h5 className="mb-1 text-xl font-bold tracking-tight text-gray-900">實績管理</h5>
                                <p className="font-normal text-gray-700">新增、編輯與刪除工程實績案例</p>
                            </div>
                        </div>
                    </Link>

                    <Link
                        href="/admin/cases"
                        className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-50 transition-colors"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-purple-100 rounded-full">
                                <LayoutDashboard className="w-6 h-6 text-purple-600" />
                            </div>
                            <div>
                                <h5 className="mb-1 text-xl font-bold tracking-tight text-gray-900">精選個案</h5>
                                <p className="font-normal text-gray-700">管理首頁與各頁面的精選個案</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
