import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import {
  updateNavigationOffset,
  updateNavigationHistory,
} from "../features/device/deviceSlice";

import correctUrl from "../utils/correctUrl";

import { COLOR } from "../config/constants";

export default function Header() {
  const [localUrl, setLocalUrl] = useState();
  const selectCommonUrl = useSelector((state) => state.device.commonUrl);
  const selectCanGoBack = useSelector((state) => state.device.canGoBack);
  const selectCanGoForward = useSelector((state) => state.device.canGoForward);
  const dispatch = useDispatch();

  useEffect(() => {
    setLocalUrl(selectCommonUrl);
  }, [selectCommonUrl]);

  return (
    <Container>
      <Button
        onClick={() => dispatch(updateNavigationOffset(-1))}
        disabled={!selectCanGoBack}
      >
        {"<"}
      </Button>
      <Button
        onClick={() => dispatch(updateNavigationOffset(1))}
        disabled={!selectCanGoForward}
      >
        {">"}
      </Button>
      <form
        onSubmit={(event) => {
          event.preventDefault();

          dispatch(updateNavigationHistory(correctUrl(localUrl)));
        }}
      >
        <UrlInput
          value={localUrl || ""}
          onChange={(event) => setLocalUrl(event.target.value)}
        />
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  height: 4rem;
  width: 100%;
  background-color: ${COLOR.DARK_NAVY};
  padding: 1rem;
  z-index: 999;
`;

const Button = styled.button`
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
