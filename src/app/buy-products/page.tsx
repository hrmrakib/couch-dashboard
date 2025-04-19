// "use client";

// import { useState } from "react";
// import { ArrowLeft } from "lucide-react";
// import ProductCard from "@/components/buy-product/ProductCard";
// import ProductDetailModal from "@/components/buy-product/ProductDetailModal";
// import FilterTabs from "@/components/buy-product/FilterTab";
// import Pagination from "@/components/buy-product/Pagination";
// import type { Product, ProductStatus } from "@/lib/types";
// import { useBuyProductsGetQuery } from "@/redux/features/buyProducts/buyProductsApi";

// // Mock data for products
// const mockProducts: Product[] = [
//   {
//     id: "1",
//     name: "Wooden Sofa",
//     price: 150,
//     image: "/product/1.png",
//     seller: {
//       name: "Seller Name",
//       date: "9 Jun 2024",
//       accountNumber: "0000 0000 0000 0000",
//       phone: "000 0000 0000 0000",
//       email: "debra.holt@example.com",
//     },
//     status: "pending",
//     details: {
//       model: "Xbox",
//       storage: "256Gb",
//       condition: "Good",
//       controller: 0,
//     },
//   },
//   {
//     id: "2",
//     name: "Wooden Sofa",
//     price: 150,
//     image: "/product/2.png",
//     seller: {
//       name: "Seller Name",
//       date: "9 Jun 2024",
//       accountNumber: "0000 0000 0000 0000",
//       phone: "000 0000 0000 0000",
//       email: "debra.holt@example.com",
//     },
//     status: "cancel",
//     details: {
//       model: "Xbox",
//       storage: "256Gb",
//       condition: "Good",
//       controller: 0,
//     },
//   },
//   {
//     id: "3",
//     name: "Wooden Sofa",
//     price: 150,
//     image: "/product/3.png",
//     seller: {
//       name: "Seller Name",
//       date: "9 Jun 2024",
//       accountNumber: "0000 0000 0000 0000",
//       phone: "000 0000 0000 0000",
//       email: "debra.holt@example.com",
//     },
//     status: "pending",
//     details: {
//       model: "Xbox",
//       storage: "256Gb",
//       condition: "Good",
//       controller: 0,
//     },
//   },
//   {
//     id: "4",
//     name: "Wooden Sofa",
//     price: 150,
//     image: "/product/4.png",
//     seller: {
//       name: "Seller Name",
//       date: "9 Jun 2024",
//       accountNumber: "0000 0000 0000 0000",
//       phone: "000 0000 0000 0000",
//       email: "debra.holt@example.com",
//     },
//     status: "success",
//     details: {
//       model: "Xbox",
//       storage: "256Gb",
//       condition: "Good",
//       controller: 0,
//     },
//   },
//   {
//     id: "5",
//     name: "Wooden Sofa",
//     price: 150,
//     image: "/product/5.png",
//     seller: {
//       name: "Seller Name",
//       date: "9 Jun 2024",
//       accountNumber: "0000 0000 0000 0000",
//       phone: "000 0000 0000 0000",
//       email: "debra.holt@example.com",
//     },
//     status: "success",
//     details: {
//       model: "Xbox",
//       storage: "256Gb",
//       condition: "Good",
//       controller: 0,
//     },
//   },
//   {
//     id: "6",
//     name: "Wooden Sofa",
//     price: 150,
//     image: "/product/6.png",
//     seller: {
//       name: "Seller Name",
//       date: "9 Jun 2024",
//       accountNumber: "0000 0000 0000 0000",
//       phone: "000 0000 0000 0000",
//       email: "debra.holt@example.com",
//     },
//     status: "cancel",
//     details: {
//       model: "Xbox",
//       storage: "256Gb",
//       condition: "Good",
//       controller: 0,
//     },
//   },
//   {
//     id: "7",
//     name: "Wooden Sofa",
//     price: 150,
//     image: "/product/7.png",
//     seller: {
//       name: "Seller Name",
//       date: "9 Jun 2024",
//       accountNumber: "0000 0000 0000 0000",
//       phone: "000 0000 0000 0000",
//       email: "debra.holt@example.com",
//     },
//     status: "pending",
//     details: {
//       model: "Xbox",
//       storage: "256Gb",
//       condition: "Good",
//       controller: 0,
//     },
//   },
//   {
//     id: "8",
//     name: "Wooden Sofa",
//     price: 150,
//     image: "/product/8.png",
//     seller: {
//       name: "Seller Name",
//       date: "9 Jun 2024",
//       accountNumber: "0000 0000 0000 0000",
//       phone: "000 0000 0000 0000",
//       email: "debra.holt@example.com",
//     },
//     status: "cancel",
//     details: {
//       model: "Xbox",
//       storage: "256Gb",
//       condition: "Good",
//       controller: 0,
//     },
//   },
//   {
//     id: "9",
//     name: "Wooden Sofa",
//     price: 150,
//     image: "/product/9.png",
//     seller: {
//       name: "Seller Name",
//       date: "9 Jun 2024",
//       accountNumber: "0000 0000 0000 0000",
//       phone: "000 0000 0000 0000",
//       email: "debra.holt@example.com",
//     },
//     status: "cancel",
//     details: {
//       model: "Xbox",
//       storage: "256Gb",
//       condition: "Good",
//       controller: 0,
//     },
//   },
//   {
//     id: "10",
//     name: "Wooden Sofa",
//     price: 150,
//     image: "/product/10.png",
//     seller: {
//       name: "Seller Name",
//       date: "9 Jun 2024",
//       accountNumber: "0000 0000 0000 0000",
//       phone: "000 0000 0000 0000",
//       email: "debra.holt@example.com",
//     },
//     status: "pending",
//     details: {
//       model: "Xbox",
//       storage: "256Gb",
//       condition: "Good",
//       controller: 0,
//     },
//   },
//   {
//     id: "11",
//     name: "Wooden Sofa",
//     price: 150,
//     image: "/product/11.png",
//     seller: {
//       name: "Seller Name",
//       date: "9 Jun 2024",
//       accountNumber: "0000 0000 0000 0000",
//       phone: "000 0000 0000 0000",
//       email: "debra.holt@example.com",
//     },
//     status: "success",
//     details: {
//       model: "Xbox",
//       storage: "256Gb",
//       condition: "Good",
//       controller: 0,
//     },
//   },
//   {
//     id: "12",
//     name: "Wooden Sofa",
//     price: 150,
//     image: "/product/12.png",
//     seller: {
//       name: "Seller Name",
//       date: "9 Jun 2024",
//       accountNumber: "0000 0000 0000 0000",
//       phone: "000 0000 0000 0000",
//       email: "debra.holt@example.com",
//     },
//     status: "pending",
//     details: {
//       model: "Xbox",
//       storage: "256Gb",
//       condition: "Good",
//       controller: 0,
//     },
//   },
// ];

