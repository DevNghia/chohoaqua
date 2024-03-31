import { useSelector } from "react-redux";
import styled from "styled-components";
var Spinner = require("react-spinkit");

const DataLoadingStyles = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;

export default function DataLoading() {
  const appTheme = useSelector((state) => state.app.appTheme);
  return (
    <DataLoadingStyles className="data-loading">
      <Spinner name="circle" color={appTheme.color_main_1} width="200" />
    </DataLoadingStyles>
  );
}
