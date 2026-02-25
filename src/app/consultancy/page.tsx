import { getVideos } from "@/app/actions/videoActions";
import { VideoGrid } from "@/components/content/VideoGrid";
import { AssessmentForm } from "@/components/forms/AssessmentForm";

import { getCases } from "@/app/actions/caseActions";
import { CaseStudyList } from "@/components/content/CaseStudyList";
import { getRecords } from "@/app/actions/recordActions";
import { TrackRecordGallery } from "@/components/content/TrackRecordGallery";
import { getArticles } from "@/app/actions/articleActions";
import { ArticleGrid } from "@/components/content/ArticleGrid";
import { ConsultancyIntro } from "@/components/content/ConsultancyIntro";
import { ConsultancyStages } from "@/components/content/ConsultancyStages";
import { ConsultancyIntegration } from "@/components/content/ConsultancyIntegration";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '吉陽電力顧問｜用電最佳化專家｜太陽能、儲能與需量反應整合規劃',
    description: '吉陽電力顧問專注於用電最佳化、契約容量優化、太陽能與儲能規劃、需量反應與電力交易整合，協助企業讓每一度電創造最大價值。',
};

export default async function ConsultancyPage() {
    const allArticles = await getArticles();
    const consultancyArticles = allArticles.filter(a => a.category === "Consultancy");

    const allVideos = await getVideos();
    const consultancyVideos = allVideos
        .filter(v => v.category === "Consultancy" && v.isVisible !== false);

    const allCases = await getCases();
    const consultancyCases = allCases.filter(c => c.category === "Consultancy");

    const allRecords = await getRecords();
    const consultancyRecords = allRecords.filter(r => r.category === "Consultancy");

    return (
        <div className="bg-white">
            <div className="relative isolate overflow-hidden bg-primary px-6 pt-14 pb-16 lg:px-8">
                <div className="absolute inset-0 -z-10 bg-black/20"></div>
                <div className="mx-auto max-w-2xl py-20 sm:py-32 lg:py-40 text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                        吉陽電力顧問
                    </h1>
                    <p className="mt-6 text-xl leading-8 text-gray-200 font-medium">
                        全方位的電力顧問服務：為您的每一度電做最好的規劃
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <a
                            href="#assessment-form"
                            className="rounded-md bg-accent px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                        >
                            預約顧問諮詢
                        </a>
                        <a href="#intro" className="text-sm font-semibold leading-6 text-white hover:text-accent transition-colors">
                            了解核心價值 <span aria-hidden="true">→</span>
                        </a>
                    </div>
                </div>
            </div>

            <div id="intro">
                <ConsultancyIntro />
            </div>

            <ConsultancyIntegration />

            <ConsultancyStages />

            <ArticleGrid
                articles={consultancyArticles}
                title="電力與節能專欄"
                className="bg-white"
            />

            <VideoGrid
                videos={consultancyVideos}
                title="顧問觀點影音"
            />

            {/* Case Studies Section */}
            <div id="cases" className="bg-slate-50">
                <div className="py-12 text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        精選個案說明
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto px-6">
                        為企業量身打造的電力優化成功案例。
                    </p>
                </div>
                <CaseStudyList cases={consultancyCases} />
            </div>

            {/* Track Records Section */}
            <TrackRecordGallery
                records={consultancyRecords}
                title="相關工程實績"
            />

            <AssessmentForm type="consultancy" />
        </div>
    );
}
