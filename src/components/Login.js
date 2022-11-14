import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { provider, auth, googleSignIn } from "../service/firebase";

export default function Login() {
  const navigate = useNavigate();

  return (
    <Content>
      <Title>Responsiview</Title>
      <SignInButton
        onClick={async () => {
          try {
            const response = await googleSignIn(auth, provider);

            if (response.data.result === "ok") {
              navigate("/home", { replace: true });
            }
          } catch (error) {
            navigate("/error", {
              state: {
                code: error.code,
                message: error.message,
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
  background-color: #282828;
`;

const Title = styled.p`
  font-size: 3rem;
  color: #4036ff;
`;

const SignInButton = styled.button`
  display: flex;
  align-items: center;
  background-color: #575757;
  margin-top: 3rem;
  padding: 0.5rem 2rem;
  border-radius: 5px;
  font-size: 1rem;
  color: #ffffff;

  transition: all 300ms;

  &:hover {
    background-color: #6e6e6e;
  }
`;

const Icon = styled.i`
  margin-right: 0.5rem;
  font-size: 1.1rem;
`;
