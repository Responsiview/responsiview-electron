import { createSlice } from "@reduxjs/toolkit";

import { deviceData } from "../../utils/deviceData";

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
    presets: [],
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
    updatePresets: (state, action) => {
      state.presets = action.payload;
    },
    addPreset: (state, action) => {
      const newPresets = state.presets.slice();

      newPresets.push(action.payload);
      state.presets = newPresets;
    },
    loadPreset: (state, action) => {
      const preset = action.payload;

      state.commonUrl = preset.url;
      state.navigationOffset = 0;
      state.navigationHistory = [preset.url];
      state.canGoBack = false;
      state.canGoForward = false;
      state.displayedDeviceIds = preset.deviceIdList;
      state.availableDeviceIds = Object.keys(deviceData).filter(
        (id) => !preset.deviceIdList.includes(id),
      );
    },
    updateOnePreset: (state, action) => {
      const updatedPreset = action.payload;
      const newPresets = state.presets.slice();
      const index = newPresets.findIndex(
        (preset) => preset._id === updatedPreset._id,
      );

      newPresets[index] = updatedPreset;
      state.presets = newPresets;
    },
    deleteOnePreset: (state, action) => {
      const deletedPreset = action.payload;
      const newPresets = state.presets.slice();
      const index = newPresets.findIndex(
        (preset) => preset._id === deletedPreset._id,
      );

      newPresets.splice(index, 1);
      state.presets = newPresets;
    },
    initDeviceSlice: (state) => {
      state.commonUrl = "https://www.google.com/";
      state.deviceScale = 1;
      state.displayedDeviceIds = [];
      state.availableDeviceIds = Object.keys(deviceData).sort((a, b) => {
        if (deviceData[a].type === deviceData[b].type)
          return deviceData[a].width - deviceData[b].width;
        if (deviceData[a].type > deviceData[b].type) return 1;
        if (deviceData[a].type < deviceData[b].type) return -1;
      });
      state.canGoBack = false;
      state.canGoForward = false;
      state.navigationOffset = 0;
      state.navigationHistory = ["https://www.google.com/"];
      state.presets = [];
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
  updatePresets,
  addPreset,
  loadPreset,
  updateOnePreset,
  deleteOnePreset,
  initDeviceSlice,
} = deviceSlice.actions;
