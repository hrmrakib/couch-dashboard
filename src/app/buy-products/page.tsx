"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import ProductCard from "@/components/buy-product/ProductCard";
import ProductDetailModal from "@/components/buy-product/ProductDetailModal";
import FilterTabs from "@/components/buy-product/FilterTab";
import Pagination from "@/components/buy-product/Pagination";
import type { Product, ProductStatus } from "@/lib/types";

// Mock data for products
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Wooden Sofa",
    price: 150,
    image: "/product/1.png",
    seller: {
      name: "Seller Name",
      date: "9 Jun 2024",
      accountNumber: "0000 0000 0000 0000",
      phone: "000 0000 0000 0000",
      email: "debra.holt@example.com",
    },
    status: "pending",
    details: {
      model: "Xbox",
      storage: "256Gb",
      condition: "Good",
      controller: 0,
    },
  },
  {
    id: "2",
    name: "Wooden Sofa",
    price: 150,
    image: "/product/2.png",
    seller: {
      name: "Seller Name",
      date: "9 Jun 2024",
      accountNumber: "0000 0000 0000 0000",
      phone: "000 0000 0000 0000",
      email: "debra.holt@example.com",
    },
    status: "cancel",
    details: {
      model: "Xbox",
      storage: "256Gb",
      condition: "Good",
      controller: 0,
    },
  },
  {
    id: "3",
    name: "Wooden Sofa",
    price: 150,
    image: "/product/3.png",
    seller: {
      name: "Seller Name",
      date: "9 Jun 2024",
      accountNumber: "0000 0000 0000 0000",
      phone: "000 0000 0000 0000",
      email: "debra.holt@example.com",
    },
    status: "pending",
    details: {
      model: "Xbox",
      storage: "256Gb",
      condition: "Good",
      controller: 0,
    },
  },
  {
    id: "4",
    name: "Wooden Sofa",
    price: 150,
    image: "/product/4.png",
    seller: {
      name: "Seller Name",
      date: "9 Jun 2024",
      accountNumber: "0000 0000 0000 0000",
      phone: "000 0000 0000 0000",
      email: "debra.holt@example.com",
    },
    status: "confirm",
    details: {
      model: "Xbox",
      storage: "256Gb",
      condition: "Good",
      controller: 0,
    },
  },
  {
    id: "5",
    name: "Wooden Sofa",
    price: 150,
    image: "/product/5.png",
    seller: {
      name: "Seller Name",
      date: "9 Jun 2024",
      accountNumber: "0000 0000 0000 0000",
      phone: "000 0000 0000 0000",
      email: "debra.holt@example.com",
    },
    status: "confirm",
    details: {
      model: "Xbox",
      storage: "256Gb",
      condition: "Good",
      controller: 0,
    },
  },
  {
    id: "6",
    name: "Wooden Sofa",
    price: 150,
    image: "/product/6.png",
    seller: {
      name: "Seller Name",
      date: "9 Jun 2024",
      accountNumber: "0000 0000 0000 0000",
      phone: "000 0000 0000 0000",
      email: "debra.holt@example.com",
    },
    status: "cancel",
    details: {
      model: "Xbox",
      storage: "256Gb",
      condition: "Good",
      controller: 0,
    },
  },
  {
    id: "7",
    name: "Wooden Sofa",
    price: 150,
    image: "/product/7.png",
    seller: {
      name: "Seller Name",
      date: "9 Jun 2024",
      accountNumber: "0000 0000 0000 0000",
      phone: "000 0000 0000 0000",
      email: "debra.holt@example.com",
    },
    status: "pending",
    details: {
      model: "Xbox",
      storage: "256Gb",
      condition: "Good",
      controller: 0,
    },
  },
  {
    id: "8",
    name: "Wooden Sofa",
    price: 150,
    image: "/product/8.png",
    seller: {
      name: "Seller Name",
      date: "9 Jun 2024",
      accountNumber: "0000 0000 0000 0000",
      phone: "000 0000 0000 0000",
      email: "debra.holt@example.com",
    },
    status: "cancel",
    details: {
      model: "Xbox",
      storage: "256Gb",
      condition: "Good",
      controller: 0,
    },
  },
  {
    id: "9",
    name: "Wooden Sofa",
    price: 150,
    image: "/product/9.png",
    seller: {
      name: "Seller Name",
      date: "9 Jun 2024",
      accountNumber: "0000 0000 0000 0000",
      phone: "000 0000 0000 0000",
      email: "debra.holt@example.com",
    },
    status: "cancel",
    details: {
      model: "Xbox",
      storage: "256Gb",
      condition: "Good",
      controller: 0,
    },
  },
  {
    id: "10",
    name: "Wooden Sofa",
    price: 150,
    image: "/product/10.png",
    seller: {
      name: "Seller Name",
      date: "9 Jun 2024",
      accountNumber: "0000 0000 0000 0000",
      phone: "000 0000 0000 0000",
      email: "debra.holt@example.com",
    },
    status: "pending",
    details: {
      model: "Xbox",
      storage: "256Gb",
      condition: "Good",
      controller: 0,
    },
  },
  {
    id: "11",
    name: "Wooden Sofa",
    price: 150,
    image: "/product/11.png",
    seller: {
      name: "Seller Name",
      date: "9 Jun 2024",
      accountNumber: "0000 0000 0000 0000",
      phone: "000 0000 0000 0000",
      email: "debra.holt@example.com",
    },
    status: "confirm",
    details: {
      model: "Xbox",
      storage: "256Gb",
      condition: "Good",
      controller: 0,
    },
  },
  {
    id: "12",
    name: "Wooden Sofa",
    price: 150,
    image: "/product/12.png",
    seller: {
      name: "Seller Name",
      date: "9 Jun 2024",
      accountNumber: "0000 0000 0000 0000",
      phone: "000 0000 0000 0000",
      email: "debra.holt@example.com",
    },
    status: "pending",
    details: {
      model: "Xbox",
      storage: "256Gb",
      condition: "Good",
      controller: 0,
    },
  },
];

