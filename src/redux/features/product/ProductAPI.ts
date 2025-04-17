import baseAPI from "@/redux/api/baseAPI";
import { Product } from "./../../../lib/types";

const ProductAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => "/products",
    }),

    getProductById: builder.query<Product, string>({
      query: (id) => `/products/${id}`,
    }),

    createProduct: builder.mutation<Product, Partial<Product>>({
      query: (body) => ({
        url: "/admin/products/create",
        method: "POST",
        body,
      }),
    }),
    updateProduct: builder.mutation<Product, Partial<Product>>({
      query: ({ id, ...body }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body,
      }),
    }),
    deleteProduct: builder.mutation<void, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = ProductAPI;
