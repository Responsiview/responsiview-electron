import React from "react";
import { Route, Routes } from "react-router-dom";
import { createGlobalStyle } from "styled-components";

import Login from "../pages/Login";
import Home from "../pages/Home";
import Error from "../pages/Error";
import ToastContainer from "../components/Toast/ToastContainer";

export default function App() {
  return (
    <>
      <Global />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<Error />} />
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
    transition: all 200ms;
  }
`;
