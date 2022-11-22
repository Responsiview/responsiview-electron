import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import Portal from "../Portal";
import Toast from "./Toast";

export default function ToastContainer() {
  const selectToasts = useSelector((state) => state.toast.toasts);

  return (
    <Portal>
      <Wrapper>
        {selectToasts.map((toast) => (
          <Toast key={toast.id} id={toast.id}>
            {toast.content}
          </Toast>
        ))}
      </Wrapper>
    </Portal>
  );
}

const Wrapper = styled.div`
  position: absolute;
  right: 0;
  top: 4rem;
  z-index: 999;
`;
