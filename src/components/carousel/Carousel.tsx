
import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { cn } from '@/lib/utils/cn';

gsap.registerPlugin(ScrollTrigger);

const carouselItems = [
  {
    id: 1,
    title: 'SIMs',
    description: 'Explore our comprehensive range of SIMs to find the perfect fit for your connectivity needs.',
    descendant: [
      {text: "SIM", link: "#"},
    ],
    image: '/img/featured-sim.jpg',
    bg: "bg-[#c189ff]",
    hover: "hover:text-[#c189ff]",
  },
  {
    id: 2,
    title: 'eSIMs',
    description: 'Our secure, scalable eSIMs deliver on-demand reliability for Consumer, IoT, and M2M applications.',
    descendant: [
      {text: "eSIMs", link: "#"},
      {text: "eSIM Interoperability", link: "#"},
    ],
    image: '/img/featured-esim.jpg',
    bg: "bg-[#18e1f3]",
    hover: "hover:text-[#18e1f3]",
  },
  {
    id: 3,
    title: 'eSIM Solutions',
    description: 'Manage eSIM subscriptions and streamline consumer onboarding to drive acquisition and retention.',
    descendant: [
      {text: "Remote SIM Provision", link: "#"},
      {text: "eSIM Onboarding Journeys", link: "#"},
    ],
    image: '/img/featurde-esim-solutions.jpg',
    bg: "bg-[#2ee76f]",
    hover: "hover:text-[#2ee76f]",
  },
  {
    id: 4,
    title: '5G',
    description: 'Our solutions enable seamless integration of private and public networks with advanced interoperable technology and secure OTA management for remote SIM updates.',
    descendant: [
      {text: "Private Networks", link: "#"},
      {text: "OTA Suite", link: "#"},
    ],
    image: '/img/featured-5g.jpg',
    bg: "bg-[#fa9b26]",
    hover: "hover:text-[#fa9b26]",
  },
  {
    id: 5,
    title: 'Integrated SE',
    description: 'Integrated security and seamless connectivity are at the core of our iSE and iSIM solutions, designed for advanced mobile and IoT applications.',
    descendant: [
      {text: "iSE", link: "#"},
      {text: "iSIM", link: "#"},
    ],
    image: '/img/featured-integrated-se.jpg',
    bg: "bg-[#ff6359]",
    hover: "hover:text-[#ff6359]",
  },
  {
    id: 6,
    title: 'IoT Connectivity',
    description: 'Seamlessly connect and secure your IoT ecosystem with scalable, interoperable solutions designed to drive innovation and enable future-proof connectivity.',
    descendant: [
      {text: "IoT Connectivity", link: "#"},
    ],
    image: '/img/featured-iot-connectivity.jpg',
    bg: "bg-[#5c9cff]",
    hover: "hover:text-[#5c9cff]",
  },
];

