import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import userSlice from "../features/user/userSlice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
  middleware: [logger],
});

export default store;
