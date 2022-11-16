import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { COLOR } from "../config/constants";

export default function Device({
  name,
  width,
  height,
  useragent,
  scale,
  commonUrl,
  setCommonUrl,
  deleteDevice,
}) {
  const webviewRef = useRef();

  function handleWebviewDomReady() {
    setZoomLevel();
  }

  function setZoomLevel() {
    scale < 1
      ? webviewRef.current.setZoomLevel(-2)
      : webviewRef.current.setZoomLevel(0);
  }

  useEffect(() => {
    webviewRef.current.addEventListener("dom-ready", handleWebviewDomReady);

    return () =>
      webviewRef.current.removeEventListener(
        "dom-ready",
        handleWebviewDomReady,
      );
  }, [scale]);

  return (
    <DeviceContainer>
      <DeviceHeader>
        <div>
          <span>{name}</span>
          <span>{` (${width} x ${height})`}</span>
        </div>
        <DeleteButton onClick={deleteDevice}>-</DeleteButton>
      </DeviceHeader>
      <WebviewContainer
        scaledWidth={`${width * scale}px`}
        scaledHeight={`${height * scale}px`}
      >
        <webview src={commonUrl} useragent={useragent} ref={webviewRef} />
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
  height: 3rem;
`;

const DeleteButton = styled.button`
  width: 3rem;
  font-size: 1rem;
  border-radius: 20px;
  background-color: ${COLOR.RED};
  color: ${COLOR.IVORY};
  transition: all 200ms;

  &:hover {
    background-color: ${COLOR.DARK_RED};
  }
`;

Device.propTypes = {
  name: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  useragent: PropTypes.string.isRequired,
  scale: PropTypes.number.isRequired,
  commonUrl: PropTypes.string.isRequired,
  setCommonUrl: PropTypes.func.isRequired,
  deleteDevice: PropTypes.func.isRequired,
};
