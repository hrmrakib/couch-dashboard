"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter } from "next/navigation";

type OrderStatus = "Success" | "Pending" | "Shipped" | "Cancel";

type Order = {
  id: string;
  productName: string;
  productImage: string;
  date: string;
  time: string;
  customer: string;
  transactionId: string;
  payment: string;
  price: string;
  stock: string;
  status: OrderStatus;
};

const statusColors = {
  Success: "bg-green-100 text-green-600",
  Pending: "bg-blue-100 text-blue-600",
  Shipped: "bg-yellow-100 text-yellow-600",
  Cancel: "bg-red-100 text-red-600",
};

export default function OrderProductList() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"All" | OrderStatus>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInput, setPageInput] = useState("1");
  const totalPages = 12;

  const orders: Order[] = [
    {
      id: "1",
      productName: "Boy's Non-Shiny Chair",
      productImage: "/products/1.png",
      date: "8 Sep, 2020",
      time: "07:40 am",
      customer: "Darrell Steward",
      transactionId: "TXN-93A7CD5B",
      payment: "COD",
      price: "$202.87",
      stock: "40/200",
      status: "Success",
    },
    {
      id: "2",
      productName: "Boy's Non-Shiny Chair",
      productImage: "/products/2.png",
      date: "8 Sep, 2020",
      time: "07:40 am",
      customer: "Darrell Steward",
      transactionId: "TXN-93A7CD5B",
      payment: "COD",
      price: "$202.87",
      stock: "40/200",
      status: "Pending",
    },
    {
      id: "3",
      productName: "Boy's Non-Shiny Chair",
      productImage: "/products/3.png",
      date: "8 Sep, 2020",
      time: "07:40 am",
      customer: "Darrell Steward",
      transactionId: "TXN-93A7CD5B",
      payment: "COD",
      price: "$202.87",
      stock: "40/200",
      status: "Cancel",
    },
    {
      id: "4",
      productName: "Boy's Non-Shiny Chair",
      productImage: "/products/4.png",
      date: "8 Sep, 2020",
      time: "07:40 am",
      customer: "Darrell Steward",
      transactionId: "TXN-93A7CD5B",
      payment: "COD",
      price: "$202.87",
      stock: "40/200",
      status: "Success",
    },
    {
      id: "5",
      productName: "Boy's Non-Shiny Chair",
      productImage: "/products/5.png",
      date: "8 Sep, 2020",
      time: "07:40 am",
      customer: "Darrell Steward",
      transactionId: "TXN-93A7CD5B",
      payment: "COD",
      price: "$202.87",
      stock: "40/200",
      status: "Pending",
    },
    {
      id: "6",
      productName: "Boy's Non-Shiny Chair",
      productImage: "/products/6.png",
      date: "8 Sep, 2020",
      time: "07:40 am",
      customer: "Darrell Steward",
      transactionId: "TXN-93A7CD5B",
      payment: "COD",
      price: "$202.87",
      stock: "40/200",
      status: "Shipped",
    },
    {
      id: "7",
      productName: "Boy's Non-Shiny Chair",
      productImage: "/products/7.png",
      date: "8 Sep, 2020",
      time: "07:40 am",
      customer: "Darrell Steward",
      transactionId: "TXN-93A7CD5B",
      payment: "COD",
      price: "$202.87",
      stock: "40/200",
      status: "Cancel",
    },
    {
      id: "8",
      productName: "Boy's Non-Shiny Chair",
      productImage: "/products/8.png",
      date: "8 Sep, 2020",
      time: "07:40 am",
      customer: "Darrell Steward",
      transactionId: "TXN-93A7CD5B",
      payment: "COD",
      price: "$202.87",
      stock: "40/200",
      status: "Shipped",
    },
  ];

  const filteredOrders =
    activeTab === "All"
      ? orders
      : orders.filter((order) => order.status === activeTab);

  const handleTabChange = (tab: "All" | OrderStatus) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setPageInput(page.toString());
  };

  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageInput(e.target.value);
  };

  const handleGoToPage = () => {
    const page = Number.parseInt(pageInput);
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    } else {
      setPageInput(currentPage.toString());
    }
  };

  return (
    <div className='container mx-auto p-4'>
      <div className='mb-6 flex items-center'>
        <Button
          onClick={() => router.back()}
          variant='ghost'
          size='icon'
          className='mr-2 cursor-pointer'
        >
          <ArrowLeft size={24} />
        </Button>
        <h1 className='text-xl md:text-[32px] text-[#333333] font-semibold'>
          Order Product List
        </h1>
      </div>

      <div className='bg-white rounded-lg border border-gray-200 overflow-hidden'>
        {/* Status Tabs */}
        <div className='p-4 flex flex-wrap items-center justify-between border-b border-gray-200'>
          <div className='flex flex-wrap gap-2 mb-2 sm:mb-0'>
            <Button
              variant={activeTab === "All" ? "default" : "outline"}
              className={`rounded-full text-sm px-4 py-1 h-auto ${
                activeTab === "All" ? "bg-gray-800" : ""
              }`}
              onClick={() => handleTabChange("All")}
            >
              All
            </Button>
            <Button
              variant={activeTab === "Pending" ? "default" : "outline"}
              className={`rounded-full text-sm px-4 py-1 h-auto ${
                activeTab === "Pending" ? "bg-blue-600" : ""
              }`}
              onClick={() => handleTabChange("Pending")}
            >
              Pending
            </Button>
            <Button
              variant={activeTab === "Shipped" ? "default" : "outline"}
              className={`rounded-full text-sm px-4 py-1 h-auto ${
                activeTab === "Shipped" ? "bg-yellow-500" : ""
              }`}
              onClick={() => handleTabChange("Shipped")}
            >
              Shipped
            </Button>
            <Button
              variant={activeTab === "Success" ? "default" : "outline"}
              className={`rounded-full text-sm px-4 py-1 h-auto ${
                activeTab === "Success" ? "bg-green-600" : ""
              }`}
              onClick={() => handleTabChange("Success")}
            >
              Success
            </Button>
            <Button
              variant={activeTab === "Cancel" ? "default" : "outline"}
              className={`rounded-full text-sm px-4 py-1 h-auto ${
                activeTab === "Cancel" ? "bg-red-500" : ""
              }`}
              onClick={() => handleTabChange("Cancel")}
            >
              Cancel
            </Button>
          </div>
          <div className='text-sm font-medium'>
            Total: <span className='font-bold'>42</span>
          </div>
        </div>

        {/* Table Header */}
        <div className='hidden md:grid grid-cols-7 gap-4 p-4 border-b border-gray-200 bg-gray-50 font-medium text-sm'>
          <div className='col-span-1 text-sm font-medium text-[#333333]'>
            Product
          </div>
          <div className='col-span-1 text-sm font-medium text-[#333333]'>
            Customer
          </div>
          <div className='col-span-1 text-sm font-medium text-[#333333]'>
            Transaction ID
          </div>
          <div className='col-span-1 text-sm font-medium text-[#333333]'>
            Payment
          </div>
          <div className='col-span-1 text-sm font-medium text-[#333333]'>
            Price
          </div>
          <div className='col-span-1 text-sm font-medium text-[#333333]'>
            Stock
          </div>
          <div className='col-span-1 text-sm font-medium text-[#333333]'>
            Status
          </div>
        </div>

        {/* Table Body */}
        <div className='divide-y divide-gray-200'>
          {filteredOrders.map((order) => (
            <div key={order.id} className='p-4'>
              <div className='md:grid md:grid-cols-7 md:gap-4 flex flex-col space-y-3 md:space-y-0'>
                {/* Product */}
                <div className='col-span-1 flex items-center space-x-3'>
                  <div className='w-16 h-16 relative flex-shrink-0 border border-gray-200 rounded-md overflow-hidden'>
                    <Image
                      src={order.productImage || "/placeholder.svg"}
                      alt={order.productName}
                      fill
                      className='object-cover'
                    />
                  </div>
                  <div>
                    <p className='font-medium text-sm'>{order.productName}</p>
                    <p className='text-xs text-gray-500'>
                      {order.date} | {order.time}
                    </p>
                  </div>
                </div>

                {/* Customer */}
                <div className='col-span-1 flex md:items-center'>
                  <div className='md:hidden font-medium text-xs text-gray-500 mr-2'>
                    Customer:
                  </div>
                  <div>{order.customer}</div>
                </div>

                {/* Transaction ID */}
                <div className='col-span-1 flex md:items-center'>
                  <div className='md:hidden font-medium text-xs text-gray-500 mr-2'>
                    Transaction ID:
                  </div>
                  <div>{order.transactionId}</div>
                </div>

                {/* Payment */}
                <div className='col-span-1 flex md:items-center'>
                  <div className='md:hidden font-medium text-xs text-gray-500 mr-2'>
                    Payment:
                  </div>
                  <div>{order.payment}</div>
                </div>

                {/* Price */}
                <div className='col-span-1 flex md:items-center'>
                  <div className='md:hidden font-medium text-xs text-gray-500 mr-2'>
                    Price:
                  </div>
                  <div>{order.price}</div>
                </div>

                {/* Stock */}
                <div className='col-span-1 flex md:items-center'>
                  <div className='md:hidden font-medium text-xs text-gray-500 mr-2'>
                    Stock:
                  </div>
                  <div>{order.stock}</div>
                </div>

                {/* Status */}
                <div className='col-span-1 flex md:items-center'>
                  <div className='md:hidden font-medium text-xs text-gray-500 mr-2'>
                    Status:
                  </div>
                  <Badge
                    className={`font-medium ${statusColors[order.status]}`}
                  >
                    {order.status}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className='p-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-center gap-4'>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href='#'
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) handlePageChange(currentPage - 1);
                  }}
                  className={
                    currentPage === 1 ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>

              {currentPage > 2 && (
                <PaginationItem>
                  <PaginationLink
                    href='#'
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(1);
                    }}
                  >
                    1
                  </PaginationLink>
                </PaginationItem>
              )}

              {currentPage > 3 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              {currentPage > 1 && (
                <PaginationItem>
                  <PaginationLink
                    href='#'
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(currentPage - 1);
                    }}
                  >
                    {currentPage - 1}
                  </PaginationLink>
                </PaginationItem>
              )}

              <PaginationItem>
                <PaginationLink href='#' isActive>
                  {currentPage}
                </PaginationLink>
              </PaginationItem>

              {currentPage < totalPages && (
                <PaginationItem>
                  <PaginationLink
                    href='#'
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(currentPage + 1);
                    }}
                  >
                    {currentPage + 1}
                  </PaginationLink>
                </PaginationItem>
              )}

              {currentPage < totalPages - 2 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              {currentPage < totalPages - 1 && (
                <PaginationItem>
                  <PaginationLink
                    href='#'
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(totalPages);
                    }}
                  >
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              )}

              <PaginationItem>
                <PaginationNext
                  href='#'
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages)
                      handlePageChange(currentPage + 1);
                  }}
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>

          <div className='flex items-center gap-2'>
            <span className='text-sm'>Page</span>
            <Input
              type='text'
              value={pageInput}
              onChange={handlePageInputChange}
              className='w-16 h-9 text-center'
            />
            <Button variant='default' size='sm' onClick={handleGoToPage}>
              Go
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
