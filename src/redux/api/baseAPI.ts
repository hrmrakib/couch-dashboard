// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const baseAPI = createApi({
//   reducerPath: "api",
//   baseQuery: fetchBaseQuery({
//     baseUrl: process.env.NEXT_PUBLIC_API_URL,
//   }),
  // tagTypes: ["Products", "reviews", "review"],
//   endpoints: () => ({}),
// });

// export default baseAPI;




import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseAPI = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("accessToken");

            
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ["Products", "reviews", "review", "Trades", 'Bundles'],
    endpoints: () => ({}),
});

export default baseAPI;