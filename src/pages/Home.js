import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Cookie from "js-cookie";
import axios from "axios";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import DeviceSection from "../components/DeviceSection";

import { setUserInfo } from "../features/user/userSlice";
import { updatePresets } from "../features/device/deviceSlice";

import { COLOR } from "../config/constants";

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      dispatch(setUserInfo({ userEmail: Cookie.get("userEmail") }));
      (async function () {
        const response = await axios({
          method: "get",
          url: `${process.env.REACT_APP_BASE_SERVER_URL}/user/${Cookie.get(
            "userEmail",
          )}/preset`,
          headers: {
            Authorization: `Bearer ${Cookie.get("token")}`,
          },
          withCredentials: true,
        });

        dispatch(updatePresets(response.data));
      })();
    } catch (error) {
      navigate("/error", {
        state: {
          errorStatus: error.response?.status,
          errorMessage: error.response?.data.errorMessage,
        },
        replace: true,
      });
    }
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
