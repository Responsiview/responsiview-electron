import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { addDisplayedDevice } from "../features/device/deviceSlice";

import { COLOR } from "../config/constants";

import { deviceData } from "../deviceData/deviceData";

export default function DevicesMenu() {
  const selectAvailableDeviceIds = useSelector(
    (state) => state.device.availableDeviceIds,
  );
  const dispatch = useDispatch();

  return (
    <>
      <Title>Available Devices</Title>
      {selectAvailableDeviceIds.length === 0
        ? "Empty"
        : selectAvailableDeviceIds.map((deviceId) => (
            <Item key={deviceId}>
              {deviceData[deviceId].name}
              <AddButton
                onClick={() => {
                  dispatch(addDisplayedDevice(deviceId));
                }}
              >
                +
              </AddButton>
            </Item>
          ))}
    </>
  );
}

const Title = styled.p`
  text-align: center;
  font-size: 1.5rem;
  margin: 1rem 0;
  color: ${COLOR.DARK_NAVY};
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  width: 15rem;
  margin: 0.5rem 0;
  font-size: 1.2rem;
  color: ${COLOR.IVORY};
  background-color: ${COLOR.DARK_NAVY};
  border-radius: 10px;
`;

const AddButton = styled.button`
  width: 2rem;
  padding: 0.5rem;
  color: ${COLOR.IVORY};
  background-color: ${COLOR.DARK_BLUE};
  border-radius: 10px;

  &:hover {
    color: ${COLOR.DARK_BLUE};
    background-color: ${COLOR.IVORY};
  }
`;
