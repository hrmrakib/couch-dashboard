import baseAPI from "@/redux/api/baseAPI";

const bundlesApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    bundlesGet: builder.query({
      query: () => ({
        url: "/bundles",
        method: "GET",
      }),
        providesTags: ["Bundles"],
    }),

    bundlesGetById: builder.query({
      query: (id) => ({
        url: `/bundles/${id}`,
        method: "GET",
      }),
        providesTags: ["Bundles"],
    }),

    bundleEdit: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/admin/bundles/${id}/edit`,
        method: "PATCH",
        body: formData
      }),
        invalidatesTags: ["Bundles"],
    }),
    deleteBundle: builder.mutation({
      query: (id) => ({
        url: `/admin/bundles/${id}/delete`,
        method: "DELETE",
      }),
      invalidatesTags: ["Bundles"]
    })

  }),
});

export const { useBundlesGetQuery, useBundlesGetByIdQuery, useBundleEditMutation , useDeleteBundleMutation} = bundlesApi;
