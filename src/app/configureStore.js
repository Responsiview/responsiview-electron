import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import userSlice from "../features/user/userSlice";
import deviceSlice from "../features/device/deviceSlice";
import toastSlice from "../features/toast/toastSlice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    device: deviceSlice.reducer,
    toast: toastSlice.reducer,
  },
  middleware: [logger],
});

export default store;
