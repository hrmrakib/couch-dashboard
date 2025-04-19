import baseAPI from "@/redux/api/baseAPI";

const userApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    
    transactions: builder.query({
        query: () => ({
            url: "/admin/transactions",
            method: "GET",
        })
    }),
  }),
});

export const {
    useTransactionsQuery
} = userApi;
