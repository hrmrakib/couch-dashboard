// "use client";
// import { useState, useRef, type ChangeEvent, type FormEvent } from "react";
// import Image from "next/image";
// import { ArrowLeft, X, Plus } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import {
//   useGetProductByIdQuery,
//   useUpdateProductMutation,
// } from "@/redux/features/product/ProductAPI";
// import { useParams, useRouter } from "next/navigation";
// import { toast } from "sonner";

// type ProductFormData = {
//   name: string;
//   category: string;
//   roomType: string;
//   stock: number;
//   size: string;
//   materials: string[];
//   height: string;
//   width: string;
//   length: string;
//   description: string;
//   price: number;
//   rating: number;
//   rentalPrice: string;
//   color: string;
//   isRentable: boolean;
//   isBuyable: boolean;
// };

// export default function AddProductForm() {
//   const params = useParams();

//   const { data } = useGetProductByIdQuery(params.id as string);
//   console.log(data?.data);
//   const router = useRouter();
//   const [images, setImages] = useState<File[]>([]); // Changed to store File objects
//   const [uploading, setUploading] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [updateProduct] = useUpdateProductMutation();
//   const [newMaterial, setNewMaterial] = useState("");

//   const [formData, setFormData] = useState<ProductFormData>({
//     name: "",
//     category: "",
//     roomType: "",
//     stock: 0,
//     size: "",
//     materials: [],
//     height: "",
//     width: "",
//     length: "",
//     description: "",
//     price: 0,
//     rating: 1, // Changed default to 1 to meet validation
//     rentalPrice: "",
//     color: "",
//     isRentable: false,
//     isBuyable: false,
//   });

//   const handleInputChange = (
//     e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleNumberInputChange = (
//     e: ChangeEvent<HTMLInputElement>,
//     fieldName: keyof ProductFormData
//   ) => {
//     const value = e.target.valueAsNumber || 0;
//     setFormData((prev) => ({
//       ...prev,
//       [fieldName]: isNaN(value) ? 0 : value, // Handle NaN cases
//     }));
//   };

//   const handleAddMaterial = () => {
//     if (newMaterial.trim() === "") return;

//     setFormData((prev) => ({
//       ...prev,
//       materials: [...prev.materials, newMaterial.trim()],
//     }));
//     setNewMaterial("");
//   };

//   const handleRemoveMaterial = (index: number) => {
//     setFormData((prev) => ({
//       ...prev,
//       materials: prev.materials.filter((_, i) => i !== index),
//     }));
//   };

//   const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
//     if (!e.target.files || e.target.files.length === 0) return;

//     setUploading(true);

//     const files = Array.from(e.target.files);
//     setImages((prev) => [...prev, ...files]);
//     setUploading(false);
//   };

//   const handleRemoveImage = (index: number) => {
//     setImages((prev) => prev.filter((_, i) => i !== index));
//   };

//   const triggerFileInput = () => {
//     fileInputRef.current?.click();
//   };

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();

//     const formDataToSend = new FormData();

//     // Append all form fields
//     formDataToSend.append("name", formData.name);
//     formDataToSend.append("description", formData.description);
//     formDataToSend.append("stock", formData.stock.toString());
//     formDataToSend.append("price", formData.price.toString());
//     formDataToSend.append("rating", formData.rating.toString());
//     formDataToSend.append("color", formData.color);
//     formDataToSend.append("size", formData.size);
//     formDataToSend.append("materials", JSON.stringify(formData.materials));
//     formDataToSend.append("category", formData.category);
//     formDataToSend.append("roomType", formData.roomType);
//     formDataToSend.append("rentalPrice", formData.rentalPrice);
//     formDataToSend.append("height", formData.height);
//     formDataToSend.append("width", formData.width);
//     formDataToSend.append("length", formData.length);
//     formDataToSend.append("isRentable", formData.isRentable.toString());
//     formDataToSend.append("isBuyable", formData.isBuyable.toString());

//     // Append images
//     images.forEach((image) => {
//       formDataToSend.append("images", image);
//     });

//     try {
//       const res = await updateProduct(formDataToSend).unwrap();
//       console.log("Product created successfully", res);

//       toast.success(res?.message || "Product created successfully!");

//       router.push("/products");
//     } catch (error) {
//       console.error("Failed to create product:", error);
//     }
//   };

//   return (
//     <div className=" mx-auto p-4">
//       <div className="mb-6 flex items-center">
//         <Button variant="ghost" size="icon" className="mr-2">
//           <ArrowLeft className="h-5 w-5" />
//         </Button>
//         <h1 className="text-xl font-semibold">Products</h1>
//       </div>

//       <form
//         onSubmit={handleSubmit}
//         className="bg-white rounded-lg border border-gray-200 p-6"
//       >
//         {/* Image Upload Section */}
//         <div className="flex flex-wrap gap-4 mb-8">
//           <div
//             className="w-[140px] h-[180px] bg-gray-100 flex flex-col items-center justify-center cursor-pointer border border-gray-200 rounded-md"
//             onClick={triggerFileInput}
//           >
//             <input
//               type="file"
//               ref={fileInputRef}
//               className="hidden"
//               accept="image/*"
//               multiple
//               onChange={handleImageUpload}
//             />
//             <svg
//               width="24"
//               height="25"
//               viewBox="0 0 24 25"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 fillRule="evenodd"
//                 clipRule="evenodd"
//                 d="M3.464 3.964C2 5.43 2 7.786 2 12.5C2 17.214 2 19.571 3.464 21.035C4.93 22.5 7.286 22.5 12 22.5C16.714 22.5 19.071 22.5 20.535 21.035C22 19.572 22 17.214 22 12.5C22 7.786 22 5.429 20.535 3.964C19.072 2.5 16.714 2.5 12 2.5C7.286 2.5 4.929 2.5 3.464 3.964ZM16 10.5C16.5304 10.5 17.0391 10.2893 17.4142 9.91421C17.7893 9.53914 18 9.03043 18 8.5C18 7.96957 17.7893 7.46086 17.4142 7.08579C17.0391 6.71071 16.5304 6.5 16 6.5C15.4696 6.5 14.9609 6.71071 14.5858 7.08579C14.2107 7.46086 14 7.96957 14 8.5C14 9.03043 14.2107 9.53914 14.5858 9.91421C14.9609 10.2893 15.4696 10.5 16 10.5ZM6.32 13.604C6.61988 13.3253 7.01786 13.1765 7.42705 13.1902C7.83624 13.2038 8.2234 13.3789 8.504 13.677L11.152 16.487C11.538 16.897 12.0613 17.1506 12.6223 17.1997C13.1833 17.2487 13.7427 17.0897 14.194 16.753C14.4911 16.532 14.8568 16.4231 15.2265 16.4456C15.5961 16.4681 15.9459 16.6206 16.214 16.876L18.482 19.042C18.6269 19.1731 18.8172 19.2426 19.0124 19.2355C19.2077 19.2284 19.3925 19.1454 19.5275 19.0042C19.6625 18.8629 19.7371 18.6745 19.7353 18.4791C19.7335 18.2838 19.6556 18.0968 19.518 17.958L17.25 15.79C16.7255 15.2898 16.0409 14.9913 15.3174 14.9474C14.5939 14.9035 13.8782 15.1169 13.297 15.55C13.1405 15.6665 12.9466 15.7215 12.7523 15.7043C12.5579 15.6872 12.3767 15.5991 12.243 15.457L9.596 12.647C9.04383 12.0609 8.28227 11.7169 7.47747 11.6901C6.67267 11.6633 5.88993 11.9559 5.3 12.504L4.49 13.256C4.34413 13.3913 4.25797 13.5789 4.25047 13.7777C4.24297 13.9765 4.31474 14.1701 4.45 14.316C4.58526 14.4619 4.77293 14.548 4.97172 14.5555C5.1705 14.563 5.36413 14.4913 5.51 14.356L6.32 13.604Z"
//                 fill="#545454"
//               />
//             </svg>

