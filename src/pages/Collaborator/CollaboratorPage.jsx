import React, { useState } from "react";
import styled from "styled-components";
import CollaboratorTabs from "./child/CollaboratorTabs";
import CollaboratorContent from "./child/CollaboratorContent";
import Footer from "../../components/Footer";
import { useSelector } from "react-redux";
import StopWorking from "./child/StopWorking";

const CollaboratorPageStyles = styled.div`
  min-height: calc(100vh - 8.5em);
  padding: 1em 0;
  .container {
    padding: 0 !important;
  }
  .collaborator__main {
    width: 100%;
    display: flex;
    column-gap: 20px;
    background-color: #f7f7f7;
  }
  @media only screen and (max-width: 976px) {
    .collaborator__main {
      flex-direction: column;
      row-gap: 15px;
    }
  }
`;

const CollaboratorPage = () => {
  const profile = useSelector((state) => state.user.profile);
  const badges = useSelector((state) => state.user.badges);

  const [tabActive, setTabActive] = useState("wallet");

  return (
    <>
      {profile.is_collaborator && badges.status_collaborator === 1 ? (
        <>
          <CollaboratorPageStyles className="collaborator collaborator-page">
            <div className="container">
              <div className="collaborator__main">
                <CollaboratorTabs
                  setTabActive={setTabActive}
                  tabActive={tabActive}
                ></CollaboratorTabs>
                <CollaboratorContent
                  tabActive={tabActive}
                  setTabActive={setTabActive}
                ></CollaboratorContent>
              </div>
            </div>
          </CollaboratorPageStyles>
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
export { CollaboratorPage };
