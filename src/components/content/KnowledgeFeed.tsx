"use client";

import { useState } from "react";
import { Article } from "@/types";
import { ArticleGrid } from "@/components/content/ArticleGrid";

interface KnowledgeFeedProps {
    articles: Article[];
}

const CATEGORIES = [
    { label: "所有文章", value: "All" },
    { label: "新建物", value: "New Buildings" },
    { label: "汰舊換新", value: "Revamping" },
    { label: "電力顧問", value: "Consultancy" },
    { label: "自建電廠/出租屋頂", value: "Self-Built" },
    { label: "創新太陽能", value: "Special" },
    { label: "其他", value: "Others" },
];

export function KnowledgeFeed({ articles }: KnowledgeFeedProps) {
    const [selectedCategory, setSelectedCategory] = useState("All");

    const filteredArticles = selectedCategory === "All"
        ? articles
        : articles.filter(article => article.category === selectedCategory);

    return (
        <div>
            {/* Category Tabs */}
            <div className="border-b border-gray-200 bg-white sticky top-0 z-10">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="-mb-px flex space-x-8 overflow-x-auto pb-1 scrollbar-hide">
                        {CATEGORIES.map((category) => (
                            <button
                                key={category.value}
                                onClick={() => setSelectedCategory(category.value)}
                                className={`
                                    whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium transition-colors
                                    ${selectedCategory === category.value
                                        ? "border-accent text-accent"
                                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"}
                                `}
                            >
                                {category.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <ArticleGrid
                articles={filteredArticles}
                title={CATEGORIES.find(c => c.value === selectedCategory)?.label}
                className="bg-white min-h-[500px]"
            />
        </div>
    );
}
