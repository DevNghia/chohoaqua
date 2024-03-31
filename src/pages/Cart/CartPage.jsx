import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { constants as c } from "../../constants";
import { appActions } from "../../actions/appActions";
import PageLoading from "../../components/PageLoading";
import { cartActions } from "../../actions/cartActions";
import { userActions } from "../../actions/userActions";
import { branchActions } from "../../actions/branchActions";
import { voucherActions } from "../../actions/voucherActions";
import BonusAgencyPopup from "./child/BonusAgencyPopup";
import { agencyActions as g } from "../../actions/agencyAction";
import styled from "styled-components";
import { useHistory, useLocation } from "react-router-dom";
import ModalSelectTypeOrder from "./child/ModalSelectTypeOrder";
import BranchPopup from "./child/BranchPopup";

const Header = React.lazy(() => import("../../components/Header"));
const Footer = React.lazy(() => import("../../components/Footer"));
const CartItem = React.lazy(() => import("./child/CartItem"));
const OrderInfo = React.lazy(() => import("./child/OrderInfo"));
const AddressPopup = React.lazy(() => import("./child/AddressPopup"));
const VoucherPopup = React.lazy(() => import("./child/VoucherPopup"));
const SuggestCombo = React.lazy(() => import("./child/SuggestCombo"));

