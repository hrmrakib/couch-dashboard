"use client";

import { ChevronLeft } from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Card, CardContent } from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TransactionTable } from "@/components/TransactionTable";
import { EarningsChart } from "./transaction-history/EarningChart";

export default function Dashboard() {
  return (
    <SidebarProvider>
      <div className='flex min-h-screen bg-white w-full'>
        <main className='flex-1'>
          <div className='flex flex-col'>
            {/* Header */}

            {/* Main Content */}
            <div className='p-6'>
              {/* Overview Section */}
              <div className='mb-8'>
                <div className='flex items-center gap-2 mb-6'>
                  <ChevronLeft className='h-5 w-5' />
                  <h2 className='text-xl font-medium'>Overview</h2>
                </div>

                <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4'>
                  <Card className='border border-[#C3C2BF] rounded-md'>
                    <CardContent className='p-6'>
                      <div className='text-center'>
                        <p className='text-[#737163] text-2xl font-medium mb-2'>
                          Total Sell
                        </p>
                        <h3 className='text-2xl md:text-5xl text-[#1A1918] font-bold'>
                          $1230
                        </h3>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className='border border-[#C3C2BF] rounded-md'>
                    <CardContent className='p-6'>
                      <div className='text-center'>
                        <p className='text-[#737163] text-2xl font-medium mb-2'>
                          Total Buy
                        </p>
                        <h3 className='text-2xl md:text-5xl text-[#1A1918] font-bold'>
                          $1230
                        </h3>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className='border border-[#C3C2BF] rounded-md'>
                    <CardContent className='p-6'>
                      <div className='text-center'>
                        <p className='text-[#737163] text-2xl font-medium mb-2'>
                          Total Earnings
                        </p>
                        <h3 className='text-2xl md:text-5xl text-[#1A1918] font-bold'>
                          $1230
                        </h3>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Earnings Chart */}
              <div className='mb-8'>
                <div className='flex items-center justify-between mb-6'>
                  <h2 className='text-[29px] text-[#181414] font-medium'>
                    Earnings
                  </h2>
                  <Select defaultValue='2024'>
                    <SelectTrigger className='w-[180px]'>
                      <SelectValue placeholder='Select Year' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='2024'>2024 May</SelectItem>
                      <SelectItem value='2023'>2023</SelectItem>
                      <SelectItem value='2022'>2022</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className='h-[250px] w-full'>
                  <EarningsChart
                    data={[
                      { month: "Jan", amount: 3000 },
                      { month: "Feb", amount: 2500 },
                      { month: "Mar", amount: 6000 },
                      { month: "Apr", amount: 7000 },
                      { month: "May", amount: 6000 },
                      { month: "Jun", amount: 6000 },
                      { month: "Jul", amount: 7000 },
                      { month: "Aug", amount: 4000 },
                      { month: "Sep", amount: 2000 },
                      { month: "Oct", amount: 7000 },
                      { month: "Nov", amount: 8000 },
                      { month: "Dec", amount: 7000 },
                    ]}
                  />
                </div>
              </div>

              {/* Recent Transactions */}
              <div>
                <h2 className='text-xl font-medium mb-6'>Recent Transaction</h2>
                <TransactionTable />
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
