import { FileText, Landmark, LineChart, PieChart, Database, Zap, TrendingUp, ShieldCheck, Target } from "lucide-react";

export function ConsultancyIntegration() {
    const integrations = [
        {
            title: "再生能源政策",
            icon: FileText,
            description: "追蹤最新能源法規與永續發展政策。"
        },
        {
            title: "綠電交易制度",
            icon: Landmark,
            description: "參與太陽能與風能等再生能源憑證與電力交易。"
        },
        {
            title: "電力輔助服務市場",
            icon: Zap,
            description: "參與台電調頻輔助服務 (AFC) 與即時備轉。"
        },
        {
            title: "儲能收益模型",
            icon: PieChart,
            description: "精算儲能設備在不同市場機制下的投資報酬率。"
        },
        {
            title: "工廠負載數據分析",
            icon: Database,
            description: "深入分析企業用電特性，規畫最合適的參與方案。"
        }
    ];

    const outcomes = [
        { text: "降低能源成本", icon: LineChart },
        { text: "創造額外收益", icon: TrendingUp },
        { text: "提升碳管理能力", icon: ShieldCheck },
        { text: "提高能源韌性", icon: Target }
    ];

    return (
        <div className="bg-slate-50 py-24 sm:py-32 border-t border-slate-200">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center mb-16">
                    <h2 className="text-base font-semibold leading-7 text-accent uppercase tracking-wide">政策整合 × 市場機制 × 技術配置</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        我們不只提供技術，更整合完整的電力價值鏈
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Integration Points */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                        <h3 className="text-2xl font-bold text-gray-900 mb-8 border-l-4 border-accent pl-4">
                            我們整合：
                        </h3>
                        <div className="space-y-6">
                            {integrations.map((item, idx) => (
                                <div key={idx} className="flex gap-4">
                                    <div className="flex-none rounded-lg bg-slate-50 p-2">
                                        <item.icon className="h-6 w-6 text-accent" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">{item.title}</h4>
                                        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Outcomes */}
                    <div className="lg:sticky lg:top-24">
                        <div className="bg-primary rounded-3xl p-8 text-white shadow-xl">
                            <h3 className="text-2xl font-bold mb-8 border-l-4 border-accent pl-4 text-white">
                                協助企業達成：
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {outcomes.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-4 bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                                        <item.icon className="h-8 w-8 text-accent flex-none" />
                                        <span className="text-lg font-bold">{item.text}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-10 p-6 bg-accent/20 rounded-2xl border border-accent/30 text-center">
                                <p className="text-accent font-bold text-lg italic">
                                    讓您的電力資產，從「成本負擔」轉化為「獲利來源」。
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
