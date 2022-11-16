import React, { useState } from "react";
import styled from "styled-components";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import DeviceSection from "../components/DeviceSection";

import { COLOR } from "../config/constants";

export default function Home() {
  const [commonUrl, setCommonUrl] = useState("https://www.google.com");

  return (
    <>
      <Header commonUrl={commonUrl} setCommonUrl={setCommonUrl} />
      <Content>
        <Sidebar />
        <DeviceSection commonUrl={commonUrl} setCommonUrl={setCommonUrl} />
      </Content>
    </>
  );
}

const Content = styled.section`
  display: flex;
  padding-top: 4rem;
  background-color: ${COLOR.LIGHT_GRAY};
`;
