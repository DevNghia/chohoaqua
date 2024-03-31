import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Footer from "../../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import StopWorking from "./child/StopWorking";
import AgencyTabs from "./child/AgencyTabs";
import AgencyContent from "./child/AgencyContent";
import { agencyActions as a } from "../../actions/agencyAction";
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

const AgencyPage = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);
  const badges = useSelector((state) => state.user.badges);

  useEffect(() => {
    dispatch(a.getAccountInfo());
  }, [dispatch]);

  const [tabActive, setTabActive] = useState("wallet");

  return (
    <>
      {(profile.is_agency && badges.status_agency === 1) ||
      (profile.is_general_agency && badges.status_agency === 1) ||
      (profile.is_agent_have_general_agency && badges.status_agency === 1) ? (
        <>
          <AgencyPageStyles className="agency agency-page">
            <div className="container">
              <div className="agency__main">
                <AgencyTabs
                  setTabActive={setTabActive}
                  tabActive={tabActive}
                ></AgencyTabs>
                <AgencyContent
                  tabActive={tabActive}
                  setTabActive={setTabActive}
                ></AgencyContent>
              </div>
            </div>
          </AgencyPageStyles>
          <Footer />
        </>
      ) : (
        <>
          <div className="collaborator-page">
            <StopWorking badges={badges} />
          </div>
          <Footer />
        </>
      )}
    </>
  );
};
export { AgencyPage };
