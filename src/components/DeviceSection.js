import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import Device from "./Device";

import { deviceData } from "../utils/deviceData";

export default function DeviceSection() {
  const selectDisplayedDeviceIds = useSelector(
    (state) => state.device.displayedDeviceIds,
  );

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
