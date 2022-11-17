import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Cookie from "js-cookie";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import DeviceSection from "../components/DeviceSection";

import { setUserInfo } from "../features/user/userSlice";

import { COLOR } from "../config/constants";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUserInfo({ userEmail: Cookie.get("userEmail") }));
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
