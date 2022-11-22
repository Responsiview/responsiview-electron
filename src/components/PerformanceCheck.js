import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";

import Chart from "./Chart";
import Loading from "./Loading";

import { addToast } from "../features/toast/toastSlice";

import { deviceData } from "../utils/deviceData";

import { COLOR } from "../config/constants";

export default function PerformanceCheck({ closeModal }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [measuringResult, setMeasuringResult] = useState();

  const selectDisplayedDeviceIds = useSelector(
    (state) => state.device.displayedDeviceIds,
  );
  const selectNavigationHistory = useSelector(
    (state) => state.device.navigationHistory,
  );
  const selectNavigationOffset = useSelector(
    (state) => state.device.navigationOffset,
  );

  async function handleMeasureButtonClick() {
    if (selectDisplayedDeviceIds.length === 0) {
      dispatch(addToast("선택된 기기가 없습니다."));

      return;
    }

    setIsLoading(true);

    const deviceInfo = {
      url: selectNavigationHistory[selectNavigationOffset],
      devices: selectDisplayedDeviceIds.map((deviceId) => deviceData[deviceId]),
    };
    const result = await window.api.measureFCPTime(deviceInfo);

    setIsLoading(false);
    setMeasuringResult(result);
  }

  return (
    <Container>
      {!isLoading && !measuringResult && (
        <>
          <Title>Measure First Contentful Paint Time</Title>
          <ButtonContainer>
            <Button
              backgroundColor={COLOR.DARK_BLUE}
              onClick={handleMeasureButtonClick}
            >
              Measure
            </Button>
            <Button backgroundColor={COLOR.RED} onClick={closeModal}>
              Cancel
            </Button>
          </ButtonContainer>
        </>
      )}
      {isLoading && <Loading />}
      {!isLoading && measuringResult && (
        <Chart
          data={measuringResult}
          closeModal={() => {
            closeModal();
            setMeasuringResult();
          }}
        />
      )}
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: black;
`;

const Title = styled.p`
  text-align: left;
  font-size: 2.5rem;
  font-weight: bold;
  color: ${COLOR.DARK_NAVY};
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 4rem;
  background-color: transparent;
`;

const Button = styled.button`
  width: 50%;
  height: 3rem;
  font-size: 1.5rem;
  margin: 0.5rem;
  color: ${COLOR.IVORY};
  background-color: ${(props) => props.backgroundColor};
  border-radius: 10px;

  &:hover {
    color: ${(props) => props.backgroundColor};
    background-color: ${COLOR.IVORY};
  }
`;

PerformanceCheck.propTypes = {
  closeModal: PropTypes.func.isRequired,
};
