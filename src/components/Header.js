import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { COLOR } from "../config/constants";

export default function Header({ commonUrl, setCommonUrl }) {
  const [localUrl, setLocalUrl] = useState();

  useEffect(() => {
    setLocalUrl(commonUrl);
  }, [commonUrl]);

  return (
    <Container>
      <Button>{"<"}</Button>
      <Button>{">"}</Button>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setCommonUrl(localUrl);
        }}
      >
        <UrlInput
          value={localUrl || ""}
          onChange={(event) => setLocalUrl(event.target.value)}
        />
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  height: 4rem;
  width: 100%;
  background-color: ${COLOR.DARK_NAVY};
  padding: 1rem;
  z-index: 999;
`;

const Button = styled.button`
  width: 2rem;
  height: 2rem;
  margin: 0 0.3rem;
  font-size: 1rem;
  border-radius: 5px;
  color: ${COLOR.IVORY};
  background-color: ${COLOR.DARK_BLUE};
  transition: all 200ms;

  &:hover {
    color: ${COLOR.DARK_BLUE};
    background-color: ${COLOR.IVORY};
  }
`;

const UrlInput = styled.input`
  width: 50vw;
  height: 2rem;
  margin: 0 1rem;
  padding: 0 1rem;
  font-size: 1rem;
  border-style: none;
  border-radius: 5px;
  background-color: ${COLOR.LIGHT_GRAY};
  transition: all 300ms;

  &:focus {
    text-align: center;
  }
`;

Header.propTypes = {
  commonUrl: PropTypes.string.isRequired,
  setCommonUrl: PropTypes.func.isRequired,
};
