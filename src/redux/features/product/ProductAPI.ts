import baseAPI from "@/redux/api/baseAPI";

const ProductAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (params) => {
        const queryParams = new URLSearchParams();

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

        if (params.minPrice !== undefined) {
          queryParams.append("minPrice", params.minPrice.toString());
        }

        if (params.maxPrice !== undefined) {
          queryParams.append("maxPrice", params.maxPrice.toString());
        }

        if (params.sortBy) {
          queryParams.append("sortBy", params.sortBy);
        }

        if (params.page !== undefined) {
          queryParams.append("page", params.page.toString());
        }
        
        if (params.limit !== undefined) {
          queryParams.append("limit", params.limit.toString());
        }

        return `/products?${queryParams.toString()}`;
      },
    }),

    allList: builder.query({
      query: () => "/admin/products",
    }),

    getProductById: builder.query({
      query: (id) => `/products/${id}`,
      providesTags: ["Products"],
    }),

    createProduct: builder.mutation({
      query: (body) => ({
        url: "/admin/products/create",
        method: "POST",
        body,
      }),
    }),

    updateProduct: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/admin/products/${id}/edit`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Products"],
    }),

    createVariant: builder.mutation({
      query: ({ id, formData }: { id: string; formData: FormData }) => ({
        url: `/admin/products/${id}/variant`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Products"],
    }),

    deleteProduct: builder.mutation<void, string>({
      query: (id) => ({
        url: `/admin/products/${id}/delete`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useCreateVariantMutation,
  useAllListQuery,
} = ProductAPI;
