import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';
import Image from 'next/image';

interface SidebarProps {
  isOpen: boolean;
  onInner: () => void;
  contactExpert: () => void;
}

export default function Sidebar({ isOpen, onInner, contactExpert }: SidebarProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: 'power4.inOut' } });

    if (isOpen) {
      tl.set(containerRef.current, { xPercent: 100 })
        .to(containerRef.current, { xPercent: 0, duration: 0.6 })
        .fromTo('#sidebar-link', { opacity: 0 }, { opacity: 1, duration: 0.01 }, '+=0.05')
        .fromTo('#sidebar-logo', { opacity: 0 }, { opacity: 1, duration: 0.05 }, '+=0.1')
        .fromTo('#sidebar-button', { opacity: 0 }, { opacity: 1, duration: 0.4 }, '+=0.1');
    } else {
      tl.to('#sidebar-button', { opacity: 0, duration: 0.3 })
        .to('#sidebar-link', { opacity: 0, duration: 0.3 }, '-=0.1')
        .to('#sidebar-logo', { opacity: 0, duration: 0.3 }, '-=0.2')
        .to(containerRef.current, { xPercent: 100, duration: 0.6 })
        .to(containerRef.current, { opacity: 1 });
      }
  }, [isOpen]);

  return (
    <div
      ref={containerRef}
      className="fixed top-0 right-0 w-full h-screen bg-white z-50 px-4 py-6 lg:px-0 lg:py-[1.667vw] flex flex-col gap-6 opacity-0"
    >
      <div className="w-full h-full md:w-[90vw] xl:w-[80vw] mx-auto flex flex-col pb-10">
        <Link href={"/"} id="sidebar-logo" className="invert opacity-0">
          <Image src="/img/logo.svg" alt="Logo" height="0" width="0" className="h-7 md:h-8 lg:h-9 w-auto"/>
        </Link>
        <nav id="sidebar-link" className="flex flex-col gap-6 pt-16 pb-10 text-gray-700 font-grotesk text-2xl md:text-4xl">
          <a className="flex items-center gap-3 md:gap-4 hover:text-black transition" onClick={onInner}>
            <span>Solutions</span>
            <span>
              <svg className="w-4 md:w-5" width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.641418 13.3707L19.4396 13.3707L11.0196 21.7907L12.9777 23.7489L24.7266 12L12.9777 0.25115L11.0196 2.20929L19.4396 10.6293L0.641418 10.6293L0.641418 13.3707Z" fill="currentColor"></path>
              </svg>
            </span>
          </a>
          <Link href="/insights" className="hover:text-black transition">Insights</Link>
          <Link href="/about-us" className="hover:text-black transition">About</Link>
          <Link href="/careers" className="hover:text-black transition">Careers</Link>
        </nav>
        <div className="mt-auto text-center py-2">
          <button onClick={contactExpert} id="sidebar-button" className="text-sm text-el-primary bg-white/10 backdrop-blur-3xl px-6 py-2.5 rounded-4xl border border-transparent shadow-sm hover:border-white opacity-0 cursor-pointer">Talk to our experts</button>
        </div>
      </div>
      
    </div>
  );
}
