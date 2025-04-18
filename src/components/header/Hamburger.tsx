import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function Hamburger() {
  const [isOpen, setIsOpen] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);
  const middleRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { duration: 0.4, ease: 'power2.inOut' } });

    if (isOpen) {
      tl.to(topRef.current, { yPercent: 200, rotate: 45, backgroundColor: '#364153' }, 0)
        .to(bottomRef.current, { yPercent: -200, rotate: -45, backgroundColor: '#364153' }, 0)
        .to(middleRef.current, { opacity: 0, scaleX: 0, backgroundColor: '#364153' }, 0)
        .set('#menu-complete-trigger', { backgroundColor: 'white', boxShadow: '0px 0px 1px 0px gray' });
    } else {
      tl.to(topRef.current, { yPercent: -450, rotate: 0, backgroundColor: '#e5e7eb' }, 0)
        .to(bottomRef.current, { yPercent: 360, rotate: 0, backgroundColor: '#e5e7eb' }, 0)
        .to(middleRef.current, { opacity: 1, scaleX: 1, backgroundColor: '#e5e7eb' }, 0)
        .set('#menu-complete-trigger', { backgroundColor: '#ffffff0a', boxShadow: '0px 0px 1px 0px gray' });
    }
  }, [isOpen]);

  return (
    <div
      id="menu-complete-trigger"
      className="fixed top-4 lg:hidden right-4 md:right-[5vw] z-[99] px-3 py-2.5 cursor-pointer bg-white/10 backdrop-blur-2xl rounded-lg shadow-[0px_0px_1px_0px_white]"
      onClick={() => setIsOpen(prev => !prev)}
    >
      <div className="relative w-4 h-4 flex flex-col items-center justify-center gap-0.5">
        <div
          ref={topRef}
          className="w-4 h-[1px] absolute top-1.5 left-0 origin-center"
        />
        <div
          ref={middleRef}
          className="w-4 h-[1px] origin-center"
        />
        <div
          ref={bottomRef}
          className="w-4 h-[1px] absolute bottom-[5px] left-0 origin-center"
        />
      </div>
    </div>
  );
}
