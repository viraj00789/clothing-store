import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  addresses: [
    {
      id: nanoid(),
      country: "India",
      city: "Mumbai",
      zip: "400001",
      street: "221B Andheri East",
      phone: "9876543210",
    },
    {
      id: nanoid(),
      country: "USA",
      city: "New York",
      zip: "100001",
      street: "742 Evergreen Terrace",
      phone: "1234567890",
    },
  ],
  selectedId: null,
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    addAddress: (state, action) => {
      state.addresses.push({
        id: nanoid(),
        ...action.payload,
      });
    },

    editAddress: (state, action) => {
      const { id, data } = action.payload;
      const index = state.addresses.findIndex((a) => a.id === id);
      if (index !== -1) {
        state.addresses[index] = {
          ...state.addresses[index],
          ...data,
        };
      }
    },

    deleteAddress: (state, action) => {
      state.addresses = state.addresses.filter((a) => a.id !== action.payload);
    },

    selectAddress: (state, action) => {
      state.selectedId = action.payload;
    },

    resetAddress: (state) => {
      state.selectedId = null;
    },
  },
});

export const {
  addAddress,
  editAddress,
  deleteAddress,
  selectAddress,
  resetAddress,
} = addressSlice.actions;

// ✅ Selector (THIS is how you "get all addresses")
export const selectAllAddresses = (state) => state.address.addresses;
export const selectSelectedAddress = (state) =>
  state.address.addresses.find((a) => a.id === state.address.selectedId);

export default addressSlice.reducer;
