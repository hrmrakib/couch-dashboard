"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, Edit, Trash, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ProductColor = "White" | "Black" | "Red";

type ProductVariant = {
  id: string;
  name: string;
  description: string;
  category: string;
  condition: string;
  rentPrice: string;
  buyPrice: string;
  image: string;
  color: ProductColor;
  isBaseVariant?: boolean;
  isEditing?: boolean;
};

export default function ProductVariantsManager() {
  const [variants, setVariants] = useState<ProductVariant[]>([
    {
      id: "base",
      name: "Playstations",
      description:
        "Buy one or a few to make any space more convenient. Lightweight and easy to move, these tables feature a removable tray top, perfect for serving snacks. Functional and stylish, they're ideal for adding versatility to your home.",
      category: "Chair",
      condition: "Good",
      rentPrice: "$32.54",
      buyPrice: "$32.54",
      image: "/product/1.png",
      color: "White",
      isBaseVariant: true,
    },
    {
      id: "variant-1",
      name: "Playstations",
      description:
        "Buy one or a few to make any space more convenient. Lightweight and easy to move, these tables feature a removable tray top, perfect for serving snacks. Functional and stylish, they're ideal for adding versatility to your home.",
      category: "Chair",
      condition: "Good",
      rentPrice: "$32.54",
      buyPrice: "$32.54",
      image: "/product/3.png",
      color: "White",
    },
  ]);

  const [newVariant, setNewVariant] = useState<ProductVariant>({
    id: "",
    name: "",
    description: "",
    category: "",
    condition: "",
    rentPrice: "",
    buyPrice: "",
    image: "/product/3.png",
    color: "White",
    isEditing: true,
  });

  const [showNewVariantForm, setShowNewVariantForm] = useState(false);
  const [variantCount, setVariantCount] = useState(1);

  const handleAddVariant = () => {
    setShowNewVariantForm(true);
    setNewVariant({
      id: `variant-${variantCount + 1}`,
      name: "",
      description: "",
      category: "",
      condition: "",
      rentPrice: "",
      buyPrice: "",
      image: "/chair3.jpg",
      color: "White",
      isEditing: true,
    });
  };

  const handleCancelNewVariant = () => {
    setShowNewVariantForm(false);
  };

  const handleSaveNewVariant = () => {
    if (!newVariant.name) {
      alert("Please provide at least a product name.");
      return;
    }

    // Add the new variant to the list
    const updatedVariant = {
      ...newVariant,
      isEditing: false,
      description: variants[0].description, // Copy description from base variant
    };

    setVariants([...variants, updatedVariant]);
    setVariantCount(variantCount + 1);
    setShowNewVariantForm(false);

    alert("Your product variant has been added successfully.");
  };

  const handleEditVariant = (id: string) => {
    setVariants(
      variants.map((variant) =>
        variant.id === id ? { ...variant, isEditing: true } : variant
      )
    );
  };

  const handleDeleteVariant = (id: string) => {
    setVariants(variants.filter((variant) => variant.id !== id));

    alert("The product variant has been removed.");
  };

  const handleUpdateVariant = (id: string) => {
    setVariants(
      variants.map((variant) =>
        variant.id === id ? { ...variant, isEditing: false } : variant
      )
    );

    alert({
      title: "Changes saved",
      description: "Your changes have been saved successfully.",
    });
  };

  const handleInputChange = (
    id: string,
    field: keyof ProductVariant,
    value: string
  ) => {
    if (id === "new") {
      setNewVariant({
        ...newVariant,
        [field]: value,
      });
    } else {
      setVariants(
        variants.map((variant) =>
          variant.id === id ? { ...variant, [field]: value } : variant
        )
      );
    }
  };

  const handleColorChange = (id: string, color: ProductColor) => {
    if (id === "new") {
      setNewVariant({
        ...newVariant,
        color,
      });
    } else {
      setVariants(
        variants.map((variant) =>
          variant.id === id ? { ...variant, color } : variant
        )
      );
    }
  };

  return (
    <div className='container mx-auto p-4'>
      <div className='mb-6 flex items-center'>
        <Button
          variant='ghost'
          size='icon'
          className='mr-2 h-8 w-8 cursor-pointer'
        >
          <ArrowLeft className='h-8 w-8' />
        </Button>
        <h1 className='text-[32px] text-[#101010] font-semibold'>Products</h1>
      </div>

      {/* Base Variant */}
      {variants
        .filter((v) => v.isBaseVariant)
        .map((variant) => (
          <div
            key={variant.id}
            className='border border-gray-200 rounded-lg p-6 mb-6'
          >
            <div className='flex flex-col md:flex-row gap-6'>
              <div className='bg-[#E3E3E3] w-full md:w-[140px] h-[180px] border border-[#D6D6D6] rounded-md flex-shrink-0 flex items-center justify-center'>
                <div className='relative h-32 w-32 mx-auto md:mx-0'>
                  <Image
                    src={variant.image || "/placeholder.svg"}
                    alt={variant.name}
                    fill
                    className='object-cover'
                  />
                </div>
              </div>

              <div className='flex-grow'>
                <div className='flex justify-between items-start mb-2'>
                  <div>
                    <div className='flex items-center gap-2'>
                      <h2 className='text-2xl font-semibold text-[#101010]'>
                        {variant.name}
                      </h2>
                      <span className='bg-[#1C538E29] text-[#101010] text-sm px-2 py-1 rounded-full'>
                        Base variant
                      </span>
                    </div>
                    <p className='text-sm text-[#5F5F5F] mt-1'>
                      {variant.description}
                    </p>
                  </div>
                  <div className='flex gap-2'>
                    <Button
                      variant='ghost'
                      size='icon'
                      onClick={() => handleEditVariant(variant.id)}
                    >
                      <Edit className='h-4 w-4' />
                    </Button>
                    <Button
                      variant='ghost'
                      size='icon'
                      className='text-red-500'
                    >
                      <Trash className='h-4 w-4' />
                    </Button>
                  </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
                  <div>
                    <p className='text-lg font-medium text-[#101010]'>
                      Category: {variant.category}
                    </p>
                  </div>
                  <div>
                    <p className='text-lg font-medium text-[#101010]'>
                      Condition: {variant.condition}
                    </p>
                  </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
                  <div>
                    <p className='text-xl font-medium text-[#101010]'>
                      Rent {variant.rentPrice}
                    </p>
                  </div>
                  <div>
                    <p className='text-xl font-medium text-[#101010]'>
                      Buy: {variant.buyPrice}
                    </p>
                  </div>
                </div>

                <div className='mt-4'>
                  <div className='flex items-center gap-2'>
                    <p className='text-sm text-[#545454]'>Product Color</p>
                    <RadioGroup value={variant.color} className='flex gap-2'>
                      <div className='flex items-center gap-1.5'>
                        <RadioGroupItem
                          value='White'
                          id={`${variant.id}-white`}
                          className='hidden'
                        />
                        <Label
                          htmlFor={`${variant.id}-white`}
                          className={`w-5 h-5 rounded-full border ${
                            variant.color === "White"
                              ? "ring-2 ring-black ring-offset-1"
                              : ""
                          }`}
                          style={{ backgroundColor: "white" }}
                        />
                      </div>
                      <div className='flex items-center gap-1.5'>
                        <RadioGroupItem
                          value='Black'
                          id={`${variant.id}-black`}
                          className='hidden'
                        />
                        <Label
                          htmlFor={`${variant.id}-black`}
                          className={`w-5 h-5 rounded-full border ${
                            variant.color === "Black"
                              ? "ring-2 ring-black ring-offset-1"
                              : ""
                          }`}
                          style={{ backgroundColor: "black" }}
                        />
                      </div>
                      <div className='flex items-center gap-1.5'>
                        <RadioGroupItem
                          value='Red'
                          id={`${variant.id}-red`}
                          className='hidden'
                        />
                        <Label
                          htmlFor={`${variant.id}-red`}
                          className={`w-5 h-5 rounded-full border ${
                            variant.color === "Red"
                              ? "ring-2 ring-black ring-offset-1"
                              : ""
                          }`}
                          style={{ backgroundColor: "red" }}
                        />
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

      {/* Other Variants Section */}
      <div className='mb-4 flex justify-between items-center'>
        <h2 className='text-lg font-medium'>Other Variants</h2>
        <p className='text-base text-[#545454] font-medium'>
          Total: {variants.filter((v) => !v.isBaseVariant).length}
        </p>
      </div>

      {/* Variant List */}
      {variants
        .filter((v) => !v.isBaseVariant)
        .map((variant) => (
          <div
            key={variant.id}
            className='border border-gray-200 rounded-lg p-6 mb-6'
          >
            {variant.isEditing ? (
              <div className='flex flex-col md:flex-row gap-6'>
                <div className='bg-[#E3E3E3] w-full md:w-[140px] h-[180px] border border-[#D6D6D6] rounded-md flex-shrink-0 flex items-center justify-center'>
                  <div className='relative h-32 w-32 mx-auto md:mx-0'>
                    <Image
                      src={variant.image || "/placeholder.svg"}
                      alt={variant.name}
                      fill
                      className='object-cover'
                    />
                  </div>
                </div>

                <div className='flex-grow'>
                  <div className='flex justify-between items-start mb-4'>
                    <h3 className='text-base font-medium'>{variant.id}</h3>
                    <div className='flex gap-2'>
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={() => handleEditVariant(variant.id)}
                      >
                        Cancel
                      </Button>
                      <Button
                        size='sm'
                        className='bg-black hover:bg-gray-800'
                        onClick={() => handleUpdateVariant(variant.id)}
                      >
                        Save Changes
                      </Button>
                    </div>
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-4'>
                    <div>
                      <Label
                        htmlFor={`${variant.id}-name`}
                        className='text-[#333333] text-base font-medium mb-1.5'
                      >
                        Product name
                      </Label>
                      <Input
                        id={`${variant.id}-name`}
                        value={variant.name}
                        onChange={(e) =>
                          handleInputChange(variant.id, "name", e.target.value)
                        }
                        placeholder='$00.00'
                      />
                    </div>

                    <div>
                      <Label
                        htmlFor={`${variant.id}-category`}
                        className='text-[#333333] text-base font-medium mb-1.5'
                      >
                        Category
                      </Label>
                      <Input
                        id={`${variant.id}-category`}
                        value={variant.category}
                        onChange={(e) =>
                          handleInputChange(
                            variant.id,
                            "category",
                            e.target.value
                          )
                        }
                        placeholder='Enter a brand name'
                      />
                    </div>

                    <div>
                      <Label
                        htmlFor={`${variant.id}-condition`}
                        className='text-[#333333] text-base font-medium mb-1.5'
                      >
                        Products Condition
                      </Label>
                      <Select
                        value={variant.condition}
                        onValueChange={(value) =>
                          handleInputChange(variant.id, "condition", value)
                        }
                      >
                        <SelectTrigger
                          id={`${variant.id}-condition`}
                          className='w-full h-14'
                        >
                          <SelectValue placeholder='Select condition' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='Good'>Good</SelectItem>
                          <SelectItem value='Fair'>Fair</SelectItem>
                          <SelectItem value='Poor'>Poor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                    <div>
                      <Label
                        htmlFor={`${variant.id}-buy-price`}
                        className='text-[#333333] text-base font-medium mb-1.5'
                      >
                        Price (for buying)
                      </Label>
                      <Input
                        id={`${variant.id}-buy-price`}
                        value={variant.buyPrice}
                        onChange={(e) =>
                          handleInputChange(
                            variant.id,
                            "buyPrice",
                            e.target.value
                          )
                        }
                        placeholder='$00.00'
                      />
                    </div>

                    <div>
                      <Label
                        htmlFor={`${variant.id}-rent-price`}
                        className='text-[#333333] text-base font-medium mb-1.5'
                      >
                        Rental Price
                      </Label>
                      <Input
                        id={`${variant.id}-rent-price`}
                        value={variant.rentPrice}
                        onChange={(e) =>
                          handleInputChange(
                            variant.id,
                            "rentPrice",
                            e.target.value
                          )
                        }
                        placeholder='$00.00'
                      />
                    </div>
                  </div>

                  <div>
                    <Label
                      htmlFor='new-color'
                      className='text-[#333333] text-base font-medium mb-1.5'
                    >
                      Product Color
                    </Label>
                    <RadioGroup
                      value={variant.color}
                      onValueChange={(value: string) =>
                        handleColorChange(variant.id, value as ProductColor)
                      }
                      className='flex gap-4 mt-2'
                    >
                      <div className='flex items-center gap-1.5'>
                        <RadioGroupItem
                          value='White'
                          id={`${variant.id}-edit-white`}
                        />
                        <Label
                          htmlFor={`${variant.id}-edit-white`}
                          className='text-[#333333] text-base font-medium'
                        >
                          White
                        </Label>
                      </div>
                      <div className='flex items-center gap-1.5'>
                        <RadioGroupItem
                          value='Black'
                          id={`${variant.id}-edit-black`}
                        />
                        <Label
                          htmlFor={`${variant.id}-edit-black`}
                          className='text-[#333333] text-base font-medium'
                        >
                          Black
                        </Label>
                      </div>
                      <div className='flex items-center gap-1.5'>
                        <RadioGroupItem
                          value='Red'
                          id={`${variant.id}-edit-red`}
                        />
                        <Label
                          htmlFor={`${variant.id}-edit-red`}
                          className='text-[#333333] text-base font-medium'
                        >
                          Red
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </div>
            ) : (
              <div className='flex flex-col md:flex-row gap-6'>
                <div className='bg-[#E3E3E3] w-full md:w-[140px] h-[180px] border border-[#D6D6D6] rounded-md flex-shrink-0 flex items-center justify-center'>
                  <div className='relative h-32 w-32 mx-auto md:mx-0'>
                    <Image
                      src={variant.image || "/placeholder.svg"}
                      alt={variant.name}
                      fill
                      className='object-cover'
                    />
                  </div>
                </div>

                <div className='flex-grow'>
                  <div className='flex justify-between items-start mb-2'>
                    <div>
                      <h2 className='text-xl font-semibold'>{variant.name}</h2>
                      <p className='text-sm text-gray-600 mt-1'>
                        {variant.description}
                      </p>
                    </div>
                    <div className='flex gap-2'>
                      <Button
                        variant='ghost'
                        size='icon'
                        onClick={() => handleEditVariant(variant.id)}
                      >
                        <Edit className='h-4 w-4' />
                      </Button>
                      <Button
                        variant='ghost'
                        size='icon'
                        className='text-red-500'
                        onClick={() => handleDeleteVariant(variant.id)}
                      >
                        <Trash className='h-4 w-4' />
                      </Button>
                    </div>
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
                    <div>
                      <p className='text-sm font-medium'>
                        Category: {variant.category}
                      </p>
                    </div>
                    <div>
                      <p className='text-sm font-medium'>
                        Condition: {variant.condition}
                      </p>
                    </div>
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
                    <div>
                      <p className='text-sm font-medium'>
                        Rent {variant.rentPrice}
                      </p>
                    </div>
                    <div>
                      <p className='text-sm font-medium'>
                        Buy: {variant.buyPrice}
                      </p>
                    </div>
                  </div>

                  <div className='mt-4'>
                    <div className='flex items-center gap-2'>
                      <p className='text-sm font-medium'>Product Color</p>
                      <RadioGroup value={variant.color} className='flex gap-2'>
                        <div className='flex items-center gap-1.5'>
                          <RadioGroupItem
                            value='White'
                            id={`${variant.id}-white`}
                            className='hidden'
                          />
                          <Label
                            htmlFor={`${variant.id}-white`}
                            className={`w-5 h-5 rounded-full border ${
                              variant.color === "White"
                                ? "ring-2 ring-black ring-offset-1"
                                : ""
                            }`}
                            style={{ backgroundColor: "white" }}
                          />
                        </div>
                        <div className='flex items-center gap-1.5'>
                          <RadioGroupItem
                            value='Black'
                            id={`${variant.id}-black`}
                            className='hidden'
                          />
                          <Label
                            htmlFor={`${variant.id}-black`}
                            className={`w-5 h-5 rounded-full border ${
                              variant.color === "Black"
                                ? "ring-2 ring-black ring-offset-1"
                                : ""
                            }`}
                            style={{ backgroundColor: "black" }}
                          />
                        </div>
                        <div className='flex items-center gap-1.5'>
                          <RadioGroupItem
                            value='Red'
                            id={`${variant.id}-red`}
                            className='hidden'
                          />
                          <Label
                            htmlFor={`${variant.id}-red`}
                            className={`w-5 h-5 rounded-full border ${
                              variant.color === "Red"
                                ? "ring-2 ring-black ring-offset-1"
                                : ""
                            }`}
                            style={{ backgroundColor: "red" }}
                          />
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

      {/* New Variant Form */}
      {showNewVariantForm && (
        <div className='border border-gray-200 rounded-lg p-6 mb-6'>
          <div className='flex flex-col md:flex-row gap-6'>
            <div className='w-full md:w-32 flex-shrink-0'>
              <div className='relative h-32 w-32 mx-auto md:mx-0'>
                <Image
                  src={newVariant.image || "/placeholder.svg"}
                  alt='New variant'
                  fill
                  className='object-cover'
                />
              </div>
            </div>

            <div className='flex-grow'>
              <div className='flex justify-between items-start mb-4'>
                <h3 className='text-base font-medium'>
                  Variant-{variantCount + 1}
                </h3>
                <div className='flex gap-2'>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={handleCancelNewVariant}
                  >
                    Cancel
                  </Button>
                  <Button
                    size='sm'
                    className='bg-black hover:bg-gray-800'
                    onClick={handleSaveNewVariant}
                  >
                    Save Changes
                  </Button>
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                <div>
                  <Label
                    htmlFor='new-name'
                    className='text-[#333333] text-base font-medium mb-1.5'
                  >
                    Product name
                  </Label>
                  <Input
                    id='new-name'
                    value={newVariant.name}
                    onChange={(e) =>
                      handleInputChange("new", "name", e.target.value)
                    }
                    placeholder='$00.00'
                  />
                </div>

                <div>
                  <Label
                    htmlFor='new-category'
                    className='text-[#333333] text-base font-medium mb-1.5'
                  >
                    Category
                  </Label>
                  <Input
                    id='new-category'
                    value={newVariant.category}
                    onChange={(e) =>
                      handleInputChange("new", "category", e.target.value)
                    }
                    placeholder='Enter a brand name'
                  />
                </div>
              </div>

              <div className='mb-4'>
                <Label
                  htmlFor='new-condition'
                  className='text-[#333333] text-base font-medium mb-1.5'
                >
                  products Condition
                </Label>
                <Select
                  value={newVariant.condition}
                  onValueChange={(value) =>
                    handleInputChange("new", "condition", value)
                  }
                >
                  <SelectTrigger id='new-condition'>
                    <SelectValue placeholder='Select condition' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='Good'>Good</SelectItem>
                    <SelectItem value='Fair'>Fair</SelectItem>
                    <SelectItem value='Poor'>Poor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                <div>
                  <Label
                    htmlFor='new-buy-price'
                    className='text-[#333333] text-base font-medium mb-1.5'
                  >
                    Price (for buying)
                  </Label>
                  <Input
                    id='new-buy-price'
                    value={newVariant.buyPrice}
                    onChange={(e) =>
                      handleInputChange("new", "buyPrice", e.target.value)
                    }
                    placeholder='$00.00'
                  />
                </div>

                <div>
                  <Label
                    htmlFor='new-rent-price'
                    className='text-[#333333] text-base font-medium mb-1.5'
                  >
                    Rental Price
                  </Label>
                  <Input
                    id='new-rent-price'
                    value={newVariant.rentPrice}
                    onChange={(e) =>
                      handleInputChange("new", "rentPrice", e.target.value)
                    }
                    placeholder='$00.00'
                  />
                </div>
              </div>

              <div>
                <Label
                  htmlFor='new-color'
                  className='text-[#333333] text-base font-medium mb-1.5'
                >
                  Product Color
                </Label>
                <RadioGroup
                  value={newVariant.color}
                  onValueChange={(value: string) =>
                    handleColorChange("new", value as ProductColor)
                  }
                  className='flex gap-4 mt-2'
                >
                  <div className='flex items-center gap-1.5'>
                    <RadioGroupItem value='White' id='new-white' />
                    <Label
                      htmlFor='new-white'
                      className='text-[#333333] text-base font-medium'
                    >
                      White
                    </Label>
                  </div>
                  <div className='flex items-center gap-1.5'>
                    <RadioGroupItem value='Black' id='new-black' />
                    <Label
                      htmlFor='new-black'
                      className='text-[#333333] text-base font-medium'
                    >
                      Black
                    </Label>
                  </div>
                  <div className='flex items-center gap-1.5'>
                    <RadioGroupItem value='Red' id='new-red' />
                    <Label
                      htmlFor='new-red'
                      className='text-[#333333] text-base font-medium'
                    >
                      Red
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add New Button */}
      <div className='border border-dashed border-gray-300 rounded-lg p-4 flex justify-center items-center'>
        <Button
          variant='ghost'
          className='flex items-center gap-2 text-gray-500'
          onClick={handleAddVariant}
        >
          <Plus className='h-4 w-4' />
          Add New
        </Button>
      </div>
    </div>
  );
}
