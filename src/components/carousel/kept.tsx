

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

// Sample carousel items (replace with your data)
const carouselItems = [
  {
    id: 1,
    title: 'Solution 1',
    description: 'Trusted connectivity for your needs.',
    image: 'https://via.placeholder.com/800x600',
  },
  {
    id: 2,
    title: 'Solution 2',
    description: 'Guaranteed interoperability.',
    image: 'https://via.placeholder.com/800x600',
  },
  {
    id: 3,
    title: 'Solution 3',
    description: 'Scalable and secure.',
    image: 'https://via.placeholder.com/800x600',
  },
  {
    id: 4,
    title: 'Solution 4',
    description: 'Innovative technology.',
    image: 'https://via.placeholder.com/800x600',
  },
  {
    id: 5,
    title: 'Solution 5',
    description: 'Scalable and secure2.',
    image: 'https://via.placeholder.com/800x600',
  },
  {
    id: 6,
    title: 'Solution 5',
    description: 'Innovative technology2.',
    image: 'https://via.placeholder.com/800x600',
  },
];

const Carousel: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  // const itemsRef = useRef<(HTMLElement | null)[]>([]);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([])

  useGSAP(() => {
    const items = itemsRef.current;
    const totalItems = carouselItems.length;

    // Desktop animations
    if (window.innerWidth >= 768) {
      // Initial positions for items
      items.forEach((item, index) => {
        if (item) {
          gsap.set(item, {
            y: index === 0 ? '10vw' : index === 1 ? '20vw' : 0,
          });
        }
      });

      // Animate first two items upward to container top
      [0, 1].forEach((index) => {
        const item = items[index];
        if (item) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top bottom',
              end: 'top+=5vh top',
              scrub: true,
            },
          });

          tl.to(item, {
            y: 0,
            duration: 1,
            ease: 'power2.out',
          });

          // Animate text/image height ratio and image properties
          tl.to(
            item.querySelector('.text-container') as HTMLElement,
            {
              height: '40vh',
              duration: 1,
              ease: 'power2.out',
            },
            0
          );
          tl.to(
            item.querySelector('.image-container') as HTMLElement,
            {
              height: '60vh',
              duration: 1,
              ease: 'power2.out',
            },
            0
          );
          tl.to(
            item.querySelector('img') as HTMLImageElement,
            {
              opacity: 1,
              scale: 1,
              duration: 1,
              ease: 'power2.out',
            },
            0
          );
        }
      });

      // Move container to viewport top
      // if (containerRef.current) {
      //   gsap.to(containerRef.current, {
      //     y: 0,
      //     scrollTrigger: {
      //       trigger: containerRef.current,
      //       start: 'top+=5vh top',
      //       end: 'top top',
      //       scrub: true,
      //       pin: true,
      //       pinSpacing: false,
      //     },
      //   });
      // }
      if (containerRef.current) {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top top',
          end: () => `+=${totalItems * window.innerWidth}`,
          pin: true,
          pinSpacing: true,
          id: 'pin-container',
        });
      }

      // Horizontal scroll for items 3+
      if (containerRef.current && items[totalItems - 1]) {
        gsap.to(containerRef.current, {
          x: () => -(items[totalItems - 1]!.offsetLeft - window.innerWidth / 2),
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: () => `+=${(totalItems - 1) * window.innerWidth * 0.8}`, // Increase end distance
            scrub: true,
            pin: true,
            pinSpacing: true, // Enable pin spacing
            anticipatePin: 1,
          },
        });
      }

      // Animate height and image for items 3+
      items.slice(2).forEach((item) => {
        if (item) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: item,
              start: 'right right',
              end: 'right left',
              scrub: true,
            },
          });

          tl.to(item.querySelector('.text-container') as HTMLElement, {
            height: '40vh',
            duration: 1,
            ease: 'power2.out',
          });
          tl.to(
            item.querySelector('.image-container') as HTMLElement,
            {
              height: '60vh',
              duration: 1,
              ease: 'power2.out',
            },
            0
          );
          tl.to(
            item.querySelector('img') as HTMLImageElement,
            {
              opacity: 1,
              scale: 1,
              duration: 1,
              ease: 'power2.out',
            },
            0
          );
        }
      });
    } else {
      // Mobile animations
      if (containerRef.current && items[totalItems - 1]) {
        gsap.to(containerRef.current, {
          x: () => -(items[totalItems - 1]!.offsetLeft),
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: () => `+=${totalItems * window.innerWidth}`,
            scrub: 0.5,
            pin: true,
            snap: 1 / (totalItems - 1),
            anticipatePin: 1,
          },
        });
      }
    }
  }, { scope: containerRef });

  return (
    <div className="relative min-h-screen bg-gray-100">
      <div
        ref={containerRef}
        className="absolute md:relative top-0 left-0 w-[200%] md:w-full h-[100vh] flex flex-row will-change-transform"
      >
        {carouselItems.map((item, index) => (
          <div
            key={item.id}
            ref={(el) => { itemsRef.current[index] = el; }}
            className="w-full md:w-1/2 flex flex-col h-[100vh] shrink-0 border-2 border-red-500"
          >
            <div
              className="text-container flex-1 md:h-[40vh] bg-white p-6 flex flex-col justify-center items-start"
              style={{ height: window.innerWidth >= 768 ? '50vh' : '40vh' }}
            >
              <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
              <p className="text-lg mb-4">{item.description}</p>
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Learn More
              </button>
            </div>
            <div
              className="image-container flex-1 md:h-[60vh]"
              style={{ height: window.innerWidth >= 768 ? '50vh' : '60vh' }}
            >
              <Image
                width={0}
                height={0}
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover opacity-0 scale-110"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;







import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

// Sample carousel items (replace with your data)
const carouselItems = [
  {
    id: 1,
    title: 'SIMs',
    description: 'Trusted connectivity for your needs.',
    image: '/img/featured-sim.jpg',
  },
  {
    id: 2,
    title: 'eSIMs',
    description: 'Guaranteed interoperability.',
    image: '/img/featured-esim.jpg',
  },
  {
    id: 3,
    title: 'eSIM Solutions',
    description: 'Scalable and secure.',
    image: '/img/featurde-esim-solutions.jpg',
  },
  {
    id: 4,
    title: '5G',
    description: 'Innovative technology.',
    image: '/img/featured-5g.jpg',
  },
  {
    id: 5,
    title: 'Integrated SE',
    description: 'Scalable and secure solutions.',
    image: '/img/featured-integrated-se.jpg',
  },
  {
    id: 6,
    title: 'IoT Connectivity',
    description: 'Innovative technology solutions.',
    image: '/img/featured-iot-connectivity.jpg',
  },
];

const Carousel: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    // Clear any existing ScrollTriggers to prevent issues on re-render
    ScrollTrigger.getAll().forEach(st => st.kill());
    
    const items = itemsRef.current.filter(Boolean);
    const totalItems = items.length;
    const container = containerRef.current;
    const section = sectionRef.current;
    
    if (!container || !section || items.length === 0) return;
    if( !items[0] || !items[1] ) return;

    // Set initial layout
    const isDesktop = window.innerWidth >= 768;
    const lastItem = items[totalItems - 1];
    // const secondLastItem = items[totalItems - 2];
   
    if (isDesktop) {
      // DESKTOP SETUP
      
      // 1. Initial state setup
      gsap.set(items[0], { y: '10vw' });
      gsap.set(items[1], { y: '20vw' });
      
      // Setup the total height of the section to ensure proper scrolling
      const totalScrollDistance = 
        // Initial approach distance
        window.innerHeight * 1.2 + 
        // Space for horizontal scrolling
        (totalItems - 2) * window.innerWidth * 0.5 +
        // Extra space to unpin
        window.innerHeight * 0.5;
        
      gsap.set(section, { height: totalScrollDistance });
      
      // 2. Animation for first two items moving up to container top
      const initialTL = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'top+=5vh top',
          scrub: true,
        },
      });
      
      // First item animation
      initialTL.to(items[0], {
        y: 0,
        ease: 'power2.out',
      }, 0);
      
      initialTL.to(items[0].querySelector('.text-container'), {
        height: '40vh',
        ease: 'power2.out',
      }, 0);
      
      initialTL.to(items[0].querySelector('.image-container'), {
        height: '60vh',
        ease: 'power2.out',
      }, 0);
      
      initialTL.to(items[0].querySelector('img'), {
        opacity: 1,
        scale: 1,
        ease: 'power2.out',
      }, 0);
      
      // Second item animation
      initialTL.to(items[1], {
        y: 0,
        ease: 'power2.out',
      }, 0);
      
      initialTL.to(items[1].querySelector('.text-container'), {
        height: '40vh',
        ease: 'power2.out',
      }, 0);
      
      initialTL.to(items[1].querySelector('.image-container'), {
        height: '60vh',
        ease: 'power2.out',
      }, 0);
      
      initialTL.to(items[1].querySelector('img'), {
        opacity: 1,
        scale: 1,
        ease: 'power2.out',
      }, 0);
      
      // 3. Pin the container and scroll horizontally
      const maxScrollX = lastItem ? lastItem.offsetLeft - window.innerWidth / 2 : 0;
      
      const horizontalScroll = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${(totalItems - 2) * window.innerWidth * 0.5}`,
          pin: true,
          anticipatePin: 1,
          scrub: 0.5,
          invalidateOnRefresh: true,
        }
      });
      
      horizontalScroll.to(container, {
        x: () => -maxScrollX,
        ease: 'none',
      });
      
      // 4. Animate remaining items as they come into view
      items.slice(2).forEach((item, index) => {
        if (!item) return;
        const rightEdge = window.innerWidth + (index * window.innerWidth / 2);
        
        gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: () => `top+=${rightEdge - window.innerWidth} top`,
            end: () => `top+=${rightEdge} top`,
            scrub: true,
            invalidateOnRefresh: true,
          }
        })
        .to(item.querySelector('.text-container'), {
          height: '40vh',
          ease: 'power1.inOut',
        }, 0)
        .to(item.querySelector('.image-container'), {
          height: '60vh', 
          ease: 'power1.inOut',
        }, 0)
        .to(item.querySelector('img'), {
          opacity: 1,
          scale: 1,
          ease: 'power1.inOut',
        }, 0);
      });
      
    } else {
      // MOBILE SETUP
      
      // Set height to enable scrolling
      const totalScrollDistance = totalItems * window.innerHeight * 1.2;
      gsap.set(section, { height: totalScrollDistance });
      
      // Snap-based horizontal scrolling
      const maxScrollX = lastItem ? lastItem.offsetLeft : 0;
      
      gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${totalItems * window.innerWidth}`,
          pin: true,
          anticipatePin: 1,
          scrub: 0.5,
          snap: {
            snapTo: 1 / (totalItems - 1),
            duration: { min: 0.2, max: 0.5 },
            ease: 'power1.inOut',
          },
          invalidateOnRefresh: true,
        }
      }).to(container, {
        x: () => -maxScrollX,
        ease: 'none',
      });
      
      // Ensure all mobile items have proper image setup
      items.forEach((item) => {
        if (!item) return;
        gsap.set(item.querySelector('img'), {
          opacity: 1,
          scale: 1,
        });
      });
    }
    
    // Set up resize handler
    const handleResize = () => {
      ScrollTrigger.refresh(true);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
    
  }, { scope: containerRef, dependencies: [] });

  return (
    <div ref={sectionRef} className="relative">
      <div
        ref={containerRef}
        className="absolute top-0 left-0 w-full md:w-full h-[100vh] flex flex-row will-change-transform"
      >
        {carouselItems.map((item, index) => (
          <div
            key={item.id}
            ref={(el) => { itemsRef.current[index] = el; }}
            className="w-full md:w-1/2 flex flex-col h-[100vh] shrink-0"
          >
            <div
              className="text-container bg-white p-6 flex flex-col justify-center items-start"
              style={{ height: '50vh' }}
            >
              <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
              <p className="text-lg mb-4">{item.description}</p>
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Learn More
              </button>
            </div>
            <div
              className="image-container overflow-hidden"
              style={{ height: '50vh' }}
            >
              <Image
                width={800}
                height={600}
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover opacity-0 scale-110"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;































<section class="component component--text-composition-gradient">
  <div class="sticky top-0">
    <div class="eye" style="translate: none; rotate: none; scale: none; transform: scale(0.5, 0.5); opacity: 0.0001;">
      <canvas id="canvas" width="1280" height="632"></canvas>
      <div class="top"></div>
      <div class="bottom"></div>
    </div>
    <div class="container">
      <div class="columns">
        <div class="item">
          <h1 class="supertitle --small --na" data-desktop="" style="translate: none; rotate: none; scale: none; transform: translate(0px, 50%) scale(0.8, 0.8); background-position-x: 0%;">Your trusted partner for secure and interoperable mobile services</h1>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .component--text-composition-gradient {
      height: 1000vh;
      padding: 15vw 0 20vw;
  }
  .sticky .eye {
      height: 100%;
      opacity: .8;
      position: absolute;
      width: 100vw;
  }
  .sticky .eye canvas {
      bottom: 0;
      height: 100%;
      left: 0;
      position: absolute;
      right: 0;
      top: 0;
      width: 100%;
      will-change: transform;
  }
  .sticky .eye .top {
      background: #b2b2b2;
      background: var(--dark);
      background: linear-gradient(180deg, #0a0d3a, rgba(12, 8, 96, 0));
      content: "";
      height: 20vw;
      left: 0;
      position: absolute;
      top: -.042vw;
      width: 100%;
      z-index: 1;
  }
  .sticky .eye .bottom {
      background: #b2b2b2;
      background: var(--dark);
      background: linear-gradient(0deg, #0a0d3a, rgba(1, 5, 41, 0));
      bottom: 0;
      content: "";
      height: 20vw;
      left: 0;
      position: absolute;
      top: auto;
      width: 100%;
      z-index: 0;
  }
  .container {
      margin: auto;
      max-width: 100%;
      padding: 0 .833vw;
      position: relative;
      width: 80vw;
  }
  .columns {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      margin-left: calc(.417vw * -1);
      margin-right: calc(.417vw * -1);
      row-gap: .833vw;
  }
  .columns .item {
      padding-left: .417vw;
      padding-right: .417vw;
      position: relative;
  }
  .columns .item .supertitle {
      -webkit-text-fill-color: transparent;
      background: linear-gradient(90deg, #f9453f, #fa9b26 12.5%, #2ee76f 25%, #18e1f3 37.5%, #3f0085 50%, #18e1f3 62.5%, #2ee76f 75%, #fa9b26 87.5%, #f9453f);
      background: #f9453f;
      background: linear-gradient(90deg, #f9453f, #fa9b26 22.5%, #2ee76f 45%, #18e1f3 67.5%, #3f0085 90%);
      -webkit-background-clip: text;
      background-size: 400% 100%;
      color: #fbfafe;
      color: var(--primary-white);
      text-align: center;
      transform-origin: "50% 50%";
  }
  .supertitle.--small {
      font-size: 7.083vw;
      font-weight: 500;
      letter-spacing: 0;
      line-height: .82;
  }
  .supertitle {
      font-family: PP Radio Grotesk, Helvetica, Arial, sans-serif;
      font-family: var(--font-primary);
      position: relative;
  }
</style>

// transform: translate3d(0px, 41.041%, 0px) scale(0.8358, 0.8358); background-position-x: 13.6667%;
// reduce y from 50% to 0%; scale(0.8,0.8) to (); positionX 0% to :...
// translate: none; rotate: none; scale: none; transform: translate(0px, 50%) scale(0.8, 0.8); background-position-x: 0%; transform-origin: 516.229px 114.812px;
// scale to 1,1... y to 0%,... positionX to 18.2%.... transform-origin: 50% 20%
// got bg-position-100 at scale 30... then continued scaling to 59 with the eye
// eye:: starts from scale(.5,.5), opacity: 0.00001.. 
//Use this markup and style to build a component very similar to it but exactly as described here. The final animation is that the h1 text would scale and zoom in to a point, then halfway the .eye increases opacity to make it self visible as the h1 continues to zoom in.
// 1. The total height (scrollableLength for animation) is 1010vh (height of the main parent). 2. The initials are: (a) `h1: translate(0%,50%);background-position-x:0%;transform-origin:516px 114px;scale(0.8,0.8);` (b) .eye: scale(0.5,0.5);opacity:0.0001;. 3. On scroll of the parent, this is the animation behaviour (i) between 0-400vh, only h1 will animate, and it will move from its initial to scale(1,1);translate3d(0px, 0%, 0px);background-position-x:20% (transform-origin remains the same). (ii) from 400vh-6000vh scrolling, h1.transform-origin changes to '50% 20%' (does not animate only changes at 400vh scroll), and for the others: scale moves from (1,1) to (10,10) at 600vh, background-position-x from 18% to 50% (translate remains the same it was at 400vh, i.e. translate3d(0px, 0%, 0px)). (iii) From 600-800vh, h1.background-position-x moves from 50% to 100%, h1.scale from (10,10) to (30,30), then .eye starts moving in this scene from it's initial to scale(0.7,0.7);opacity:0.3. (iv) from 800vh-900vh, .eye moves from scale(0.7,0.7) to (0.9,0.9) and opacity(0.3) to opacity(0.7); while h1 moves only scale from (30,30) to (60,60) [since h1's background-position-x remains at the 100%, translate3d remains at 0px,0%,0px, transform-origin remains at '50% 20%']. (v) And lastly for the final 900vh - 1010vh scroll, .eye moves to opacity(1) and scale(1,1). and at the beginning of this scene, the h1 container (.container) fades away briefly (900-910vh), the second section after this (with height = 100vh) will now scroll over this section (eye is visible and .container is now opacity-0), and this scroll will be 100vh, i.e. from 910 to 1010vh. Note that you might have to make the first section fixed until the second section is now fully overlap with it, before being able to scroll both out of view. 4. `.canvas` is going to animate some images, 180 of them, and it will animate them from  when it enters the scene at 600vh, to when it matures at when .container fades (910vh) [i.e. frame1 is at 600vh and frame 180 is at 910hv]. Note that the images would blend and not be noticeable while changing. NB: The style and structure is just to show you the context of waht I want, styling should be mainly done with tailwind or when it's easier with custom css (like the gradient text). use the hook useGSAP() which is installed from @gsap/react. It must be very smooth in behaviour and should not jump when scrolling in reverse backwards.



```<section class="component component--text-composition-gradient">   <div class="sticky top-0">     <div class="eye" style="translate: none; rotate: none; scale: none; transform: scale(0.5, 0.5); opacity: 0.0001;">       <canvas id="canvas" width="1280" height="632"></canvas>       <div class="top"></div>       <div class="bottom"></div>     </div>     <div class="container">       <div class="columns">         <div class="item">           <h1 class="supertitle --small --na" data-desktop="" style="translate: none; rotate: none; scale: none; transform: translate(0px, 50%) scale(0.8, 0.8); background-position-x: 0%;">Your trusted partner for secure and interoperable mobile services</h1>         </div>       </div>     </div>   </div> </section>  <style>   .component--text-composition-gradient {       height: 1000vh;       padding: 15vw 0 20vw;   }   .sticky .eye {       height: 100%;       opacity: .8;       position: absolute;       width: 100vw;   }   .sticky .eye canvas {       bottom: 0;       height: 100%;       left: 0;       position: absolute;       right: 0;       top: 0;       width: 100%;       will-change: transform;   }   .sticky .eye .top {       background: #b2b2b2;       background: var(--dark);       background: linear-gradient(180deg, #0a0d3a, rgba(12, 8, 96, 0));       content: "";       height: 20vw;       left: 0;       position: absolute;       top: -.042vw;       width: 100%;       z-index: 1;   }   .sticky .eye .bottom {       background: #b2b2b2;       background: var(--dark);       background: linear-gradient(0deg, #0a0d3a, rgba(1, 5, 41, 0));       bottom: 0;       content: "";       height: 20vw;       left: 0;       position: absolute;       top: auto;       width: 100%;       z-index: 0;   }   .container {       margin: auto;       max-width: 100%;       padding: 0 .833vw;       position: relative;       width: 80vw;   }   .columns {       display: flex;       flex-direction: row;       justify-content: flex-start;       margin-left: calc(.417vw * -1);       margin-right: calc(.417vw * -1);       row-gap: .833vw;   }   .columns .item {       padding-left: .417vw;       padding-right: .417vw;       position: relative;   }   .columns .item .supertitle {       -webkit-text-fill-color: transparent;       background: linear-gradient(90deg, #f9453f, #fa9b26 12.5%, #2ee76f 25%, #18e1f3 37.5%, #3f0085 50%, #18e1f3 62.5%, #2ee76f 75%, #fa9b26 87.5%, #f9453f);       background: #f9453f;       background: linear-gradient(90deg, #f9453f, #fa9b26 22.5%, #2ee76f 45%, #18e1f3 67.5%, #3f0085 90%);       -webkit-background-clip: text;       background-size: 400% 100%;       color: #fbfafe;       color: var(--primary-white);       text-align: center;       transform-origin: "50% 50%";   }   .supertitle.--small {       font-size: 7.083vw;       font-weight: 500;       letter-spacing: 0;       line-height: .82;   }   .supertitle {       font-family: PP Radio Grotesk, Helvetica, Arial, sans-serif;       font-family: var(--font-primary);       position: relative;   } </style>```

With react, tailwind and gsap package, use  the markup and style as a guide to build a component very similar to it but exactly as described here. 
The final animation is that the h1 text would scale and zoom in to a point, then from some point the .eye increases opacity to make it self visible as the h1 continues to zoom in.  
1. The total height (scrollableLength for animation) is 1010vh (height of the main parent). 
2. The initials are: (a) h1: translate(0%,50%);background-position-x:0%;transform-origin:516px 114px;scale(0.8,0.8); (b) .eye: scale(0.5,0.5);opacity:0.0001;. 
3. On scroll of the section parent, this is the animation behavior: 
(i) between 0-400vh, only h1 will animate, and it will move from its initial to scale(1,1);translate3d(0px, 0%, 0px);background-position-x:20% (transform-origin remains the same). 
(ii) from 400vh-6000vh scrolling, h1.transform-origin changes to '50% 20%' (does not animate only changes at 400vh scroll), and for its other properties: scale moves from (1,1) to (10,10) at 600vh, background-position-x from 18% to 50%, while translate remains the same it was at 400vh, i.e. translate3d(0px, 0%, 0px). 
(iii) From 600-800vh, h1.background-position-x moves from 50% to 100%, h1.scale from (10,10) to (30,30) the rest of h1 remain unchanged, then .eye starts moving in this scene from it's initials to scale(0.7,0.7);opacity:0.3. 
(iv) from 800vh-900vh, .eye moves from scale(0.7,0.7) to (0.9,0.9) and opacity(0.3) to opacity(0.7); while h1 moves only its scale from (30,30) to (60,60) [since h1's background-position-x remains at the 100%, translate3d remains at 0px,0%,0px, transform-origin remains at '50% 20%']. 
(v) And lastly for the final 900vh - 1010vh scroll, only .eye moves to opacity(1) and scale(1,1), h1 is already complete. But at the beginning of this scene, the h1 container (.container) fades away briefly (900-910vh), so from then the next (second) section after this section (with height = 100vh) will now scroll over this section with it looking like a background (eye is visible and .container is now opacity-0), and this scroll will be from 910 to 1010vh. 
Note that you might have to make the first section fixed until the second section is now fully overlap with it, before being able to scroll both out of view. 
4. .canvas is going to animate some images, 180 of them, and it will animate them from  when it enters the scene at 600vh, to when it matures at when .container fades (910vh) [i.e. frame1 is at 600vh and frame 180 is at 910hv]. The images are at project/public/img/canvas/, from 00000.jpg to 00179.jpg. 

NB: The style and structure is just to show you the context of waht I want, styling should be mainly done with tailwind unless when it's easier with custom css (like the gradient text), I really don't want to use too many arbitrary values in the markup. use the hook useGSAP() which is installed from @gsap/react. It must be very smooth in behaviour and should not jump when scrolling in reverse backwards. Do not fail to notice that my description and timeline is in vh, so it should be used in its appropriate conversion (1010vh is equal to innerHeight * 10.1).


It is almost fine but not following the details properly. It worked almost fine until it was time to show the .eye, also the canvas image did not render properly, it only showed the first frame, and later the last frame. It is supposed to change the frames during the scroll between 600vh to 910vh.

This is a timeline of the whole animation:
1. 0vh to 400vh: (a) h1: animate from [translate(0%,50%);background-position-x:0%;transform-origin:516px 114px;scale(0.8,0.8)] to [translate3d(0px, 0%, 0px);background-position-x:18%;transform-origin:516px 114px;scale(1,1)].
2. at 400vh: (a) h1: change from [transform-origin:516px 114px] to [transform-origin:50% 20%]
3. 400vh to 600vh: (a) h1: animate from [scale(1,1);background-position-x:18%] to [scale(10,10);background-position-x:50%]
4. 600vh to 800vh: (a) h1: animate from [background-position-x:50%;scale(10,10)] to [background-position-x:100%;sclae(30,30)], (b) .eye: animate from [scale(0.5,0.5);opacity:0.0001] to [scale(0.7,0.7);opacity:0.3]
5. 800 to 900vh: (a) h1: animate from [scale(30,30)] to [scale(60,60)], (b) .eye: animate from [scale(0.7,0.7);opacity:0.3] to [scale(0.9,0.9);opacity:0.7]
6. 900 to 910vh: (a) .container (h1's container): fades away (opacity 1 to 0), (b) .eye: animate from [scale(0.9,0.9);opacity:0.7] to [scale(1,1);opacity:1]
7. 910vh to 1010vh: The whole section acts as a background to the next section, the scroll to 1010 is complete when the top of this second section overlaps with the top of the scrollingAnimation section, and at this point, the animation is over and both sections normally scroll away.
And the reverse should also be smooth when scrolling upwards.
scale(0.5,0.5);opacity:0.0001;.
Also note that the canvas is suppose to update its images between 600 to 910, which is 310vh length for the 180 images, but you can decide to maybe start at 600 and end at 960, which is 2vh per image.

Ensure that the code is clean/reusable/neat, and use the useGSAP() hook.