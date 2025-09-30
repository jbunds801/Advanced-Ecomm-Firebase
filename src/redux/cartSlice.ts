import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartState } from "../types/types";
import type { Product } from "../types/types";

const initialState: CartState = {
  cartItems: [] as Product[],
};

//reducers to update the state, reusable across components
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartItem: (state, action: PayloadAction<Product>) => {
      const existingItem = state.cartItems.find(
        (product) => product.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity = (existingItem.quantity ?? 1) + 1;
      } else {
        state.cartItems.push(action.payload);
      }
    },

    removeCartItem: (state, action: PayloadAction<number>) => {
      state.cartItems = state.cartItems.filter(
        (product) => product.id !== action.payload
      );
    },

    clearCart: (state) => {
      state.cartItems = [];
    },

    increaseQuantity: (state, action: PayloadAction<{ id: number }>) => {
      const itemId = action.payload.id;
      const itemToUpdate = state.cartItems.find(
        (product) => product.id === itemId
      );
      if (itemToUpdate) {
        itemToUpdate.quantity = (itemToUpdate.quantity ?? 1) + 1;
      }
    },

    decreaseQuantity: (state, action: PayloadAction<{ id: number }>) => {
      const itemId = action.payload.id;
      const itemToUpdate = state.cartItems.find(
        (product) => product.id === itemId
      );

      const quantity = itemToUpdate?.quantity ?? 1;

      if (itemToUpdate && quantity > 1) {
        itemToUpdate.quantity = quantity - 1;
      } else {
        state.cartItems = state.cartItems.filter(
          (product) => product.id !== action.payload.id
        );
      }
    },
  },
});

export const {
  addCartItem,
  removeCartItem,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
