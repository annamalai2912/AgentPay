import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { SandboxCredentialsBanner } from "@/components/SandboxCredentialsBanner";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "AgentPay — Autonomous Agentic Commerce (PayPal AI Hackathon)",
  description: "Autonomous commerce operating system powered by the PayPal Developer Platform and AI Agentic Workflows.",
  keywords: ["PayPal", "AI", "Agentic Commerce", "Hackathon", "Autonomous Agent", "PayPal Sandbox"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-obsidian text-bone min-h-screen flex flex-col antialiased selection:bg-bronze selection:text-obsidian">
        <Providers>
          <Navbar />
          <SandboxCredentialsBanner />
          <main className="flex-1 w-full">{children}</main>
          <footer className="border-t border-hairline py-4 text-xs font-mono text-stone bg-obsidian">
            <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-stone-light">AgentPay &copy; 2026</span>
                <span>&bull;</span>
                <span>PayPal AI Hackathon</span>
              </div>
              <div className="flex items-center gap-3 text-stone text-[11px]">
                <span>AGENTIC_COMMERCE_TRACK</span>
                <span>&bull;</span>
                <span>PAYPAL_REST_V2</span>
                <span>&bull;</span>
                <span>RENDER_READY</span>
              </div>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
