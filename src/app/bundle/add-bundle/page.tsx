"use client";

import { useState, useRef, type ChangeEvent } from "react";
import Image from "next/image";
import { Plus, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useBundleCreateMutation } from "@/redux/features/bundles/bundlesApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface RootState {
  store: {
    products: {
      id: string;
      name: string;
      image: string;
    }[];
  };
}

export default function BundleCreator() {
  const dispatch = useDispatch();
  const router = useRouter();
  const storeData = useSelector((state: RootState) => state.store.products);
  const [bundleCreate] = useBundleCreateMutation();

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    rentPrice: "",
    notesInput: "",
    rating: "4",
    stock: "10",
  });

  const [notesList, setNotesList] = useState<string[]>([]);
  const [coverImages, setCoverImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const removeFromCart = (id: string) => {
    dispatch({ type: "store/removeFromCart", payload: id });
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);
      const newPreviews: string[] = [];

      newFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target && event.target.result) {
            const result = event.target.result as string;
            newPreviews.push(result);
            setImagePreviews((prev) => [...prev, result]);
          }
        };
        reader.readAsDataURL(file);
      });

      setCoverImages((prev) => [...prev, ...newFiles]);
    }
  };

  const removeImage = (index: number) => {
    setCoverImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));

    if (fileInputRef.current) {
      const dataTransfer = new DataTransfer();
      coverImages.forEach((file, i) => {
        if (i !== index) dataTransfer.items.add(file);
      });
      fileInputRef.current.files = dataTransfer.files;
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addNote = () => {
    if (formData.notesInput.trim()) {
      setNotesList((prev) => [...prev, formData.notesInput.trim()]);
      setFormData((prev) => ({ ...prev, notesInput: "" }));
    }
  };

  const removeNote = (index: number) => {
    setNotesList((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCreate = async () => {
    try {
      setError(null);

      // Validate required fields
      if (!formData.name) throw new Error("Bundle name is required");
      if (!formData.description) throw new Error("Description is required");
      if (storeData.length === 0) throw new Error("At least one product is required");
      if (!formData.price) throw new Error("Price is required");
      if (!formData.rentPrice) throw new Error("Rent price is required");
      if (isNaN(parseInt(formData.stock))) throw new Error("Stock must be a valid number");

      // Prepare the data object
      const requestData = {
        name: formData.name,
        description: formData.description,
        products: storeData.map((item) => item.id),
        price: parseFloat(formData.price).toString(),
        rentPrice: parseFloat(formData.rentPrice).toString(),
        notes: JSON.stringify(notesList),
        rating: formData.rating,
        stock: parseInt(formData.stock).toString(),
      };

      // Create FormData for file upload
      const formDataToSend = new FormData();

      // Append images if they exist
      coverImages.forEach((file) => {
        formDataToSend.append("images", file);
      });

      // Append other fields directly
      formDataToSend.append("name", requestData.name);
      formDataToSend.append("description", requestData.description);
      formDataToSend.append("products", JSON.stringify(requestData.products));
      formDataToSend.append("price", requestData.price);
      formDataToSend.append("rentPrice", requestData.rentPrice);
      formDataToSend.append("notes", requestData.notes);
      formDataToSend.append("rating", requestData.rating);
      formDataToSend.append("stock", requestData.stock);

      // Call the API
      const response = await bundleCreate(formDataToSend).unwrap();
      toast.success(response?.message || "Bundle created successfully");
      router.push("/bundle"); // Redirect to the bundles page

      // Reset form after successful creation
      setFormData({
        name: "",
        description: "",
        price: "",
        rentPrice: "",
        notesInput: "",
        rating: "4",
        stock: "10",
      });
      setNotesList([]);
      setCoverImages([]);
      setImagePreviews([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error: any) {
      console.error("Failed to create bundle:", error);
      setError(error.message || "Failed to create bundle");
      toast.error(error.message || "Failed to create bundle");
    }
  };

  const IMAGE = process.env.NEXT_PUBLIC_IMAGE_URL;

  return (
    <div className="container mx-auto p-4 font-sans">
      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {/* Selected Items */}
      <div className="border border-gray-200 rounded-lg p-4 mb-6">
        <h3 className="text-lg font-medium mb-3">Selected Products</h3>
        <div className="flex flex-wrap gap-2">
          {storeData.length > 0 ? (
            storeData.map((item) => (
              <div
                key={item.id}
                className="flex items-center bg-gray-100 rounded-md px-3 py-2 gap-2"
              >
                <Image
                  src={`${IMAGE}${item.image}`}
                  alt={item.name}
                  width={50}
                  height={50}
                  className="w-8 h-8 rounded-md"
                />
                <span className="font-medium text-sm">{item.name}</span>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="ml-2 text-gray-500 hover:text-gray-700"
                >
                  <X size={16} />
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No products selected</p>
          )}
        </div>
      </div>

      {/* Upload Cover Images */}
      <div className="mb-6">
        <p className="text-lg text-[#333333] font-medium mb-4">
          Upload Cover Images
        </p>
        <div className="flex flex-col md:flex-row items-start gap-6">
          {/* Upload Area */}
          <div
            className="w-full md:w-64 h-48 bg-white border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
            onClick={triggerFileInput}
          >
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-gray-500"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.464 3.964C2 5.43 2 7.786 2 12.5C2 17.214 2 19.571 3.464 21.035C4.93 22.5 7.286 22.5 12 22.5C16.714 22.5 19.071 22.5 20.535 21.035C22 19.572 22 17.214 22 12.5C22 7.786 22 5.429 20.535 3.964C19.072 2.5 16.714 2.5 12 2.5C7.286 2.5 4.929 2.5 3.464 3.964ZM16 10.5C16.5304 10.5 17.0391 10.2893 17.4142 9.91421C17.7893 9.53914 18 9.03043 18 8.5C18 7.96957 17.7893 7.46086 17.4142 7.08579C17.0391 6.71071 16.5304 6.5 16 6.5C15.4696 6.5 14.9609 6.71071 14.5858 7.08579C14.2107 7.46086 14 7.96957 14 8.5C14 9.03043 14.2107 9.53914 14.5858 9.91421C14.9609 10.2893 15.4696 10.5 16 10.5ZM6.32 13.604C6.61988 13.3253 7.01786 13.1765 7.42705 13.1902C7.83624 13.2038 8.2234 13.3789 8.504 13.677L11.152 16.487C11.538 16.897 12.0613 17.1506 12.6223 17.1997C13.1833 17.2487 13.7427 17.0897 14.194 16.753C14.4911 16.532 14.8568 16.4231 15.2265 16.4456C15.5961 16.4681 15.9459 16.6206 16.214 16.876L18.482 19.042C18.6269 19.1731 18.8172 19.2426 19.0124 19.2355C19.2077 19.2284 19.3925 19.1454 19.5275 19.0042C19.6625 18.8629 19.7371 18.6745 19.7353 18.4791C19.7335 18.2838 19.6556 18.0968 19.518 17.958L17.25 15.79C16.7255 15.2898 16.0409 14.9913 15.3174 14.9474C14.5939 14.9035 13.8782 15.1169 13.297 15.55C13.1405 15.6665 12.9466 15.7215 12.7523 15.7043C12.5579 15.6872 12.3767 15.5991 12.243 15.457L9.596 12.647C9.04383 12.0609 8.28227 11.7169 7.47747 11.6901C6.67267 11.6633 5.88993 11.9559 5.3 12.504L4.49 13.256C4.34413 13.3913 4.25797 13.5789 4.25047 13.7777C4.24297 13.9765 4.31474 14.1701 4.45 14.316C4.58526 14.4619 4.77293 14.548 4.97172 14.5555C5.1705 14.563 5.36413 14.4913 5.51 14.356L6.32 13.604Z"
                fill="currentColor"
              />
            </svg>
            <p className="text-sm text-gray-500 mt-3">Upload Images</p>
            <p className="text-xs text-gray-400 mt-1">
              (Supports multiple images)
            </p>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
              accept="image/*"
              multiple
            />
          </div>

          {/* Image Previews */}
          {imagePreviews.length > 0 && (
            <div className="flex-1">
              <div className="flex flex-wrap gap-4">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative group">
                    <Image
                      src={preview}
                      alt={`Cover ${index + 1}`}
                      width={80}
                      height={80}
                      className="w-20 h-20 object-cover rounded-lg shadow-sm"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bundle Preview */}
      <div className="mb-6">
        <h2 className="text-2xl font-medium text-[#333333]">
          {formData.name || "Bundle Name"}
        </h2>
        <p className="text-sm text-[#333333]">
          {formData.description || "Bundle Description"}
        </p>
        <div className="flex items-center gap-3 mt-2">
          {formData.price && (
            <span className="font-semibold text-2xl text-[#333333]">
              ${formData.price}
            </span>
          )}
          {formData.rentPrice && (
            <span className="text-2xl text-[#D6D6D6]">
              Rent: ${formData.rentPrice}
            </span>
          )}
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">Bundle Name*</label>
          <input
            type="text"
            name="name"
            placeholder="Enter bundle name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Stock*</label>
          <input
            type="number"
            name="stock"
            placeholder="Enter stock quantity"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
            value={formData.stock}
            onChange={handleInputChange}
            required
            min="1"
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Description*</label>
        <textarea
          name="description"
          placeholder="Enter bundle description"
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
          value={formData.description}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">Price*</label>
          <div className="relative">
            <span className="absolute left-3 top-2">$</span>
            <input
              type="number"
              name="price"
              placeholder="00.00"
              className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
              value={formData.price}
              onChange={handleInputChange}
              required
              min="0"
              step="0.01"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Rent Price*</label>
          <div className="relative">
            <span className="absolute left-3 top-2">$</span>
            <input
              type="number"
              name="rentPrice"
              placeholder="00.00"
              className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
              value={formData.rentPrice} // Fixed: Changed from formData.price to formData.rentPrice
              onChange={handleInputChange}
              required
              min="0"
              step="0.01"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Rating*</label>
          <select
            name="rating"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
            value={formData.rating}
            onChange={handleInputChange}
            required
          >
            <option value="1">1 Star</option>
            <option value="2">2 Stars</option>
            <option value="3">3 Stars</option>
            <option value="4">4 Stars</option>
            <option value="5">5 Stars</option>
          </select>
        </div>
      </div>

      <div className="mb-8">
        <label className="block text-sm font-medium mb-2">
          Items In Bundle (Notes)
        </label>
        <div className="flex items-center gap-3 mb-2">
          <input
            type="text"
            name="notesInput"
            placeholder="E.g 1 Table, 2 Chair, 1 Bed, 1 Coffee Table"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
            value={formData.notesInput}
            onChange={handleInputChange}
          />
          <button
            onClick={addNote}
            className="px-4 py-3 bg-gray-800 text-white rounded-md hover:bg-gray-700"
            disabled={!formData.notesInput.trim()}
          >
            <Plus size={16} className="mr-1" />
          </button>
        </div>
        {notesList.length > 0 && (
          <ul className="mt-2 space-y-2">
            {notesList.map((note, index) => (
              <li
                key={index}
                className="flex items-center justify-between bg-gray-100 rounded-md px-3 py-2"
              >
                <span>{note}</span>
                <button
                  onClick={() => removeNote(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X size={16} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3">
        <button
          className="px-5 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          onClick={() => {
            setFormData({
              name: "",
              description: "",
              price: "",
              rentPrice: "",
              notesInput: "",
              rating: "4",
              stock: "10",
            });
            setNotesList([]);
            setCoverImages([]);
            setImagePreviews([]);
            if (fileInputRef.current) {
              fileInputRef.current.value = "";
            }
          }}
        >
          Cancel
        </button>
        <button
          onClick={handleCreate}
          className="px-5 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
          disabled={
            !formData.name ||
            !formData.description ||
            !formData.price ||
            !formData.rentPrice ||
            storeData.length === 0 ||
            isNaN(parseInt(formData.stock))
          }
        >
          Create Bundle
        </button>
      </div>
    </div>
  );
}