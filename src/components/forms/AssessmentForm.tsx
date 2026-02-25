"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface AssessmentFormProps {
    type: "new" | "revamp" | "general" | "consultancy" | "self-built" | "special";
    className?: string;
}

export function AssessmentForm({ type, className }: AssessmentFormProps) {
    const [formData, setFormData] = useState<Record<string, any>>({
        supplyType: "high-voltage",
        buildingType: "factory",
        roofType: "rc",
        role: "owner",
        progress: "planning",
        module: "mono",
        idea: "flexible"
    });

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here
        // In a real app, we would send this data to an API
        console.log("Form Submitted", formData);
        alert("感謝您的填寫！專人將盡快與您聯繫。");
    };

    const getDescription = () => {
        switch (type) {
            case "new":
                return "填寫建物類型與進度，我們將主動為您提案。";
            case "revamp":
                return "填寫案場資訊，我們提供免費汰舊換新評估。";
            case "consultancy":
                return "提供用電資訊，協助您優化契約容量與電費。";
            case "self-built":
                return "填寫屋頂資訊，評估自建電廠或出租效益。";
            case "special":
                return "填寫您的特殊需求，我們將為您規劃專屬的太陽能解決方案。";
            default:
                return "告訴我們您的需求，我們將提供專業建議。";
        }
    };

    return (
        <section className={cn("bg-primary py-16 sm:py-24", className)} id="assessment-form">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        免費評估諮詢
                    </h2>
                    <p className="mt-4 text-lg leading-8 text-gray-300">
                        {getDescription()}
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">

                        {/* Common Fields */}
                        <div className="sm:col-span-2">
                            <label htmlFor="name" className="block text-sm font-semibold leading-6 text-white">
                                聯絡人姓名
                            </label>
                            <div className="mt-2.5">
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm sm:leading-6"
                                    required
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="phone" className="block text-sm font-semibold leading-6 text-white">
                                聯絡電話
                            </label>
                            <div className="mt-2.5">
                                <input
                                    type="tel"
                                    name="phone"
                                    id="phone"
                                    className="block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm sm:leading-6"
                                    required
                                />
                            </div>
                        </div>

                        {/* Consultancy Specific */}
                        {type === "consultancy" && (
                            <>
                                <div className="sm:col-span-2">
                                    <label htmlFor="supplyType" className="block text-sm font-semibold leading-6 text-white">
                                        台電供電類型
                                    </label>
                                    <div className="mt-2.5">
                                        <select
                                            id="supplyType"
                                            name="supplyType"
                                            value={formData.supplyType}
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm sm:leading-6 [&>option]:text-black"
                                        >
                                            <option value="high-voltage">高壓供電</option>
                                            <option value="low-3p4w">低壓 3相4線 220/380V</option>
                                            <option value="low-3p3w">低壓 3相3線 220V</option>
                                            <option value="other">其他 / 不清楚</option>
                                        </select>
                                        {formData.supplyType === "other" && (
                                            <input
                                                type="text"
                                                name="supplyTypeOther"
                                                placeholder="請說明您的供電類型"
                                                onChange={handleChange}
                                                className="mt-3 block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm sm:leading-6"
                                            />
                                        )}
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="bill" className="block text-sm font-semibold leading-6 text-white">
                                        每月平均電費 (元)
                                    </label>
                                    <div className="mt-2.5">
                                        <input
                                            type="text"
                                            name="bill"
                                            id="bill"
                                            placeholder="例如：400,000"
                                            className="block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Self-Built / Roof Rental Specific */}
                        {type === "self-built" && (
                            <>
                                <div className="sm:col-span-1">
                                    <label htmlFor="buildingType" className="block text-sm font-semibold leading-6 text-white">
                                        建物類型
                                    </label>
                                    <div className="mt-2.5">
                                        <select
                                            id="buildingType"
                                            name="buildingType"
                                            value={formData.buildingType}
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm sm:leading-6 [&>option]:text-black"
                                        >
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
                                                className="mt-3 block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm sm:leading-6"
                                            />
                                        )}
                                    </div>
                                </div>
                                <div className="sm:col-span-1">
                                    <label htmlFor="roofType" className="block text-sm font-semibold leading-6 text-white">
                                        屋頂類型
                                    </label>
                                    <div className="mt-2.5">
                                        <select
                                            id="roofType"
                                            name="roofType"
                                            value={formData.roofType}
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm sm:leading-6 [&>option]:text-black"
                                        >
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
                                                className="mt-3 block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm sm:leading-6"
                                            />
                                        )}
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="location" className="block text-sm font-semibold leading-6 text-white">
                                        建物地址或經緯度
                                    </label>
                                    <div className="mt-2.5">
                                        <input
                                            type="text"
                                            name="location"
                                            id="location"
                                            placeholder="請輸入地址或經緯度座標"
                                            className="block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        {/* New Buildings Specific */}
                        {type === "new" && (
                            <>
                                <div className="sm:col-span-2">
                                    <label htmlFor="buildingType" className="block text-sm font-semibold leading-6 text-white">
                                        建物類型
                                    </label>
                                    <div className="mt-2.5">
                                        <select
                                            id="buildingType"
                                            name="buildingType"
                                            value={formData.buildingType}
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm sm:leading-6 [&>option]:text-black"
                                        >
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
                                                className="mt-3 block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm sm:leading-6"
                                            />
                                        )}
                                    </div>
                                </div>
                                <div className="sm:col-span-1">
                                    <label htmlFor="role" className="block text-sm font-semibold leading-6 text-white">
                                        您的角色
                                    </label>
                                    <div className="mt-2.5">
                                        <select
                                            id="role"
                                            name="role"
                                            value={formData.role}
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm sm:leading-6 [&>option]:text-black"
                                        >
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
                                                className="mt-3 block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm sm:leading-6"
                                            />
                                        )}
                                    </div>
                                </div>
                                <div className="sm:col-span-1">
                                    <label htmlFor="progress" className="block text-sm font-semibold leading-6 text-white">
                                        目前進度
                                    </label>
                                    <div className="mt-2.5">
                                        <select
                                            id="progress"
                                            name="progress"
                                            className="block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm sm:leading-6 [&>option]:text-black"
                                        >
                                            <option value="planning">準備申請建照</option>
                                            <option value="construction">已經開始蓋</option>
                                            <option value="framing">蓋到三樓</option>
                                            <option value="finishing">結構體完成</option>
                                        </select>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Revamping Specific */}
                        {type === "revamp" && (
                            <>
                                <div className="sm:col-span-1">
                                    <label htmlFor="age" className="block text-sm font-semibold leading-6 text-white">
                                        案場年齡
                                    </label>
                                    <div className="mt-2.5">
                                        <input
                                            type="text"
                                            name="age"
                                            id="age"
                                            placeholder="例如：掛表12年"
                                            className="block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-1">
                                    <label htmlFor="module" className="block text-sm font-semibold leading-6 text-white">
                                        現有模組
                                    </label>
                                    <div className="mt-2.5">
                                        <select
                                            id="module"
                                            name="module"
                                            value={formData.module}
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm sm:leading-6 [&>option]:text-black"
                                        >
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
                                                placeholder="請說明"
                                                onChange={handleChange}
                                                className="mt-3 block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm sm:leading-6"
                                            />
                                        )}
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="location" className="block text-sm font-semibold leading-6 text-white">
                                        案場位置/經緯度
                                    </label>
                                    <div className="mt-2.5">
                                        <input
                                            type="text"
                                            name="location"
                                            id="location"
                                            className="block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Special Projects Specific */}
                        {type === "special" && (
                            <>
                                <div className="sm:col-span-2">
                                    <label htmlFor="idea" className="block text-sm font-semibold leading-6 text-white">
                                        您的想法 / 需求類型
                                    </label>
                                    <div className="mt-2.5">
                                        <select
                                            id="idea"
                                            name="idea"
                                            value={formData.idea}
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm sm:leading-6 [&>option]:text-black"
                                        >
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
                                                className="mt-3 block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm sm:leading-6"
                                            />
                                        )}
                                    </div>
                                </div>
                            </>
                        )}

                        <div className="sm:col-span-2">
                            <label htmlFor="message" className="block text-sm font-semibold leading-6 text-white">
                                其他需求/備註
                            </label>
                            <div className="mt-2.5">
                                <textarea
                                    name="message"
                                    id="message"
                                    rows={4}
                                    className="block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm sm:leading-6"
                                    defaultValue={""}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-10">
                        <button
                            type="submit"
                            className="block w-full rounded-md bg-accent px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent transition-colors"
                        >
                            送出評估申請
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}

