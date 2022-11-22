import React from "react";
import styled from "styled-components";

import spin from "../assets/images/spin.gif";

export default function Loading() {
  return <LoadingImage src={spin} alt="Loading..." />;
}

const LoadingImage = styled.img`
  width: 7rem;
`;
