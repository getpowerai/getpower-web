
const scenarios = [
    {
        title: "發電嚴重衰減",
        situation: "案場運作超過 10 年，發電量已剩不到原來的 50%，且維運成本逐年增加。",
        potential: "產能翻倍",
        highlight: "ROI 大幅提升",
        description: "透過高效能模組替換，在同樣面積下可擴充至 2 倍容量，讓老舊資產重獲新生。",
    },
    {
        title: "早期微晶矽薄膜",
        situation: "使用早期的微晶矽薄膜模組，轉換效率僅 7~8%，佔用大量屋頂面積。",
        potential: "容量 5 倍跳躍",
        highlight: "土地效益最大化",
        description: "更換為高效單晶模組後，容量可提升至原來的 5 倍，將屋頂價值發揮到極致。",
    },
    {
        title: "CIGS 薄膜模組",
        situation: "早期安裝的 CIGS 薄膜模組，效能已不符現代標準，與新技術落差巨大。",
        potential: "容量 3 倍提升",
        highlight: "資產價值翻轉",
        description: "保留原合約費率，新增的 2~3 倍容量可轉售綠電，創造雙重收益來源。",
    },
    {
        title: "受環境污染影響",
        situation: "案場位於工業區或沿海，受粉塵、鹽害影響嚴重，導致模組效率低落。",
        potential: "效率極大化",
        highlight: "發電量倍增",
        description: "重新規劃模組配置，避開高污染區域，僅需使用部分屋頂即可達到原有發電量。",
    },
    {
        title: "樹木遮蔭與熱點",
        situation: "周邊樹木生長造成長期遮蔭，導致模組產生熱點甚至燒毀風險。",
        potential: "消除隱患",
        highlight: "解決熱點風險",
        description: "透過重新設計排版避開遮蔭，並全面更新模組，徹底解決安全隱患並提升發電。",
    },
    {
        title: "屋頂鏽蝕與漏水",
        situation: "屋頂浪板年久失修，出現嚴重鏽蝕與漏水，影響廠房運作。",
        potential: "結構強化",
        highlight: "結構安全升級",
        description: "趁舊換新之際同步進行屋頂翻修，一次解決漏水問題，確保未來 20 年結構安全。",
    },
];

export function RevampingCases() {
    return (
        <div className="bg-slate-50 py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center mb-16">
                    <h2 className="text-base font-semibold leading-7 text-accent">常見情境分析</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        您的案場是否面臨這些狀況？
                    </p>
                    <p className="mt-4 text-lg text-gray-600">
                        針對不同老化與環境問題，舊換新都能帶來顯著的改善效益。
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {scenarios.map((scenario, index) => (
                        <div key={index} className="flex flex-col justify-between rounded-3xl bg-white p-8 shadow-md ring-1 ring-gray-200 xl:p-10 hover:shadow-lg transition-shadow">
                            <div>
                                <h3 id={scenario.title} className="text-base font-semibold leading-7 text-accent">
                                    情境 {index + 1}
                                </h3>
                                <p className="mt-4 flex items-baseline gap-x-2">
                                    <span className="text-2xl font-bold tracking-tight text-gray-900">{scenario.title}</span>
                                </p>
                                <p className="mt-6 text-base leading-7 text-gray-600">{scenario.description}</p>
                                <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                                    <li className="flex gap-x-3">
                                        <span className="font-semibold text-gray-900 flex-none">現況：</span>
                                        <span className="text-gray-600">{scenario.situation}</span>
                                    </li>
                                    <li className="flex gap-x-3">
                                        <span className="font-semibold text-gray-900 flex-none">潛力：</span>
                                        <span className="text-gray-600">{scenario.potential}</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="mt-8 pt-8 border-t border-gray-100">
                                <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-sm font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                    {scenario.highlight}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
