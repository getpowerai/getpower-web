import { getVideos } from "@/app/actions/videoActions";
import { getRecords } from "@/app/actions/recordActions";
import { getCases } from "@/app/actions/caseActions";
import { VideoGrid } from "@/components/content/VideoGrid";
import { TrackRecordGallery } from "@/components/content/TrackRecordGallery";
import { CaseStudyList } from "@/components/content/CaseStudyList";
import { AssessmentForm } from "@/components/forms/AssessmentForm";
import { RevampingBenefits } from "@/components/content/RevampingBenefits";
import { RevampingNeedComparison } from "@/components/content/RevampingNeedComparison";

import { CheckCircle2 } from "lucide-react";

export default async function RevampingPage() {
    const allVideos = await getVideos();
    const revampVideos = allVideos
        .filter(v => v.category === "Revamping" && v.isVisible !== false)
        .slice(0, 4);

    const allCases = await getCases();
    const revampingCases = allCases.filter(c => c.category === "Revamping");

    const allRecords = await getRecords();
    const revampingRecords = allRecords.filter(r => r.category === "Revamping");

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative isolate overflow-hidden bg-primary px-6 pt-14 pb-16 lg:px-8">
                <div className="absolute inset-0 -z-10 bg-black/20"></div>
                <div className="mx-auto max-w-2xl py-20 sm:py-32 lg:py-40 text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                        太陽能模組舊換新 (Repowering)
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-200">
                        不只是修復，而是容量翻倍的投資升級。
                        <br />
                        您的屋頂，是否正以十年前的技術在跑現在的電價？
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <a
                            href="#assessment-form"
                            className="rounded-md bg-accent px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                        >
                            立即免費評估
                        </a>
                        <a href="#improvement-cases" className="text-sm font-semibold leading-6 text-white hover:text-accent transition-colors">
                            查看改善案例 <span aria-hidden="true">→</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Benefits Section */}
            <RevampingBenefits />

            {/* Comparison Section */}
            <RevampingNeedComparison />



            {/* Conditions Checklist Section */}
            <div className="bg-white py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:mx-0">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            什麼時候該評估舊換新？
                        </h2>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            如果您的案場符合以下任一條件，建議立即進行專業檢測：
                        </p>
                    </div>
                    <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
                        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-3">
                            {[
                                "超過 10 年的案場",
                                "使用早期薄膜模組",
                                "發電衰減超過合理曲線",
                                "屋頂結構老舊鏽蝕",
                                "有遮蔭或污染問題"
                            ].map((feature) => (
                                <div key={feature} className="flex gap-x-3">
                                    <CheckCircle2 className="h-7 w-5 flex-none text-accent" aria-hidden="true" />
                                    <div className="text-base font-semibold leading-7 text-gray-900">{feature}</div>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>


            {/* Case Studies Section (Text) */}
            <div id="improvement-cases" className="bg-white">
                <div className="py-12 text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        改善個案說明
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto px-6">
                        吉陽能源協助眾多業主解決案場痛點，創造資產增值。
                    </p>
                </div>
                <CaseStudyList cases={revampingCases} />
            </div>

            {/* Videos Section */}
            <VideoGrid
                videos={revampVideos}
                title="改善實例影音"
            />

            {/* Track Records Section */}
            <TrackRecordGallery
                records={revampingRecords}
                title="相關工程實績"
            />

            {/* Assessment Form */}
            <AssessmentForm type="revamp" />
        </div>
    );
}
