export interface Article {
    id: string;
    title: string;
    summary: string;
    content: string; // Markdown or HTML
    publishDate: string;
    tags: string[];
    category: "New Buildings" | "Revamping" | "Consultancy" | "Special" | "Self-Built" | "Others" | "General";
    slug: string; // for URL
    image?: string; // Featured image
}

export interface Video {
    id: string;
    title: string;
    description: string;
    youtubeId: string;
    publishDate: string;
    tags: string[];
    category: "New Buildings" | "Revamping" | "Consultancy" | "Special" | "Self-Built" | "Others" | "General";
    isVisible?: boolean;
}

export interface CaseStudy {
    id: string;
    title: string;
    clientName?: string;
    location: string;
    description: string; // Summary
    challenge: string;
    solution: string;
    result: string;
    images: string[];
    youtubeUrl?: string; // YouTube Video URL
    videoDescription?: string; // Brief description of the video
    category: "New Buildings" | "Revamping" | "Consultancy" | "Special" | "Self-Built";
    professionalInsight?: string; // Special strategic value provided
}

export interface TrackRecord {
    id: string;
    title: string;
    type: "Factory" | "School" | "Residential" | "Other" | "Flexible" | "Bifacial" | "Movable" | "BIPV";
    customType?: string; // Used when type is "Other"
    category?: "New Buildings" | "Revamping" | "Consultancy" | "Special" | "Self-Built";
    location: string;
    capacity: string; // e.g., "100 kWp"
    year: string;
    image: string;
    images?: string[];
    videos?: string[];
    description?: string;
}
