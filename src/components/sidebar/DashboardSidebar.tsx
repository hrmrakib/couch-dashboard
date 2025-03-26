"use client";

import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  PackageOpen,
  History,
  ClipboardList,
  Settings,
  LogOut,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
export default function DashboardSidebar() {
  const pathname = usePathname();
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/", active: true },
    { icon: Package, label: "Products", href: "/products" },
    { icon: ShoppingCart, label: "Buy Products", href: "/buy-products" },
    { icon: PackageOpen, label: "Bundle", href: "/bundle" },
    {
      icon: History,
      label: "Transaction History",
      href: "/transaction-history",
    },
    { icon: ClipboardList, label: "Manage Orders", href: "/manage-orders" },
    { icon: Settings, label: "Setting", href: "/setting" },
  ];

  // const isActive = (href: string) => pathname === href;

  console.log(pathname);

  return (
    <Sidebar>
      <SidebarHeader className='border-b border-gray-100 py-4'>
        <div className='px-6'>
          <Image src='/logo.svg' alt='logo' width={57} height={64} />
        </div>
      </SidebarHeader>
      <SidebarContent className='px-6'>
        <SidebarMenu className='flex flex-col gap-5'>
          {menuItems.map((item, index) => (
            <SidebarMenuItem key={index}>
              <SidebarMenuButton
                asChild
                // isActive={isActive(item.href)}
                // className={"bg-gray-500"}
                className={`px-5 py-3 ${
                  pathname === item.href ? "bg-[#DAEDF2]" : ""
                }`}
              >
                <Link
                  href={item.href}
                  className='flex items-center gap-3 py-5 px-2 rounded-none'
                >
                  <item.icon className='h-5 w-5' />
                  <span className='text-lg text-[#1A1918]'>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className='border-t border-gray-100 p-4'>
        <Button
          variant='destructive'
          className='w-full flex items-center gap-2'
          size='sm'
        >
          <LogOut className='h-4 w-4' />
          <span>Log Out</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
