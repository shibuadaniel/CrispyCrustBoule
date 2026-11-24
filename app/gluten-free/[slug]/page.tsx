import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GlutenFreeTrialDetail from "@/components/GlutenFreeTrialDetail";
import { allSlugs, getTrial } from "@/lib/gf-trials";

export function generateStaticParams() {
  return allSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const trial = getTrial(slug);
  if (!trial) {
    return { title: "Trial not found · CrispyCrustBoule" };
  }
  return {
    title: `${trial.version} · Gluten-free trials · CrispyCrustBoule`,
    description: trial.summary,
  };
}

export default async function GlutenFreeTrialPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const trial = getTrial(slug);
  if (!trial) notFound();
  return <GlutenFreeTrialDetail trial={trial} />;
}
