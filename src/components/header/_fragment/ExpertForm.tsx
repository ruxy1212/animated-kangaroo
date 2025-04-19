'use client';

import React, { useState } from 'react';
import Input from '@/components/form/Input';
import Select from '@/components/form/Select';
import CommonButton from '@/components/common/common-button';

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
      <Input 
        type="email"
        name="email"
        placeholder="Work Email Address*"
        value={form.email}
        onChange={handleChange}
        error={errors.email}
      />

      <div className="grid grid-cols-2 gap-4">
        <Input 
          type="text"
          name="firstName"
          placeholder="First Name*"
          value={form.firstName}
          onChange={handleChange}
          error={errors.firstName}
        />

        <Input 
          type="text"
          name="lastName"
          placeholder="Last name*"
          value={form.lastName}
          onChange={handleChange}
          error={errors.lastName}
        />
      </div>

      <Input 
        type="text"
        name="company"
        placeholder="Company*"
        value={form.company}
        onChange={handleChange}
        error={errors.company}
      />

      <div className="grid grid-cols-2 gap-4">
        <Select 
          name="region"
          value={form.region}
          onChange={handleChange}
          error={errors.region}
          defaultVal="Region"
          options={["China", "North America", "Asia", "Africa", "Middle East", "LATAM", "Brazil", "Europe"]}
        />

        <Select 
          name="businessType"
          value={form.businessType}
          onChange={handleChange}
          error={errors.businessType}
          defaultVal="Business type"
          options={["Industry Analyst", "OEM", "IoT Customer", "Others", "MNO", "MVNO", "MVNE", "ODM", "Enterprise Customer"]}
        />
      </div>

      <Input 
        type="textarea"
        name="message"
        placeholder="Message"
        value={form.message}
        onChange={handleChange}
        error={errors.message}
        variant="textarea"
      />
      <Input 
        type="checkbox"
        name="optin"
        id="optin"
        placeholder=""
        value={"form.optin"}
        checked={form.optin}
        onChange={handleChange}
        error={errors.optin}
      />

      <div className="flex mt-6 gap-2 md:gap-3 flex-row-reverse justify-start md:justify-end md:flex-row">
        {formError && (
          <div className="grow rounded bg-red-200/30 text-red-400 p-1.5 text-xs flex items-center">
            Error: Please check the required fields and submit again.
          </div>
        )}

        <CommonButton 
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="relative w-4 h-4">
              <div className="absolute inset-0 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
            </span>
          ) : (
            'Send'
          )}
        </CommonButton>
      </div>
    </form>
  );
};

export default ExpertForm;
