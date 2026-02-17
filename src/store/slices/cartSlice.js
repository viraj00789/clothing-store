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
        SAVE100: { discount: 100, minAmount: 1000 },
        OFF500: { discount: 500, minAmount: 2000 },
        VIRAJ1000: { discount: 1000, minAmount: 3000 },
      };

      const promo = PROMOS[code];

      const itemsTotal = state.items.reduce(
        (sum, item) => sum + item.price * item.qty,
        0,
      );

      if (!promo) {
        state.promoError = "Invalid coupon code";
        state.promoDiscount = 0;
        state.promoCode = "";
        return;
      }

      if (itemsTotal < promo.minAmount) {
        state.promoError = `Minimum cart value should be ₹${promo.minAmount}`;
        state.promoDiscount = 0;
        state.promoCode = "";
        return;
      }

      state.promoCode = code;
      state.promoDiscount = promo.discount;
      state.promoError = null;
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
