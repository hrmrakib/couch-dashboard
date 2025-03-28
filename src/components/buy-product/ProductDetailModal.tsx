"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Product, ProductStatus } from "@/lib/types";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProductDetailModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (status: ProductStatus) => void;
}

export default function ProductDetailModal({
  product,
  isOpen,
  onClose,
  onStatusChange,
}: ProductDetailModalProps) {
  const handleStatusChange = (newStatus: ProductStatus) => {
    onStatusChange(newStatus);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle className='text-xl font-bold'>
            Product Details
          </DialogTitle>
        </DialogHeader>

        {/* Product header */}
        <div className='bg-blue-50 p-4 rounded-md flex justify-between items-center'>
          <div className='font-medium'>{product.name}</div>
          <div className='font-medium'>${product.price}</div>
        </div>

        {/* Seller info */}
        <div className='flex items-center gap-2 py-2'>
          <div className='w-8 h-8 rounded-full bg-gray-200 overflow-hidden'>
            <Image
              src='/placeholder.svg?height=32&width=32'
              alt='Seller'
              width={32}
              height={32}
            />
          </div>
          <div>
            <p className='text-sm font-medium'>{product.seller.name}</p>
            <p className='text-xs text-gray-500'>{product.seller.date}</p>
          </div>
        </div>

        {/* Product information */}
        <div>
          <h3 className='text-lg font-medium mb-2'>Product Information</h3>
          <div className='space-y-2'>
            <div className='flex justify-between'>
              <span className='text-sm'>Model</span>
              <span className='text-sm'>{product.details.model}</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-sm'>Storage</span>
              <span className='text-sm'>{product.details.storage}</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-sm'>Condition</span>
              <span className='text-sm'>{product.details.condition}</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-sm'>Controller</span>
              <span className='text-sm'>{product.details.controller}</span>
            </div>
          </div>
        </div>

        {/* Seller information */}
        <div>
          <h3 className='text-lg font-medium mb-2'>Seller Information</h3>
          <div className='space-y-2'>
            <div className='flex justify-between items-center'>
              <span className='text-sm'>Account Number</span>
              <span className='text-sm flex items-center'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='mr-1 text-blue-500'
                >
                  <circle cx='12' cy='12' r='10' />
                  <path d='M12 6v6l4 2' />
                </svg>
                {product.seller.accountNumber}
              </span>
            </div>
            <div className='flex justify-between'>
              <span className='text-sm'>Phone</span>
              <span className='text-sm'>{product.seller.phone}</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-sm'>Email</span>
              <span className='text-sm'>{product.seller.email}</span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className='flex gap-2 mt-2'>
          <button
            onClick={() => handleStatusChange("cancel")}
            className={cn(
              "flex-1 py-2 rounded-md text-center text-sm font-medium border",
              product.status === "cancel"
                ? "bg-red-100 text-red-600 border-red-200"
                : "bg-white text-gray-600 border-gray-200 hover:bg-red-50"
            )}
          >
            Cancel
          </button>
          <button
            onClick={() => handleStatusChange("confirm")}
            className={cn(
              "flex-1 py-2 rounded-md text-center text-sm font-medium",
              product.status === "confirm"
                ? "bg-green-600 text-white"
                : "bg-gray-800 text-white hover:bg-gray-700"
            )}
          >
            Confirm
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
