import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  methods: [
    {
      id: "card",
      type: "card",
      label: "Debit or Credit Card",
      icon: "card",
    },
    {
      id: "paypal",
      type: "paypal",
      label: "Paypal",
      icon: "paypal",
    },
    {
      id: "cod",
      type: "cod",
      label: "Cash on Delivery",
      icon: "cod",
    },
    {
      id: "gpay",
      type: "gpay",
      label: "Google Pay",
      icon: "gpay",
    },
  ],
  selectedMethod: "card", // ✅ default selected
  cards: [],
  selectedCard: null,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    selectMethod: (state, action) => {
      state.selectedMethod = action.payload;
    },

    addCard: (state, action) => {
      state.cards.push({ id: nanoid(), ...action.payload });
    },

    editCard: (state, action) => {
      const { id, data } = action.payload;
      const index = state.cards.findIndex((c) => c.id === id);
      if (index !== -1) {
        state.cards[index] = { ...state.cards[index], ...data };
      }
    },

    deleteCard: (state, action) => {
      state.cards = state.cards.filter((c) => c.id !== action.payload);
    },

    selectCard: (state, action) => {
      state.selectedCard = action.payload;
    },
    resetPayment: (state) => {
      state.selectedCard = null;
      state.selectedMethod = "card";
    },
  },
});

export const {
  selectMethod,
  addCard,
  deleteCard,
  selectCard,
  editCard,
  resetPayment,
} = paymentSlice.actions;

export default paymentSlice.reducer;
