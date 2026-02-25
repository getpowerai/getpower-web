"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

export function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Array<{ id: string; text: string; sender: "user" | "agent"; timestamp: Date }>>([
        {
            id: "1",
            text: "您好！歡迎來到吉陽能源。請問有什麼我可以協助您的嗎？",
            sender: "agent",
            timestamp: new Date(),
        },
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Listen for custom event to open chat
    useEffect(() => {
        const handleOpenChat = () => setIsOpen(true);
        window.addEventListener("open-chat-widget", handleOpenChat);
        return () => window.removeEventListener("open-chat-widget", handleOpenChat);
    }, []);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping, isOpen]);

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

            // Fallback to "busy" message after a few exchanges or specific trigger (simplified for now)
            // For demo, just auto-reply randomly

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
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </span>
                            線上客服 (Live Chat)
                        </h3>
                        <p className="text-xs text-blue-100 mt-1">客服人員在線中</p>
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
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={cn(
                                "flex flex-col max-w-[80%]",
                                msg.sender === "user" ? "ml-auto items-end" : "mr-auto items-start"
                            )}
                        >
                            <div
                                className={cn(
                                    "p-3 rounded-2xl text-sm shadow-sm",
                                    msg.sender === "user"
                                        ? "bg-[#00B900] text-white rounded-br-none" // User: Line Green
                                        : "bg-white text-gray-800 border border-gray-200 rounded-bl-none" // Agent: White
                                )}
                            >
                                {msg.text}
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
        </div>
    );
}
