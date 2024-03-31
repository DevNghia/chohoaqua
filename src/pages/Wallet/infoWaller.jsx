import React from "react";
import { formatPrice } from "../../helper";
export default function infoWaller(props) {
  const {
    balance
  } = props.info;
  const { setCurrentTab, setCurrentStatisticTab } = props;
  return (
    <React.Fragment>
      <div className="row">
        <h4>
          Số dư:{" "}
          <span style={{ color: "DodgerBlue " }}>
            {formatPrice(balance)}
          </span>
        </h4>
      </div>
    </React.Fragment>
  );
}
