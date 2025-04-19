import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
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
            <a href="#">
              <Image
                src="/img/logo.svg"
                className="w-[100px] mb-[3.458vw] invert"
                alt="footer-logo"
                width={0}
                height={0}
              />
            </a>
            <div className="news">
              <p className="text-[2rem] font-grotesk font-medium tracking-tighter leading-[2.1rem] text-el-dark-black">
                Subscribe to<br />our newsletter
              </p>
            </div>
            <div className="mt-5 rounded-3xl border border-gray-600 flex p-0.5 h-[42px]">
              <input
                type="email"
                id="name"
                placeholder="Email"
                className="w-full px-3 py-2 border-none focus:outline-none grow text-xs text-el-dark-black"
              />
              <button className="bg-[#131bff] rounded-3xl text-white hover:bg-[#182799] cursor-pointer px-2 text-xs w-[95px] font-semibold font-grotesk">
                Register
              </button>
            </div>
          </div>
          <div className="w-full md:w-3/5 flex flex-col sm:flex-row sm:flex-wrap gap-[5vw]">
            <div className="w-full sm:w-[10.833vw] px-1 mb-8 sm:mb-0">
              <p className="font-grotesk font-medium text-black text-[16px] sm:text-[18px] tracking-tight leading-tight">
                Insights
              </p>
              <ul className="mt-6 text-black cursor-pointer">
                {["Events", "Webinars", "Brochures", "PRs", "Whitepapers", "Article"].map((item) => (
                  <li key={item} className="mb-1">
                    <a
                      href="#"
                      className="text-[12px] sm:text-[14px] hover:text-gray-500 transition-colors duration-200 font-grotesk"
                    >
                      {item}
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
                {[
                  "SIMs",
                  "eSIMs",
                  "eSIM",
                  "Interoperability",
                  "Remote SIM",
                  "Provisioning",
                  "eSIM Onboarding",
                  "Journeys",
                  "Private Network",
                  "OTA Suite",
                  "iSE",
                  "iSIM",
                  "IoT Connectivity",
                ].map((item) => (
                  <li key={item} className="mb-1">
                    <a
                      href="#"
                      className="text-[12px] sm:text-[14px] hover:text-gray-500 transition-colors duration-200 font-grotesk"
                    >
                      {item}
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
                {["About", "Careers"].map((item) => (
                  <li key={item} className="mb-1">
                    <a
                      href="#"
                      className="text-[12px] font-grotesk sm:text-[14px] hover:text-gray-500 transition-colors duration-200"
                    >
                      {item}
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
            {["Privacy Policy", "Terms and Conditions"].map((item) => (
              <a
                key={item}
                href="#"
                className="mr-3 font-grotesk mb-0 text-[10px] sm:text-[12px] text-gray-600 hover:text-gray-400 transition-colors duration-200"
              >
                {item}
              </a>
            ))}
          </div>
          <div>
            <a href="#">
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