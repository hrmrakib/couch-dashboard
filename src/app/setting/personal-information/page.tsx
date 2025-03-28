"use client";

import type React from "react";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef } from "react";
import { Camera, X } from "lucide-react";
import { countries } from "@/constants";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function PersonalInformation() {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "Sharon",
    email: "alkhahiaksalkgkgalk@hmail.com",
    phone: "3000597212",
  });
  const [selectedCountry, setSelectedCountry] = useState("US");
  const [profileImage, setProfileImage] = useState("/admin/admin.jpg");
  const [tempImage, setTempImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEdit = () => {
    if (isEditing) {
      // Save changes
      if (tempImage) {
        setProfileImage(tempImage);
      }
      // Here you would typically send the data to your backend
    } else {
      // Enter edit mode
      setTempImage(null);
    }
    setIsEditing(!isEditing);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCountryChange = (value: string) => {
    setSelectedCountry(value);
  };

  const handleImageClick = () => {
    if (isEditing && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancelImageChange = () => {
    setTempImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Find the selected country object
  const country =
    countries.find((c) => c.value === selectedCountry) || countries[0];

  return (
    <main className='container mx-auto p-4'>
      <div className='flex items-center gap-2 mb-4'>
        <Link href='/' className='text-gray-700'>
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
        <h1 className='text-2xl font-medium text-gray-800'>
          Personal Information
        </h1>
      </div>

      <div className='border rounded-lg overflow-hidden bg-white'>
        <div className='p-4 border-b border-[#D6D6D6] mr-10'>
          <h2 className='text-lg font-medium text-gray-800'>
            Personal Information
          </h2>
        </div>

        <div className='px-10 pt-12 pb-14'>
          <div className='flex justify-end mb-6'>
            <button
              onClick={handleEdit}
              className='flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-full text-sm'
            >
              {isEditing ? null : (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-4 w-4'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
                  />
                </svg>
              )}
              <span>{isEditing ? "Save Profile" : "Edit Profile"}</span>
            </button>
          </div>

          <div className='flex flex-col md:flex-row gap-8'>
            <div className='flex flex-col items-center border border-[#D6D6D6] rounded-lg p-4'>
              <div
                className={`w-40 h-40 relative mb-2 ${
                  isEditing ? "cursor-pointer group" : ""
                }`}
                onClick={handleImageClick}
              >
                <div className='w-full h-full rounded-full overflow-hidden border-2 border-gray-200'>
                  <Image
                    src={tempImage || profileImage}
                    alt='Profile'
                    width={160}
                    height={160}
                    className='object-cover w-full h-full'
                  />
                </div>

                {isEditing && (
                  <div className='absolute inset-0 bg-black opacity-10 group-hover:bg-opacity-50 rounded-full flex items-center justify-center transition-all duration-200'>
                    <div className='text-white opacity-0 group-hover:opacity-100 flex flex-col items-center'>
                      <Camera className='w-8 h-8' />
                      <span className='text-xs mt-1'>Change Photo</span>
                    </div>
                  </div>
                )}

                {tempImage && isEditing && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCancelImageChange();
                    }}
                    className='absolute top-0 right-0 bg-red-500 text-white rounded-full p-1'
                  >
                    <X className='w-4 h-4' />
                  </button>
                )}

                <input
                  type='file'
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept='image/*'
                  className='hidden'
                />
              </div>
              <p className='text-sm text-gray-500'>Profile</p>
              <p className='text-lg font-medium'>Admin</p>
            </div>

            <div className='flex-1 space-y-4'>
              <div>
                <label className='block text-[#333333] text-lg mb-1'>
                  Name
                </label>
                <input
                  type='text'
                  name='name'
                  value={userData.name}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className={`w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 ${
                    !isEditing ? "bg-gray-50" : ""
                  }`}
                />
              </div>

              <div>
                <label className='block text-[#333333] text-lg mb-1'>
                  E-mail
                </label>
                <input
                  type='email'
                  name='email'
                  value={userData.email}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className={`w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 ${
                    !isEditing ? "bg-gray-50" : ""
                  }`}
                />
              </div>

              <div>
                <label className='block text-[#333333] text-lg mb-1'>
                  Phone Number
                </label>
                <div className='flex'>
                  {isEditing ? (
                    <Select
                      value={selectedCountry}
                      onValueChange={handleCountryChange}
                    >
                      <SelectTrigger className='w-[120px] rounded-r-none border-r-0 bg-gray-50 focus:ring-0'>
                        <SelectValue>
                          <div className='flex items-center'>
                            <Image
                              src={`https://flagcdn.com/w20/${country.flag.toLowerCase()}.png`}
                              alt={country.label}
                              width={20}
                              height={15}
                              className='mr-1'
                            />
                            <span>{country.dialCode}</span>
                          </div>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent className='max-h-[300px]'>
                        {countries.map((country) => (
                          <SelectItem
                            key={country.value}
                            value={country.value}
                            className='cursor-pointer py-2'
                          >
                            <div className='flex items-center'>
                              <Image
                                src={`https://flagcdn.com/w20/${country.flag.toLowerCase()}.png`}
                                alt={country.label}
                                width={20}
                                height={15}
                                className='mr-2'
                              />
                              <span className='mr-2'>{country.label}</span>
                              <span className='text-gray-500 ml-auto'>
                                {country.dialCode}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className='flex items-center border rounded-l-md px-2 bg-gray-50 h-[42px]'>
                      <Image
                        src={`https://flagcdn.com/w20/${country.flag.toLowerCase()}.png`}
                        alt={country.label}
                        width={20}
                        height={15}
                        className='mr-1'
                      />
                      <span>{country.dialCode}</span>
                    </div>
                  )}
                  <input
                    type='tel'
                    name='phone'
                    value={userData.phone}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    className={`flex-1 p-2 border-t border-r border-b rounded-r-md focus:outline-none focus:ring-1 focus:ring-gray-400 ${
                      !isEditing ? "bg-gray-50" : ""
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
