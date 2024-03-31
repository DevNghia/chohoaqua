import React from "react";
import styled from "styled-components";

const PulseLoaderStyles = styled.span`
  &.loader {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    display: block;
    margin: 15px auto;
    position: relative;
    color: #fff;
    box-sizing: border-box;
    animation: animloader 1s linear infinite;
  }

  @keyframes animloader {
    0% {
      box-shadow: 9px 0 0 -1px, 28px 0 0 -1px, -9px 0 0 -1px;
    }
    25% {
      box-shadow: 9px 0 0 -1px, 28px 0 0 -1px, -9px 0 0 -1px;
    }
    50% {
      box-shadow: 9px 0 0 -1px, 28px 0 0 -1px, -9px 0 0 1px;
    }
    75% {
      box-shadow: 9px 0 0 1px, 28px 0 0 -1px, -9px 0 0 -1px;
    }
    100% {
      box-shadow: 9px 0 0 -1px, 28px 0 0 1px, -9px 0 0 -1px;
    }
  }
`;
export default function PulseLoader(rest) {
  return <PulseLoaderStyles className="loader" {...rest}></PulseLoaderStyles>;
}
