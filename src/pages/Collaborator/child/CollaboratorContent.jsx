import React, { useState } from "react";
import styled from "styled-components";
import CollaboratorHistoryBalance from "./CollaboratorHistoryBalance";
import CollaboratorInformationWallet from "./CollaboratorInformationWallet";
import CollaboratorOrder from "./CollaboratorOrder";
import CollaboratorPayment from "./CollaboratorPayment";
import CollaboratorReportChart from "./CollaboratorReportChart";
import CollaboratorRewardLadder from "./CollaboratorRewardLadder";
import CollaboratorReferralCode from "./CollaboratorReferralCode";

const CollaboratorContentStyles = styled.div`
  width: 100%;
  background-color: white;
  border-radius: 0.25rem;
  padding: 1rem;
`;

const CollaboratorContent = ({ tabActive, setTabActive }) => {
  return (
    <CollaboratorContentStyles className="collab__content">
      {tabActive === "wallet" ? (
        <CollaboratorInformationWallet
          setTabActive={setTabActive}
        ></CollaboratorInformationWallet>
      ) : tabActive === "order" ? (
        <CollaboratorOrder setTabActive={setTabActive}></CollaboratorOrder>
      ) : tabActive === "referralCode" ? (
        <CollaboratorReferralCode
          setTabActive={setTabActive}
        ></CollaboratorReferralCode>
      ) : tabActive === "balance" ? (
        <CollaboratorHistoryBalance></CollaboratorHistoryBalance>
      ) : tabActive === "ladder" ? (
        <CollaboratorRewardLadder></CollaboratorRewardLadder>
      ) : tabActive === "report" ? (
        <CollaboratorReportChart></CollaboratorReportChart>
      ) : (
        <CollaboratorPayment></CollaboratorPayment>
      )}
    </CollaboratorContentStyles>
  );
};

export default CollaboratorContent;
