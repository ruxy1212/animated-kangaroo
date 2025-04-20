"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const carouselItems = [
  {
    date: "24 February 2024",
    readTime: "8 min read",
    title: "Valid's Take on Multiple Enabled Profile",
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
  const textContentRef = useRef<HTMLDivElement>(null);
  const dateTimeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentItem = carouselItems[index];
  const [prevIndex, setPrevIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(
      imageRef.current,
      { opacity: 0, scale: 1.05 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }
    );
    
    tl.fromTo(
      dateTimeRef.current,
      { opacity: 0, y: 10, x: 10 },
      { opacity: 1, y: 0, x: 0, duration: 0.5, ease: "power2.out" },
      "-=0.4"
    );
    
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 10, x: 10 },
      { opacity: 1, y: 0, x: 0, duration: 0.5, ease: "power2.out" },
      "-=0.3"
    );
    
    if (counterRef.current) {
      const current = counterRef.current.querySelector(".current");
      const total = counterRef.current.querySelector(".total");
      
      tl.fromTo(
        current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        "-=0.2"
      );
      
      tl.fromTo(
        total,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        "-=0.3"
      );
    }
  }, []);

  const animateContentChange = (nextIndex: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setPrevIndex(index);
    const tl = gsap.timeline({
      onComplete: () => {
        setIsAnimating(false);
      }
    });
    
    const dateTimeElement = dateTimeRef.current;
    const titleElement = titleRef.current;
    const currentCounter = counterRef.current?.querySelector(".current") as HTMLElement | null;
    
    const currentDate = carouselItems[index].date;
    const currentReadTime = carouselItems[index].readTime;
    const currentTitle = carouselItems[index].title;
    
    const currentImage = document.createElement('img');
    currentImage.src = carouselItems[index].image;
    currentImage.className = "absolute top-0 left-0 w-full h-full object-cover";
    currentImage.style.zIndex = "1";
    
    const nextImage = document.createElement('img');
    nextImage.src = carouselItems[nextIndex].image;
    nextImage.className = "absolute top-0 left-0 w-full h-full object-cover";
    nextImage.style.zIndex = "2";
    nextImage.style.opacity = "0";
    nextImage.style.transform = "scale(1.05)";
    
    if (currentImage && currentImage.parentNode) {
      currentImage.parentNode.appendChild(nextImage);
    }
    
    const tempDateTime = document.createElement('div');
    tempDateTime.className = dateTimeElement?.className || "";
    tempDateTime.innerHTML = `
      <p>${currentDate}</p>
      <p class="flex gap-1.5 items-center">
        <img src="/img/clock.svg" alt="clock" class="w-3 h-3" />
        <span>${currentReadTime}</span>
      </p>
    `;
    tempDateTime.style.position = "absolute";
    tempDateTime.style.top = "0";
    tempDateTime.style.left = "0";
    
    const tempTitle = document.createElement('h2');
    tempTitle.className = titleElement?.className || "";;
    tempTitle.textContent = currentTitle;
    tempTitle.style.position = "absolute";
    tempTitle.style.top = "0";
    tempTitle.style.left = "0";
    
    const tempCounter = document.createElement('span');
    tempCounter.className = "current inline-block";
    tempCounter.textContent = `${index + 1}`;
    tempCounter.style.position = "absolute";
    
    if (dateTimeElement && dateTimeElement.parentNode) {
      dateTimeElement.parentNode.appendChild(tempDateTime);
      dateTimeElement.style.opacity = "0";
    }
    
    if (titleElement && titleElement.parentNode) {
      titleElement.parentNode.appendChild(tempTitle);
      titleElement.style.opacity = "0";
    }
    
    if (currentCounter && currentCounter.parentNode) {
      currentCounter.parentNode.insertBefore(tempCounter, currentCounter);
      currentCounter.style.opacity = "0";
    }

    if (imageContainerRef.current && (prevIndex || prevIndex===0)) {
      imageContainerRef.current.innerHTML = '';
      imageContainerRef.current.appendChild(currentImage);
      imageContainerRef.current.appendChild(nextImage);
      
      tl.to(currentImage, {
        scale: 1.05,
        opacity: 0,
        duration: 0.4,
        ease: "power2.out"
      });
      
      tl.to(nextImage, {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.2");

      tl.to(tempDateTime, {
        opacity: 0,
        y: -3,
        duration: 0.4,
        ease: "power2.out"
      }, "<");

      tl.to(tempTitle, {
        opacity: 0,
        y: -3,
        duration: 0.4,
        ease: "power2.out"
      }, "<");

      tl.to(tempCounter, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: "power2.out"
      }, "<");
      
      tl.add(() => {
        setIndex(nextIndex);
      }, "-=0.4");
    }
    
    tl.add(() => {
      setIndex(nextIndex);
      if (dateTimeElement) dateTimeElement.style.opacity = "0";
      if (titleElement) titleElement.style.opacity = "0";
      if (currentCounter) currentCounter.style.opacity = "0";
    });
    
    tl.to(dateTimeElement, {
      opacity: 1,
      y: 0,
      x: 0,
      duration: 0.4,
      ease: "power2.out",
      onStart: () => {
        if (dateTimeElement) {
          dateTimeElement.style.transform = "translate(2px, 2px)";
        }
      }
    }, "-=0.3");
    
    tl.to(titleElement, {
      opacity: 1,
      y: 0,
      x: 0,
      duration: 0.4,
      ease: "power2.out",
      onStart: () => {
        if (titleElement) {
          titleElement.style.transform = "translate(2px, 2px)";
        }
      }
    }, "-=0.3");
    
    tl.to(currentCounter, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: "power2.out",
      onStart: () => {
        if (currentCounter) {
          currentCounter.style.transform = "translateY(-20px)";
        }
      }
    }, "-=0.3");
    
    tl.add(() => {
      if (tempDateTime.parentNode) tempDateTime.parentNode.removeChild(tempDateTime);
      if (tempTitle.parentNode) tempTitle.parentNode.removeChild(tempTitle);
      if (tempCounter.parentNode) tempCounter.parentNode.removeChild(tempCounter);
    });
  };

  const next = () => {
    const nextIndex = (index + 1) % carouselItems.length;
    animateContentChange(nextIndex);
  };

  const prev = () => {
    const nextIndex = (index - 1 + carouselItems.length) % carouselItems.length;
    animateContentChange(nextIndex);
  };

  return (
    <div 
      ref={containerRef}
      className="h-full w-full rounded-2xl border border-transparent transition-colors hover:border-el-primary-dark duration-1000 bg-el-dark-black relative overflow-hidden group"
    >
      <div className="insights-carousel h-full w-full">
        <div className="insights-carousel-item h-full w-full flex flex-col">
          <div className="p-[40px_60px_56px_16px] md:p-[2.5vw] h-[48vh] md:h-[33vw] bg-el-white relative z-10">
            <p className="text-sm font-semibold text-el-black">Latest blog posts</p>
            <div ref={textContentRef} className="relative mt-20 md:mt-12">
              <div ref={dateTimeRef} className="flex mb-4 gap-3.5 text-xs text-gray-800">
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
              <div className="relative">
                <h2 
                  ref={titleRef}
                  className="text-el-dark-black font-medium text-2xl md:text-3xl"
                >
                  {currentItem.title}
                </h2>
              </div>
            </div>
          </div>
          <div className="h-[32vh] md:h-[22vw] relative">
            <div 
              ref={imageContainerRef} 
              className="w-full h-[60vh] -mt-[15vh] relative"
            >
              <Image
                src={currentItem.image}
                alt="insight"
                width={1200}
                height={800}
                unoptimized
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-0 left-0 p-[40px_60px_56px_16px] md:p-[2.5vw] h-[48vh] md:h-[33vw] z-20 w-full">
        <div className="w-full h-full relative">
          <div
            className="counter absolute top-7 md:top-0 md:right-0 text-el-primary-dark text-5xl md:text-7xl font-medium"
            ref={counterRef}
          >
            <span className="current inline-block">{index + 1}</span>/<span className="total inline-block">{carouselItems.length}</span>
          </div>
          <div className="absolute bottom-2 left-0 flex gap-2.5">
            <button
              className="w-9 h-9 rounded-full border border-el-dark-black transition-colors hover:bg-el-dark-black/10 flex items-center justify-center rotate-180 group cursor-pointer"
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
              className="w-9 h-9 rounded-full border border-el-dark-black transition-colors hover:bg-el-dark-black/10 flex items-center justify-center group cursor-pointer"
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