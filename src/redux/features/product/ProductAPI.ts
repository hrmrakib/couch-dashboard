import baseAPI from "@/redux/api/baseAPI";
import { Product } from "./../../../lib/types";

const ProductAPI = baseAPI.injectEndpoints({
  query: (params) => {
    const queryParams = new URLSearchParams();
  
    // Comma-separated filters
    if (params.categories?.length) {
      queryParams.append("categories", params.categories.join(","));
    }
  
    if (params.colors) {
      queryParams.append("colors", params.colors);
    }
  
    if (params.sizes?.length) {
      queryParams.append("sizes", params.sizes.join(","));
    }
  
    if (params.materials?.length) {
      queryParams.append("materials", params.materials.join(","));
    }
  
    if (params.availities?.length) {
      queryParams.append("availities", params.availities.join(","));
    }
  
    // Price range
    if (params.minPrice !== undefined) {
      queryParams.append("minPrice", params.minPrice.toString());
    }
    if (params.maxPrice !== undefined) {
      queryParams.append("maxPrice", params.maxPrice.toString());
    }
  
    // Sorting and pagination
    if (params.sortBy) {
      queryParams.append("sortBy", params.sortBy);
    }
    if (params.page !== undefined) {
      queryParams.append("page", params.page.toString());
    }
    if (params.limit !== undefined) {
      queryParams.append("limit", params.limit.toString());
    }
  
    // Debugging output
    console.log("queryParams", queryParams.toString());
  
    return `/products?${queryParams.toString()}`;
  }
  
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = ProductAPI;
