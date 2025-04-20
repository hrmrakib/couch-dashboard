import baseAPI from "@/redux/api/baseAPI";


const ProductAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/products",
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

    deleteProduct: builder.mutation<void, string>({
      query: (id) => ({
        url: `/admin/products/${id}/delete`,
        // /admin/products/{{productId}}/delete
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
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