const CartPageStyles = styled.div`
  .progress_main {
    padding: 0.5rem;
    margin-top: 0.5rem;
  }
  .bg_progress {
    padding: 40px;
    background-color: white;
    border-radius: 10px;
  }
  .progress_content {
    width: 60%;
    margin: 0 auto;
    .progress_info {
      display: flex;
      justify-content: space-between;
      font-size: 18px;
      color: #212121;
    }
    .progress {
      display: flex;
      justify-content: space-between;
      position: relative;
      width: 90%;
      margin: 35px auto 0;
      height: 2px;
      background-color: #e1e1e1;
      .progress_percent {
        position: absolute;
        top: 0;
        height: 100%;
      }
      .progress_item {
        width: 40px;
        height: 40px;
        border-radius: 100rem;
        overflow: hidden;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0 0 6px 0 rgb(0 0 0 / 10%);
        &:nth-child(2) {
          position: absolute;
          top: 0;
          left: 0;
          transform: translate(-50%, -50%);
        }
        &:nth-child(3) {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        &:nth-child(4) {
          position: absolute;
          top: 0;
          left: 100%;
          transform: translate(-50%, -50%);
        }
      }
    }
  }
  .content {
    margin-top: 30px;
    column-gap: 20px;
    .box-cart {
      border: none;
      box-shadow: 0 5px 10px 0 rgb(0 0 0 / 5%);
      border-radius: 10px;
      .list-order {
        background-color: white;
        border-bottom: 1px solid #ebebeb;
        padding: 1.25rem 1.5625rem;
        text-transform: uppercase;
        font-size: 16px;
        border-top-right-radius: 10px;
        border-top-left-radius: 10px;
        display: flex;
        justify-content: space-between;
        .status-product {
          width: 42px;
          height: 24px;
          border-radius: 100rem;
          background-color: #ecf0f1;
          border: 1px solid #dfe6e9;
          display: flex;
          align-items: center;
          transition: all 0.3s;
          padding: 0 2px;
          cursor: pointer;
          & > div {
            width: 18px;
            height: 18px;
            border-radius: 100rem;
            background-color: #7f8c8d;
            transition: all 0.3s;
          }
          &:has(input:checked) {
            background-color: #2ecc71;
          }
          input:checked + div {
            transform: translateX(100%);
            background-color: white;
          }
        }
      }
      .cart-item {
        padding: 1.25rem 1.5625rem;
        &:last-child {
          border-bottom-left-radius: 10px;
          border-bottom-right-radius: 10px;
        }
        .distributes {
          & > div {
            border-radius: 4px;
          }
          button {
            cursor: pointer;
          }
        }
      }
    }
  }
  .paymentProcess {
    display: flex;
    justify-content: center;
    column-gap: 40px;
    margin: 20px 0 40px;
    .paymentProcess_btn {
      height: 40px;
      width: 220px;
      background-color: white;
      border-radius: 100rem;
      box-shadow: 0 0 13px 0 rgb(0 0 0 / 8%);
      button {
        cursor: pointer;
        display: flex;
        column-gap: 10px;
        font-weight: 700;
        align-items: center;
        width: 100%;
        height: 100%;
        justify-content: center;
      }
      &:first-child {
        button {
          color: #999;
        }
      }
      &:last-child {
        button {
          color: white;
        }
      }
    }
  }
  .shopee-button-solid {
    transition: all 0.3s;
    &:hover {
      transform: scale(1.2);
    }
  }
  .modal-showPopup {
    display: flex !important;
    transition: all 0.3s;
  }
  .order-deliveryInfo,
  .order-deliveryInfo form {
    .order-left {
      margin-left: 0 !important;
      padding-left: 0.5rem !important;
    }
  }
  @media screen and (max-width: 1200px) {
    .content {
      flex-direction: column;
      .cart-items-list {
        width: 100%;
      }
      .order-info {
        width: 100%;
        padding-left: 0.5em;
        margin-top: 20px;
      }
    }
    .order-deliveryInfo,
    .order-deliveryInfo form {
      .order-left {
        padding-left: 0 !important;
      }
    }
  }
  @media screen and (max-width: 993px) {
    .content {
      .order-info {
        margin-top: 29px;
        .order-right {
          width: 100%;
        }
      }
      .order-deliveryInfo,
      .order-deliveryInfo form {
        flex-direction: column-reverse;
        .order-left {
          width: 100%;
        }
      }
    }
  }
  @media screen and (max-width: 760px) {
    .bg_progress {
      .progress_content {
        width: 80%;
      }
    }
    .content {
      .order-deliveryInfo {
        .content-address-cart-info {
          & > div {
            & > div:first-child {
              width: 45%;
            }
          }
          p {
            margin-left: 45%;
          }
        }
      }
    }
    .paymentProcess {
      background-color: white;
      padding: 20px 0 35px;
      position: fixed;
      right: 0;
      bottom: 2px;
      width: 100%;
      border-bottom: 1px solid #ebebeb;
    }
  }
  @media screen and (max-width: 560px) {
    .bg_progress {
      padding: 40px 15px;
      .progress_content {
        width: 100%;
        .progress_info {
          font-size: 16px;
        }
        .progress {
          .progress_item {
            width: 35px;
            height: 35px;
          }
        }
      }
    }
    .paymentProcess {
      column-gap: 20px;
      flex-direction: column-reverse;
      align-items: center;
      row-gap: 10px;

      .paymentProcess_btn {
        width: 200px;
      }
    }
    .content {
      .order-deliveryInfo {
        .content-address-cart-info {
          & > div {
            & > div:first-child {
              width: 40%;
            }
          }
          p {
            margin-left: 40%;
          }
        }
      }
    }
  }
`;
function CartPage(props) {
  const dispatch = useDispatch();
  const badges = useSelector((state) => state.user.badges);

  const branches = useSelector((state) => state.branch.branches);
  const [code_voucher, setVoucherCode] = useState(
    JSON.parse(localStorage.getItem("code_voucher")) || ""
  );
  const [is_use_points, setIsUsePoint] = useState(false);
  const [is_order_for_customer, setIsOrderForCustomer] = useState(false);
  const [idAddress, setIdAddress] = useState(-1);
  const [is_use_balance_collaborator, setUseCollaboratorBalance] =
    useState(false);
  const [is_use_balance_agency, setUseAgencyBalance] = useState(false);
  const [customClass, setCustomClass] = useState("");
  const [currentPopup, setCurrentPopup] = useState("");
  const [currentShowDistributeItem, setCurrentShowDistributeItem] =
    useState("");
  const [currentBranch, setCurrentBranch] = useState();
  const vouchers = useSelector((state) => state.voucher.list);
  const cartStatus = useSelector((state) => state.cart.status);
  const cartInfo = useSelector((state) => state.cart.cartInfo);
  const userAddress = useSelector((state) => state.user.address);
  const shipmentFee = useSelector((state) => state.cart.shipmentFee);
  const paymentMethod = useSelector((state) => state.cart.paymentMethod);
  const appTheme = useSelector((state) => state.app.appTheme);
  const tokenInfo = useSelector((state) => state.user.tokenInfo);
  const account = useSelector((state) => state.agency.account);
  const profile = useSelector((state) => state.user.profile);
  useEffect(() => {
    dispatch(g.getAccountInfo());
  }, []);
  useEffect(() => {
    if (branches.status === c.LOADING) {
      dispatch(
        branchActions.getBranches((listBranches) => {
          if (
            badges.allow_branch_payment_order &&
            badges.auto_choose_default_branch_payment_order &&
            listBranches?.length > 0
          ) {
            const branchDefault = listBranches.filter(
              (branch) => branch.is_default_order_online === true
            )?.[0];
            setCurrentBranch(branchDefault);
          }
        })
      );
    }
  }, []);

  useEffect(() => {
    if (shipmentFee.status === "SUCCESS" && shipmentFee.list?.length === 0) {
      localStorage.setItem("total_shipping_fee", JSON.stringify(0));
    }
    if (shipmentFee.status === "SUCCESS" && shipmentFee.list?.length > 0) {
      localStorage.setItem(
        "total_shipping_fee",
        JSON.stringify(shipmentFee.list?.[0].fee_with_type_ship?.[0].fee)
      );
    }
  }, [shipmentFee.list?.length, shipmentFee.status]);

  useEffect(() => {
    if (cartStatus === c.LOADING) {
      dispatch(
        cartActions.getCartInfo({
          is_order_for_customer: is_order_for_customer,
        })
      );
    }
  }, []);

  useEffect(() => {
    if (vouchers.status === c.SUCCESS && vouchers.data?.length === 1) {
      applyDiscount(
        "code_voucher",
        vouchers?.data[0]?.code,
        function (code) {
          setVoucherCode(code);
        },
        false,
        false,
        false
      );
    }
  }, [JSON.stringify(vouchers)]);

  useEffect(() => {
    document.title = "Thanh toán";
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    window.addEventListener("click", function (e) {
      let containers = document.querySelectorAll(".distributes");
      for (let i = 0; i < containers.length; i++) {
        if (containers[i].contains(e.target)) return;
      }
      setCurrentShowDistributeItem("");
    });
    // if (cartStatus === c.LOADING) {
    //   dispatch(
    //     cartActions.getCartInfo({
    //       is_order_for_customer: is_order_for_customer,
    //     })
    //   );
    // }

    if (cartStatus === c.FAILURE) {
      window.location.href = "/";
    }
    if (userAddress.status === c.LOADING) {
      if (tokenInfo) dispatch(userActions.getUserAddress());
    }
    if (paymentMethod.status === c.LOADING) {
      dispatch(cartActions.getPaymentMethods());
    }
    if (vouchers.status === c.LOADING) dispatch(voucherActions.getAllVoucher());
    // if (userAddress.status === c.SUCCESS && shipmentFee.status === c.LOADING) {
    //   const defaultAddressArr = userAddress.list.filter((v) => {
    //     return v.is_default;
    //   });
    //   let defaultAddress = {};
    //   if (defaultAddressArr.length > 0) {
    //     defaultAddress = defaultAddressArr[0];
    //     dispatch(cartActions.postListShipperFee(defaultAddress.id));
    //   } else {
    //     // defaultAddress = defaultAddressArr[0];
    //     // dispatch(cartActions.getShipmentFee(-1));
    //   }
    // }
    // document.addEventListener(
    //   "click",
    //   function (event) {
    //     if (
    //       !event.target.matches(".show-modal-btn") &&
    //       !event.target.closest(".address-popup")
    //     ) {
    //       handleClosePopup();
    //     }
    //   },
    //   false
    // );
  }, [cartStatus, dispatch, userAddress]);
  function handleChangeQuantity(product) {
    let defaultAddress = {};
    if (userAddress.status === c.SUCCESS) {
      const defaultAddressArr = userAddress.list.filter((v) => {
        return v.is_default;
      });
      if (defaultAddressArr.length > 0) {
        defaultAddress = defaultAddressArr[0];
      }
    }
    dispatch(
      cartActions.changeNumberInCart(
        product,
        {
          is_order_for_customer: is_order_for_customer,
        },
        defaultAddress,
        tokenInfo ? true : false
      )
    );
  }
  function handleOrder(orderInfo) {
    console.log("sdasdasdadasdad", orderInfo);
    dispatch(appActions.changePopup(c.MESSAGE_POPUP));
    dispatch(
      cartActions.order(orderInfo, () => {
        setCheckStep("3");
        setVoucherCode("");
        localStorage.removeItem("code_voucher");
        history.push("/gio-hang?s=3");
      })
    );
  }
  function handleShowPopup(type) {
    setCurrentPopup(type);
    setCustomClass("center");
  }
  function handleClosePopup() {
    setCustomClass("");
  }
  function handleVoucherInput(e) {
    setVoucherCode(e.target.value);
  }
  function handleSelectVoucher(code) {
    setCustomClass("");
    applyDiscount("code_voucher", code, function (code) {
      setVoucherCode(code);
    });
  }
  function selectAddress(dataAddress) {
    setIdAddress(dataAddress.id);
    dispatch(cartActions.applyAddress(dataAddress));
  }
  function selectBranch(dataBranch) {
    if (tokenInfo) {
      const defaultAddress =
        userAddress.list?.length > 0
          ? userAddress.list.filter((v) => v.is_default)
          : [];
      const idAddressCus =
        idAddress != -1 ? idAddress : defaultAddress?.[0]?.id;
      dispatch(
        cartActions.postListShipperFee(idAddressCus, null, dataBranch.id)
      );
    }
  }

  function applyDiscount(
    type,
    value,
    clearVoucher,
    showPopup = false,
    isClearEmptyVoucher = false,
    isShowMessage = true
  ) {
    let info = {
      code_voucher,
      is_use_points,
      is_use_balance_collaborator,
      is_order_for_customer,
    };
    info[type] = value;
    if (type === "code_voucher" && value === "") setVoucherCode("");
    dispatch(
      cartActions.applyDiscount(
        info,
        type,
        clearVoucher,
        showPopup,
        () => {
          if (isClearEmptyVoucher) setVoucherCode("");
        },
        isShowMessage
      )
    );
  }
  function onChangeAddress(address) {
    dispatch(cartActions.postListShipperFee(address.id));
  }

  function handleChangeCheckBox(type) {
    if (type === "bonus") {
      applyDiscount("is_use_points", !is_use_points);
      setIsUsePoint(!is_use_points);
    }
    if (type === "order_for_customer") {
      applyDiscount("is_order_for_customer", !is_order_for_customer);
      setIsOrderForCustomer(!is_order_for_customer);
    }
    if (type === "collaborator") {
      applyDiscount(
        "is_use_balance_collaborator",
        !is_use_balance_collaborator
      );
      setUseCollaboratorBalance(!is_use_balance_collaborator);
    }
    if (type === "agency") {
      applyDiscount("is_use_balance_agency", !is_use_balance_agency);
      setUseAgencyBalance(!is_use_balance_agency);
    }
  }
  const setCheckBox = (value) => {
    setIsUsePoint(value);
    setUseCollaboratorBalance(value);
    setUseAgencyBalance(value);
  };

  //Search params
  function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
  const query = useQuery();
  const step = query.get("s");
  const [showSelectModalTypeOrder, setShowSelectModalTypeOrder] =
    useState(false);
  //Handle Progress Bar
  // ''-login-deliveryInfo-completed
  const [checkStep, setCheckStep] = useState();
  const [checkShipping, setCheckShipping] = useState(null);
  const history = useHistory();
  const handleBackProcess = () => {
    history.push("/gio-hang?s=1");
  };
  const handlePaymentProcess = () => {
    if (tokenInfo) {
      if (step === null || step === "1") {
        history.push("/gio-hang?s=2");
      } else if (step === "2") {
        if (userAddress.list?.length > 0) {
          document.getElementById("order-btn").click();
        } else {
          dispatch(appActions.changePopup(c.MESSAGE_POPUP));
          dispatch({
            type: c.ORDER_FAILURE,
            message: "Chưa chọn địa chỉ",
          });
        }
      }
    } else {
      // dispatch(appActions.changePopup(c.PHONE_POPUP));
      if (step === null || step === "1") {
        setShowSelectModalTypeOrder(true);
      } else if (step === "2") {
        document.getElementById("order-btn").click();
      }
    }
  };
  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
    if (step === "3" && checkStep !== "3") {
      history.push("/gio-hang?s=2");
    }
  }, [checkStep, history, step]);
  // useEffect(() => {
  //   if (cartInfo.voucherStatus === 1) {
  //     setCustomClass("");
  //   } else if (cartInfo.voucherStatus === -1) {
  //     setCustomClass("center");
  //   }
  // }, [cartInfo.voucherStatus]);

  function checkHasDistribute() {
    const result =
      cartInfo?.line_items?.filter((v) => {
        if (
          v.product?.distributes.length > 0 &&
          v.allows_choose_distribute === true &&
          (v.distributes_selected?.length == 0 || !v.distributes_selected)
        ) {
          return true;
        } else {
          return false;
        }
      })?.length ?? 0;

    return result > 0;
  }
  return cartStatus === c.LOADING ? null : (
    <React.Fragment>
      {/* <Header /> */}
      {(cartInfo.line_items ?? []).length > 0 ? (
        <React.Fragment>
          <CartPageStyles className="cart-page">
            {showSelectModalTypeOrder && (
              <ModalSelectTypeOrder
                setShowSelectModalTypeOrder={setShowSelectModalTypeOrder}
                showSelectModalTypeOrder={showSelectModalTypeOrder}
              ></ModalSelectTypeOrder>
            )}
            <div className="container">
              <div className="progress_main">
                <div className="bg_progress">
                  <div className="progress_content">
                    <div className="progress_info">
                      <span>Đăng nhập</span>
                      <span>Thông tin giao hàng</span>
                      <span>Hoàn tất</span>
                    </div>
                    <div className="progress">
                      <div
                        className="progress_percent"
                        style={{
                          width: `${
                            step === null && !tokenInfo
                              ? "0"
                              : step === "1" && !tokenInfo
                              ? "0"
                              : step === "1" || step === null
                              ? "25%"
                              : step === "2"
                              ? "75%"
                              : "100%"
                          }`,
                          backgroundColor: appTheme.color_main_1,
                        }}
                      ></div>
                      <div
                        className="progress_item"
                        style={{
                          background: `${
                            step === null && !tokenInfo
                              ? "#fafafa"
                              : step === "1" && !tokenInfo
                              ? "#fafafa"
                              : step === null ||
                                step === "1" ||
                                step === "2" ||
                                step === "3"
                              ? appTheme.color_main_1
                              : "#fafafa"
                          }`,

                          color: `${
                            step === null && !tokenInfo
                              ? "#212121"
                              : step === "1" && !tokenInfo
                              ? "#212121"
                              : step === null ||
                                step === "1" ||
                                step === "2" ||
                                step === "3"
                              ? "white"
                              : "#212121"
                          }`,
                        }}
                      >
                        <span>
                          {step === null && !tokenInfo ? (
                            "01"
                          ) : step === "1" && !tokenInfo ? (
                            "01"
                          ) : step === null ||
                            step === "1" ||
                            step === "2" ||
                            step === "3" ? (
                            <i className="fa fa-check"></i>
                          ) : (
                            "01"
                          )}
                        </span>
                      </div>
                      <div
                        className="progress_item"
                        style={{
                          background: `${
                            step === "2" || step === "3"
                              ? appTheme.color_main_1
                              : "#fafafa"
                          }`,
                          color: `${
                            step === "2" || step === "3" ? "white" : "#212121"
                          }`,
                        }}
                      >
                        <span>
                          {step === "2" || step === "3" ? (
                            <i className="fa fa-check"></i>
                          ) : (
                            "02"
                          )}
                        </span>
                      </div>
                      <div
                        className="progress_item"
                        style={{
                          background: `${
                            step === "3" ? appTheme.color_main_1 : "#fafafa"
                          }`,
                          color: `${step === "3" ? "white" : "#212121"}`,
                        }}
                      >
                        <span>
                          {step === "3" ? (
                            <i className="fa fa-check"></i>
                          ) : (
                            "03"
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row content">
                {step === "1" || step === null ? (
                  <div className="cart-items-list">
                    {/* <SuggestCombo cartInfo={cartInfo}></SuggestCombo> */}
                    <div className="box-cart">
                      <h5 className="list-order">
                        <div>Đơn hàng ({badges.cart_quantity} sản phẩm)</div>
                        {/* {badges.status_agency == 1 ? (
                          <label
                            style={{
                              display: "flex",
                              alignItems: "center",
                              columnGap: "5px",
                              cursor: "pointer",
                            }}
                          >
                            Đặt hộ
                            <label className="status-product">
                              <input
                                type="checkbox"
                                hidden
                                name="is_order_for_customer"
                                value={is_order_for_customer}
                                checked={is_order_for_customer}
                                onChange={() =>
                                  handleChangeCheckBox("order_for_customer")
                                }
                              />
                              <div></div>
                            </label>
                          </label>
                        ) : null} */}
                      </h5>
                      {cartInfo.line_items.map(
                        (v, i) =>
                          v && (
                            <CartItem
                              allows_choose_distribute={
                                v.allows_choose_distribute
                              }
                              key={v.id}
                              line_item_id={v.id}
                              item_price={v.item_price}
                              is_use_points={is_use_points}
                              is_order_for_customer={is_order_for_customer}
                              before_discount_price={v.before_discount_price}
                              is_use_balance_collaborator={
                                is_use_balance_collaborator
                              }
                              is_use_balance_agency={is_use_balance_agency}
                              product={v.product}
                              quantity={v.quantity}
                              is_bonus={v.is_bonus}
                              note={v.note}
                              setCheckBox={setCheckBox}
                              changeQuantity={handleChangeQuantity}
                              distributes_selected={
                                v.distributes_selected ?? []
                              }
                              isShowDistribute={
                                v.id === currentShowDistributeItem
                              }
                              onShowDistribute={() =>
                                setCurrentShowDistributeItem(
                                  currentShowDistributeItem ? "" : v.id
                                )
                              }
                            />
                          )
                      )}
                    </div>
                  </div>
                ) : null}

                <OrderInfo
                  cartInfo={cartInfo}
                  code_voucher={code_voucher}
                  idAddress={idAddress}
                  is_use_points={is_use_points}
                  is_order_for_customer={is_order_for_customer}
                  userAddress={userAddress.list}
                  shipmentFee={shipmentFee.list}
                  paymentMethod={paymentMethod.list}
                  is_use_balance_collaborator={is_use_balance_collaborator}
                  is_use_balance_agency={is_use_balance_agency}
                  handleOrder={handleOrder}
                  setCheckStep={setCheckStep}
                  applyDiscount={applyDiscount}
                  handleShowPopup={handleShowPopup}
                  handleVoucherInput={handleVoucherInput}
                  handleChangeCheckBox={handleChangeCheckBox}
                  onChangeAddress={onChangeAddress}
                  step={step}
                  checkShipping={checkShipping}
                  setCheckShipping={setCheckShipping}
                  currentBranch={currentBranch}
                />
              </div>
            </div>
            <div
              className={`modal modal-showPopup`}
              style={{
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9999,
                visibility: customClass ? "visible" : "hidden",
                opacity: customClass ? 1 : 0,
              }}
            >
              <AddressPopup
                customClass={customClass}
                currentPopup={currentPopup}
                handleClosePopup={handleClosePopup}
                userAddress={userAddress?.list ?? []}
                selectAddress={selectAddress}
                setCheckShipping={setCheckShipping}
                isAdd={
                  userAddress.list?.length == 0 && currentPopup === "address"
                    ? true
                    : false
                }
              />
              <BranchPopup
                customClass={customClass}
                currentPopup={currentPopup}
                handleClosePopup={handleClosePopup}
                currentBranch={currentBranch}
                setCurrentBranch={setCurrentBranch}
                selectBranch={selectBranch}
              />

              <VoucherPopup
                customClass={customClass}
                currentPopup={currentPopup}
                vouchers={vouchers.data}
                code_voucher={code_voucher}
                used_voucher={cartInfo.used_voucher}
                applyDiscount={applyDiscount}
                handleVoucherInput={handleVoucherInput}
                handleClosePopup={handleClosePopup}
                handleSelectVoucher={handleSelectVoucher}
              />

              <BonusAgencyPopup
                customClass={customClass}
                currentPopup={currentPopup}
                userAddress={userAddress.list}
                bonus_agency={cartInfo.bonus_agency}
                handleClosePopup={handleClosePopup}
              />
            </div>
            <div className="paymentProcess">
              <div className="paymentProcess_btn">
                {step === null || step === "1" ? (
                  <button onClick={() => history.push("/")}>
                    <span>
                      <i className="fa fa-arrow-left"></i>
                    </span>
                    <span>Tiếp tục mua hàng</span>
                  </button>
                ) : (
                  <button onClick={handleBackProcess}>
                    <span>
                      <i className="fa fa-arrow-left"></i>
                    </span>
                    <span>Quay lại</span>
                  </button>
                )}
              </div>
              <div
                className="paymentProcess_btn"
                style={{
                  backgroundColor: appTheme.color_main_1,
                }}
              >
                <button
                  onClick={() => {
                    if (checkHasDistribute() === true)
                      dispatch(
                        appActions.changePopup(
                          c.AUTOHIDE_POPUP,
                          "Bạn chưa chọn phân loại!"
                        )
                      );
                    else handlePaymentProcess();
                  }}
                >
                  {" "}
                  {profile.status === "LOADING" ? (
                    <span>
                      {step !== null && step !== "1"
                        ? "Đặt hàng"
                        : "Tiến hành thanh toán"}
                    </span>
                  ) : null}
                  {profile?.is_collaborator === false &&
                  profile?.is_agency === false &&
                  profile?.is_agent_have_general_agency === false &&
                  profile?.is_general_agency === false ? (
                    <span>
                      {step !== null && step !== "1"
                        ? "Đặt hàng"
                        : "Tiến hành thanh toán"}
                    </span>
                  ) : null}
                  {profile?.is_collaborator === true ? (
                    <span>
                      {step !== null && step !== "1"
                        ? "Đặt hàng"
                        : "Tiến hành thanh toán"}
                    </span>
                  ) : null}
                  {profile?.is_agency === true ? (
                    <span>
                      {step !== null && step !== "1"
                        ? "Yêu cầu nhập hàng"
                        : "Tiến hành thanh toán"}
                    </span>
                  ) : null}
                  {profile?.is_agent_have_general_agency === true ? (
                    <span>
                      {step !== null && step !== "1"
                        ? "Yêu cầu nhập hàng"
                        : "Tiến hành thanh toán"}
                    </span>
                  ) : null}
                  {profile?.is_general_agency === true ? (
                    <span>
                      {step !== null && step !== "1"
                        ? "Yêu cầu nhập hàng"
                        : "Tiến hành thanh toán"}
                    </span>
                  ) : null}
                  {/* {account?.agency_type?.name == null ? (
                    <span>
                      {step !== null && step !== "1"
                        ? "Đặt hàng"
                        : "Tiến hành thanh toán"}
                    </span>
                  ) : (
                    <span>
                      {step !== null && step !== "1"
                        ? "Yêu cầu nhập hàng"
                        : "Tiến hành thanh toán"}
                    </span>
                  )} */}
                  <span>
                    <i class="fa fa-arrow-right"></i>
                  </span>
                </button>
              </div>
            </div>
          </CartPageStyles>
          <Footer />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <CartPageStyles className="_1fP0AH _2tKeYb">
            <div className="cart-empty">
              <img
                src="./img/cart-empty.png"
                alt="cart-empty"
                style={{
                  width: "150px",
                }}
              />
            </div>
            <div
              className="h9wsC4"
              style={{
                marginTop: 0,
                marginBottom: "10px",
              }}
            >
              Giỏ hàng của bạn còn trống!
            </div>
            <a className="_35zxc9" href="/">
              <button
                className="shopee-button-solid"
                style={{
                  background: appTheme.color_main_1,
                  borderRadius: "10px",
                  width: "200px",
                  cursor: "pointer",
                }}
              >
                <span className="_3SCpTT">MUA NGAY</span>
              </button>
            </a>
          </CartPageStyles>
          <Footer />
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
export default CartPage;
