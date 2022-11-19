import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { AiFillSave } from "react-icons/ai";
import { BsBarChartLineFill } from "react-icons/bs";

import Modal from "./Modal";
import PresetRegister from "./PresetRegister";

import {
  updateNavigationOffset,
  updateNavigationHistory,
} from "../features/device/deviceSlice";

import correctUrl from "../utils/correctUrl";

import { COLOR } from "../config/constants";

export default function Header() {
  const [localUrl, setLocalUrl] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const selectCommonUrl = useSelector((state) => state.device.commonUrl);
  const selectCanGoBack = useSelector((state) => state.device.canGoBack);
  const selectCanGoForward = useSelector((state) => state.device.canGoForward);
  const dispatch = useDispatch();

  function handleSaveButtonClick() {
    setIsModalOpen(true);
  }

  useEffect(() => {
    setLocalUrl(selectCommonUrl);
  }, [selectCommonUrl]);

  return (
    <>
      {isModalOpen && (
        <Modal
          closeModal={() => setIsModalOpen(false)}
          style={{ width: "30rem", height: "20rem" }}
        >
          <PresetRegister closeModal={() => setIsModalOpen(false)} />
        </Modal>
      )}
      <Container>
        <NavigationButton
          onClick={() => dispatch(updateNavigationOffset(-1))}
          disabled={!selectCanGoBack}
        >
          {"<"}
        </NavigationButton>
        <NavigationButton
          onClick={() => dispatch(updateNavigationOffset(1))}
          disabled={!selectCanGoForward}
        >
          {">"}
        </NavigationButton>
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
        <FunctionButton onClick={handleSaveButtonClick}>
          <AiFillSave />
          <Text>Save</Text>
        </FunctionButton>
        <FunctionButton>
          <BsBarChartLineFill />
          <Text>Performance</Text>
        </FunctionButton>
      </Container>
    </>
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

const FunctionButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2rem;
  margin: 0 0.5rem;
  padding: 1rem;
  font-size: 1rem;
  border-radius: 5px;
  color: ${COLOR.IVORY};
  background-color: ${COLOR.DARK_BLUE};

  &:hover {
    color: ${COLOR.DARK_BLUE};
    background-color: ${COLOR.IVORY};
  }
`;

const Text = styled.span`
  margin-left: 0.5rem;
`;
