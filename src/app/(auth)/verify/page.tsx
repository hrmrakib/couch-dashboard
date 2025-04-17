"use client";

import React, { useEffect, useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useVerifyOtpMutation } from "@/redux/features/auth/Authentication";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Verify() {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [verify] = useVerifyOtpMutation();

  useEffect(() => {
    const getEmail = localStorage.getItem("email") ?? "";

    if (getEmail) {
      setEmail(getEmail);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (otp.length === 6) {
      const res = await verify({ otp, email }).unwrap();

      if (res.error) {
        alert("Invalid OTP. Please try again.");
        return;
      }

      if (res.success) {
        setOtp("");
        if (res?.data?.token) {
          toast.success("OTP verified successfully!");
          localStorage.setItem("accessToken", res?.data?.token);
          localStorage.setItem("user", res?.data?.user);

          router.push("/");
        }
      }
    } else {
      toast.error("Please enter a 6-digit OTP");
    }
  };

  return (
    <div className='min-h-screen bg-[url("/auth/bg.png")] bg-cover bg-center flex items-center justify-center p-4'>
      <div className='absolute inset-0 bg-gray-900 opacity-20'></div>

      <div className='container mx-auto w-full flex z-50'>
        <div className='w-full md:w-1/2 h-[426px] flex flex-col items-center justify-center bg-[#FFFFFF] rounded-lg p-2 max-w-[660px] shadow-lg'>
          <div className='w-[80%] mx-auto'>
            <div className='flex items-center justify-center gap-2 mb-6'>
              <div>
                <svg
                  width='24'
                  height='25'
                  viewBox='0 0 24 25'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M10 19.5L3 12.5M3 12.5L10 5.5M3 12.5L21 12.5'
                    stroke='#333333'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </div>
              <h2 className='text-2xl font-medium text-center text-[#333333] block'>
                Verify Email
              </h2>
            </div>

            <form onSubmit={handleSubmit} className='space-y-4'>
              <div>
                <InputOTP
                  maxLength={6}
                  className='w-full mx-auto px-10 border'
                  value={otp}
                  onChange={setOtp} // Control the OTP state
                >
                  <InputOTPGroup className='flex flex-wrap items-center justify-center gap-2.5 *:border-[#545454] rounded-full'>
                    {[...Array(6)].map((_, index) => (
                      <InputOTPSlot
                        key={index}
                        index={index}
                        className='w-[70px] h-[70px] border border-[#545454] rounded-full text-2xl font-medium'
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <button
                disabled={isLoading}
                aria-busy={isLoading}
                type='submit'
                className={`w-full h-[50px] flex items-center justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-[#333333] hover:bg-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black cursor-pointer ${
                  isLoading
                    ? "cursor-not-allowed opacity-70 disabled:cursor-not-allowed"
                    : "hover:bg-[#1a1a1a] cursor-pointer"
                }`}
              >
                {isLoading ? "Verifying..." : "Verify OTP"}
              </button>
            </form>

            <div className='mt-4 text-center text-sm'>
              <span className='text-[#545454] text-base'>
                Please enter the OTP we have sent you in your email.
              </span>{" "}
            </div>
          </div>
        </div>

        <div className='hidden md:block  w-1/2'></div>
      </div>
    </div>
  );
}
