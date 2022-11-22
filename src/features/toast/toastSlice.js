import { createSlice } from "@reduxjs/toolkit";

const toastSlice = createSlice({
  name: "toastSlice",
  initialState: {
    toasts: [],
    id: 1,
  },
  reducers: {
    setToasts: (state, action) => {
      state.userInfo = action.payload;
    },
    addToast: (state, action) => {
      state.toasts = [
        ...state.toasts,
        { id: state.id++, content: action.payload },
      ];
    },
    removeToastById: (state, action) => {
      state.toasts = state.toasts.filter(
        (toast) => toast.id !== action.payload,
      );
    },
  },
});

export default toastSlice;
export const { setToasts, addToast, removeToastById } = toastSlice.actions;
