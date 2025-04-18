import React, { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import html2canvas from 'html2canvas';
import ReadingText from '../common/reading-text';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const ScrollSection: React.FC = () => {
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
    canvas.height = isMobile ? mobileWidth : 600;

    // if (isMobile) {
    //   canvas.style.width = '90vw';
    //   canvas.style.height = 'auto';
    // }

    // Render frame
    const renderFrame = (frame: number) => {
      const img = imagesRef.current[frame];
      if (ctx && img && img.complete) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
    };

    // Initial render (only if first image is already loaded)
    if (imagesRef.current[0]?.complete) {
      renderFrame(0);
    }

    // ScrollTrigger animation for canvas frames
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

    // Main timeline for first section animations
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

    // Function to capture canvas as background image
    const captureEyeAsBackground = async () => {
      if (eyeRef.current && secondSectionRef.current) {
        try {
          // Using html2canvas to capture the entire eye element with overlays
          const capturedImage = await html2canvas(eyeRef.current, {
            backgroundColor: null, // Transparent background
            allowTaint: true,
            useCORS: true,
            scale: window.devicePixelRatio || 1, // Capture at device resolution
          });
          
          const imageUrl = capturedImage.toDataURL('image/png');
          
          // Apply the captured image to the second section background
          secondSectionRef.current.style.backgroundImage = `url(${imageUrl})`;
          secondSectionRef.current.style.backgroundSize = 'cover';
          secondSectionRef.current.style.backgroundPosition = 'center top';
          secondSectionRef.current.style.backgroundRepeat = 'no-repeat';
          secondSectionRef.current.style.backgroundColor = '#0a0d3a'; // Match background color
          
          return imageUrl;
        } catch (error) {
          console.error("Error capturing eye element:", error);
          return null;
        }
      }
      return null;
    };

    // Main transition trigger at the exact moment section 2 reaches top of viewport
    ScrollTrigger.create({
      trigger: secondSectionRef.current,
      start: "top top", // Exactly when section 2 hits the top
      end: "top top",
      onEnter: async () => {
        // Pre-capture the background before any transitions
        const imageUrl = await captureEyeAsBackground();
        
        if (imageUrl) {
          // Fade out eye/canvas
          gsap.to(eyeRef.current, { 
            opacity: 0,
            duration: 0.4,
            ease: "power2.inOut",
            onComplete: () => {
              // After fade out, change position from fixed to absolute
              if (eyeRef.current) {
                eyeRef.current.style.position = 'absolute';
              }
            }
          });
        }
      },
      onLeaveBack: () => {
        // Reset eye/canvas to fixed
        if (eyeRef.current) {
          eyeRef.current.style.position = 'fixed';
        }
        
        // Fade in eye/canvas
        gsap.to(eyeRef.current, { 
          opacity: 1,
          duration: 0.4,
          ease: "power2.inOut",
          onComplete: () => {
            // Remove background from second section
            if (secondSectionRef.current) {
              secondSectionRef.current.style.backgroundImage = 'none';
              secondSectionRef.current.style.backgroundColor = 'transparent';
            }
          }
        });
      }
    });

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
              className="absolute inset-0 w-full h-auto md:h-full top-1/2 md:top-0 -translate-y-1/2 md:translate-none"
            />
            <div
              className="top absolute top-[26vh] md:top-0 left-0 w-full h-[20vw] z-[1]"
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
              className="bottom absolute bottom-[26vh] md:bottom-0 left-0 w-full h-[20vw] z-0"
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
      <section 
        ref={secondSectionRef} 
        className="min-h-screen bg-transparent relative pb-20"
      >
        <div 
          ref={secondSectionBgRef}
          className="absolute inset-0 w-full h-full opacity-0 z-0"
        ></div>
        
        <div className="relative z-10">
          <div className="mb-10 md:mb-[5vw]">
            <div className="flex flex-col gap-3">
              <span className="insights-text font-semibold text-xs uppercase block text-center">About Us</span>
              <div className="w-[max(280px,50%)] mx-auto">
                <ReadingText text="We offer trusted connectivity solutions to device makers, connectivity providers and IoT players worldwide" />
              </div>
              <div className="text-center py-4">
                <Link href="#" className="gradient-border relative text-xs px-0.5 py-2.5">
                  <span className="py-2 px-6 md:px-8 bg-el-black">More about us</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto w-[90vw] gap-5 lg:gap-8">
            <div className="flex items-center flex-col gap-4 md:gap-6">
              <h1 className="text-el-white font-semibold text-6xl md:text-7xl lg:text-8xl font-grotesk">+900</h1>
              <p className="text-2xl md:text-3xl font-editorial text-center">Millions connected devices use Valid&apos;s technology</p>
            </div>
            <div className="flex items-center flex-col gap-4 md:gap-6 mt-16">
              <h1 className="text-el-white font-semibold text-6xl md:text-7xl lg:text-8xl font-grotesk">+100</h1>
              <p className="text-2xl md:text-3xl font-editorial text-center">Remote SIM provisioning Platform implemented worldwide</p>
            </div>
            <div className="flex items-center flex-col gap-4 md:gap-6 mt-32">
              <h1 className="text-el-white font-semibold text-6xl md:text-7xl lg:text-8xl font-grotesk">Top 5</h1>
              <p className="text-2xl md:text-3xl font-editorial text-center">SIM Manufacturer globally</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ScrollSection;