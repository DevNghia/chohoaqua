import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { formatPrice } from "../../../helper";
const BonusAgencyCardStyles = styled.div`
  box-shadow: 0 2px 6px 0 rgb(0 0 0 / 10%);
  border-radius: 10px !important;
  .img {
    border-radius: 10px;
    img {
      border-radius: 10px;
      width: 70px;
      height: 70px;
      border: none !important;
    }
  }
  .description {
    margin-bottom: 0 !important;
    font-weight: 400 !important;
    div {
      font-weight: 400 !important;
    }
    .bonus_agency-gift {
      align-items: center;
      justify-content: space-between;
      margin-top: 10px !important;
    }
  }
`;
export default function BonusAgencyCard(props) {
  const { step } = props;
  console.log(step, "1");
  const dispatch = useDispatch();

  const appTheme = useSelector((state) => state.app.appTheme);
  return (
    <BonusAgencyCardStyles
      className="address-card bonus-agency"
      id={step.id}
      style={{
        display: "flex",
        paddingTop: "6px",
        height: "100%",
      }}
    >
      <div className="img" style={{ float: "left", paddingRight: "10px" }}>
        <img
          src={step.reward_image_url ? step.reward_image_url : "./img/gift.svg"}
          width={70}
          height={70}
          style={{ objectFit: "cover" }}
          alt=""
        />
      </div>
      <div
        className="description"
        style={{ height: "auto", display: "block", width: "80%" }}
      >
        Đơn hàng trị giá:{" "}
        <span style={{ color: step.active ? "green" : "red" }}>
          {" "}
          {formatPrice(step.threshold)}{" "}
        </span>
        <div>
          Thưởng:{" "}
          <span style={{ color: step.active ? "green" : null }}>
            {step.reward_name}
          </span>
          , trị giá{" "}
          <span style={{ color: step.active ? "green" : null }}>
            {formatPrice(step.reward_value)}{" "}
          </span>
        </div>
        <div>{step.reward_description}</div>
        {step.active && (
          <div style={{ color: "green" }} className="row bonus_agency-gift">
            <b>Đạt thưởng</b>
            <img src="/img/gift-48.png" width="25" alt="bonus_agency"></img>
          </div>
        )}
      </div>
    </BonusAgencyCardStyles>
  );
}
