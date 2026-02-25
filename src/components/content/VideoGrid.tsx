import { Video } from "@/types";
import { cn } from "@/lib/utils";
import { PlayCircle } from "lucide-react";

interface VideoGridProps {
    videos: Video[];
    title?: string;
    className?: string;
}

export function VideoGrid({ videos, title, className }: VideoGridProps) {
    if (videos.length === 0) return null;

    return (
        <section className={cn("py-12 bg-gray-50", className)}>
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {title && (
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">
                        {title}
                    </h2>
                )}
                <div className="mx-auto mt-2 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 pt-2 sm:mt-2 sm:pt-2 lg:mx-0 lg:max-w-none lg:grid-cols-4 sm:grid-cols-2">
                    {videos.map((video) => (
                        <div key={video.id} className="flex flex-col items-start">
                            <div className="relative w-full aspect-video bg-gray-900 rounded-lg overflow-hidden mb-4 group cursor-pointer shadow-md hover:shadow-lg transition-all">
                                {/* Placeholder for Video Thumbnail */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <PlayCircle className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 scale-100 group-hover:scale-110 transition-all" />
                                </div>
                            </div>
                            <div className="w-full">
                                <div className="flex items-center gap-x-4 text-xs">
                                    <time dateTime={video.publishDate} className="text-gray-500">
                                        {video.publishDate}
                                    </time>
                                    <span className="relative z-10 rounded-full bg-blue-50 px-3 py-1.5 font-medium text-blue-600">
                                        {video.category}
                                    </span>
                                </div>
                                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900">
                                    {video.title}
                                </h3>
                                <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-600">
                                    {video.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
