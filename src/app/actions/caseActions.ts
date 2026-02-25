"use server";

import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";
import { CaseStudy } from "@/types";

const DATA_FILE_PATH = path.join(process.cwd(), "src", "data", "cases.json");

export async function getCases(): Promise<CaseStudy[]> {
    try {
        const data = await fs.readFile(DATA_FILE_PATH, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading cases:", error);
        return [];
    }
}

export async function saveCase(caseStudy: CaseStudy): Promise<void> {
    const cases = await getCases();
    const index = cases.findIndex((c) => c.id === caseStudy.id);

    if (index !== -1) {
        cases[index] = caseStudy;
    } else {
        cases.push(caseStudy);
    }

    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(cases, null, 2));
    revalidatePath("/", "layout");
}

export async function deleteCase(id: string): Promise<void> {
    const cases = await getCases();
    const newCases = cases.filter((c) => c.id !== id);
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(newCases, null, 2));
    revalidatePath("/", "layout");
}
