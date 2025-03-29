"use client";

import { useState, useRef, type ChangeEvent } from "react";
import Image from "next/image";
import { X } from "lucide-react";

interface BundleItem {
  id: string;
  name: string;
  icon: string;
}

export default function BundleCreator() {
  const [selectedItems, setSelectedItems] = useState<BundleItem[]>([
    { id: "1", name: "Wooden Sofa", icon: "🪑" },
    { id: "2", name: "Italiano Bed", icon: "🛏️" },
    { id: "3", name: "Dining Chair", icon: "🪑" },
    { id: "4", name: "Wardrobe", icon: "🗄️" },
    { id: "5", name: "Dining Chair", icon: "🪑" },
    { id: "6", name: "Dining Chair", icon: "🪑" },
  ]);

  const [bundleName, setBundleName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [buyingPrice1, setBuyingPrice1] = useState("");
  const [buyingPrice2, setBuyingPrice2] = useState("");
  const [discount, setDiscount] = useState("");
  const [bundleItems, setBundleItems] = useState(
    "E.g 1 Table, 2 Chair, 1 Bed, 1 Coffee Table"
  );
  const [coverImage, setCoverImage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const removeItem = (id: string) => {
    setSelectedItems(selectedItems.filter((item) => item.id !== id));
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCoverImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className='container mx-auto p-4 font-sans'>
      {/* Selected Items */}
      <div className='border border-gray-200 rounded-lg p-4 mb-6'>
        <div className='flex flex-wrap gap-2'>
          {selectedItems.map((item) => (
            <div
              key={item.id}
              className='flex items-center bg-gray-100 rounded-md px-3 py-2 gap-2'
            >
              <span className='text-lg'>{item.icon}</span>
              <span className='font-medium text-sm'>{item.name}</span>
              <button onClick={() => removeItem(item.id)} className='ml-2'>
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Upload Cover Image */}
      <div className='mb-6'>
        <p className='text-lg text-[#333333] font-medium mb-2'>
          Upload a Cover Image
        </p>
        <div className='flex items-center gap-6'>
          <div
            className='w-[200px] h-[200px] bg-[#CDCDCD] rounded-md flex flex-col items-center justify-center cursor-pointer'
            onClick={triggerFileInput}
          >
            {coverImage ? (
              <Image
                src={coverImage || "/placeholder.svg"}
                alt='Cover'
                width={150}
                height={120}
                className='w-full h-full object-cover rounded-md'
              />
            ) : (
              <>
                {/* <Upload className='text-gray-500 mb-1' size={24} /> */}
                <svg
                  width='24'
                  height='25'
                  viewBox='0 0 24 25'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M3.464 3.964C2 5.43 2 7.786 2 12.5C2 17.214 2 19.571 3.464 21.035C4.93 22.5 7.286 22.5 12 22.5C16.714 22.5 19.071 22.5 20.535 21.035C22 19.572 22 17.214 22 12.5C22 7.786 22 5.429 20.535 3.964C19.072 2.5 16.714 2.5 12 2.5C7.286 2.5 4.929 2.5 3.464 3.964ZM16 10.5C16.5304 10.5 17.0391 10.2893 17.4142 9.91421C17.7893 9.53914 18 9.03043 18 8.5C18 7.96957 17.7893 7.46086 17.4142 7.08579C17.0391 6.71071 16.5304 6.5 16 6.5C15.4696 6.5 14.9609 6.71071 14.5858 7.08579C14.2107 7.46086 14 7.96957 14 8.5C14 9.03043 14.2107 9.53914 14.5858 9.91421C14.9609 10.2893 15.4696 10.5 16 10.5ZM6.32 13.604C6.61988 13.3253 7.01786 13.1765 7.42705 13.1902C7.83624 13.2038 8.2234 13.3789 8.504 13.677L11.152 16.487C11.538 16.897 12.0613 17.1506 12.6223 17.1997C13.1833 17.2487 13.7427 17.0897 14.194 16.753C14.4911 16.532 14.8568 16.4231 15.2265 16.4456C15.5961 16.4681 15.9459 16.6206 16.214 16.876L18.482 19.042C18.6269 19.1731 18.8172 19.2426 19.0124 19.2355C19.2077 19.2284 19.3925 19.1454 19.5275 19.0042C19.6625 18.8629 19.7371 18.6745 19.7353 18.4791C19.7335 18.2838 19.6556 18.0968 19.518 17.958L17.25 15.79C16.7255 15.2898 16.0409 14.9913 15.3174 14.9474C14.5939 14.9035 13.8782 15.1169 13.297 15.55C13.1405 15.6665 12.9466 15.7215 12.7523 15.7043C12.5579 15.6872 12.3767 15.5991 12.243 15.457L9.596 12.647C9.04383 12.0609 8.28227 11.7169 7.47747 11.6901C6.67267 11.6633 5.88993 11.9559 5.3 12.504L4.49 13.256C4.34413 13.3913 4.25797 13.5789 4.25047 13.7777C4.24297 13.9765 4.31474 14.1701 4.45 14.316C4.58526 14.4619 4.77293 14.548 4.97172 14.5555C5.1705 14.563 5.36413 14.4913 5.51 14.356L6.32 13.604Z'
                    fill='#545454'
                  />
                </svg>

                <p className='text-xs text-[#545454] mt-3'>Upload Image</p>
              </>
            )}
            <input
              type='file'
              ref={fileInputRef}
              onChange={handleImageUpload}
              className='hidden'
              accept='image/*'
            />
          </div>

          {/* Bundle Preview */}
          <div className='mb-6'>
            <h2 className='text-2xl font-medium text-[#333333]'>Bundle Name</h2>
            <p className='text-sm text-[#333333]'>Bundle Description</p>
            <div className='flex items-center gap-3 mt-2'>
              <span className='font-semibold text-2xl text-[#333333]'>
                $ 00.00
              </span>
              <span className='line-through text-2xl text-[#D6D6D6]'>
                $ 00.00
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Form Fields */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
        <div>
          <label className='block text-sm font-medium mb-2'>Bundle Name</label>
          <input
            type='text'
            placeholder='Enter bundle name'
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400'
            value={bundleName}
            onChange={(e) => setBundleName(e.target.value)}
          />
        </div>
        <div>
          <label className='block text-sm font-medium mb-2'>
            Category Name
          </label>
          <input
            type='text'
            placeholder='Enter category name'
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400'
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </div>
      </div>

      <div className='mb-6'>
        <label className='block text-sm font-medium mb-2'>Description</label>
        <textarea
          placeholder='Description'
          rows={4}
          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-6'>
        <div>
          <label className='block text-sm font-medium mb-2'>Buying Price</label>
          <div className='relative'>
            <span className='absolute left-3 top-2'>$</span>
            <input
              type='number'
              placeholder='00.00'
              className='w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400'
              value={buyingPrice1}
              onChange={(e) => setBuyingPrice1(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label className='block text-sm font-medium mb-2'>Buying Price</label>
          <div className='relative'>
            <span className='absolute left-3 top-2'>$</span>
            <input
              type='number'
              placeholder='00.00'
              className='w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400'
              value={buyingPrice2}
              onChange={(e) => setBuyingPrice2(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label className='block text-sm font-medium mb-2'>
            Discount (If Applicable)
          </label>
          <input
            type='number'
            placeholder='E.g. 25% discount'
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400'
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />
        </div>
      </div>

      <div className='mb-8'>
        <label className='block text-sm font-medium mb-2'>
          Items In Bundle
        </label>
        <input
          type='text'
          placeholder='E.g 1 Table, 2 Chair, 1 Bed, 1 Coffee Table'
          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400'
          value={bundleItems}
          onChange={(e) => setBundleItems(e.target.value)}
        />
      </div>

      {/* Action Buttons */}
      <div className='flex justify-end gap-3'>
        <button className='px-5 py-2 border border-gray-300 rounded-md hover:bg-gray-50'>
          Cancel
        </button>
        <button className='px-5 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700'>
          Create Bundle
        </button>
      </div>
    </div>
  );
}
