"use client";

import type React from "react";

import Link from "next/link";
import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter your email address");
      return;
    }

    setIsSubmitting(true);
    setError("");

    // Simulate API call
    try {
      // In a real app, you would make an API call here
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccess(true);
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error("Error sending reset email:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className='max-w-lg mx-auto p-4'>
      <div className='flex items-center gap-2 mb-4'>
        <Link href='/change-password' className='text-gray-700'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M10 19l-7-7m0 0l7-7m-7 7h18'
            />
          </svg>
        </Link>
        <h1 className='text-2xl font-medium text-gray-800'>Forgot Password</h1>
      </div>

      {!success ? (
        <>
          <p className='text-gray-600 mb-6'>
            Enter your email address and we&apos;ll send you a link to reset
            your password.
          </p>

          {error && (
            <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4'>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className='mb-4'>
              <label htmlFor='email' className='block text-gray-700 mb-1'>
                Email address
              </label>
              <input
                type='email'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400'
                placeholder='Enter your email'
              />
            </div>

            <button
              type='submit'
              className='w-full bg-black text-white py-3 rounded-full font-medium hover:bg-gray-900 transition-colors'
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send reset link"}
            </button>
          </form>
        </>
      ) : (
        <div className='bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4'>
          <p className='font-bold'>Reset link sent!</p>
          <p>Check your email for instructions to reset your password.</p>
          <div className='mt-4'>
            <Link href='/change-password' className='text-green-700 underline'>
              Return to Change Password
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}
