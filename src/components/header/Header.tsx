"use client";

import React from "react";
import { ChevronDown, Bell } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Header = () => {
  const notifications = 3;
  const router = useRouter();

  const handleLogout = () => {
    router.push("/signin");
  };

  return (
    <header className='border-b border-gray-100'>
      <div className='flex items-center justify-between px-6 py-4'>
        <div className='hidden md:block'>
          <h1 className='text-lg md:text-2xl font-semibold'>Welcome, Sharon</h1>
          <p className='text-base text-[#404040]'>Have a nice day</p>
        </div>
        <div className='flex items-center gap-4'>
          <div className='relative'>
            <Button variant='ghost' size='icon' className='relative'>
              <Bell size={32} className='text-[#404040] w-10 h-10' />
              {notifications > 0 && (
                <span className='absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] text-white'>
                  {notifications}
                </span>
              )}
            </Button>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='flex items-center gap-2'>
                <Avatar className='h-8 w-8'>
                  <AvatarImage src='/user/1.png' sizes='48px' alt='Sharon' />
                  <AvatarFallback>SH</AvatarFallback>
                </Avatar>
                <span className='text-base font-medium'>Sharon</span>
                <ChevronDown className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleLogout()}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
