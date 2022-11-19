import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { updateDeviceScale } from "../features/device/deviceSlice";

import Device from "./Device";

import { NUMBER } from "../config/constants";

import { deviceData } from "../deviceData/deviceData";

export default function DeviceSection() {
  const dispatch = useDispatch();
  const selectDisplayedDeviceIds = useSelector(
    (state) => state.device.displayedDeviceIds,
  );

  useEffect(() => {
    checkDevicesAndUpdateScale();
  }, [selectDisplayedDeviceIds]);

  function checkDevicesAndUpdateScale() {
    for (const deviceId of selectDisplayedDeviceIds) {
      const maxSize = Math.max(
        deviceData[deviceId].width,
        deviceData[deviceId].height,
      );

      if (maxSize > 1000) {
        dispatch(updateDeviceScale(Math.pow(NUMBER.BASE, -2)));

        return;
      }
    }

    dispatch(updateDeviceScale(1));
  }

  return (
    <Container>
      {selectDisplayedDeviceIds.map((deviceId) => {
        const deviceInfo = deviceData[deviceId];

        return (
          <Device
            key={deviceId}
            id={deviceId}
            name={deviceInfo.name}
            width={deviceInfo.width}
            height={deviceInfo.height}
            useragent={deviceInfo.useragent}
          />
        );
      })}
    </Container>
  );
}

const Container = styled.section`
  display: flex;
  flex-wrap: wrap;
  padding: 1rem 0 4rem 1rem;
  height: 100vh;
  width: 100vw;
  overflow-y: scroll;
`;
