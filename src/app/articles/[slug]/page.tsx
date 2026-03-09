import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticles } from "@/app/actions/articleActions";
import ReactMarkdown from "react-markdown";

interface ArticlePageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({ params }: ArticlePageProps) {
    const { slug } = await params;
    const articles = await getArticles();
    const article = articles.find((a) => a.slug === slug);

    if (!article) {
        return {
            title: "Article Not Found",
        };
    }

    return {
        title: `${article.title} - GetPower`,
        description: article.summary,
    };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
    const { slug } = await params;
    const articles = await getArticles();
    const article = articles.find((a) => a.slug === slug);

    if (!article) {
        notFound();
    }

    return (
        <div className="bg-white min-h-screen">
            <div className="relative isolate px-6 pt-14 lg:px-8 bg-slate-50">
                <div className="mx-auto max-w-3xl py-12 text-center">
                    <div className="mb-8 flex items-center justify-center gap-x-2 text-sm text-gray-500">
                        <time dateTime={article.publishDate}>{article.publishDate}</time>
                        <span>•</span>
                        <span className="font-medium text-accent">
                            {article.category}
                        </span>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-6">
                        {article.title}
                    </h1>
                    <p className="text-lg text-gray-600 leading-8">
                        {article.summary}
                    </p>
                </div>
            </div>

            <div className="mx-auto max-w-3xl px-6 lg:px-8 py-12 sm:py-20">
                {article.image && (
                    <div className="mb-12 rounded-xl overflow-hidden shadow-lg">
                        <div className="aspect-w-16 aspect-h-9 bg-gray-100 relative h-[400px]">
                            {/* In real app use next/image */}
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-400">
                                {article.image.startsWith('/') ? (
                                    <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                                ) : (
                                    <span>Image Placeholder</span>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                <article className="prose prose-lg prose-slate mx-auto">
                    {article.content ? (
                        <div
                            dangerouslySetInnerHTML={{ __html: article.content }}
                            className="rich-text-content"
                        />
                    ) : (
                        <p className="text-gray-500 italic">No content available.</p>
                    )}
                </article>

                <div className="mt-12 pt-8 border-t border-gray-200">
                    <div className="flex flex-wrap gap-2 mb-8">
                        {article.tags.map(tag => (
                            <span key={tag} className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                #{tag}
                            </span>
                        ))}
                    </div>

                    <div className="flex justify-center">
                        <Link
                            href="/#news" // Or back to relevant section
                            className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                            ← 回到文章列表
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Generate static params for known articles to optimize build
export async function generateStaticParams() {
    const articles = await getArticles();
    return articles.map((article) => ({
        slug: article.slug,
    }));
}
