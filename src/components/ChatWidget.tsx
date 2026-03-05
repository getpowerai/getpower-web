"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

export function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Array<{ id: string; text: string; sender: "user" | "agent"; timestamp: Date }>>([]);
    const [isInBusinessHours, setIsInBusinessHours] = useState(true);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);
    const [emailInput, setEmailInput] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Listen for custom event to open chat
    useEffect(() => {
        const handleOpenChat = () => setIsOpen(true);
        window.addEventListener("open-chat-widget", handleOpenChat);

        // Check business hours
        const now = new Date();
        const day = now.getDay();
        const hour = now.getHours();
        const isWorkDay = day >= 1 && day <= 5;
        const isWorkHour = hour >= 9 && hour < 17;
        const inHours = isWorkDay && isWorkHour;

        setIsInBusinessHours(inHours);

        const initialMsgs = [
            {
                id: "1",
                text: inHours
                    ? "HI~很高興為您服務 ❤\n客服時間：週一 - 週五\n9:00 am - 17:00 pm"
                    : "由於現在非上班時間，我們無法立即回覆您。您可以留言，或留下Email或電話 ，或加入我們官方Line，我們將盡快回覆",
                sender: "agent" as const,
                timestamp: new Date(),
            },
            {
                id: "email-prompt",
                text: "請於下方欄位輸入您的 Email，確保客服回覆後，可於第一時間通知您。 Please enter your email below to ensure that our customer service can notify you promptly with a response.",
                sender: "agent" as const,
                timestamp: new Date(),
                isEmailPrompt: true
            }
        ];

        setMessages(initialMsgs);

        return () => window.removeEventListener("open-chat-widget", handleOpenChat);
    }, []);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping, isOpen]);

    const handleEmailSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!emailInput.trim()) {
            // If empty, just close the prompt (optional)
            setIsEmailSubmitted(true);
            return;
        }

        // Add user email message
        const newUserMessage = {
            id: Date.now().toString(),
            text: `我的 Email 是: ${emailInput}`,
            sender: "user" as const,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, newUserMessage]);
        setIsEmailSubmitted(true);

        // Optionally send this email to an API here
        console.log("Email submitted:", emailInput);
    };

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        // Add user message
        const newUserMessage = {
            id: Date.now().toString(),
            text: inputValue,
            sender: "user" as const,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, newUserMessage]);
        setInputValue("");
        setIsTyping(true);

        // Simulate agent response
        setTimeout(() => {
            const responses = [
                "了解，請稍等，我正在為您查詢相關資訊。",
                "這個問題比較專業，我將為您轉接資深工程師。",
                "好的，能否請您提供更多關於案場的細節？",
                "沒問題！我們有提供這項服務。",
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];

            const newAgentMessage = {
                id: (Date.now() + 1).toString(),
                text: randomResponse,
                sender: "agent" as const,
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, newAgentMessage]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end sm:bottom-10 sm:right-10">
            {/* Chat Box */}
            <div
                className={cn(
                    "mb-4 w-[350px] flex flex-col overflow-hidden rounded-2xl bg-white shadow-2xl transition-all duration-300 origin-bottom-right border border-gray-100",
                    isOpen ? "h-[500px] scale-100 opacity-100" : "h-0 scale-0 opacity-0 pointer-events-none display-none"
                )}
            >
                {/* Header */}
                <div className="bg-primary p-4 flex justify-between items-center text-white shrink-0">
                    <div>
                        <h3 className="font-bold flex items-center gap-2">
                            {isInBusinessHours && (
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            )}
                            <span className={cn(
                                "relative inline-flex rounded-full h-3 w-3",
                                isInBusinessHours ? "bg-green-500" : "bg-gray-400"
                            )}></span>
                            線上客服 (Live Chat)
                        </h3>
                        <p className="text-xs text-blue-100 mt-1 pl-5">
                            {isInBusinessHours ? "客服人員在線中" : "非上班時間"}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <a
                            href="https://line.me/R/ti/p/@628cbztu?oat_content=url&ts=07041547"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#06C755] hover:bg-[#05b34c] text-white text-xs px-2 py-1 rounded-md transition-colors flex items-center gap-1"
                            title="加 Line 好友"
                        >
                            <span className="font-bold">LINE</span>
                        </a>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="hover:bg-white/20 p-1 rounded-full transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
                    {messages.map((msg: any) => (
                        <div
                            key={msg.id}
                            className={cn(
                                "flex flex-col max-w-[90%]",
                                msg.sender === "user" ? "ml-auto items-end" : "mr-auto items-start"
                            )}
                        >
                            <div
                                className={cn(
                                    "p-3 rounded-2xl text-sm shadow-sm",
                                    msg.sender === "user"
                                        ? "bg-[#00B900] text-white rounded-br-none" // User: Line Green
                                        : msg.isEmailPrompt
                                            ? "bg-gray-200 text-gray-800 rounded-bl-none p-4" // Email prompt background
                                            : "bg-white text-gray-800 border border-gray-200 rounded-bl-none" // Agent: White
                                )}
                            >
                                <div className="whitespace-pre-wrap leading-relaxed">
                                    {msg.text}
                                </div>

                                {/* Custom Email Input UI */}
                                {msg.isEmailPrompt && !isEmailSubmitted && (
                                    <form onSubmit={handleEmailSubmit} className="mt-4 flex gap-2">
                                        <input
                                            type="email"
                                            value={emailInput}
                                            onChange={(e) => setEmailInput(e.target.value)}
                                            placeholder="請輸入您的 Email"
                                            className="flex-1 bg-white text-gray-900 border-0 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-accent outline-none"
                                        />
                                        <button
                                            type="submit"
                                            className="bg-[#EA7E7A] hover:bg-[#d86d69] text-white px-4 py-2 rounded-md transition-colors text-sm font-bold shrink-0"
                                        >
                                            送出
                                        </button>
                                    </form>
                                )}
                            </div>
                            <span className="text-[10px] text-gray-400 mt-1 px-1">
                                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                    ))}

                    {/* Typing Indicator */}
                    {isTyping && (
                        <div className="flex flex-col max-w-[80%] mr-auto items-start">
                            <div className="bg-white text-gray-800 border border-gray-200 rounded-2xl rounded-bl-none p-3 shadow-sm">
                                <div className="flex gap-1">
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                                </div>
                            </div>
                            <span className="text-[10px] text-gray-400 mt-1 px-1">正在輸入...</span>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-gray-100 shrink-0">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="輸入訊息..."
                            className="flex-1 bg-gray-100 text-gray-900 placeholder-gray-500 border-0 rounded-full px-4 py-2 focus:ring-2 focus:ring-primary focus:bg-white transition-all text-sm"
                        />
                        <button
                            type="submit"
                            disabled={!inputValue.trim()}
                            className="bg-primary hover:bg-primary/90 text-white p-2 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Send size={18} />
                        </button>
                    </div>
                    <div className="text-center mt-2">
                        <div className="text-[10px] text-gray-400">
                            Powered by GetPower AI
                        </div>
                    </div>
                </form>
            </div>

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all hover:scale-110",
                    isOpen ? "bg-gray-200 text-gray-600 rotate-90" : "bg-[#00B900] text-white animate-bounce-subtle"
                )}
                aria-label="Open Chat"
            >
                {isOpen ? <X size={24} /> : <MessageCircle size={28} />}
            </button>
        </div >
    );
}
