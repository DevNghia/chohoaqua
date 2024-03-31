import { useSelector } from "react-redux";
import styled from 'styled-components';
var Spinner = require('react-spinkit');

export default function PageLoading() {
  const LargeSpinner = styled(Spinner)`
  & > div {
    width: 140px;
    height: 140px;
  }
`

  const appTheme = useSelector(state => state.app.appTheme);
  return (
    <div className="page-loading">
   
<Spinner name="circle" color={appTheme.color_main_1} width="200"/>
    </div>
  )
}