import type { Metadata } from "next";
import Hero from "./components/Hero";
import Benefits from "./components/BenefitsServer";
import BestSellers from "./components/BestSellers";
import SkinConcerns from "./components/SkinConcerns";
import BrandVideo from "./components/BrandVideo";
import Testimonials from "./components/Testimonials";
import { gqlRequest } from "./lib/wpClient";

export const metadata: Metadata = {
  title: "Home | Revive Botanicals",
};

type HomeQuery = {
  pages: {
    edges: Array<{
      node: {
        pageId: number;
        slug: string;
        featuredImage?: { node?: { sourceUrl?: string | null } | null };
        homeFields?: { herotitle?: string | null } | null;
      };
    }>;
  };
};

const HOME_QUERY = `
  query NewQuery {
    pages(where: {title: "home"}) {
      edges {
        node {
          homeFields { herotitle }
          featuredImage { node { sourceUrl } }
          pageId
          slug
        }
      }
    }
  }
`;

export default async function Home() {
  let heroTitle: string | undefined;
  try {
    const data = await gqlRequest<HomeQuery>(HOME_QUERY);
    const first = data?.pages?.edges?.[0]?.node;
    heroTitle = first?.homeFields?.herotitle ?? undefined;
    const heroImage = first?.featuredImage?.node?.sourceUrl ?? undefined;
    return (
      <main className="max-w-[1498px]  mx-auto md:px-6 px-4 pb-16">
        <Hero titleOverride={heroTitle} imageOverride={heroImage} />
        <Benefits />
        <BestSellers />
        <SkinConcerns title="Shop by Skin Concerns" />
        <BrandVideo />
        <Testimonials />
      </main>
    );
  } catch (_) {
    // Swallow fetch errors in dev; fall back to static title
  }

  return (
    <main className="max-w-[1498px]  mx-auto md:px-6 px-4 pb-16">
      <Hero titleOverride={heroTitle} />
      <Benefits />
      <BestSellers />
      <SkinConcerns title="Shop by Skin Concerns" />
      <BrandVideo />
      <Testimonials />
    </main>
  );
}
