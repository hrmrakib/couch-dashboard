import baseAPI from "@/redux/api/baseAPI";


const ProductAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/products",
    }),

    allList: builder.query({
      query: () => "/admin/products",
    }),

    getProductById: builder.query({
      query: (id) => `/products/${id}`,
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

    // bundleEdit: builder.mutation({
    //   query: ({ id, formData }) => ({
    //     url: `/admin/bundles/${id}/edit`,
    //     method: "PATCH",
    //     body: formData
    //   }),
    //     invalidatesTags: ["Bundles"],
    // }),

    createVariant: builder.mutation({
      query: ({ id, formData }: { id: string; formData: FormData }) => ({
        url: `/admin/products/${id}/variant`,
        // /admin/products/{{productId}}/variant
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Products"],
    }),

    deleteProduct: builder.mutation<void, string>({
      query: (id) => ({
        url: `/admin/products/${id}/delete`,
        // /admin/products/{{productId}}/delete
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
  useAllListQuery
} = ProductAPI;
