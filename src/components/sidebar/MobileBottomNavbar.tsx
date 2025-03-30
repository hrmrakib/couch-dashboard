"use client";

import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  PackageOpen,
  History,
  ClipboardList,
  Settings,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: Package, label: "Products", href: "/products" },
  { icon: ShoppingCart, label: "Buy", href: "/buy-products" },
  { icon: PackageOpen, label: "Bundle", href: "/bundle" },
  { icon: History, label: "History", href: "/transaction-history" },
  { icon: ClipboardList, label: "Orders", href: "/manage-orders" },
  { icon: Settings, label: "Settings", href: "/setting" },
];

export default function BottomNavbar() {
  const pathname = usePathname();

  return (
    <nav className='md:hidden fixed bottom-0 left-0 w-full bg-white shadow-md p-2'>
      <div className='flex overflow-x-auto no-scrollbar gap-4 px-2'>
        {menuItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className='flex flex-col items-center min-w-[80px] p-2'
          >
            <item.icon
              className={`h-6 w-6 ${
                pathname === item.href ? "text-blue-500" : "text-gray-600"
              }`}
            />
            <span
              className={`text-sm ${
                pathname === item.href ? "text-blue-500" : "text-gray-600"
              }`}
            >
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
