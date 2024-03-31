import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Footer from "../../../../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import StopWorking from "../StopWorking";
import AgencyOrderContent from "./AgencyOrderContent";

// import AgencyContent from "./child/AgencyContent";
import { agencyActions as a } from "../../../../actions/agencyAction";

const AgencyPageStyles = styled.div`
  min-height: calc(100vh - 8.5em);
  padding: 1em 0;
  .container {
    padding: 0 !important;
  }
  .agency__main {
    width: 100%;
    display: flex;
    column-gap: 20px;
    background-color: #f7f7f7;
  }
  @media only screen and (max-width: 976px) {
    .agency__main {
      flex-direction: column;
      row-gap: 15px;
    }
  }
`;

const AgencyOrderMain1 = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);
  const badges = useSelector((state) => state.user.badges);

  useEffect(() => {
    dispatch(a.getAccountInfo());
  }, [dispatch]);

  const [tabActive, setTabActive] = useState("orders");

  return (
    <>
      <AgencyPageStyles className="agency agency-page">
        <div className="container">
          <div className="agency__main">
            <AgencyOrderContent
              tabActive={tabActive}
              setTabActive={setTabActive}
            ></AgencyOrderContent>
          </div>
        </div>
      </AgencyPageStyles>
      {/* <Footer /> */}
    </>
  );
};
export default AgencyOrderMain1;
