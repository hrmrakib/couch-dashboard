"use client";

import DashboardSidebar from "@/components/sidebar/DashboardSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import Header from "@/components/header/Header";
import { usePathname } from "next/navigation";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const path =
    pathname === "/signin" ||
    pathname === "/signup" ||
    pathname === "/verify" ||
    pathname === "/forget-password";

  console.log(pathname);

  return (
    <>
      {path ? (
        children
      ) : (
        <div>
          <SidebarProvider>
            <DashboardSidebar />
            <main className='flex-1'>
              <Header />

              {children}
            </main>
          </SidebarProvider>
        </div>
      )}
    </>
  );
};

export default DashboardLayout;
