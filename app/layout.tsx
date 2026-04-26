import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import { BetaBanner } from "@/components/BetaBanner";
import { VariantsPanel } from "@/components/VariantsPanel";

export const metadata: Metadata = {
  title: "DigitalContinuity.ai · Beta · Hub Preview",
  description:
    "Prototype-grade beta of the consolidated DigitalContinuity.ai platform. Fixture data only. Patent pending on the methodology.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="enterprise" data-mode="light">
      <body>
        <a className="skip-link" href="#main">
          Skip to main content
        </a>
        <Suspense fallback={null}>
          <BetaBanner />
        </Suspense>
        {children}
        <Suspense fallback={null}>
          <VariantsPanel />
        </Suspense>
      </body>
    </html>
  );
}
