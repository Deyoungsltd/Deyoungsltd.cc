import type { Metadata } from "next";
import "./globals.css";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { AIChatButton } from "@/components/shared/AIChatButton";

export const metadata: Metadata = {
  title: {
    default: "D'Young's Group - Powering Homes. Plating Culture.",
    template: "%s - D'Young's Group",
  },
  description:
    "D'Young's Group - premium electronics, appliances, repair services and authentic Port Harcourt bole, roasted to perfection.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-onyx-950 text-ink antialiased">
        {children}
        <WhatsAppButton />
        <AIChatButton />
      </body>
    </html>
  );
}
