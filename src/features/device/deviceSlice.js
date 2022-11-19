import { createSlice } from "@reduxjs/toolkit";

import { deviceData } from "../../deviceData/deviceData";

const deviceSlice = createSlice({
  name: "deviceSlice",
  initialState: {
    commonUrl: "https://www.google.com/",
    deviceScale: 1,
    displayedDeviceIds: [],
    availableDeviceIds: Object.keys(deviceData).sort((a, b) => {
      if (deviceData[a].type === deviceData[b].type)
        return deviceData[a].width - deviceData[b].width;
      if (deviceData[a].type > deviceData[b].type) return 1;
      if (deviceData[a].type < deviceData[b].type) return -1;
    }),
    canGoBack: false,
    canGoForward: false,
    navigationOffset: 0,
    navigationHistory: ["https://www.google.com/"],
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
      newAvailableDeviceIds.sort((a, b) => {
        if (deviceData[a].type === deviceData[b].type)
          return deviceData[a].width - deviceData[b].width;
        if (deviceData[a].type > deviceData[b].type) return 1;
        if (deviceData[a].type < deviceData[b].type) return -1;
      });
      state.availableDeviceIds = newAvailableDeviceIds;
    },
    updateDeviceScale: (state, action) => {
      state.deviceScale = action.payload;
    },
    updateNavigationOffset: (state, action) => {
      state.navigationOffset += action.payload;

      state.commonUrl = state.navigationHistory[state.navigationOffset];

      state.canGoBack = state.navigationOffset > 0;
      state.canGoForward =
        state.navigationOffset < state.navigationHistory.length - 1;
    },
    updateNavigationHistory: (state, action) => {
      if (state.navigationHistory[state.navigationOffset] === action.payload)
        return;

      const newNavigationHistory = state.navigationHistory.slice(
        0,
        state.navigationOffset + 1,
      );

      newNavigationHistory.push(action.payload);

      state.navigationHistory = newNavigationHistory;
      state.commonUrl = action.payload;
      state.navigationOffset += 1;
      state.canGoBack = true;
      state.canGoForward = false;
    },
  },
});

export default deviceSlice;
export const {
  updateCommonUrl,
  addDisplayedDevice,
  deleteDisplayedDevice,
  updateDeviceScale,
  updateNavigationOffset,
  updateNavigationHistory,
} = deviceSlice.actions;
