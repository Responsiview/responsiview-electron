import React from "react";
import styled from "styled-components";
import { FcMultipleDevices } from "react-icons/fc";
import { BiSave } from "react-icons/bi";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { BsBarChartLineFill } from "react-icons/bs";

import { COLOR } from "../config/constants";

export default function Sidebar() {
  return (
    <Container>
      <Button>
        <FcMultipleDevices />
        Devices
      </Button>
      <Button>
        <BiSave />
        Save
      </Button>
      <Button>
        <AiOutlineUnorderedList />
        Presets
      </Button>
      <Button>
        <BsBarChartLineFill />
        Performance
      </Button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100vh;
  width: 8rem;
  background-color: ${COLOR.DARK_NAVY};
  z-index: 999;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  flex-direction: column;
  /* position: fixed; */
  padding: 1.5rem 1rem;
  font-size: 1rem;
  border-bottom: 0.5px solid ${COLOR.DARK_NAVY};
  color: ${COLOR.IVORY};
  background-color: ${COLOR.DARK_BLUE};
  transition: all 200ms;

  &:hover {
    color: ${COLOR.DARK_BLUE};
    background-color: ${COLOR.IVORY};
  }
`;
