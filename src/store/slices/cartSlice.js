import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  promoCode: "",
  promoDiscount: 0,
  promoError: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      const existing = state.items.find((i) => i.id === product.id);

      if (existing) {
        existing.qty += 1;
      } else {
        state.items.push({ ...product, qty: 1 });
      }
    },

    increaseQty(state, action) {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) item.qty += 1;
    },

    decreaseQty(state, action) {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) {
        item.qty -= 1;
        if (item.qty <= 0) {
          state.items = state.items.filter((i) => i.id !== action.payload);
        }
      }
    },

    applyPromo: (state, action) => {
      const code = action.payload.trim().toUpperCase();

      const PROMOS = {
        SAVE10: 10,
        OFF50: 50,
        VIRAJ100: 100,
      };

      if (PROMOS[code]) {
        state.promoCode = code;
        state.promoDiscount = PROMOS[code];
        state.promoError = null;
      } else {
        state.promoError = "Invalid coupon code";
        state.promoDiscount = 0;
        state.promoCode = "";
      }
    },
    removePromo: (state) => {
      state.promoCode = "";
      state.promoDiscount = 0;
      state.promoError = null;
    },

    clearCart(state) {
      state.items = [];
      state.promoCode = null;
      state.promoDiscount = 0;
    },

    deleteFromCart(state, action) {
      state.items = state.items.filter((items) => items.id !== action.payload);
    },

    addManyToCart: (state, action) => {
      const products = action.payload; // array from wishlist

      products.forEach((product) => {
        const existing = state.items.find((p) => p.id === product.id);

        if (existing) {
          existing.qty += 1;
        } else {
          state.items.push({ ...product, qty: 1 });
        }
      });
    },
  },
});

export const {
  addToCart,
  increaseQty,
  decreaseQty,
  applyPromo,
  clearCart,
  deleteFromCart,
  removePromo,
  addManyToCart,
} = cartSlice.actions;

export default cartSlice.reducer;
