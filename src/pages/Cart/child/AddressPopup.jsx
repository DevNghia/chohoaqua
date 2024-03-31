import AddressCard from "./AddressCard";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import AddressForm from "../../Address/child/AddressForm";
import { userActions } from "../../../actions/userActions";
import { useDispatch } from "react-redux";
import styled from "styled-components";

const AddressPopUpStyles = styled.div`
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
`;
export default function AddressPopup(props) {
  const userAddress = useSelector((state) => state.user.address);

  const [isEdit, setIsEdit] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(false);
  const [isEditDefault, setIsEditDefault] = useState(false);
  const dispatch = useDispatch();

  function onEdit() {
    setIsEdit(!isEdit);
  }

  function onEdit(data) {
    setCurrentAddress(data);
    setIsEdit(true);
  }

  function handleCloseForm() {
    setIsEdit(false);
    props.handleClosePopup();
  }

  function handleUpdateAddress(info) {
    dispatch(userActions.updateUserAddress(info));
  }

  function handleAddAddress(info) {
    console.log(info);
    dispatch(userActions.addUserAddress({ ...info, fromCart: true }));
  }

  if (props.isAdd == true) {
    return (
      <AddressPopUpStyles className="address-popup">
        <div
          style={{
            maxHeight: isEdit ? "10px" : null,
          }}
        >
          <div
            className="address-page container"
            style={{
              minHeight: 0,
            }}
          >
            {props.currentPopup === "address" && props.customClass && (
              <AddressForm
                isAdd={props.isAdd}
                showTitle={true}
                currentAddress={{}}
                customClass={"active"}
                handleClose={handleCloseForm}
                handleCloseForm={handleCloseForm}
                handleBack={() => setIsEdit(!isEdit)}
                handleAddAddress={handleAddAddress}
                handleUpdateAddress={handleUpdateAddress}
              />
            )}
          </div>
        </div>
      </AddressPopUpStyles>
    );
  }

  return (
    <AddressPopUpStyles
      className="address-popup"
      style={{
        visibility:
          props.currentPopup === "address" && props.customClass
            ? "visible"
            : "hidden",
        opacity: props.currentPopup === "address" && props.customClass ? 1 : 0,
        transform: `scale(${props.currentPopup && props.customClass ? 1 : 0})`,
        display: props.currentPopup !== "address" ? "none" : "table",
      }}
    >
      <div
        style={{
          display: isEdit ? "block" : "none",
          maxHeight: isEdit ? "10px" : null,
        }}
      >
        <div
          className="address-page container"
          style={
            {
              // minHeight: 0
            }
          }
        >
          {props.currentPopup === "address" && props.customClass && (
            <AddressForm
              showTitle={true}
              currentAddress={currentAddress}
              customClass={"active"}
              handleClose={handleCloseForm}
              handleCloseForm={handleCloseForm}
              handleBack={() => setIsEdit(!isEdit)}
              // handleAddAddress={handleAddAddress}
              handleUpdateAddress={handleUpdateAddress}
              isEditDefault={isEditDefault}
              setCheckShipping={props.setCheckShipping}
            />
          )}
        </div>
      </div>
      <div
        style={{
          display: !isEdit ? "block" : "none",
          maxHeight: "70vh",
          overflowY: "auto",
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
          <h4>Địa chỉ giao hàng</h4>
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

        {
          <div>
            <div style={{ marginTop: "20px" }}>
              {userAddress.list.map((v, i) => (
                <AddressCard
                  key={i}
                  id={v.id}
                  address={v}
                  name={v.name}
                  isDefault={v.is_default}
                  address_detail={v.address_detail}
                  province={v.province}
                  provinceName={v.province_name}
                  district={v.district}
                  districtName={v.district_name}
                  wards={v.wards}
                  wardName={v.wards_name}
                  phone={v.phone}
                  handleClosePopup={props.handleClosePopup}
                  selectAddress={props.selectAddress}
                  data={v}
                  setIsEditDefault={setIsEditDefault}
                  onEdit={() => {
                    onEdit(v);
                  }}
                  setCheckShipping={props.setCheckShipping}
                />
              ))}
            </div>
          </div>
        }

        <br />
        <Link to="/dia-chi?c=true">
          {" "}
          <span
            className="add_address"
            style={{ color: "blue", cursor: "pointer" }}
          >
            Thêm địa chỉ
          </span>
        </Link>
      </div>
    </AddressPopUpStyles>
  );
}
