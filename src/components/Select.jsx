import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SelectStyles = styled.div`
  .select-btn {
    padding: 16px 12px !important;
  }
`;

export default function Select(props) {
  const { placeholder, values, handleSelect, showDetail, value, nonSelect } =
    props;
  const myButton = useRef(null);
  const myContainer = useRef(null);
  const [maxHeight, setMaxHeight] = useState(false);
  function handleShowDetail(e) {
    setMaxHeight(!maxHeight);
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

  return (
    <SelectStyles className="custom-select">
      <div className="select-btn" onClick={handleShowDetail} ref={myButton}>
        <div>{placeholder}</div>
        {nonSelect !== true && <i className="fas fa-caret-down"></i>}
      </div>
      <div className="options" ref={myContainer}>
        {values.map((v, i) => (
          <div onClick={(e) => handleSelect(v, e)} key={i}>
            {v.title}
          </div>
        ))}
      </div>
    </SelectStyles>
  );
}
