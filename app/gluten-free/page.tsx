import type { Metadata } from "next";
import GlutenFreeTimeline from "@/components/GlutenFreeTimeline";

export const metadata: Metadata = {
  title: "Gluten-free trials · CrispyCrustBoule",
  description: "Every trial at a gluten-free sourdough loaf, newest first.",
};

export default function GlutenFreePage() {
  return <GlutenFreeTimeline />;
}
