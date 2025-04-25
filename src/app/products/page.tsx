/* eslint-disable @typescript-eslint/no-unused-vars */
// "use client";

// import type React from "react";

// import { useState } from "react";
// import Image from "next/image";
// import { ArrowLeft, Info, MoreVertical } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationEllipsis,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import Link from "next/link";
// import { useGetProductsQuery } from "@/redux/features/product/ProductAPI";

// type ProductType = "Buy & Rent" | "Only Rent";

// type Product = {
//   _id: string;
//   name: string;
//   image: string;
//   condition: string;
//   price: number;
//   rentPrice: string;
//   buyPrice: string;
// };

// export default function ProductsPage() {
//   const [activeTab, setActiveTab] = useState<ProductType>("Buy & Rent");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageInput, setPageInput] = useState("1");
//   const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
//   const totalPages = 12;

//   const {data}= useGetProductsQuery(undefined)

//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//     setPageInput(page.toString());
//   };

//   const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setPageInput(e.target.value);
//   };

//   const handleGoToPage = () => {
//     const page = Number.parseInt(pageInput);
//     if (!isNaN(page) && page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//     } else {
//       setPageInput(currentPage.toString());
//     }
//   };

//   const handleEdit = (id: string) => {
//     setActiveDropdown(null);
//   };

//   const handleDelete = (id: string) => {
//     setActiveDropdown(null);
//   };

//   const IMAGE =process.env.NEXT_PUBLIC_API_URL_LOCAL

//   return (
//     <div className='container mx-auto p-4'>
//       <div className='mb-6 flex items-center justify-between'>
//         <div className='flex items-center'>
//           <Button variant='ghost' size='icon' className='mr-2'>
//             <ArrowLeft className='h-5 w-5' />
//           </Button>
//           <h1 className='text-xl font-semibold'>Products</h1>
//         </div>
//         <Link
//           href='/products/add-products'
//           className='bg-[#000000] text-[#FDFDFD] py-3 px-7 cursor-pointer hover:bg-gray-800 rounded-md'
//         >
//           Add Products
//         </Link>
//       </div>

//       <div className='mb-4 flex flex-wrap items-center justify-between'>
//         <div>
//           <button
//             onClick={() => setActiveTab("Buy & Rent")}
//             className={`px-4 py-2 rounded-full ${
//               activeTab === "Buy & Rent"
//                 ? "bg-[#000000] text-[#FFFFFF]"
//                 : "bg-[#F2F5F7] text-[#5F5F5F]"
//             }`}
//           >
//             Buy & Rent
//           </button>
//           <button
//             onClick={() => setActiveTab("Only Rent")}
//             className={`px-4 py-2 rounded-full ${
//               activeTab === "Only Rent"
//                 ? "bg-[#000000] text-[#FFFFFF]"
//                 : "bg-[#F2F5F7] text-[#5F5F5F]"
//             }`}
//           >
//             Only Rent
//           </button>
//         </div>

//         <div className='text-sm font-medium mt-2 sm:mt-0 text-[#545454]'>
//           Total: <span className='font-medium text-lg'>{data?.data?.length}</span>
//         </div>
//       </div>

//       {/* Product Grid */}
//       <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6'>
//         {data?.data.map((product: Product) => (
//           <div key={product._id} className='bg-white rounded-md overflow-hidden'>
//             <div className='relative h-[332px] w-full bg-[#F5F5F5]'>
//               <Image
//                 // src={`${IMAGE}${product.image}` || "/placeholder.svg"}
//                 src={product.image || "/placeholder.svg"}
//                 alt={product.name}
//                 fill
//                 className='object-cover p-6'
//               />
//             </div>
//             <div className='p-4'>
//               <div className='flex justify-between items-start mb-1'>
//                 <h3 className='font-medium text-[32px] text-[#000000]'>
//                   {product.name}
//                 </h3>
//                 <Button
//                   variant='ghost'
//                   size='icon'
//                   className='h-8 w-8 -mt-1 -mr-2'
//                 >
//                   <Info className='h-5 w-5 text-gray-500' />
//                 </Button>
//               </div>
//              {/* <p className='text-lg text-[#333333] mb-2'>
//                 Condition:{" "}
//                 <span className='text-[#333333] font-medium'>
//                   {product.condition}
//                 </span>
//               </p>  */}
//               <div className='flex justify-between items-center'>
//                 <div className='flex justify-between items-center gap-6'>
//                   <p className='text-lg text-[#333333]'>
//                     Price: {product.price}
//                   </p>
//                   <p className='text-lg text-[#333333]'>{product.buyPrice}</p>
//                 </div>
//                 <div className='relative'>
//                   <DropdownMenu
//                     open={activeDropdown === product.id}
//                     onOpenChange={(open) => {
//                       if (open) {
//                         setActiveDropdown(product.id);
//                       } else {
//                         setActiveDropdown(null);
//                       }
//                     }}
//                   >
//                     <DropdownMenuTrigger asChild>
//                       <Button variant='ghost' size='icon' className='h-8 w-8'>
//                         <MoreVertical className='h-5 w-5' />
//                       </Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent align='end' className='w-32 border'>
//                       <DropdownMenuItem onClick={() => handleEdit(product.id)}>
//                         Edit
//                       </DropdownMenuItem>
//                       <DropdownMenuItem
//                         onClick={() => handleDelete(product.id)}
//                         className='text-red-500'
//                       >
//                         Delete
//                       </DropdownMenuItem>
//                     </DropdownMenuContent>
//                   </DropdownMenu>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Pagination */}
//       <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
//         <Pagination>
//           <PaginationContent>
//             <PaginationItem>
//               <PaginationPrevious
//                 href='#'
//                 onClick={(e) => {
//                   e.preventDefault();
//                   if (currentPage > 1) handlePageChange(currentPage - 1);
//                 }}
//                 className={`${
//                   currentPage === 1 ? "pointer-events-none opacity-50" : ""
//                 } bg-black text-white hover:bg-gray-800 hover:text-white`}
//               />
//             </PaginationItem>

