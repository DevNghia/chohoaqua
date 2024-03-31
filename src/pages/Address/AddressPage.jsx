import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { constants as c } from "../../constants";
import { appActions } from "../../actions/appActions";
import PageLoading from "../../components/PageLoading";
import { userActions } from "../../actions/userActions";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const AddressCard = React.lazy(() => import("./child/AddressCard"));
const AddressForm = React.lazy(() => import("./child/AddressForm"));
const Header = React.lazy(() => import("../../components/Header"));
const Footer = React.lazy(() => import("../../components/Footer"));

const AddressPageStyles = styled.div`
  .address-page--path {
    padding-left: 15px;
    margin-bottom: 20px;
    cursor: pointer;
    span {
      display: flex;
      align-items: center;
      column-gap: 8px;
      font-weight: 500;
    }
  }
  .list-addressCart {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    row-gap: 20px;
    column-gap: 20px;
    .address-card {
      margin: 0;
      width: 100% !important;
      height: 100% !important;
    }
  }
  @media screen and (max-width: 768px) {
    .list-addressCart {
      grid-template-columns: repeat(1, 1fr);
    }
  }
`;

function AddressPage(props) {
  const myForm = useRef(null);
  const dispatch = useDispatch();
  const [formClass, setFormClass] = useState("");
  const [currentAddress, setCurrentAddress] = useState(null);
  const userAddress = useSelector((state) => state.user.address);
  const [initShowed, setInitShowed] = useState(false);
  const { search } = useLocation();

  useEffect(() => {
    document.title = "Địa chỉ nhận hàng";

    if (initShowed == false && props.location.fromCart) {
      setInitShowed(true);
      handleShowForm(null);
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    if (userAddress.status === c.LOADING) {
      dispatch(userActions.getUserAddress());
    }
    if (userAddress.status === c.FAILURE) {
      window.location.href = "/";
      console.log("fail");
    }
  });
  function handleShowForm(info) {
    if (info && (!currentAddress || currentAddress.id !== info.id)) {
      setCurrentAddress(info);
    }
    if (!info) {
      setCurrentAddress(null);
    }
    setFormClass("active");
  }
  function handleCloseForm() {
    setFormClass("");
  }
  function handleAddAddress(info) {
    console.log(info);
    dispatch(
      userActions.addUserAddress({ ...info, fromCart: props.location.fromCart })
    );
  }
  function handleUpdateAddress(info) {
    console.log(info);
    dispatch(userActions.updateUserAddress(info));
  }
  function handleDeleteAddress(id) {
    dispatch(appActions.changePopup(c.MESSAGE_POPUP));
    dispatch(userActions.deleteUserAddress(id));
  }
  function setDefault(index) {
    dispatch(
      userActions.setAddressDefault({
        ...userAddress.list[index],
        is_default: true,
      })
    );
  }
  const appTheme = useSelector((state) => state.app.appTheme);
  const history = useHistory();
  const handleBackCartModal = () => {
    history.push("/gio-hang?s=2");
  };
  return (
    <React.Fragment>
      {/* <Header /> */}
      {userAddress.status === c.SUCCESS ? (
        <React.Fragment>
          <AddressPageStyles className="address-page container">
            {search === "?c=true" && (
              <div className="address-page--path">
                <span onClick={handleBackCartModal}>
                  <i className="fa fa-chevron-left"></i>
                  <span style={{ color: appTheme.color_main_1 }}>Quay lại</span>
                </span>
              </div>
            )}

            <div className="list-addressCart">
              {userAddress.list.map((v, i) => (
                <AddressCard
                  key={i}
                  id={v.id}
                  name={v.name}
                  email={v.email}
                  address_detail={v.address_detail}
                  handleEdit={handleShowForm}
                  isDefault={v.is_default}
                  province={v.province}
                  province_name={v.province_name}
                  district={v.district}
                  district_name={v.district_name}
                  wards={v.wards}
                  wards_name={v.wards_name}
                  phone={v.phone}
                  handleDelete={handleDeleteAddress}
                  setDefault={() => setDefault(i)}
                />
              ))}
            </div>
            <div
              className="add-address-wrapper"
              style={{
                fontSize: "14px",
                paddingLeft: "15px",
                color: "#999",
                marginTop: "20px",
              }}
            >
              Giao đến địa chỉ khác ?
              <span
                style={{ color: "blue", cursor: "pointer" }}
                onClick={() => handleShowForm({})}
              >
                Thêm địa chỉ
              </span>
            </div>
            <div ref={myForm}>
              {currentAddress != null && (
                <AddressForm
                  handleBack={handleCloseForm}
                  showTitle={true}
                  currentAddress={currentAddress}
                  customClass={formClass}
                  handleClose={handleCloseForm}
                  handleAddAddress={handleAddAddress}
                  handleUpdateAddress={handleUpdateAddress}
                />
              )}
            </div>
          </AddressPageStyles>
          <Footer />
        </React.Fragment>
      ) : null}
      {/* <Footer /> */}
    </React.Fragment>
  );
}
export default AddressPage;
