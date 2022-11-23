import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

import { COLOR } from "../config/constants";

export default function Error() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Container>
      <Code>{`${location.state?.errorStatus || 404}`}</Code>
      <Message>{`${location.state?.errorMessage || "Page Not Found"}`}</Message>
      <HomeButton onClick={() => navigate("/", { replace: true })}>
        로그인 화면으로 이동
      </HomeButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: ${COLOR.LIGHT_GRAY};
  animation-name: rotateLeftToRight, rotateRightToLeft;
  animation-delay: 0s, 0.1s;
  animation-duration: 0.1s, 0.1s;

  @keyframes rotateLeftToRight {
    from {
      rotate: -5deg;
    }
    to {
      rotate: 5deg;
    }
  }
  @keyframes rotateRightToLeft {
    from {
      rotate: 5deg;
    }
    to {
      rotate: -5deg;
    }
  }
`;

const Code = styled.p`
  font-size: 10rem;
  font-weight: bold;
  color: ${COLOR.RED};
`;

const Message = styled.p`
  font-size: 3rem;
  font-weight: bold;
`;

const HomeButton = styled.button`
  width: 14rem;
  height: 4rem;
  margin-top: 5rem;
  font-size: 1.2rem;
  font-weight: bold;
  border-radius: 10px;
  color: ${COLOR.IVORY};
  background-color: ${COLOR.DARK_NAVY};

  &:hover {
    color: ${COLOR.DARK_NAVY};
    background-color: ${COLOR.IVORY};
  }
`;
