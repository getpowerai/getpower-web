import { CheckCircle2, AlertTriangle } from "lucide-react";

export function RevampingNeedComparison() {
    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        不論案場現況如何，舊換新都是最佳選擇
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        「沒問題」的案場需要增值，「有問題」的案場更需要升級。
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    {/* Scenario 1: No Problem */}
                    <div className="relative rounded-3xl bg-slate-50 p-8 xl:p-10 border-2 border-transparent hover:border-accent transition-colors">
                        <div className="flex items-center gap-x-4">
                            <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-green-100">
                                <CheckCircle2 className="h-6 w-6 text-green-600" />
                            </div>
                            <h3 className="text-xl font-bold leading-8 text-gray-900">
                                運作正常的「模範」案場
                            </h3>
                        </div>
                        <p className="mt-6 text-base leading-7 text-gray-600">
                            「我的案場每年衰減都在 1% 以內，也沒有故障，為什麼要換？」
                        </p>
                        <div className="mt-8 border-t border-gray-200 pt-8">
                            <p className="font-semibold text-gray-900 mb-4">您正在錯失的機會：</p>
                            <ul role="list" className="space-y-3 text-sm leading-6 text-gray-600">
                                <li className="flex gap-x-3">
                                    <span className="text-red-500 font-bold">✗</span>
                                    <span>受限於舊技術，浪費了 50% 以上的屋頂發電潛力</span>
                                </li>
                                <li className="flex gap-x-3">
                                    <span className="text-red-500 font-bold">✗</span>
                                    <span>只能領取固定的舊電價，無法享受綠電市場的高溢價</span>
                                </li>
                                <li className="flex gap-x-3">
                                    <span className="text-accent font-bold">➜</span>
                                    <span className="text-gray-900 font-medium">舊換新是讓資產【翻倍增值】的唯一途徑</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Scenario 2: With Problems */}
                    <div className="relative rounded-3xl bg-orange-50 p-8 xl:p-10 border-2 border-orange-200 hover:border-orange-400 transition-colors">
                        <div className="flex items-center gap-x-4">
                            <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-orange-100">
                                <AlertTriangle className="h-6 w-6 text-orange-600" />
                            </div>
                            <h3 className="text-xl font-bold leading-8 text-gray-900">
                                已出現狀況的「問題」案場
                            </h3>
                        </div>
                        <p className="mt-6 text-base leading-7 text-gray-600">
                            「發電量明顯下降、屋頂漏水、或者有遮陰熱點問題...」
                        </p>
                        <div className="mt-8 border-t border-gray-200/50 pt-8">
                            <p className="font-semibold text-gray-900 mb-4">舊換新能解決的危機：</p>
                            <ul role="list" className="space-y-3 text-sm leading-6 text-gray-600">
                                <li className="flex gap-x-3">
                                    <CheckCircle2 className="h-5 w-5 flex-none text-green-600" />
                                    <span>一次解決漏水、鏽蝕與結構安全隱患</span>
                                </li>
                                <li className="flex gap-x-3">
                                    <CheckCircle2 className="h-5 w-5 flex-none text-green-600" />
                                    <span>透過重新設計避開遮陰，消除熱點火災風險</span>
                                </li>
                                <li className="flex gap-x-3">
                                    <span className="text-accent font-bold">➜</span>
                                    <span className="text-gray-900 font-medium">不只是維修，更是【救亡圖存並獲利】的關鍵</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
