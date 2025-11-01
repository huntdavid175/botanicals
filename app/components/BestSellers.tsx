"use client";
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";

const HERO_IMAGE_URL =
  "https://framerusercontent.com/images/20QD5xeVLKBmv7ucQrtU5RfOUU.png?width=1024&height=1536";

const BEST_SELLERS = [
  { title: "Face oil", price: "$15.50", imageUrl: HERO_IMAGE_URL, rating: 5 },
  {
    title: "Green Tea + Aloe Face Cleanser",
    price: "$35.00",
    imageUrl: HERO_IMAGE_URL,
    rating: 4,
  },
  {
    title: "Snail Mucin Radiance Cream",
    price: "$19.99",
    imageUrl: HERO_IMAGE_URL,
    rating: 5,
  },
  {
    title: "10% Niacinamide + NAG Serum",
    price: "$37.50",
    imageUrl: HERO_IMAGE_URL,
    rating: 5,
  },
];

export default function BestSellers() {
  const container = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };
  const list = {
    hidden: {},
    visible: { transition: { delayChildren: 0.2, staggerChildren: 0.22 } },
  };
  const item = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65 },
    },
  };
  return (
    <motion.section
      className="mt-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      variants={container}
    >
      <h3 className="font-heading text-4xl md:text-5xl text-black mb-8 md:mb-12 ls-title">
        Explore Our Best Sellers
      </h3>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-3 items-stretch"
        variants={list}
      >
        {BEST_SELLERS.map((p) => {
          const slug = p.title
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, "")
            .trim()
            .replace(/\s+/g, "-");
          return (
            <motion.div key={p.title} variants={item}>
              <ProductCard
                title={p.title}
                price={p.price}
                imageUrl={p.imageUrl}
                rating={p.rating}
                href={`/shop/${slug}`}
              />
            </motion.div>
          );
        })}
      </motion.div>

      <div className="mt-10 flex justify-center">
        <a
          href="#all-products"
          className="inline-flex items-center justify-center rounded-full bg-[#6EA53A] text-white px-8 py-4 text-base font-medium transition-colors hover:bg-black"
        >
          See all product
        </a>
      </div>
    </motion.section>
  );
}
