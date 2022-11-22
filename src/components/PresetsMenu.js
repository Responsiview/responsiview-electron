import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Cookie from "js-cookie";
import axios from "axios";
import { IoMdAddCircleOutline } from "react-icons/io";

import Modal from "./Modal";
import PresetRegister from "./PresetRegister";

import {
  loadPreset,
  updateOnePreset,
  deleteOnePreset,
} from "../features/device/deviceSlice";
import { addToast } from "../features/toast/toastSlice";

import { COLOR } from "../config/constants";

export default function PresetsMenu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selectPresets = useSelector((state) => state.device.presets);
  const selectUserInfo = useSelector((state) => state.user.userInfo);
  const selectNavigationHistory = useSelector(
    (state) => state.device.navigationHistory,
  );
  const selectNavigationOffset = useSelector(
    (state) => state.device.navigationOffset,
  );
  const selectDisplayedDeviceIds = useSelector(
    (state) => state.device.displayedDeviceIds,
  );

  function handleLoadButtonClick(preset) {
    dispatch(addToast(`Preset (${preset.title})이 로드되었습니다.`));
    dispatch(loadPreset(preset));
  }

  async function handleUpdateButtonClick(preset) {
    try {
      const response = await axios({
        method: "put",
        url: `${process.env.REACT_APP_BASE_SERVER_URL}/user/${selectUserInfo.userEmail}/preset/${preset._id}`,
        data: {
          url: selectNavigationHistory[selectNavigationOffset],
          deviceIdList: selectDisplayedDeviceIds,
        },
        headers: {
          Authorization: `Bearer ${Cookie.get("token")}`,
        },
        withCredentials: true,
      });

      dispatch(updateOnePreset(response.data.updatedPreset));
      dispatch(addToast(`Preset (${preset.title})이 업데이트 되었습니다.`));
    } catch (error) {
      navigate("/error", {
        state: {
          errorStatus: error.response?.status,
          errorMessage: error.response?.data.errorMessage,
        },
        replace: true,
      });
    }
  }

  async function handleDeleteButtonClick(preset) {
    try {
      await axios({
        method: "delete",
        url: `${process.env.REACT_APP_BASE_SERVER_URL}/user/${selectUserInfo.userEmail}/preset/${preset._id}`,
        headers: {
          Authorization: `Bearer ${Cookie.get("token")}`,
        },
        withCredentials: true,
      });

      dispatch(deleteOnePreset(preset));
      dispatch(addToast(`Preset (${preset.title})이 삭제되었습니다.`));
    } catch (error) {
      navigate("/error", {
        state: {
          errorStatus: error.response?.status,
          errorMessage: error.response?.data.errorMessage,
        },
        replace: true,
      });
    }
  }

  function handleRegisterButtonClick() {
    setIsModalOpen(true);
  }

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
      <Title>Preset List</Title>
      {selectPresets.length === 0
        ? "Empty"
        : selectPresets.map((preset) => (
            <Item key={preset._id}>
              {preset.title}
              <ButtonContainer>
                <Button
                  onClick={() => handleLoadButtonClick(preset)}
                  backgroundColor={COLOR.DARK_BLUE}
                >
                  Load
                </Button>
                <Button
                  onClick={() => handleUpdateButtonClick(preset)}
                  backgroundColor={COLOR.NAVY_GRAY}
                >
                  Update
                </Button>
                <Button
                  onClick={() => handleDeleteButtonClick(preset)}
                  backgroundColor={COLOR.RED}
                >
                  Delete
                </Button>
              </ButtonContainer>
            </Item>
          ))}
      <RegisterButton onClick={handleRegisterButtonClick}>
        <IoMdAddCircleOutline />
      </RegisterButton>
    </>
  );
}

const Title = styled.p`
  text-align: center;
  font-size: 1.5rem;
  margin: 1rem 0;
  font-weight: bold;
  color: ${COLOR.DARK_NAVY};
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  width: 15rem;
  margin: 0.5rem 0;
  font-size: 1.2rem;
  color: ${COLOR.IVORY};
  background-color: ${COLOR.DARK_NAVY};
  border-radius: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 1rem;
`;

const Button = styled.button`
  width: 4rem;
  padding: 0.5rem;
  color: ${COLOR.IVORY};
  background-color: ${(props) => props.backgroundColor};
  border-radius: 10px;

  &:hover {
    color: ${(props) => props.backgroundColor};
    background-color: ${COLOR.IVORY};
  }
`;

const RegisterButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 2rem;
  margin-top: 0.5rem;
  font-size: 1.5rem;
  border-radius: 5px;
  background-color: ${COLOR.DARK_BLUE};
  color: ${COLOR.IVORY};

  &:hover {
    background-color: ${COLOR.DARK_NAVY};
  }
`;
