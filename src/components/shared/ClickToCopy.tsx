"use client";
import { useState } from "react";

export function ClickToCopy({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };
  return (
    <button onClick={handleCopy} className="inline-flex items-center gap-2 text-sm hover:text-white transition-colors">
      <span>{label}</span>
      <span className="text-xs opacity-60">{copied ? "Copied" : "Copy"}</span>
    </button>
  );
}
