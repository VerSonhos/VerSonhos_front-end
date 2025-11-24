"use client";
import {
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

export const Timeline = ({ data }) => {
  if (!Array.isArray(data)) return null;

  const ref = useRef(null);
  const containerRef = useRef(null);

  const [height, setHeight] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (!ref.current) return;
      const h = ref.current.scrollHeight;
      setHeight(h);
    };

    measure();

    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 70%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full bg-white dark:bg-neutral-950 font-sans md:px-10"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
        <h2 className="mb-4 text-black dark:text-white max-w-4xl font-fredoka text-4xl md:text-5xl font-extrabold">
          Jornada VerSonhos: Transformando sonhos com Realidade Virtual
        </h2>
        <p className="text-neutral-700 dark:text-neutral-300 text-3xl md:text-2xl max-w-sm font-inter ">
          Linha do tempo da visita VerSonhos
        </p>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-5">

        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-evenly pt-8 md:pt-14 md:gap-0"

          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-50 lg:max-w-60 md:w-200">
              <div className="h-10 absolute left-3 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 p-2" />
              </div>

              <h3 className="hidden md:block text-7xl md:pl-20 md:text-6xl font-bold text-neutral-500 dark:text-neutral-500">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-6xl mb-4 text-left font-bold text-neutral-500 dark:text-neutral-500">
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}

        <div
          style={{
            height,
            maxHeight: height,
          }}
          className="absolute left-8 top-0 overflow-hidden w-[2px]
            bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))]
            from-transparent via-neutral-200 dark:via-neutral-700 to-transparent
            [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t 
              from-purple-500 via-blue-500 to-transparent rounded-full"
          />
        </div>

      </div>
    </div>
  );
};
