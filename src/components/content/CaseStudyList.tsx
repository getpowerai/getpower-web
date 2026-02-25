"use client";

import { useState } from "react";
import { CaseStudy } from "@/types";
import { cn } from "@/lib/utils";
import { PlayCircle, Image as ImageIcon } from "lucide-react";

interface CaseStudyListProps {
    cases: CaseStudy[];
    className?: string;
}

// Helper to extract YouTube ID
const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
};

export function CaseStudyList({ cases, className }: CaseStudyListProps) {
    if (cases.length === 0) return null;

    return (
        <section className={cn("py-12 space-y-24", className)}>
            {cases.map((project, index) => (
                <CaseStudyCard key={project.id} project={project} index={index} />
            ))}
        </section>
    );
}

function CaseStudyCard({ project, index }: { project: CaseStudy; index: number }) {
    const [activeMedia, setActiveMedia] = useState<"video" | number>(
        project.images.length > 0 ? 0 : (project.youtubeUrl ? "video" : 0)
    );

    const videoId = project.youtubeUrl ? getYouTubeId(project.youtubeUrl) : null;
    const videoThumbnail = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null;

    return (
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className={cn("flex flex-col gap-12 lg:items-center", index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse")}>
                {/* Media Section */}
                <div className="w-full lg:w-1/2">
                    <div className="flex flex-col gap-4">
                        {/* Main Media Display */}
                        <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black shadow-lg group">
                            {activeMedia === "video" && project.youtubeUrl ? (
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={`https://www.youtube.com/embed/${videoId}`}
                                    title={project.title}
                                    frameBorder="0"
                                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="absolute inset-0 w-full h-full"
                                ></iframe>
                            ) : (
                                <>
                                    {typeof activeMedia === "number" && project.images[activeMedia] ? (
                                        /* eslint-disable-next-line @next/next/no-img-element */
                                        <img
                                            src={project.images[activeMedia]}
                                            alt={project.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-200">
                                            No Image
                                        </div>
                                    )}
                                </>
                            )}
                        </div>

                        {/* Thumbnails */}
                        {(project.youtubeUrl || project.images.length > 0) && (
                            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                                {project.youtubeUrl && videoThumbnail && (
                                    <button
                                        onClick={() => setActiveMedia("video")}
                                        className={cn(
                                            "relative flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 transition-all",
                                            activeMedia === "video" ? "border-accent ring-2 ring-accent/20" : "border-transparent opacity-70 hover:opacity-100"
                                        )}
                                    >
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={videoThumbnail} alt="Video" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                            <PlayCircle className="w-6 h-6 text-white" />
                                        </div>
                                    </button>
                                )}
                                {project.images.map((img, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setActiveMedia(i)}
                                        className={cn(
                                            "relative flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 transition-all",
                                            activeMedia === i ? "border-accent ring-2 ring-accent/20" : "border-transparent opacity-70 hover:opacity-100"
                                        )}
                                    >
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={img} alt={`Thumbnail ${i}`} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}

                        {project.videoDescription && activeMedia === "video" && (
                            <p className="text-sm text-gray-600 italic bg-gray-50 p-4 rounded-lg border border-gray-100 animate-in fade-in slide-in-from-top-2">
                                {project.videoDescription}
                            </p>
                        )}
                    </div>
                </div>

                {/* Content Section */}
                <div className="w-full lg:w-1/2 lg:px-8">
                    <div className="text-sm font-semibold text-accent mb-2">{project.location}</div>
                    <h3 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-6">
                        {project.title}
                    </h3>

                    <div className="space-y-6 text-base leading-7 text-gray-600">
                        <div>
                            <h4 className="font-semibold text-gray-900 inline">挑戰：</h4>
                            <p>{project.challenge}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 inline">解決方案：</h4>
                            <p>{project.solution}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 inline">成果：</h4>
                            <p>{project.result}</p>
                        </div>
                    </div>

                    {project.professionalInsight && (
                        <div className="mt-8 rounded-lg bg-yellow-50 p-6 border border-yellow-100">
                            <h4 className="flex items-center text-sm font-semibold text-accent mb-2">
                                <span className="mr-2">💡</span> 專家觀點 - 吉陽策略
                            </h4>
                            <p className="text-gray-700 italic">
                                {project.professionalInsight}
                            </p>
                        </div>
                    )}

                    {project.clientName && (
                        <div className="mt-8 border-t border-gray-100 pt-6">
                            <p className="text-sm text-gray-500">客戶：{project.clientName}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
