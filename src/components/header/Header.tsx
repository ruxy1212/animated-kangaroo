import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const Header = () => {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const header = headerRef.current;

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
      }
    };

    const onScroll = () => {
      requestAnimationFrame(updateHeader);
    };

    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header ref={headerRef} className="block h-auto left-0 fixed right-0 top-0 transition-[all_0.4s_cubic-bezier(0.16,1,0.3,1)] w-full z-50 px-4 py-6 lg:px-0 lg:py-[1.667vw]" style={{ backgroundColor: "transparent" }}>
      <div className="w-full md:w-[90vw] xl:w-[80vw] mx-auto flex justify-between items-center">
        <Link href={"/"}>
          <Image src="/img/logo.svg" alt="Logo" height="0" width="0" className="h-7 md:h-8 lg:h-9 w-auto"/>
        </Link>
        <nav className="hidden lg:flex gap-8 text-el-white">
          <div className="relative group peer">
            <Link href={"#"} className="hover:opacity-50 text-lg transition-colors duration-200">Solutions</Link>
            <div className="fixed top-0 left-0 w-full -z-10 justify-between px-[5vw] pb-[3rem] pt-[6rem] bg-el-white opacity-0 group-hover:opacity-100 hidden group-hover:flex items-center transition-opacity delay-1000">
              <ul className="col-count-2 col-gap-16">
                <li className="flex flex-col mb-5">
                  <p className="text-2xl text-el-black">SIMs</p>
                  <ul className="text-gray-500 text-sm">
                    <li>
                      <a className="hover:opacity-60 transition-all" href="#">SIMs</a>
                    </li>
                  </ul>
                </li>
                <li className="flex flex-col mb-5">
                  <p className="text-2xl text-el-black">eSIMs</p>
                  <ul className="text-gray-500 text-sm">
                    <li>
                      <a className="hover:opacity-60 transition-all" href="#">eSIMSs for IoT and Consumer</a>
                    </li>
                    <li>
                      <a className="hover:opacity-60 transition-all" href="#">eSIM Interoperability</a>
                    </li>
                  </ul>
                </li>
                <li className="flex flex-col mb-5">
                  <p className="text-2xl text-el-black">eSIM Solutions</p>
                  <ul className="text-gray-500 text-sm">
                    <li>
                      <a className="hover:opacity-60 transition-all" href="#">Remote SIM Provisioning</a>
                    </li>
                    <li>
                      <a className="hover:opacity-60 transition-all" href="#">eSIM Onboarding Journey</a>
                    </li>
                  </ul>
                </li>
                <li className="flex flex-col mb-5">
                  <p className="text-2xl text-el-black">5G</p>
                  <ul className="text-gray-500 text-sm">
                    <li>
                      <a className="hover:opacity-60 transition-all" href="#">OTA Suite</a>
                    </li>
                    <li>
                      <a className="hover:opacity-60 transition-all" href="#">Private Networks</a>
                    </li>
                  </ul>
                </li>
                <li className="flex flex-col mb-5">
                  <p className="text-2xl text-el-black">Integrated SE</p>
                  <ul className="text-gray-500 text-sm">
                    <li>
                      <a className="hover:opacity-60 transition-all" href="#">iSE</a>
                    </li>
                    <li>
                      <a className="hover:opacity-60 transition-all" href="#">iSIM</a>
                    </li>
                  </ul>
                </li>
                <li className="flex flex-col mb-5">
                  <p className="text-2xl text-el-black">IoT Connectivity</p>
                  <ul className="text-gray-500 text-sm">
                    <li>
                      <a className="hover:opacity-60 transition-all" href="#">IoT Connectivity</a>
                    </li>
                  </ul>
                </li>
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
          <Link href={"#"} className="hover:opacity-50 text-base transition-colors duration-200 peer-hover:invisible">Insights</Link>
          <Link href={"#"} className="hover:opacity-50 text-base transition-colors duration-200 peer-hover:invisible">About</Link>
          <Link href={"#"} className="hover:opacity-50 text-base transition-colors duration-200 peer-hover:invisible">Careers</Link>
        </nav>
        <Link href="#contact-modal" className="text-sm hidden lg:block text-el-primary bg-white/10 backdrop-blur-3xl px-6 py-2.5 rounded-4xl border border-transparent shadow-sm hover:border-white">Talk to our experts</Link>
      </div>
    </header>
  );
};

export default Header;
