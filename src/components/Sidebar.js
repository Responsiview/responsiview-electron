import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { FcMultipleDevices } from "react-icons/fc";
import { BiSave } from "react-icons/bi";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { BsBarChartLineFill } from "react-icons/bs";

import { addDisplayedDevice } from "../features/device/deviceSlice";

import { COLOR } from "../config/constants";

import { deviceData } from "../deviceData/deviceData";

export default function Sidebar() {
  const [isDevicesMenuOpen, setIsDevicesMenuOpen] = useState(true);
  const selectAvailableDeviceIds = useSelector(
    (state) => state.device.availableDeviceIds,
  );
  const dispatch = useDispatch();

  return (
    <Container>
      <ButtonContainer>
        <Button onClick={() => setIsDevicesMenuOpen(!isDevicesMenuOpen)}>
          <FcMultipleDevices />
          Devices
        </Button>
        <Button>
          <BiSave />
          Save
        </Button>
        <Button>
          <AiOutlineUnorderedList />
          Presets
        </Button>
        <Button>
          <BsBarChartLineFill />
          Performance
        </Button>
      </ButtonContainer>
      {isDevicesMenuOpen && (
        <SlideMenu>
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
        </SlideMenu>
      )}
    </Container>
  );
}
const Container = styled.div`
  display: flex;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: ${COLOR.DARK_NAVY};
  z-index: 999;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 1.5rem 1rem;
  font-size: 1rem;
  border-bottom: 0.5px solid ${COLOR.DARK_NAVY};
  color: ${COLOR.IVORY};
  background-color: ${COLOR.DARK_BLUE};

  &:hover {
    color: ${COLOR.DARK_NAVY};
    background-color: ${COLOR.IVORY};
    border-right: 0.1px solid ${COLOR.DARK_NAVY};
  }
`;

const SlideMenu = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  left: -100px;
  transform: translate(100px);
  transition: all 300ms;
  padding: 1rem 2rem;
  background-color: ${COLOR.BEIGE};
`;

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
