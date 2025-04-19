import baseAPI from "@/redux/api/baseAPI";

const buyProductsApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    buyProductsGet: builder.query({
      query: () => ({
        url: "/trades",
        method: "GET",
      }),
        providesTags: ["Trades"],
    }),

    updateTradeStatus: builder.mutation<
      { success: boolean },
      { tradeId: string; newStatus: string }
    >({
      query: ({ tradeId, newStatus }) => ({
        url: `trades/${tradeId}/${newStatus}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Trades"],
    }),
  }),
});

export const { useBuyProductsGetQuery , useUpdateTradeStatusMutation} = buyProductsApi;
