import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder: (state, action) => {
      state.orders.unshift(action.payload);
    },
    clearOrders: (state) => {
      state.orders = [];
    },
    cancelOrderItem: (state, action) => {
      const { orderId, itemId, cancelType, reason } = action.payload;

      const order = state.orders.find((o) => o.id === orderId);
      if (!order) return;

      const item = order.items.find((i) => i.id === itemId);
      if (!item) return;

      item.cancelInfo = {
        cancelType,
        reason,
        refundStatus: "Refund Initiated",
        cancelledAt: new Date().toISOString(),
      };
    },
  },
});

export const { addOrder, clearOrders, cancelOrderItem } = ordersSlice.actions;

export default ordersSlice.reducer;
