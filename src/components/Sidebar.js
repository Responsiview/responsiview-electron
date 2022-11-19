import React, { useState } from "react";
import styled from "styled-components";
import { FcMultipleDevices } from "react-icons/fc";
import { AiOutlineUnorderedList } from "react-icons/ai";

import DevicesMenu from "./DevicesMenu";
import PresetsMenu from "./PresetsMenu";

import { COLOR } from "../config/constants";

export default function Sidebar() {
  const [isDevicesMenuOpen, setIsDevicesMenuOpen] = useState(false);
  const [isPresetMenuOpen, setIsPresetMenuOpen] = useState(false);

  return (
    <Container>
      <ButtonContainer>
        <Button
          onClick={() => {
            setIsDevicesMenuOpen(!isDevicesMenuOpen);
            setIsPresetMenuOpen(false);
          }}
          isSelected={isDevicesMenuOpen}
        >
          <FcMultipleDevices />
          Devices
        </Button>
        <Button
          onClick={() => {
            setIsPresetMenuOpen(!isPresetMenuOpen);
            setIsDevicesMenuOpen(false);
          }}
          isSelected={isPresetMenuOpen}
        >
          <AiOutlineUnorderedList />
          Presets
        </Button>
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

const Button = styled.button`
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

const SlideMenu = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 17rem;
  padding: 1rem;
  background-color: ${COLOR.BEIGE};
`;
