import styled from "styled-components";
import BonusAgencyCard from "./BonusAgencyCard";

const BonusAgencyPopupStyles = styled.div`
  border-radius: 10px !important;
  transition: all 0.5s;
  .bonus-address-delete {
    top: 1em !important;
    right: 1em !important;
    transition: all 0.3s;
    &:hover {
      color: #706d6d !important;
    }
  }
  .bonus_agency-list-card {
    margin-top: 20px;
  }
`;

export default function BonusAgencyPopup(props) {
  return (
    <BonusAgencyPopupStyles
      className="address-popup"
      style={{
        visibility:
          props.currentPopup === "bonus_agency" && props.customClass
            ? "visible"
            : "hidden",
        opacity:
          props.currentPopup === "bonus_agency" && props.customClass ? 1 : 0,
        transform: `scale(${props.currentPopup && props.customClass ? 1 : 0})`,
        display: props.currentPopup !== "bonus_agency" ? "none" : "block",
      }}
    >
      <button
        className="bonus-address-delete"
        onClick={props.handleClosePopup}
        style={{ fontSize: "23px", cursor: "pointer", color: "#999" }}
      >
        <i className="far fa-times-circle"></i>
      </button>
      <h4>Mức thưởng cho đại lý</h4>
      <div className="bonus_agency-list-card">
        {props?.bonus_agency?.step_bonus.map((v, i) => (
          <BonusAgencyCard key={i} step={v} />
        ))}
      </div>
    </BonusAgencyPopupStyles>
  );
}
