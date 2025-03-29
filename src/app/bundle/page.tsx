"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, Check, Pencil, Search, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

// Sample data for bundles
const bundleItems = [
  { id: 1, name: "Cozy Living Room Set", rentPrice: 59, buyPrice: 599 },
  { id: 2, name: "Cozy Living Room Set", rentPrice: 59, buyPrice: 599 },
  { id: 3, name: "Cozy Living Room Set", rentPrice: 59, buyPrice: 599 },
  { id: 4, name: "Cozy Living Room Set", rentPrice: 59, buyPrice: 599 },
  { id: 5, name: "Cozy Living Room Set", rentPrice: 59, buyPrice: 599 },
];

// Sample data for products to add
const productItems = [
  { id: 1, name: "Wooden Sofa", image: "/product/1.png" },
  { id: 2, name: "Oila Chair", image: "/product/2.png" },
  { id: 3, name: "Bed", image: "/product/3.png" },
  { id: 4, name: "Ergonomic Bed", image: "/product/4.png" },
  { id: 5, name: "Rolling Desk", image: "/product/5.png" },
  { id: 6, name: "Cabinet", image: "/product/6.png" },
  { id: 7, name: "Chair", image: "/product/7.png" },
  { id: 8, name: "Table", image: "/product/8.png" },
];

