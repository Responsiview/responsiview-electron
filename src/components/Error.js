import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Error() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <div>{`code:${location.state.errorStatus}`}</div>
      <div>{`message:${location.state.errorMessage}`}</div>
      <button onClick={() => navigate("/", { replace: true })}>
        로그인 화면으로 이동
      </button>
    </>
  );
}
