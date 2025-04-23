

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
import { useOrdersGetQuery } from "@/redux/features/orders/ordersaApi";

type OrderStatus = "Success" | "Pending" | "Shipped" | "Cancel";

interface ApiOrderDetail {
  product: {
    images: string[];
  };
  quantity: number;
}

interface ApiOrder {
  _id: string;
  name: string;
  details: ApiOrderDetail[];
  createdAt: string;
  customer: {
    name: string;
  };
  transaction: {
    transaction_id: string;
    payment_method: string;
  };
  amount: number;
  state: string;
}

type Order = {
  id: string;
  productName: string;
  images: string;
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

  // Fetch orders using the query
  const { data, isLoading, error } = useOrdersGetQuery({ page: currentPage, limit: 10 });

  const orders: Order[] = data?.data?.map((order: ApiOrder) => ({
    id: order?._id,
    productName: order?.name,
    images: order?.details[0]?.product?.images[0] || "/placeholder.svg",
    date: new Date(order.createdAt).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
    time: new Date(order?.createdAt).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    customer: order?.customer.name,
    transactionId: order?.transaction?.transaction_id,
    payment: order?.transaction?.payment_method?.toUpperCase(),
    price: `$${order?.amount?.toFixed(2)}`,
    stock: `${order?.details.reduce((sum: number, d: ApiOrderDetail) => sum + d.quantity, 0)}/200`, // Assuming total stock is 200
    status: order?.state.charAt(0).toUpperCase() + order.state.slice(1) as OrderStatus, // Capitalize state
  })) || [];

  const totalOrders = data?.meta?.pagination?.total || 0;
  const totalPages = data?.meta?.pagination?.totalPages || 1;

  const filteredOrders =
    activeTab === "All"
      ? orders
      : orders.filter((order) => order.status === activeTab);

  const handleTabChange = (tab: "All" | OrderStatus) => {
    setActiveTab(tab);
    setCurrentPage(1);
    setPageInput("1");
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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching orders</div>;

  const IMAGE =process.env.NEXT_PUBLIC_IMAGE_URL 

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6 flex items-center">
        <Button
          onClick={() => router.back()}
          variant="ghost"
          size="icon"
          className="mr-2 cursor-pointer"
        >
          <ArrowLeft size={24}  />
        </Button>
        <h1 className="text-xl md:text-[32px] text-[#333333] font-semibold">
          Order Product List
        </h1>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Status Tabs */}
        <div className="p-4 flex flex-wrap items-center justify-between border-b border-gray-200">
          <div className="flex flex-wrap gap-2 mb-2 sm:mb-0">
            {["All", "Success", "Pending", "Shipped", "Cancel"].map((tab) => (
              <Button
                key={tab}
                variant={activeTab === tab ? "default" : "outline"}
                className={`rounded-full text-sm px-4 py-1 h-auto ${
                  activeTab === tab
                    ? tab === "All"
                      ? "bg-gray-800"
                      : tab === "Pending"
                      ? "bg-blue-600"
                      : tab === "Shipped"
                      ? "bg-yellow-500"
                      : tab === "Success"
                      ? "bg-green-600"
                      : "bg-red-500"
                    : ""
                }`}
                onClick={() => handleTabChange(tab as "All" | OrderStatus)}
              >
                {tab}
              </Button>
            ))}
          </div>
          <div className="text-sm font-medium">
            Total: <span className="font-bold">{totalOrders}</span>
          </div>
        </div>

        {/* Table Header */}
        <div className="hidden md:grid grid-cols-7 gap-4 p-4 border-b border-gray-200 bg-gray-50 font-medium text-sm">
          <div className="col-span-1 text-sm font-medium text-[#333333]">Product</div>
          <div className="col-span-1 text-sm font-medium text-[#333333]">Customer</div>
          <div className="col-span-1 text-sm font-medium text-[#333333]">Transaction ID</div>
          <div className="col-span-1 text-sm font-medium text-[#333333]">Payment</div>
          <div className="col-span-1 text-sm font-medium text-[#333333]">Price</div>
          <div className="col-span-1 text-sm font-medium text-[#333333]">Stock</div>
          <div className="col-span-1 text-sm font-medium text-[#333333]">Status</div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-200">
          {filteredOrders.map((order) => (
            <div key={order?.id} className="p-4">
              <div className="md:grid md:grid-cols-7 md:gap-4 flex flex-col space-y-3 md:space-y-0">
                {/* Product */}
                <div className="col-span-1 flex items-center space-x-3">
                  <div className="w-16 h-16 relative flex-shrink-0 border border-gray-200 rounded-md overflow-hidden">
                    <Image
                      src={`${IMAGE}${order?.images}`}
                      alt={order?.productName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{order?.productName}</p>
                    <p className="text-xs text-gray-500">
                      {order?.date} | {order?.time}
                    </p>
                  </div>
                </div>

                {/* Customer */}
                <div className="col-span-1 flex md:items-center">
                  <div className="md:hidden font-medium text-xs text-gray-500 mr-2">Customer:</div>
                  <div>{order?.customer}</div>
                </div>

                {/* Transaction ID */}
                <div className="col-span-1 flex md:items-center">
                  <div className="md:hidden font-medium text-xs text-gray-500 mr-2">Transaction ID:</div>
                  <div>{order?.transactionId}</div>
                </div>

                {/* Payment */}
                <div className="col-span-1 flex md:items-center">
                  <div className="md:hidden font-medium text-xs text-gray-500 mr-2">Payment:</div>
                  <div>{order?.payment}</div>
                </div>

                {/* Price */}
                <div className="col-span-1 flex md:items-center">
                  <div className="md:hidden font-medium text-xs text-gray-500 mr-2">Price:</div>
                  <div>{order?.price}</div>
                </div>

                {/* Stock */}
                <div className="col-span-1 flex md:items-center">
                  <div className="md:hidden font-medium text-xs text-gray-500 mr-2">Stock:</div>
                  <div>{order?.stock}</div>
                </div>

                {/* Status */}
                <div className="col-span-1 flex md:items-center">
                  <div className="md:hidden font-medium text-xs text-gray-500 mr-2">Status:</div>
                  <Badge className={`font-medium ${statusColors[order?.status]}`}>
                    {order?.status}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) handlePageChange(currentPage - 1);
                  }}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>

              {currentPage > 2 && (
                <PaginationItem>
                  <PaginationLink
                    href="#"
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
                    href="#"
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
                <PaginationLink href="#" isActive>
                  {currentPage}
                </PaginationLink>
              </PaginationItem>

              {currentPage < totalPages && (
                <PaginationItem>
                  <PaginationLink
                    href="#"
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
                    href="#"
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
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages) handlePageChange(currentPage + 1);
                  }}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>

          <div className="flex items-center gap-2">
            <span className="text-sm">Page</span>
            <Input
              type="text"
              value={pageInput}
              onChange={handlePageInputChange}
              className="w-16 h-9 text-center"
            />
            <Button variant="default" size="sm" onClick={handleGoToPage}>
              Go
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}