//             <span className="text-sm text-[#545454]">Upload Image</span>
//           </div>

//           {images.map((image, index) => (
//             <div
//               key={index}
//               className="relative w-[140px] h-[180px] border border-gray-200 rounded-md overflow-hidden"
//             >
//               <Image
//                 src={URL.createObjectURL(image)}
//                 alt={`Product image ${index + 1}`}
//                 fill
//                 className="object-cover"
//               />
//               <button
//                 type="button"
//                 className="absolute top-1 right-1 bg-black rounded-full p-1"
//                 onClick={() => handleRemoveImage(index)}
//               >
//                 <X className="h-3 w-3 text-white" />
//               </button>
//             </div>
//           ))}

//           {uploading && (
//             <div className="w-[100px] h-[100px] bg-gray-100 flex items-center justify-center border border-gray-200 rounded-md">
//               <span className="text-xs text-gray-500">Uploading...</span>
//             </div>
//           )}
//         </div>

//         {/* Product Name and Description Preview */}
//         <div className="mb-8">
//           <h2 className="text-xl font-medium text-[#333333] mb-2">
//             {formData.name || "Product Name"}
//           </h2>
//           <p className="text-sm text-gray-400 mt-1">
//             {formData.description || "Product Description"}
//           </p>
//           <p className="text-lg font-light text-gray-400 mt-2">
//             $ {formData.price || "00.00"}
//           </p>
//         </div>

//         {/* Form Fields */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//           <div>
//             <Label
//               htmlFor="name"
//               className="text-[#333333] text-base font-medium mb-1.5"
//             >
//               Product Name
//             </Label>
//             <Input
//               id="name"
//               name="name"
//               placeholder="Enter a name"
//               value={formData.name}
//               onChange={handleInputChange}
//               className="py-2.5 px-2 md:text-lg border border-gray-200 rounded-md placeholder:text-[#545454] placeholder:text-base tracking-wide"
//             />
//           </div>

//           <div>
//             <Label
//               htmlFor="category"
//               className="text-[#333333] text-base font-medium mb-1.5"
//             >
//               Category
//             </Label>
//             <Input
//               id="category"
//               name="category"
//               placeholder="Enter category name"
//               value={formData.category}
//               onChange={handleInputChange}
//               className="py-2.5 px-2 md:text-lg border border-gray-200 rounded-md placeholder:text-[#545454] placeholder:text-base tracking-wide"
//             />
//           </div>

//           <div>
//             <Label
//               htmlFor="roomType"
//               className="text-[#333333] text-base font-medium mb-1.5"
//             >
//               Room Type
//             </Label>
//             <Input
//               id="roomType"
//               name="roomType"
//               placeholder="Enter room type"
//               value={formData.roomType}
//               onChange={handleInputChange}
//               className="py-2.5 px-2 md:text-lg border border-gray-200 rounded-md placeholder:text-[#545454] placeholder:text-base tracking-wide"
//             />
//           </div>

//           <div>
//             <Label
//               htmlFor="color"
//               className="text-[#333333] text-base font-medium mb-1.5"
//             >
//               Color
//             </Label>
//             <Input
//               id="color"
//               name="color"
//               placeholder="Enter color"
//               value={formData.color}
//               onChange={handleInputChange}
//               className="py-2.5 px-2 md:text-lg border border-gray-200 rounded-md placeholder:text-[#545454] placeholder:text-base tracking-wide"
//             />
//           </div>

//           <div>
//             <Label
//               htmlFor="stock"
//               className="text-[#333333] text-base font-medium mb-1.5"
//             >
//               Stock
//             </Label>
//             <Input
//               id="stock"
//               name="stock"
//               type="number"
//               placeholder="Enter stock quantity"
//               value={formData.stock}
//               onChange={(e) => handleNumberInputChange(e, "stock")}
//               className="py-2.5 px-2 md:text-lg border border-gray-200 rounded-md placeholder:text-[#545454] placeholder:text-base tracking-wide"
//             />
//           </div>

//           <div>
//             <Label
//               htmlFor="size"
//               className="text-[#333333] text-base font-medium mb-1.5"
//             >
//               Size
//             </Label>
//             <Input
//               id="size"
//               name="size"
//               placeholder="Enter size"
//               value={formData.size}
//               onChange={handleInputChange}
//               className="py-2.5 px-2 md:text-lg border border-gray-200 rounded-md placeholder:text-[#545454] placeholder:text-base tracking-wide"
//             />
//           </div>

//           <div className="">
//             <Label
//               htmlFor="materials"
//               className="text-[#333333] text-base font-medium mb-1.5"
//             >
//               Materials
//             </Label>
//             <div className="">
//               <div className="flex gap-2">
//                 <Input
//                   id="materials"
//                   name="materials"
//                   placeholder="Enter material"
//                   value={newMaterial}
//                   onChange={(e) => setNewMaterial(e.target.value)}
//                   className="py-2.5 px-2 md:text-lg border border-gray-200 rounded-md placeholder:text-[#545454] placeholder:text-base tracking-wide "
//                 />
//                 <Button
//                   type="button"
//                   onClick={handleAddMaterial}
//                   className="h-10 w-10 p-0"
//                 >
//                   <Plus className="h-4 w-4" />
//                 </Button>
//               </div>
//               {formData.materials.length > 0 && (
//                 <div className="flex flex-wrap gap-2 mt-2">
//                   {formData.materials.map((material, index) => (
//                     <div
//                       key={index}
//                       className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full"
//                     >
//                       <span className="text-sm">{material}</span>
//                       <button
//                         type="button"
//                         onClick={() => handleRemoveMaterial(index)}
//                         className="text-gray-500 hover:text-gray-700"
//                       >
//                         <X className="h-3 w-3" />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//           <div className="">
//             <Label
//               htmlFor="Rental / Buyable"
//               className="text-[#333333] text-base font-medium mb-1.5"
//             >
//               Type
//             </Label>

