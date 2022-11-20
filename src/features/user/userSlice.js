import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    userInfo: {},
  },
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    initUserSlice: (state) => {
      state.userInfo = {};
    },
  },
});

export default userSlice;
export const { setUserInfo, initUserSlice } = userSlice.actions;
