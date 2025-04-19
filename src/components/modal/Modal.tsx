import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils/cn';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  buttonText?: string;
  duration?: number;
}

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  message, 
  buttonText = 'Close',
  duration = 1500
}: ModalProps) => {
  const [loading, setLoading] = useState(true);
  const [isClosing, setIsClosing] = useState(false);
  
  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, duration]);

  const handleClose = () => {
    setIsClosing(true);
    setLoading(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
  };

  // if (!isOpen && !isClosing) return null;

  return (
    <AnimatePresence onExitComplete={() => isClosing && onClose()}>
      {(isOpen && !isClosing) && (
        <motion.div 
          className={cn("fixed inset-0 flex items-center justify-center z-50 transition-colors", loading ? 'bg-el-black/90':'bg-el-black/60 backdrop-blur-xs')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loader"
                className="flex justify-center items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
              </motion.div>
            ) : (
              <motion.div
                key="content"
                className="bg-el-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4 border-2 border-el-primary-dark"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4">
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <svg width="64" height="64" viewBox="0 0 64 64">
                        <circle 
                          cx="32" 
                          cy="32" 
                          r="28" 
                          fill="#f0fdf4"
                          stroke="#22c55e"
                          strokeWidth="2"
                        />
                        <motion.path
                          d="M20 34l8 8 16-16"
                          fill="none"
                          stroke="#22c55e"
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ 
                            duration: 0.6, 
                            delay: 0.2, 
                            ease: "easeInOut" 
                          }}
                        />
                      </svg>
                    </motion.div>
                  </div>
                  
                  <motion.h2 
                    className="text-2xl font-bold mb-2 text-gray-800"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.3 }}
                  >
                    {title}
                  </motion.h2>
                  
                  <motion.p 
                    className="text-gray-600 mb-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.3 }}
                  >
                    {message}
                  </motion.p>
                  
                  <motion.button
                    onClick={onClose}
                    className="gradient-border relative text-base md:text-lg px-0.5 py-1.5 shadow-[0px_0px_3px_1px_black]"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.3 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="py-2 px-6 md:px-8 bg-el-primary text-el-white">{buttonText}</span>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;