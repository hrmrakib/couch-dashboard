"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRegisterMutation } from "@/redux/features/auth/Authentication";
import { toast } from "sonner";

export default function SignUp() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [register] = useRegisterMutation();

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
    setLoading(true);

    const newErrors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (!formData.name) {
      newErrors.name = "Name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    if (
      !newErrors.name &&
      !newErrors.email &&
      !newErrors.password &&
      !newErrors.confirmPassword
    ) {
      // In a real app, you would handle registration here
      const data = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };

      console.log("Registration with:", data);

      const res = await register(data).unwrap();

      if (res?.error) {
        toast.error(res.message);
        setLoading(false);
        return;
      }
      if (res?.success) {
        toast.success(res.message);
        localStorage.setItem("email", JSON.stringify(formData.email));
        setLoading(false);
      }

      console.log({ res });

      // Simulate successful registration
      router.push("/verify");
    }
  };

  console.log(formData);

  return (
    <div className='min-h-screen bg-[url("/auth/bg.png")] bg-cover bg-center flex items-center justify-center p-4'>
      <div className='absolute inset-0 bg-gray-900 opacity-20'></div>

      <div className='container mx-auto w-full flex z-50'>
        <div className='w-full md:w-1/2 h-[626px] flex flex-col items-center justify-center bg-[#FFFFFF] rounded-lg p-2 max-w-[660px] shadow-lg'>
          <div className='w-[80%] mx-auto'>
            <h2 className='text-2xl font-medium text-center text-[#333333] mb-6 block'>
              Create Account
            </h2>

            <form onSubmit={handleSubmit} className='space-y-6'>
              <div className='relative h-[60px]'>
                <div className='absolute inset-y-0 left-3 flex items-center pointer-events-none'>
                  <svg
                    className='w-5 h-5 text-gray-500'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'
                      clipRule='evenodd'
                    />
                  </svg>
                </div>
                <input
                  type='text'
                  name='name'
                  placeholder='Enter Your Name'
                  className={`w-full h-[60px] placeholder:text-[#5F5F5F] placeholder:font-normal text-lg font-medium pl-10 pr-3 py-2 border ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } rounded-full focus:outline-none focus:ring-1 focus:ring-gray-400`}
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && (
                  <p className='text-red-500 text-xs mt-1 ml-3'>
                    {errors.name}
                  </p>
                )}
              </div>

              <div className='relative h-[60px]'>
                <div className='absolute inset-y-0 left-3 flex items-center pointer-events-none'>
                  <svg
                    className='w-5 h-5 text-gray-500'
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

              <div className='relative h-[60px]'>
                <div className='absolute inset-y-0 left-3 flex items-center pointer-events-none'>
                  <svg
                    className='w-5 h-5 text-gray-500'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path
                      fillRule='evenodd'
                      d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z'
                      clipRule='evenodd'
                    />
                  </svg>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name='password'
                  placeholder='Enter Password'
                  className={`w-full h-[60px] placeholder:text-[#5F5F5F] placeholder:font-normal text-lg font-medium pl-10 pr-3 py-2 border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } rounded-full focus:outline-none focus:ring-1 focus:ring-gray-400`}
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type='button'
                  className='absolute inset-y-0 right-3 flex items-center cursor-pointer'
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg
                      className='w-5 h-5 text-gray-500'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path
                        fillRule='evenodd'
                        d='M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z'
                        clipRule='evenodd'
                      />
                      <path d='M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z' />
                    </svg>
                  ) : (
                    <svg
                      className='w-5 h-5 text-gray-500'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path d='M10 12a2 2 0 100-4 2 2 0 000 4z' />
                      <path
                        fillRule='evenodd'
                        d='M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z'
                        clipRule='evenodd'
                      />
                    </svg>
                  )}
                </button>
                {errors.password && (
                  <p className='text-red-500 text-xs mt-1 ml-3'>
                    {errors.password}
                  </p>
                )}
              </div>

              <div className='relative h-[60px]'>
                <div className='absolute inset-y-0 left-3 flex items-center pointer-events-none'>
                  <svg
                    className='w-5 h-5 text-gray-500'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path
                      fillRule='evenodd'
                      d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z'
                      clipRule='evenodd'
                    />
                  </svg>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name='confirmPassword'
                  placeholder='Confirm Password'
                  className={`w-full h-[60px] placeholder:text-[#5F5F5F] placeholder:font-normal text-lg font-medium pl-10 pr-3 py-2 border ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-full focus:outline-none focus:ring-1 focus:ring-gray-400`}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                {errors.confirmPassword && (
                  <p className='text-red-500 text-xs mt-1 ml-3'>
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <button
                type='submit'
                aria-busy={loading}
                disabled={loading}
                className={`w-full h-[50px] flex items-center justify-center py-2 px-4 rounded-full shadow-sm text-sm font-medium text-white bg-[#333333] transition-colors duration-200 ${
                  loading
                    ? "cursor-not-allowed opacity-70"
                    : "hover:bg-[#1a1a1a] cursor-pointer"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black`}
              >
                {loading ? "Creating your account..." : "Create Account"}
              </button>
            </form>

            <div className='mt-4 text-center text-sm'>
              <span className='text-[#545454] text-base'>
                Already have an account?
              </span>{" "}
              <Link
                href='/'
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
