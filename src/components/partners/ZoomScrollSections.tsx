import React, { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import html2canvas from 'html2canvas';
import ScrollSection from './ScrollSection';
import AboutSection from './AboutSection';

gsap.registerPlugin(ScrollTrigger);

export default function ZoomScrollSections({text}:{text: string}){
  const sectionRef = useRef<HTMLElement>(null);
  const eyeRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const secondSectionRef = useRef<HTMLElement>(null);
  const secondSectionBgRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);  

  // Preload canvas images
  const totalFrames = 180;
  useEffect(() => {
    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      img.src = `/img/canvas/${i.toString().padStart(5, '0')}.jpg`;
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
    const totalScroll: number = (window.innerHeight * 5.05);

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    
    const isMobile = window.innerWidth < 768;
    const desktopWidth = 800;
    const mobileWidth = window.innerWidth * 0.9;
    canvas.width = isMobile ? mobileWidth : desktopWidth;
    canvas.height = isMobile ? mobileWidth : 600;

    const renderFrame = (frame: number) => {
      const img = imagesRef.current[frame];
      if (ctx && img && img.complete) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
    };

    if (imagesRef.current[0]?.complete) {
      renderFrame(0);
    }

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
    });

    gsap.set(h1Ref.current, {
      scale: 0.8,
      backgroundPositionX: '-100%',
      y: '50%',
      transformOrigin: '516px 114px', 
    });

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
      opacity: 1,
      duration: 0.1, // 10vh
    }, 9).to(eyeRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.1,
      position: 'fixed',
    }, 9);

    // Main transition trigger at the exact moment section 2 reaches top of viewport
    ScrollTrigger.create({
      trigger: secondSectionRef.current,
      start: "70% top",
      end: "bottom top",
      onEnter: () => {
        // Fade out eye/canvas
        gsap.to(eyeRef.current, { 
          opacity: 0,
          duration: 0.8,
          ease: "power2.inOut",
          onComplete: () => {
            if (eyeRef.current) {
              eyeRef.current.style.position = 'fixed';
            }
          }
        });
      },
      onLeaveBack: () => {
        // Reset eye/canvas to fixed
        if (eyeRef.current) {
          eyeRef.current.style.position = 'fixed';
        }
        
        // Fade in eye/canvas
        gsap.to(eyeRef.current, { 
          opacity: 1,
          duration: 0.8,
          ease: "power2.inOut",
          onComplete: () => {
            if (eyeRef.current) {
              eyeRef.current.style.position = 'fixed';
            }
          }
        });
      }
    });

  }, []);

  return (
    <>
      <ScrollSection
        text={text}
        sectionRef={sectionRef}
        eyeRef={eyeRef}
        canvasRef={canvasRef}
        containerRef={containerRef}
        h1Ref={h1Ref}
      />
      <AboutSection secondSectionRef={secondSectionRef} secondSectionBgRef={secondSectionBgRef} />
    </>
  )
}