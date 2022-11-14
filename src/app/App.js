import React from "react";
import { Route, Routes } from "react-router-dom";
import { createGlobalStyle } from "styled-components";

import Login from "../components/Login";
import Home from "../components/Home";
import Error from "../components/Error";
import NotFound from "../components/NotFound";

export default function App() {
  return (
    <>
      <Global />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<NotFound />} />
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
