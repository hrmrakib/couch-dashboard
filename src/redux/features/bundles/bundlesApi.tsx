import baseAPI from "@/redux/api/baseAPI";

const bundlesApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    
    bundlesGet: builder.query({
        query: () => ({
            url: "/bundles",
            method: "GET",
        })
    }),
  }),
});

export const {
    useBundlesGetQuery
} = bundlesApi;
