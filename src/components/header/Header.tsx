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
import { useUserProfileQuery } from "@/redux/features/userApi/userSlice";
import Link from "next/link";

const Header = () => {
  const notifications = 3;
  const router = useRouter();

  const { data } = useUserProfileQuery(undefined);
  // console.log(data?.data);

  const handleLogout = () => {
    router.push("/signin");
  };

  const IMAGE =process.env.NEXT_PUBLIC_IMAGE_URL;
  const AVATAR = IMAGE + data?.data?.avatar;
  return (
    <header className="border-b border-gray-100">
      
      <div className="flex items-center justify-between px-6 py-4">
        <div className="hidden md:block">
          <h1 className="text-lg md:text-2xl font-semibold">Welcome, {data?.data?.name}</h1>
          <p className="text-base text-[#404040]">Have a nice day</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Button variant="ghost" size="icon" className="relative">
              <Bell size={32} className="text-[#404040] w-10 h-10" />
              {notifications > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] text-white">
                  {notifications}
                </span>
              )}
            </Button>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={AVATAR}
                    sizes="48px"
                    alt="Sharon"
                  />
                  <AvatarFallback>SH</AvatarFallback>
                </Avatar>
                <span className="text-base font-medium">
                  {data?.data?.name}
                </span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Link href="/setting/personal-information">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              </Link>
              <Link href="/setting">
                <DropdownMenuItem>Setting</DropdownMenuItem>
              </Link>
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
