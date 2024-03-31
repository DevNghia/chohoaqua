import { formatPrice, formatPriceOrContact } from "../../../helper";
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { appActions } from "../../../actions/appActions";
import { agencyActions } from "../../../actions/agencyAction.js";
import { constants } from "../../../constants";
// import Select from "../../../components/Select";
import Select from "react-select";
import { hideParentElement } from "../../../helper";
import { appActions as a } from "../../../actions/appActions";
import { Link } from "react-router-dom";
import { ORDER_FROM_WEB } from "../../../constants/define_order";
import AddressForm from "../../Address/child/AddressForm.jsx";
import AddressPopup from "./AddressPopup.jsx";
import { cartActions } from "../../../actions/cartActions";
import styled from "styled-components";
import VnPay from "../payment_terms/VnPay";
import OnePay from "../payment_terms/OnePay";
import PulseLoader from "../../../components/Common/loading/PulseLoader.jsx";

const OrderStyles = styled.div`
  .personal-info,
  .info-input {
    border: none;
    border-radius: 10px;
    margin-bottom: 20px !important;
    .address-cart {
      padding: 1.25rem 1.5625rem;
      background-color: white;
      border-bottom: 1px solid #ebebeb;
      text-transform: uppercase;
      h5 {
        font-weight: 600;
        font-size: 16px;
      }
      .show-modal-btn {
        font-size: 14px;
        cursor: pointer;
      }
    }
    .content-address-cart {
      padding: 1.25rem 1.5625rem;
      margin: 0;
    }
  }
  .voucher-input {
    border: none;
    border-radius: 10px;
    margin-bottom: 20px !important;
    .box-voucher-cart {
      padding: 1.25rem 1.5625rem;
      background-color: white;
      border-bottom: 1px solid #ebebeb;
      text-transform: uppercase;
      h5 {
        font-weight: 600;
        font-size: 16px;
      }
      .show-modal-btn {
        font-size: 14px;
      }
    }
    .voucher-wrapper {
      padding: 1.25rem 1.5625rem;
      margin: 0;
      input,
      button {
        border-radius: 5px;
      }
    }
  }
  .payment-method {
    border: none;
    overflow: hidden;
    border-radius: 10px;
    margin-bottom: 20px !important;
    .box-payment-cart {
      padding: 1.25rem 1.5625rem;
      background-color: white;
      border-bottom: 1px solid #ebebeb;
      text-transform: uppercase;
      h5 {
        font-weight: 600;
        font-size: 16px;
      }
    }
    .content-payment-cart {
      padding: 1.25rem 1.5625rem;
      margin: 0;
      & > div {
        display: flex;
        align-items: center;
        column-gap: 4px;
        label {
          font-weight: 500;
        }
      }
    }
  }
  .note-input {
    border: none;
    overflow: hidden;
    border-radius: 10px;
    .box-note-cart {
      padding: 1.25rem 1.5625rem;
      background-color: white;
      border-bottom: 1px solid #ebebeb;
      text-transform: uppercase;
      h5 {
        font-weight: 600;
        font-size: 16px;
      }
    }
    .note-input-cart {
      padding: 1.25rem 1.5625rem;
      margin: 0;
      input {
        padding: 10px 15px !important;
        border-radius: 8px;
        height: 80px;
        border: 1px solid #dadada;
        width: 100%;
        resize: vertical;
      }
      textarea {
        border: 1px solid #dadada;
        background: white;
        font-size: 14px;
        color: #757575;
        padding-left: 0.5em;
        width: 100%;
        padding: 20px 15px !important;
        border-radius: 8px;
      }
    }
    .invoice_company_content {
      padding: 0.25rem 1.5625rem 1.25rem 1.5625rem;
      display: flex;
      flex-direction: column;
      row-gap: 15px;
      .invoice_company_item {
        display: flex;
        flex-direction: column;
        label {
          margin-bottom: 10px;
        }
        input {
          border: 1px solid #dadada;
          background: white;
          padding: 0 15px;
          border-radius: 8px;
          line-height: 38px;
          font-size: 14px;
        }
      }
    }
  }
  .delivery-method,
  .delivery-input {
    border: none;
    overflow: hidden;
    border-radius: 10px;
    margin-bottom: 20px !important;
    .box-delivery-cart {
      padding: 1.25rem 1.5625rem;
      background-color: white;
      border-bottom: 1px solid #ebebeb;
      text-transform: uppercase;
      h5 {
        font-weight: 600;
        font-size: 16px;
      }
    }
    .content-delivery-cart-parent {
      font-size: 16px !important;
      color: #565656;
      padding: 5px 15px;
      .content-delivery-cart {
        padding: 0.5rem 1.5625rem !important;
        margin: 0;
        input {
          border-radius: 5px;
        }
        span {
          font-weight: 500;
        }
      }
    }
    .content-delivery-cart-child {
      margin-top: 5px;
      .content-delivery-cart {
        display: flex;
        justify-content: space-between;
        .content-delivery-cart-description {
          display: flex;
          align-items: center;
          flex-grow: 1;
          label {
            flex-grow: 1;
          }
        }
      }
    }
  }
  .price-info {
    overflow: hidden;
    border-radius: 10px;
    background-color: white;
    padding-bottom: 20px;
    margin-bottom: 20px;
    .box-price-title-info {
      padding: 1.25rem 1.5625rem;
      border-bottom: 1px solid #ebebeb;
      h5 {
        font-weight: 600;
        font-size: 16px;
        text-transform: uppercase;
      }
    }
    .box-price-info-cart {
      border: none;
      padding: 1.25rem 1.5625rem;
    }
  }
  .div-order-btn {
    padding: 0 1.5625rem;
    #order-btn {
      border-radius: 10px !important;
    }
  }
  .priceInTotal {
    & > div {
      font-weight: 500;
      color: #212121;
    }
  }
  .cart-list-info {
    display: flex;
    flex-direction: column;
    padding: 1.25rem 1.5625rem;
    .cart-item-info {
      display: flex;
      align-items: center;
      column-gap: 10px;
      padding: 1.25rem 0;
      border-bottom: 1px solid #ebebeb;
      .cart-info-img {
        width: 70px;
        height: 70px;
        border-radius: 5px;
        flex-shrink: 0;
        img {
          width: 100%;
          height: 100%;
          border-radius: 5px;
        }
      }
      .cart-item-name {
        width: 120px;
        line-height: 22px;
      }
      .cart-info-totalQuantity {
        margin-left: auto;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        div:nth-child(2) {
          margin: 5px 0;
        }
        div:last-child {
          font-size: 16px;
          font-weight: 500;
        }
      }
    }
  }
  .authorized-dealer {
    border-bottom: 1px solid #ebebeb;
    .box-often {
      background-color: white;
      border: none;
      padding: 1.25rem 1.5625rem;
      h5 {
        font-weight: 600;
        font-size: 16px;
        text-transform: uppercase;
      }
      button {
        font-size: 14px;
        cursor: pointer;
      }
    }
  }
  .box-gift {
    padding: 1.25rem 1.5625rem;
    align-items: center;
    .box-gift-img {
      margin: 0;
      padding: 0;
      width: 70px;
      height: 70px;
      border-radius: 5px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 5px;
      }
    }
    .box-gift-title {
      padding: 0;
      margin: 0;
      & > div {
        display: flex;
        column-gap: 20px;
        .box-gift-title-image {
          img {
            margin-left: 0 !important;
          }
        }
        .box-gift-title-content {
          b {
            margin-bottom: 2px;
            display: inline-block;
          }
          .box-gift-color {
            padding: 1px 0;
          }
        }
      }
    }
  }
  &.order-deliveryInfo,
  &.order-deliveryInfo form {
    display: flex;
    flex-direction: row-reverse;
    width: 100% !important;
    overflow: visible !important;
    column-gap: 25px;
    .order-left {
      flex-grow: 1;
      margin-left: 0.5rem;
    }
  }

  .content-address-cart {
    display: flex;
    flex-direction: column;
    row-gap: 20px;

    .content-address-cart-info {
      & > div {
        display: flex;
        align-items: center;
        & > div:first-child {
          width: 30%;
          flex-shrink: 0;
          span {
            display: inline-block;
            font-size: 12px;
          }
        }
        input {
          padding: 15px;
          border-radius: 8px;
          margin: 0 !important;
          background-color: white;
          width: 100%;
        }
      }
      p {
        margin-left: 30%;
        margin-top: 5px;
      }
    }
  }
  &.order-deliveryInfo form {
    .content-address-cart {
      .content-address-cart-info {
        margin-top: 0 !important;
        input,
        select {
          padding: 15px;
          border-radius: 8px;
          margin: 0 !important;
          width: 100%;
          background-color: white;
          border: 1px solid #dadada;
        }
      }
    }
  }
  .custom-checkbox {
    width: 10px;
    height: 10px;
    border-radius: 100rem;
  }
  .content-payment-cart {
    label {
      cursor: pointer;
    }
  }
  .select-address {
    width: 100%;
    border: 1px solid #e4e4e4;
    border-radius: 5px;
    margin-top: 1em;
    margin-bottom: 2px;
    .css-1s2u09g-control,
    .css-1pahdxg-control {
      border: none !important;
      height: 48px;
      &:hover {
        border: none !important;
        box-shadow: none !important;
      }
    }
    .input {
      padding: 0 !important;
    }
  }
  .invoice_company {
    display: flex;
    column-gap: 8px;
    align-items: center;
  }
`;

