"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
  onViewDetails: () => void;
}

export default function ProductCard({
  product,
  onViewDetails,
}: ProductCardProps) {
  const { name, price, image, seller, status } = product;

  const statusStyles = {
    pending: "bg-blue-100 text-blue-600",
    confirm: "bg-green-100 text-green-600",
    cancel: "bg-red-100 text-red-600",
    success: "bg-green-100 text-green-600",
  };

  const IMAGE = process.env.NEXT_PUBLIC_IMAGE_URL

  return (
    <div className='bg-white rounded-lg overflow-hidden shadow-sm'>
      <div className='relative aspect-square'>
        <Image
          src={ `${IMAGE}${image}` || "/placeholder.svg"}
          alt={name}
          fill
          className='object-cover'
        />
      </div>

      <div className='p-4'>
        <div className='flex justify-between items-start mb-2'>
          <h3 className='text-xl text-[#333333] font-medium'>{name}</h3>
          <span className='text-xl text-[#333333] font-medium'>${price}</span>
        </div>

        <div className='flex items-center justify-between mb-3'>
          <div className='flex items-center'>
            <div className='w-6 h-6 rounded-full bg-gray-200 mr-2 overflow-hidden'>
              <Image src='/user/2.png' alt='Seller' width={24} height={24} />
            </div>
            <div>
              <p className='text-base text-[#333333] font-medium'>
                {seller.name}
              </p>
              <p className='text-sm text-[##545454]'>{seller.date}</p>
            </div>
          </div>

          <span
            className={cn(
              "text-base font-medium px-3 py-2 rounded-md",
              statusStyles[status]
            )}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>

        <button
          onClick={onViewDetails}
          className='w-full h-12 py-2 bg-[#333333] text-[#FDFDFD] text-base font-medium rounded-md hover:bg-gray-700 transition-colors'
        >
          Details
        </button>
      </div>
    </div>
  );
}
