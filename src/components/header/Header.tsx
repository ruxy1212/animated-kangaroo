import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import { solutions } from "@/lib/data/solutions";

gsap.registerPlugin(ScrollTrigger);

const Header = ({contactExpert}: {contactExpert: () => void}) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isHoveringRef = useRef<boolean>(false);

  useEffect(() => {
    const header = headerRef.current;
    const dropdown = dropdownRef.current;

    if (!dropdown) return;

    gsap.set(dropdown, { 
      opacity: 0,
      pointerEvents: "none"
    });

    let lastY = window.scrollY;

    const updateHeader = () => {
      const currentY = window.scrollY;
      const direction = currentY > lastY ? "down" : "up";
      lastY = currentY;

      if (currentY === 0) {
        gsap.to(header, {
          y: 0,
          backgroundColor: "transparent",
          paddingTop: "1rem", 
          paddingBottom: "1rem", 
          duration: 0.3,
          ease: "power2.out"
        });
      } else if (direction === "down") {
        gsap.to(header, {
          y: "-100%",
          duration: 0.3,
          ease: "power2.out"
        });
      } else {
        gsap.to(header, {
          y: 0,
          backgroundColor: "rgb(19, 27, 255)",
          paddingTop: "0.625rem", 
          paddingBottom: "0.625rem", 
          duration: 0.3,
          ease: "power2.out"
        });
        gsap.to('#menu-complete-trigger', {
          top: "8px"
        });
      }
    };

    const onScroll = () => {
      if(window.innerWidth >= 768)
        requestAnimationFrame(updateHeader);
    };

    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    isHoveringRef.current = true;
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    timeoutRef.current = setTimeout(() => {
      if (isHoveringRef.current && dropdownRef.current) {
        gsap.to(dropdownRef.current, {
          opacity: 1,
          pointerEvents: "auto",
          duration: 0.3,
          ease: "power2.out",
          onComplete: () => {
            if (dropdownRef.current) {
              dropdownRef.current.style.pointerEvents = "auto";
            }
          }
        });
    
        gsap.to('.nav-links', {
          color: "#000",
          duration: 0.3
        });
        
        gsap.to('#header-logo', {
          filter: "invert(1)",
          duration: 0.3
        });
        
      }
    }, 500);
  };

  const handleMouseLeave = () => {
    isHoveringRef.current = false;
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    timeoutRef.current = setTimeout(() => {
      if (!isHoveringRef.current && dropdownRef.current) {
        gsap.to(dropdownRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
          onComplete: () => {
            if (dropdownRef.current) {
              dropdownRef.current.style.pointerEvents = "none";
            }
          }
        });

        gsap.to('.nav-links', {
          color: "#fbfafe",
          duration: 0.3
        });
        
        gsap.to('#header-logo', {
          filter: "unset",
          duration: 0.3
        });
      }
    }, 500);
  };

  return (
    <header ref={headerRef} className="block h-auto left-0 absolute md:fixed right-0 top-0 transition-[all_0.4s_cubic-bezier(0.16,1,0.3,1)] w-full z-50 px-4 py-6 lg:px-0 lg:py-[1.667vw]" style={{ backgroundColor: "transparent" }}>
      <div className="w-full md:w-[90vw] xl:w-[80vw] mx-auto flex justify-between items-center">
        <Link href={"/"}>
          <Image id="header-logo" src="/img/logo.svg" alt="Logo" height="0" width="0" className="h-7 md:h-8 lg:h-9 w-auto"/>
        </Link>
        <nav className="hidden lg:flex gap-8 text-el-white">
          <div 
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Link href={"#"} className="nav-links hover:opacity-50 text-lg transition-all duration-200">Solutions</Link>
            
            <div 
              ref={dropdownRef}
              className="solutions-dropdown fixed top-0 left-0 w-full -z-10 justify-between px-[5vw] pb-[3rem] pt-[6rem] bg-el-white flex items-center"
              style={{ opacity: 0 }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <ul className="col-count-2 col-gap-16">
                {solutions && solutions.map((solution) => (
                  <li key={solution.id} className="flex flex-col mb-5">
                    <p className="text-2xl text-el-black">{solution.title}</p>
                    <ul className="text-gray-500 text-sm">
                      {solution.children && solution.children.map((descendant, j) => (
                        <li key={j}>
                          <a className="hover:opacity-60 transition-all" href={descendant.link}>{descendant.text}{descendant.extra && (<span>{descendant.extra}</span>)}</a>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>                  
              <div className="min-w-96 max-w-1/2 h-72 rounded-full overflow-hidden relative">
                <div className="absolute inset-0 bg-el-black opacity-0 z-10"></div>
                <video preload="metadata" autoPlay loop={true} playsInline={true} muted={true} poster="" className="h-full">
                  <source src="/video/Hero-valid.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
          <Link href={"#"} className="nav-links hover:opacity-50 text-base transition-colors duration-200">Insights</Link>
          <Link href={"#"} className="nav-links hover:opacity-50 text-base transition-colors duration-200">About</Link>
          <Link href={"#"} className="nav-links hover:opacity-50 text-base transition-colors duration-200">Careers</Link>
        </nav>
        <button onClick={()=>contactExpert()} className="text-sm hidden lg:block text-el-primary bg-white/10 backdrop-blur-3xl px-6 py-2.5 rounded-4xl border border-transparent shadow-sm hover:border-white">Talk to our experts</button>
      </div>
    </header>
  );
};

export default Header;