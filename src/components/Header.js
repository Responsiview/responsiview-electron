import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { HiMagnifyingGlassMinus, HiMagnifyingGlassPlus } from "react-icons/hi2";
import { FcMultipleDevices } from "react-icons/fc";

import {
  updateNavigationOffset,
  updateNavigationHistory,
  updateDeviceScale,
} from "../features/device/deviceSlice";
import { addToast } from "../features/toast/toastSlice";

import correctUrl from "../utils/correctUrl";

import { COLOR } from "../config/constants";

export default function Header() {
  const dispatch = useDispatch();
  const [localUrl, setLocalUrl] = useState();
  const selectCommonUrl = useSelector((state) => state.device.commonUrl);
  const selectCanGoBack = useSelector((state) => state.device.canGoBack);
  const selectCanGoForward = useSelector((state) => state.device.canGoForward);
  const selectDeviceScale = useSelector((state) => state.device.deviceScale);

  function handlePrevButtonClick() {
    dispatch(updateNavigationOffset(-1));
  }

  function handleForwardButtonClick() {
    dispatch(updateNavigationOffset(1));
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    dispatch(updateNavigationHistory(correctUrl(localUrl)));
  }

  function handleInputChange(event) {
    setLocalUrl(event.target.value);
  }

  function handleScaleDownButtonClick() {
    if (selectDeviceScale - 0.1 < 0.5) {
      dispatch(addToast("최소 배율은 50% 입니다."));

      return;
    }

    dispatch(updateDeviceScale(selectDeviceScale - 0.1));
  }

  function handleScaleUpButtonClick() {
    if (selectDeviceScale + 0.1 > 1) {
      dispatch(addToast("최대 배율은 100% 입니다."));

      return;
    }

    dispatch(updateDeviceScale(selectDeviceScale + 0.1));
  }

  useEffect(() => {
    setLocalUrl(selectCommonUrl);
  }, [selectCommonUrl]);

  return (
    <>
      <Container>
        <LogoSection>
          <FcMultipleDevices />
        </LogoSection>
        <NavigationContainer>
          <NavigationButton
            onClick={handlePrevButtonClick}
            disabled={!selectCanGoBack}
          >
            {"<"}
          </NavigationButton>
          <NavigationButton
            onClick={handleForwardButtonClick}
            disabled={!selectCanGoForward}
          >
            {">"}
          </NavigationButton>
          <form onSubmit={handleFormSubmit}>
            <UrlInput value={localUrl || ""} onChange={handleInputChange} />
          </form>
        </NavigationContainer>
        <ScaleContainer>
          <ScaleDisplay>{Math.floor(selectDeviceScale * 100)}%</ScaleDisplay>
          <ScaleButtons>
            <ScaleButton
              onClick={handleScaleDownButtonClick}
              backgroundColor={COLOR.RED}
            >
              <HiMagnifyingGlassMinus />
            </ScaleButton>
            <ScaleButton
              onClick={handleScaleUpButtonClick}
              backgroundColor={COLOR.DARK_BLUE}
            >
              <HiMagnifyingGlassPlus />
            </ScaleButton>
          </ScaleButtons>
        </ScaleContainer>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  height: 4rem;
  width: 100%;
  background-color: ${COLOR.DARK_NAVY};
  z-index: 999;
`;

const LogoSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15rem;
  height: 100%;
  font-size: 2rem;
  color: ${COLOR.IVORY};
`;

const NavigationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavigationButton = styled.button`
  width: 2rem;
  height: 2rem;
  margin: 0 0.3rem;
  font-size: 1rem;
  border-radius: 5px;
  color: ${COLOR.IVORY};
  background-color: ${COLOR.DARK_BLUE};

  &:hover {
    color: ${COLOR.DARK_BLUE};
    background-color: ${COLOR.IVORY};
  }

  &:disabled {
    color: ${COLOR.DARK_BLUE};
    background-color: ${COLOR.DARK_GRAY};
    cursor: not-allowed;
  }
`;

const UrlInput = styled.input`
  width: 50vw;
  height: 2rem;
  margin: 0 1rem;
  padding: 0 1rem;
  font-size: 1rem;
  border-style: none;
  border-radius: 5px;
  background-color: ${COLOR.LIGHT_GRAY};
`;

const ScaleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15rem;
  height: 3rem;
  padding: 0 1rem;
  margin: 0 0.5rem;
`;

const ScaleDisplay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4.5rem;
  height: 2rem;
  margin-right: 0.3rem;
  padding: 0 1rem;
  border-radius: 5px;
  background-color: ${COLOR.LIGHT_GRAY};
`;

const ScaleButtons = styled.div`
  display: flex;
`;

const ScaleButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
  margin: 0 0.3rem;
  font-size: 1.3rem;
  border-radius: 10px;
  color: ${COLOR.IVORY};
  background-color: ${(props) => props.backgroundColor};

  &:hover {
    color: ${(props) => props.backgroundColor};
    background-color: ${COLOR.IVORY};
  }
`;
