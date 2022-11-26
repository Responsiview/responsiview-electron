import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import DeviceSection from "../components/DeviceSection";

import { updatePresets } from "../features/device/deviceSlice";

import { COLOR } from "../config/constants";

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ipcRenderer = window.electron.ipcRenderer;

  useEffect(() => {
    (async function () {
      try {
        const userEmail = await ipcRenderer.invoke("getCookie", "userEmail");
        const token = await ipcRenderer.invoke("getCookie", "token");

        const response = await axios({
          method: "get",
          url: `${process.env.REACT_APP_BASE_SERVER_URL}/user/${userEmail}/preset`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        dispatch(updatePresets(response.data));
      } catch (error) {
        navigate("/error", {
          state: {
            errorStatus: error.response?.status,
            errorMessage: error.response?.data.errorMessage,
          },
          replace: true,
        });
      }
    })();
  }, []);

  return (
    <>
      <Header />
      <Content>
        <Sidebar />
        <DeviceSection />
      </Content>
    </>
  );
}

const Content = styled.section`
  display: flex;
  padding-top: 4rem;
  background-color: ${COLOR.LIGHT_GRAY};
`;
