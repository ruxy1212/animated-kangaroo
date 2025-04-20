import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from "@gsap/react";
import Subscribe from "./Subscribe";
import Link from "next/link";
import { aboutLinks, endLinks, insightLinks, solutionLinks } from "@/lib/data/lists";
import InfiniteText from "./InfiniteText";

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

  const navLinks = [
    {title: 'Insights', links: insightLinks},
    {title: 'Solutions', links: solutionLinks},
    {title: 'About', links: aboutLinks}
  ]

  return (
    <footer className="p-[100px_0px_100px] bg-white">
      <InfiniteText textRef={textRef} firstLine={firstLine} secondLine={secondLine} />
      <div className="w-full md:w-[80vw] m-auto px-5">
        <div className="flex flex-col md:flex-row gap-[5vw] mb-[21px]">
          <div className="px-1 w-full md:w-2/5 mb-8 md:mb-0">
            <Link href="/">
              <Image
                src="/img/logo.svg"
                className="w-[100px] mb-[3.458vw] invert"
                alt="footer-logo"
                width={0}
                height={0}
              />
            </Link>
            <div className="news py-5">
              <p className="text-4xl font-grotesk font-medium leading-8 text-el-dark-black">
                Subscribe to<br />our newsletter
              </p>
            </div>
            <Subscribe showDialogue={showDialogue} />
          </div>
          <div className="w-full md:w-3/5 flex flex-col sm:flex-row sm:flex-wrap gap-[calc(5vw+28px)] md:gap-[5vw]">
            {navLinks.map(navLink=>(
              <div key={navLink.title} className="w-full sm:w-[10.833vw] px-1">
                <p className="font-grotesk font-medium text-black text-xl md:text-2xl leading-tight">{navLink.title}</p>
                <ul className="mt-6 text-black">
                  {navLink.links.map((item,i) => (
                    <li key={i} className="mb-4 md:mb-1 cursor-pointer">
                      <a
                        href={`insights/${item.link}`}
                        className="text-base md:text-sm hover:text-gray-500 transition-colors duration-200 font-grotesk"
                      >
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="my-8 md:mt-6 md:mb-2">
          <hr className="bg-[#01010c] " />
        </div>
        <div className="flex flex-col md:flex-row gap-16 justify-between md:items-center">
          <div className="flex flex-col md:flex-row gap-4 cursor-pointer">
            {endLinks.map((item, i) => (
              <a
                key={i}
                href={`/${item.link}`}
                className="font-grotesk mb-0 text-xs text-black md:text-gray-600 hover:text-gray-400 transition-colors duration-200"
              >
                {item.title}
              </a>
            ))}
          </div>
          <div>
            <a href="https://linkedin.com/" className="hover:scale-90 hover:opacity-80 transition-all duration-200">
             <div className="border border-el-dark-black rounded-full p-5 md:p-2 inline-block">
              <Image
                src="/img/neon.svg"
                className="cursor-pointer h-6 w-6 md:h-4 md:w-4"
                alt="linkedin-icon"
                width={0}
                height={0}
              />
             </div>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}