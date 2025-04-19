
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import ExpertForm from './_fragment/ExpertForm';
import Disclaimer from './_fragment/Disclaimer';
import Locations from './_fragment/Locations';

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
                <button 
                  onClick={handleClose}
                  className="w-10 h-10 mx-auto flex border border-black items-center justify-center rounded-full focus:outline-none"
                >
                  <svg width="16" height="15" className="invert" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M2.20828 0.355202C1.85326 0.000179744 1.27765 0.000179723 0.92263 0.355202C0.567608 0.710224 0.567608 1.28583 0.92263 1.64085L6.70805 7.42627L0.92263 13.2117C0.567608 13.5667 0.567608 14.1423 0.92263 14.4973C1.27765 14.8524 1.85326 14.8524 2.20828 14.4973L7.9937 8.71192L13.7791 14.4973C14.1341 14.8524 14.7097 14.8524 15.0648 14.4973C15.4198 14.1423 15.4198 13.5667 15.0648 13.2117L9.27935 7.42627L15.0648 1.64085C15.4198 1.28583 15.4198 0.710225 15.0648 0.355203C14.7097 0.000181071 14.1341 0.000180397 13.7791 0.355203L7.9937 6.14062L2.20828 0.355202Z" fill="#FBFAFE"></path>
                  </svg>
                </button>
              </div>
              <h3 className="text-xl md:text-2xl font-normal md:font-semibold mb-8 font-grotesk text-el-dark-black text-center md:text-left">Talk to our experts</h3>
              <ExpertForm showDialogue={showDialogue} handleClose={handleClose} />
              <Disclaimer />
            </div>
          </div>

          <Locations />
        </div>
        
        <button 
          onClick={handleClose}
          className="absolute hidden md:flex border border-el-white top-14 -left-10 w-8 h-8 items-center justify-center bg-black bg-opacity-20 rounded-full focus:outline-none"
        >
          <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M2.20828 0.355202C1.85326 0.000179744 1.27765 0.000179723 0.92263 0.355202C0.567608 0.710224 0.567608 1.28583 0.92263 1.64085L6.70805 7.42627L0.92263 13.2117C0.567608 13.5667 0.567608 14.1423 0.92263 14.4973C1.27765 14.8524 1.85326 14.8524 2.20828 14.4973L7.9937 8.71192L13.7791 14.4973C14.1341 14.8524 14.7097 14.8524 15.0648 14.4973C15.4198 14.1423 15.4198 13.5667 15.0648 13.2117L9.27935 7.42627L15.0648 1.64085C15.4198 1.28583 15.4198 0.710225 15.0648 0.355203C14.7097 0.000181071 14.1341 0.000180397 13.7791 0.355203L7.9937 6.14062L2.20828 0.355202Z" fill="#FBFAFE"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ContactExpert;