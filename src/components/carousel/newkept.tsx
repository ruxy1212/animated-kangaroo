import React, { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const eyeRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);  
  

  // Preload canvas images
  const totalFrames = 180;
  // const images: HTMLImageElement[] = [];
  useEffect(() => {
    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      img.src = `/img/canvas/${i.toString().padStart(5, '0')}.jpg`; // Adjust path
      // Set onload for the first image to render frame 0
      if (i === 0) {
        img.onload = () => {
          const canvas = canvasRef.current;
          const ctx = canvas?.getContext('2d');
          if (ctx && canvas) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          }
        };
      }
      imagesRef.current[i] = img;
    }
  }, []);

  

  useGSAP(() => {
    const totalScroll: number = (window.innerHeight * 5.05); // 1010vh


    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    
    // Set canvas dimensions based on device
    const isMobile = window.innerWidth < 768;
    const desktopWidth = 800;
    const mobileWidth = window.innerWidth * 0.9;
    canvas.width = isMobile ? mobileWidth : desktopWidth;
    canvas.height = 600;

    if (isMobile) {
      canvas.style.width = '90vw';
      canvas.style.height = 'auto';
    }

    // Render frame
    const renderFrame = (frame: number) => {
      const img = imagesRef.current[frame];
      if (ctx && img && img.complete) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
      console.log(`Rendering frame: ${frame} | Image source: ${img.src}`);
    };

    // Initial render (only if first image is already loaded)
    if (imagesRef.current[0]?.complete) {
      renderFrame(0);
    }

    // ScrollTrigger animation
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top+=40% top',
      end: 'bottom 80%',
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const frame = Math.floor(progress * (totalFrames - 1));
        renderFrame(frame);
      },
    })

    gsap.set(h1Ref.current, {
      scale: 0.8,
      backgroundPositionX: '-100%',
      y: '50%',
      transformOrigin: '516px 114px', 
    });

    // Main timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: `+=${totalScroll}`,
        scrub: true,
      },
    });

    // Scene 1: 0-400vh (h1 animation)
    tl.fromTo(h1Ref.current, 
    {
      backgroundPositionX: '0%',
      scale: 0.8,
    },
    {
      scale: 1,
      y: '0%',
      backgroundPositionX: '18%',
      duration: 2,
    });

    // Scene 2: At 400vh (h1 transform-origin change)
    tl.set(h1Ref.current, { transformOrigin: '49% 20%' }, 2);
    tl.set(eyeRef.current, { scale: 0.5, opacity: 0.0001, }, 2);

    // Scene 3: 400-600vh (h1 animation)
    tl.to(h1Ref.current, 
    {
      scale: 10,
      backgroundPositionX: '50%',
      duration: 2, // 200vh
    }, 2);

    // Scene 4: 600-800vh (h1 and eye animation)
    tl.to(h1Ref.current, 
    {
      scale: 30,
      backgroundPositionX: '100%',
      duration: 2, // 200vh
    }, 4).to(eyeRef.current, 
    {
      scale: 0.7,
      opacity: 0.3,
      duration: 4,
    }, 4);

    // Scene 5: 800-900vh (h1 and eye animation)
    tl.to(h1Ref.current, {
      scale: 60,
      duration: 1, // 100vh
    }, 8).to(eyeRef.current, {
      scale: 0.9,
      opacity: 0.7,
      duration: 1,
    }, 8);

    // Scene 6: 900-910vh (container fade and eye animation)
    tl.to(containerRef.current, {
      opacity: 0,
      duration: 0.1, // 10vh
    }, 9).to(eyeRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.1,
    }, 9);

    // Canvas animation: 600-960vh (360vh for 180 frames, 2vh per frame)
    // gsap.to({}, {
    //   scrollTrigger: {
    //     trigger: sectionRef.current,
    //     start: 'top+=322vh top',
    //     end: 'top+=605vh top',
    //     scrub: true,
    //     onUpdate: (self: ScrollTrigger) => {
    //       const frame = Math.floor(self.progress * (totalFrames - 1));
    //       renderFrame(frame);
    //     },
    //   },
    // });
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className="relative h-[505vh] pb-[15vw]"
      >
        <div className="sticky top-0 overflow-hidden">
          <div
            ref={eyeRef}
            className="eye w-full top-0 fixed h-screen opacity-[0.0001] scale-50"
          >
            <canvas
              ref={canvasRef}
              width={1280}
              height={632}
              className="absolute inset-0 w-full h-full"
            />
            <div
              className="top absolute top-0 left-0 w-full h-[20vw] z-[1]"
              style={{
                background: 'linear-gradient(180deg, #0a0d3a, rgba(12, 8, 96, 0))',
              }}
            />
            <div
              className="right absolute right-0 top-0 h-full w-[40vw] z-0"
              style={{
                background: 'linear-gradient(270deg, #0a0d3a, rgba(12, 8, 96, 0))',
              }}
            />
            <div
              className="left absolute top-0 left-0 h-full w-[40vw] z-[1]"
              style={{
                background: 'linear-gradient(90deg, #0a0d3a, rgba(12, 8, 96, 0))',
              }}
            />
            <div
              className="bottom absolute bottom-0 left-0 w-full h-[20vw] z-0"
              style={{
                background: 'linear-gradient(0deg, #0a0d3a, rgba(1, 5, 41, 0))',
              }}
            />
          </div>
          <div ref={containerRef} className="container mx-auto w-[80vw] px-[0.833vw] h-[100vh] flex relative">
            <div className="columns my-auto flex flex-row justify-start -mx-[0.417vw]">
              <div className="item px-[0.417vw] relative super-title">
                <h1
                  ref={h1Ref}
                  className="text-[7.083vw] font-medium leading-[0.82] text-center font-grotesk"
                >
                  Your trusted partner for secure and interoperable mobile services
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="h-[100vh] bg-transparent">
        <div className="flex flex-col justify-between gap-10 relative h-full">
          <p className="text-3xl text-white">A big good div to walk around inside... Lol</p>
          <p className="text-3xl text-white">A big good div to walk around inside... Lol2</p>
          <p className="text-3xl text-white">A big good div to walk around inside... Lol3</p>
        </div>
      </section>
    </>
  );
};

export default ScrollSection;