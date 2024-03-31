import AddressCard from "./AddressCard";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { userActions } from "../../../actions/userActions";
import styled from "styled-components";

const BranchPopUpStyles = styled.div`
  border-radius: 10px !important;
  transition: all 0.5s;
  .add_address {
    transition: all 0.3s;
    &:hover {
      opacity: 0.8;
    }
  }
  .address-delete {
    transition: all 0.3s;
    &:hover {
      color: #706d6d !important;
    }
  }
  .address-card {
    box-shadow: 0 2px 6px 0 rgb(0 0 0 / 10%);
    border-radius: 10px !important;
    .address-card-info {
      margin-bottom: 10px;
      span:first-child {
        text-transform: capitalize;
      }
    }
    .address-card-detail {
      font-weight: 400 !important;
    }
    .set-default-btn {
      height: 30px;
      transition: all 0.2s;
      &:hover {
        transform: scale(1.1);
      }
    }
    .address-card-btn {
      transition: all 0.2s;
      &:hover {
        opacity: 0.8;
      }
    }
  }
`;
export default function BranchPopup(props) {
  const { currentBranch, setCurrentBranch, handleClosePopup, selectBranch } =
    props;
  const appTheme = useSelector((state) => state.app.appTheme);
  const branches = useSelector((state) => state.branch.branches);

  const handleSelectBranch = (branch) => {
    setCurrentBranch(branch);
    selectBranch(branch);
    handleClosePopup();
  };

  return (
    <BranchPopUpStyles
      className="address-popup"
      style={{
        visibility:
          props.currentPopup === "branch" && props.customClass
            ? "visible"
            : "hidden",
        opacity: props.currentPopup === "branch" && props.customClass ? 1 : 0,
        transform: `scale(${props.currentPopup && props.customClass ? 1 : 0})`,
        display: props.currentPopup !== "branch" ? "none" : "table",
      }}
    >
      <div
        style={{
          display: "block",
          overflowY: "auto",
          maxHeight: "70vh",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h4>Chi nhánh</h4>
          <button
            className="address-delete"
            onClick={props.handleClosePopup}
            style={{ cursor: "pointer", color: "#999" }}
          >
            <i
              className="far fa-times-circle"
              style={{
                fontSize: 23,
              }}
            ></i>
          </button>
        </div>
        <div style={{ marginTop: "20px" }}>
          {branches.list?.length > 0
            ? branches.list.map((branch, index) => (
                <div className="address-card" key={index}>
                  {currentBranch?.id === branch.id ? (
                    <label
                      style={{
                        color: appTheme.color_main_1,
                      }}
                    >
                      Mặc định
                    </label>
                  ) : null}
                  <div className="address-card-info">
                    <span>{branch.name}</span>
                  </div>
                  <div className="address-card-detail">
                    {branch.address_detail ||
                    branch.wards_name ||
                    branch.district_name ||
                    branch.province_name
                      ? `Địa chỉ: ${branch.address_detail ?? ""}${
                          branch.wards_name ? `, ${branch.wards_name}` : ""
                        }${
                          branch.district_name
                            ? `, ${branch.district_name}`
                            : ""
                        }${
                          branch.province_name
                            ? `, ${branch.province_name}`
                            : ""
                        }`
                      : null}
                  </div>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <button
                      className="set-default-btn"
                      onClick={() => handleSelectBranch(branch)}
                      style={{
                        background: appTheme.color_main_1,
                        marginLeft: "auto",
                        cursor: "pointer",
                        borderRadius: "10px",
                      }}
                    >
                      Chọn chi nhánh này
                    </button>
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>
    </BranchPopUpStyles>
  );
}
