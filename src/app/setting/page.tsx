import { ArrowLeft } from "lucide-react";
import Link from "next/link";
// import { ArrowLeft } from "./components/icons";

export default function Home() {
  return (
    <main className='container mx-auto p-4'>
      <div className='flex items-center gap-2 mb-4'>
        <ArrowLeft className='w-6 h-6 text-[#333333]' />
        <h1 className='text-2xl md:text-[32px] font-semibold text-[#333333]'>
          Settings
        </h1>
      </div>

      <div className='border rounded-lg overflow-hidden'>
        <div className='p-4 border-b'>
          <h2 className='text-2xl font-semibold text-[#333333]'>Settings</h2>
        </div>

        <div className='flex flex-col p-8 gap-6'>
          <Link
            href='/setting/personal-information'
            className='flex items-center justify-between p-4 hover:bg-gray-50 border border-[#D6D6D6] rounded-lg'
          >
            <span className='text-[#333333] text-lg'>Personal Information</span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5 text-gray-400'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                clipRule='evenodd'
              />
            </svg>
          </Link>

          <Link
            href='/setting/change-password'
            className='flex items-center justify-between p-4 hover:bg-gray-50 border border-[#D6D6D6] rounded-lg'
          >
            <span className='text-[#333333] text-lg'>Change Password</span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5 text-gray-400'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                clipRule='evenodd'
              />
            </svg>
          </Link>

          <Link
            href='/setting/terms-condition'
            className='flex items-center justify-between p-4 hover:bg-gray-50 border border-[#D6D6D6] rounded-lg'
          >
            <span className='text-[#333333] text-lg'>Terms & Condition</span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5 text-gray-400'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                clipRule='evenodd'
              />
            </svg>
          </Link>

          <Link
            href='/setting/privacy-policy'
            className='flex items-center justify-between p-4 hover:bg-gray-50 border border-[#D6D6D6] rounded-lg'
          >
            <span className='text-[#333333] text-lg'>Privacy Policy</span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5 text-gray-400'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                clipRule='evenodd'
              />
            </svg>
          </Link>

          <Link
            href='/setting/about-us'
            className='flex items-center justify-between p-4 hover:bg-gray-50 border border-[#D6D6D6] rounded-lg'
          >
            <span className='text-[#333333] text-lg'>About Us</span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5 text-gray-400'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                clipRule='evenodd'
              />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}
