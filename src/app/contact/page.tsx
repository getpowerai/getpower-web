"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Building2, Factory, Zap, Home as HomeIcon, Sun, Send, MessageCircle } from "lucide-react";

function ContactForm() {
    const searchParams = useSearchParams();
    const initialService = searchParams.get("service") || "consultancy"; // Default to consultancy or from URL

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        serviceType: initialService,
        // Power Consultancy specific
        voltageType: "",
        phaseType: "",
        monthlyBill: "",

        // New Buildings / Self-built
        buildingType: "",
        role: "",
        progress: "",
        roofType: "",

        // Revamping
        age: "",
        module: "",

        // General / Location
        location: "",

        // Special Projects
        idea: "",

        // "Other" Text Inputs
        phaseTypeOther: "",
        buildingTypeOther: "",
        roleOther: "",
        moduleOther: "",
        roofTypeOther: "",
        ideaOther: "",

        message: "",
    });

    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate API call
        console.log("Form submitted:", formData);
        setSubmitted(true);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">免費評估諮詢</h2>
                    <p className="mt-2 text-lg leading-8 text-gray-600">
                        請填寫下方表單，或直接加入官方 Line 帳號，將有專人為您服務。
                    </p>
                </div>

                <div className="mx-auto mt-16 max-w-xl sm:mt-20">
                    <div className="mb-10 flex flex-col sm:flex-row justify-center gap-4">
                        <a
                            href="https://line.me/R/ti/p/@628cbztu?oat_content=url&ts=07041547"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 rounded-full bg-[#06C755] px-6 py-3 text-lg font-semibold text-white shadow-md hover:bg-[#05b34c] transition-colors"
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path d="M20.4 10c0-4.6-4.2-8.4-10.2-8.4S0 5.4 0 10c0 3.8 2.9 7 6.9 7.9.3.1.6.2.7.5.1.3 0 .8-.1 1.2l-.5 1.7c-.1.5-.3 1.2.6 1.1s4.6-2.9 6.3-3.9h.1c4-1 8.3-4.1 8.3-8.5z" />
                            </svg>
                            直接加 Line 官方帳號諮詢
                        </a>
                        <button
                            onClick={() => window.dispatchEvent(new Event("open-chat-widget"))}
                            className="flex items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-lg font-semibold text-white shadow-md hover:bg-blue-700 transition-colors"
                        >
                            <MessageCircle className="w-6 h-6" />
                            線上文字客服 (Web Chat)
                        </button>
                    </div>

                    <div className="relative flex py-5 items-center">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="flex-shrink-0 mx-4 text-gray-400">或填寫表單</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>

                    {!submitted ? (
                        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
                            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">

                                {/* Common Fields */}
                                <div className="sm:col-span-2">
                                    <label htmlFor="serviceType" className="block text-sm font-semibold leading-6 text-gray-900">
                                        諮詢項目
                                    </label>
                                    <div className="mt-2.5">
                                        <select
                                            id="serviceType"
                                            name="serviceType"
                                            value={formData.serviceType}
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                        >
                                            <option value="new-buildings">新建物方案 (建築師/營造商)</option>
                                            <option value="revamping">汰舊換新方案 (老舊電廠)</option>
                                            <option value="consultancy">電力顧問 (工廠/企業主)</option>
                                            <option value="self-built">自建電廠/出租屋頂</option>
                                            <option value="special-projects">創新太陽能需求</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="name" className="block text-sm font-semibold leading-6 text-gray-900">
                                        客戶名稱 / 公司行號
                                    </label>
                                    <div className="mt-2.5">
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            autoComplete="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="phone" className="block text-sm font-semibold leading-6 text-gray-900">
                                        聯絡方式 (Line ID / 電話)
                                    </label>
                                    <div className="mt-2.5">
                                        <input
                                            type="text"
                                            name="phone"
                                            id="phone"
                                            autoComplete="tel"
                                            required
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                {/* Conditional Fields for Power Consultancy */}
                                {formData.serviceType === "consultancy" && (
                                    <>
                                        <div className="sm:col-span-2 bg-slate-50 p-6 rounded-lg ring-1 ring-slate-200">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                                <Zap className="h-5 w-5 text-accent" />
                                                電力顧問需求詳情
                                            </h3>

                                            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                                                <div className="sm:col-span-2">
                                                    <label className="block text-sm font-semibold leading-6 text-gray-900">
                                                        台電供電類型
                                                    </label>
                                                    <div className="mt-2 space-y-3">
                                                        <div className="flex items-center gap-x-3">
                                                            <input
                                                                id="voltage-high"
                                                                name="voltageType"
                                                                type="radio"
                                                                value="high"
                                                                onChange={handleChange}
                                                                className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                                                            />
                                                            <label htmlFor="voltage-high" className="block text-sm font-medium leading-6 text-gray-900">
                                                                高壓供電
                                                            </label>
                                                        </div>
                                                        <div className="flex items-center gap-x-3">
                                                            <input
                                                                id="voltage-low"
                                                                name="voltageType"
                                                                type="radio"
                                                                value="low"
                                                                onChange={handleChange}
                                                                className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                                                            />
                                                            <label htmlFor="voltage-low" className="block text-sm font-medium leading-6 text-gray-900">
                                                                低壓供電
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="sm:col-span-2">
                                                    <label htmlFor="phaseType" className="block text-sm font-semibold leading-6 text-gray-900">
                                                        相數與電壓規格
                                                    </label>
                                                    <div className="mt-2">
                                                        <select
                                                            id="phaseType"
                                                            name="phaseType"
                                                            value={formData.phaseType}
                                                            onChange={handleChange}
                                                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                                        >
                                                            <option value="">請選擇規格</option>
                                                            <option value="3p4w-220-380">3相4線 220/380V</option>
                                                            <option value="3p3w-220">3相3線 220V</option>
                                                            <option value="other">其他</option>
                                                        </select>
                                                        {formData.phaseType === "other" && (
                                                            <input
                                                                type="text"
                                                                name="phaseTypeOther"
                                                                placeholder="請說明相數與電壓規格"
                                                                onChange={handleChange}
                                                                className="mt-3 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                                            />
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="sm:col-span-2">
                                                    <label htmlFor="monthlyBill" className="block text-sm font-semibold leading-6 text-gray-900">
                                                        平均每月電費 (元)
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            type="number"
                                                            name="monthlyBill"
                                                            id="monthlyBill"
                                                            value={formData.monthlyBill}
                                                            onChange={handleChange}
                                                            placeholder="例如：50000"
                                                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}

                                {/* Conditional Fields for New Buildings */}
                                {formData.serviceType === "new-buildings" && (
                                    <>
                                        <div className="sm:col-span-2 bg-slate-50 p-6 rounded-lg ring-1 ring-slate-200">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                                <Building2 className="h-5 w-5 text-accent" />
                                                新建物專案詳情
                                            </h3>
                                            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                                                <div className="sm:col-span-2">
                                                    <label htmlFor="buildingType" className="block text-sm font-semibold leading-6 text-gray-900">
                                                        建物類型
                                                    </label>
                                                    <div className="mt-2.5">
                                                        <select
                                                            id="buildingType"
                                                            name="buildingType"
                                                            value={formData.buildingType}
                                                            onChange={handleChange}
                                                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                                        >
                                                            <option value="">請選擇類型</option>
                                                            <option value="factory">工廠</option>
                                                            <option value="residential">集合式住宅</option>
                                                            <option value="nursing">安養院</option>
                                                            <option value="other">其他</option>
                                                        </select>
                                                        {formData.buildingType === "other" && (
                                                            <input
                                                                type="text"
                                                                name="buildingTypeOther"
                                                                placeholder="請說明建物類型"
                                                                onChange={handleChange}
                                                                className="mt-3 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="sm:col-span-1">
                                                    <label htmlFor="role" className="block text-sm font-semibold leading-6 text-gray-900">
                                                        您的角色
                                                    </label>
                                                    <div className="mt-2.5">
                                                        <select
                                                            id="role"
                                                            name="role"
                                                            value={formData.role}
                                                            onChange={handleChange}
                                                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                                        >
                                                            <option value="">請選擇</option>
                                                            <option value="owner">起造人</option>
                                                            <option value="architect">建築師</option>
                                                            <option value="constructor">營造商</option>
                                                            <option value="other">其他</option>
                                                        </select>
                                                        {formData.role === "other" && (
                                                            <input
                                                                type="text"
                                                                name="roleOther"
                                                                placeholder="請說明您的角色"
                                                                onChange={handleChange}
                                                                className="mt-3 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="sm:col-span-1">
                                                    <label htmlFor="progress" className="block text-sm font-semibold leading-6 text-gray-900">
                                                        目前進度
                                                    </label>
                                                    <div className="mt-2.5">
                                                        <select
                                                            id="progress"
                                                            name="progress"
                                                            value={formData.progress}
                                                            onChange={handleChange}
                                                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                                        >
                                                            <option value="">請選擇</option>
                                                            <option value="planning">準備申請建照</option>
                                                            <option value="construction">已經開始蓋</option>
                                                            <option value="framing">蓋到三樓</option>
                                                            <option value="finishing">結構體完成</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}

                                {/* Conditional Fields for Revamping */}
                                {formData.serviceType === "revamping" && (
                                    <>
                                        <div className="sm:col-span-2 bg-slate-50 p-6 rounded-lg ring-1 ring-slate-200">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                                <Sun className="h-5 w-5 text-accent" />
                                                案場資訊
                                            </h3>
                                            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                                                <div className="sm:col-span-1">
                                                    <label htmlFor="age" className="block text-sm font-semibold leading-6 text-gray-900">
                                                        案場年齡
                                                    </label>
                                                    <div className="mt-2.5">
                                                        <input
                                                            type="text"
                                                            name="age"
                                                            id="age"
                                                            value={formData.age}
                                                            onChange={handleChange}
                                                            placeholder="例如：掛表12年"
                                                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="sm:col-span-1">
                                                    <label htmlFor="module" className="block text-sm font-semibold leading-6 text-gray-900">
                                                        現有模組
                                                    </label>
                                                    <div className="mt-2.5">
                                                        <select
                                                            id="module"
                                                            name="module"
                                                            value={formData.module}
                                                            onChange={handleChange}
                                                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                                        >
                                                            <option value="">請選擇</option>
                                                            <option value="mono">單晶</option>
                                                            <option value="poly">多晶</option>
                                                            <option value="thin-film">薄膜</option>
                                                            <option value="unknown">不清楚</option>
                                                            <option value="other">其他</option>
                                                        </select>
                                                        {(formData.module === "other" || formData.module === "unknown") && (
                                                            <input
                                                                type="text"
                                                                name="moduleOther"
                                                                placeholder="請說明現有模組"
                                                                onChange={handleChange}
                                                                className="mt-3 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="sm:col-span-2">
                                                    <label htmlFor="location" className="block text-sm font-semibold leading-6 text-gray-900">
                                                        案場位置/經緯度
                                                    </label>
                                                    <div className="mt-2.5">
                                                        <input
                                                            type="text"
                                                            name="location"
                                                            id="location"
                                                            value={formData.location}
                                                            onChange={handleChange}
                                                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}

                                {/* Conditional Fields for Self-Built / Roof Rental */}
                                {formData.serviceType === "self-built" && (
                                    <>
                                        <div className="sm:col-span-2 bg-slate-50 p-6 rounded-lg ring-1 ring-slate-200">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                                <HomeIcon className="h-5 w-5 text-accent" />
                                                建物與屋頂資訊
                                            </h3>
                                            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                                                <div className="sm:col-span-1">
                                                    <label htmlFor="buildingType" className="block text-sm font-semibold leading-6 text-gray-900">
                                                        建物類型
                                                    </label>
                                                    <div className="mt-2.5">
                                                        <select
                                                            id="buildingType"
                                                            name="buildingType"
                                                            value={formData.buildingType}
                                                            onChange={handleChange}
                                                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                                        >
                                                            <option value="">請選擇</option>
                                                            <option value="factory">工廠廠房</option>
                                                            <option value="residential">集合住宅</option>
                                                            <option value="nursing">安養院</option>
                                                            <option value="other">其他</option>
                                                        </select>
                                                        {formData.buildingType === "other" && (
                                                            <input
                                                                type="text"
                                                                name="buildingTypeOther"
                                                                placeholder="請說明建物類型"
                                                                onChange={handleChange}
                                                                className="mt-3 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="sm:col-span-1">
                                                    <label htmlFor="roofType" className="block text-sm font-semibold leading-6 text-gray-900">
                                                        屋頂類型
                                                    </label>
                                                    <div className="mt-2.5">
                                                        <select
                                                            id="roofType"
                                                            name="roofType"
                                                            value={formData.roofType}
                                                            onChange={handleChange}
                                                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                                        >
                                                            <option value="">請選擇</option>
                                                            <option value="rc">RC屋頂</option>
                                                            <option value="metal">鐵皮屋頂</option>
                                                            <option value="other">其他</option>
                                                        </select>
                                                        {formData.roofType === "other" && (
                                                            <input
                                                                type="text"
                                                                name="roofTypeOther"
                                                                placeholder="請說明屋頂類型"
                                                                onChange={handleChange}
                                                                className="mt-3 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="sm:col-span-2">
                                                    <label htmlFor="location" className="block text-sm font-semibold leading-6 text-gray-900">
                                                        建物地址或經緯度
                                                    </label>
                                                    <div className="mt-2.5">
                                                        <input
                                                            type="text"
                                                            name="location"
                                                            id="location"
                                                            value={formData.location}
                                                            onChange={handleChange}
                                                            placeholder="請輸入地址或經緯度座標"
                                                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}

                                {/* Conditional Fields for Special Projects */}
                                {formData.serviceType === "special-projects" && (
                                    <>
                                        <div className="sm:col-span-2 bg-slate-50 p-6 rounded-lg ring-1 ring-slate-200">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                                <Sun className="h-5 w-5 text-accent" />
                                                創新太陽能需求
                                            </h3>
                                            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                                                <div className="sm:col-span-2">
                                                    <label htmlFor="idea" className="block text-sm font-semibold leading-6 text-gray-900">
                                                        您的想法 / 需求類型
                                                    </label>
                                                    <div className="mt-2.5">
                                                        <select
                                                            id="idea"
                                                            name="idea"
                                                            value={formData.idea}
                                                            onChange={handleChange}
                                                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                                        >
                                                            <option value="">請選擇</option>
                                                            <option value="flexible">輕量化軟式太陽能 (Flexible Solar)</option>
                                                            <option value="bifacial-facade">立面雙面發電系統 (Bifacial Facade)</option>
                                                            <option value="movable">移動式與易拆遷系統 (Movable System)</option>
                                                            <option value="bipv">BIPV 建築整合太陽能/防水型太陽能 (BIPV)</option>
                                                            <option value="other">其他</option>
                                                        </select>
                                                        {formData.idea === "other" && (
                                                            <input
                                                                type="text"
                                                                name="ideaOther"
                                                                placeholder="請簡述您的想法"
                                                                onChange={handleChange}
                                                                className="mt-3 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}

                                <div className="sm:col-span-2">
                                    <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
                                        備註 / 其他需求說明
                                    </label>
                                    <div className="mt-2.5">
                                        <textarea
                                            name="message"
                                            id="message"
                                            rows={4}
                                            value={formData.message}
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-10">
                                <button
                                    type="submit"
                                    className="block w-full rounded-md bg-accent px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                                >
                                    提交評估申請
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="mt-10 p-8 rounded-lg bg-green-50 text-center ring-1 ring-green-200">
                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                                <Send className="h-6 w-6 text-green-600" aria-hidden="true" />
                            </div>
                            <h3 className="mt-2 text-base font-semibold leading-7 text-gray-900">提交成功！</h3>
                            <p className="mt-1 text-sm leading-6 text-gray-600">
                                感謝您的填寫，我們的專員將會盡快透過電話或 Line 與您聯繫。
                            </p>
                            <div className="mt-6">
                                <a
                                    href="/"
                                    className="text-sm font-semibold leading-6 text-primary hover:text-primary/80"
                                >
                                    返回首頁 <span aria-hidden="true">&rarr;</span>
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function Contact() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">載入中...</div>}>
            <ContactForm />
        </Suspense>
    );
}
