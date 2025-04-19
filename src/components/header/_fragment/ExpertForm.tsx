'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils/cn';

const ExpertForm = ({ showDialogue, handleClose }: 
  { 
    showDialogue: () => void;  
    handleClose: () => void;
  }
) => {
  const [form, setForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    company: '',
    region: '',
    businessType: '',
    message: '',
    optin: false,
  });

  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState(false);

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = true;
    if (!form.firstName) newErrors.firstName = true;
    if (!form.lastName) newErrors.lastName = true;
    if (!form.company) newErrors.company = true;
    if (!form.region) newErrors.region = true;
    if (!form.businessType) newErrors.businessType = true;
    if (!form.message) newErrors.message = true;
    if (!form.optin) newErrors.optin = true;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    let updatedValue: string | boolean = value;
    if (type === 'checkbox' && e.target instanceof HTMLInputElement) {
      updatedValue = e.target.checked;
    }
  
    setForm({ ...form, [name]: updatedValue });
    setErrors({ ...errors, [name]: false });
    setFormError(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      setFormError(true);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormError(false);
      showDialogue();
      setForm({
        email: '',
        firstName: '',
        lastName: '',
        company: '',
        region: '',
        businessType: '',
        message: '',
        optin: false,
      });
      handleClose();
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-xs text-el-dark-black">
      <input
        type="email"
        name="email"
        placeholder="Work Email Address*"
        value={form.email}
        onChange={handleChange}
        className={cn("w-full p-3 md:p-4 border font-inter rounded-lg outline-none", errors.email ? "border-red-500" : "border-gray-300")}
      />

      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="firstName"
          placeholder="First Name*"
          value={form.firstName}
          onChange={handleChange}
          className={cn("w-full p-3 md:p-4 border font-inter rounded-lg outline-none", errors.firstName ? "border-red-500" : "border-gray-300")}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last name*"
          value={form.lastName}
          onChange={handleChange}
          className={cn("w-full p-3 md:p-4 border font-inter rounded-lg outline-none", errors.lastName ? "border-red-500" : "border-gray-300")}
        />
      </div>

      <input
        type="text"
        name="company"
        placeholder="Company*"
        value={form.company}
        onChange={handleChange}
        className={cn("w-full p-3 md:p-4 border font-inter rounded-lg outline-none", errors.company ? "border-red-500" : "border-gray-300")}
      />

      <div className="grid grid-cols-2 gap-4">
        <select
          name="region"
          value={form.region}
          onChange={handleChange}
          className={cn("w-full p-3 md:p-4 border font-inter rounded-lg outline-none", errors.region ? "border-red-500" : "border-gray-300")}
        >
          <option value="">Region*</option>
          <option value="China">China</option>
          <option value="North America">North America</option>
          <option value="Asia">Asia</option>
          <option value="Africa">Africa</option>
          <option value="Middle East">Middle East</option>
          <option value="LATAM">LATAM</option>
          <option value="Brazil">Brazil</option>
          <option value="Europe">Europe</option>
        </select>

        <select
          name="businessType"
          value={form.businessType}
          onChange={handleChange}
          className={cn("w-full p-3 md:p-4 border font-inter rounded-lg outline-none", errors.businessType ? "border-red-500" : "border-gray-300")}
        >
          <option value="">Business type*</option>
          <option value="Industry Analyst">Industry Analyst</option>
          <option value="OEM">OEM</option>
          <option value="IoT Customer">IoT Customer</option>
          <option value="Others">Others</option>
          <option value="MNO">MNO</option>
          <option value="MVNO">MVNO</option>
          <option value="MVNE">MVNE</option>
          <option value="ODM">ODM</option>
          <option value="Enterprise Customer">Enterprise Customer</option>
        </select>
      </div>

      <textarea
        name="message"
        placeholder="Message"
        rows={3}
        value={form.message}
        onChange={handleChange}
        className={cn("w-full p-3 md:p-4 border font-inter rounded-lg outline-none", errors.message ? "border-red-500" : "border-gray-300")}
      ></textarea>

      <div className="flex items-center ms-4">
        <input
          type="checkbox"
          name="optin"
          id="optin"
          checked={form.optin}
          onChange={handleChange}
          className="mr-2"
        />
        <label htmlFor="optin" className={cn("text-xs", errors.optin?'text-red-500':'text-el-dark-black')}>
          I agree to receive communications from Valid.*
        </label>
      </div>

      <div className="flex mt-6 gap-2 md:gap-3 flex-row-reverse justify-start md:justify-end md:flex-row">
        {formError && (
          <div className="grow rounded bg-red-200/30 text-red-400 p-1.5 text-xs flex items-center">
            Error: Please check the required fields and submit again.
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="min-w-[30%] px-8 py-3 bg-el-primary-dark text-white rounded-3xl flex items-center justify-center disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <span className="relative w-4 h-4">
              <div className="absolute inset-0 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
            </span>
          ) : (
            'Send'
          )}
        </button>
      </div>
    </form>
  );
};

export default ExpertForm;
