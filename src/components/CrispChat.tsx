"use client";

import { useEffect } from "react";

export function CrispChat() {
    useEffect(() => {
        window.$crisp = [];
        window.CRISP_WEBSITE_ID = "9512ccc6-b455-4da7-9629-c348a6f290f3";

        (function () {
            const d = document;
            const s = d.createElement("script");

            s.src = "https://client.crisp.chat/l.js";
            s.async = true;
            d.getElementsByTagName("head")[0].appendChild(s);
        })();
    }, []);

    return null;
}

declare global {
    interface Window {
        $crisp: any[];
        CRISP_WEBSITE_ID: string;
    }
}