export default function OrderInfo(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  const [submited, setSubmited] = useState(false);
  const dispatch = useDispatch();
  const {
    used_voucher,
    total_after_discount,
    total_before_discount,
    product_discount_amount,
    bonus_points_amount_can_use,
    balance_collaborator_can_use,
    balance_agency_can_use,
    voucher_discount_amount,
    combo_discount_amount,
    bonus_agency,
    total_shipping_fee,
    total_points_can_use,
    ship_discount_amount,
    vat,
    total_final,
    total_commission_order_for_customer,
  } = props.cartInfo;
  console.log("OrderInfo ~ cartInfo:", props.cartInfo);
  const { step, currentBranch } = props;
  const defaultAddressArr = props.userAddress.filter((v) => v != null);

  const appTheme = useSelector((state) => state.app.appTheme);
  const profile = useSelector((state) => state.user.profile);
  const tokenInfo = useSelector((state) => state.user.tokenInfo);
  const badges = useSelector((state) => state.user.badges);
  const account = useSelector((state) => state.agency.account);
  const listAgency = useSelector((state) => state.agency.listAgency);
  const userAddress = useSelector((state) => state.user.address);

  const [defaultAddress, setDefaultAddress] = useState({});
  const [agencyId, setAgencyId] = useState(null);
  console.log("địa chủ nhà nó:      ", defaultAddress);
  const [queries, setQueries] = useState({
    province: getQueryParams("province") || "",
    district: getQueryParams("district") || "",
    wards: getQueryParams("wards") || "",
  });

  // if (Object.getOwnPropertyNames(defaultAddress).length === 0) {
  //   alert("ko có địa chỉ");
  // } else {
  //   alert("có địa chỉ");
  // }
  useEffect(() => {
    setQueries((prevQueries) => ({
      ...prevQueries,
      province: defaultAddress.province,
      district: defaultAddress.district,
      wards: defaultAddress.wards,
    }));
  }, [defaultAddress]);
  function getQueryParams(name) {
    const searchParams = new URLSearchParams(window.location.search);
    const param = searchParams.get(name) ?? "";
    return param;
  }

  function handleChangeQueryString(q) {
    let queryKeys = [...Object.keys(q)];

    let queryStr = queryKeys.reduce((rs, v) => `${rs}${v}=${q[v]}&`, "?");

    dispatch(agencyActions.getListAgency(queryStr));
  }

  const loadingShippingFee = useSelector(
    (state) => state.cart.loadingShippingFee
  );

  // useEffect(() => {
  //   setQueries((prevQueries) => ({ ...prevQueries, province: 2 }));
  // }, [dispatch, queries.province]);
  useEffect(() => {
    handleChangeQueryString(queries);
  }, [dispatch, queries.province, queries.district, queries.wards]);

  useEffect(() => {
    dispatch(appActions.getProvincesList());
  }, [props.idAddress]);

  useEffect(() => {
    var defaultAddress2 = [];
    if (props.idAddress != null && props.idAddres != -1) {
      defaultAddress2 = props.userAddress.filter(
        (v) => v.id == props.idAddress
      );
      if (defaultAddress2.length > 0) setDefaultAddress(defaultAddress2[0]);
    } else {
      defaultAddress2 = props.userAddress.filter((v) => v.is_default);
      if (defaultAddress2.length > 0) setDefaultAddress(defaultAddress2[0]);
    }
    if (defaultAddress2.length == 0 && props.userAddress?.length === 1) {
      setDefaultAddress(props.userAddress[0]);
    }
  }, [props.idAddress]);

  useEffect(() => {
    props.onChangeAddress(defaultAddress);
  }, [defaultAddress]);

  useEffect(() => {
    const defaultAddress2 = props.userAddress.filter((v) => v.is_default);
    if (defaultAddress2.length > 0) setDefaultAddress(defaultAddress2[0]);
  }, [props.userAddress]);

  useEffect(() => {
    if (props.paymentMethod != null && props.paymentMethod.length > 0) {
      setPaymentMethod(props.paymentMethod[0]);
    }
  }, [props.paymentMethod]);
  const [shipmentInfo, setShipmentInfo] = useState({
    description: "",
    ship_speed_code: "",
    partner_id: "",
    fee: 0,
  });

  useEffect(() => {
    if ((props.shipmentFee ?? []).length > 0) {
      setShipmentInfo({
        ...props.shipmentFee?.[0]?.fee_with_type_ship?.[0],
        partner_id: props.shipmentFee?.[0]?.partner_id,
      });
      setCheckedCheckBoxShippingFee(
        props.shipmentFee?.[0]?.fee_with_type_ship?.[0].description
      );
      dispatch(
        cartActions.applyDiscount({
          total_shipping_fee:
            props.shipmentFee?.[0]?.fee_with_type_ship?.[0].fee,
          is_order_for_customer: props.is_order_for_customer,
        })
      );
    }
  }, [dispatch, props.shipmentFee]);

  // useEffect(() => {
  //     if(shipmentInfo)
  //     {
  //       dispatch(cartActions.applyDiscount(info, type));

  //     }
  // }, [shipmentInfo]);

  const [paymentMethod, setPaymentMethod] = useState({ name: "" });
  const [paymentPartner, setPaymentPartner] = useState({ name: "" });

  const [note, setNote] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address_detail, setAddressDetail] = useState("");
  const [isInvoiced, setIsInvoiced] = useState(false);
  const [invoiceCompany, setInvoiceCompany] = useState({
    nameCompany: "",
    taxCodeCompany: "",
    addressCompany: "",
    emailCompany: "",
  });

  const [currentProvince, setCurrentProvince] = useState(null);
  const [listAgen, setListAgen] = useState(null);

  const [currentDistrict, setCurrentDistrict] = useState(null);
  const [currentWard, setCurrentWard] = useState(null);
  const provinces = useSelector((state) => state.app.addressData.provinces);

  const districts = useSelector((state) => state.app.addressData.districts);
  const wards = useSelector((state) => state.app.addressData.wards);

  const [errorEmail, setErrorEmail] = useState("");
  const [errorPhoneNumer, setErrorPhoneNumer] = useState("");

  const onChangeProvince = (event) => {
    var id = event.value;

    setCurrentProvince(event);
    setCurrentWard(null);
    setCurrentDistrict(null);
    dispatch(a.getDistrictsList(id));
    setQueries((prevQueries) => ({ ...prevQueries, province: id }));
  };
  const onChangeAgence = (event) => {
    var id = event.value;

    setAgencyId(id);
    setListAgen(event);
  };
  const onChangeDistrict = (event) => {
    var id = event.value;
    setCurrentDistrict(event);
    setCurrentWard(null);
    dispatch(a.getWardsList(id));
    setQueries((prevQueries) => ({ ...prevQueries, district: id }));
  };
  useEffect(() => {
    var branch_id = currentBranch?.id;
    if (currentProvince && currentDistrict && currentWard) {
      const data = {
        province_id: currentProvince.value,
        district_id: currentDistrict.value,
        wards_id: currentWard.id,
        branch_id: branch_id,
      };
      dispatch(cartActions.postListShipperFee(null, data));
    }
  }, [currentBranch]);
  const onChangeWardSelect = (event) => {
    var id = event.value;
    var branch_id = currentBranch?.id;
    setQueries((prevQueries) => ({ ...prevQueries, wards: id }));
    if (
      currentProvince &&
      currentDistrict &&
      event?.label !== currentWard?.label
    ) {
      const data = {
        province_id: currentProvince.value,
        district_id: currentDistrict.value,
        wards_id: id,
        branch_id: branch_id,
      };
      dispatch(cartActions.postListShipperFee(null, data));
    }
    setCurrentWard(event);
  };
  function changeAddressSelect(dataAddress) {
    if (dataAddress) {
      const options = dataAddress.reduce((dataStore, currentAddress) => {
        return [
          ...dataStore,
          {
            value: currentAddress.id,
            label: currentAddress.name,
          },
        ];
      }, []);
      return options;
    }
  }

  function handleChangeAddressDetail(e) {
    setAddressDetail(e.target.value);
  }

  function handleChangeNote(e) {
    setNote(e.target.value);
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePhone(e) {
    setPhone(e.target.value);
  }
  function handleChangeInvoice(e) {
    const checked = e.target.checked;
    if (!checked)
      setInvoiceCompany({
        nameCompany: "",
        taxCodeCompany: "",
        addressCompany: "",
        emailCompany: "",
      });
    setNote("");
    setIsInvoiced(checked);
  }
  function handleChangeInvoiceInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    const textNote = `${
      name === "nameCompany" ? value : invoiceCompany.nameCompany
    }\n${name === "taxCodeCompany" ? value : invoiceCompany.taxCodeCompany}\n${
      name === "addressCompany" ? value : invoiceCompany.addressCompany
    }\n${name === "emailCompany" ? value : invoiceCompany.emailCompany}`;
    setInvoiceCompany((prevInvoiceCompany) => ({
      ...prevInvoiceCompany,
      [name]: value,
    }));
    setNote(textNote);
  }

  function handleShipmentFeeSelect(info, partner_id) {
    setShipmentInfo({ ...info, partner_id });
    setCheckedCheckBoxShippingFee(info.description);
    props.setCheckShipping(info.description);
    dispatch(
      cartActions.applyDiscount({
        total_shipping_fee: typeof info.fee === "object" ? 0 : info.fee,
        is_use_points: props.is_use_points,
        is_order_for_customer: props.is_order_for_customer,
        is_use_balance_agency: props.is_use_balance_agency,
      })
    );
  }
  function handlePaymentSelect(info, i) {
    setPaymentMethod(info);
    setCheckedCheckBoxPaymentMethod(i);
  }
  function handleOrder() {
    const orderInfo = {
      agency: agencyId,
      is_use_points: props.is_use_points,
      is_order_for_customer: props.is_order_for_customer,
      is_use_balance_collaborator: props.is_use_balance_collaborator,
      is_use_balance_agency: props.is_use_balance_agency,
      customer_note: note,
      code_voucher: props.code_voucher,
      payment_method_id: paymentMethod.payment_method_id,
      payment_partner_id: paymentMethod.id,
      customer_address_id: defaultAddress.id,
      total_shipping_fee: shipmentInfo.fee,
      shipper_type: shipmentInfo.ship_speed_code,
      partner_shipper_id: shipmentInfo.partner_id,
      order_from: ORDER_FROM_WEB,
      from_pos: false,
      collaborator_by_customer_id:
        localStorage.getItem("cowc_id") ?? profile.id,
      branch_id:
        badges.allow_branch_payment_order && currentBranch
          ? currentBranch.id
          : null,
    };
    // console.log("orderssssssssssssssssss", orderInfo);

    if (badges.allow_branch_payment_order && !currentBranch) {
      dispatch(
        appActions.changePopup(
          constants.AUTOHIDE_POPUP,
          "Vui lòng chọn chi nhánh giao hàng!"
        )
      );
      return;
    }

    if (
      orderInfo.payment_method_id === undefined ||
      (props.shipmentFee &&
        props.shipmentFee.length > 0 &&
        orderInfo.shipper_type === undefined)
    ) {
      dispatch(
        appActions.changePopup(
          constants.AUTOHIDE_POPUP,
          "Vui lòng cung cấp đầy đủ thông tin !"
        )
      );
      return;
    }

    props.handleOrder(orderInfo);
  }
  function submitInput() {
    setSubmited(true);
  }
  function handleOrderNonLogin() {
    // if (phone != "") {
    //   if (!validateNumber(phone)) {
    //     setErrorPhoneNumer("Số điện thoại không hợp lệ")
    //     return;
    //   }
    // }
    if (badges.allow_branch_payment_order && !currentBranch) {
      dispatch(
        appActions.changePopup(
          constants.AUTOHIDE_POPUP,
          "Vui lòng chọn chi nhánh giao hàng!"
        )
      );
      return;
    }
    if (
      !name ||
      !phone ||
      !address_detail ||
      !currentProvince?.value ||
      !currentDistrict?.value ||
      !currentWard?.value
    ) {
      dispatch(
        appActions.changePopup(
          constants.AUTOHIDE_POPUP,
          "Vui lòng cung cấp đầy đủ thông tin !"
        )
      );
      return;
    }

    const orderInfo = {
      agency: agencyId,
      customer_note: note,
      payment_method_id: paymentMethod.payment_method_id,
      payment_partner_id: paymentMethod.id,
      total_shipping_fee: shipmentInfo.fee,
      shipper_type: shipmentInfo.ship_type,
      partner_shipper_id: shipmentInfo.partner_id,
      province: currentProvince.value,
      district: currentDistrict.value,
      wards: currentWard.value,
      name: name,
      email: email,
      phone: phone,
      address_detail: address_detail,
      collaborator_by_customer_id:
        localStorage.getItem("cowc_id") ?? profile.id,
      order_from: ORDER_FROM_WEB,
      from_pos: false,
      branch_id:
        badges.allow_branch_payment_order && currentBranch
          ? currentBranch.id
          : null,
    };
    props.handleOrder(orderInfo);
  }

  const cartInfo = useSelector((state) => state.cart.cartInfo);
  const [checkedCheckBoxPaymentMethod, setCheckedCheckBoxPaymentMethod] =
    useState(0);
  const [checkedCheckBoxShippingFee, setCheckedCheckBoxShippingFee] =
    useState(0);

  console.log("props.shipmentInfo::: ", shipmentInfo);

  useEffect(() => {
    if (props.checkShipping !== null) {
      setCheckedCheckBoxShippingFee(props.checkShipping);
    }
  }, [props.checkShipping]);
  return !tokenInfo ? (
    <OrderStyles
      className={`order-info ${step === "2" ? "order-deliveryInfo" : ""}`}
    >
      <form
        onSubmit={handleSubmit(handleOrderNonLogin)}
        style={{ width: "100%" }}
      >
        <div className="order-right">
          {step === null || step === "1" || step === "2" ? (
            <div className="price-info">
              <div className="box-price-title-info">
                <h5>Thông tin thanh toán</h5>
              </div>
              {cartInfo.line_items.length > 0 && (
                <div className="cart-list-info">
                  {step !== null &&
                    step !== "1" &&
                    cartInfo.line_items.length > 0 && (
                      <>
                        {cartInfo.line_items.map((item) => (
                          <div className="cart-item-info">
                            <div className="cart-info-img">
                              {item?.product?.images && (
                                <img
                                  src={
                                    item?.product?.images[0]?.image_url
                                      ? item?.product?.images[0]?.image_url
                                      : "../img/default_product.jpg"
                                  }
                                  alt="product"
                                />
                              )}
                            </div>
                            <div className="cart-item-name">
                              {item?.product?.name}
                            </div>
                            <div className="cart-info-totalQuantity">
                              {item.is_bonus === true ? (
                                <div>
                                  <img
                                    src="./img/gift-48.png"
                                    alt="gift"
                                    style={{
                                      width: "25px",
                                    }}
                                  />
                                </div>
                              ) : (
                                <div>
                                  {formatPriceOrContact(item?.item_price)}
                                </div>
                              )}

                              <div>x {item?.quantity}</div>
                              {item?.item_price > 0 ? (
                                <div>
                                  {formatPrice(
                                    item?.item_price * item?.quantity
                                  )}
                                </div>
                              ) : (
                                <div></div>
                              )}
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                </div>
              )}
              <div className="box-price-info-cart">
                {step === null || step === "1" ? (
                  <div className="row priceInTotal">
                    <div>Tạm tính</div>
                    <span
                      style={{ color: appTheme.color_main_1, fontSize: "20px" }}
                    >
                      {formatPrice(total_before_discount)}
                    </span>
                  </div>
                ) : (
                  <div className="row priceInTotal">
                    <div>Tạm tính</div>
                    <span>{formatPrice(total_before_discount)}</span>
                  </div>
                )}

                {step && step != "1" ? (
                  <>
                    <div className="row priceInTotal">
                      <div>Giảm giá</div>
                      <span>{formatPrice(product_discount_amount)}</span>
                    </div>
                    <div className="row priceInTotal">
                      <div>Voucher</div>
                      <span>{formatPrice(voucher_discount_amount)}</span>
                    </div>
                    <div className="row priceInTotal">
                      <div>Combo</div>
                      <span>{formatPrice(combo_discount_amount)}</span>
                    </div>
                  </>
                ) : null}

                <div className="point-use">
                  {total_points_can_use > 0 && (
                    <div className="row">
                      <div className="row priceInTotal">
                        <label style={{ fontWeight: "500", color: "#212121" }}>
                          Dùng <span>{total_points_can_use}</span> xu [
                          <span>
                            {formatPrice(bonus_points_amount_can_use)}
                          </span>
                          ]
                        </label>
                      </div>
                      <label className="switch">
                        <input
                          type="checkbox"
                          onChange={() => props.handleChangeCheckBox("bonus")}
                          checked={props.is_use_points}
                        />
                        <span
                          style={{
                            background: props.is_use_points
                              ? appTheme.color_main_1
                              : "#ccc",
                          }}
                          className="slider round"
                        ></span>
                      </label>
                    </div>
                  )}
                  {badges.status_collaborator == 1 &&
                    balance_collaborator_can_use > 0 && (
                      <div className="row">
                        <div className="row priceInTotal">
                          <label
                            style={{ fontWeight: "500", color: "#212121" }}
                          >
                            Dùng số dư CTV [
                            <span>
                              {formatPrice(balance_collaborator_can_use)}
                            </span>
                            ]
                          </label>
                        </div>
                        <label className="switch">
                          <input
                            type="checkbox"
                            onChange={() =>
                              props.handleChangeCheckBox("collaborator")
                            }
                            checked={props.is_use_balance_collaborator}
                          />
                          <span
                            style={{
                              background: props.is_use_balance_collaborator
                                ? appTheme.color_main_1
                                : "#ccc",
                            }}
                            className="slider round"
                          ></span>
                        </label>
                      </div>
                    )}
                  {/* {badges.status_agency == 1 && balance_agency_can_use > 0 && (
                    <div className="row">
                      <div className="row priceInTotal">
                        <label style={{ fontWeight: "500", color: "#212121" }}>
                          Dùng số dư đại lý [
                          <span>{formatPrice(balance_agency_can_use)}</span>]
                        </label>
                      </div>
                      <label className="switch">
                        <input
                          type="checkbox"
                          onChange={() => props.handleChangeCheckBox("agency")}
                          checked={props.is_use_balance_agency}
                        />
                        <span
                          style={{
                            background: props.is_use_balance_agency
                              ? appTheme.color_main_1
                              : "#ccc",
                          }}
                          className="slider round"
                        ></span>
                      </label>
                    </div>
                  )} */}
                </div>
                {props.shipmentFee && (
                  <>
                    {step !== null && step !== "1" && (
                      <>
                        {/* <div className="row priceInTotal">
                          <div>Giảm phí vận chuyển</div>
                          <span>{formatPrice(ship_discount_amount)}</span>
                        </div> */}
                        <div className="row priceInTotal">
                          <div>
                            Phí vận chuyển
                            {ship_discount_amount > 0 ? (
                              <span>
                                (-{formatPrice(ship_discount_amount)})
                              </span>
                            ) : null}
                          </div>
                          <span>
                            {total_shipping_fee > 0
                              ? `+ ${formatPrice(total_shipping_fee)}`
                              : "0"}
                          </span>
                        </div>
                      </>
                    )}
                  </>
                )}
                {step && step != "1" ? (
                  <>
                    {vat > 0 ? (
                      <div className="row priceInTotal">
                        <div>VAT</div>
                        <span>{vat > 0 ? `+ ${formatPrice(vat)}` : "0"}</span>
                      </div>
                    ) : null}
                  </>
                ) : null}

                {step && step != "1" ? (
                  <div className="total row priceInTotal">
                    <div>Tổng cộng</div>
                    <span style={{ color: appTheme.color_main_1 }}>
                      {/* {step !== "2"
                      ? formatPrice(total_after_discount)
                      : formatPrice(total_final)} */}
                      {formatPrice(total_final)}
                    </span>
                  </div>
                ) : null}
              </div>
              <div
                className="div-order-btn"
                style={{
                  visibility: "hidden",
                  height: "0",
                }}
              >
                <button
                  id="order-btn"
                  className="order-btn-notLogin"
                  style={{ background: appTheme.color_main_1 }}
                  onClick={submitInput}
                >
                  Đặt hàng
                </button>
              </div>
            </div>
          ) : null}
        </div>
        {step === "2" && (
          <div className="order-left">
            {badges.allow_branch_payment_order ? (
              <div
                className="personal-info"
                style={{ backgrounColor: "green" }}
              >
                {currentBranch ? (
                  <>
                    <div className="address-cart">
                      <h5>Chi nhánh</h5>
                      <span
                        onClick={() => props.handleShowPopup("branch")}
                        className="show-modal-btn"
                      >
                        Thay đổi
                      </span>
                    </div>
                    <div
                      className="info-address-cart"
                      style={{
                        padding: "1.25rem 1.5625rem",
                      }}
                    >
                      <div className="row">
                        <label
                          className="name"
                          style={{ textTransform: "capitalize" }}
                        >
                          {currentBranch.name}
                        </label>
                      </div>
                      <label className="address">
                        {currentBranch.address_detail ||
                        currentBranch.wards_name ||
                        currentBranch.district_name ||
                        currentBranch.province_name
                          ? `${currentBranch.address_detail ?? ""}${
                              currentBranch.wards_name
                                ? `, ${currentBranch.wards_name}`
                                : ""
                            }${
                              currentBranch.district_name
                                ? `, ${currentBranch.district_name}`
                                : ""
                            }${
                              currentBranch.province_name
                                ? `, ${currentBranch.province_name}`
                                : ""
                            }`
                          : null}
                      </label>
                    </div>
                  </>
                ) : (
                  <div>
                    <div className="address-cart">
                      <h5>Chi nhánh giao hàng</h5>
                      <span
                        className="show-modal-btn"
                        onClick={() => props.handleShowPopup("branch")}
                      >
                        Chọn chi nhánh
                      </span>
                    </div>
                    <div
                      className="info-address-cart"
                      style={{
                        padding: "1.25rem 1.5625rem",
                      }}
                    >
                      <label
                        className="address"
                        onClick={() => props.handleShowPopup("branch")}
                      >
                        Chưa chọn chi nhánh giao hàng
                      </label>
                    </div>
                  </div>
                )}
              </div>
            ) : null}
            <div className="voucher-input info-input">
              <div className="address-cart">
                <h5>Giao tới</h5>
              </div>
              <div className="content-address-cart">
                <div className="content-address-cart-info">
                  <div>
                    <div>
                      Họ tên{" "}
                      <span style={{ color: appTheme.color_main_1 }}>*</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Họ và tên (bắt buộc)"
                      value={name}
                      {...register("name", {
                        onChange: handleChangeName,
                        required: true,
                      })}
                    />
                  </div>
                  {errors.name && (
                    <p style={{ fontSize: 13, color: "red" }}>
                      Xin mời bạn nhập họ tên
                    </p>
                  )}
                </div>
                <div className="content-address-cart-info">
                  <div>
                    <div>
                      Điện thoại{" "}
                      <span style={{ color: appTheme.color_main_1 }}>*</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Số điện thoại (bắt buộc)"
                      value={phone}
                      {...register("phone", {
                        onChange: handleChangePhone,
                        required: true,
                        pattern: /((09|03|07|08|05)+([0-9]{8})\b)/,
                        minLength: 10,
                      })}
                    />
                  </div>
                  {Object.keys(errors).length !== 0 && (
                    <span>
                      {errors.phone?.type === "required" && (
                        <p style={{ fontSize: 13, color: "red" }}>
                          Bạn chưa nhập số điện thoại
                        </p>
                      )}
                      {errors.phone?.type === "pattern" && (
                        <p style={{ fontSize: 13, color: "red" }}>
                          Số điện thoại không hợp lệ
                        </p>
                      )}
                      {errors.phone?.type === "minLength" && (
                        <p style={{ fontSize: 13, color: "red" }}>
                          Số điện thoại không hợp lệ
                        </p>
                      )}
                    </span>
                  )}
                  {errorPhoneNumer != "" && (
                    <span class="error_input" id="errorname">
                      {errorPhoneNumer}
                    </span>
                  )}
                </div>

                <div className="content-address-cart-info">
                  <div>
                    <div>
                      Email{" "}
                      {/* <span style={{ color: appTheme.color_main_1 }}>*</span> */}
                    </div>
                    <input
                      type="text"
                      placeholder="Email"
                      value={email}
                      {...register("email", {
                        onChange: handleChangeEmail,
                        pattern:
                          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      })}
                    />
                  </div>
                  {Object.keys(errors).length !== 0 && (
                    <span>
                      {errors.email?.type === "pattern" && (
                        <p style={{ fontSize: 13, color: "red" }}>
                          Email không hợp lệ
                        </p>
                      )}
                    </span>
                  )}
                  {errorEmail != "" && (
                    <span class="error_input" id="errorname">
                      {errorEmail}
                    </span>
                  )}
                </div>

                <div className="content-address-cart-info">
                  <div>
                    <div>
                      Tỉnh/Thành phố{" "}
                      <span style={{ color: appTheme.color_main_1 }}>*</span>
                    </div>
                    <Select
                      options={changeAddressSelect(provinces)}
                      placeholder="Tỉnh/Thành phố..."
                      className="select-address"
                      onChange={onChangeProvince}
                      value={currentProvince}
                      noOptionsMessage={() => "Không tìm thấy kết quả"}
                    ></Select>
                  </div>
                  {submited && currentProvince == null && (
                    <p style={{ fontSize: 13, color: "red" }}>
                      Bạn chưa chọn Tỉnh/Thành phố
                    </p>
                  )}
                </div>
                <div
                  className="content-address-cart-info"
                  style={{ marginTop: "20px" }}
                >
                  <div>
                    <div>
                      Quận/Huyện{" "}
                      <span style={{ color: appTheme.color_main_1 }}>*</span>
                    </div>
                    <Select
                      options={changeAddressSelect(districts)}
                      placeholder="Quận/Huyện..."
                      className="select-address"
                      onChange={onChangeDistrict}
                      value={currentDistrict}
                      noOptionsMessage={() => "Không tìm thấy kết quả"}
                    ></Select>
                  </div>
                  {submited && currentDistrict == null && (
                    <p style={{ fontSize: 13, color: "red" }}>
                      Bạn chưa chọn Quận/huyện
                    </p>
                  )}
                </div>
                <div
                  className="content-address-cart-info"
                  style={{ marginTop: "20px" }}
                >
                  <div>
                    <div>
                      Xã/Phường{" "}
                      <span style={{ color: appTheme.color_main_1 }}>*</span>
                    </div>
                    <Select
                      options={changeAddressSelect(wards)}
                      placeholder="Xã/Phường..."
                      className="select-address"
                      onChange={onChangeWardSelect}
                      value={currentWard}
                      noOptionsMessage={() => "Không tìm thấy kết quả"}
                    ></Select>
                  </div>
                  {submited && currentWard == null && (
                    <p style={{ fontSize: 13, color: "red" }}>
                      Bạn chưa chọn Xã/Phường
                    </p>
                  )}
                </div>
                {localStorage.getItem("cowc_id") === null ? (
                  <div className="content-address-cart-info">
                    <div>
                      <div>Chọn đại lý </div>
                      {listAgency.status === "FAILURE" ? (
                        <Select
                          // options={changeAddressSelect(provinces)}
                          placeholder="Đại lý..."
                          className="select-address"
                          onChange={onChangeAgence}
                          value={listAgen}
                          noOptionsMessage={() => "Không tìm thấy kết quả"}
                        ></Select>
                      ) : (
                        <Select
                          options={changeAddressSelect(listAgency?.data)}
                          placeholder="Đại lý..."
                          className="select-address"
                          onChange={onChangeAgence}
                          value={listAgen}
                          noOptionsMessage={() => "Không tìm thấy kết quả"}
                        ></Select>
                      )}
                    </div>
                  </div>
                ) : null}

                <div className="content-address-cart-info">
                  <div>
                    <div>
                      Tên nhà/Đường{" "}
                      <span style={{ color: appTheme.color_main_1 }}>*</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Địa chỉ chi tiết"
                      value={address_detail}
                      onChange={handleChangeAddressDetail}
                    />
                  </div>
                </div>

                <div className="content-address-cart-info">
                  <div>
                    <div>
                      Ghi chú{" "}
                      {/* <span style={{ color: appTheme.color_main_1 }}>*</span> */}
                    </div>
                    <input
                      type="text"
                      placeholder="Nhập ghi chú"
                      value={note}
                      onChange={handleChangeNote}
                    />
                  </div>
                </div>
              </div>
            </div>
            {Object.keys(errors).length !== 0 && <ul></ul>}
            {props.paymentMethod && (
              <div className="payment-method">
                <div className="box-payment-cart">
                  <h5>Phương thức thanh toán</h5>
                </div>
                <div className="content-payment-cart">
                  {props.paymentMethod.map((v, i) => (
                    <div className="row" key={i}>
                      <input
                        type="checkbox"
                        name="delivery"
                        id={v.name}
                        checked={paymentMethod.name === v.name}
                        onChange={() => handlePaymentSelect(v, i)}
                        style={{ display: "none" }}
                      />
                      <span
                        className="custom-checkbox"
                        onClick={() => handlePaymentSelect(v, i)}
                        style={{
                          cursor: "pointer",
                          backgroundColor:
                            checkedCheckBoxPaymentMethod === i
                              ? appTheme.color_main_1
                              : "white",
                          boxShadow: `${
                            checkedCheckBoxPaymentMethod === i
                              ? `0 0 0 2px white, 0 0 0 3px ${appTheme.color_main_1}`
                              : "0 0 0 2px white, 0 0 0 3px #dadada"
                          }`,
                        }}
                      ></span>
                      <label htmlFor={v.name}>{v.name}</label>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {props.shipmentFee && (
              <div className="delivery-method">
                <div
                  className="box-delivery-cart"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    columnGap: "20px",
                  }}
                >
                  <h5>Phí vận chuyển (Tạm tính)</h5>{" "}
                  {loadingShippingFee ? (
                    <div>
                      <PulseLoader
                        style={{
                          color: "#828282",
                        }}
                      ></PulseLoader>
                    </div>
                  ) : null}
                </div>
                {props.shipmentFee.map((v, i) => (
                  <div key={i} className="delivery-cart">
                    <div className="row content-delivery-cart-parent">
                      {v.name}
                    </div>
                    <div className="content-delivery-cart-child">
                      {v.fee_with_type_ship?.length > 0 &&
                        v.fee_with_type_ship?.map((service) => (
                          <div className="content-delivery-cart">
                            <div className="content-delivery-cart-description">
                              <input
                                type="checkbox"
                                name="delivery"
                                id={service.description}
                                checked={
                                  shipmentInfo.ship_speed_code ===
                                  service.ship_speed_code
                                }
                                onChange={() =>
                                  handleShipmentFeeSelect(service, v.partner_id)
                                }
                                style={{ display: "none" }}
                              />
                              <span
                                className="custom-checkbox"
                                onClick={() =>
                                  handleShipmentFeeSelect(service, v.partner_id)
                                }
                                style={{
                                  cursor: "pointer",
                                  marginRight: "5px",
                                  backgroundColor:
                                    checkedCheckBoxShippingFee ===
                                    service.description
                                      ? appTheme.color_main_1
                                      : "white",
                                  boxShadow: `${
                                    checkedCheckBoxShippingFee ===
                                    service.description
                                      ? `0 0 0 2px white, 0 0 0 3px ${appTheme.color_main_1}`
                                      : "0 0 0 2px white, 0 0 0 3px #dadada"
                                  }`,
                                }}
                              ></span>
                              <label
                                htmlFor={service.description}
                                style={{ cursor: "pointer" }}
                              >
                                {service.description}
                              </label>
                            </div>
                            <span>
                              {service.fee ? formatPrice(service.fee) : "0đ"}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </form>
    </OrderStyles>
  ) : (
    <OrderStyles
      className={`order-info ${
        step === "2" || step === "3" ? "order-deliveryInfo" : ""
      }`}
    >
      <div className="order-right">
        {step === "2" || step === "3" ? (
          <div>
            {account?.agency_type?.name == null ? (
              <div className="voucher-input" style={{ position: "relative" }}>
                <div className="box-voucher-cart">
                  <h5>Mã giảm giá</h5>
                  <button
                    className="show-modal-btn"
                    onClick={() => props.handleShowPopup("voucher")}
                    style={{ cursor: "pointer" }}
                  >
                    Danh sách voucher
                  </button>
                </div>
                <div className="row voucher-wrapper">
                  <input
                    disabled={used_voucher !== null}
                    type="text"
                    placeholder="Nhập voucher"
                    value={props.code_voucher}
                    onChange={props.handleVoucherInput}
                  />
                  {used_voucher ? (
                    <button
                      style={{
                        background: appTheme.color_main_1,
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        localStorage.removeItem("code_voucher");
                        props.applyDiscount("code_voucher", "");
                      }}
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
                          () => {},
                          false,
                          true
                        )
                      }
                    >
                      Áp dụng
                    </button>
                  )}
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
        {step === null || step === "1" || step === "2" || step === "3" ? (
          <div className="price-info">
            <div className="box-price-title-info">
              <h5>Thông tin thanh toán</h5>
            </div>
            {step !== null &&
              step !== "1" &&
              cartInfo.line_items.length > 0 && (
                <div className="cart-list-info">
                  {cartInfo.line_items.map((item) => (
                    <div className="cart-item-info">
                      <div className="cart-info-img">
                        {item?.product?.images && (
                          <img
                            src={
                              item?.product?.images[0]?.image_url
                                ? item?.product?.images[0]?.image_url
                                : "../img/default_product.jpg"
                            }
                            alt="product"
                          />
                        )}
                      </div>
                      <div className="cart-item-name">
                        {item?.product?.name}
                      </div>
                      <div className="cart-info-totalQuantity">
                        {item.is_bonus === true ? (
                          <div>
                            <img
                              src="./img/gift-48.png"
                              alt="gift"
                              style={{
                                width: "25px",
                              }}
                            />
                          </div>
                        ) : // <div>
                        //   {formatPriceOrContact(item?.item_price)}
                        // </div>
                        null}

                        <div>x {item?.quantity}</div>
                        {item?.item_price > 0 ? (
                          <div>
                            {/* {formatPrice(item?.item_price * item?.quantity)} */}
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

            {account?.agency_type?.name == null ? (
              <div className="box-price-info-cart">
                {step && step != "1" ? (
                  <div className="row priceInTotal">
                    <div>Tạm tính</div>
                    <span>{formatPrice(total_before_discount)}</span>
                  </div>
                ) : (
                  <div className="row priceInTotal">
                    <div>Tạm tính</div>
                    <span
                      style={{ color: appTheme.color_main_1, fontSize: "20px" }}
                    >
                      {formatPrice(total_before_discount)}
                    </span>
                  </div>
                )}

                {step && step != "1" ? (
                  <>
                    <div className="row priceInTotal">
                      <div>Giảm giá</div>
                      <span>{formatPrice(product_discount_amount)}</span>
                    </div>
                    <div className="row priceInTotal">
                      <div>Voucher</div>
                      <span>{formatPrice(voucher_discount_amount)}</span>
                    </div>
                    <div className="row priceInTotal">
                      <div>Combo</div>
                      <span>{formatPrice(combo_discount_amount)}</span>
                    </div>

                    <div className="point-use">
                      {total_points_can_use > 0 && (
                        <div className="row">
                          <div className="row priceInTotal">
                            <label
                              style={{ fontWeight: "500", color: "#212121" }}
                            >
                              Dùng <span>{total_points_can_use}</span> xu [
                              <span>
                                {formatPrice(bonus_points_amount_can_use)}
                              </span>
                              ]
                            </label>
                          </div>
                          <label className="switch">
                            <input
                              type="checkbox"
                              onChange={() =>
                                props.handleChangeCheckBox("bonus")
                              }
                              checked={props.is_use_points}
                            />
                            <span
                              style={{
                                background: props.is_use_points
                                  ? appTheme.color_main_1
                                  : "#ccc",
                              }}
                              className="slider round"
                            ></span>
                          </label>
                        </div>
                      )}
                      {badges.status_collaborator == 1 &&
                        balance_collaborator_can_use > 0 && (
                          <div className="row">
                            <div className="row priceInTotal">
                              <label
                                style={{ fontWeight: "500", color: "#212121" }}
                              >
                                Dùng số dư CTV [
                                <span>
                                  {formatPrice(balance_collaborator_can_use)}
                                </span>
                                ]
                              </label>
                            </div>
                            <label className="switch">
                              <input
                                type="checkbox"
                                onChange={() =>
                                  props.handleChangeCheckBox("collaborator")
                                }
                                checked={props.is_use_balance_collaborator}
                              />
                              <span
                                style={{
                                  background: props.is_use_balance_collaborator
                                    ? appTheme.color_main_1
                                    : "#ccc",
                                }}
                                className="slider round"
                              ></span>
                            </label>
                          </div>
                        )}
                      {/* {badges.status_agency == 1 &&
                          balance_agency_can_use > 0 && (
                            <div className="row">
                              <div className="row priceInTotal">
                                <label
                                  style={{ fontWeight: "500", color: "#212121" }}
                                >
                                  Dùng số dư đại lý [
                                  <span>{formatPrice(balance_agency_can_use)}</span>
                                  ]
                                </label>
                              </div>
                              <label className="switch">
                                <input
                                  type="checkbox"
                                  onChange={() =>
                                    props.handleChangeCheckBox("agency")
                                  }
                                  checked={props.is_use_balance_agency}
                                />
                                <span
                                  style={{
                                    background: props.is_use_balance_agency
                                      ? appTheme.color_main_1
                                      : "#ccc",
                                  }}
                                  className="slider round"
                                ></span>
                              </label>
                            </div>
                          )} */}
                      {/* {badges.status_agency == 1 ? (
                          <div className="row">
                            <div className="row priceInTotal">
                              <label
                                style={{ fontWeight: "500", color: "#212121" }}
                              >
                                Đặt hộ
                              </label>
                            </div>
                            <label className="switch">
                              <input
                                type="checkbox"
                                onChange={() =>
                                  props.handleChangeCheckBox("order_for_customer")
                                }
                                checked={props.is_order_for_customer}
                              />
                              <span
                                style={{
                                  background: props.is_order_for_customer
                                    ? appTheme.color_main_1
                                    : "#ccc",
                                }}
                                className="slider round"
                              ></span>
                            </label>
                          </div>
                        ) : null} */}
                    </div>
                  </>
                ) : null}

                {props.shipmentFee && (
                  <>
                    {total_shipping_fee > 0 &&
                      step !== null &&
                      step !== "1" && (
                        <div className="row priceInTotal">
                          <div>
                            Phí vận chuyển
                            {ship_discount_amount > 0 ? (
                              <span>
                                (-{formatPrice(ship_discount_amount)})
                              </span>
                            ) : null}
                          </div>
                          <span>+ {formatPrice(total_shipping_fee)}</span>
                        </div>
                      )}
                  </>
                )}
                {step !== null && step !== "1" && (
                  <>
                    {/* <div className="row priceInTotal">
                        <div>Giảm phí vận chuyển</div>
                        <span>{formatPrice(ship_discount_amount)}</span>
                      </div> */}
                    {vat > 0 ? (
                      <div className="row priceInTotal">
                        <div>VAT</div>
                        <span>{vat > 0 ? `+ ${formatPrice(vat)}` : "0"}</span>
                      </div>
                    ) : null}
                  </>
                )}
                {step !== null && step !== "1" ? (
                  <>
                    <div className="total row priceInTotal">
                      <div>Tổng cộng</div>
                      <span style={{ color: appTheme.color_main_1 }}>
                        {/* {step !== "2"
                        ? formatPrice(total_after_discount)
                        : formatPrice(total_final)} */}
                        {step === null || step === "1"
                          ? formatPrice(total_after_discount)
                          : formatPrice(total_final)}
                      </span>
                    </div>
                    {props.is_order_for_customer ? (
                      <div className="row priceInTotal">
                        <div>Tiền hoa hồng đặt hộ</div>
                        <span>
                          {formatPrice(total_commission_order_for_customer)}
                        </span>
                      </div>
                    ) : null}
                  </>
                ) : null}
              </div>
            ) : null}

            <div
              className="div-order-btn"
              style={{
                visibility: "hidden",
                height: "0",
              }}
            >
              <button
                id="order-btn"
                className="order-btn-login"
                style={{ background: appTheme.color_main_1 }}
                onClick={handleOrder}
              >
                Đặt hàng
              </button>
            </div>
          </div>
        ) : null}
        {step === "2" || step === "3" ? (
          <div className="box-gifts">
            {bonus_agency && (
              <div className="authorized-dealer">
                <div className="box-often row">
                  <h5>Thưởng cho đại lý</h5>
                  <button
                    className="show-modal-btn"
                    onClick={() => {
                      props.handleShowPopup("bonus_agency");
                    }}
                  >
                    Chi tiết
                  </button>
                </div>
              </div>
            )}
            {bonus_agency?.step_bonus.map((v) => (
              <div
                className="address-card bonus-agency"
                id={v.id}
                style={{
                  display: "flex",
                }}
              >
                {v.active && (
                  <label style={{ color: "green" }}>
                    <div className="row box-gift">
                      <div className="box-gift-img">
                        <img
                          src={
                            v.reward_image_url
                              ? v.reward_image_url
                              : "./img/gift.svg"
                          }
                          alt=""
                          width={90}
                          height={90}
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                      <div className="box-gift-title">
                        <div>
                          <div className="box-gift-title-content">
                            <b>Đạt thưởng</b>
                            <div className="box-gift-color">
                              Đơn hàng trị giá : {"  "}
                              <span style={{ color: "red" }}>
                                {formatPrice(v.threshold)}
                              </span>
                            </div>
                            <div className="box-gift-color">
                              Thưởng : {"  "}
                              {v.reward_name}
                            </div>
                            <div className="box-gift-color">
                              Trị giá : {"  "}
                              <span style={{ color: "red" }}>
                                {formatPrice(v.reward_value)}
                              </span>
                            </div>
                          </div>
                          <div className="box-gift-title-image">
                            <img
                              style={{ marginLeft: "65px" }}
                              src="/img/gift-48.png"
                              width="25"
                              alt="bonus_agency"
                            ></img>
                          </div>
                        </div>
                      </div>
                    </div>
                  </label>
                )}
              </div>
            ))}
          </div>
        ) : null}
      </div>
      {step === "2" || step === "3" ? (
        <div className="order-left">
          {badges.allow_branch_payment_order ? (
            <div className="personal-info" style={{ backgrounColor: "green" }}>
              {currentBranch ? (
                <>
                  <div className="address-cart">
                    <h5>Chi nhánh giao hàng</h5>
                    <span
                      onClick={() => props.handleShowPopup("branch")}
                      className="show-modal-btn"
                    >
                      Thay đổi
                    </span>
                  </div>
                  <div
                    className="info-address-cart"
                    style={{
                      padding: "1.25rem 1.5625rem",
                    }}
                  >
                    <div className="row">
                      <label
                        className="name"
                        style={{ textTransform: "capitalize" }}
                      >
                        {currentBranch.name}
                      </label>
                    </div>
                    <label className="address">
                      {currentBranch.address_detail ||
                      currentBranch.wards_name ||
                      currentBranch.district_name ||
                      currentBranch.province_name
                        ? `${currentBranch.address_detail ?? ""}${
                            currentBranch.wards_name
                              ? `, ${currentBranch.wards_name}`
                              : ""
                          }${
                            currentBranch.district_name
                              ? `, ${currentBranch.district_name}`
                              : ""
                          }${
                            currentBranch.province_name
                              ? `, ${currentBranch.province_name}`
                              : ""
                          }`
                        : null}
                    </label>
                  </div>
                </>
              ) : (
                <div>
                  <div className="address-cart">
                    <h5>Chi nhánh giao hàng</h5>
                    <span
                      className="show-modal-btn"
                      onClick={() => props.handleShowPopup("branch")}
                    >
                      Chọn chi nhánh
                    </span>
                  </div>
                  <div
                    className="info-address-cart"
                    style={{
                      padding: "1.25rem 1.5625rem",
                    }}
                  >
                    <label className="address">
                      Chưa chọn chi nhánh giao hàng
                    </label>
                  </div>
                </div>
              )}
            </div>
          ) : null}

          <div className="personal-info" style={{ backgrounColor: "green" }}>
            {defaultAddressArr.length > 0 ? (
              <>
                <div className="address-cart">
                  <h5>Giao tới</h5>
                  <span
                    onClick={() => props.handleShowPopup("address")}
                    className="show-modal-btn"
                  >
                    Thay đổi
                  </span>
                </div>
                <div
                  className="info-address-cart"
                  style={{
                    padding: "1.25rem 1.5625rem",
                  }}
                >
                  <div className="row">
                    <label
                      className="name"
                      style={{ textTransform: "capitalize" }}
                    >
                      {defaultAddress.name}
                    </label>
                    <label className="phone" style={{ marginLeft: "2em" }}>
                      {defaultAddress.phone}
                    </label>
                  </div>
                  <label className="address">
                    {Object.keys(defaultAddress)?.length > 0 &&
                      `${defaultAddress.address_detail}, ${defaultAddress.wards_name}, ${defaultAddress.district_name}, ${defaultAddress.province_name}`}
                  </label>
                </div>
              </>
            ) : (
              <div>
                <div className="address-cart">
                  <h5>Giao tới</h5>
                  <button
                    className="show-modal-btn"
                    onClick={() => props.handleShowPopup("address")}
                  >
                    Thêm địa chỉ
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* chọn đại lý */}
          {profile.is_collaborator ||
          profile.is_agency ||
          profile.is_agent_have_general_agency ||
          profile.is_general_agency ||
          profile.referral_phone_number != null ? null : localStorage.getItem(
              "cowc_id"
            ) === null ? (
            <div className="voucher-input info-input">
              <div className="address-cart">
                <h5>Chọn đại lý</h5>
              </div>
              <div className="content-address-cart">
                <div className="content-address-cart-info">
                  <div>
                    {listAgency.status === "FAILURE" ? (
                      <Select
                        // options={changeAddressSelect(provinces)}
                        placeholder="Đại lý..."
                        className="select-address"
                        onChange={onChangeAgence}
                        value={listAgen}
                        noOptionsMessage={() => "Không tìm thấy kết quả"}
                      ></Select>
                    ) : (
                      <Select
                        options={changeAddressSelect(listAgency?.data)}
                        placeholder="Đại lý..."
                        className="select-address"
                        onChange={onChangeAgence}
                        value={listAgen}
                        noOptionsMessage={() => "Không tìm thấy kết quả"}
                      ></Select>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          <div className="voucher-input note-input">
            <div
              className="box-note-cart"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <h5>Ghi chú</h5>
              {badges.status_agency === 0 ? (
                <div className="invoice_company">
                  <input
                    type="checkbox"
                    value={isInvoiced}
                    checked={isInvoiced}
                    style={{
                      cursor: "pointer",
                      accentColor: isInvoiced ? appTheme.color_main_1 : "white",
                    }}
                    onChange={handleChangeInvoice}
                  />
                  <label htmlFor="">Xuất hóa đơn công ty</label>
                </div>
              ) : null}
            </div>
            <div className="row note-input-cart">
              {!isInvoiced ? (
                <input
                  type="text"
                  placeholder="Nhập ghi chú"
                  value={note}
                  onChange={handleChangeNote}
                  readOnly={isInvoiced}
                />
              ) : (
                <textarea
                  type="text"
                  rows={4}
                  placeholder="Tên công ty, mã số thuế, địa chỉ, email nhận hóa đơn"
                  value={note}
                  onChange={handleChangeNote}
                  disabled={isInvoiced}
                />
              )}
            </div>
            {isInvoiced ? (
              <div className="invoice_company_content">
                <div className="invoice_company_item">
                  <label htmlFor="nameCompany">Tên công ty</label>
                  <input
                    type="text"
                    id="nameCompany"
                    name="nameCompany"
                    placeholder="Tên công ty"
                    value={invoiceCompany.nameCompany}
                    onChange={handleChangeInvoiceInput}
                  />
                </div>
                <div className="invoice_company_item">
                  <label htmlFor="taxCodeCompany">Mã số thuế</label>
                  <input
                    type="text"
                    id="taxCodeCompany"
                    name="taxCodeCompany"
                    placeholder="Mã số thuế"
                    value={invoiceCompany.taxCodeCompany}
                    onChange={handleChangeInvoiceInput}
                  />
                </div>
                <div className="invoice_company_item">
                  <label htmlFor="addressCompany">Địa chỉ công ty</label>
                  <input
                    type="text"
                    id="addressCompany"
                    name="addressCompany"
                    placeholder="Địa chỉ công ty"
                    value={invoiceCompany.addressCompany}
                    onChange={handleChangeInvoiceInput}
                  />
                </div>
                <div className="invoice_company_item">
                  <label htmlFor="emailCompany">Email nhận hóa đơn</label>
                  <input
                    type="text"
                    id="emailCompany"
                    name="emailCompany"
                    placeholder="Email nhận hóa đơn"
                    value={invoiceCompany.emailCompany}
                    onChange={handleChangeInvoiceInput}
                  />
                </div>
              </div>
            ) : null}
          </div>

          {badges.status_agency === 0 ? (
            <div className="payment-method">
              <div className="box-payment-cart">
                <h5>Phương thức thanh toán</h5>
              </div>
              <div className="content-payment-cart">
                {props.paymentMethod.map((v, i) => (
                  <div className="row" key={i}>
                    <input
                      type="checkbox"
                      name="delivery"
                      id={v.name}
                      checked={paymentMethod.name === v.name}
                      onChange={() => handlePaymentSelect(v, i)}
                      style={{ display: "none" }}
                    />
                    <span
                      className="custom-checkbox"
                      onClick={() => handlePaymentSelect(v, i)}
                      style={{
                        cursor: "pointer",
                        backgroundColor:
                          checkedCheckBoxPaymentMethod === i
                            ? appTheme.color_main_1
                            : "white",
                        boxShadow: `${
                          checkedCheckBoxPaymentMethod === i
                            ? `0 0 0 2px white, 0 0 0 3px ${appTheme.color_main_1}`
                            : "0 0 0 2px white, 0 0 0 3px #dadada"
                        }`,
                      }}
                    ></span>
                    <label htmlFor={v.name}>{v.name}</label>
                  </div>
                ))}
              </div>

              {paymentMethod != null &&
                (paymentMethod.id === 2 || paymentMethod.id === 3) && (
                  <div
                    style={{
                      paddingLeft: 20,
                      paddingRight: 20,
                      paddingBottom: 20,
                    }}
                  >
                    <h4 style={{ paddingTop: 10, paddingBottom: 10 }}>
                      Điều khoản và Điều kiện
                    </h4>

                    <div
                      style={{
                        maxHeight: "100px",
                        overflow: "auto",
                        borderRadius: "10px",
                        border: "1px solid #dadada",
                        padding: "10px",
                      }}
                    >
                      {paymentMethod.id === 2 && <VnPay />}
                      {paymentMethod.id === 3 && <OnePay />}
                    </div>
                    <p
                      style={{
                        paddingTop: 10,
                        paddingBottom: 10,
                        textAlign: "center",
                      }}
                    >
                      Bằng việc nhấn đặt hàng bạn xác nhận đã đọc và đồng ý với
                      các điều khoản thanh toán trên
                    </p>
                  </div>
                )}
            </div>
          ) : null}

          {/* {props.paymentMethod && (
         
            <div className="payment-method">
              <div className="box-payment-cart">
                <h5>Phương thức thanh toán</h5>
              </div>
              <div className="content-payment-cart">
                {props.paymentMethod.map((v, i) => (
                  <div className="row" key={i}>
                    <input
                      type="checkbox"
                      name="delivery"
                      id={v.name}
                      checked={paymentMethod.name === v.name}
                      onChange={() => handlePaymentSelect(v, i)}
                      style={{ display: "none" }}
                    />
                    <span
                      className="custom-checkbox"
                      onClick={() => handlePaymentSelect(v, i)}
                      style={{
                        cursor: "pointer",
                        backgroundColor:
                          checkedCheckBoxPaymentMethod === i
                            ? appTheme.color_main_1
                            : "white",
                        boxShadow: `${
                          checkedCheckBoxPaymentMethod === i
                            ? `0 0 0 2px white, 0 0 0 3px ${appTheme.color_main_1}`
                            : "0 0 0 2px white, 0 0 0 3px #dadada"
                        }`,
                      }}
                    ></span>
                    <label htmlFor={v.name}>{v.name}</label>
                  </div>
                ))}
              </div>

              {paymentMethod != null &&
                (paymentMethod.id === 2 || paymentMethod.id === 3) && (
                  <div
                    style={{
                      paddingLeft: 20,
                      paddingRight: 20,
                      paddingBottom: 20,
                    }}
                  >
                    <h4 style={{ paddingTop: 10, paddingBottom: 10 }}>
                      Điều khoản và Điều kiện
                    </h4>

                    <div
                      style={{
                        maxHeight: "100px",
                        overflow: "auto",
                        borderRadius: "10px",
                        border: "1px solid #dadada",
                        padding: "10px",
                      }}
                    >
                      {paymentMethod.id === 2 && <VnPay />}
                      {paymentMethod.id === 3 && <OnePay />}
                    </div>
                    <p
                      style={{
                        paddingTop: 10,
                        paddingBottom: 10,
                        textAlign: "center",
                      }}
                    >
                      Bằng việc nhấn đặt hàng bạn xác nhận đã đọc và đồng ý với
                      các điều khoản thanh toán trên
                    </p>
                  </div>
                )}
            </div>
          )} */}

          {props.shipmentFee && (
            <div className="delivery-method">
              <div
                className="box-delivery-cart"
                style={{
                  display: "flex",
                  alignItems: "center",
                  columnGap: "20px",
                }}
              >
                <h5>Phí vận chuyển (Tạm tính)</h5>{" "}
                {loadingShippingFee ? (
                  <div>
                    <PulseLoader
                      style={{
                        color: "#828282",
                      }}
                    ></PulseLoader>
                  </div>
                ) : null}
              </div>
              {props.shipmentFee.map((v, i) => (
                <div key={i} className="delivery-cart">
                  <div className="row content-delivery-cart-parent">
                    {v.name}
                  </div>
                  <div className="content-delivery-cart-child">
                    {v.fee_with_type_ship?.length > 0 &&
                      v.fee_with_type_ship?.map((service) => (
                        <div className="content-delivery-cart">
                          <div className="content-delivery-cart-description">
                            <input
                              type="checkbox"
                              name="delivery"
                              id={service.description}
                              checked={
                                shipmentInfo.ship_speed_code ===
                                service.ship_speed_code
                              }
                              onChange={() =>
                                handleShipmentFeeSelect(service, v.partner_id)
                              }
                              style={{ display: "none" }}
                            />
                            <span
                              className="custom-checkbox"
                              onClick={() =>
                                handleShipmentFeeSelect(service, v.partner_id)
                              }
                              style={{
                                cursor: "pointer",
                                marginRight: "5px",
                                backgroundColor:
                                  checkedCheckBoxShippingFee ===
                                  service.description
                                    ? appTheme.color_main_1
                                    : "white",
                                boxShadow: `${
                                  checkedCheckBoxShippingFee ===
                                  service.description
                                    ? `0 0 0 2px white, 0 0 0 3px ${appTheme.color_main_1}`
                                    : "0 0 0 2px white, 0 0 0 3px #dadada"
                                }`,
                              }}
                            ></span>
                            <label
                              htmlFor={service.description}
                              style={{ cursor: "pointer" }}
                            >
                              {service.description}
                            </label>
                          </div>
                          <span>{formatPrice(service.fee)}</span>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : null}
    </OrderStyles>
  );
}
