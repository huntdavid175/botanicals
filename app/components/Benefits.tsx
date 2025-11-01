"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const HERO_IMAGE_URL =
  "https://framerusercontent.com/images/20QD5xeVLKBmv7ucQrtU5RfOUU.png?width=1024&height=1536";

export default function Benefits() {
  const container = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, staggerChildren: 0.15 },
    },
  };
  const item = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } };
  return (
    <motion.section
      className="bg-white rounded-3xl mt-24 py-4 md:py-8 overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={container}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Left: Copy */}
        <motion.div
          className="p-6 md:p-8 order-2 md:order-1 flex flex-col items-start"
          variants={item}
        >
          <h2 className="font-heading text-5xl md:text-7xl leading-tight tracking-tight text-black ls-title">
            Your Skin
            <br /> Deserves the Best
          </h2>
          <p className="mt-6 text-sm md:text-base text-black/60 ">
            Discover clean, effective skincare products designed to nourish and
            rejuvenate your skin. Made with nature’s finest ingredients for a
            radiant, healthy glow
          </p>
          <div className="mt-8 flex justify-start">
            <a
              href="#shop"
              className="inline-flex items-center justify-center rounded-full bg-[#6EA53A] text-white px-8 py-4 text-base font-medium transition-colors hover:bg-black"
            >
              Shop Now
            </a>
          </div>
        </motion.div>

        {/* Right: Horizontal gallery */}
        <motion.div className="relative order-1 md:order-2" variants={item}>
          <div className="relative -mx-4 md:mx-0">
            <div className="marquee-container h-[360px] md:h-[440px] px-4 md:px-0">
              <div className="marquee-track flex gap-4 md:gap-6 h-full">
                {/* Image 1 */}
                <div className="relative shrink-0 w-[300px] md:w-[360px] h-full rounded-2xl overflow-hidden">
                  <Image
                    src={HERO_IMAGE_URL}
                    alt="Before"
                    fill
                    className="object-cover"
                  />
                  <span className="absolute bottom-5 left-5 text-white text-3xl font-light font-heading drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                    Before
                  </span>
                  <div className="absolute bottom-4 right-4 h-8 w-8 rounded-full bg-[#6EA53A] text-white flex items-center justify-center">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                </div>
                {/* Image 2 */}
                <div className="relative shrink-0 w-[300px] md:w-[360px] h-full rounded-2xl overflow-hidden">
                  <Image
                    src={HERO_IMAGE_URL}
                    alt="After"
                    fill
                    className="object-cover"
                  />
                  <span className="absolute bottom-5 left-5 text-white text-3xl font-light font-heading drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                    After
                  </span>
                  <div className="absolute bottom-4 right-4 h-8 w-8 rounded-full bg-[#6EA53A] text-white flex items-center justify-center">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                </div>
                {/* Image 3 */}
                <div className="relative shrink-0 w-[300px] md:w-[360px] h-full rounded-2xl overflow-hidden">
                  <Image
                    src={HERO_IMAGE_URL}
                    alt="Before"
                    fill
                    className="object-cover"
                  />
                  <span className="absolute bottom-5 left-5 text-white text-3xl font-light font-heading drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                    Before
                  </span>
                  <div className="absolute bottom-4 right-4 h-8 w-8 rounded-full bg-[#6EA53A] text-white flex items-center justify-center">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                </div>
                {/* Duplicate set for seamless loop */}
                <div className="relative shrink-0 w-[300px] md:w-[360px] h-full rounded-2xl overflow-hidden">
                  <Image
                    src={HERO_IMAGE_URL}
                    alt="Before"
                    fill
                    className="object-cover"
                  />
                  <span className="absolute bottom-5 left-5 text-white text-3xl font-light font-heading drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                    Before
                  </span>
                  <div className="absolute bottom-4 right-4 h-8 w-8 rounded-full bg-[#6EA53A] text-white flex items-center justify-center">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                </div>
                <div className="relative shrink-0 w-[300px] md:w-[360px] h-full rounded-2xl overflow-hidden">
                  <Image
                    src={HERO_IMAGE_URL}
                    alt="After"
                    fill
                    className="object-cover"
                  />
                  <span className="absolute bottom-5 left-5 text-white text-3xl font-light font-heading drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                    After
                  </span>
                  <div className="absolute bottom-4 right-4 h-8 w-8 rounded-full bg-[#6EA53A] text-white flex items-center justify-center">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                </div>
                <div className="relative shrink-0 w-[300px] md:w-[360px] h-full rounded-2xl overflow-hidden">
                  <Image
                    src={HERO_IMAGE_URL}
                    alt="Before"
                    fill
                    className="object-cover"
                  />
                  <span className="absolute bottom-5 left-5 text-white text-3xl font-light font-heading drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                    Before
                  </span>
                  <div className="absolute bottom-4 right-4 h-8 w-8 rounded-full bg-[#6EA53A] text-white flex items-center justify-center">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Edge fades */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-linear-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-linear-to-l from-white to-transparent" />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
