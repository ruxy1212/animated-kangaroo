"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const carouselItems = [
  {
    date: "24 February 2024",
    readTime: "8 min read",
    title: "Valid’s Take on Multiple Enabled Profile",
    image: "/img/mobile-people.jpg",
  },
  {
    date: "1 March 2024",
    readTime: "5 min read",
    title: "Is The the End of the Line for SGP.02 (M2M)?",
    image: "/img/wireless-earbuds.jpg",
  },
  {
    date: "10 March 2024",
    readTime: "7 min read",
    title: "Celebrating 50 Years of Smart Cards",
    image: "/img/sim-card.jpg",
  },
];

export default function ButtonCarousel() {
  const [index, setIndex] = useState(0);
  const imageRef = useRef<HTMLImageElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);

  const currentItem = carouselItems[index];

  const animateContentChange = () => {
    const tl = gsap.timeline();
    tl.to(
      imageRef.current,
      {
        opacity: 0,
        scale: 1.05,
        duration: 0.6,
        ease: "power2.out",
      },
      "<"
    );

    tl.add(() => {}, "+=0.1");

    tl.fromTo(
      imageRef.current,
      { opacity: 0, scale: 1.05 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" },
      "<"
    );

    if (counterRef.current) {
      const current = counterRef.current.querySelector(".current");
      const total = counterRef.current.querySelector(".total");

      if (current && total) {
        gsap.fromTo(
          current,
          { y: -20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
        );

        gsap.fromTo(
          total,
          { opacity: 0 },
          { opacity: 1, duration: 1, delay: 0.2 }
        );
      }
    }
  };

  const next = () => {
    setIndex((prev) => {
      const nextIndex = (prev + 1) % carouselItems.length;
      animateContentChange();
      return nextIndex;
    });
  };

  const prev = () => {
    setIndex((prev) => {
      const nextIndex = (prev - 1 + carouselItems.length) % carouselItems.length;
      animateContentChange();
      return nextIndex;
    });
  };

  useGSAP(() => {
    animateContentChange();
  }, []);

  return (
    <div className="h-full w-full rounded-2xl border border-transparent transition-colors hover:border-el-primary-dark duration-1000 bg-el-dark-black relative overflow-hidden group">
      <div className="insights-carousel h-full w-full">
        <div className="insights-carousel-item h-full w-full flex flex-col">
          <div className="p-[40px_60px_56px_16px] md:p-[2.5vw] h-[48vh] md:h-[33vw] bg-el-white relative z-10">
            <p className="text-sm font-semibold text-el-black">Latest blog posts</p>
            <div>
              <div className="flex mt-20 md:mt-12 mb-4 gap-3.5 text-xs text-gray-800">
                <p>{currentItem.date}</p>
                <p className="flex gap-1.5 items-center">
                  <Image
                    src="/img/clock.svg"
                    alt="clock"
                    height={12}
                    width={12}
                    className="w-3 h-3"
                  />
                  <span>{currentItem.readTime}</span>
                </p>
              </div>
              <h2 className="text-el-dark-black font-medium text-2xl md:text-3xl">
                {currentItem.title}
              </h2>
            </div>
          </div>
          <div className="h-[32vh] md:h-[22vw]">
            <Image
              src={currentItem.image}
              alt="insight"
              width={1200}
              height={800}
              unoptimized
              className="w-full h-[60vh] -mt-[15vh] object-cover duration-1000 transition-transform group-hover:scale-105"
              ref={imageRef}
            />
          </div>
        </div>
      </div>

      <div className="absolute top-0 left-0 p-[40px_60px_56px_16px] md:p-[2.5vw] h-[48vh] md:h-[33vw] z-20 w-full">
        <div className="w-full h-full relative">
          <div
            className="counter absolute top-7 md:top-0 md:right-0 text-el-primary-dark text-5xl md:text-7xl font-medium"
            ref={counterRef}
          >
            <span className="current">{index + 1}</span>/<span className="total">{carouselItems.length}</span>
          </div>
          <div className="absolute bottom-2 left-0 flex gap-2.5">
            <button
              className="w-9 h-9 rounded-full border border-el-dark-black transition-colors hover:bg-el-dark-black/10 flex items-center justify-center rotate-180 group"
              onClick={prev}
            >
              <Image
                src="/img/arrow-left.svg"
                alt="arrow-left"
                width={12}
                height={12}
                className="w-3 h-3 group-hover:scale-90"
              />
            </button>
            <button
              className="w-9 h-9 rounded-full border border-el-dark-black transition-colors hover:bg-el-dark-black/10 flex items-center justify-center group"
              onClick={next}
            >
              <Image
                src="/img/arrow-right.svg"
                alt="arrow-right"
                width={12}
                height={12}
                className="w-3 h-3 group-hover:scale-90"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