const Carousel: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    ScrollTrigger.getAll().forEach(st => st.kill());
    
    const items = itemsRef.current.filter(Boolean);
    const totalItems = items.length;
    const container = containerRef.current;
    const section = sectionRef.current;
    
    if (!container || !section || items.length === 0) return;
    if( !items[0] || !items[1] ) return;

    const isDesktop = window.innerWidth >= 768;
    const lastItem = items[totalItems - 1];
    // const secondLastItem = items[totalItems - 2];
   
    if (isDesktop) {
      gsap.set(items[0], { y: '10vw' });
      gsap.set(items[1], { y: '20vw' });
      
      const totalScrollDistance = 
        window.innerHeight * 1.1 + 
        (totalItems - 2) * window.innerWidth * 0.5;
        
      gsap.set(section, { height: totalScrollDistance });
      
      const initialTL = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'top+=5vh top',
          scrub: true,
        },
      });
      
      initialTL.to(items[0], {
        y: 0,
        ease: 'power2.out',
      }, 0);
      
      initialTL.to(items[0].querySelector('.text-container'), {
        height: '50vh',
        ease: 'power2.out',
      }, 0);
      
      initialTL.to(items[0].querySelector('.image-container'), {
        height: '50vh',
        ease: 'power2.out',
      }, 0);
      
      initialTL.to(items[0].querySelector('img'), {
        opacity: 1,
        scale: 1,
        ease: 'power2.out',
      }, 0);
      
      initialTL.to(items[1], {
        y: 0,
        ease: 'power2.out',
      }, 0);
      
      initialTL.to(items[1].querySelector('.text-container'), {
        height: '50vh',
        ease: 'power2.out',
      }, 0);
      
      initialTL.to(items[1].querySelector('.image-container'), {
        height: '50vh',
        ease: 'power2.out',
      }, 0);
      
      initialTL.to(items[1].querySelector('img'), {
        opacity: 1,
        scale: 1,
        ease: 'power2.out',
      }, 0);
      
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
      
      items.slice(2).forEach((item) => { 
        if (!item) return;
        gsap.set(item.querySelector('.text-container'), { height: '55vh' });
        gsap.set(item.querySelector('.image-container'), { height: '45vh' });
        gsap.set(item.querySelector('img'), { opacity: 0, scale: 1.1 });
        
        ScrollTrigger.create({
          trigger: item,
          containerAnimation: horizontalScroll, 
          start: "left right", 
          end: "right right", 
          onUpdate: self => {
            const progress = self.progress;
            gsap.set(item.querySelector('.text-container'), { 
              height: gsap.utils.interpolate(65, 50, progress) + 'vh' 
            });
            gsap.set(item.querySelector('.image-container'), { 
              height: gsap.utils.interpolate(35, 50, progress) + 'vh' 
            });
            gsap.set(item.querySelector('img'), { 
              opacity: progress,
              scale: gsap.utils.interpolate(1.1, 1, progress)
            });
          },
          invalidateOnRefresh: true
        });
      });
      
    } else {
      const totalScrollDistance = (window.innerWidth * (totalItems-1)) + (window.innerHeight);
      gsap.set(section, { height: totalScrollDistance });
      
      const maxScrollX = lastItem ? lastItem.offsetLeft : 0;
      
      gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${(totalItems-1) * window.innerWidth}`,
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
      
      items.forEach((item) => {
        if (!item) return;
        gsap.set(item.querySelector('img'), {
          opacity: 1,
          scale: 1,
        });
        gsap.set(item.querySelector('.text-container'), {
          height: '50vh',
        });
        gsap.set(item.querySelector('.image-container'), {
          height: '50vh',
        });
      });
    }
    
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
              className={`text-container ${cn("text-black p-6 md:p-10 pt-12 md:pt-14 flex flex-col", item.bg)}`}
              style={{ height: '65vh' }}
            >
              <div className="flex flex-col justify-center items-start w-full md:w-60">
                <h2 className="text-2xl md:text-3xl font-bold mb-3">{item.title}</h2>
                <p className="text-sm text-normal mb-4">{item.description}</p>
              </div>
              <div className="flex flex-wrap gap-2 mt-auto">
                {item.descendant?.map((descendant, i) => (
                  <a key={i} href={descendant.link} className={cn("px-4 py-1 text-xs transition-colors rounded-2xl border border-black bg-transparent text-black hover:border-transparent hover:bg-black flex items-center gap-2.5 whitespace-nowrap", item.hover)}>
                    {descendant.text}
                    <svg className="w-3" width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0.641418 13.3707L19.4396 13.3707L11.0196 21.7907L12.9777 23.7489L24.7266 12L12.9777 0.25115L11.0196 2.20929L19.4396 10.6293L0.641418 10.6293L0.641418 13.3707Z" fill="currentColor"></path>
                    </svg>
                  </a>
                ))}
              </div>
            </div>
            <div
              className="image-container overflow-hidden"
              style={{ height: '35vh' }}
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