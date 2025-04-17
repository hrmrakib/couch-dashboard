"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSendOtpMutation } from "@/redux/features/auth/Authentication";
import { toast } from "sonner";

export default function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
  });
  const [errors, setErrors] = useState({
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const [forgetPassword] = useSendOtpMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const newErrors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    setErrors(newErrors);

    if (
      !newErrors.name &&
      !newErrors.email &&
      !newErrors.password &&
      !newErrors.confirmPassword
    ) {
      // In a real app, you would handle registration here
      console.log("Registration with:", formData);

      const response = await forgetPassword(formData).unwrap();
      console.log(response);

      if (response?.success) {
        setIsLoading(false);
        localStorage.setItem("email", formData.email);
        setFormData({ email: "" });
        toast.success(response?.message, {
          duration: 3000,
        });
        router.push("/verify");
      }
    }
  };

  return (
    <div className='min-h-screen bg-[url("/auth/bg.png")] bg-cover bg-center flex items-center justify-center p-4'>
      <div className='absolute inset-0 bg-gray-900 opacity-20'></div>

      <div className='container mx-auto w-full flex z-50'>
        <div className='w-full md:w-1/2 h-[626px] flex flex-col items-center justify-center bg-[#FFFFFF] rounded-lg p-2 max-w-[660px] shadow-lg'>
          <div className='w-[80%] mx-auto'>
            <h2 className='text-2xl font-medium text-center text-[#333333] mb-3 block'>
              Forget Password
            </h2>
            <p className='max-w-[350px] mx-auto text-center text-lg text-[#333333] mb-6'>
              Please enter your email address to reset your password.
            </p>

            <form onSubmit={handleSubmit} className='space-y-4'>
              <div className='relative h-[60px]'>
                <div className='absolute inset-y-0 left-3 flex items-center pointer-events-none'>
                  <svg
                    className='w-5 h-5 text-gray-400'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path d='M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z' />
                    <path d='M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z' />
                  </svg>
                </div>
                <input
                  type='text'
                  name='email'
                  placeholder='Enter Your Email'
                  className={`w-full h-[60px] placeholder:text-[#5F5F5F] placeholder:font-normal text-lg font-medium pl-10 pr-3 py-2 border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } rounded-full focus:outline-none focus:ring-1 focus:ring-gray-400`}
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <p className='text-red-500 text-xs mt-1 ml-3'>
                    {errors.email}
                  </p>
                )}
              </div>

              <button
                aria-busy={isLoading}
                disabled={isLoading}
                type='submit'
                className={`w-full h-[50px] flex items-center justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-[#333333] hover:bg-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black cursor-pointer ${
                  isLoading
                    ? "cursor-not-allowed opacity-70 disabled:cursor-not-allowed"
                    : "hover:bg-[#1a1a1a] cursor-pointer"
                }`}
              >
                {isLoading ? "Sending OTP..." : "Send OTP"}
              </button>
            </form>

            <div className='mt-4 text-center text-sm'>
              <span className='text-[#545454] text-base'>
                Have remembered your password?
              </span>{" "}
              <Link
                href='/signin'
                className='text-[#333333] font-medium hover:underline'
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>

        <div className='hidden md:block w-1/2'></div>
      </div>
    </div>
  );
}