export default function BundlePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState(currentPage.toString());
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const router = useRouter();

  const totalPages = 12; // Hardcoded for demo

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setInputPage(page.toString());
    }
  };

  // Handle go to page
  const handleGoToPage = () => {
    const pageNumber = Number.parseInt(inputPage);
    if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    } else {
      setInputPage(currentPage.toString());
    }
  };

  // Handle delete confirmation
  const handleDeleteClick = (id: number) => {
    setSelectedItemId(id);
    setIsDeleteModalOpen(true);
  };

  // Handle delete confirmation
  const handleConfirmDelete = () => {
    // In a real app, you would delete the item here
    console.log(`Deleting item ${selectedItemId}`);
    setIsDeleteModalOpen(false);
  };

  // Filter products based on search query
  const filteredProducts = productItems.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle toggling product selection
  const toggleProductSelection = (productId: string) => {
    setSelectedProducts((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  // Reset selections when dialog closes
  const handleDialogChange = (open: boolean) => {
    setIsAddDialogOpen(open);
    if (!open) {
      setSelectedProducts([]);
      setSearchQuery("");
    }
  };

  const handleNext = () => {
    router.push("/bundle/add-bundle");
  };

  return (
    <div className='container mx-auto py-6'>
      {/* Header */}
      <div className='flex items-center justify-between mb-6'>
        <div className='flex items-center'>
          <ArrowLeft className='h-5 w-5 mr-2' />
          <h1 className='text-xl md:text-[32px] text-[#101010] font-medium'>
            Bundle
          </h1>
        </div>
        <Button
          onClick={() => setIsAddDialogOpen(true)}
          className='bg-black text-white hover:bg-gray-800 rounded px-4 py-2 h-10'
        >
          Add Item
        </Button>
      </div>

      {/* Bundle Items */}
      <div className='space-y-4'>
        {bundleItems.map((item) => (
          <div
            key={item.id}
            className='border border-gray-200 rounded-lg p-4 flex items-center justify-between'
          >
            <div className='flex items-center'>
              <div className='relative w-16 h-16 mr-4 overflow-hidden rounded-md'>
                <Image
                  src='/product/1.png'
                  alt={item.name}
                  width={64}
                  height={64}
                  className='object-cover'
                />
              </div>
              <div>
                <h3 className='font-medium'>{item.name}</h3>
                <div className='text-sm text-gray-600'>
                  <p>Rent: ${item.rentPrice}/mo</p>
                  <p>Buy: ${item.buyPrice}</p>
                </div>
              </div>
            </div>
            <div className='flex items-center space-x-4'>
              <button className='text-gray-500 hover:text-gray-700'>
                <Pencil className='h-5 w-5' />
              </button>
              <button
                className='text-red-500 hover:text-red-700'
                onClick={() => handleDeleteClick(item.id)}
              >
                <Trash className='h-5 w-5' />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className='mt-8'>
        {/* <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          onGoToPage={handleGoToPage}
          inputPage={inputPage}
          setInputPage={setInputPage}
        /> */}

        <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
          <div className='flex items-center space-x-2'>
            <Button
              variant='outline'
              className='bg-black text-white hover:bg-gray-800 rounded px-4'
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ArrowLeft className='h-4 w-4 mr-1' />
              Back
            </Button>

            <div className='flex items-center'>
              <Button
                variant='outline'
                className={`w-8 h-8 p-0 ${
                  currentPage === 1 ? "bg-black text-white" : "border"
                }`}
                onClick={() => handlePageChange(1)}
              >
                1
              </Button>

              {totalPages > 3 && currentPage > 2 && (
                <span className='mx-1'>...</span>
              )}

              {currentPage !== 1 && currentPage !== totalPages && (
                <Button
                  variant='outline'
                  className='w-8 h-8 p-0 bg-black text-white mx-1'
                >
                  {currentPage}
                </Button>
              )}

              {totalPages > 3 && currentPage < totalPages - 1 && (
                <span className='mx-1'>...</span>
              )}

              {totalPages > 1 && (
                <Button
                  variant='outline'
                  className={`w-8 h-8 p-0 ${
                    currentPage === totalPages
                      ? "bg-black text-white"
                      : "border"
                  }`}
                  onClick={() => handlePageChange(totalPages)}
                >
                  {totalPages}
                </Button>
              )}
            </div>

            <Button
              variant='outline'
              className='bg-black text-white hover:bg-gray-800 rounded px-4'
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Back
              <ArrowLeft className='h-4 w-4 ml-1 rotate-180' />
            </Button>
          </div>

          <div className='flex items-center space-x-2'>
            <span className='text-sm'>Page</span>
            <Input
              className='w-16 h-8 text-center'
              value={inputPage}
              onChange={(e) => setInputPage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleGoToPage()}
            />
            <Button
              variant='outline'
              className='h-8 px-3'
              onClick={handleGoToPage}
            >
              Go
            </Button>
          </div>
        </div>
      </div>

      {/* Add Item Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className='sm:max-w-md'>
          <DialogHeader>
            <div className='relative w-full mb-4'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
              <Input
                placeholder='Type product name'
                className='pl-10 pr-4 py-2 w-full'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </DialogHeader>
          <div className='space-y-2 max-h-[400px] overflow-y-auto'>
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className='flex items-center justify-between p-3 bg-gray-50 rounded-md'
              >
                <div className='flex items-center'>
                  <div className='relative w-8 h-8 mr-3 overflow-hidden'>
                    <Image
                      src='/placeholder.svg?height=32&width=32'
                      alt={product.name}
                      width={32}
                      height={32}
                      className='object-cover'
                    />
                  </div>
                  <span>{product.name}</span>
                </div>
                <button className='text-gray-500 hover:text-gray-700'>
                  <span className='text-xl font-medium'>+</span>
                </button>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className='sm:max-w-md'>
          <div className='flex flex-col items-center justify-center py-4'>
            <div className='w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-4'>
              <Trash className='h-6 w-6 text-red-500' />
            </div>
            <DialogTitle className='text-center mb-2'>
              This bundle will be permanently deleted.
            </DialogTitle>
            <DialogDescription className='text-center mb-6'>
              Are you Sure?
            </DialogDescription>
            <div className='flex w-full space-x-4'>
              <Button
                variant='outline'
                className='flex-1'
                onClick={() => setIsDeleteModalOpen(false)}
              >
                No I Don&apos;t
              </Button>
              <Button
                className='flex-1 bg-black text-white hover:bg-gray-800'
                onClick={handleConfirmDelete}
              >
                Yes I&apos;m Sure
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add product dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={handleDialogChange}>
        <DialogContent className='sm:max-w-md'>
          <DialogTitle className='sr-only'>Add Products to Bundle</DialogTitle>

          {/* Search input */}
          <div className='relative mb-4 mt-2'>
            <input
              type='text'
              placeholder='Type product name'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='w-full border border-gray-300 rounded-md py-2 pl-3 pr-10 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500'
            />
            <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
              <Search className='h-5 w-5 text-gray-400' />
            </div>
          </div>

          {/* Product list */}
          <div className='space-y-2 max-h-[50vh] overflow-y-auto mb-4'>
            {filteredProducts.map((product) => {
              const isSelected = selectedProducts.includes(product.id);

              return (
                <div
                  key={product.id}
                  className={`flex items-center justify-between p-3 rounded-md ${
                    isSelected
                      ? "bg-blue-50 border border-blue-200"
                      : "bg-gray-50"
                  }`}
                >
                  <div className='flex items-center'>
                    <div className='relative w-8 h-8 mr-3'>
                      <Image
                        src={product?.image || "/placeholder.svg"}
                        alt={product.name}
                        width={32}
                        height={32}
                        className='object-contain'
                      />
                    </div>
                    <span className='text-sm font-medium'>{product.name}</span>
                  </div>

                  <button
                    onClick={() => toggleProductSelection(product.id)}
                    className={`flex items-center justify-center w-6 h-6 rounded-full ${
                      isSelected
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-500 hover:bg-gray-300"
                    }`}
                  >
                    <Check className='h-4 w-4' />
                  </button>
                </div>
              );
            })}
          </div>

          <DialogFooter>
            <Button
              onClick={handleNext}
              disabled={selectedProducts.length === 0}
              className='w-full bg-black text-white hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed'
            >
              Next
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
