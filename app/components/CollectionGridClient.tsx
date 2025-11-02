"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";

export type CollectionProduct = {
  title: string;
  price: string;
  imageUrl: string;
  rating: number;
};

export default function CollectionGridClient({
  items,
}: {
  items: CollectionProduct[];
}) {
  const [visible, setVisible] = useState(8);

  useEffect(() => {
    setVisible(8);
  }, [items]);

  return (
    <motion.section
      className="mt-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { delayChildren: 0.1, staggerChildren: 0.15 },
          },
        }}
      >
        {items.slice(0, visible).map((p) => {
          const slug = p.title
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, "")
            .trim()
            .replace(/\s+/g, "-");
          return (
            <motion.div
              key={`${p.title}-${p.price}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
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

      {visible < items.length && (
        <div className="mt-10 flex justify-center">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => setVisible((v) => Math.min(v + 8, items.length))}
            className="inline-flex items-center justify-center rounded-full bg-[#6EA53A] text-white px-8 py-4 text-base font-medium transition-colors hover:bg-black"
          >
            Load More
          </motion.button>
        </div>
      )}
    </motion.section>
  );
}