//             <RadioGroup
//               defaultValue="isRentable"
//               className="py-2.5 flex items-center space-x-6"
//               onValueChange={(value) => {
//                 setFormData((prev) => ({
//                   ...prev,
//                   isRentable: value === "isRentable",
//                   isBuyable: value === "isBuyable",
//                 }));
//               }}
//             >
//               <div className="flex items-center space-x-2">
//                 <RadioGroupItem value="isRentable" id="r1" />
//                 <Label htmlFor="r1" className="text-base">
//                   Rentable
//                 </Label>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <RadioGroupItem value="isBuyable" id="r2" />
//                 <Label htmlFor="r2" className="text-base">
//                   Buyable
//                 </Label>
//               </div>
//             </RadioGroup>
//           </div>
//         </div>

//         {/* Dimensions Row */}
//         <div className="grid grid-cols-3 gap-6 mb-6">
//           <div>
//             <Label
//               htmlFor="height"
//               className="text-[#333333] text-base font-medium mb-1.5"
//             >
//               Height
//             </Label>
//             <Input
//               id="height"
//               name="height"
//               type="number"
//               placeholder="Enter height"
//               value={formData.height}
//               onChange={handleInputChange}
//               className="py-2.5 px-2 md:text-lg border border-gray-200 rounded-md placeholder:text-[#545454] placeholder:text-base tracking-wide"
//             />
//           </div>

//           <div>
//             <Label
//               htmlFor="width"
//               className="text-[#333333] text-base font-medium mb-1.5"
//             >
//               Width
//             </Label>
//             <Input
//               id="width"
//               name="width"
//               type="number"
//               placeholder="Enter width"
//               value={formData.width}
//               onChange={handleInputChange}
//               className="py-2.5 px-2 md:text-lg border border-gray-200 rounded-md placeholder:text-[#545454] placeholder:text-base tracking-wide"
//             />
//           </div>

//           <div>
//             <Label
//               htmlFor="length"
//               className="text-[#333333] text-base font-medium mb-1.5"
//             >
//               Length
//             </Label>
//             <Input
//               id="length"
//               name="length"
//               type="number"
//               placeholder="Enter length"
//               value={formData.length}
//               onChange={handleInputChange}
//               className="py-2.5 px-2 md:text-lg border border-gray-200 rounded-md placeholder:text-[#545454] placeholder:text-base tracking-wide"
//             />
//           </div>
//         </div>

//         {/* Description */}
//         <div className="mb-6">
//           <Label
//             htmlFor="description"
//             className="text-[#333333] text-base font-medium mb-1.5"
//           >
//             Product Description
//           </Label>
//           <Textarea
//             id="description"
//             name="description"
//             placeholder="Enter a description"
//             className="min-h-[120px]"
//             value={formData.description}
//             onChange={handleInputChange}
//           />
//         </div>

//         {/* Pricing */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//           <div>
//             <Label
//               htmlFor="price"
//               className="text-[#333333] text-base font-medium mb-1.5"
//             >
//               Price (For Buying)
//             </Label>
//             <Input
//               id="price"
//               name="price"
//               type="number"
//               placeholder="$00.00"
//               value={formData.price}
//               onChange={(e) => handleNumberInputChange(e, "price")}
//               className="py-2.5 px-2 md:text-lg border border-gray-200 rounded-md placeholder:text-[#545454] placeholder:text-base tracking-wide"
//             />
//           </div>

//           <div>
//             <Label
//               htmlFor="rentalPrice"
//               className="text-[#333333] text-base font-medium mb-1.5"
//             >
//               Rental Price (Optional)
//             </Label>
//             <Input
//               id="rentalPrice"
//               name="rentalPrice"
//               type="number"
//               placeholder="$00.00"
//               value={formData.rentalPrice}
//               onChange={handleInputChange}
//               className="py-2.5 px-2 md:text-lg border border-gray-200 rounded-md placeholder:text-[#545454] placeholder:text-base tracking-wide"
//             />
//           </div>
//         </div>

//         {/* Rating (hidden but included in form) */}
//         <input type="hidden" name="rating" value={formData.rating} />

//         {/* Action Buttons */}
//         <div className="flex justify-end gap-4">
       
//           <Button
//             type="submit"
//             className="h-14 w-[200px] text-[#FFFFFF] text-lg font-medium bg-[#101010] cursor-pointer"
//           >
//             update Product
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// }

// "use client";
// import { useState, useRef, type ChangeEvent, type FormEvent, useEffect } from "react";
// import Image from "next/image";
// import { ArrowLeft, X, Plus } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import {
//   useGetProductByIdQuery,
//   useUpdateProductMutation,
// } from "@/redux/features/product/ProductAPI";
// import { useParams, useRouter } from "next/navigation";
// import { toast } from "sonner";

// type ProductFormData = {
//   name: string;
//   category: string;
//   roomType: string;
//   stock: number;
//   size: string;
//   materials: string[];
//   height: string;
//   width: string;
//   length: string;
//   description: string;
//   price: number;
//   rating: number;
//   rentalPrice: string;
//   color: string;
//   isRentable: boolean;
//   isBuyable: boolean;
// };

// export default function EditProductForm() {
//   const params = useParams();
//   const router = useRouter();
  
//   const { data: productData, isLoading } = useGetProductByIdQuery(params.id as string);
//   const [updateProduct] = useUpdateProductMutation();
  
//   const [images, setImages] = useState<File[]>([]);
//   const [existingImages, setExistingImages] = useState<string[]>([]);
//   const [uploading, setUploading] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [newMaterial, setNewMaterial] = useState("");

//   const [formData, setFormData] = useState<ProductFormData>({
//     name: "",
//     category: "",
//     roomType: "",
//     stock: 0,
//     size: "",
//     materials: [],
//     height: "",
//     width: "",
//     length: "",
//     description: "",
//     price: 0,
//     rating: 1,
//     rentalPrice: "",
//     color: "",
//     isRentable: false,
//     isBuyable: false,
//   });

//   // Set initial form data when product data is loaded
//   useEffect(() => {
//     if (productData?.data) {
//       const product = productData.data;
//       setFormData({
//         name: product.name || "",
//         category: product.category || "",
//         roomType: product.roomType || "",
//         stock: product.stock || 0,
//         size: product.size || "",
//         materials: product.materials || [],
//         height: product.height || "",
//         width: product.width || "",
//         length: product.length || "",
//         description: product.description || "",
//         price: product.price || 0,
//         rating: product.rating || 1,
//         rentalPrice: product.rentPrice?.toString() || "",
//         color: product.color || "",
//         isRentable: product.isRentable || false,
//         isBuyable: product.isBuyable || false,
//       });
      
