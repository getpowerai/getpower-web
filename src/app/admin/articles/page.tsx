import { ArticleManager } from "@/components/admin/ArticleManager";
import { getArticles } from "@/app/actions/articleActions";

export const dynamic = 'force-dynamic';

export default async function AdminArticlesPage() {
    const articles = await getArticles();

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">後台管理系統</h1>
                    <p className="mt-2 text-sm text-gray-600">管理網站上發布的專欄文章</p>
                </div>
                <ArticleManager initialArticles={articles} />
            </div>
        </div>
    );
}
