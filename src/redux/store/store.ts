import { configureStore } from "@reduxjs/toolkit";
import baseAPI from "../api/baseAPI";
// import ProductSlice from "@/redux/features/sell/ProductSlice";

export const store = configureStore({
  reducer: {
    [baseAPI.reducerPath]: baseAPI.reducer,

    // Product: ProductSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
