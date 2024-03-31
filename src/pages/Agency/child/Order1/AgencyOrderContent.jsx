import React from "react";
import styled from "styled-components";
import AgencyOrders from "./AgencyOrders";
import AgencyOrderDetail from "./AgencyOrderDetail";
const AgencyContentStyles = styled.div`
  width: 100%;
  background-color: white;
  border-radius: 0.25rem;
  padding: 1rem;
`;

const AgencyOrderContent = ({ tabActive, setTabActive }) => {
  return (
    <AgencyContentStyles className="agency__content">
      {tabActive === "orders" ? (
        <AgencyOrders setTabActive={setTabActive} />
      ) : tabActive === "order_detail" ? (
        <AgencyOrderDetail setTabActive={setTabActive} />
      ) : null}
    </AgencyContentStyles>
  );
};

export default AgencyOrderContent;
