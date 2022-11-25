import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { GoDeviceMobile } from "react-icons/go";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { BsBarChartLineFill } from "react-icons/bs";

import DevicesMenu from "./DevicesMenu";
import PresetsMenu from "./PresetsMenu";
import Modal from "./Modal";
import PerformanceCheck from "./PerformanceCheck";

import { initUserSlice } from "../features/user/userSlice";
import { initDeviceSlice } from "../features/device/deviceSlice";
import { addToast } from "../features/toast/toastSlice";

import { COLOR } from "../config/constants";

export default function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDevicesMenuOpen, setIsDevicesMenuOpen] = useState(false);
  const [isPresetMenuOpen, setIsPresetMenuOpen] = useState(false);
  const [isFCPModalOpen, setIsFCPModalOpen] = useState(false);
  const ipcRenderer = window.electron.ipcRenderer;

  function handleDevicesButtonClick() {
    setIsDevicesMenuOpen(!isDevicesMenuOpen);
    setIsPresetMenuOpen(false);
    setIsFCPModalOpen(false);
  }

  function handlePresetsButtonClick() {
    setIsPresetMenuOpen(!isPresetMenuOpen);
    setIsDevicesMenuOpen(false);
    setIsFCPModalOpen(false);
  }

  function handleFCPButtonClick() {
    setIsFCPModalOpen(!isFCPModalOpen);
    setIsDevicesMenuOpen(false);
    setIsPresetMenuOpen(false);
  }

  async function handleLogoutButtonClick() {
    ipcRenderer.send("removeAllCookies");

    dispatch(addToast("로그아웃 되었습니다."));

    dispatch(initUserSlice());
    dispatch(initDeviceSlice());

    navigate("/", { replace: true });
  }

  return (
    <>
      {isFCPModalOpen && (
        <Modal
          closeModal={() => setIsFCPModalOpen(false)}
          style={{ width: "50rem", height: "30rem" }}
        >
          <PerformanceCheck closeModal={() => setIsFCPModalOpen(false)} />
        </Modal>
      )}
      <Container>
        <TopContainer>
          <MenuButtons>
            <MenuButton
              onClick={handleDevicesButtonClick}
              isSelected={isDevicesMenuOpen}
            >
              <GoDeviceMobile />
              Devices
            </MenuButton>
            <MenuButton
              onClick={handlePresetsButtonClick}
              isSelected={isPresetMenuOpen}
            >
              <AiOutlineUnorderedList />
              Presets
            </MenuButton>
            <MenuButton
              onClick={handleFCPButtonClick}
              isSelected={isFCPModalOpen}
            >
              <BsBarChartLineFill />
              Measuring
            </MenuButton>
          </MenuButtons>
        </TopContainer>
        <BottomContainer>
          <LogoutButton onClick={handleLogoutButtonClick}>Logout</LogoutButton>
        </BottomContainer>
      </Container>
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
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${COLOR.DARK_NAVY};
  height: ${`calc(100vh - 4rem)`};
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MenuButtons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  background-color: ${COLOR.DARK_NAVY};
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

const BottomContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 0.3rem;
`;

const LogoutButton = styled.button`
  width: 90%;
  height: 4rem;
  font-size: 1rem;
  border-radius: 5px;
  background-color: ${COLOR.RED};
  color: ${COLOR.IVORY};

  &:hover {
    background-color: ${COLOR.DARK_RED};
    color: ${COLOR.IVORY};
  }
`;

const SlideMenu = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 24rem;
  padding: 1rem;
  background-color: ${COLOR.BEIGE};
`;
