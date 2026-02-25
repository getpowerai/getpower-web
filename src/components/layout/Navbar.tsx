"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
    { name: "新建物方案", href: "/new-buildings" },
    { name: "汰舊換新方案", href: "/revamping" },
    { name: "電力顧問", href: "/consultancy" },
    { name: "自建電廠/出租屋頂", href: "/self-built" },
    { name: "創新太陽能", href: "/special-projects" },
    { name: "關於吉陽", href: "/about" },
    { name: "知識分享", href: "/knowledge" },
];

export function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
                        <div className="relative h-12 w-auto">
                            <img
                                src="/logo-new.svg"
                                alt="GetPower New Logo"
                                className="h-full w-auto object-contain"
                            />
                        </div>
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <span className="sr-only">Open main menu</span>
                        {mobileMenuOpen ? (
                            <X className="h-6 w-6" aria-hidden="true" />
                        ) : (
                            <Menu className="h-6 w-6" aria-hidden="true" />
                        )}
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-8">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-sm font-semibold leading-6 text-gray-900 hover:text-accent transition-colors"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <Link href="/contact" className="text-sm font-semibold leading-6 text-white bg-accent hover:bg-yellow-500 px-4 py-2 rounded-md transition-colors shadow-sm">
                        免費評估 <span aria-hidden="true">&rarr;</span>
                    </Link>
                </div>
            </nav>
            {/* Mobile menu */}
            <div className={cn("lg:hidden", mobileMenuOpen ? "block" : "hidden")}>
                <div className="space-y-1 px-4 pb-3 pt-2">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-accent"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {item.name}
                        </Link>
                    ))}
                    <Link
                        href="/contact"
                        className="block rounded-md px-3 py-2 text-base font-medium text-accent hover:bg-gray-50"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        免費評估
                    </Link>
                </div>
            </div>
        </header>
    );
}