// export default function Home() {
//   const [selectedTab, setSelectedTab] = useState<ProductStatus | "all">("all");
//   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [products, setProducts] = useState<Product[]>(mockProducts);

//   const {data} = useBuyProductsGetQuery(undefined)
//   console.log(data?.data)

//   const itemsPerPage = 12;

//   // Filter products based on selected tab
//   const filteredProducts =
//     selectedTab === "all"
//       ? products
//       : products.filter((product) => product.status === selectedTab);

//   // Calculate pagination
//   const totalItems = filteredProducts.length;
//   const totalPages = Math.ceil(totalItems / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
//   const currentItems = filteredProducts.slice(startIndex, endIndex);

//   // Handle product status change
//   const handleStatusChange = (productId: string, newStatus: ProductStatus) => {
//     setProducts((prevProducts) =>
//       prevProducts.map((product) =>
//         product.id === productId ? { ...product, status: newStatus } : product
//       )
//     );

//     if (selectedProduct && selectedProduct.id === productId) {
//       setSelectedProduct({ ...selectedProduct, status: newStatus });
//     }
//   };

//   // Open product detail modal
//   const handleOpenModal = (product: Product) => {
//     setSelectedProduct(product);
//     setIsModalOpen(true);
//   };

//   // Close product detail modal
//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setSelectedProduct(null);
//   };

//   return (
//     <main className='min-h-screen bg-gray-100'>
//       <div className='container mx-auto px-4 py-6'>
//         {/* Header */}
//         <div className='flex items-center mb-6'>
//           <button className='flex items-center text-gray-800 font-medium'>
//             <ArrowLeft className='mr-2 h-5 w-5' />
//             Buy Product
//           </button>
//         </div>

//         {/* Filter tabs and total count */}
//         <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6'>
//           <FilterTabs
//             selectedTab={selectedTab}
//             onSelectTab={setSelectedTab}
//             counts={{
//               all: products.length,
//               pending: products.filter((p) => p.status === "pending").length,
//               success: products.filter((p) => p.status === "success").length,
//               cancel: products.filter((p) => p.status === "cancel").length,
//             }}
//           />
//           <div className='text-base mt-2 sm:mt-0 text-[#545454]'>
//             Total:{" "}
//             <span className='text-lg text-[#171717] font-medium'>
//               {totalItems}
//             </span>
//           </div>
//         </div>

