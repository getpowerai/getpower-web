import { getVideos } from "@/app/actions/videoActions";
import { getCases } from "@/app/actions/caseActions";
import { getRecords } from "@/app/actions/recordActions";
import { getArticles } from "@/app/actions/articleActions";
import { ArticleGrid } from "@/components/content/ArticleGrid";
import { VideoGrid } from "@/components/content/VideoGrid";
import { CaseStudyList } from "@/components/content/CaseStudyList";
import { TrackRecordGallery } from "@/components/content/TrackRecordGallery";
import { AssessmentForm } from "@/components/forms/AssessmentForm";

export default async function NewBuildingsPage() {
    const allVideos = await getVideos();
    const allArticles = await getArticles();
    const newBuildingArticles = allArticles.filter(a => a.category === "New Buildings");

    // Fetch records dynamically
    const allRecords = await getRecords();
    const newBuildingRecords = allRecords.filter(r => r.category === "New Buildings");
    const newBuildingVideos = allVideos
        .filter(v => v.category === "New Buildings" && v.isVisible !== false);

    // Fetch cases dynamically
    const allCases = await getCases();
    const newBuildingCases = allCases.filter(c => c.category === "New Buildings");

    // Logic: 2 latest + 2 recommended. For now, we simple take first 4 filtered.
    const displayArticles = newBuildingArticles.slice(0, 4);
    const displayVideos = newBuildingVideos.slice(0, 4);

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative isolate overflow-hidden bg-primary px-6 pt-14 pb-16 lg:px-8">
                <div className="absolute inset-0 -z-10 bg-black/20"></div>
                <div className="mx-auto max-w-2xl py-20 sm:py-32 lg:py-40 text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                        新建物太陽能解決方案
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-200">
                        從建築設計階段導入光電思維，打造美觀、節能、合規的現代化綠建築。
                        我們協助建築師、起造人與營造商，實現建築與能源的完美結合。
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <a
                            href="#assessment-form"
                            className="rounded-md bg-accent px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                        >
                            立即免費評估
                        </a>
                        <a href="#cases" className="text-sm font-semibold leading-6 text-white hover:text-accent transition-colors">
                            查看成功案例 <span aria-hidden="true">→</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Risks Section */}
            <div className="bg-white py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center">
                        <h2 className="text-base font-semibold leading-7 text-accent">為什麼需要前期規劃？</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            新建物若不先規劃會遇到哪些問題？
                        </p>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            太陽能系統不應是建築的「外掛」，而是建築的一部分。提前規劃能避免許多後續衍生的工程風險與責任歸屬問題。
                        </p>
                    </div>
                    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                            {[
                                {
                                    name: '盲鑽風險',
                                    description: '後續施工可能面臨鑽孔風險，若不慎鑽到管線（水管、電管），將造成難以修復的損害，是建商與屋主最不願見到的情況。',
                                    icon: (
                                        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                        </svg>
                                    ),
                                },
                                {
                                    name: '防水責任的釐清',
                                    description: '若完工後才安裝太陽能，防水層一旦被太陽能廠商鑽開，原建商通常會宣告該區域失去防水保固。提前規劃能統一保固窗口，保障屋主權益。',
                                    icon: (
                                        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75v-4.5m0 4.5h4.5m-4.5 0l6-6m-3 18c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 014.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 00-.38 1.21 12.035 12.035 0 007.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 011.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 01-2.25 2.25h-2.25z" />
                                        </svg>
                                    ),
                                },
                                {
                                    name: '接地值的科學性',
                                    description: '接地不是隨便插根棒子。在基礎工程時，利用結構鋼筋作為自然接地體，能達到標準歐姆值，效果遠優於事後施工，確保系統安全。',
                                    icon: (
                                        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                                        </svg>
                                    ),
                                },
                                {
                                    name: '建築美學即房價',
                                    description: '變流器掛門口、明管滿天飛會拉低建物「檔次」。預先規劃能將能源設備視為建築設計的一部分，讓太陽能成為加分項而非礙眼的附屬品。',
                                    icon: (
                                        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                        </svg>
                                    ),
                                },
                            ].map((feature) => (
                                <div key={feature.name} className="relative pl-16">
                                    <dt className="text-base font-semibold leading-7 text-gray-900">
                                        <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                                            {feature.icon}
                                        </div>
                                        {feature.name}
                                    </dt>
                                    <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>

            {/* Articles Section */}
            <ArticleGrid
                articles={displayArticles}
                title="新建物相關專欄"
                className="bg-white"
            />

            {/* Videos Section */}
            <VideoGrid
                videos={displayVideos}
                title="影音介紹"
            />

            {/* Clients Section */}
            <div className="py-16 bg-slate-50">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <h2 className="text-center text-lg font-semibold leading-8 text-gray-900 mb-8">
                        合作過客戶
                    </h2>
                    <div className="mx-auto grid max-w-lg grid-cols-2 gap-x-8 gap-y-12 sm:max-w-xl sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4">
                        {/* 建設公司 */}
                        <div className="flex flex-col items-center">
                            <h3 className="text-sm font-semibold tracking-wider text-gray-500 uppercase mb-6">
                                建設公司
                            </h3>
                            <div className="flex flex-col gap-8 justify-start h-full items-center">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    className="max-h-12 w-auto object-contain"
                                    src="/images/clients/banmutang.png"
                                    alt="半畝塘"
                                />
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    className="max-h-16 w-auto object-contain"
                                    src="/images/clients/lishin.png"
                                    alt="力信建設"
                                />
                            </div>
                        </div>

                        {/* 建築師 */}
                        <div className="flex flex-col items-center">
                            <h3 className="text-sm font-semibold tracking-wider text-gray-500 uppercase mb-6">
                                建築師
                            </h3>
                            <div className="flex flex-col gap-8 justify-start h-full items-center">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    className="max-h-16 w-auto object-contain"
                                    src="/images/clients/baf.png"
                                    alt="九典聯合建築師事務所"
                                />
                            </div>
                        </div>

                        {/* 營造廠 */}
                        <div className="flex flex-col items-center">
                            <h3 className="text-sm font-semibold tracking-wider text-gray-500 uppercase mb-6">
                                營造廠
                            </h3>
                            <div className="flex flex-col gap-8 justify-start h-full items-center">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    className="max-h-12 w-auto object-contain"
                                    src="/images/clients/ctci.png"
                                    alt="CTCI 中鼎集團"
                                />
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    className="max-h-16 w-auto object-contain"
                                    src="/images/clients/fortune.png"
                                    alt="福清營造"
                                />
                            </div>
                        </div>

                        {/* 起造人 */}
                        <div className="flex flex-col items-center">
                            <h3 className="text-sm font-semibold tracking-wider text-gray-500 uppercase mb-6">
                                起造人
                            </h3>
                            <div className="flex flex-col gap-8 justify-start h-full items-center">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    className="max-h-12 w-auto object-contain"
                                    src="/images/clients/novatek.png"
                                    alt="NOVATEK 聯詠科技"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Case Studies Section */}
            <div id="cases">
                <div className="py-12 text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        精選個案說明
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto px-6">
                        每個個案都有其獨特性，我們致力於針對客戶需求客製化設計。
                    </p>
                </div>
                <CaseStudyList cases={newBuildingCases} />
            </div>

            {/* Track Records Section */}
            <TrackRecordGallery
                records={newBuildingRecords}
                title="相關工程實績"
            />

            {/* Assessment Form */}
            <AssessmentForm type="new" />
        </div>
    );
}
