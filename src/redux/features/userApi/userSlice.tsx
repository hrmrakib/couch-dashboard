import baseAPI from "@/redux/api/baseAPI";

const userApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    transactions: builder.query({
      query: () => ({
        url: "/admin/transactions",
        method: "GET",
      }),
    }),

    userProfile: builder.query({
      query: () => ({
        url: "/me",
        method: "GET",
      }),
    }),

    userProfileEdit: builder.mutation({
      query: (formData) => ({
        url: "/profile/edit",
        method: "PATCH",
        body: formData,
      }),
    }),
  }),
});

export const { useTransactionsQuery, useUserProfileQuery ,useUserProfileEditMutation } = userApi;
