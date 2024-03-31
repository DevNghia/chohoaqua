import React from "react";
import VoucherCard from "./VoucherCard";
import "./style.css";
import styled from "styled-components";
import { useSelector } from "react-redux";

const VoucherPopupStyles = styled.div`
  border-radius: 10px !important;
  transition: all 0.5s;
  .voucher-address-delete {
    top: 1em !important;
    right: 1em !important;
    transition: all 0.3s;
    &:hover {
      color: #706d6d !important;
    }
  }
  .voucher-content {
    transition: all 0.2s;
    &:hover {
      box-shadow: 0 2px 6px 0 rgb(0 0 0 / 20%) !important;
    }
  }
  .voucher_input {
    display: flex;
    margin: 30px 0 10px;
    column-gap: 10px;
    input {
      border: 1px solid #dadada;
      background: #ffffff;
      height: 38px;
      line-height: 38px;
      font-size: 14px;
      color: #757575;
      padding: 0 12px;
      width: 100%;
      border-radius: 4px;
    }
    button {
      white-space: nowrap;
      padding: 0 15px;
      border-radius: 4px;
      color: #ffffff;
    }
  }
`;

export default function VoucherPopup(props) {
  const appTheme = useSelector((state) => state.app.appTheme);
  return (
    <VoucherPopupStyles
      className="voucher-popup address-popup"
      style={{
        visibility:
          props.currentPopup === "voucher" && props.customClass
            ? "visible"
            : "hidden",
        opacity: props.currentPopup === "voucher" && props.customClass ? 1 : 0,
        transform: `scale(${props.currentPopup && props.customClass ? 1 : 0})`,
        display: props.currentPopup !== "voucher" ? "none" : "block",
      }}
    >
      <button
        onClick={props.handleClosePopup}
        className="voucher-address-delete"
        style={{ fontSize: "23px", cursor: "pointer", color: "#999" }}
      >
        <i className="far fa-times-circle"></i>
      </button>
      <div className="voucher_input">
        <input
          disabled={props.used_voucher !== null}
          type="text"
          placeholder="Nhập voucher"
          value={props.code_voucher}
          onChange={props.handleVoucherInput}
        />
        {props.used_voucher ? (
          <button
            style={{
              background: appTheme.color_main_1,
              cursor: "pointer",
            }}
            onClick={() => props.applyDiscount("code_voucher", "", null, true)}
          >
            Hủy
          </button>
        ) : (
          <button
            style={{
              background: appTheme.color_main_1,
              cursor: "pointer",
            }}
            onClick={() =>
              props.applyDiscount(
                "code_voucher",
                props.code_voucher,
                null,
                false,
                true
              )
            }
          >
            Áp dụng
          </button>
        )}
      </div>
      <h4>Mã giảm giá</h4>
      <br></br>
      {props.vouchers.length > 0 ? (
        <React.Fragment>
          {props.vouchers.map((v, i) => (
            <VoucherCard
              onSelect={props.handleSelectVoucher}
              voucher={v}
              key={i}
            />
          ))}
        </React.Fragment>
      ) : (
        <div>Không có voucher phù hợp!</div>
      )}
    </VoucherPopupStyles>
  );
}
