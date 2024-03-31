import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { userActions } from "../../../actions/userActions";

const AddressCardStyles = styled.div`
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
`;
export default function AddressCard(props) {
  const {
    id,
    name,
    address_detail,
    address,
    wardName,
    isDefault,
    provinceName,
    districtName,
    phone,
    data,
  } = props;
  const dispatch = useDispatch();
  function setDefault() {
    dispatch(
      userActions.setAddressDefault({
        ...address,
        is_default: true,
      })
    );
  }
  function selectAddress() {
    console.log("setCheckShipping");
    props.setCheckShipping(0);
    props.handleClosePopup();
    props.selectAddress({
      id,
      name,
      address_detail,
      address,
      wardName,
      isDefault,
      provinceName,
      districtName,
    });
  }

  function onEdit() {
    props.setIsEditDefault(isDefault);
    props.onEdit(props.data);
  }

  const appTheme = useSelector((state) => state.app.appTheme);
  return (
    <AddressCardStyles className="address-card" id={id}>
      {isDefault && (
        <label
          style={{
            color: appTheme.color_main_1,
          }}
        >
          Mặc định
        </label>
      )}
      <div className="address-card-info">
        <span>{name}</span> <span> - </span> <span>{phone}</span>
      </div>
      <div className="address-card-detail">
        {`Địa chỉ: ${
          address_detail ?? ""
        }, ${wardName}, ${districtName}, ${provinceName}`}
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <a
          onClick={onEdit}
          style={{
            color: appTheme.color_main_1,
            fontWeight: 400,
          }}
          className="address-card-btn"
        >
          Sửa
        </a>
        &nbsp; &nbsp;
        {!isDefault && (
          <a
            onClick={setDefault}
            style={{
              color: appTheme.color_main_1,
              fontWeight: 400,
            }}
            className="address-card-btn"
          >
            {" "}
            Đặt mặc định
          </a>
        )}
        {
          <button
            className="set-default-btn"
            onClick={selectAddress}
            style={{
              background: appTheme.color_main_1,
              marginLeft: "auto",
              cursor: "pointer",
              borderRadius: "10px",
            }}
          >
            Giao đến địa chỉ này
          </button>
        }
      </div>
    </AddressCardStyles>
  );
}
