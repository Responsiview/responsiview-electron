import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LabelList,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

import { COLOR } from "../config/constants";

export default function Chart({ data, closeModal }) {
  const convertedData = data.map((device) => {
    return {
      name: device.deviceName,
      "FCP Time": Number((device["first-contentful-paint"] / 1000).toFixed(2)),
    };
  });
  const averageTime =
    convertedData.reduce((prev, curr) => prev + curr["FCP Time"], 0) /
    convertedData.length;

  return (
    <Container>
      <Title>
        First Contentful Paint Time
        <Unit>(sec)</Unit>
      </Title>
      <ResponsiveContainer width="95%" height="80%">
        <BarChart
          data={convertedData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" allowDataOverflow={true} />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="FCP Time"
            fill={COLOR.LIGHT_GREEN}
            barSize={50}
            animationDuration={2000}
            animationEasing="ease-out"
          >
            <LabelList dataKey="FCP Time" position="middle" />
          </Bar>
          <ReferenceLine
            y={averageTime.toFixed(2)}
            stroke={COLOR.RED}
            label={`Average: ${averageTime.toFixed(2)}s`}
            strokeDasharray="3 3"
          />
        </BarChart>
      </ResponsiveContainer>
      <CloseButton onClick={closeModal}>Close</CloseButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 85%;
  justify-content: space-between;
`;

const Title = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  color: ${COLOR.DARK_NAVY};
`;

const Unit = styled.span`
  margin-left: 0.5rem;
  font-size: 0.8rem;
`;

const CloseButton = styled.button`
  width: 8rem;
  height: 2rem;
  border-radius: 10px;
  font-size: 1.2rem;
  color: ${COLOR.IVORY};
  background-color: ${COLOR.RED};

  &:hover {
    background-color: ${COLOR.DARK_RED};
  }
`;

Chart.propTypes = {
  data: PropTypes.array.isRequired,
  closeModal: PropTypes.func.isRequired,
};
