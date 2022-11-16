import { createSlice } from "@reduxjs/toolkit";

import { deviceData } from "../../deviceData/deviceData";

const deviceSlice = createSlice({
  name: "deviceSlice",
  initialState: {
    commonUrl: "https://www.google.com",
    deviceScale: 1,
    displayedDeviceIds: [],
    availableDeviceIds: Object.keys(deviceData),
  },
  reducers: {
    updateCommonUrl: (state, action) => {
      state.commonUrl = action.payload;
    },
    addDisplayedDevice: (state, action) => {
      const newDisplayedDeviceIds = state.displayedDeviceIds.slice();

      newDisplayedDeviceIds.push(action.payload);
      state.displayedDeviceIds = newDisplayedDeviceIds;

      const index = state.availableDeviceIds.indexOf(action.payload);
      const newAvailableDeviceIds = state.availableDeviceIds.slice();

      newAvailableDeviceIds.splice(index, 1);
      state.availableDeviceIds = newAvailableDeviceIds;
    },
    deleteDisplayedDevice: (state, action) => {
      const index = state.displayedDeviceIds.indexOf(action.payload);
      const newDisplayedDeviceIds = state.displayedDeviceIds.slice();

      newDisplayedDeviceIds.splice(index, 1);
      state.displayedDeviceIds = newDisplayedDeviceIds;

      const newAvailableDeviceIds = state.availableDeviceIds.slice();

      newAvailableDeviceIds.push(action.payload);
      state.availableDeviceIds = newAvailableDeviceIds;
    },
    updateDeviceScale: (state, action) => {
      state.deviceScale = action.payload;
    },
  },
});

export default deviceSlice;
export const {
  updateCommonUrl,
  addDisplayedDevice,
  deleteDisplayedDevice,
  updateDeviceScale,
} = deviceSlice.actions;
