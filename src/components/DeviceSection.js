import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import Device from "../components/Device";

import { NUMBER } from "../config/constants";

import { deviceData } from "../deviceData/deviceData";

export default function DeviceSection({ commonUrl, setCommonUrl }) {
  const [scale, setScale] = useState(1);
  const [deviceIds, setDeviceIds] = useState(Object.keys(deviceData));

  useEffect(() => {
    checkDevicesAndSetScale();
  }, [deviceIds]);

  function checkDevicesAndSetScale() {
    for (const deviceId of deviceIds) {
      const maxSize = Math.max(
        deviceData[deviceId].width,
        deviceData[deviceId].height,
      );

      if (maxSize > 1000) {
        setScale(Math.pow(NUMBER.BASE, -2));

        return;
      }
    }
  }

  return (
    <Container>
      <>
        {deviceIds.map((deviceId) => {
          const deviceInfo = deviceData[deviceId];

          return (
            <Device
              key={deviceInfo.name}
              name={deviceInfo.name}
              width={deviceInfo.width}
              height={deviceInfo.height}
              useragent={deviceInfo.useragent}
              scale={scale}
              commonUrl={commonUrl}
              setCommonUrl={setCommonUrl}
              deleteDevice={() => {}}
            />
          );
        })}
      </>
    </Container>
  );
}

const Container = styled.section`
  display: flex;
  flex-wrap: wrap;
  padding: 1rem 0 4rem 10rem;
  height: 100vh;
  width: 100vw;
  overflow-y: scroll;
`;

DeviceSection.propTypes = {
  commonUrl: PropTypes.string.isRequired,
  setCommonUrl: PropTypes.func.isRequired,
};
