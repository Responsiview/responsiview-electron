import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";
import axios from "axios";
import Cookie from "js-cookie";
import { debounce } from "lodash";

import { addPreset } from "../features/device/deviceSlice";

import { COLOR, NUMBER } from "../config/constants";

export default function PresetRegister({ closeModal }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [presetTitle, setPresetTitle] = useState("");

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

  const debouncedSetTitle = debounce(setPresetTitle, NUMBER.DEBOUNCE_DELAY);

  function handleInputChange(event) {
    debouncedSetTitle(event.target.value);
  }

  function handleCancelButtonClick() {
    closeModal();
  }

  async function handleSaveButtonClick() {
    try {
      const response = await axios({
        method: "post",
        url: `${process.env.REACT_APP_BASE_SERVER_URL}/user/${selectUserInfo.userEmail}/preset`,
        data: {
          presetTitle,
          url: selectNavigationHistory[selectNavigationOffset],
          deviceIdList: selectDisplayedDeviceIds,
        },
        headers: {
          Authorization: `Bearer ${Cookie.get("token")}`,
        },
        withCredentials: true,
      });

      dispatch(addPreset(response.data.createdPreset));
      closeModal();
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

  return (
    <Container>
      <Title>Register Preset</Title>
      <TitleInput placeholder="Input Title" onChange={handleInputChange} />
      <ButtonContainer>
        <Button backgroundColor={COLOR.RED} onClick={handleCancelButtonClick}>
          Cancel
        </Button>
        <Button
          backgroundColor={COLOR.DARK_BLUE}
          onClick={handleSaveButtonClick}
        >
          Save
        </Button>
      </ButtonContainer>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80%;
  height: 100%;
`;

const Title = styled.p`
  text-align: left;
  font-size: 2rem;
  font-weight: bold;
  color: ${COLOR.DARK_NAVY};
`;

const TitleInput = styled.input`
  font-size: 1.5rem;
  text-align: center;
  margin: 3rem 0;
  border: none;
  border-bottom: 1px solid black;
  outline: none;
  background-color: transparent;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: transparent;
`;

const Button = styled.button`
  width: 40%;
  height: 2rem;
  font-size: 1.3rem;
  margin: 0 0.5rem;
  color: ${COLOR.IVORY};
  background-color: ${(props) => props.backgroundColor};
  border-radius: 10px;

  &:hover {
    color: ${(props) => props.backgroundColor};
    background-color: ${COLOR.IVORY};
  }
`;

PresetRegister.propTypes = {
  closeModal: PropTypes.func.isRequired,
};
