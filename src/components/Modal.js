import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import Portal from "./Portal";

import { COLOR } from "../config/constants";

export default function Modal({ children, closeModal, style }) {
  const { width, height } =
    style === undefined ? { width: "30rem", height: "30rem" } : style;

  function handleBackgroundClick(event) {
    if (event.target !== event.currentTarget) return;

    closeModal();
  }

  return (
    <Portal>
      <Background onClick={handleBackgroundClick}>
        <Content width={width} height={height}>
          {children}
        </Content>
      </Background>
    </Portal>
  );
}

const Background = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0px;
  left: 0px;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-color: ${COLOR.LIGHT_GRAY};
  color: ${COLOR.WHITE};
  border-radius: 10px;
  box-shadow: 1px 1px 1px black;
  animation: smoothOpen 0.3s;

  @keyframes smoothOpen {
    from {
      opacity: 0;
      transform: translateY(100%);
    }
    to {
      opacity: 1;
      transform: translateY(0%);
    }
  }
`;

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  closeModal: PropTypes.func,
  style: PropTypes.object,
};
