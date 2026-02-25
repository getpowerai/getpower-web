import { BarChart3, Cpu, PieChart, Zap, CheckCircle2 } from "lucide-react";

const stages = [
    {
        name: "第一階段：能源數據健檢（Energy Diagnosis）",
        highlight: "不是先談設備，而是先談電。",
        description: "蒐集資料並盤點現狀，這是所有優化的基礎。",
        icon: BarChart3,
        details: [
            "收集用電資料",
            "尖峰／離峰負載分佈析",
            "契約容量使用率分析",
            "電價結構與制度盤點",
            "可參與政策與市場機制盤點",
        ],
        outputs: [
            "工廠能源體質報告",
            "尖離峰差異與容量壓力圖",
            "制度適配性分析"
        ]
    },
    {
        name: "第二階段：多模型情境模擬（Scenario Simulation）",
        highlight: "這才是真正的核心競爭力。",
        description: "同時比較所有制度組合，找出最具效益的方案。",
        icon: Cpu,
        details: [
            "1️⃣ 太陽能自發自用模型",
            "2️⃣ 全額售電模型",
            "3️⃣ 儲能套利模型（單循環／雙循環）",
            "4️⃣ 降契約容量模型",
            "5️⃣ 需量反應與輔助服務參與模型",
        ],
        outputs: [
            "各方案 IRR / 回收年限比較",
            "20 年現金流模型",
            "風險敏感度分析"
        ],
        note: "重點不是順序，而是同時比較所有制度組合。例如：自發自用＋憑證收益、全額售電＋儲能套利等。"
    },
    {
        name: "第三階段：最佳組合設計（Portfolio Optimization）",
        highlight: "不是選設備，是選「收益結構」。",
        description: "作為收益設計顧問，我們提供最專業的決策建議。",
        icon: PieChart,
        details: [
            "✔ 只裝太陽能",
            "✔ 只做儲能套利",
            "✔ 太陽能＋儲能",
            "✔ 儲能＋DR市場",
            "✔ 太陽能＋售電＋DR",
            "✔ 暫緩建置（有時候也是最佳決策）",
        ],
        outputs: [
            "最終配置方案建議",
            "設備選型與技術介接規格",
            "預估收益報告"
        ]
    },
    {
        name: "第四階段：動態優化與自我學習（Dynamic Optimization & Self-Learning）",
        highlight: "能源系統不是建置完成就結束。",
        description: "透過數據回歸分析與即時監測，讓系統每一年都比上一年更有效率。",
        icon: Zap,
        details: [
            "儲能容量升級評估",
            "契約容量優化建議",
            "充放電策略調整",
            "可調度負載啟動建議",
            "電力市場參與策略重整",
        ],
        outputs: [
            "數據回歸分析與優化建議",
            "運行監測與偏差預警",
            "年度效率提升方案"
        ]
    },
];

export function ConsultancyStages() {
    return (
        <div className="bg-slate-50 py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h2 className="text-base font-semibold leading-7 text-accent">服務流程</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        閉環式的能源資產管理
                    </p>
                    <p className="mt-4 text-lg text-gray-600">
                        分析 → 設計 → 建置 → 優化 → 再分析，<br />
                        我們讓您的每一度電，都能發揮最大的價值。
                    </p>
                </div>
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-12 lg:grid-cols-2">
                        {stages.map((stage) => (
                            <div key={stage.name} className="flex flex-col bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-x-4 mb-6">
                                    <div className="flex-none rounded-2xl bg-slate-50 p-3">
                                        <stage.icon className="h-8 w-8 text-accent" aria-hidden="true" />
                                    </div>
                                    <h3 className="text-xl font-bold leading-7 text-gray-900">
                                        {stage.name}
                                    </h3>
                                </div>

                                <div className="mb-6">
                                    <p className="text-accent font-bold mb-1">{stage.highlight}</p>
                                    <p className="text-gray-600">{stage.description}</p>
                                </div>

                                <div className="flex-auto space-y-6">
                                    <ul className="space-y-3">
                                        {stage.details.map((detail, idx) => (
                                            <li key={idx} className="flex gap-x-3 text-sm text-gray-600">
                                                <CheckCircle2 className="h-5 w-5 text-accent flex-none" />
                                                {detail}
                                            </li>
                                        ))}
                                    </ul>

                                    {stage.outputs && (
                                        <div className="bg-slate-50/50 rounded-2xl p-4 border border-slate-100">
                                            <p className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                                                👉 產出：
                                            </p>
                                            <div className="grid grid-cols-1 gap-2">
                                                {stage.outputs.map((output, idx) => (
                                                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                                                        <span className="text-accent">●</span>
                                                        {output}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {stage.note && (
                                        <p className="text-xs text-gray-400 italic">
                                            注：{stage.note}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
