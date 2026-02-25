import { getCases } from "@/app/actions/caseActions";
import { getRecords } from "@/app/actions/recordActions";
import { getArticles } from "@/app/actions/articleActions";
import { ArticleGrid } from "@/components/content/ArticleGrid";
import { CaseStudyList } from "@/components/content/CaseStudyList";
import { TrackRecordGallery } from "@/components/content/TrackRecordGallery";
import { AssessmentForm } from "@/components/forms/AssessmentForm";
import { getVideos } from "@/app/actions/videoActions";
import { VideoGrid } from "@/components/content/VideoGrid";

export default async function SpecialProjectsPage() {
    const allArticles = await getArticles();
    const specialArticles = allArticles.filter(a => a.category === "Special");

    const allVideos = await getVideos();
    const specialVideos = allVideos.filter(v => v.category === "Special" && v.isVisible !== false);

    const allCases = await getCases();
    const specialCases = allCases.filter(c => c.category === "Special");

    const allRecords = await getRecords();
    const specialRecords = allRecords.filter(r => r.category === "Special");

    return (
        <div className="bg-white">
            <div className="relative isolate overflow-hidden bg-primary px-6 pt-14 pb-16 lg:px-8">
                <div className="absolute inset-0 -z-10 bg-black/20"></div>
                <div className="mx-auto max-w-2xl py-20 sm:py-32 lg:py-40 text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                        創新太陽能應用
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-200">
                        打破空間限制，極大化發電潛力。
                        <br />
                        當傳統屋頂空間逐漸飽和，我們提供更多元、靈活的特殊型解決方案，讓「發電」與「空間利用」達到完美平衡。
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <a
                            href="#assessment-form"
                            className="rounded-md bg-accent px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                        >
                            專案諮詢
                        </a>
                        <a href="#features" className="text-sm font-semibold leading-6 text-white hover:text-accent transition-colors">
                            查看解決方案 <span aria-hidden="true">→</span>
                        </a>
                    </div>
                </div>
            </div>

            <ArticleGrid
                articles={specialArticles}
                title="相關專欄"
                className="bg-white"
            />

            {/* Feature Sections */}
            {/* Feature Sections */}
            <div id="features" className="py-16 sm:py-24 bg-white">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center mb-16">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            四大創新解決方案
                        </h2>
                        <p className="mt-4 text-lg text-gray-600">
                            針對結構受限、立面空間、臨時需求與建築整合，我們提供對應的專業技術。
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        {/* 1. Flexible Solar */}
                        <div className="flex flex-col gap-4">
                            <div className="rounded-2xl bg-gray-50 p-8 h-full border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-orange-100 p-3">
                                    <svg className="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">1. 輕量化軟式太陽能</h3>
                                <p className="text-sm font-semibold text-accent mb-4">弱結構屋頂的救星</p>
                                <p className="text-gray-600 mb-4">
                                    針對結構強度較差、無法承載傳統玻璃模組的屋頂，導入極致輕量化的軟式模組。不須額外補強結構即可安裝。
                                </p>
                                <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm">
                                    <li><strong className="text-gray-900">重量極輕：</strong>僅傳統模組的 20% 重量</li>
                                    <li><strong className="text-gray-900">可彎曲：</strong>適應圓弧形屋頂或不規則表面</li>
                                    <li><strong className="text-gray-900">適用對象：</strong>老舊廠房、畜牧設施、建築物曲面結構上</li>
                                </ul>
                            </div>
                        </div>

                        {/* 2. Bifacial Facade */}
                        <div className="flex flex-col gap-4">
                            <div className="rounded-2xl bg-gray-50 p-8 h-full border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-blue-100 p-3">
                                    <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">2. 立面雙面發電系統</h3>
                                <p className="text-sm font-semibold text-accent mb-4">立體空間的極致運用</p>
                                <p className="text-gray-600 mb-4">
                                    利用雙面發電模組，讓太陽能「站著發電」。不佔用地面與作物生長空間，同時利用反射光增加發電量。
                                </p>
                                <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm">
                                    <li><strong className="text-gray-900">空間釋放：</strong>地面可維持原有用途 (如種植)</li>
                                    <li><strong className="text-gray-900">雙面發電：</strong>捕捉背面散射光，提升效益</li>
                                    <li><strong className="text-gray-900">應用場景：</strong>玻璃圍籬、隔音牆、農光互補 (Agri-PV)</li>
                                </ul>
                            </div>
                        </div>

                        {/* 3. Mobile / Removable */}
                        <div className="flex flex-col gap-4">
                            <div className="rounded-2xl bg-gray-50 p-8 h-full border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-green-100 p-3">
                                    <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.126-.504 1.126-1.125V14.25m-17.25 4.5h3.75m-3.75 0V14.25m17.25 4.5h-3.75m3.75 0V14.25m-17.25-2.25h17.25" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">3. 移動式與易拆遷系統</h3>
                                <p className="text-sm font-semibold text-accent mb-4">緊急與臨時用電首選</p>
                                <p className="text-gray-600 mb-4">
                                    為因應天災、緊急救災或中短期電力需求開發的易搬動系統。規模優於一般露營設備，提供穩定的中型電力輸出。
                                </p>
                                <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm">
                                    <li><strong className="text-gray-900">高效機動：</strong>可快速部署與拆卸</li>
                                    <li><strong className="text-gray-900">彈性應用：</strong>使用期間可長達數月至半年</li>
                                    <li><strong className="text-gray-900">應用場景：</strong>避難所、臨時工地、大型活動</li>
                                </ul>
                            </div>
                        </div>

                        {/* 4. BIPV */}
                        <div className="flex flex-col gap-4">
                            <div className="rounded-2xl bg-gray-50 p-8 h-full border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-purple-100 p-3">
                                    <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">4. BIPV 建築整合太陽能/防水型太陽能</h3>
                                <p className="text-sm font-semibold text-accent mb-4">發電即建材</p>
                                <p className="text-gray-600 mb-4">
                                    將太陽能板直接轉化為建築材料 (建材一體型)。讓外牆或遮陽板在發電的同時，也能降低室內溫度，兼具美學與功能。
                                </p>
                                <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm">
                                    <li><strong className="text-gray-900">美觀節能：</strong>取代傳統建材，阻隔熱源</li>
                                    <li><strong className="text-gray-900">空間優化：</strong>不額外占用空間</li>
                                    <li><strong className="text-gray-900">應用場景：</strong>屋頂防水型隔熱棚、曬衣場、商辦帷幕牆、現代化住宅</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Trends Section */}
            <div className="py-16 sm:py-24 bg-slate-50">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-4xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">
                            為什麼創新太陽能會成為趨勢？
                        </h2>
                        <p className="text-lg text-gray-600 mb-12">
                            當傳統追求高 CP 值的標準案場逐漸飽和，市場開始長出新型態。「創新太陽能」不再是實驗性的產物，而是解決市場痛點的必要方案。
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="bg-white p-8 rounded-xl shadow-sm">
                            <div className="text-4xl font-bold text-primary mb-4">01</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">傳統場域飽和</h3>
                            <p className="text-gray-600">容易施作的屋頂與土地日益稀缺，必須向立體空間或特殊載具發展。</p>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-sm">
                            <div className="text-4xl font-bold text-primary mb-4">02</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">技術突破</h3>
                            <p className="text-gray-600">模組輕量化、雙面發電效率提升，讓過去「不能裝」的地方變得可行。</p>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-sm">
                            <div className="text-4xl font-bold text-primary mb-4">03</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">用電需求多元</h3>
                            <p className="text-gray-600">從防災臨時用電到 ESG 建築整合，能源需求不再單一，解決方案也必須多元。</p>
                        </div>
                    </div>

                    <div className="mt-16 text-center border-t border-gray-200 pt-12">
                        <p className="text-2xl font-bold text-gray-900">
                            市場永遠不缺電力需求，缺的是「適合場域的解決方案」。
                        </p>
                        <p className="mt-4 text-gray-600">
                            吉陽電力顧問不只規劃傳統系統，更為特殊場域提供最適合的太陽能策略。
                        </p>
                    </div>
                </div>
            </div>

            <VideoGrid
                videos={specialVideos}
                title="精選影音"
                className="bg-gray-50"
            />

            <div id="cases" className="py-12">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8 text-center">
                        創新案例
                    </h2>
                    {specialCases.length > 0 ? (
                        <CaseStudyList cases={specialCases} />
                    ) : (
                        <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg">
                            目前尚無特殊專案公開資料。
                        </div>
                    )}
                </div>
            </div>

            {/* Track Records Section */}
            <TrackRecordGallery
                records={specialRecords}
                title="相關工程實績"
            />

            <div className="py-24 bg-gray-50">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-6">
                        您有特殊的場域想規劃嗎？
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                        我們的工程團隊樂於接受挑戰。無論地形多複雜，我們都能為您找出最佳解決方案。
                    </p>
                </div>
            </div>

            <AssessmentForm type="special" />
        </div >
    );
}
