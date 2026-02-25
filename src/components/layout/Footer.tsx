import Link from "next/link";
import { Sun } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-primary text-white" aria-labelledby="footer-heading">
            <h2 id="footer-heading" className="sr-only">
                Footer
            </h2>
            <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
                <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                    <div className="space-y-8">
                        <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
                            <img
                                src="/logo-white.svg"
                                alt="GetPower New Logo"
                                className="h-12 w-auto object-contain"
                            />
                        </Link>
                        <p className="text-sm leading-6 text-gray-300">
                            我們致力於提供給世界更棒的能源解決方案。
                        </p>
                    </div>
                    <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold leading-6 text-white">服務項目</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    <li>
                                        <Link href="/new-buildings" className="text-sm leading-6 text-gray-300 hover:text-white">
                                            新建物方案
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/revamping" className="text-sm leading-6 text-gray-300 hover:text-white">
                                            汰舊換新方案
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/consultancy" className="text-sm leading-6 text-gray-300 hover:text-white">
                                            電力顧問
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/self-built" className="text-sm leading-6 text-gray-300 hover:text-white">
                                            自建電廠/出租屋頂
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/special-projects" className="text-sm leading-6 text-gray-300 hover:text-white">
                                            創新太陽能
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="mt-10 md:mt-0">
                                <h3 className="text-sm font-semibold leading-6 text-white">公司資訊</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    <li>
                                        <Link href="/about" className="text-sm leading-6 text-gray-300 hover:text-white">
                                            關於吉陽
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/knowledge" className="text-sm leading-6 text-gray-300 hover:text-white">
                                            知識分享
                                        </Link>
                                    </li>
                                    <li>
                                        <a
                                            href="https://www.104.com.tw/company/1a2x6bjffv?jobsource=tab_job_to_cs"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm leading-6 text-gray-300 hover:text-white flex items-center gap-1"
                                        >
                                            人才招募 (104) <span aria-hidden="true">&rarr;</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold leading-6 text-white">服務據點</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    <li className="text-sm leading-6 text-gray-300">
                                        <strong>高雄總部：</strong><br />
                                        <a
                                            href="https://www.google.com/maps/search/?api=1&query=825高雄市橋頭區新莊路56號"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:text-white hover:underline decoration-white/50 underline-offset-4 transition-all"
                                        >
                                            825高雄市橋頭區新莊路56號
                                        </a>
                                    </li>
                                    <li className="text-sm leading-6 text-gray-300">
                                        <strong>台中辦公室：</strong><br />
                                        <a
                                            href="https://www.google.com/maps/search/?api=1&query=406台中市北屯區瑞昌街63號"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:text-white hover:underline decoration-white/50 underline-offset-4 transition-all"
                                        >
                                            406台中市北屯區瑞昌街63號
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="mt-10 md:mt-0">
                                <h3 className="text-sm font-semibold leading-6 text-white">聯絡資訊</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    <li className="text-sm leading-6 text-gray-300">
                                        <strong>Email:</strong><br />
                                        <a href="mailto:albert.lin@getpower.com.tw" className="hover:text-white">albert.lin@getpower.com.tw</a>
                                    </li>
                                    <li className="text-sm leading-6 text-gray-300">
                                        <strong>Phone:</strong> 07-6120717 #200<br />
                                        <strong>Fax:</strong> 07-6120110
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
                    <p className="text-xs leading-5 text-gray-400">
                        &copy; {new Date().getFullYear()} 吉陽能源集團 Jiyang Energy Group. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
