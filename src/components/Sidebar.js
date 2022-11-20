import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { FcMultipleDevices } from "react-icons/fc";
import { AiOutlineUnorderedList } from "react-icons/ai";

import DevicesMenu from "./DevicesMenu";
import PresetsMenu from "./PresetsMenu";

import { updateDeviceScale } from "../features/device/deviceSlice";

import { COLOR } from "../config/constants";

export default function Sidebar() {
  const dispatch = useDispatch();
  const [isDevicesMenuOpen, setIsDevicesMenuOpen] = useState(false);
  const [isPresetMenuOpen, setIsPresetMenuOpen] = useState(false);
  const selectDeviceScale = useSelector((state) => state.device.deviceScale);

  function handleDevicesButtonClick() {
    setIsDevicesMenuOpen(!isDevicesMenuOpen);
    setIsPresetMenuOpen(false);
  }

  function handlePresetsButtonClick() {
    setIsPresetMenuOpen(!isPresetMenuOpen);
    setIsDevicesMenuOpen(false);
  }

  function handleScaleDownButtonClick() {
    if (selectDeviceScale - 0.1 < 0.5) return;

    dispatch(updateDeviceScale(selectDeviceScale - 0.1));
  }
  function handleScaleUpButtonClick() {
    if (selectDeviceScale + 0.1 > 1) return;

    dispatch(updateDeviceScale(selectDeviceScale + 0.1));
  }

  return (
    <Container>
      <ButtonContainer>
        <MenuButton
          onClick={handleDevicesButtonClick}
          isSelected={isDevicesMenuOpen}
        >
          <FcMultipleDevices />
          Devices
        </MenuButton>
        <MenuButton
          onClick={handlePresetsButtonClick}
          isSelected={isPresetMenuOpen}
        >
          <AiOutlineUnorderedList />
          Presets
        </MenuButton>
        <ScaleContainer>
          <ScaleDisplay>{Math.floor(selectDeviceScale * 100)} %</ScaleDisplay>
          <ScaleButtons>
            <ScaleButton
              onClick={handleScaleDownButtonClick}
              backgroundColor={COLOR.RED}
            >
              -
            </ScaleButton>
            <ScaleButton
              onClick={handleScaleUpButtonClick}
              backgroundColor={COLOR.DARK_BLUE}
            >
              +
            </ScaleButton>
          </ScaleButtons>
        </ScaleContainer>
      </ButtonContainer>
      {isDevicesMenuOpen && (
        <SlideMenu>
          <DevicesMenu />
        </SlideMenu>
      )}
      {isPresetMenuOpen && (
        <SlideMenu>
          <PresetsMenu />
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

const MenuButton = styled.button`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 1.5rem 1rem;
  font-size: 1rem;
  border-bottom: 0.5px solid ${COLOR.DARK_NAVY};
  color: ${(props) => (props.isSelected ? COLOR.DARK_NAVY : COLOR.IVORY)};
  background-color: ${(props) =>
    props.isSelected ? COLOR.LIGHT_GRAY : COLOR.DARK_BLUE};

  &:hover {
    color: ${COLOR.DARK_NAVY};
    background-color: ${COLOR.IVORY};
  }
`;

const ScaleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
const ScaleDisplay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 2rem;
  margin-top: 1rem;
  border-radius: 10px;
  background-color: ${COLOR.IVORY};
`;

const ScaleButtons = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  margin: 0.5rem 0;
`;

const ScaleButton = styled.button`
  width: 2rem;
  height: 1.5rem;
  border-radius: 10px;
  color: ${COLOR.IVORY};
  background-color: ${(props) => props.backgroundColor};

  &:hover {
    color: ${(props) => props.backgroundColor};
    background-color: ${COLOR.IVORY};
  }
`;

const SlideMenu = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 17rem;
  padding: 1rem;
  background-color: ${COLOR.BEIGE};
`;