//       if (product.images) {
//         setExistingImages(product.images);
//       }
//     }
//   }, [productData]);

//   const handleInputChange = (
//     e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleNumberInputChange = (
//     e: ChangeEvent<HTMLInputElement>,
//     fieldName: keyof ProductFormData
//   ) => {
//     const value = e.target.valueAsNumber || 0;
//     setFormData((prev) => ({
//       ...prev,
//       [fieldName]: isNaN(value) ? 0 : value,
//     }));
//   };

//   const handleAddMaterial = () => {
//     if (newMaterial.trim() === "") return;

//     setFormData((prev) => ({
//       ...prev,
//       materials: [...prev.materials, newMaterial.trim()],
//     }));
//     setNewMaterial("");
//   };

//   const handleRemoveMaterial = (index: number) => {
//     setFormData((prev) => ({
//       ...prev,
//       materials: prev.materials.filter((_, i) => i !== index),
//     }));
//   };

//   const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
//     if (!e.target.files || e.target.files.length === 0) return;

//     setUploading(true);
//     const files = Array.from(e.target.files);
//     setImages((prev) => [...prev, ...files]);
//     setUploading(false);
//   };

//   const handleRemoveImage = (index: number, isExisting: boolean = false) => {
//     if (isExisting) {
//       setExistingImages((prev) => prev.filter((_, i) => i !== index));
//     } else {
//       setImages((prev) => prev.filter((_, i) => i !== index));
//     }
//   };

//   const triggerFileInput = () => {
//     fileInputRef.current?.click();
//   };

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();

//     const formDataToSend = new FormData();
//     console.log("Form Data to Send:", formDataToSend);

//     // Append all form fields
//     formDataToSend.append("name", formData.name);
//     formDataToSend.append("description", formData.description);
//     formDataToSend.append("stock", formData.stock.toString());
//     formDataToSend.append("price", formData.price.toString());
//     formDataToSend.append("rating", formData.rating.toString());
//     formDataToSend.append("color", formData.color);
//     formDataToSend.append("size", formData.size);
//     formDataToSend.append("materials", JSON.stringify(formData.materials));
//     formDataToSend.append("category", formData.category);
//     formDataToSend.append("roomType", formData.roomType);
//     formDataToSend.append("rentalPrice", formData.rentalPrice);
//     formDataToSend.append("height", formData.height);
//     formDataToSend.append("width", formData.width);
//     formDataToSend.append("length", formData.length);
//     formDataToSend.append("isRentable", formData.isRentable.toString());
//     formDataToSend.append("isBuyable", formData.isBuyable.toString());

//     // Append existing images that haven't been removed
//     formDataToSend.append("existingImages", JSON.stringify(existingImages));
    
//     // Append new images
//     images.forEach((image) => {
//       formDataToSend.append("images", image);
//     });

//     try {
//       const res = await updateProduct({
//         id: params.id as string,
//          formDataToSend
//       }).unwrap();
      
//       console.log("Product updated successfully", res);
//       toast.success(res?.message || "Product updated successfully!");
//     //   router.push("/products");
//     } catch (error) {
//       console.error("Failed to update product:", error);
//       toast.error("Failed to update product");
//     }
//   };

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   const IMAGE =process.env.NEXT_PUBLIC_IMAGE_URL;

//   return (
//     <div className="mx-auto p-4">
//       <div className="mb-6 flex items-center">
//         <Button 
//           variant="ghost" 
//           size="icon" 
//           className="mr-2"
//           onClick={() => router.push("/products")}
//         >
//           <ArrowLeft className="h-5 w-5" />
//         </Button>
//         <h1 className="text-xl font-semibold">Edit Product</h1>
//       </div>

//       <form
//         onSubmit={handleSubmit}
//         className="bg-white rounded-lg border border-gray-200 p-6"
//       >
//         {/* Image Upload Section */}
//         <div className="flex flex-wrap gap-4 mb-8">
//           <div
//             className="w-[140px] h-[180px] bg-gray-100 flex flex-col items-center justify-center cursor-pointer border border-gray-200 rounded-md"
//             onClick={triggerFileInput}
//           >
//             <input
//               type="file"
//               ref={fileInputRef}
//               className="hidden"
//               accept="image/*"
//               multiple
//               onChange={handleImageUpload}
//             />
//             <svg
//               width="24"
//               height="25"
//               viewBox="0 0 24 25"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 fillRule="evenodd"
//                 clipRule="evenodd"
//                 d="M3.464 3.964C2 5.43 2 7.786 2 12.5C2 17.214 2 19.571 3.464 21.035C4.93 22.5 7.286 22.5 12 22.5C16.714 22.5 19.071 22.5 20.535 21.035C22 19.572 22 17.214 22 12.5C22 7.786 22 5.429 20.535 3.964C19.072 2.5 16.714 2.5 12 2.5C7.286 2.5 4.929 2.5 3.464 3.964ZM16 10.5C16.5304 10.5 17.0391 10.2893 17.4142 9.91421C17.7893 9.53914 18 9.03043 18 8.5C18 7.96957 17.7893 7.46086 17.4142 7.08579C17.0391 6.71071 16.5304 6.5 16 6.5C15.4696 6.5 14.9609 6.71071 14.5858 7.08579C14.2107 7.46086 14 7.96957 14 8.5C14 9.03043 14.2107 9.53914 14.5858 9.91421C14.9609 10.2893 15.4696 10.5 16 10.5ZM6.32 13.604C6.61988 13.3253 7.01786 13.1765 7.42705 13.1902C7.83624 13.2038 8.2234 13.3789 8.504 13.677L11.152 16.487C11.538 16.897 12.0613 17.1506 12.6223 17.1997C13.1833 17.2487 13.7427 17.0897 14.194 16.753C14.4911 16.532 14.8568 16.4231 15.2265 16.4456C15.5961 16.4681 15.9459 16.6206 16.214 16.876L18.482 19.042C18.6269 19.1731 18.8172 19.2426 19.0124 19.2355C19.2077 19.2284 19.3925 19.1454 19.5275 19.0042C19.6625 18.8629 19.7371 18.6745 19.7353 18.4791C19.7335 18.2838 19.6556 18.0968 19.518 17.958L17.25 15.79C16.7255 15.2898 16.0409 14.9913 15.3174 14.9474C14.5939 14.9035 13.8782 15.1169 13.297 15.55C13.1405 15.6665 12.9466 15.7215 12.7523 15.7043C12.5579 15.6872 12.3767 15.5991 12.243 15.457L9.596 12.647C9.04383 12.0609 8.28227 11.7169 7.47747 11.6901C6.67267 11.6633 5.88993 11.9559 5.3 12.504L4.49 13.256C4.34413 13.3913 4.25797 13.5789 4.25047 13.7777C4.24297 13.9765 4.31474 14.1701 4.45 14.316C4.58526 14.4619 4.77293 14.548 4.97172 14.5555C5.1705 14.563 5.36413 14.4913 5.51 14.356L6.32 13.604Z"
//                 fill="#545454"
//               />
//             </svg>
//             <span className="text-sm text-[#545454]">Upload Image</span>
//           </div>

