
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import ExpertForm from './_fragment/ExpertForm';
import Disclaimer from './_fragment/Disclaimer';
import Locations from './_fragment/Locations';
import CloseButton from './_fragment/CloseButton';

type ContactExpertProps = {
  isOpen: boolean;
  onClose: () => void;
  showDialogue: () => void;
};

const ContactExpert: React.FC<ContactExpertProps> = ({ isOpen, onClose, showDialogue }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const formColumnRef = useRef<HTMLDivElement>(null);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  
  useGSAP(() => {
    if (modalRef.current && contentRef.current && formColumnRef.current) {
      if (isOpen && !isAnimatingOut) {
        gsap.set(contentRef.current, { x: '100%' });
        gsap.set(formColumnRef.current, { x: '50%', opacity: 0 });
        
        const tl = gsap.timeline();
        
        tl.to('.modal-mask', { 
          opacity: 0.8, 
          duration: 0.4,
          ease: 'power2.out' 
        });
        
        tl.to(contentRef.current, {
          x: '0%',
          duration: 0.6,
          ease: 'power2.out'
        }, 0);
        
        tl.to(formColumnRef.current, {
          x: '0%',
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out'
        }, 0.2);
      }
      
      if (!isOpen && isAnimatingOut) {
        const tl = gsap.timeline({
          onComplete: () => setIsAnimatingOut(false)
        });
        
        tl.to(formColumnRef.current, {
          x: '50%',
          opacity: 0,
          duration: 0.5,
          ease: 'power2.in'
        });
        
        tl.to(contentRef.current, {
          x: '100%',
          duration: 0.6,
          ease: 'power2.in'
        }, 0.1);
        
        tl.to('.modal-mask', { 
          opacity: 0, 
          duration: 0.4,
          ease: 'power2.in' 
        }, 0.2);
      }
    }
  }, [isOpen, isAnimatingOut]);
  
  const handleClose = () => {
    setIsAnimatingOut(true);
    onClose();
  };
  
  useEffect(() => {
    if (isAnimatingOut && !isOpen) {
    } else if (isAnimatingOut && isOpen) {
      setIsAnimatingOut(false);
    }
  }, [isAnimatingOut, isOpen]);
  if (!isOpen && !isAnimatingOut) return null;

  return (
    <div id="modal-contact" ref={modalRef} className="fixed inset-0 z-105 overflow-hidden">
      <div className="modal-mask absolute inset-0 bg-black opacity-0" onClick={handleClose}></div>
      <div 
        ref={contentRef} 
        className="absolute top-0 right-0 h-full transform translate-x-full md:w-4/5 w-[95vw]"
      >
        <div className="flex flex-col md:flex-row-reverse h-full overflow-auto md:overflow-hidden">  
          <div 
            ref={formColumnRef} 
            className="relative md:w-[43.75vw] w-full no-scrollbar bg-white md:overflow-y-auto"
          >
            <div className="px-5 py-8 md:p-[5vw_3.75vw]">
              <div className="py-10 md:hidden">
                <CloseButton handleClose={handleClose} invert={true} className="w-10 h-10 mx-auto flex border border-black items-center justify-center rounded-full focus:outline-none"/>
              </div>
              <h3 className="text-xl md:text-2xl font-normal md:font-semibold mb-8 font-grotesk text-el-dark-black text-center md:text-left">Talk to our experts</h3>
              <ExpertForm showDialogue={showDialogue} handleClose={handleClose} />
              <Disclaimer />
            </div>
          </div>
          <Locations />
        </div>
        <CloseButton handleClose={handleClose} invert={false} className="absolute hidden md:flex border border-el-white top-14 -left-10 w-8 h-8 items-center justify-center bg-black bg-opacity-20 rounded-full focus:outline-none"/>
      </div>
    </div>
  );
};

export default ContactExpert;