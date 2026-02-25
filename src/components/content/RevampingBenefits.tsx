import { RefreshCw, Banknote, Zap, TrendingUp } from "lucide-react";

const benefits = [
    {
        name: "空間利用率與容量的跨世代跳躍",
        description: "早期的多晶或薄膜模組受限於技術，效率遠低於現在的高效單晶模組。汰舊換新可讓您的發電容量至少增加一倍，薄膜案場甚至可達 3 到 5 倍。",
        icon: Zap,
    },
    {
        name: "綠電市場的高經濟價值",
        description: "原有的高補貼電價合約依然有效，優先保障基礎收益。新增容量則可投入綠電交易市場，獲取更優異的價格收益，實現「雙軌收益」。",
        icon: Banknote,
    },
    {
        name: "環境干擾優化與結構升級",
        description: "重新規劃避開遮陰與粉塵影響，並同步翻新老舊屋頂解決漏水問題。不僅修補發電損失，更讓案場結構安全回歸健康營運。",
        icon: RefreshCw,
    },
    {
        name: "投資回收期短，資產價值倍增",
        description: "部分案場實測發電衰減嚴重，透過汰舊換新，不僅解決效能問題，更能大幅縮短投資回收期。這是目前極具競爭力的資產活化方案。",
        icon: TrendingUp,
    },
];

export function RevampingBenefits() {
    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h2 className="text-base font-semibold leading-7 text-accent">為什麼即使「沒問題」也要換？</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        別讓「每年 1% 衰減」成為資產增值的絆腳石
                    </p>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        許多業主認為只要案場沒壞就不需要換，但在綠能技術日新月異的今天，「現狀維持」往往意味著錯失巨大的獲利機會。
                    </p>
                </div>
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                        {benefits.map((benefit) => (
                            <div key={benefit.name} className="relative pl-16">
                                <dt className="text-base font-semibold leading-7 text-gray-900">
                                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                                        <benefit.icon className="h-6 w-6 text-white" aria-hidden="true" />
                                    </div>
                                    {benefit.name}
                                </dt>
                                <dd className="mt-2 text-base leading-7 text-gray-600">{benefit.description}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    );
}
