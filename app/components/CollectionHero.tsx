"use client";

import { useParams } from "next/navigation";
import ShopHero from "./ShopHero";

export default function CollectionHero() {
  const params = useParams<{ id?: string }>();
  const raw = typeof params?.id === "string" ? params.id : "";
  const decoded = decodeURIComponent(raw);
  const pretty = decoded
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (m) => m.toUpperCase());
  const title = `Collections/${pretty}`;
  return <ShopHero title={title} />;
}