//             <PaginationItem>
//               <PaginationLink
//                 href='#'
//                 onClick={(e) => {
//                   e.preventDefault();
//                   handlePageChange(1);
//                 }}
//                 className={
//                   currentPage === 1
//                     ? "bg-black text-white hover:bg-black hover:text-white"
//                     : ""
//                 }
//               >
//                 1
//               </PaginationLink>
//             </PaginationItem>

//             {currentPage > 3 && (
//               <PaginationItem>
//                 <PaginationEllipsis />
//               </PaginationItem>
//             )}

//             {currentPage > 2 && (
//               <PaginationItem>
//                 <PaginationLink
//                   href='#'
//                   onClick={(e) => {
//                     e.preventDefault();
//                     handlePageChange(currentPage - 1);
//                   }}
//                 >
//                   {currentPage - 1}
//                 </PaginationLink>
//               </PaginationItem>
//             )}

//             {currentPage !== 1 && currentPage !== totalPages && (
//               <PaginationItem>
//                 <PaginationLink
//                   href='#'
//                   className='bg-black text-white hover:bg-black hover:text-white'
//                 >
//                   {currentPage}
//                 </PaginationLink>
//               </PaginationItem>
//             )}

//             {currentPage < totalPages - 1 && (
//               <PaginationItem>
//                 <PaginationLink
//                   href='#'
//                   onClick={(e) => {
//                     e.preventDefault();
//                     handlePageChange(currentPage + 1);
//                   }}
//                 >
//                   {currentPage + 1}
//                 </PaginationLink>
//               </PaginationItem>
//             )}

//             {currentPage < totalPages - 2 && (
//               <PaginationItem>
//                 <PaginationEllipsis />
//               </PaginationItem>
//             )}

//             <PaginationItem>
//               <PaginationLink
//                 href='#'
//                 onClick={(e) => {
//                   e.preventDefault();
//                   handlePageChange(totalPages);
//                 }}
//                 className={
//                   currentPage === totalPages
//                     ? "bg-black text-white hover:bg-black hover:text-white"
//                     : ""
//                 }
//               >
//                 {totalPages}
//               </PaginationLink>
//             </PaginationItem>

//             <PaginationItem>
//               <PaginationNext
//                 href='#'
//                 onClick={(e) => {
//                   e.preventDefault();
//                   if (currentPage < totalPages)
//                     handlePageChange(currentPage + 1);
//                 }}
//                 className={`${
//                   currentPage === totalPages
//                     ? "pointer-events-none opacity-50"
//                     : ""
//                 } bg-black text-white hover:bg-gray-800 hover:text-white`}
//               />
//             </PaginationItem>
//           </PaginationContent>
//         </Pagination>

//         <div className='flex items-center gap-2'>
//           <span className='text-sm'>Page</span>
//           <Input
//             type='text'
//             value={pageInput}
//             onChange={handlePageInputChange}
//             className='w-16 h-9 text-center'
//           />
//           <Button
//             variant='default'
//             size='sm'
//             onClick={handleGoToPage}
//             className='bg-black hover:bg-gray-800'
//           >
//             Go
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }

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
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "@/redux/features/product/ProductAPI";
import { toast } from "sonner";
import Loading from "@/components/loading/Loading";

type ProductType = "Buy & Rent" | "Only Rent" | "All";

type Product = {
  _id: string;
  name: string;
  images: string[];
  description: string;
  price: number;
  isRentable: boolean;
  isBuyable: boolean;
  rentPrice?: number;
  buyPrice?: number;
};

