import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { SandboxCredentialsBanner } from "@/components/SandboxCredentialsBanner";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "AgentPay - Autonomous Agentic Commerce Assistant (PayPal AI Hackathon)",
  description: "An autonomous AI buyer, negotiator, and checkout agent built on PayPal Developer Sandbox and AI Agentic Workflows.",
  keywords: ["PayPal", "AI", "Agentic Commerce", "Hackathon", "Autonomous Agent", "PayPal Sandbox"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-cyber-dark text-slate-100 min-h-screen flex flex-col antialiased selection:bg-paypal-blue selection:text-white">
        <Providers>
          <Navbar />
          <SandboxCredentialsBanner />
          <main className="flex-1 w-full">{children}</main>
          <footer className="border-t border-cyber-border/60 py-6 text-center text-xs text-slate-500 bg-cyber-dark/80">
            <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-400">AgentPay &copy; 2026</span>
                <span>&bull;</span>
                <span>PayPal AI Hackathon Entry</span>
              </div>
              <div className="flex items-center gap-4 text-slate-400 text-[11px]">
                <span>Best Use of Agentic Commerce</span>
                <span>&bull;</span>
                <span>Best Use of PayPal + AI</span>
                <span>&bull;</span>
                <span>Render Sponsor Ready</span>
              </div>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
