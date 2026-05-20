"use client";

import { useState } from "react";
import { Bot, X } from "lucide-react";

export default function ChatbotSection() {
    const [open, setOpen] = useState(false);

    return (
        <div className="fixed bottom-5 right-5">
            {open && (
                <div className="mb-3 w-[320px] rounded-xl bg-white p-4 shadow-xl">
                    <p>Halo! Saya WavesAI 👋</p>
                </div>
            )}

            <button
                onClick={() => setOpen(!open)}
                className="rounded-full bg-blue-600 p-4 text-white shadow-lg"
            >
                {open ? <X /> : <Bot />}
            </button>
        </div>
    );
}