import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { setUserInfo } from "../features/user/userSlice";

import { provider, auth, googleSignIn } from "../service/firebase";

import { COLOR } from "../config/constants";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Content>
      <Title>Responsiview</Title>
      <SignInButton
        onClick={async () => {
          try {
            const response = await googleSignIn(auth, provider);

            dispatch(setUserInfo({ userEmail: response.data.userEmail }));

            if (response?.data.result === "ok") {
              navigate("/home", { replace: true });
            }
          } catch (error) {
            navigate("/error", {
              state: {
                errorStatus: error.response?.status,
                errorMessage: error.response?.data.errorMessage,
              },
              replace: true,
            });
          }
        }}
      >
        <Icon className="fa-brands fa-google" />
        Sign in with Google
      </SignInButton>
    </Content>
  );
}

const Content = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: ${COLOR.DARK_NAVY};
`;

const Title = styled.p`
  font-size: 3rem;
  color: ${COLOR.IVORY};
`;

const SignInButton = styled.button`
  display: flex;
  align-items: center;
  margin-top: 3rem;
  padding: 0.5rem 2rem;
  border-radius: 5px;
  font-size: 1rem;
  background-color: ${COLOR.DARK_BLUE};
  color: ${COLOR.IVORY};

  &:hover {
    background-color: ${COLOR.IVORY};
    color: ${COLOR.DARK_BLUE};
  }
`;

const Icon = styled.i`
  margin-right: 0.5rem;
  font-size: 1.1rem;
`;
