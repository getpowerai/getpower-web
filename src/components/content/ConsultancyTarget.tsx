import { CheckCircle2 } from "lucide-react";

export function ConsultancyTarget() {
    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Target Audience */}
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">
                            哪些企業適合電力顧問服務？
                        </h2>
                        <ul className="space-y-4">
                            {[
                                "高壓供電工廠",
                                "產線可彈性調整之企業",
                                "有屋頂但不確定是否適合裝太陽能",
                                "電費支出金額較高",
                                "有 ESG 與減碳需求"
                            ].map((item, idx) => (
                                <li key={idx} className="flex gap-x-3 items-center text-lg text-gray-700">
                                    <CheckCircle2 className="h-6 w-6 text-green-600 flex-none" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Core Values */}
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">
                            吉陽電力顧問的核心價值
                        </h2>
                        <p className="text-lg text-gray-600 mb-6">
                            我們做的不是設備銷售，而是全方位的能源資產管理：
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                "用電最佳化",
                                "契約容量優化",
                                "電費結構重整",
                                "太陽能與儲能策略",
                                "需量反應收益",
                                "電力交易市場"
                            ].map((value, idx) => (
                                <div key={idx} className="bg-slate-50 p-4 rounded-lg font-semibold text-gray-900 border border-slate-200 text-center">
                                    {value}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-20 text-center border-t border-gray-200 pt-16">
                    <p className="text-2xl font-bold text-gray-900 mb-4">
                        電力成本已不只是成本，而是一種可以經營的資產。
                    </p>
                    <p className="text-lg text-gray-600">
                        在電力自由化與綠電市場發展的時代，吉陽電力顧問幫您打造最優化的電力策略。
                    </p>
                </div>
            </div>
        </div>
    );
}
