"use client";

/**
 * TODO: Next Steps
 * 1. Add form validation using react-hook-form or zod
 * 2. Implement image upload to cloud storage (e.g., AWS S3)
 * 3. Add loading states for form submission
 * 4. Implement error handling for API calls
 * 5. Add success/error toast notifications
 * 6. Add form reset functionality
 * 7. Implement image preview with zoom functionality
 * 8. Add product variant management
 */

import { useState, useRef, type ChangeEvent, type FormEvent } from "react";
import Image from "next/image";
import { ArrowLeft, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type ProductFormData = {
  name: string;
  category: string;
  roomType: string;
  stock: string;
  size: string;
  materials: string;
  height: string;
  width: string;
  length: string;
  description: string;
  buyingPrice: string;
  rentalPrice: string;
};

export default function AddProductForm() {
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    category: "",
    roomType: "",
    stock: "",
    size: "",
    materials: "",
    height: "",
    width: "",
    length: "",
    description: "",
    buyingPrice: "",
    rentalPrice: "",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    setUploading(true);

    const newImages: string[] = [];
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          newImages.push(event.target.result as string);

          // If we've processed all files, update state
          if (newImages.length === files.length) {
            setImages((prev) => [...prev, ...newImages]);
            setUploading(false);
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!formData.name || !formData.buyingPrice || images.length === 0) {
      alert({
        title: "Missing required fields",
        description:
          "Please fill in all required fields and upload at least one image.",
        variant: "destructive",
      });
      return;
    }

    // Combine form data with images
    const productData = {
      ...formData,
      images,
    };

    // Log the data (in a real app, you would send this to an API)
    console.log("Product data:", productData);

    alert({
      title: "Product saved",
      description: "Your product has been saved successfully.",
    });
  };

  return (
    <div className='container mx-auto p-4'>
      <div className='mb-6 flex items-center'>
        <Button variant='ghost' size='icon' className='mr-2'>
          <ArrowLeft className='h-5 w-5' />
        </Button>
        <h1 className='text-xl font-semibold'>Products</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className='bg-white rounded-lg border border-gray-200 p-6'
      >
        {/* Image Upload Section */}
        <div className='flex flex-wrap gap-4 mb-8'>
          <div
            className='w-[100px] h-[100px] bg-gray-100 flex flex-col items-center justify-center cursor-pointer border border-gray-200 rounded-md'
            onClick={triggerFileInput}
          >
            <input
              type='file'
              ref={fileInputRef}
              className='hidden'
              accept='image/*'
              multiple
              onChange={handleImageUpload}
            />
            <Plus className='h-5 w-5 text-gray-400 mb-1' />
            <span className='text-xs text-gray-500'>Upload Image</span>
          </div>

          {images.map((image, index) => (
            <div
              key={index}
              className='relative w-[100px] h-[100px] border border-gray-200 rounded-md overflow-hidden'
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`Product image ${index + 1}`}
                fill
                className='object-cover'
              />
              <button
                type='button'
                className='absolute top-1 right-1 bg-black rounded-full p-1'
                onClick={() => handleRemoveImage(index)}
              >
                <X className='h-3 w-3 text-white' />
              </button>
            </div>
          ))}

          {uploading && (
            <div className='w-[100px] h-[100px] bg-gray-100 flex items-center justify-center border border-gray-200 rounded-md'>
              <span className='text-xs text-gray-500'>Uploading...</span>
            </div>
          )}
        </div>

        {/* Product Name and Description Preview */}
        <div className='mb-8'>
          <h2 className='text-xl font-medium text-[#333333] mb-2'>
            {formData.name || "Product Name"}
          </h2>
          <p className='text-sm text-gray-400 mt-1'>
            {formData.description || "Product Description"}
          </p>
          <p className='text-lg font-light text-gray-400 mt-2'>
            $ {formData.buyingPrice || "00.00"}
          </p>
        </div>

        {/* Form Fields */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
          <div>
            <Label
              htmlFor='name'
              className='text-[#333333] text-base font-medium mb-1.5'
            >
              Product Name
            </Label>
            <input
              id='name'
              name='name'
              placeholder='Enter a name'
              value={formData.name}
              onChange={handleInputChange}
              className='py-2 px-2 text-xl border border-gray-200 rounded-md placeholder:text-[#545454] placeholder:text-base tracking-wide'
            />
          </div>

          <div>
            <Label
              htmlFor='category'
              className='text-[#333333] text-base font-medium mb-1.5'
            >
              Category
            </Label>
            <Input
              id='category'
              name='category'
              placeholder='Enter category name'
              value={formData.category}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label
              htmlFor='roomType'
              className='text-[#333333] text-base font-medium mb-1.5'
            >
              Room Type
            </Label>
            <Input
              id='roomType'
              name='roomType'
              placeholder='Enter room type'
              value={formData.roomType}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label
              htmlFor='stock'
              className='text-[#333333] text-base font-medium mb-1.5'
            >
              Stock
            </Label>
            <Input
              id='stock'
              name='stock'
              type='number'
              placeholder='Enter category name'
              value={formData.stock}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label
              htmlFor='size'
              className='text-[#333333] text-base font-medium mb-1.5'
            >
              Size
            </Label>
            <Input
              id='size'
              name='size'
              type='number'
              placeholder='Enter room type'
              value={formData.size}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label
              htmlFor='materials'
              className='text-[#333333] text-base font-medium mb-1.5'
            >
              Materials
            </Label>
            <Input
              id='materials'
              name='materials'
              type='number'
              placeholder='Enter category name'
              value={formData.materials}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Dimensions Row */}
        <div className='grid grid-cols-3 gap-6 mb-6'>
          <div>
            <Label
              htmlFor='height'
              className='text-[#333333] text-base font-medium mb-1.5'
            >
              Hight
            </Label>
            <Input
              id='height'
              name='height'
              type='number'
              placeholder='Enter room type'
              value={formData.height}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label
              htmlFor='width'
              className='text-[#333333] text-base font-medium mb-1.5'
            >
              With
            </Label>
            <Input
              id='width'
              name='width'
              type='number'
              placeholder='Enter room type'
              value={formData.width}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label
              htmlFor='length'
              className='text-[#333333] text-base font-medium mb-1.5'
            >
              Length
            </Label>
            <Input
              id='length'
              name='length'
              type='number'
              placeholder='Enter category name'
              value={formData.length}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Description */}
        <div className='mb-6'>
          <Label
            htmlFor='description'
            className='text-[#333333] text-base font-medium mb-1.5'
          >
            Product Description
          </Label>
          <Textarea
            id='description'
            name='description'
            placeholder='Enter a description'
            className='min-h-[120px]'
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>

        {/* Pricing */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
          <div>
            <Label
              htmlFor='buyingPrice'
              className='text-[#333333] text-base font-medium mb-1.5'
            >
              Price (For Buying)
            </Label>
            <Input
              id='buyingPrice'
              name='buyingPrice'
              type='number'
              placeholder='$00.00'
              value={formData.buyingPrice}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label
              htmlFor='rentalPrice'
              className='text-[#333333] text-base font-medium mb-1.5'
            >
              Rental Price (Optional)
            </Label>
            <Input
              id='rentalPrice'
              name='rentalPrice'
              type='number'
              placeholder='$00.00'
              value={formData.rentalPrice}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className='flex justify-end gap-4'>
          <Button type='button' variant='outline' className='border-gray-300'>
            Add Variant
          </Button>

          <Button type='submit' className='bg-black hover:bg-gray-800'>
            Save Product
          </Button>
        </div>
      </form>
    </div>
  );
}
