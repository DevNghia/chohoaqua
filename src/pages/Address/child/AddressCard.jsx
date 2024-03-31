import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const AddressCardStyles = styled.div`
  display: flex;
  flex-direction: column;
  .address-card-btnFunction {
    flex-grow: 1;
    display: flex;
    align-items: flex-end;
  }
  .custom-checkbox {
    width: 10px;
    height: 10px;
    border-radius: 100rem;
  }
  .address-card-setDefault {
    margin-top: 0 !important;
    display: flex;
    justify-content: flex-end;
    cursor: pointer;
  }
  .address-card-btn {
    width: 100px;
    height: 35px;
    border-radius: 100rem !important;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;

    &.edit-btn {
      color: #999;
      background-color: transparent;
      border: 1px solid #999;
      margin-right: 10px;
    }
  }
`;

export default function AddressCard(props) {
  const {
    id,
    isDefault,
    province_name,
    district_name,
    wards_name,
    name,
    address_detail,
    handleDelete,
  } = props;
  console.log("AddressCard ~ props", props);
  const appTheme = useSelector((state) => state.app.appTheme);
  return (
    <AddressCardStyles className="address-card" id={id}>
      <div className="address-card-setDefault" onClick={props.setDefault}>
        {isDefault ? (
          <span
            className="custom-checkbox"
            // onClick={() => handleCheckBoxAddressDefault(index)}
            style={{
              cursor: "pointer",
              backgroundColor:
                isDefault === true ? appTheme.color_main_1 : "white",
              boxShadow: `${
                isDefault === true
                  ? `0 0 0 2px white, 0 0 0 3px ${appTheme.color_main_1}`
                  : "0 0 0 2px white, 0 0 0 3px #dadada"
              }`,
            }}
          ></span>
        ) : (
          <span
            className="custom-checkbox"
            // onClick={() => handleCheckBoxAddressDefault(index)}
            style={{
              cursor: "pointer",
              backgroundColor:
                isDefault === true ? appTheme.color_main_1 : "#dadada",
              boxShadow: `${
                isDefault === true
                  ? `0 0 0 2px white, 0 0 0 3px ${appTheme.color_main_1}`
                  : "0 0 0 2px white, 0 0 0 3px #dadada"
              }`,
            }}
          ></span>
        )}
      </div>
      <span style={{ textTransform: "capitalize" }}>{name}</span>
      <div>
        {`Địa chỉ: ${
          address_detail ?? ""
        }, ${wards_name}, ${district_name}, ${province_name}`}
      </div>
      <div className="address-card-btnFunction">
        <button
          className="address-card-btn edit-btn"
          onClick={() => props.handleEdit(props)}
        >
          Sửa
        </button>
        {!isDefault && (
          <button
            className="address-card-btn delete-btn"
            onClick={() => handleDelete(id)}
            style={{
              cursor: "pointer",
              color: appTheme.color_main_1,
              border: `1px solid ${appTheme.color_main_1}`,
            }}
          >
            Xóa
          </button>
        )}
      </div>
    </AddressCardStyles>
  );
}