export default function Home() {
  const [selectedTab, setSelectedTab] = useState<ProductStatus | "all">("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<Product[]>(mockProducts);

  const itemsPerPage = 12;

  // Filter products based on selected tab
  const filteredProducts =
    selectedTab === "all"
      ? products
      : products.filter((product) => product.status === selectedTab);

  // Calculate pagination
  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentItems = filteredProducts.slice(startIndex, endIndex);

  // Handle product status change
  const handleStatusChange = (productId: string, newStatus: ProductStatus) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, status: newStatus } : product
      )
    );

    if (selectedProduct && selectedProduct.id === productId) {
      setSelectedProduct({ ...selectedProduct, status: newStatus });
    }
  };

  // Open product detail modal
  const handleOpenModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // Close product detail modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <main className='min-h-screen bg-gray-100'>
      <div className='container mx-auto px-4 py-6'>
        {/* Header */}
        <div className='flex items-center mb-6'>
          <button className='flex items-center text-gray-800 font-medium'>
            <ArrowLeft className='mr-2 h-5 w-5' />
            Buy Product
          </button>
        </div>

        {/* Filter tabs and total count */}
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6'>
          <FilterTabs
            selectedTab={selectedTab}
            onSelectTab={setSelectedTab}
            counts={{
              all: products.length,
              pending: products.filter((p) => p.status === "pending").length,
              confirm: products.filter((p) => p.status === "confirm").length,
              cancel: products.filter((p) => p.status === "cancel").length,
            }}
          />
          <div className='text-base mt-2 sm:mt-0 text-[#545454]'>
            Total:{" "}
            <span className='text-lg text-[#171717] font-medium'>
              {totalItems}
            </span>
          </div>
        </div>

        {/* Product grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {currentItems.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetails={() => handleOpenModal(product)}
            />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className='mt-8 flex justify-center'>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}

        {/* Product detail modal */}
        {selectedProduct && (
          <ProductDetailModal
            product={selectedProduct}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onStatusChange={(newStatus) =>
              handleStatusChange(selectedProduct.id, newStatus)
            }
          />
        )}
      </div>
    </main>
  );
}
