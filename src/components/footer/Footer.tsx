import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from "@gsap/react";
import Subscribe from "./Subscribe";
import Link from "next/link";
import { aboutLinks, endLinks, insightLinks, solutionLinks } from "@/lib/data/lists";

gsap.registerPlugin(ScrollTrigger);

export default function Footer({showDialogue}: {showDialogue: () => void}) {
  const textRef = useRef<HTMLDivElement>(null);
  const firstLine = useRef<HTMLSpanElement>(null);
  const secondLine = useRef<HTMLSpanElement>(null);

  const directionRef = useRef(-1);
  const xPercentRef = useRef(0);
  useGSAP(() => {
    gsap.to(textRef.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        scrub: 0.5,
        start: 0,
        end: window.innerHeight,
        onUpdate: e => directionRef.current = e.direction * -1,
      },
      x: "-500px",
    });
  
    requestAnimationFrame(animate);
  }, []);  

  const animate = () => {
    const x = xPercentRef.current;
    if (x < -100) {
      xPercentRef.current = 0;
    } else if (x > 0) {
      xPercentRef.current = -100;
    }
  
    gsap.set(firstLine.current, { xPercent: xPercentRef.current });
    gsap.set(secondLine.current, { xPercent: xPercentRef.current });
  
    xPercentRef.current += 0.1 * directionRef.current;
  
    requestAnimationFrame(animate);
  };

  useEffect(() => {
    let lastScrollY = window.scrollY;
  
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      directionRef.current = currentScrollY > lastScrollY ? -1 : 1;
      lastScrollY = currentScrollY;
    };
  
    window.addEventListener("scroll", handleScroll);
  
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <footer className="p-[100px_0px_100px] bg-white">
      <div className="hero-text mb-[10vw] overflow-hidden">
        <div className="flex whitespace-nowrap scrolling-text">
          <h1 ref={textRef} className="text-7xl md:text-9xl font-grotesk font-semibold text-el-primary-dark">
            <span ref={firstLine} style={{ display: "inline-block", marginRight: "30px" }}>Empowering the future of connectivity</span>
            <span ref={secondLine} style={{ display: "inline-block", marginRight: "30px" }}>Empowering the future of connectivity</span>
          </h1>
        </div>
      </div>
      <div className="w-[80vw] m-auto pl-[11px] pr-[11px]">
        <div className="flex flex-col md:flex-row gap-[5vw] mb-[21px]">
          <div className="pl-[4px] pr-[4px] w-full md:w-2/5 mb-8 md:mb-0">
            <Link href="/">
              <Image
                src="/img/logo.svg"
                className="w-[100px] mb-[3.458vw] invert"
                alt="footer-logo"
                width={0}
                height={0}
              />
            </Link>
            <div className="news">
              <p className="text-[2rem] font-grotesk font-medium tracking-tighter leading-[2.1rem] text-el-dark-black">
                Subscribe to<br />our newsletter
              </p>
            </div>
            <Subscribe showDialogue={showDialogue} />
          </div>
          <div className="w-full md:w-3/5 flex flex-col sm:flex-row sm:flex-wrap gap-[5vw]">
            <div className="w-full sm:w-[10.833vw] px-1 mb-8 sm:mb-0">
              <p className="font-grotesk font-medium text-black text-[16px] sm:text-[18px] tracking-tight leading-tight">
                Insights
              </p>
              <ul className="mt-6 text-black cursor-pointer">
                {insightLinks.map((item,i) => (
                  <li key={i} className="mb-1">
                    <a
                      href={`insights/${item.link}`}
                      className="text-[12px] sm:text-[14px] hover:text-gray-500 transition-colors duration-200 font-grotesk"
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full sm:w-[10.833vw] px-1 mb-8 sm:mb-0">
              <p className="font-medium text-black text-[16px] sm:text-[18px] tracking-tight leading-tight font-grotesk">
                Solutions
              </p>
              <ul className="mt-6 text-black cursor-pointer">
                {solutionLinks.map((item, i) => (
                  <li key={i} className="mb-1">
                    <a
                      href={`solutions/${item.link}`}
                      className="text-[12px] sm:text-[14px] hover:text-gray-500 transition-colors duration-200 font-grotesk"
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full sm:w-[10.833vw] px-1">
              <p className="font-medium text-black text-[16px] sm:text-[18px] tracking-tight leading-tight font-grotesk">
                About
              </p>
              <ul className="mt-6 text-black cursor-pointer">
                {aboutLinks.map((item, i) => (
                  <li key={i} className="mb-1">
                    <a
                      href={`/${item.link}`}
                      className="text-[12px] font-grotesk sm:text-[14px] hover:text-gray-500 transition-colors duration-200"
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-6 mb-2">
          <hr className="border-[#2d2d2d] " />
        </div>
        <div className="flex justify-between items-center">
          <div className="flex cursor-pointer">
            {endLinks.map((item, i) => (
              <a
                key={i}
                href={`/${item.link}`}
                className="mr-3 font-grotesk mb-0 text-[10px] sm:text-[12px] text-gray-600 hover:text-gray-400 transition-colors duration-200"
              >
                {item.title}
              </a>
            ))}
          </div>
          <div>
            <a href="https://linkedin.com/">
              <Image
                src="/img/neon.svg"
                className="cursor-pointer h-6 w-6 hover:scale-90 hover:opacity-80 transition-all duration-200"
                alt="linkedin-icon"
                width={0}
                height={0}
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}