"use server";

import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";
import { Video } from "@/types";

const DATA_FILE_PATH = path.join(process.cwd(), "src", "data", "videos.json");

export async function getVideos(): Promise<Video[]> {
    try {
        const data = await fs.readFile(DATA_FILE_PATH, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading videos:", error);
        return [];
    }
}

export async function saveVideo(video: Video): Promise<void> {
    const videos = await getVideos();
    const index = videos.findIndex((v) => v.id === video.id);

    if (index !== -1) {
        videos[index] = video;
    } else {
        videos.push(video);
    }

    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(videos, null, 2));
    revalidatePath("/", "layout");
}

export async function deleteVideo(id: string): Promise<void> {
    const videos = await getVideos();
    const newVideos = videos.filter((v) => v.id !== id);
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(newVideos, null, 2));
    revalidatePath("/", "layout");
}

export async function toggleVideoVisibility(id: string): Promise<void> {
    const videos = await getVideos();
    const video = videos.find((v) => v.id === id);
    if (video) {
        video.isVisible = !video.isVisible;
        await fs.writeFile(DATA_FILE_PATH, JSON.stringify(videos, null, 2));
        revalidatePath("/", "layout");
    }
}
