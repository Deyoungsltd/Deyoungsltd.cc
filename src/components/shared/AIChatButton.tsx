"use client";
import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";

export function AIChatButton() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; text: string }[]>([
    { role: "assistant", text: "Hi, I am the D Youngs Group assistant. How can I help?" },
  ]);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    setMessages((m) => [...m, { role: "user", text: input }]);
    setInput("");
    setTimeout(() => {
      setMessages((m) => [...m, { role: "assistant", text: "Thanks for reaching out, our team will follow up shortly." }]);
    }, 600);
  };

  return (
    <>
      <button onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-amber-400 text-black shadow-lg shadow-black/30 transition-transform hover:scale-105"
        aria-label="Open chat assistant">
        <MessageCircle className="h-6 w-6" />
      </button>
      {open && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[28rem] w-80 flex-col overflow-hidden rounded-2xl border border-white/10 bg-black/90 backdrop-blur-xl shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <span className="text-sm font-medium text-white">D Youngs Assistant</span>
            <button onClick={() => setOpen(false)} aria-label="Close chat"><X className="h-4 w-4 text-white/60" /></button>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
                <span className={"inline-block rounded-lg px-3 py-2 text-sm " + (m.
role === "user" ? "bg-amber-400 text-black" : "bg-white/10 text-white")}>
                  {m.text}
                </span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 border-t border-white/10 p-3">
            <input value={input} onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Type a message..."
              className="flex-1 rounded-lg bg-white/10 px-3 py-2 text-sm text-white placeholder-white/40 outline-none" />
            <button onClick={send} aria-label="Send message"><Send className="h-4 w-4 text-amber-400" /></button>
          </div>
        </div>
      )}
    </>
  );
}
