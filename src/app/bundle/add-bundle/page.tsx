"use client";

import { useState, useRef, type ChangeEvent } from "react";
import Image from "next/image";
import { X, Upload } from "lucide-react";

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
        <p className='text-sm font-medium mb-2'>Upload a Cover Image</p>
        <div
          className='w-[150px] h-[120px] bg-gray-100 rounded-md flex flex-col items-center justify-center cursor-pointer'
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
              <Upload className='text-gray-500 mb-1' size={24} />
              <p className='text-xs text-gray-500'>Upload Image</p>
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
      </div>

      {/* Bundle Preview */}
      <div className='mb-6'>
        <h2 className='text-xl font-medium text-gray-700'>Bundle Name</h2>
        <p className='text-sm text-gray-500'>Bundle Description</p>
        <div className='flex items-center gap-3 mt-2'>
          <span className='font-medium'>$ 00.00</span>
          <span className='text-gray-400 line-through'>$ 00.00</span>
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
              type='text'
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
              type='text'
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
            type='text'
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
