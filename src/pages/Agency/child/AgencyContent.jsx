import React from "react";
import styled from "styled-components";
import AgencyHistoryBalance from "./AgencyHistoryBalance";
import AgencyInformationWallet from "./AgencyInformationWallet";
import AgencyOrder from "./AgencyOrder";
import AgencyOrderImport from "./AgencyOrderImport";
import AgencyPayment from "./AgencyPayment";
import AgencyReportChart from "./AgencyReportChart";
import AgencyReportChartImport from "./AgencyReportChartImport";
import AgencyRewardLadder from "./AgencyRewardLadder";
import AgencyReferralCode from "./AgencyReferralCode";
import AgencyRequest from "./AgencyRequest";
import AgencyOrderMain from "./Order/AgencyOrderMain";
import AgencyOrderAnother from "./AgencyOrderAnother";
import AgencyOrderMain1 from "./Order1/AgencyOrderMain";
import GenarelReport from "./GenarelReport";

const AgencyContentStyles = styled.div`
  width: 100%;
  background-color: white;
  border-radius: 0.25rem;
  padding: 1rem;
`;

const AgencyContent = ({ tabActive, setTabActive }) => {
  return (
    <AgencyContentStyles className="agency__content">
      {tabActive === "wallet" ? (
        <AgencyInformationWallet setTabActive={setTabActive} />
      ) : tabActive === "payment" ? (
        <AgencyPayment />
      ) : tabActive === "order_import" ? (
        <AgencyOrderImport />
      ) : tabActive === "order" ? (
        <AgencyOrder setTabActive={setTabActive} />
      ) : tabActive === "referralCode" ? (
        <AgencyReferralCode setTabActive={setTabActive} />
      ) : tabActive === "report_import" ? (
        <AgencyReportChartImport />
      ) : tabActive === "report" ? (
        <AgencyReportChart />
      ) : tabActive === "balance" ? (
        <AgencyHistoryBalance></AgencyHistoryBalance>
      ) : tabActive === "ladder" ? (
        <AgencyRewardLadder></AgencyRewardLadder>
      ) : tabActive === "request" ? (
        <AgencyRequest></AgencyRequest>
      ) : tabActive === "order_agency_import" ? (
        <AgencyOrderMain></AgencyOrderMain>
      ) : tabActive === "order_another" ? (
        <AgencyOrderAnother></AgencyOrderAnother>
      ) : tabActive === "orderss" ? (
        <AgencyOrderMain1></AgencyOrderMain1>
      ) : tabActive === "genarel_report" ? (
        <GenarelReport></GenarelReport>
      ) : null}
    </AgencyContentStyles>
  );
};

export default AgencyContent;
