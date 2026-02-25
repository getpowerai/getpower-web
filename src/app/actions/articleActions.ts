"use server";

import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";
import { Article } from "@/types";

const DATA_FILE_PATH = path.join(process.cwd(), "src", "data", "articles.json");

export async function getArticles(): Promise<Article[]> {
    try {
        const data = await fs.readFile(DATA_FILE_PATH, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading articles:", error);
        return [];
    }
}

export async function saveArticle(article: Article): Promise<void> {
    const articles = await getArticles();
    const index = articles.findIndex((a) => a.id === article.id);

    if (index !== -1) {
        articles[index] = article;
    } else {
        articles.push(article);
    }

    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(articles, null, 2));
    revalidatePath("/", "layout");
}

export async function deleteArticle(id: string): Promise<void> {
    const articles = await getArticles();
    const newArticles = articles.filter((a) => a.id !== id);
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(newArticles, null, 2));
    revalidatePath("/", "layout");
}
