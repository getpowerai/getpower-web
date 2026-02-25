import Link from "next/link";

export default function AboutPage() {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative isolate overflow-hidden bg-primary px-6 pt-14 pb-16 lg:px-8">
                <div className="absolute inset-0 -z-10 bg-black/20"></div>
                <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 sm:py-32 lg:py-40 text-center ">
                    <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                        <div className="mb-4 inline-flex items-center rounded-full bg-accent/10 px-3 py-1 text-sm font-semibold text-accent ring-1 ring-inset ring-accent/20">
                            About Us
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                            Power the world with Giant Energy
                        </h1>
                        <p className="mt-6 text-xl leading-8 text-gray-200">
                            以誠信與創新，引領能源轉型。
                            <br />
                            我們致力於提供給世界更棒、更永續的能源解決方案。
                        </p>
                    </div>
                </div>
            </div>

            {/* Vision / Mission Section */}
            <div className="bg-white py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center">
                        <h2 className="text-base font-semibold leading-7 text-accent">Our Mission</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            成為您能源轉型途中的最佳夥伴
                        </p>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            吉陽能源不只是設備商，更是您的能源顧問。我們透過五大核心服務，將企業願景轉化為具體的實踐。
                        </p>
                    </div>

                    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                            <div className="flex flex-col items-center text-center">
                                <dt className="text-xl font-semibold leading-7 text-gray-900 mb-4">
                                    卓越口碑 (Reputation)
                                </dt>
                                <dd className="text-base leading-7 text-gray-600">
                                    持續透過口碑行銷拓展生意，目標 50% 以上舊客戶願意推薦新客戶，建立長久的信任關係。
                                </dd>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <dt className="text-xl font-semibold leading-7 text-gray-900 mb-4">
                                    國際肯定 (Recognition)
                                </dt>
                                <dd className="text-base leading-7 text-gray-600">
                                    爭取國內外淨零系統商相關獎項（如創新服務獎），展現專業實力，與國際標準接軌。
                                </dd>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <dt className="text-xl font-semibold leading-7 text-gray-900 mb-4">
                                    佈局全球 (Global Reach)
                                </dt>
                                <dd className="text-base leading-7 text-gray-600">
                                    將台灣的成功經驗推廣至海外，成為具備國際競爭力的能源品牌，實現 Power the world 的願景。
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>

            {/* Service & Context Integration (The Jiyang Approach) */}
            <div className="bg-slate-50 py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center mb-16">
                        <h2 className="text-base font-semibold leading-7 text-accent">Our Approach</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            以核心價值驅動全方位服務
                        </p>
                        <p className="mt-4 text-lg text-gray-600">
                            我們的每一個服務項目，都深刻體現了吉陽的核心價值。
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {/* Consultancy */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                            <div className="text-accent font-semibold mb-2">電力顧問 x 誠信透明</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">客觀分析，真實呈現</h3>
                            <p className="text-gray-600">
                                我們為工廠與企業主提供最真實的數據分析。不誇大效益，誠實揭露潛在風險，確保每一個決策都建立在「誠信」的基礎上。
                            </p>
                        </div>

                        {/* Revamping */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                            <div className="text-accent font-semibold mb-2">汰舊換新 x 創新挑戰</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">賦予老電廠新生命</h3>
                            <p className="text-gray-600">
                                面對老舊設備的衰退，我們不畏困難，勇於採用新技術進行各類檢測與升級，展現「挑戰」現狀、追求卓越的精神。
                            </p>
                        </div>

                        {/* New Buildings */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                            <div className="text-accent font-semibold mb-2">新建物 x 安全至上</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">建築與能源的完美結合</h3>
                            <p className="text-gray-600">
                                從設計階段介入，確保太陽能系統與建築結構的安全性與協調性。我們將「安全」視為美學與功能的基石。
                            </p>
                        </div>

                        {/* Self-Built */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                            <div className="text-accent font-semibold mb-2">自建電廠 x 客戶優先</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">守護業主的長期收益</h3>
                            <p className="text-gray-600">
                                我們站在業主的角度，規劃最具長期效益的方案。不以短期獲利犧牲客戶權益，落實「客戶優先」的承諾。
                            </p>
                        </div>

                        {/* Innovative Solar */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                            <div className="text-accent font-semibold mb-2">創新太陽能 x 長期務實</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">探索未來的能源型態</h3>
                            <p className="text-gray-600">
                                針對特殊場域開發解決方案。我們以「務實」的態度評估可行性，同時保持對新科技的開放，佈局長遠的能源未來。
                            </p>
                        </div>

                        {/* Culture */}
                        <div className="bg-primary p-8 rounded-2xl shadow-sm border border-primary text-white">
                            <div className="text-accent font-semibold mb-2">企業文化 x 持續學習</div>
                            <h3 className="text-xl font-bold text-white mb-4">與夥伴共同成長</h3>
                            <p className="text-gray-200">
                                我們相信人才是一切的根本。鼓勵內部持續進修、分享知識，讓每一位吉陽人都能在能源轉型的浪潮中不斷進化。
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Core Values Detail Section */}
            <div className="py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center mb-16">
                        <h2 className="text-base font-semibold leading-7 text-accent">Core Values</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            六大核心價值
                        </p>
                        <p className="mt-4 text-lg text-gray-600">
                            這是吉陽人的DNA，指引我們在每一個專案中的決策與行為。
                        </p>
                    </div>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {[
                            {
                                title: "誠信透明",
                                subtitle: "Integrity & Transparency",
                                desc: "對內對外皆秉持誠信。每週提供施工週報，完工提供維護報告，讓客戶完全掌握案場狀況。"
                            },
                            {
                                title: "客戶優先",
                                subtitle: "Customer First",
                                desc: "當客戶利益與公司利益衝突時，我們堅持以客戶利益為優先考量，不以短期獲利犧牲客戶權益。"
                            },
                            {
                                title: "安全至上",
                                subtitle: "Safety First",
                                desc: "設計、工程與維護皆以安全為首要。不斷引進新工具與設計思維，全方位提升安全性。"
                            },
                            {
                                title: "長期務實",
                                subtitle: "Long-term Pragmatism",
                                desc: "以務實思維提供產品生命週期最佳解方。對內制度建立與人才養成，亦秉持長期主義。"
                            },
                            {
                                title: "創新挑戰",
                                subtitle: "Innovation & Challenge",
                                desc: "在務實基礎上勇於創新。導入新技術、嘗試新設計，無止境追求更優越的解決方案。"
                            },
                            {
                                title: "持續學習",
                                subtitle: "Continuous Learning",
                                desc: "人才是最重要資產。我們給予夥伴舞台與自主權，鼓勵在嘗試中不斷蛻變成更好的自己。"
                            },
                        ].map((value) => (
                            <div key={value.title} className="flex flex-col p-8 bg-white rounded-xl hover:shadow-lg transition-all border border-gray-100 ring-1 ring-gray-200/50">
                                <h3 className="text-2xl font-bold text-primary mb-1">{value.title}</h3>
                                <span className="text-xs font-semibold text-accent uppercase tracking-wider mb-4">{value.subtitle}</span>
                                <p className="text-gray-600 leading-relaxed">
                                    {value.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className="bg-primary py-16 sm:py-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-white mb-6">
                        尋找認同我們價值的夥伴
                    </h2>
                    <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
                        無論您是尋求能源解決方案的客戶，還是希望加入我們團隊的人才，
                        只要您認同這些價值，吉陽能源都歡迎您的加入。
                    </p>
                    <div className="flex justify-center gap-6">
                        <Link href="/contact" className="rounded-md bg-accent px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500">
                            聯絡我們
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
