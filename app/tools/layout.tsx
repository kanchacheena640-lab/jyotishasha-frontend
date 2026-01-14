import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Free Astrology Tools | Jyotishasha",
  description:
    "Explore free Vedic astrology tools for career, marriage, love, numerology, Panchang and life guidance.",
};

export default function ToolsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
