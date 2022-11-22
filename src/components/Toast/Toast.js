import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import { removeToastById } from "../../features/toast/toastSlice";

import { COLOR } from "../../config/constants";

export default function Toast({ children, id }) {
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(removeToastById(id));
    }, 3000);
  }, []);

  return <Wrapper>{children}</Wrapper>;
}

const Wrapper = styled.div`
  position: relative;
  margin: 1rem 1rem 0 0;
  padding: 1rem;
  width: 15rem;
  border-radius: 5px;
  background: ${COLOR.IVORY};
  box-shadow: 0px 1px 4px 0px black;
  color: ${COLOR.DARK_NAVY};
  word-break: keep-all;
  animation-name: slideIn, fadeOut;
  animation-delay: 0s, 2s;
  animation-duration: 0.5s, 1s;

  @keyframes slideIn {
    from {
      transform: translateX(150%);
    }
    to {
      transform: translateX(0%);
    }
  }
  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;

Toast.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.number.isRequired,
};