//           {/* Existing images */}
//           {existingImages.map((image, index) => (
//             <div
//               key={`existing-${index}`}
//               className="relative w-[140px] h-[180px] border border-gray-200 rounded-md overflow-hidden"
//             >
//               <Image
//                 src={`${IMAGE}${image}`}
//                 alt={`Product image ${index + 1}`}
//                 fill
//                 className="object-cover"
//               />
//               <button
//                 type="button"
//                 className="absolute top-1 right-1 bg-black rounded-full p-1"
//                 onClick={() => handleRemoveImage(index, true)}
//               >
//                 <X className="h-3 w-3 text-white" />
//               </button>
//             </div>
//           ))}

//           {/* Newly uploaded images */}
//           {images.map((image, index) => (
//             <div
//               key={`new-${index}`}
//               className="relative w-[140px] h-[180px] border border-gray-200 rounded-md overflow-hidden"
//             >
//               <Image
//                 src={URL.createObjectURL(image)}
//                 alt={`New product image ${index + 1}`}
//                 fill
//                 className="object-cover"
//               />
//               <button
//                 type="button"
//                 className="absolute top-1 right-1 bg-black rounded-full p-1"
//                 onClick={() => handleRemoveImage(index)}
//               >
//                 <X className="h-3 w-3 text-white" />
//               </button>
//             </div>
//           ))}

//           {uploading && (
//             <div className="w-[100px] h-[100px] bg-gray-100 flex items-center justify-center border border-gray-200 rounded-md">
//               <span className="text-xs text-gray-500">Uploading...</span>
//             </div>
//           )}
//         </div>

//         {/* Product Name and Description Preview */}
//         <div className="mb-8">
//           <h2 className="text-xl font-medium text-[#333333] mb-2">
//             {formData.name || "Product Name"}
//           </h2>
//           <p className="text-sm text-gray-400 mt-1">
//             {formData.description || "Product Description"}
//           </p>
//           <p className="text-lg font-light text-gray-400 mt-2">
//             $ {formData.price || "00.00"}
//           </p>
//         </div>

//         {/* Form Fields */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//           <div>
//             <Label
//               htmlFor="name"
//               className="text-[#333333] text-base font-medium mb-1.5"
//             >
//               Product Name
//             </Label>
//             <Input
//               id="name"
//               name="name"
//               placeholder="Enter a name"
//               value={formData.name}
//               onChange={handleInputChange}
//               className="py-2.5 px-2 md:text-lg border border-gray-200 rounded-md placeholder:text-[#545454] placeholder:text-base tracking-wide"
//             />
//           </div>

//           <div>
//             <Label
//               htmlFor="category"
//               className="text-[#333333] text-base font-medium mb-1.5"
//             >
//               Category
//             </Label>
//             <Input
//               id="category"
//               name="category"
//               placeholder="Enter category name"
//               value={formData.category}
//               onChange={handleInputChange}
//               className="py-2.5 px-2 md:text-lg border border-gray-200 rounded-md placeholder:text-[#545454] placeholder:text-base tracking-wide"
//             />
//           </div>

//           <div>
//             <Label
//               htmlFor="roomType"
//               className="text-[#333333] text-base font-medium mb-1.5"
//             >
//               Room Type
//             </Label>
//             <Input
//               id="roomType"
//               name="roomType"
//               placeholder="Enter room type"
//               value={formData.roomType}
//               onChange={handleInputChange}
//               className="py-2.5 px-2 md:text-lg border border-gray-200 rounded-md placeholder:text-[#545454] placeholder:text-base tracking-wide"
//             />
//           </div>

//           <div>
//             <Label
//               htmlFor="color"
//               className="text-[#333333] text-base font-medium mb-1.5"
//             >
//               Color
//             </Label>
//             <Input
//               id="color"
//               name="color"
//               placeholder="Enter color"
//               value={formData.color}
//               onChange={handleInputChange}
//               className="py-2.5 px-2 md:text-lg border border-gray-200 rounded-md placeholder:text-[#545454] placeholder:text-base tracking-wide"
//             />
//           </div>

//           <div>
//             <Label
//               htmlFor="stock"
//               className="text-[#333333] text-base font-medium mb-1.5"
//             >
//               Stock
//             </Label>
//             <Input
//               id="stock"
//               name="stock"
//               type="number"
//               placeholder="Enter stock quantity"
//               value={formData.stock}
//               onChange={(e) => handleNumberInputChange(e, "stock")}
//               className="py-2.5 px-2 md:text-lg border border-gray-200 rounded-md placeholder:text-[#545454] placeholder:text-base tracking-wide"
//             />
//           </div>

//           <div>
//             <Label
//               htmlFor="size"
//               className="text-[#333333] text-base font-medium mb-1.5"
//             >
//               Size
//             </Label>
//             <Input
//               id="size"
//               name="size"
//               placeholder="Enter size"
//               value={formData.size}
//               onChange={handleInputChange}
//               className="py-2.5 px-2 md:text-lg border border-gray-200 rounded-md placeholder:text-[#545454] placeholder:text-base tracking-wide"
//             />
//           </div>

//           <div className="">
//             <Label
//               htmlFor="materials"
//               className="text-[#333333] text-base font-medium mb-1.5"
//             >
//               Materials
//             </Label>
//             <div className="">
//               <div className="flex gap-2">
//                 <Input
//                   id="materials"
//                   name="materials"
//                   placeholder="Enter material"
//                   value={newMaterial}
//                   onChange={(e) => setNewMaterial(e.target.value)}
//                   className="py-2.5 px-2 md:text-lg border border-gray-200 rounded-md placeholder:text-[#545454] placeholder:text-base tracking-wide "
//                 />
//                 <Button
//                   type="button"
//                   onClick={handleAddMaterial}
//                   className="h-10 w-10 p-0"
//                 >
//                   <Plus className="h-4 w-4" />
//                 </Button>
//               </div>
//               {formData.materials.length > 0 && (
//                 <div className="flex flex-wrap gap-2 mt-2">
//                   {formData.materials.map((material, index) => (
//                     <div
//                       key={index}
//                       className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full"
//                     >
//                       <span className="text-sm">{material}</span>
//                       <button
//                         type="button"
//                         onClick={() => handleRemoveMaterial(index)}
//                         className="text-gray-500 hover:text-gray-700"
//                       >
//                         <X className="h-3 w-3" />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//           <div className="">
//             <Label
//               htmlFor="Rental / Buyable"
//               className="text-[#333333] text-base font-medium mb-1.5"
//             >
//               Type
//             </Label>

