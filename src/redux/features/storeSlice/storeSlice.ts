import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  id: string;
  // add other product properties here
}

const storeSlice = createSlice({
  name: "store",
  initialState: {
    products: [] as Product[],
  },
  reducers: {
    addToProduct: (state, action) => {
      state.products = action.payload;
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter((item) => item.id !== action.payload);     
    },
    // clearCart: (state) => {
    //   state.cart = [];
    //   state.totalPrice = 0;
    //   state.totalItems = 0;
    // },
  },
});

export const { addToProduct } = storeSlice.actions;
export default storeSlice.reducer;
