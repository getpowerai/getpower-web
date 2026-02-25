"use client";

import { useState, useEffect } from "react";
import { TrackRecord } from "@/types";
import { cn } from "@/lib/utils";
import { X, ChevronLeft, ChevronRight, Images, Play } from "lucide-react";

interface TrackRecordGalleryProps {
    records: TrackRecord[];
    className?: string;
    title?: string;
}

const CATEGORY_MAP: Record<string, string> = {
    Factory: "工廠類型",
    Residential: "住宅類型",
    School: "學校類型",
    Other: "其他",
    Flexible: "輕量化軟式太陽能",
    Bifacial: "立面雙面發電系統",
    Movable: "移動式與易拆遷系統",
    BIPV: "BIPV 建築整合太陽能/防水型太陽能"
};

const isYouTubeUrl = (url: string) => {
    if (!url) return false;
    return url.includes('youtube.com') || url.includes('youtu.be');
};

const toYouTubeEmbedUrl = (url: string): string => {
    if (!url) return url;
    let videoId = '';
    try {
        if (url.includes('youtu.be/')) {
            videoId = url.split('youtu.be/')[1].split('?')[0];
        } else if (url.includes('youtube.com/watch')) {
            videoId = new URL(url).searchParams.get('v') || '';
        } else if (url.includes('youtube.com/shorts/')) {
            videoId = url.split('youtube.com/shorts/')[1].split('?')[0];
        } else if (url.includes('youtube.com/embed/')) {
            // Already embed URL
            return url;
        }
    } catch {
        // ignore
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
};

const getRecordVideos = (record: TrackRecord) =>
    (record.videos || []).filter(Boolean) as string[];
const getRecordImages = (record: TrackRecord) =>
    [record.image, ...(record.images || [])].filter(Boolean) as string[];

// ── Video/Image renderer ──────────────────────────────────────────────────────
function MediaViewer({ url, type, title }: { url: string; type: 'video' | 'image'; title: string }) {
    if (type === 'video') {
        if (isYouTubeUrl(url)) {
            const embedSrc = `${toYouTubeEmbedUrl(url)}?autoplay=1&rel=0`;
            return (
                <iframe
                    key={url}
                    src={embedSrc}
                    className="w-full h-full"
                    allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                    allowFullScreen
                    title={title}
                />
            );
        }
        return (
            <video
                key={url}
                src={url}
                controls
                autoPlay
                className="w-full h-full object-contain"
            />
        );
    }
    // eslint-disable-next-line @next/next/no-img-element
    return <img key={url} src={url} alt={title} className="w-full h-full object-contain" />;
}

// ── Modal component ───────────────────────────────────────────────────────────
function MediaModal({
    record,
    onClose,
}: {
    record: TrackRecord;
    onClose: () => void;
}) {
    const videos = getRecordVideos(record);
    const images = getRecordImages(record);
    const hasVideos = videos.length > 0;
    const hasImages = images.length > 0;
    const hasBoth = hasVideos && hasImages;

    const [tab, setTab] = useState<'video' | 'image'>(hasVideos ? 'video' : 'image');
    const [idx, setIdx] = useState(0);

    const list = tab === 'video' ? videos : images;
    const safeIdx = Math.min(idx, list.length - 1);
    const currentUrl = list[safeIdx];

    const prev = () => setIdx(i => (i === 0 ? list.length - 1 : i - 1));
    const next = () => setIdx(i => (i === list.length - 1 ? 0 : i + 1));

    const switchTab = (newTab: 'video' | 'image') => {
        setTab(newTab);
        setIdx(0);
    };

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-5xl rounded-2xl bg-white shadow-2xl p-2 sm:p-4"
                onClick={e => e.stopPropagation()}
            >
                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute -top-12 right-0 sm:-right-12 sm:top-0 p-2 text-white/70 hover:text-white transition-colors bg-white/10 sm:bg-transparent rounded-full"
                >
                    <X className="w-8 h-8" />
                </button>

                {/* Tabs */}
                {hasBoth && (
                    <div className="flex gap-2 mb-3">
                        <button
                            onClick={() => switchTab('video')}
                            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${tab === 'video' ? 'bg-accent text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                        >
                            <Play className="w-3.5 h-3.5" /> 影片 ({videos.length})
                        </button>
                        <button
                            onClick={() => switchTab('image')}
                            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${tab === 'image' ? 'bg-accent text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                        >
                            <Images className="w-3.5 h-3.5" /> 照片 ({images.length})
                        </button>
                    </div>
                )}

                {/* Viewer */}
                <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black flex items-center justify-center group">
                    {currentUrl && (
                        <MediaViewer
                            url={currentUrl}
                            type={tab}
                            title={record.title}
                        />
                    )}

                    {list.length > 1 && (
                        <>
                            <button
                                onClick={prev}
                                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/90 hover:text-gray-900 text-white shadow-md transition-all opacity-0 group-hover:opacity-100"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <button
                                onClick={next}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/90 hover:text-gray-900 text-white shadow-md transition-all opacity-0 group-hover:opacity-100"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md">
                                {list.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setIdx(i)}
                                        className={`h-1.5 rounded-full transition-all ${i === safeIdx ? 'bg-white w-4' : 'bg-white/50 w-1.5 hover:bg-white/80'}`}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {/* Info */}
                <div className="mt-4 px-2 pb-2">
                    <h3 className="text-xl font-bold text-gray-900">{record.title}</h3>
                    <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-600">
                        <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-xs font-medium border border-blue-100">
                            {record.type === "Other" && record.customType
                                ? `${CATEGORY_MAP[record.type] || record.type} (${record.customType})`
                                : CATEGORY_MAP[record.type] || record.type}
                        </span>
                        <span>地點：<strong className="text-gray-900">{record.location}</strong></span>
                        <span>容量：<strong className="text-accent">{record.capacity}</strong></span>
                        <span>年份：<strong className="text-gray-900">{record.year}</strong></span>
                        {record.description && (
                            <div className="w-full text-gray-600 leading-relaxed">{record.description}</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// ── Card component ────────────────────────────────────────────────────────────
function TrackRecordCard({ record, onClick }: { record: TrackRecord; onClick: () => void }) {
    const allImages = getRecordImages(record);
    const [activeIndex, setActiveIndex] = useState(0);
    const hasVideo = !!(record.videos && record.videos.length > 0);
    const firstVideo = record.videos?.[0];

    return (
        <div
            className="group relative overflow-hidden rounded-lg bg-white shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer"
            onClick={onClick}
        >
            <div className="aspect-[4/3] w-full bg-gray-200 relative">
                {allImages.length > 0 ? (
                    <img
                        src={allImages[activeIndex]}
                        alt={record.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                ) : hasVideo && firstVideo ? (
                    isYouTubeUrl(firstVideo) ? (
                        <div className="h-full w-full bg-black flex items-center justify-center">
                            <img
                                src={`https://img.youtube.com/vi/${toYouTubeEmbedUrl(firstVideo).split('/embed/')[1]}/mqdefault.jpg`}
                                alt={record.title}
                                className="h-full w-full object-cover opacity-80"
                            />
                        </div>
                    ) : (
                        <video
                            src={firstVideo}
                            className="h-full w-full object-cover pointer-events-none"
                            muted
                            playsInline
                        />
                    )
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                        No Image
                    </div>
                )}

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />

                {hasVideo && (
                    <div className="absolute inset-0 flex items-center justify-center text-white opacity-80 group-hover:scale-110 transition-transform">
                        <div className="w-16 h-16 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center">
                            <Play className="w-8 h-8 ml-1" />
                        </div>
                    </div>
                )}

                {allImages.length > 1 && (
                    <div
                        className="absolute bottom-2 right-2 flex gap-1 p-1 bg-black/40 backdrop-blur-sm rounded-md max-w-[90%]"
                        onClick={e => e.stopPropagation()}
                    >
                        {allImages.slice(0, 5).map((img, idx) => {
                            const isLastAndMore = idx === 4 && allImages.length > 5;
                            return (
                                <button
                                    key={idx}
                                    onClick={e => {
                                        e.stopPropagation();
                                        setActiveIndex(idx);
                                    }}
                                    className={cn(
                                        "relative w-8 h-8 rounded shrink-0 overflow-hidden border transition-colors",
                                        activeIndex === idx ? "border-white ring-2 ring-accent" : "border-white/20 hover:border-white"
                                    )}
                                >
                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                    {isLastAndMore && (
                                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-[10px] font-bold">
                                            +{allImages.length - 5}
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>
            <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                        {record.type === "Other" && record.customType
                            ? `${CATEGORY_MAP[record.type] || record.type} (${record.customType})`
                            : CATEGORY_MAP[record.type] || record.type}
                    </span>
                    <span className="text-xs text-gray-500">{record.year}</span>
                </div>
                <h3 className="text-base font-semibold text-gray-900 line-clamp-1 group-hover:text-accent transition-colors">{record.title}</h3>
                <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                    <span>{record.location}</span>
                    <span>•</span>
                    <span className="font-medium text-accent">{record.capacity}</span>
                </div>
            </div>
        </div>
    );
}

// ── Main gallery ──────────────────────────────────────────────────────────────
export function TrackRecordGallery({ records, className, title }: TrackRecordGalleryProps) {
    const [filter, setFilter] = useState<TrackRecord["type"] | "All">("All");
    const [selectedRecord, setSelectedRecord] = useState<TrackRecord | null>(null);

    useEffect(() => {
        document.body.style.overflow = selectedRecord ? "hidden" : "auto";
        return () => { document.body.style.overflow = "auto"; };
    }, [selectedRecord]);

    const availableTypes = Array.from(new Set(records.map(r => r.type))).filter(Boolean);
    const filterOptions = ["All", ...availableTypes] as (TrackRecord["type"] | "All")[];
    const filteredRecords = filter === "All" ? records : records.filter(r => r.type === filter);

    if (records.length === 0) return null;

    return (
        <section className={cn("py-12 bg-gray-50", className)}>
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {title && (
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8 text-center">
                        {title}
                    </h2>
                )}

                {/* Filter buttons */}
                <div className="flex flex-wrap justify-center gap-2 mb-10">
                    {filterOptions.map(value => (
                        <button
                            key={value}
                            onClick={() => setFilter(value)}
                            className={cn(
                                "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                                filter === value
                                    ? "bg-accent text-white shadow-md"
                                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                            )}
                        >
                            {value === "All" ? "全部實績" : CATEGORY_MAP[value] || value}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredRecords.map(record => (
                        <TrackRecordCard
                            key={record.id}
                            record={record}
                            onClick={() => setSelectedRecord(record)}
                        />
                    ))}
                </div>

                {filteredRecords.length === 0 && (
                    <div className="text-center py-12 text-gray-500">此分類尚無實績資料。</div>
                )}
            </div>

            {/* Modal is rendered outside the scrollable area */}
            {selectedRecord && (
                <MediaModal
                    record={selectedRecord}
                    onClose={() => setSelectedRecord(null)}
                />
            )}
        </section>
    );
}
