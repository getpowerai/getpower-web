import { VideoManager } from "@/components/admin/VideoManager";
import { getVideos } from "@/app/actions/videoActions";

export const dynamic = 'force-dynamic';

export default async function AdminVideosPage() {
    const videos = await getVideos();

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">後台管理系統</h1>
                    <p className="mt-2 text-sm text-gray-600">管理網站上的影片內容與顯示狀態</p>
                </div>
                <VideoManager initialVideos={videos} />
            </div>
        </div>
    );
}
