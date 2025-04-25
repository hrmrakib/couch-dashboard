import baseAPI from "@/redux/api/baseAPI";

const ordersApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    ordersGet: builder.query({
      query: () => ({
        url: "/orders",
        method: "GET",
      }),
    }),
  }),
});

export const { useOrdersGetQuery } = ordersApi;
