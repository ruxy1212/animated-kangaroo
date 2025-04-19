import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import CloseButton from "./_fragment/CloseButton";

type subItem = {
  title: string;
  children?: {
    text: string;
    link: string;
  }[] | null;
}

interface InnerSubMenuProps {
  isOpen: boolean;
  onClose: () => void;
  items: subItem[];
}

export default function InnerSubMenu({ isOpen, onClose, items }: InnerSubMenuProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !contentRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });

    if (isOpen) {
      tl.set(containerRef.current, { xPercent: 100, autoAlpha: 1 })
        .to(containerRef.current, { xPercent: 0, duration: 0.5 })
        .fromTo(
          contentRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.4 },
          "-=0.2"
        );
    } else {
      tl.to(contentRef.current, { opacity: 0, y: 10, duration: 0.3 })
        .to(containerRef.current, {
          xPercent: 100,
          duration: 0.5,
          onComplete: () => {
            gsap.set(containerRef.current, { autoAlpha: 0 });
          },
        });
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/30 z-50"
        />
      )}

      <div
        ref={containerRef}
        className="fixed top-0 right-0 z-[100] w-[90vw] max-w-96 h-screen bg-el-white shadow-xl opacity-0"
      >
        <div className="h-full relative">
          <CloseButton handleClose={onClose} className="absolute top-16 px-3.5 py-2 z-50 rounded-lg -left-3 xs:-left-12 bg-white/10 backdrop-blur-2xl text-gray-500 hover:text-gray-800 shadow-[0px_0px_1px_0px_white] hover:bg-white/50" variant="submenu" invert={false} />
          <div
            ref={contentRef}
            className="h-full px-5 md:px-7 py-9 md:py-12 overflow-y-auto opacity-0"
          >
            <ul className="flex flex-col gap-4 text-lg text-gray-800">
              {items.map((item, idx) => (
                <li key={idx}>
                  <h3 className="font-grotesk text-xl md:text-2xl">
                    {item.children && item.children.length > 0 ? (item.title):(
                      <a className="hover:text-el-primary-dark cursor-pointer" href="#">{item.title}</a>
                    )}
                  </h3>
                  {item.children && item.children.length > 0 && (
                    <ul className="ml-4 mt-2 text-sm text-gray-600">
                      {item.children.map((child, childIdx) => (
                        <li key={childIdx}>
                          <a className="hover:text-black cursor-pointer" href={child.link}>{child.text}</a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
