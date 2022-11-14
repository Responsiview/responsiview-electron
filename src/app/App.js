import React from "react";
import { Route, Routes } from "react-router-dom";
import { createGlobalStyle } from "styled-components";

import Login from "../components/Login";
import Home from "../components/Home";

export default function App() {
  return (
    <>
      <Global />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
}

const Global = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    user-select: none;
  }

  button{
    cursor: pointer;
    border: none;
  }
`;