export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState<ProductType>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInput, setPageInput] = useState("1");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const { data, isLoading, isError, refetch } = useGetProductsQuery({
    page: currentPage,
  });

  const [deleteProduct] = useDeleteProductMutation();

  const totalPages = data?.meta?.pagination?.totalPages || 1;
  const totalProducts = data?.meta?.pagination?.total || 0;

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    setPageInput(page.toString());
  };

  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageInput(e.target.value);
  };

  const handleGoToPage = () => {
    const page = Number.parseInt(pageInput);
    if (!isNaN(page)) {
      handlePageChange(page);
    } else {
      setPageInput(currentPage.toString());
    }
  };

  // const handleEdit = (id: string) => {
  //   alert(`Edit product ${id}`);
  //   setActiveDropdown(null);
  // };

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id).unwrap();
      toast.success("Product deleted successfully");
      setActiveDropdown(null);
      refetch();
    } catch (error: unknown) {
      toast.error("Failed to delete product");
    }
  };

  const filteredProducts =
    data?.data?.filter((product: Product) => {
      if (activeTab === "Buy & Rent") {
        return product.isBuyable && product.isRentable;
      } else if (activeTab === "Only Rent") {
        return product.isRentable && !product.isBuyable;
      }
      return true; // Show all products if "All" is selected
    }) || [];

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <div className='container mx-auto p-4 text-red-500'>
        Error loading products
      </div>
    );
  }

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
        <div className='flex gap-2'>
          <button
            onClick={() => setActiveTab("All")}
            className={`px-4 py-2 rounded-full ${
              activeTab === "All"
                ? "bg-[#000000] text-[#FFFFFF]"
                : "bg-[#F2F5F7] text-[#5F5F5F]"
            }`}
          >
            All
          </button>
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

        <div className='text-sm font-medium mt-2 sm:mt-0 text-[#545454]'>
          Total: <span className='font-medium text-lg'>{totalProducts}</span>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className='text-center py-10'>
          <p className='text-lg'>No products found</p>
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6'>
          {filteredProducts.map((product: Product) => (
            <div
              key={product._id}
              className='bg-white rounded-md overflow-hidden shadow-md'
            >
              <div className='relative h-[200px] w-full bg-[#F5F5F5]'>
                <Image
                  src={
                    product.images?.[0]
                      ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${product.images[0]}`
                      : "/placeholder.svg"
                  }
                  alt={product.name}
                  fill
                  className='object-contain p-4'
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                />
              </div>
              <div className='p-4'>
                <div className='flex justify-between items-start mb-2'>
                  <h3 className='font-medium text-lg text-[#000000] line-clamp-1'>
                    {product.name}
                  </h3>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='h-8 w-8 -mt-1 -mr-2'
                  >
                    <Info className='h-4 w-4 text-gray-500' />
                  </Button>
                </div>
                <div className='flex justify-between items-center'>
                  <div className='flex flex-col gap-1'>
                    <p className='text-lg text-[#333333]'>
                      Price: ${product.price}
                    </p>
                    {/* {product.rentPrice && (
                      <p className='text-sm text-[#333333]'>Rent: ${product.rentPrice}/day</p>
                    )}
                    {product.isBuyable && (
                      <p className='text-sm text-[#333333]'>Buy: ${product.price}</p>
                    )} */}
                  </div>
                  <div className='relative'>
                    <DropdownMenu
                      open={activeDropdown === product._id}
                      onOpenChange={(open) => {
                        if (open) {
                          setActiveDropdown(product._id);
                        } else {
                          setActiveDropdown(null);
                        }
                      }}
                    >
                      <DropdownMenuTrigger asChild>
                        <Button variant='ghost' size='icon' className='h-8 w-8'>
                          <MoreVertical className='h-4 w-4' />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align='end' className='w-40'>
                        <Link href={`/products/${product._id}`}>
                          <DropdownMenuItem
                            // onClick={() => handleEdit(product._id)}
                            className='cursor-pointer'
                          >
                            Edit
                          </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem
                          onClick={() => handleDelete(product._id)}
                          className='text-red-500 cursor-pointer'
                        >
                          Delete
                        </DropdownMenuItem>
                        <Link href={`/products/add-variants/${product._id}`}>
                          <DropdownMenuItem>Variant</DropdownMenuItem>
                        </Link>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination - Only show if there are multiple pages */}
      {totalPages > 1 && (
        <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href='#'
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(currentPage - 1);
                  }}
                  className={`${
                    currentPage === 1 ? "pointer-events-none opacity-50" : ""
                  } bg-black text-white hover:bg-gray-800 hover:text-white`}
                />
              </PaginationItem>

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <PaginationItem key={pageNum}>
                    <PaginationLink
                      href='#'
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(pageNum);
                      }}
                      isActive={currentPage === pageNum}
                      className={
                        currentPage === pageNum ? "bg-black text-white" : ""
                      }
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              <PaginationItem>
                <PaginationNext
                  href='#'
                  onClick={(e) => {
                    e.preventDefault();
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
              type='number'
              min='1'
              max={totalPages}
              value={pageInput}
              onChange={handlePageInputChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleGoToPage();
                }
              }}
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
      )}
    </div>
  );
}
