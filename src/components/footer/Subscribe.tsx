'use client';

import { cn } from '@/lib/utils/cn';
import React, { useState } from 'react';
import CommonButton from '../common/common-button';

const Subscribe = ({showDialogue}: {showDialogue: () => void}) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async () => {
    if (!email || !validateEmail(email)) {
      setError(true);
      return;
    }

    setIsLoading(true);
    setError(false);

    setTimeout(() => {
      showDialogue();
      clearForm();
    }, 2000);
  };

  const clearForm = () => {
    setEmail('');
    setIsLoading(false);
    setError(false);
  }

  return (
    <div
      className={cn("mt-5 rounded-4xl border flex p-1 transition-all", error ? 'border-red-500' : 'border-gray-600')}
    >
      <input
        type="email"
        placeholder="Email"
        className="w-full px-3 py-3.5 border-none focus:outline-none grow text-base md:text-lg text-el-dark-black"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setError(false);
        }}
        disabled={isLoading}
      />
      <CommonButton 
        type="submit"
        disabled={isLoading}
        onClick={handleSubmit}
        className="rounded-4xl font-medium font-grotesk text-white text-lg md:text-xl px-7 transition-all flex items-center justify-center bg-el-primary-dark hover:bg-[#182799] cursor-pointer disabled:cursor-not-allowed disabled:bg-[#182799] disabled:hover:bg-[#182799]"
      >
        {isLoading ? (
          <span className="relative w-4 h-4">
            <div className="absolute inset-0 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
          </span>
        ) : (
          'Register'
        )}
      </CommonButton>
    </div>
  );
};

export default Subscribe;
