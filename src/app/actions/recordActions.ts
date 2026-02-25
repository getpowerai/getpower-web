"use server";

import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";
import { TrackRecord } from "@/types";

const DATA_FILE_PATH = path.join(process.cwd(), "src", "data", "records.json");

export async function getRecords(): Promise<TrackRecord[]> {
    try {
        const data = await fs.readFile(DATA_FILE_PATH, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading records:", error);
        return [];
    }
}

export async function saveRecord(record: TrackRecord): Promise<void> {
    const records = await getRecords();
    const index = records.findIndex((r) => r.id === record.id);

    if (index !== -1) {
        records[index] = record;
    } else {
        records.push(record);
    }

    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(records, null, 2));
    revalidatePath("/", "layout");
}

export async function deleteRecord(id: string): Promise<void> {
    const records = await getRecords();
    const newRecords = records.filter((r) => r.id !== id);
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(newRecords, null, 2));
    revalidatePath("/", "layout");
}