//         {/* Product grid */}
//         <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
//           {currentItems.map((product) => (
//             <ProductCard
//               key={product.id}
//               product={product}
//               onViewDetails={() => handleOpenModal(product)}
//             />
//           ))}
//         </div>

//         {/* Pagination */}
//         {totalPages > 1 && (
//           <div className='mt-8 flex justify-center'>
//             <Pagination
//               currentPage={currentPage}
//               totalPages={totalPages}
//               onPageChange={setCurrentPage}
//             />
//           </div>
//         )}

//         {/* Product detail modal */}
//         {selectedProduct && (
//           <ProductDetailModal
//             product={selectedProduct}
//             isOpen={isModalOpen}
//             onClose={handleCloseModal}
//             onStatusChange={(newStatus) =>
//               handleStatusChange(selectedProduct.id, newStatus)
//             }
//           />
//         )}
//       </div>
//     </main>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import ProductCard from "@/components/buy-product/ProductCard";
import ProductDetailModal from "@/components/buy-product/ProductDetailModal";
import Pagination from "@/components/buy-product/Pagination";
import type { Product } from "@/lib/types";
import { useBuyProductsGetQuery } from "@/redux/features/buyProducts/buyProductsApi";
export type ProductStatus = "pending" | "cancel" | "success";

interface ApiProduct {
  _id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  seller: {
    name: string;
    contact: string;
  };
  createdAt: string;
  state: ProductStatus;
  category: string;
  condition: string;
}


const transformApiDataToProduct = (apiProduct: ApiProduct): Product => ({
  id: apiProduct._id,
  name: apiProduct.name,
  price: apiProduct.price,
  image: apiProduct.images[0],
  seller: {
    name: apiProduct.seller.name,
    date: new Date(apiProduct.createdAt).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
    accountNumber: "0000 0000 0000 0000",
    phone: apiProduct.seller.contact,
    email: "seller@example.com",
  },
  status: apiProduct.state as ProductStatus,
  details: {
    model: apiProduct.category,
    storage: "N/A",
    condition: apiProduct.condition,
    controller: 0,
  },
  description: apiProduct.description,
});

export default function Home() {
  const [selectedTab, setSelectedTab] = useState<ProductStatus | "all">("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);

  const { data, isLoading, isError } = useBuyProductsGetQuery(undefined);

  useEffect(() => {
    if (data?.data) {
      const transformedProducts = data.data.map(transformApiDataToProduct);
      setProducts(transformedProducts);
    }
  }, [data]);

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

  // Count products for each status
  const counts = {
    all: products.length,
    pending: products.filter((p) => p.status === "pending").length,
    success: products.filter((p) => p.status === "success").length,
    cancel: products.filter((p) => p.status === "cancel").length,
  };

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

  // Tabs configuration
  const tabs = [
    { id: "all", label: "All", count: counts.all },
    { id: "pending", label: "Pending", count: counts.pending },
    { id: "success", label: "Success", count: counts.success },
    { id: "cancel", label: "Cancel", count: counts.cancel },
  ];


  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-100">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="min-h-screen bg-gray-100">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-center items-center h-64">
            <p className="text-red-500">
              Error loading products. Please try again later.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button className="flex items-center text-gray-800 font-medium">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Buy Product
          </button>
        </div>

        {/* Filter tabs and total count */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div className="flex space-x-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as ProductStatus | "all")}
                className={cn(
                  "px-4 py-1.5 rounded-full text-sm font-medium transition-colors flex items-center gap-1",
                  selectedTab === tab.id
                    ? tab.id === "all"
                      ? "bg-gray-800 text-white"
                      : tab.id === "pending"
                      ? "bg-blue-100 text-blue-600"
                      : tab.id === "success"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                )}
              >
                {tab.label}
                <span className="text-xs opacity-80">({tab.count})</span>
              </button>
            ))}
          </div>
          <div className="text-base mt-2 sm:mt-0 text-[#545454]">
            Total:{" "}
            <span className="text-lg text-[#171717] font-medium">
              {totalItems}
            </span>
          </div>
        </div>

        {/* Product grid */}
        {currentItems.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
              <div className="mt-8 flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </>
        ) : (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500">No products found</p>
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
