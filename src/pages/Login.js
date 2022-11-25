import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";

import { setUserInfo } from "../features/user/userSlice";
import { addToast } from "../features/toast/toastSlice";

import convertLoginData from "../utils/convertLoginData";

import { COLOR } from "../config/constants";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ipcRenderer = window.electron.ipcRenderer;

  function handleSignInButtonClick() {
    window.remote.openExternalLoginPage(process.env.REACT_APP_LOGIN_CLIENT_URL);
  }

  useEffect(() => {
    ipcRenderer.once("login-result", async (event, data) => {
      const loginResult = convertLoginData(data);

      if (loginResult.result === "success") {
        try {
          const response = await axios({
            method: "post",
            url: `${process.env.REACT_APP_BASE_SERVER_URL}/login`,
            data: { userEmail: loginResult.userEmail },
            withCredentials: true,
          });

          ipcRenderer.send("setCookie", {
            key: "userEmail",
            value: response.data.userEmail,
          });
          ipcRenderer.send("setCookie", {
            key: "token",
            value: response.data.token,
          });

          dispatch(setUserInfo({ userEmail: response.data.userEmail }));
          dispatch(addToast(`어서오세요, ${response.data.userEmail}님!`));
          navigate("/home", { replace: true });
        } catch (error) {
          navigate("/error", {
            state: {
              errorStatus: error.response?.status,
              errorMessage: error.response?.data.errorMessage,
            },
            replace: true,
          });
        }
      } else {
        navigate("/error", {
          state: {
            errorStatus: loginResult.code,
            errorMessage: loginResult.message,
          },
          replace: true,
        });
      }
    });
  }, []);

  return (
    <Content>
      <Title>Responsiview</Title>
      <SignInButton onClick={handleSignInButtonClick}>
        <IconContainer>
          <FcGoogle />
        </IconContainer>
        <TextContainer>Sign in with Google</TextContainer>
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
  background-color: ${COLOR.LIGHT_GRAY};
`;

const Title = styled.span`
  font-size: 4rem;
  font-weight: bold;
  color: ${COLOR.DARK_NAVY};
`;

const SignInButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5rem;
  height: 3rem;
  width: 16rem;
  padding: 0.5rem 2rem;
  border-radius: 5px;
  font-size: 1rem;
  background-color: ${COLOR.DARK_NAVY};
  color: ${COLOR.IVORY};

  &:hover {
    background-color: ${COLOR.IVORY};
    color: ${COLOR.DARK_NAVY};
  }
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.7rem;
`;

const TextContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
`;
