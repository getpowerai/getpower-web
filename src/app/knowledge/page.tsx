import { getArticles } from "@/app/actions/articleActions";
import { KnowledgeFeed } from "@/components/content/KnowledgeFeed";

export const dynamic = 'force-dynamic';

export default async function KnowledgePage() {
    const articles = await getArticles();

    return (
        <div className="bg-white">
            <div className="relative isolate overflow-hidden bg-primary px-6 pt-14 pb-16 lg:px-8">
                <div className="absolute inset-0 -z-10 bg-black/20"></div>
                <div className="mx-auto max-w-2xl py-20 sm:py-32 lg:py-40 text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                        綠能知識庫
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-200">
                        這裡匯集了關於太陽能法規、技術趨勢、補助政策的最新資訊。
                        讓您在決策前，擁有最充分的知識後盾。
                    </p>
                </div>
            </div>

            <KnowledgeFeed articles={articles} />
        </div>
    );
}
