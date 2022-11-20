import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";
import { TfiReload } from "react-icons/tfi";
import { RiDeleteBin5Fill } from "react-icons/ri";

import {
  deleteDisplayedDevice,
  updateNavigationHistory,
  updateCommonUrl,
} from "../features/device/deviceSlice";

import { COLOR } from "../config/constants";

export default function Device({ id, name, width, height, useragent }) {
  const webviewRef = useRef();
  const commonUrlRef = useRef();
  const [didMount, setDidMount] = useState(false);
  const dispatch = useDispatch();
  const selectDeviceScale = useSelector((state) => state.device.deviceScale);
  const selectCommonUrl = useSelector((state) => state.device.commonUrl);
  const selectNavigationOffset = useSelector(
    (state) => state.device.navigationOffset,
  );
  const selectNavigationHistory = useSelector(
    (state) => state.device.navigationHistory,
  );

  function handleReloadButtonClick() {
    webviewRef.current.reload();
  }

  function handleDeleteButtonClick() {
    dispatch(deleteDisplayedDevice(id));
  }

  function handleWebviewWillNavigate(event) {
    if (commonUrlRef.current !== event.url) {
      dispatch(updateNavigationHistory(event.url));
    }
  }

  function handleWebviewDidRedirectNavigation(event) {
    dispatch(updateCommonUrl(event.url));
  }

  useEffect(() => {
    commonUrlRef.current = selectCommonUrl;
  }, [selectCommonUrl]);

  useEffect(() => {
    if (didMount) {
      webviewRef.current.setZoomFactor(selectDeviceScale);
      webviewRef.current.executeJavaScript("window.scrollTo(0,0)");
      webviewRef.current.reload();
    }
  }, [selectDeviceScale]);

  // useEffect(() => {}, []);

  useEffect(() => {
    setDidMount(true);
    webviewRef.current.addEventListener(
      "will-navigate",
      handleWebviewWillNavigate,
    );
    webviewRef.current.addEventListener(
      "did-redirect-navigation",
      handleWebviewDidRedirectNavigation,
    );
  }, []);

  return (
    <DeviceContainer>
      <DeviceHeader>
        <DeviceDescription>
          <span>{name}</span>
          <span>{` (${width} x ${height})`}</span>
        </DeviceDescription>
        <ButtonContainer>
          <ReloadButton onClick={handleReloadButtonClick}>
            <TfiReload />
          </ReloadButton>
          <DeleteButton onClick={handleDeleteButtonClick}>
            <RiDeleteBin5Fill />
          </DeleteButton>
        </ButtonContainer>
      </DeviceHeader>
      <WebviewContainer
        scaledWidth={`${width * selectDeviceScale}px`}
        scaledHeight={`${height * selectDeviceScale}px`}
      >
        <webview
          className="webview"
          src={selectNavigationHistory[selectNavigationOffset]}
          useragent={useragent}
          ref={webviewRef}
          preload={`file://${window.path.dirname()}/webview_preload.js`}
        />
      </WebviewContainer>
    </DeviceContainer>
  );
}

const DeviceContainer = styled.div`
  margin: 1rem;
`;

const WebviewContainer = styled.div`
  border: 1px solid black;
  width: ${(props) => props.scaledWidth};
  height: ${(props) => props.scaledHeight};

  .webview {
    width: 100%;
    height: 100%;
    background-color: white;
  }
`;

const DeviceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.5rem;
  height: 3rem;
  font-size: 1rem;
  background-color: ${COLOR.IVORY};
`;

const DeviceDescription = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  font-size: 0.9rem;
`;

const ButtonContainer = styled.div`
  display: flex;
`;

const ReloadButton = styled.button`
  display: flex;
  align-items: center;
  width: 1.7rem;
  height: 1.7rem;
  margin-right: 1rem;
  font-size: 1rem;
  border-radius: 10px;
  background-color: ${COLOR.DARK_BLUE};
  color: ${COLOR.IVORY};

  &:hover {
    background-color: ${COLOR.IVORY};
    color: ${COLOR.DARK_BLUE};
  }
`;

const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  width: 1.7rem;
  height: 1.7rem;
  font-size: 1rem;
  border-radius: 10px;
  background-color: ${COLOR.RED};
  color: ${COLOR.IVORY};

  &:hover {
    background-color: ${COLOR.IVORY};
    color: ${COLOR.RED};
  }
`;

Device.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  useragent: PropTypes.string.isRequired,
};
