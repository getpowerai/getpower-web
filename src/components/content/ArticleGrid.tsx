import Link from "next/link";
import { Article } from "@/types";
import { cn } from "@/lib/utils";

interface ArticleGridProps {
    articles: Article[];
    title?: string;
    className?: string;
}

export function ArticleGrid({ articles, title, className }: ArticleGridProps) {
    if (articles.length === 0) return null;

    return (
        <section className={cn("py-12", className)}>
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {title && (
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">
                        {title}
                    </h2>
                )}
                <div className="mx-auto mt-2 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 pt-2 sm:mt-2 sm:pt-2 lg:mx-0 lg:max-w-none lg:grid-cols-4 sm:grid-cols-2">
                    {articles.map((post) => (
                        <article key={post.id} className="flex max-w-xl flex-col items-start justify-between bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-5 border border-gray-100">
                            {post.image && (
                                <Link href={`/articles/${post.slug}`} className="w-full relative h-48 mb-4 rounded-md overflow-hidden bg-gray-100 block">
                                    {/* In a real app, use next/image. For mock, we use a placeholder if needed or just an img tag */}
                                    <div className="absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-400">
                                        {post.image.startsWith('/') ? (
                                            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                                        ) : (
                                            "Image Placeholder"
                                        )}
                                    </div>
                                </Link>
                            )}
                            <div className="flex items-center gap-x-4 text-xs">
                                <time dateTime={post.publishDate} className="text-gray-500">
                                    {post.publishDate}
                                </time>
                                <span className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                                    {post.category}
                                </span>
                            </div>
                            <div className="group relative">
                                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                                    <Link href={`/articles/${post.slug}`}>
                                        <span className="absolute inset-0" />
                                        {post.title}
                                    </Link>
                                </h3>
                                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                                    {post.summary}
                                </p>
                            </div>
                            <div className="mt-4 flex gap-2 flex-wrap">
                                {post.tags.map(tag => (
                                    <span key={tag} className="text-xs text-blue-600">#{tag}</span>
                                ))}
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
