import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";
import { TfiReload } from "react-icons/tfi";
import { RiDeleteBin5Fill } from "react-icons/ri";

import { deleteDisplayedDevice } from "../features/device/deviceSlice";

import { COLOR } from "../config/constants";

export default function Device({ id, name, width, height, useragent }) {
  const webviewRef = useRef();
  const dispatch = useDispatch();
  const selectDeviceScale = useSelector((state) => state.device.deviceScale);
  const selectCommonUrl = useSelector((state) => state.device.commonUrl);

  function handleWebviewDomReady() {
    setZoomLevel();
  }

  function setZoomLevel() {
    selectDeviceScale < 1
      ? webviewRef.current.setZoomLevel(-2)
      : webviewRef.current.setZoomLevel(0);
  }

  useEffect(() => {
    webviewRef.current.addEventListener("dom-ready", handleWebviewDomReady);
  }, [selectDeviceScale]);

  useEffect(() => {
    webviewRef.current.addEventListener("did-navigate-in-page", (event) => {});
  }, []);

  return (
    <DeviceContainer>
      <DeviceHeader>
        <div>
          <span>{name}</span>
          <span>{` (${width} x ${height})`}</span>
        </div>
        <ButtonContainer>
          <ReloadButton
            onClick={() => {
              webviewRef.current.reload();
            }}
          >
            <TfiReload />
          </ReloadButton>
          <DeleteButton onClick={() => dispatch(deleteDisplayedDevice(id))}>
            <RiDeleteBin5Fill />
          </DeleteButton>
        </ButtonContainer>
      </DeviceHeader>
      <WebviewContainer
        scaledWidth={`${width * selectDeviceScale}px`}
        scaledHeight={`${height * selectDeviceScale}px`}
      >
        <webview src={selectCommonUrl} useragent={useragent} ref={webviewRef} />
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

  webview {
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
  background-color: ${COLOR.IVORY};
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
