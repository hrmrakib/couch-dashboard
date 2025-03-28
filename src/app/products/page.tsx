"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, Info, MoreVertical } from "lucide-react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

type ProductType = "Buy & Rent" | "Only Rent";

type Product = {
  id: string;
  name: string;
  image: string;
  condition: string;
  rentPrice: string;
  buyPrice: string;
};

export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState<ProductType>("Buy & Rent");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInput, setPageInput] = useState("1");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const totalPages = 12;

  const products: Product[] = [
    {
      id: "1",
      name: "ComfiTable",
      image: "/product/1.png",
      condition: "Good",
      rentPrice: "$20/mo",
      buyPrice: "$150 to buy",
    },
    {
      id: "2",
      name: "ComfiTable",
      image: "/product/2.png",
      condition: "Good",
      rentPrice: "$20/mo",
      buyPrice: "$150 to buy",
    },
    {
      id: "3",
      name: "ComfiTable",
      image: "/product/3.png",
      condition: "Good",
      rentPrice: "$20/mo",
      buyPrice: "$150 to buy",
    },
    {
      id: "4",
      name: "ComfiTable",
      image: "/product/4.png",
      condition: "Good",
      rentPrice: "$20/mo",
      buyPrice: "$150 to buy",
    },
    {
      id: "5",
      name: "ComfiTable",
      image: "/product/5.png",
      condition: "Good",
      rentPrice: "$20/mo",
      buyPrice: "$150 to buy",
    },
    {
      id: "6",
      name: "ComfiTable",
      image: "/product/6.png",
      condition: "Good",
      rentPrice: "$20/mo",
      buyPrice: "$150 to buy",
    },
    {
      id: "7",
      name: "ComfiTable",
      image: "/product/7.png",
      condition: "Good",
      rentPrice: "$20/mo",
      buyPrice: "$150 to buy",
    },
    {
      id: "8",
      name: "ComfiTable",
      image: "/product/8.png",
      condition: "Good",
      rentPrice: "$20/mo",
      buyPrice: "$150 to buy",
    },
    {
      id: "9",
      name: "ComfiTable",
      image: "/product/9.png",
      condition: "Good",
      rentPrice: "$20/mo",
      buyPrice: "$150 to buy",
    },
    {
      id: "10",
      name: "ComfiTable",
      image: "/product/10.png",
      condition: "Good",
      rentPrice: "$20/mo",
      buyPrice: "$150 to buy",
    },
    {
      id: "11",
      name: "ComfiTable",
      image: "/product/11.png",
      condition: "Good",
      rentPrice: "$20/mo",
      buyPrice: "$150 to buy",
    },
    {
      id: "12",
      name: "ComfiTable",
      image: "/product/12.png",
      condition: "Good",
      rentPrice: "$20/mo",
      buyPrice: "$150 to buy",
    },
  ];

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

  const handleEdit = (id: string) => {
    console.log(`Edit product ${id}`);
    setActiveDropdown(null);
  };

  const handleDelete = (id: string) => {
    console.log(`Delete product ${id}`);
    setActiveDropdown(null);
  };

  return (
    <div className='container mx-auto p-4'>
      <div className='mb-6 flex items-center justify-between'>
        <div className='flex items-center'>
          <Button variant='ghost' size='icon' className='mr-2'>
            <ArrowLeft className='h-5 w-5' />
          </Button>
          <h1 className='text-xl font-semibold'>Products</h1>
        </div>
        <Link
          href='/products/add-products'
          className='bg-[#000000] text-[#FDFDFD] py-3 px-7 cursor-pointer hover:bg-gray-800 rounded-md'
        >
          Add Products
        </Link>
      </div>

      <div className='mb-4 flex flex-wrap items-center justify-between'>
        <div>
          <button
            onClick={() => setActiveTab("Buy & Rent")}
            className={`px-4 py-2 rounded-full ${
              activeTab === "Buy & Rent"
                ? "bg-[#000000] text-[#FFFFFF]"
                : "bg-[#F2F5F7] text-[#5F5F5F]"
            }`}
          >
            Buy & Rent
          </button>
          <button
            onClick={() => setActiveTab("Only Rent")}
            className={`px-4 py-2 rounded-full ${
              activeTab === "Only Rent"
                ? "bg-[#000000] text-[#FFFFFF]"
                : "bg-[#F2F5F7] text-[#5F5F5F]"
            }`}
          >
            Only Rent
          </button>
        </div>
        {/* <Tabs
          defaultValue='Buy & Rent'
          className='w-auto'
          onValueChange={handleTabChange}
        >
          <TabsList className='bg-transparent p-0 h-auto'>
            <TabsTrigger
              value='Buy & Rent'
              className={`rounded-full text-sm px-4 py-1.5 h-auto border ${
                activeTab === "Buy & Rent"
                  ? "bg-black text-white border-black"
                  : "bg-white text-black border-gray-300"
              }`}
            >
              Buy & Rent
            </TabsTrigger>
            <TabsTrigger
              value='Only Rent'
              className={`rounded-full text-sm px-4 py-1.5 h-auto border ml-2 ${
                activeTab === "Only Rent"
                  ? "bg-black text-white border-black"
                  : "bg-white text-black border-gray-300"
              }`}
            >
              Only Rent
            </TabsTrigger>
          </TabsList>
        </Tabs> */}
        <div className='text-sm font-medium mt-2 sm:mt-0 text-[#545454]'>
          Total: <span className='font-medium text-lg'>42</span>
        </div>
      </div>

      {/* Product Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6'>
        {products.map((product) => (
          <div key={product.id} className='bg-white rounded-md overflow-hidden'>
            <div className='relative h-[332px] w-full bg-[#F5F5F5]'>
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className='object-cover p-6'
              />
            </div>
            <div className='p-4'>
              <div className='flex justify-between items-start mb-1'>
                <h3 className='font-medium text-[32px] text-[#000000]'>
                  {product.name}
                </h3>
                <Button
                  variant='ghost'
                  size='icon'
                  className='h-8 w-8 -mt-1 -mr-2'
                >
                  <Info className='h-5 w-5 text-gray-500' />
                </Button>
              </div>
              <p className='text-lg text-[#333333] mb-2'>
                Condition:{" "}
                <span className='text-[#333333] font-medium'>
                  {product.condition}
                </span>
              </p>
              <div className='flex justify-between items-center'>
                <div className='flex justify-between items-center gap-6'>
                  <p className='text-lg text-[#333333]'>
                    Price: {product.rentPrice}
                  </p>
                  <p className='text-lg text-[#333333]'>{product.buyPrice}</p>
                </div>
                <div className='relative'>
                  <DropdownMenu
                    open={activeDropdown === product.id}
                    onOpenChange={(open) => {
                      if (open) {
                        setActiveDropdown(product.id);
                      } else {
                        setActiveDropdown(null);
                      }
                    }}
                  >
                    <DropdownMenuTrigger asChild>
                      <Button variant='ghost' size='icon' className='h-8 w-8'>
                        <MoreVertical className='h-5 w-5' />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end' className='w-32 border'>
                      <DropdownMenuItem onClick={() => handleEdit(product.id)}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(product.id)}
                        className='text-red-500'
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href='#'
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) handlePageChange(currentPage - 1);
                }}
                className={`${
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                } bg-black text-white hover:bg-gray-800 hover:text-white`}
              />
            </PaginationItem>

            <PaginationItem>
              <PaginationLink
                href='#'
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(1);
                }}
                className={
                  currentPage === 1
                    ? "bg-black text-white hover:bg-black hover:text-white"
                    : ""
                }
              >
                1
              </PaginationLink>
            </PaginationItem>

            {currentPage > 3 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            {currentPage > 2 && (
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

            {currentPage !== 1 && currentPage !== totalPages && (
              <PaginationItem>
                <PaginationLink
                  href='#'
                  className='bg-black text-white hover:bg-black hover:text-white'
                >
                  {currentPage}
                </PaginationLink>
              </PaginationItem>
            )}

            {currentPage < totalPages - 1 && (
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

            <PaginationItem>
              <PaginationLink
                href='#'
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(totalPages);
                }}
                className={
                  currentPage === totalPages
                    ? "bg-black text-white hover:bg-black hover:text-white"
                    : ""
                }
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationNext
                href='#'
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages)
                    handlePageChange(currentPage + 1);
                }}
                className={`${
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                } bg-black text-white hover:bg-gray-800 hover:text-white`}
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
          <Button
            variant='default'
            size='sm'
            onClick={handleGoToPage}
            className='bg-black hover:bg-gray-800'
          >
            Go
          </Button>
        </div>
      </div>
    </div>
  );
}
