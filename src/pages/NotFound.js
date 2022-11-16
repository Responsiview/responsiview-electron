import React from "react";

export default function NotFound() {
  return (
    <>
      <div>NotFound</div>
      <button onClick={() => navigate("/", { replace: true })}>
        로그인 화면으로 이동
      </button>
    </>
  );
}