//             <RadioGroup
//               value={formData.isRentable ? "isRentable" : "isBuyable"}
//               className="py-2.5 flex items-center space-x-6"
//               onValueChange={(value) => {
//                 setFormData((prev) => ({
//                   ...prev,
//                   isRentable: value === "isRentable",
//                   isBuyable: value === "isBuyable",
//                 }));
//               }}
//             >
//               <div className="flex items-center space-x-2">
//                 <RadioGroupItem value="isRentable" id="r1" />
//                 <Label htmlFor="r1" className="text-base">
//                   Rentable
//                 </Label>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <RadioGroupItem value="isBuyable" id="r2" />
//                 <Label htmlFor="r2" className="text-base">
//                   Buyable
//                 </Label>
//               </div>
//             </RadioGroup>
//           </div>
//         </div>

//         {/* Dimensions Row */}
//         <div className="grid grid-cols-3 gap-6 mb-6">
//           <div>
//             <Label
//               htmlFor="height"
//               className="text-[#333333] text-base font-medium mb-1.5"
//             >
//               Height
//             </Label>
//             <Input
//               id="height"
//               name="height"
//               type="number"
//               placeholder="Enter height"
//               value={formData.height}
//               onChange={handleInputChange}
//               className="py-2.5 px-2 md:text-lg border border-gray-200 rounded-md placeholder:text-[#545454] placeholder:text-base tracking-wide"
//             />
//           </div>

//           <div>
//             <Label
//               htmlFor="width"
//               className="text-[#333333] text-base font-medium mb-1.5"
//             >
//               Width
//             </Label>
//             <Input
//               id="width"
//               name="width"
//               type="number"
//               placeholder="Enter width"
//               value={formData.width}
//               onChange={handleInputChange}
//               className="py-2.5 px-2 md:text-lg border border-gray-200 rounded-md placeholder:text-[#545454] placeholder:text-base tracking-wide"
//             />
//           </div>

//           <div>
//             <Label
//               htmlFor="length"
//               className="text-[#333333] text-base font-medium mb-1.5"
//             >
//               Length
//             </Label>
//             <Input
//               id="length"
//               name="length"
//               type="number"
//               placeholder="Enter length"
//               value={formData.length}
//               onChange={handleInputChange}
//               className="py-2.5 px-2 md:text-lg border border-gray-200 rounded-md placeholder:text-[#545454] placeholder:text-base tracking-wide"
//             />
//           </div>
//         </div>

//         {/* Description */}
//         <div className="mb-6">
//           <Label
//             htmlFor="description"
//             className="text-[#333333] text-base font-medium mb-1.5"
//           >
//             Product Description
//           </Label>
//           <Textarea
//             id="description"
//             name="description"
//             placeholder="Enter a description"
//             className="min-h-[120px]"
//             value={formData.description}
//             onChange={handleInputChange}
//           />
//         </div>

//         {/* Pricing */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//           <div>
//             <Label
//               htmlFor="price"
//               className="text-[#333333] text-base font-medium mb-1.5"
//             >
//               Price (For Buying)
//             </Label>
//             <Input
//               id="price"
//               name="price"
//               type="number"
//               placeholder="$00.00"
//               value={formData.price}
//               onChange={(e) => handleNumberInputChange(e, "price")}
//               className="py-2.5 px-2 md:text-lg border border-gray-200 rounded-md placeholder:text-[#545454] placeholder:text-base tracking-wide"
//             />
//           </div>

//           <div>
//             <Label
//               htmlFor="rentalPrice"
//               className="text-[#333333] text-base font-medium mb-1.5"
//             >
//               Rental Price (Optional)
//             </Label>
//             <Input
//               id="rentalPrice"
//               name="rentalPrice"
//               type="number"
//               placeholder="$00.00"
//               value={formData.rentalPrice}
//               onChange={handleInputChange}
//               className="py-2.5 px-2 md:text-lg border border-gray-200 rounded-md placeholder:text-[#545454] placeholder:text-base tracking-wide"
//             />
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex justify-end gap-4">
//           <Button
//             type="submit"
//             className="h-14 w-[200px] text-[#FFFFFF] text-lg font-medium bg-[#101010] cursor-pointer"
//           >
//             Update Product
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// }

