import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SelectStyles = styled.div`
  border-radius: 8px !important;
  z-index: 4 !important;
  .select-btn {
    padding: 20px !important;
    border-radius: 8px !important;
    border: 1px solid #e7e8e9 !important;
  }
  .options {
    border: none !important;
    z-index: 11 !important;
    border-radius: 8px !important;
    .options_content {
      border: 1px solid #e7e8e9;
      padding: 0 !important;
      border-radius: 8px;
      &:hover {
        background-color: transparent !important;
      }
      & > div {
        a {
          display: block;
          padding: 10px 20px;
          transition: all 0.1s;
          &:hover {
            color: #221f20;
            font-weight: 500;
          }
        }
      }
    }
  }
`;

export default function Select(props) {
  const {
    placeholder,
    values,
    handleSelect,
    showDetail,
    value,
    nonSelect,
    excuteSelect,
  } = props;
  const myButton = useRef(null);
  const myContainer = useRef(null);
  function handleShowDetail(e) {
    if (values.length > 0 && nonSelect !== true) showDetail(e);
  }
  useEffect(() => {
    window.addEventListener("click", function (e) {
      let containers = document.querySelectorAll(".custom-select");
      for (let i = 0; i < containers.length; i++)
        if (containers[i].contains(e.target)) return;
      if (myContainer.current && myContainer.current.offsetHeight > 16)
        myButton.current.click();
    });
  });
  console.log(values, placeholder);
  return (
    <SelectStyles className="custom-select">
      <div className="select-btn" onClick={handleShowDetail} ref={myButton}>
        <div>{placeholder}</div>
        {nonSelect !== true && <i className="fas fa-caret-down"></i>}
      </div>
      <div className="options" ref={myContainer}>
        <div className="options_content">
          {values.map((v, i) => (
            <div>
              <Link onClick={excuteSelect} to={handleSelect(v)} key={i}>
                {v.title}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </SelectStyles>
  );
}
