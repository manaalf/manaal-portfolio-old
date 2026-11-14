import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { decks } from "@/data/decks";
import DeckViewer from "@/components/DeckViewer";

export function generateStaticParams() {
  return Object.keys(decks).map((slug) => ({ slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return p ? { title: `${p.name}: executive deck — Manaal Fatima` } : {};
}

export default async function DeckPage({ params }: Params) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  const slides = decks[slug];
  if (!p || !slides) notFound();
  return <DeckViewer slug={slug} name={p.name} slides={slides} />;
}