"use client";
import { useState, useRef, type ChangeEvent, type FormEvent, useEffect } from "react";
import Image from "next/image";
import { ArrowLeft, X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "@/redux/features/product/ProductAPI";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

type ProductFormData = {
  name: string;
  category: string;
  roomType: string;
  stock: number;
  size: string;
  materials: string[];
  height: string;
  width: string;
  length: string;
  description: string;
  price: number;
  rating: number;
  rentalPrice: string;
  color: string;
  isRentable: boolean;
  isBuyable: boolean;
};

export default function EditProductForm() {
  const params = useParams();
  const router = useRouter();
  
  const { data: productData, isLoading } = useGetProductByIdQuery(params.id as string);
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  
  const [images, setImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [newMaterial, setNewMaterial] = useState("");

  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    category: "",
    roomType: "",
    stock: 0,
    size: "",
    materials: [],
    height: "",
    width: "",
    length: "",
    description: "",
    price: 0,
    rating: 1,
    rentalPrice: "",
    color: "",
    isRentable: false,
    isBuyable: false,
  });

  // Set initial form data when product data is loaded
  useEffect(() => {
    if (productData?.data) {
      const product = productData.data;
      setFormData({
        name: product.name || "",
        category: product.category || "",
        roomType: product.roomType || "",
        stock: product.stock || 0,
        size: product.size || "",
        materials: product.materials || [],
        height: product.height || "",
        width: product.width || "",
        length: product.length || "",
        description: product.description || "",
        price: product.price || 0,
        rating: product.rating || 1,
        rentalPrice: product.rentPrice?.toString() || "",
        color: product.color || "",
        isRentable: product.isRentable || false,
        isBuyable: product.isBuyable || false,
      });
      
      if (product.images) {
        setExistingImages(product.images);
      }
    }
  }, [productData]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNumberInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    fieldName: keyof ProductFormData
  ) => {
    const value = e.target.valueAsNumber || 0;
    setFormData((prev) => ({
      ...prev,
      [fieldName]: isNaN(value) ? 0 : value,
    }));
  };

  const handleAddMaterial = () => {
    if (newMaterial.trim() === "") return;

    setFormData((prev) => ({
      ...prev,
      materials: [...prev.materials, newMaterial.trim()],
    }));
    setNewMaterial("");
  };

  const handleRemoveMaterial = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      materials: prev.materials.filter((_, i) => i !== index),
    }));
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    setUploading(true);
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
    setUploading(false);
  };

  const handleRemoveImage = (index: number, isExisting: boolean = false) => {
    if (isExisting) {
      setExistingImages((prev) => prev.filter((_, i) => i !== index));
    } else {
      setImages((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    // Append all form fields
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'materials') {
        formDataToSend.append(key, JSON.stringify(value));
      } else {
        formDataToSend.append(key, value.toString());
      }
    });

    // Append existing images that haven't been removed
    formDataToSend.append("existingImages", JSON.stringify(existingImages));
    
    // Append new images
    images.forEach((image) => {
      formDataToSend.append("images", image);
    });

    try {
      const res = await updateProduct({
        id: params.id as string,
        formData: formDataToSend
      }).unwrap();
      
      console.log("Product updated successfully", res);
      toast.success(res?.message || "Product updated successfully!");
      router.push("/products");
    } catch (error: any) {
      console.error("Failed to update product:", error);
      toast.error(error?.data?.message || "Failed to update product");
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  const IMAGE = process.env.NEXT_PUBLIC_IMAGE_URL;

  return (
    <div className=" p-4 ">
      <div className="mb-6 flex items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          className="mr-2"
          onClick={() => router.push("/products")}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold">Edit Product</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg border border-gray-200 p-6"
      >
        {/* Image Upload Section */}
        <div className="flex flex-wrap gap-4 mb-8">
          <div
            className="w-[140px] h-[180px] bg-gray-100 flex flex-col items-center justify-center cursor-pointer border border-gray-200 rounded-md"
            onClick={triggerFileInput}
          >
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
            />
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.464 3.964C2 5.43 2 7.786 2 12.5C2 17.214 2 19.571 3.464 21.035C4.93 22.5 7.286 22.5 12 22.5C16.714 22.5 19.071 22.5 20.535 21.035C22 19.572 22 17.214 22 12.5C22 7.786 22 5.429 20.535 3.964C19.072 2.5 16.714 2.5 12 2.5C7.286 2.5 4.929 2.5 3.464 3.964ZM16 10.5C16.5304 10.5 17.0391 10.2893 17.4142 9.91421C17.7893 9.53914 18 9.03043 18 8.5C18 7.96957 17.7893 7.46086 17.4142 7.08579C17.0391 6.71071 16.5304 6.5 16 6.5C15.4696 6.5 14.9609 6.71071 14.5858 7.08579C14.2107 7.46086 14 7.96957 14 8.5C14 9.03043 14.2107 9.53914 14.5858 9.91421C14.9609 10.2893 15.4696 10.5 16 10.5ZM6.32 13.604C6.61988 13.3253 7.01786 13.1765 7.42705 13.1902C7.83624 13.2038 8.2234 13.3789 8.504 13.677L11.152 16.487C11.538 16.897 12.0613 17.1506 12.6223 17.1997C13.1833 17.2487 13.7427 17.0897 14.194 16.753C14.4911 16.532 14.8568 16.4231 15.2265 16.4456C15.5961 16.4681 15.9459 16.6206 16.214 16.876L18.482 19.042C18.6269 19.1731 18.8172 19.2426 19.0124 19.2355C19.2077 19.2284 19.3925 19.1454 19.5275 19.0042C19.6625 18.8629 19.7371 18.6745 19.7353 18.4791C19.7335 18.2838 19.6556 18.0968 19.518 17.958L17.25 15.79C16.7255 15.2898 16.0409 14.9913 15.3174 14.9474C14.5939 14.9035 13.8782 15.1169 13.297 15.55C13.1405 15.6665 12.9466 15.7215 12.7523 15.7043C12.5579 15.6872 12.3767 15.5991 12.243 15.457L9.596 12.647C9.04383 12.0609 8.28227 11.7169 7.47747 11.6901C6.67267 11.6633 5.88993 11.9559 5.3 12.504L4.49 13.256C4.34413 13.3913 4.25797 13.5789 4.25047 13.7777C4.24297 13.9765 4.31474 14.1701 4.45 14.316C4.58526 14.4619 4.77293 14.548 4.97172 14.5555C5.1705 14.563 5.36413 14.4913 5.51 14.356L6.32 13.604Z"
                fill="#545454"
              />
            </svg>
            <span className="text-sm text-[#545454]">Upload Image</span>
          </div>

          {/* Existing images */}
          {existingImages.map((image, index) => (
            <div
              key={`existing-${index}`}
              className="relative w-[140px] h-[180px] border border-gray-200 rounded-md overflow-hidden"
            >
              <Image
                src={`${IMAGE}${image}`}
                alt={`Product image ${index + 1}`}
                fill
                className="object-cover"
                priority
              />
              <button
                type="button"
                className="absolute top-1 right-1 bg-black rounded-full p-1"
                onClick={() => handleRemoveImage(index, true)}
              >
                <X className="h-3 w-3 text-white" />
              </button>
            </div>
          ))}

          {/* Newly uploaded images */}
          {images.map((image, index) => (
            <div
              key={`new-${index}`}
              className="relative w-[140px] h-[180px] border border-gray-200 rounded-md overflow-hidden"
            >
              <Image
                src={URL.createObjectURL(image)}
                alt={`New product image ${index + 1}`}
                fill
                className="object-cover"
              />
              <button
                type="button"
                className="absolute top-1 right-1 bg-black rounded-full p-1"
                onClick={() => handleRemoveImage(index)}
              >
                <X className="h-3 w-3 text-white" />
              </button>
            </div>
          ))}

          {uploading && (
            <div className="w-[100px] h-[100px] bg-gray-100 flex items-center justify-center border border-gray-200 rounded-md">
              <span className="text-xs text-gray-500">Uploading...</span>
            </div>
          )}
        </div>

        {/* Product Name and Description Preview */}
        <div className="mb-8">
          <h2 className="text-xl font-medium text-[#333333] mb-2">
            {formData.name || "Product Name"}
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            {formData.description || "Product Description"}
          </p>
          <p className="text-lg font-light text-gray-400 mt-2">
            $ {formData.price || "00.00"}
          </p>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <Label
              htmlFor="name"
              className="text-[#333333] text-base font-medium mb-1.5"
            >
              Product Name
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter a name"
              value={formData.name}
              onChange={handleInputChange}
              className="py-2.5 px-2 md:text-lg border border-gray-200 rounded-md placeholder:text-[#545454] placeholder:text-base tracking-wide"
            />
          </div>

          <div>
            <Label
              htmlFor="category"
              className="text-[#333333] text-base font-medium mb-1.5"
            >
              Category
            </Label>
            <Input
              id="category"
              name="category"
              placeholder="Enter category name"
              value={formData.category}
              onChange={handleInputChange}
              className="py-2.5 px-2 md:text-lg border border-gray-200 rounded-md placeholder:text-[#545454] placeholder:text-base tracking-wide"
            />
          </div>

          <div>
            <Label
              htmlFor="roomType"
              className="text-[#333333] text-base font-medium mb-1.5"
            >
              Room Type
            </Label>
            <Input
              id="roomType"
              name="roomType"
              placeholder="Enter room type"
              value={formData.roomType}
              onChange={handleInputChange}
              className="py-2.5 px-2 md:text-lg border border-gray-200 rounded-md placeholder:text-[#545454] placeholder:text-base tracking-wide"
            />
          </div>

          <div>
            <Label
              htmlFor="color"
              className="text-[#333333] text-base font-medium mb-1.5"
            >
              Color
            </Label>
            <Input
              id="color"
              name="color"
              placeholder="Enter color"
              value={formData.color}
              onChange={handleInputChange}
              className="py-2.5 px-2 md:text-lg border border-gray-200 rounded-md placeholder:text-[#545454] placeholder:text-base tracking-wide"
            />
          </div>

          <div>
            <Label
              htmlFor="stock"
              className="text-[#333333] text-base font-medium mb-1.5"
            >
              Stock
            </Label>
            <Input
              id="stock"
              name="stock"
              type="number"
              placeholder="Enter stock quantity"
              value={formData.stock}
              onChange={(e) => handleNumberInputChange(e, "stock")}
              className="py-2.5 px-2 md:text-lg border border-gray-200 rounded-md placeholder:text-[#545454] placeholder:text-base tracking-wide"
            />
          </div>

          <div>
            <Label
              htmlFor="size"
              className="text-[#333333] text-base font-medium mb-1.5"
            >
              Size
            </Label>
            <Input
              id="size"
              name="size"
              placeholder="Enter size"
              value={formData.size}
              onChange={handleInputChange}
              className="py-2.5 px-2 md:text-lg border border-gray-200 rounded-md placeholder:text-[#545454] placeholder:text-base tracking-wide"
            />
          </div>

          <div className="">
            <Label
              htmlFor="materials"
              className="text-[#333333] text-base font-medium mb-1.5"
            >
              Materials
            </Label>
            <div className="">
              <div className="flex gap-2">
                <Input
                  id="materials"
                  name="materials"
                  placeholder="Enter material"
                  value={newMaterial}
                  onChange={(e) => setNewMaterial(e.target.value)}
                  className="py-2.5 px-2 md:text-lg border border-gray-200 rounded-md placeholder:text-[#545454] placeholder:text-base tracking-wide "
                />
                <Button
                  type="button"
                  onClick={handleAddMaterial}
                  className="h-10 w-10 p-0"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {formData.materials.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.materials.map((material, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full"
                    >
                      <span className="text-sm">{material}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveMaterial(index)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="">
            <Label
              htmlFor="Rental / Buyable"
              className="text-[#333333] text-base font-medium mb-1.5"
            >
              Type
            </Label>

            <RadioGroup
              value={formData.isRentable ? "isRentable" : "isBuyable"}
              className="py-2.5 flex items-center space-x-6"
              onValueChange={(value) => {
                setFormData((prev) => ({
                  ...prev,
                  isRentable: value === "isRentable",
                  isBuyable: value === "isBuyable",
                }));
              }}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="isRentable" id="r1" />
                <Label htmlFor="r1" className="text-base">
                  Rentable
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="isBuyable" id="r2" />
                <Label htmlFor="r2" className="text-base">
                  Buyable
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        {/* Dimensions Row */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div>
            <Label
              htmlFor="height"
              className="text-[#333333] text-base font-medium mb-1.5"
            >
              Height
            </Label>
            <Input
              id="height"
              name="height"
              type="number"
              placeholder="Enter height"
              value={formData.height}
              onChange={handleInputChange}
              className="py-2.5 px-2 md:text-lg border border-gray-200 rounded-md placeholder:text-[#545454] placeholder:text-base tracking-wide"
            />
          </div>

          <div>
            <Label
              htmlFor="width"
              className="text-[#333333] text-base font-medium mb-1.5"
            >
              Width
            </Label>
            <Input
              id="width"
              name="width"
              type="number"
              placeholder="Enter width"
              value={formData.width}
              onChange={handleInputChange}
              className="py-2.5 px-2 md:text-lg border border-gray-200 rounded-md placeholder:text-[#545454] placeholder:text-base tracking-wide"
            />
          </div>

          <div>
            <Label
              htmlFor="length"
              className="text-[#333333] text-base font-medium mb-1.5"
            >
              Length
            </Label>
            <Input
              id="length"
              name="length"
              type="number"
              placeholder="Enter length"
              value={formData.length}
              onChange={handleInputChange}
              className="py-2.5 px-2 md:text-lg border border-gray-200 rounded-md placeholder:text-[#545454] placeholder:text-base tracking-wide"
            />
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <Label
            htmlFor="description"
            className="text-[#333333] text-base font-medium mb-1.5"
          >
            Product Description
          </Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Enter a description"
            className="min-h-[120px]"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>

        {/* Pricing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <Label
              htmlFor="price"
              className="text-[#333333] text-base font-medium mb-1.5"
            >
              Price (For Buying)
            </Label>
            <Input
              id="price"
              name="price"
              type="number"
              placeholder="$00.00"
              value={formData.price}
              onChange={(e) => handleNumberInputChange(e, "price")}
              className="py-2.5 px-2 md:text-lg border border-gray-200 rounded-md placeholder:text-[#545454] placeholder:text-base tracking-wide"
            />
          </div>

          <div>
            <Label
              htmlFor="rentalPrice"
              className="text-[#333333] text-base font-medium mb-1.5"
            >
              Rental Price (Optional)
            </Label>
            <Input
              id="rentalPrice"
              name="rentalPrice"
              type="number"
              placeholder="$00.00"
              value={formData.rentalPrice}
              onChange={handleInputChange}
              className="py-2.5 px-2 md:text-lg border border-gray-200 rounded-md placeholder:text-[#545454] placeholder:text-base tracking-wide"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <Button
            type="submit"
            className="h-14 w-[200px] text-[#FFFFFF] text-lg font-medium bg-[#101010] cursor-pointer"
            disabled={isUpdating}
          >
            {isUpdating ? "Updating..." : "Update Product"}
          </Button>
        </div>
      </form>
    </div>
  );
}