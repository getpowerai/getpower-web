import { getCases } from "@/app/actions/caseActions";
import { CaseStudyList } from "@/components/content/CaseStudyList";
import { getRecords } from "@/app/actions/recordActions";
import { TrackRecordGallery } from "@/components/content/TrackRecordGallery";
import { AssessmentForm } from "@/components/forms/AssessmentForm";
import { getArticles } from "@/app/actions/articleActions";
import { ArticleGrid } from "@/components/content/ArticleGrid";
import { getVideos } from "@/app/actions/videoActions";
import { VideoGrid } from "@/components/content/VideoGrid";
import { ShieldCheck, Settings, TrendingUp } from "lucide-react";

export default async function SelfBuiltPage() {
    const allCases = await getCases();
    const selfBuiltCases = allCases.filter(c => c.category === "Self-Built");

    const allRecords = await getRecords();
    const selfBuiltRecords = allRecords.filter(r => r.category === "Self-Built");

    const allArticles = await getArticles();
    const selfBuiltArticles = allArticles.filter(a => a.category === "Self-Built");

    const allVideos = await getVideos();
    const selfBuiltVideos = allVideos.filter(v => v.category === "Self-Built" && v.isVisible !== false);

    return (
        <div className="bg-white">
            <div className="relative isolate overflow-hidden bg-primary px-6 pt-14 pb-16 lg:px-8">
                <div className="absolute inset-0 -z-10 bg-black/20"></div>
                <div className="mx-auto max-w-2xl py-20 sm:py-32 lg:py-40 text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                        自建電廠 / 出租屋頂
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-200">
                        無論是想自行投資太陽能電廠賺取20年穩定收益，或是閒置屋頂出租坐收租金，
                        吉陽能源都是您最值得信賴的合作夥伴。
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <a
                            href="#assessment-form"
                            className="rounded-md bg-accent px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                        >
                            免費評估試算
                        </a>
                        <a href="#cases" className="text-sm font-semibold leading-6 text-white hover:text-accent transition-colors">
                            查看成功案例 <span aria-hidden="true">→</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Core Value & Features Section */}
            <div className="bg-white py-16 sm:py-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center">
                        <h2 className="text-base font-semibold leading-7 text-primary">核心價值</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            十年耕耘，成就綠能基石
                        </p>
                        <p className="mt-6 text-lg leading-8 text-gray-600 text-left sm:text-center">
                            「自建與出租屋頂」業務是公司永續發展的重要根基。過去十多年間，我們以此為起點，逐步奠定了深厚的產業經驗與技術實力。
                            我們深知太陽能電廠是一項長達 20 年的承諾，因此始終堅持將每一座案場視為己出，為客戶守護長期且穩定的綠色資產。
                        </p>
                    </div>

                    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
                            {/* Professional Process */}
                            <div className="flex flex-col bg-slate-50 p-8 rounded-2xl">
                                <dt className="flex items-center gap-x-3 text-xl font-bold leading-7 text-gray-900 mb-4">
                                    <Settings className="h-8 w-8 text-primary" aria-hidden="true" />
                                    專業流程：一站式全生命週期服務
                                </dt>
                                <dd className="flex flex-auto flex-col text-base leading-7 text-gray-600">
                                    <p className="flex-auto mb-4 font-medium">我們累積了從法規面到實作面的完整專業技術（Know-how），確保您的屋頂發揮最大效益：</p>
                                    <ul className="space-y-3 list-none">
                                        <li className="flex gap-2">
                                            <span className="font-bold text-gray-900 whitespace-nowrap">精準規劃：</span>
                                            <span>涵蓋相關法規諮詢、場域規劃與系統設計。</span>
                                        </li>
                                        <li className="flex gap-2">
                                            <span className="font-bold text-gray-900 whitespace-nowrap">嚴謹建置：</span>
                                            <span>憑藉豐富的施工經驗，在建設階段即預先規避未來可能的運行風險。</span>
                                        </li>
                                        <li className="flex gap-2">
                                            <span className="font-bold text-gray-900 whitespace-nowrap">專業維運：</span>
                                            <span>提供完善的後續維修與運營管理服務。</span>
                                        </li>
                                    </ul>
                                </dd>
                            </div>

                            {/* Technical Advantage */}
                            <div className="flex flex-col bg-slate-50 p-8 rounded-2xl">
                                <dt className="flex items-center gap-x-3 text-xl font-bold leading-7 text-gray-900 mb-4">
                                    <TrendingUp className="h-8 w-8 text-primary" aria-hidden="true" />
                                    技術優勢：預見問題，確保穩定收益
                                </dt>
                                <dd className="flex flex-auto flex-col text-base leading-7 text-gray-600">
                                    <p className="flex-auto mb-4 font-medium">太陽能發電的核心在於「長期穩定性」，而經驗是無法取代的護城河：</p>
                                    <ul className="space-y-3 list-none">
                                        <li className="flex gap-2">
                                            <span className="font-bold text-gray-900 whitespace-nowrap">十年實測數據：</span>
                                            <span>我們擁有營運超過 10 年以上的電場數據，能精準預防長期運行可能遇到的技術瓶頸。</span>
                                        </li>
                                        <li className="flex gap-2">
                                            <span className="font-bold text-gray-900 whitespace-nowrap">自主監控系統：</span>
                                            <span>導入自有的智慧監控系統，實現「自動診斷」功能，即時掌握電場健康狀態。</span>
                                        </li>
                                        <li className="flex gap-2">
                                            <span className="font-bold text-gray-900 whitespace-nowrap">創造現金流：</span>
                                            <span>透過高品質的工程與數據化管理，確保電場表現如預期，為您創造優質的現金流。</span>
                                        </li>
                                    </ul>
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>

            <ArticleGrid
                articles={selfBuiltArticles}
                title="相關專欄"
                className="bg-white"
            />

            {/* Content for Self-Built vs Rental comparison */}
            <div className="py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:gap-x-8">
                        {/* Self-Built */}
                        <div className="border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
                            <h3 className="text-2xl font-bold text-gray-900">自建電廠 (投資型)</h3>
                            <p className="mt-4 text-gray-600">由您出資興建，吉陽負責統包工程。發電收益全數歸您所有。</p>
                            <ul className="mt-8 space-y-3 text-gray-600 list-disc list-inside">
                                <li>享受全額售電收入 (約 8-12% 年投報率)</li>
                                <li>需負擔初期建置成本</li>
                                <li>需負責後續維運 (可委託吉陽代管)</li>
                                <li>適合：資金充裕、追求高投報率的業主</li>
                            </ul>
                        </div>

                        {/* Rental */}
                        <div className="border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow bg-gray-50">
                            <h3 className="text-2xl font-bold text-gray-900">出租屋頂 (零出資)</h3>
                            <p className="mt-4 text-gray-600">您提供屋頂，吉陽出資興建與維運。您依發電量或固定租金收取回饋。</p>
                            <ul className="mt-8 space-y-3 text-gray-600 list-disc list-inside">
                                <li>完全零成本、零風險</li>
                                <li>坐收20年穩定租金或回饋金</li>
                                <li>獲得免費屋頂隔熱與防水效益</li>
                                <li>適合：不想煩惱維運、想活化閒置資產的業主</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <VideoGrid
                videos={selfBuiltVideos}
                title="精選影音"
                className="bg-gray-50"
            />

            {/* Case Studies Section */}
            <div id="cases">
                <div className="py-12 text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        精選個案說明
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto px-6">
                        看看我們如何協助客戶創造綠能收益。
                    </p>
                </div>
                <CaseStudyList cases={selfBuiltCases} />
            </div>

            {/* Track Records Section */}
            <TrackRecordGallery
                records={selfBuiltRecords}
                title="相關工程實績"
            />

            <AssessmentForm type="self-built" />
        </div>
    );
}
