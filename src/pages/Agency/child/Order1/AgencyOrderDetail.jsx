import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Paginate from "../../../../components/Paginate";
import Select from "../../../../components/Select";
import { agencyActions as a } from "../../../../actions/agencyAction";
import { cartActions as c } from "../../../../actions/cartActions";
import {
  formatPrice,
  hideParentElement,
  showNextElement,
} from "../../../../helper";
import styled from "styled-components";
import history from "../../../../history";
import PickerDate from "../../../../components/PickerDate/PickerDate";
import {
  order_status_code,
  order_payment_code,
} from "../../../../utils/statusOrder";
import moment from "moment";
import { constants as o } from "../../../../constants";
import { getHHmmssDDMMYYY } from "../../../../utils/date";
import {
  Tabs,
  Button,
  Alert,
  notification,
  Popconfirm,
  Modal,
  Form,
  Input,
  Select as AntdSelect,
} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
const { Option } = AntdSelect;
///css order mới
const MenuContainer = styled.div`
  ul {
    list-style-type: none;
    padding: 1px;
  }
`;

const MenuItem = styled.li`
  cursor: ${(props) => (props.isDisabled ? "not-allowed" : "pointer")};
  padding: 10px;
  margin-bottom: 5px;
  text-align: start;
  background-color: ${(props) => (props.isSelected ? "#FF8C00" : "#F5F5F5")};
  color: ${(props) =>
    props.isSelected ? "white" : props.isDisabled ? "#888888" : "black"};
  // pointer-events: ${(props) => (props.isDisabled ? "none" : "auto")};
`;

const MenuContainer1 = styled.div`
  ul {
    list-style-type: none;
  }
`;

const MenuItem1 = styled.li`
  cursor: ${(props) => (props.isDisabled ? "not-allowed" : "pointer")};
  padding: 10px;
  margin-bottom: 5px;
  text-align: start;
  background-color: ${(props) => (props.isSelected ? "#FF8C00" : "#F5F5F5")};
  color: ${(props) =>
    props.isSelected ? "white" : props.isDisabled ? "#888888" : "black"};
  // pointer-events: ${(props) => (props.isDisabled ? "none" : "auto")};
`;

const TestScreenStyles1 = styled.footer`
  .container {
    display: grid;

    // grid-template-columns: 1.5fr 3fr 1.5fr;

    .container_item {
      display: grid;
      align-items: center;
      // text-align: center;
      grid-template-columns: 1fr 1fr;
      margin: 0px;
      .container_item_status {
        border: 1px solid #d1d2d4;
        border-radius: 10px;
        padding: 10px;
        // margin: 10px;
      }

      .container_item_tabs {
        // border: 2px solid #d1d2d4;
        height: 100%;
        .container_item_tabs_item {
          border: 1px solid #d1d2d4;
          border-radius: 10px;
          padding: 10px;
          // margin-top: 10px;
          // margin-left: 10px;
          // margin-right: 10px;
          // display: flex;
          // justify-content: space-around;
        }
      }

      .container_item_info {
        // border: 2px solid #d1d2d4;
        .container_item_info_item {
          padding-top: 10px;
          border: 1px solid #d1d2d4;
          border-radius: 10px;
          margin-left: 10px;
          margin-right: 10px;
          .container_item_info_product {
            // border: 1px solid #d1d2d4;
            // border-radius: 10px;
            border-bottom: 1px solid #d1d2d4;
            padding: 10px;
            margin: 10px;

            display: flex;
            .container_item_info_product_image {
              flex: 1;
              display: flex;
              justify-content: center; /* Căn giữa theo chiều ngang */
              align-items: center;
            }
            .container_item_info_product_info {
              flex: 3;
              padding: 10px;
            }
          }
        }
      }
    }
    .container_item1 {
      align-items: center;
      text-align: center;
      // margin-top: 15px;
      border-radius: 10px;
      .container_item1_total {
        border: 1px solid #d1d2d4;
        border-radius: 10px;
        padding-top: 10px;
        padding-bottom: 10px;
        // padding: 10px;
        // margin: 10px;
      }
      .container_item1_payment {
        border: 1px solid #d1d2d4;
        border-radius: 10px;
        padding: 10px;
        // margin: 10px;
        margin-bottom: 10px;
      }
      .container_item_total {
        display: flex;
        padding-top: 20px;
        padding-bottom: 20px;
        padding-left: 30px;
        padding-right: 30px;
        .container_item_payment_title {
          flex: 1;

          text-align: start;
        }
        .container_item_payment_value {
          flex: 1;
          text-align: end;
        }
      }
      .container_item_tab {
        display: flex;
        justify-content: space-around;
      }
      .container_item_info {
        padding: 10px;
        .container_item_info_product {
          display: flex;
          .container_item_info_product_image {
            flex: 1;
          }
          .container_item_info_product_info {
            flex: 3;
          }
        }
      }
    }
  }

  @media (max-width: 810px) {
    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      .container_item {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }
  }
`;
const TestScreenStyles = styled.footer`
  .container {
    display: grid;

    grid-template-columns: 1.5fr 3fr 1.5fr;

    .container_item {
      align-items: center;
      // text-align: center;
      margin: 0px;
      .container_item_status {
        border: 1px solid #d1d2d4;
        border-radius: 10px;
        padding: 10px;
        // margin: 10px;
      }
      .container_item_total {
        border: 2px solid #d1d2d4;
        display: flex;
        padding-top: 20px;
        padding-bottom: 20px;
        padding-left: 30px;
        padding-right: 30px;
        .container_item_payment_title {
          flex: 1;

          text-align: start;
        }
        .container_item_payment_value {
          flex: 1;
          text-align: end;
        }
      }
      .container_item_tab {
        border: 1px solid #d1d2d4;
        border-radius: 10px;
        margin-top: 10px;
        margin-left: 10px;
        margin-right: 10px;
        display: flex;
        justify-content: space-around;
      }
      .container_item_info {
        padding-top: 10px;
        border: 1px solid #d1d2d4;
        border-radius: 10px;
        margin-left: 10px;
        margin-right: 10px;
        .container_item_info_product {
          // border: 1px solid #d1d2d4;
          // border-radius: 10px;
          border-bottom: 1px solid #d1d2d4;
          padding: 10px;
          margin: 10px;

          display: flex;
          .container_item_info_product_image {
            flex: 1;
            display: flex;
            justify-content: center; /* Căn giữa theo chiều ngang */
            align-items: center;
          }
          .container_item_info_product_info {
            flex: 3;
            padding: 10px;
          }
        }
      }
    }
    .container_item1 {
      align-items: center;
      text-align: center;
      // margin-top: 15px;
      border-radius: 10px;
      .container_item1_total {
        border: 1px solid #d1d2d4;
        border-radius: 10px;
        padding-top: 10px;
        padding-bottom: 10px;
        // padding: 10px;
        // margin: 10px;
      }
      .container_item1_payment {
        border: 1px solid #d1d2d4;
        border-radius: 10px;
        padding: 10px;
        // margin: 10px;
        margin-bottom: 10px;
      }
      .container_item_total {
        display: flex;
        padding-top: 20px;
        padding-bottom: 20px;
        padding-left: 30px;
        padding-right: 30px;
        .container_item_payment_title {
          flex: 1;

          text-align: start;
        }
        .container_item_payment_value {
          flex: 1;
          text-align: end;
        }
      }
      .container_item_tab {
        display: flex;
        justify-content: space-around;
      }
      .container_item_info {
        padding: 10px;
        .container_item_info_product {
          display: flex;
          .container_item_info_product_image {
            flex: 1;
          }
          .container_item_info_product_info {
            flex: 3;
          }
        }
      }
    }
  }

  @media (max-width: 810px) {
    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      .container_item {
      }
    }
  }
`;
//
const AgencyOrderStyles = styled.div`
  .product_order_code {
    &:hover {
      text-decoration: underline;
    }
  }
  .order__table {
    width: 100%;
    border: 1px solid #e4e4e4;
    border-radius: 0.25em;
    tr {
      height: 2em;
      th,
      td {
        text-align: left;
        padding: 0.75em;
      }
    }
    tbody {
      tr {
        td {
          border-top: 1px solid #e4e4e4;
          color: #757575;
        }
      }
    }
  }
  @media only screen and (max-width: 768px) {
    .order__table-main {
      overflow-x: scroll;
      .order__table {
        min-width: 768px;
      }
    }
  }
`;

const AgencyOrderDetail = ({ setTabActive }) => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.agency.orders);
  const account = useSelector((state) => state.agency.account);
  const profile = useSelector((state) => state.user.profile);
  const profiles = useSelector((state) => state.agency.orderCode);

  const orderInfo = useSelector((state) => state.cart.orderInfo);
  const orderInfoId = useSelector((state) => state.cart.orderInfo.info.id);
  const billHistory = useSelector((state) => state.cart.billHistory);
  const payHistory = useSelector((state) => state.cart.payHistory);
  const appTheme = useSelector((state) => state.app.appTheme);
  const badges = useSelector((state) => state.user.badges);
  const myRef = useRef(null);
  const [currentStatus, setCurrentStatus] = useState("Trạng thái đơn hàng");
  const [currentPayment, setCurrentPayment] = useState("Trạng thái thanh toán");
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const [inputValue1, setInputValue1] = useState("");
  const [inputValue2, setInputValue2] = useState("");
  const [debt, setDebt] = useState("Còn nợ");
  const handleInputChange1 = (e) => {
    const newValue = e.target.value;
    // alert(newValue);
    setInputValue1(newValue);
    // setInputValue2(newValue); // Cập nhật giá trị của input2 khi input1 thay đổi
  };
  useEffect(() => {
    setInputValue2(inputValue1);
  }, [inputValue1]);
  const showModal = () => {
    setVisible(true);
  };
  const showModal1 = () => {
    setVisible1(true);
  };
  const handleOk = (values) => {
    // Xử lý submit form ở đây
    // console.log("Received values:", values);
    const status = {
      amount_money: values.editableField,
      order_code: orderInfo.info.order_code,
      payment_method_id: values.selectBox,
    };
    dispatch(a.postAgencyPay(status, orderInfo.info.order_code));

    setTimeout(() => {
      dispatch(c.getOrderInfo(profiles));
      dispatch(c.getPayHistory(profiles));
    }, 2000);

    setVisible(false);
  };
  const handleOk1 = (values) => {
    // Xử lý submit form ở đây

    console.log("Received values:", values);
    const status = {
      total_shipping_fee: values.editableField,
    };
    dispatch(a.updateAgencyFeeShip(status, orderInfo.info.order_code));
    setVisible1(false);
    dispatch(c.getOrderInfo(profiles));
  };
  const handleCancel = () => {
    setVisible(false);
  };
  const handleCancel1 = () => {
    setVisible1(false);
  };
  // dispatch(c.getBillHistory(orderInfo.info.id));

  useEffect(() => {
    dispatch(c.getOrderInfo(profiles));
  }, [profiles]);
  useEffect(() => {
    dispatch(c.getBillHistory(orderInfo.info.id));
    dispatch(c.getPayHistory(profiles));
  }, [orderInfoId]);
  useEffect(() => {
    setCurrentStatus(orderInfo.info.order_status_name);
    setCurrentPayment(orderInfo.info.payment_status_name);
  }, [orderInfo.info.order_status_name, orderInfo.info.payment_status_name]);

  const [queries, setQueries] = useState({
    date_from: getQueryParams("date_from") || "",
    date_to: getQueryParams("date_to") || "",
    page: getQueryParams("page") || 1,
    limit: getQueryParams("limit") || 20,
    field_by: getQueryParams("field_by") || "",
    field_by_value: getQueryParams("field_by_value") || "",
    type: getQueryParams("type") || "",
  });

  function getParams(
    page = 1,
    limit = 20,
    date_from,
    date_to,
    field_by,
    field_by_value
  ) {
    let params = `?page=${page}&limit=${limit}`;

    if (date_from) {
      params += `&date_from=${date_from}`;
    }

    if (date_to) {
      params += `&date_to=${date_to}`;
    }

    if (field_by && field_by_value) {
      params += `&field_by=${field_by}&field_by_value=${field_by_value}`;
    }

    const searchParams = new URLSearchParams(window.location.search);
    const phoneNumber = searchParams.get("phone_number") ?? "";

    if (phoneNumber) {
      params += `&phone_number=${phoneNumber}`;
    }

    return params;
  }

  function handleSort(option, e) {
    setCurrentStatus(option.title);
    hideParentElement(e);
    const status = {
      order_code: profiles,
      order_status_code: option.field_by_value,
    };

    dispatch(a.changeOrderStatus(status));

    setTimeout(() => {
      dispatch(c.getOrderInfo(profiles));
    }, 3000);
  }
  function handlePaymentSort(option, e) {
    setCurrentPayment(option.title);
    hideParentElement(e);
    const status = {
      order_code: profiles,
      payment_status_code: option.field_by_value,
    };
    dispatch(a.changePaymentStatus(status));
    setTimeout(() => {
      dispatch(c.getOrderInfo(profiles));
    }, 3000);
  }

  function handleRemoveFilterPhoneNumber() {
    history.push("/dai-ly");
    setTabActive("order");
    const params = getParams(
      queries.page,
      queries.limit,
      moment(new Date()).format("YYYY-MM-DD"),
      moment(new Date()).format("YYYY-MM-DD")
    );
    setCurrentStatus("Tất cả");
    setQueries((prevQueries) => ({ ...prevQueries, type: "day" }));

    dispatch(a.getSharedOrder(params));
  }
  function getQueryParams(name) {
    const searchParams = new URLSearchParams(window.location.search);
    const param = searchParams.get(name) ?? "";
    return param;
  }
  function onChangeDate(query, date) {
    setQueries((prevQueries) => ({
      ...prevQueries,
      date_from: date.date_from,
      date_to: date.date_to,
    }));
  }

  const phoneNumber = getQueryParams("phone_number");
  useEffect(() => {
    if (queries.field_by && queries.field_by_value) {
      const status =
        order_status_code.filter(
          (order_status) =>
            order_status.field_by_value === queries.field_by_value
        )?.[0]?.title || "Tất cả";
      setCurrentStatus(status);
    }
  }, []);
  useEffect(() => {
    const params = getParams(
      queries.page,
      queries.limit,
      queries.date_from,
      queries.date_to,
      queries.field_by,
      queries.field_by_value
    );

    dispatch(a.getSharedOrder(params));
    dispatch(a.getAccountInfo());
  }, [
    dispatch,
    queries.date_from,
    queries.date_to,
    queries.field_by,
    queries.field_by_value,
    queries.limit,
    queries.page,
  ]);

  const onClickItemOrder = (order_code) => {
    console.log("testtttttttttt", order_code);
    setTabActive("orders");
    // history.push("/dai-ly/detail");
  };

  const CustomerInfo = () => {
    return (
      <div>
        <span>
          Khách hàng:{" "}
          <span style={{ fontWeight: 500 }}>
            {orderInfo.info.customer?.name}
          </span>{" "}
        </span>
        <br />
        <span>
          SĐT khách hàng:{" "}
          <span style={{ fontWeight: 500 }}>
            {" "}
            {orderInfo.info.customer_address?.phone}
          </span>
        </span>
        <br />
        <span>Người nhận: {orderInfo.info.customer_address?.name} </span>
        <br />
        <span>SĐT Người nhận: {orderInfo.info.customer_address?.phone}</span>
        <br />
        <span>
          Địa chỉ nhận:{" "}
          {(orderInfo.info.customer_address?.address_detail ?? "") +
            ", " +
            orderInfo.info.customer_address?.wards_name +
            ", " +
            orderInfo.info.customer_address?.district_name +
            ", " +
            orderInfo.info.customer_address?.province_name +
            ", "}{" "}
        </span>
        <br />
        <span>Email: {orderInfo.info.customer_address?.email} </span>
        <br />
        <span>Thời gian: {orderInfo.info.created_at}</span>
        <br />
        <span>
          Phương thức thanh toán: {orderInfo.info.payment_method_name}
        </span>
        <br />
        {/* <span>CTV Trực tiếp: </span> */}
        {/* <br /> */}
        <span>Ghi chú: {orderInfo.info.customer_note} </span>
      </div>
    );
  };
  const CustomerInfo1 = () => {
    return (
      <div>
        <span>
          Khách hàng:{" "}
          <span style={{ fontWeight: 500 }}>
            {orderInfo.info.customer?.name}
          </span>{" "}
        </span>
        <br />
        <span>
          SĐT khách hàng:{" "}
          <span style={{ fontWeight: 500 }}>
            {" "}
            {orderInfo.info.customer_address?.phone}
          </span>
        </span>
        <br />
        <span>Người nhận: {orderInfo.info.customer_address?.name} </span>
        <br />

        <span>
          Địa chỉ nhận:{" "}
          {(orderInfo.info.customer_address?.address_detail ?? "") +
            ", " +
            orderInfo.info.customer_address?.wards_name +
            ", " +
            orderInfo.info.customer_address?.district_name +
            ", " +
            orderInfo.info.customer_address?.province_name +
            ", "}{" "}
        </span>
        <br />
        <span>Email: {orderInfo.info.customer_address?.email} </span>
        <br />
        <span>Thời gian: {orderInfo.info.created_at}</span>
        <br />
        <span>
          Phương thức thanh toán: {orderInfo.info.payment_method_name}
        </span>
        <br />
        {/* <span>CTV Trực tiếp: </span> */}
        {/* <br /> */}
        <span>Ghi chú: {orderInfo.info.customer_note} </span>
      </div>
    );
  };

  const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
  `;

  const Th = styled.th`
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
    background-color: #f2f2f2;
  `;

  const Td = styled.td`
    padding: 8px;
    text-align: left;

    border-bottom: 1px solid #ddd;
  `;
  const Td1 = styled.td`
    padding: 8px;
    text-align: left;
    width: 220px;
    border-bottom: 1px solid #ddd;
  `;
  const OrderHistory = () => {
    return (
      <Table>
        <thead>
          <tr>
            <Th>STT</Th>
            <Th>Trạng Thái</Th>
            <Th>Thời Gian</Th>
          </tr>
        </thead>
        <tbody>
          {billHistory?.listBillHistory?.map((v, i) => (
            <tr key={i}>
              <Td>{i + 1}</Td>
              <Td1>{v.note}</Td1>
              <Td>{v.created_at}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };
  const OrderBillHistory = () => {
    return (
      <Table>
        <thead>
          <tr>
            <Th>Số tiền trả</Th>
            <Th>Hình thức thanh toán</Th>
            <Th>Thời Gian</Th>
          </tr>
        </thead>
        <tbody>
          {payHistory?.listPayHistory?.map((v, i) => (
            <tr key={i}>
              <Td>{formatPrice(v.money)}</Td>
              <Td1>
                {v.payment_method_id == 0
                  ? "Tiền mặt"
                  : v.payment_method_id == 1
                  ? "Quẹt thẻ"
                  : "Chuyển khoản"}
              </Td1>
              <Td>{v.created_at}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };
  const items = [
    // account?.agency_type?.is_general_agency
    {
      key: "1",
      label: "Thông tin khách hàng",
      children:
        currentStatus === "Chờ xử lý" &&
        account?.agency_type?.is_general_agency === false ? (
          <CustomerInfo />
        ) : (
          <CustomerInfo1 />
        ),
    },
    {
      key: "2",
      label: "Lịch sử đơn hàng",
      children: <OrderHistory />,
    },
    {
      key: "3",
      label: "Lịch sử thanh toán",
      children: <OrderBillHistory />,
    },
  ];
  const items2 = [
    // account?.agency_type?.is_general_agency

    {
      key: 1,
      label: "Lịch sử đơn hàng",
      children: <OrderHistory />,
    },
    {
      key: 2,
      label: "Lịch sử thanh toán",
      children: <OrderBillHistory />,
    },
  ];
  // const itemss = items.filter(
  //   (items) =>
  //     !(items.key === "1" && account?.agency_type?.is_general_agency === false)
  // );
  const onChange = (key) => {
    console.log(key);
  };
  const Menu = () => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [packingSelected, setPackingSelected] = useState(false);
    const [waitingForProgressingSelected, setWaitingForProgressingSelected] =
      useState(false);
    const [outOfStockSelected, setOutOfStockSelected] = useState(false);
    const [userCancelledSelected, setUserCancelledSelected] = useState(false);
    const [customerCancelledSelected, setCustomerCancelledSelected] =
      useState(false);
    const [shippingSelected, setShippingSelected] = useState(false);
    const [deliveryErrorSelected, setDeliveryErrorSelected] = useState(false);
    const [completedSelected, setCompletedSelected] = useState(false);
    const [customerReturningSelected, setCustomerReturningSelected] =
      useState(false);
    const [customerHasReturnsSelected, setCustomerHasReturnsSelected] =
      useState(false);
    const [receivedProductSelected, setReceivedProductSelected] =
      useState(false);
    const [alertVisible, setAlertVisible] = useState(false);

    useEffect(() => {
      if (currentStatus === "Chờ xử lý") {
        setSelectedItem(0);
        setWaitingForProgressingSelected(true);
      } else if (currentStatus === "Đang chuẩn bị hàng") {
        setSelectedItem(1);
        setPackingSelected(true);
      } else if (currentStatus === "Hết hàng") {
        setSelectedItem(2);
        setOutOfStockSelected(true);
      } else if (currentStatus === "Đang giao hàng") {
        setSelectedItem(3);
        setShippingSelected(true);
      } else if (currentStatus === "Đã nhận hàng") {
        setSelectedItem(4);
        setReceivedProductSelected(true);
      } else if (currentStatus === "Đã hoàn thành") {
        setSelectedItem(5);
        setCompletedSelected(true);

        setTimeout(() => {
          dispatch(c.getOrderInfo(profiles));
        }, 5000);
      } else if (currentStatus === "Shop hủy") {
        setSelectedItem(6);
        setUserCancelledSelected(true);
      } else if (currentStatus === "Khách đã hủy") {
        setSelectedItem(7);
        setCustomerCancelledSelected(true);
      } else if (currentStatus === "Lỗi giao hàng") {
        setSelectedItem(8);
        setDeliveryErrorSelected(true);
      } else if (currentStatus === "Chờ trả hàng") {
        setSelectedItem(9);
        setCustomerReturningSelected(true);
      } else if (currentStatus === "Đã trả hàng") {
        setSelectedItem(10);
        setCustomerHasReturnsSelected(true);
      }
    }, []);

    const handleClick = (index, fieldByValue) => {
      // dispatch(c.getBillHistory(orderInfo.info.id));

      const check =
        (packingSelected && fieldByValue === "WAITING_FOR_PROGRESSING") ||
        (outOfStockSelected && fieldByValue !== "OUT_OF_STOCK") ||
        (waitingForProgressingSelected && fieldByValue === "DELIVERY_ERROR") ||
        (waitingForProgressingSelected &&
          fieldByValue === "CUSTOMER_RETURNING") ||
        (waitingForProgressingSelected &&
          fieldByValue === "CUSTOMER_HAS_RETURNS") ||
        (shippingSelected && fieldByValue === "WAITING_FOR_PROGRESSING") ||
        (shippingSelected && fieldByValue === "PACKING") ||
        (shippingSelected && fieldByValue === "OUT_OF_STOCK") ||
        (completedSelected && fieldByValue === "WAITING_FOR_PROGRESSING") ||
        (completedSelected && fieldByValue === "PACKING") ||
        (completedSelected && fieldByValue === "OUT_OF_STOCK") ||
        (completedSelected && fieldByValue === "USER_CANCELLED") ||
        (completedSelected && fieldByValue === "CUSTOMER_CANCELLED") ||
        (completedSelected && fieldByValue === "SHIPPING") ||
        (completedSelected && fieldByValue === "DELIVERY_ERROR") ||
        (completedSelected && fieldByValue === "RECEIVED_PRODUCT") ||
        (userCancelledSelected && fieldByValue === "WAITING_FOR_PROGRESSING") ||
        (userCancelledSelected && fieldByValue === "PACKING") ||
        (userCancelledSelected && fieldByValue === "OUT_OF_STOCK") ||
        (userCancelledSelected && fieldByValue === "COMPLETED") ||
        (userCancelledSelected && fieldByValue === "CUSTOMER_CANCELLED") ||
        (userCancelledSelected && fieldByValue === "SHIPPING") ||
        (userCancelledSelected && fieldByValue === "DELIVERY_ERROR") ||
        (userCancelledSelected && fieldByValue === "RECEIVED_PRODUCT") ||
        (customerCancelledSelected &&
          fieldByValue === "WAITING_FOR_PROGRESSING") ||
        (customerCancelledSelected && fieldByValue === "PACKING") ||
        (customerCancelledSelected && fieldByValue === "OUT_OF_STOCK") ||
        (customerCancelledSelected && fieldByValue === "COMPLETED") ||
        (customerCancelledSelected && fieldByValue === "USER_CANCELLED") ||
        (customerCancelledSelected && fieldByValue === "SHIPPING") ||
        (customerCancelledSelected && fieldByValue === "DELIVERY_ERROR") ||
        (customerCancelledSelected && fieldByValue === "RECEIVED_PRODUCT") ||
        (deliveryErrorSelected && fieldByValue === "WAITING_FOR_PROGRESSING") ||
        (deliveryErrorSelected && fieldByValue === "PACKING") ||
        (deliveryErrorSelected && fieldByValue === "OUT_OF_STOCK") ||
        (deliveryErrorSelected && fieldByValue === "COMPLETED") ||
        (deliveryErrorSelected && fieldByValue === "USER_CANCELLED") ||
        (deliveryErrorSelected && fieldByValue === "SHIPPING") ||
        (deliveryErrorSelected && fieldByValue === "CUSTOMER_CANCELLED") ||
        (deliveryErrorSelected && fieldByValue === "RECEIVED_PRODUCT") ||
        (customerReturningSelected &&
          fieldByValue === "WAITING_FOR_PROGRESSING") ||
        (customerReturningSelected && fieldByValue === "PACKING") ||
        (customerReturningSelected && fieldByValue === "OUT_OF_STOCK") ||
        (customerReturningSelected && fieldByValue === "COMPLETED") ||
        (customerReturningSelected && fieldByValue === "USER_CANCELLED") ||
        (customerReturningSelected && fieldByValue === "SHIPPING") ||
        (customerReturningSelected && fieldByValue === "CUSTOMER_CANCELLED") ||
        (customerReturningSelected && fieldByValue === "DELIVERY_ERROR") ||
        (customerReturningSelected && fieldByValue === "RECEIVED_PRODUCT") ||
        (customerHasReturnsSelected &&
          fieldByValue === "WAITING_FOR_PROGRESSING") ||
        (customerHasReturnsSelected && fieldByValue === "PACKING") ||
        (customerHasReturnsSelected && fieldByValue === "OUT_OF_STOCK") ||
        (customerHasReturnsSelected && fieldByValue === "COMPLETED") ||
        (customerHasReturnsSelected && fieldByValue === "USER_CANCELLED") ||
        (customerHasReturnsSelected && fieldByValue === "SHIPPING") ||
        (customerHasReturnsSelected && fieldByValue === "CUSTOMER_CANCELLED") ||
        (customerHasReturnsSelected && fieldByValue === "DELIVERY_ERROR") ||
        (customerHasReturnsSelected && fieldByValue === "CUSTOMER_RETURNING") ||
        (customerHasReturnsSelected && fieldByValue === "RECEIVED_PRODUCT") ||
        (receivedProductSelected &&
          fieldByValue === "WAITING_FOR_PROGRESSING") ||
        (receivedProductSelected && fieldByValue === "PACKING") ||
        (receivedProductSelected && fieldByValue === "OUT_OF_STOCK") ||
        // (receivedProductSelected &&
        //  fieldByValue === "COMPLETED") ||
        (receivedProductSelected && fieldByValue === "USER_CANCELLED") ||
        (receivedProductSelected && fieldByValue === "SHIPPING") ||
        (receivedProductSelected && fieldByValue === "CUSTOMER_CANCELLED") ||
        (receivedProductSelected && fieldByValue === "DELIVERY_ERROR");

      if (check) {
        notification["error"]({
          message: "Không thể quay về trạng thái cũ!",
          placement: "topRight", // Hiển thị từ góc bên phải của màn hình
          duration: 3, // Thời gian hiển thị là 3 giây
        });
      } else {
        setSelectedItem(index);
        if (fieldByValue === "WAITING_FOR_PROGRESSING") {
          setWaitingForProgressingSelected(true);
        } else if (fieldByValue === "PACKING") {
          const status = {
            order_code: profiles,
            order_status_code: "PACKING",
          };
          setCurrentStatus("Đang chuẩn bị hàng");
          dispatch(a.changeOrderStatus(status));
          setPackingSelected(true); // Chọn nút "PACKING"
          setOutOfStockSelected(false); // Hủy chọn nút "OUT_OF_STOCK"
        } else if (fieldByValue === "OUT_OF_STOCK") {
          const status = {
            order_code: profiles,
            order_status_code: "OUT_OF_STOCK",
          };
          setCurrentStatus("Hết hàng");
          dispatch(a.changeOrderStatus(status));
          setOutOfStockSelected(true); // Chọn nút "OUT_OF_STOCK"
          setPackingSelected(false); // Hủy chọn nút "PACKING"
        } else if (fieldByValue === "SHIPPING") {
          const status = {
            order_code: profiles,
            order_status_code: "SHIPPING",
          };
          setCurrentStatus("Đang giao hàng");
          dispatch(a.changeOrderStatus(status));
          setWaitingForProgressingSelected(false);
          setShippingSelected(true);
        } else if (fieldByValue === "COMPLETED") {
          const status = {
            order_code: profiles,
            order_status_code: "COMPLETED",
          };
          setCurrentStatus("Đã hoàn thành");
          dispatch(a.changeOrderStatus(status));

          setCompletedSelected(true);
        } else if (fieldByValue === "USER_CANCELLED") {
          const status = {
            order_code: profiles,
            order_status_code: "USER_CANCELLED",
          };
          setCurrentStatus("Shop hủy");
          dispatch(a.changeOrderStatus(status));
          setUserCancelledSelected(true);
        } else if (fieldByValue === "CUSTOMER_CANCELLED") {
          const status = {
            order_code: profiles,
            order_status_code: "CUSTOMER_CANCELLED",
          };
          setCurrentStatus("Khách đã hủy");
          dispatch(a.changeOrderStatus(status));
          setWaitingForProgressingSelected(false);
          setCustomerCancelledSelected(true);
        } else if (fieldByValue === "DELIVERY_ERROR") {
          const status = {
            order_code: profiles,
            order_status_code: "DELIVERY_ERROR",
          };
          setCurrentStatus("Lỗi giao hàng");
          dispatch(a.changeOrderStatus(status));
          setDeliveryErrorSelected(true);
        } else if (fieldByValue === "CUSTOMER_RETURNING") {
          const status = {
            order_code: profiles,
            order_status_code: "CUSTOMER_RETURNING",
          };
          setCurrentStatus("Chờ trả hàng");
          dispatch(a.changeOrderStatus(status));
          setCustomerReturningSelected(true);
        } else if (fieldByValue === "CUSTOMER_HAS_RETURNS") {
          const status = {
            order_code: profiles,
            order_status_code: "CUSTOMER_HAS_RETURNS",
          };
          setCurrentStatus("Đã trả hàng");
          dispatch(a.changeOrderStatus(status));
          setCustomerHasReturnsSelected(true);
        } else if (fieldByValue === "RECEIVED_PRODUCT") {
          const status = {
            order_code: profiles,
            order_status_code: "RECEIVED_PRODUCT",
          };
          setCurrentStatus("Đã nhận hàng");
          dispatch(a.changeOrderStatus(status));
          setReceivedProductSelected(true);
          setTimeout(() => {
            dispatch(c.getBillHistory(orderInfo.info.id));
          }, 2000);
        }
      }
    };
    const cancel = () => {};
    return (
      <MenuContainer>
        <ul>
          {order_status_code.map((item, index) => (
            <Popconfirm
              title="Thay đổi trạng thái"
              description="Bạn có chắc muốn thay đổi trạng thái này?"
              onConfirm={() => handleClick(index, item.field_by_value)}
              onCancel={cancel}
              okText="Có"
              cancelText="Không"
            >
              <MenuItem
                key={index}
                isSelected={selectedItem === index}
                // onClick={() => handleClick(index, item.field_by_value)}
                isDisabled={
                  (packingSelected &&
                    item.field_by_value === "WAITING_FOR_PROGRESSING") ||
                  (outOfStockSelected &&
                    item.field_by_value !== "OUT_OF_STOCK") ||
                  (waitingForProgressingSelected &&
                    item.field_by_value === "DELIVERY_ERROR") ||
                  (waitingForProgressingSelected &&
                    item.field_by_value === "CUSTOMER_RETURNING") ||
                  (waitingForProgressingSelected &&
                    item.field_by_value === "CUSTOMER_HAS_RETURNS") ||
                  (shippingSelected &&
                    item.field_by_value === "WAITING_FOR_PROGRESSING") ||
                  (shippingSelected && item.field_by_value === "PACKING") ||
                  (shippingSelected &&
                    item.field_by_value === "OUT_OF_STOCK") ||
                  (completedSelected &&
                    item.field_by_value === "WAITING_FOR_PROGRESSING") ||
                  (completedSelected && item.field_by_value === "PACKING") ||
                  (completedSelected &&
                    item.field_by_value === "OUT_OF_STOCK") ||
                  (completedSelected &&
                    item.field_by_value === "USER_CANCELLED") ||
                  (completedSelected &&
                    item.field_by_value === "CUSTOMER_CANCELLED") ||
                  (completedSelected && item.field_by_value === "SHIPPING") ||
                  (completedSelected &&
                    item.field_by_value === "DELIVERY_ERROR") ||
                  (completedSelected &&
                    item.field_by_value === "RECEIVED_PRODUCT") ||
                  (userCancelledSelected &&
                    item.field_by_value === "WAITING_FOR_PROGRESSING") ||
                  (userCancelledSelected &&
                    item.field_by_value === "PACKING") ||
                  (userCancelledSelected &&
                    item.field_by_value === "OUT_OF_STOCK") ||
                  (userCancelledSelected &&
                    item.field_by_value === "COMPLETED") ||
                  (userCancelledSelected &&
                    item.field_by_value === "CUSTOMER_CANCELLED") ||
                  (userCancelledSelected &&
                    item.field_by_value === "SHIPPING") ||
                  (userCancelledSelected &&
                    item.field_by_value === "DELIVERY_ERROR") ||
                  (userCancelledSelected &&
                    item.field_by_value === "RECEIVED_PRODUCT") ||
                  (customerCancelledSelected &&
                    item.field_by_value === "WAITING_FOR_PROGRESSING") ||
                  (customerCancelledSelected &&
                    item.field_by_value === "PACKING") ||
                  (customerCancelledSelected &&
                    item.field_by_value === "OUT_OF_STOCK") ||
                  (customerCancelledSelected &&
                    item.field_by_value === "COMPLETED") ||
                  (customerCancelledSelected &&
                    item.field_by_value === "USER_CANCELLED") ||
                  (customerCancelledSelected &&
                    item.field_by_value === "SHIPPING") ||
                  (customerCancelledSelected &&
                    item.field_by_value === "DELIVERY_ERROR") ||
                  (customerCancelledSelected &&
                    item.field_by_value === "RECEIVED_PRODUCT") ||
                  (deliveryErrorSelected &&
                    item.field_by_value === "WAITING_FOR_PROGRESSING") ||
                  (deliveryErrorSelected &&
                    item.field_by_value === "PACKING") ||
                  (deliveryErrorSelected &&
                    item.field_by_value === "OUT_OF_STOCK") ||
                  (deliveryErrorSelected &&
                    item.field_by_value === "COMPLETED") ||
                  (deliveryErrorSelected &&
                    item.field_by_value === "USER_CANCELLED") ||
                  (deliveryErrorSelected &&
                    item.field_by_value === "SHIPPING") ||
                  (deliveryErrorSelected &&
                    item.field_by_value === "CUSTOMER_CANCELLED") ||
                  (deliveryErrorSelected &&
                    item.field_by_value === "RECEIVED_PRODUCT") ||
                  (customerReturningSelected &&
                    item.field_by_value === "WAITING_FOR_PROGRESSING") ||
                  (customerReturningSelected &&
                    item.field_by_value === "PACKING") ||
                  (customerReturningSelected &&
                    item.field_by_value === "OUT_OF_STOCK") ||
                  (customerReturningSelected &&
                    item.field_by_value === "COMPLETED") ||
                  (customerReturningSelected &&
                    item.field_by_value === "USER_CANCELLED") ||
                  (customerReturningSelected &&
                    item.field_by_value === "SHIPPING") ||
                  (customerReturningSelected &&
                    item.field_by_value === "CUSTOMER_CANCELLED") ||
                  (customerReturningSelected &&
                    item.field_by_value === "DELIVERY_ERROR") ||
                  (customerReturningSelected &&
                    item.field_by_value === "RECEIVED_PRODUCT") ||
                  (customerHasReturnsSelected &&
                    item.field_by_value === "WAITING_FOR_PROGRESSING") ||
                  (customerHasReturnsSelected &&
                    item.field_by_value === "PACKING") ||
                  (customerHasReturnsSelected &&
                    item.field_by_value === "OUT_OF_STOCK") ||
                  (customerHasReturnsSelected &&
                    item.field_by_value === "COMPLETED") ||
                  (customerHasReturnsSelected &&
                    item.field_by_value === "USER_CANCELLED") ||
                  (customerHasReturnsSelected &&
                    item.field_by_value === "SHIPPING") ||
                  (customerHasReturnsSelected &&
                    item.field_by_value === "CUSTOMER_CANCELLED") ||
                  (customerHasReturnsSelected &&
                    item.field_by_value === "DELIVERY_ERROR") ||
                  (customerHasReturnsSelected &&
                    item.field_by_value === "CUSTOMER_RETURNING") ||
                  (customerHasReturnsSelected &&
                    item.field_by_value === "RECEIVED_PRODUCT") ||
                  (receivedProductSelected &&
                    item.field_by_value === "WAITING_FOR_PROGRESSING") ||
                  (receivedProductSelected &&
                    item.field_by_value === "PACKING") ||
                  (receivedProductSelected &&
                    item.field_by_value === "OUT_OF_STOCK") ||
                  // (receivedProductSelected &&
                  //   item.field_by_value === "COMPLETED") ||
                  (receivedProductSelected &&
                    item.field_by_value === "USER_CANCELLED") ||
                  (receivedProductSelected &&
                    item.field_by_value === "SHIPPING") ||
                  (receivedProductSelected &&
                    item.field_by_value === "CUSTOMER_CANCELLED") ||
                  (receivedProductSelected &&
                    item.field_by_value === "DELIVERY_ERROR")
                } // Tắt nút "WAITING_FOR_PROGRESSING" khi "PACKING" được chọn và tắt tất cả các nút nếu "OUT_OF_STOCK" được chọn
              >
                {item.title}
              </MenuItem>
            </Popconfirm>
          ))}
        </ul>
        {alertVisible && ( // Hiển thị Alert nếu alertVisible là true
          <Alert
            message="Không thể quay về trạng thái cũ!"
            type="error"
            closable
            onClose={() => setAlertVisible(false)} // Đóng Alert khi click vào nút đóng
          />
        )}
      </MenuContainer>
    );
  };
  const Menu1 = () => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [unpaidSelected, setUnpaidSelected] = useState(false);
    const [partiallyPaidSelected, setPartiallyPaidSelected] = useState(false);
    const [paidSelected, setPaidSelected] = useState(false);
    const [refundsSelected, setRefundsSelected] = useState(false);
    useEffect(() => {
      if (currentPayment === "Chưa thanh toán") {
        setSelectedItem(0);
        setUnpaidSelected(true);
      } else if (currentPayment === "Đã thanh toán một phần") {
        setSelectedItem(1);
        setPartiallyPaidSelected(true);
      } else if (currentPayment === "Đã thanh toán") {
        setSelectedItem(2);
        setPaidSelected(true);
      } else if (currentPayment === "Đã hoàn tiền") {
        setSelectedItem(3);
        setRefundsSelected(true);
      }
    }, []);
    const handleClick = (index, fieldByValue) => {
      const check =
        (partiallyPaidSelected && fieldByValue === "UNPAID") ||
        (paidSelected && fieldByValue !== "PAID") ||
        (refundsSelected && fieldByValue !== "REFUNDS");

      if (check === true) {
        notification["error"]({
          message: "Không thể quay về trạng thái cũ!",
          placement: "topRight", // Hiển thị từ góc bên phải của màn hình
          duration: 3, // Thời gian hiển thị là 3 giây
        });
      } else {
        setSelectedItem(index); // Luôn đặt nút được chọn

        if (fieldByValue === "UNPAID") {
          setUnpaidSelected(true);
        } else if (fieldByValue === "PARTIALLY_PAID") {
          const status = {
            order_code: profiles,
            payment_status_code: "PARTIALLY_PAID",
          };
          dispatch(a.changePaymentStatus(status));
          setPartiallyPaidSelected(true);
        } else if (fieldByValue === "PAID") {
          const status = {
            order_code: profiles,
            payment_status_code: "PAID",
          };
          dispatch(a.changePaymentStatus(status));
          setPaidSelected(true);
        } else if (fieldByValue === "REFUNDS") {
          const status = {
            order_code: profiles,
            payment_status_code: "REFUNDS",
          };
          dispatch(a.changePaymentStatus(status));
          setRefundsSelected(true);
        }
      }
    };
    const cancel = () => {};

    return (
      <MenuContainer1>
        <ul>
          {order_payment_code.map((item, index) => (
            <Popconfirm
              title="Thay đổi trạng thái"
              description="Bạn có chắc muốn thay đổi trạng thái này?"
              onConfirm={() => handleClick(index, item.field_by_value)}
              onCancel={cancel}
              okText="Có"
              cancelText="Không"
            >
              <MenuItem1
                key={index}
                isSelected={selectedItem === index}
                // onClick={() => handleClick(index, item.field_by_value)}
                isDisabled={
                  (partiallyPaidSelected && item.field_by_value === "UNPAID") ||
                  (paidSelected && item.field_by_value !== "PAID") ||
                  (refundsSelected && item.field_by_value !== "REFUNDS")
                  // (outOfStockSelected && item.field_by_value !== "OUT_OF_STOCK")
                } // Tắt nút "WAITING_FOR_PROGRESSING" khi "PACKING" được chọn và tắt tất cả các nút nếu "OUT_OF_STOCK" được chọn
              >
                {item.title}
              </MenuItem1>
            </Popconfirm>
          ))}
        </ul>
      </MenuContainer1>
    );
  };
  return (
    <React.Fragment>
      <AgencyOrderStyles className="receipt-tab">
        {/* <div
          className="sort-option row"
          style={{ justifyContent: "space-between", marginBottom: "1em" }}
        >
          <div
            style={{
              display: "flex",
            }}
          >
            <PickerDate onChangeDate={onChangeDate} type={queries.type} />
          </div>
          <Select
            placeholder={currentStatus}
            handleSelect={handleSort}
            showDetail={(e) => showNextElement(e, 200)}
            values={[...order_status_code]}
          />
          <Select
            placeholder={currentPayment}
            handleSelect={handlePaymentSort}
            showDetail={(e) => showNextElement(e, 200)}
            values={[...order_payment_code]}
          />
        </div> */}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            rowGap: "10px",
            marginBottom: "20px",
          }}
        >
          <h4 onClick={onClickItemOrder}>Quay lại </h4>
          <div>
            {phoneNumber ? (
              <span
                style={{
                  padding: "5px 10px",
                  backgroundColor: "#ffa700",
                  borderRadius: "5px",
                  color: "#fff",
                  cursor: "pointer",
                }}
                onClick={handleRemoveFilterPhoneNumber}
              >
                Bỏ lọc SĐT
              </span>
            ) : null}
          </div>
        </div>
      </AgencyOrderStyles>
      <React.Fragment>
        {account?.agency_type?.is_general_agency === true ? (
          <React.Fragment>
            <TestScreenStyles1>
              <div className="container">
                <div className="container_item">
                  <div className="container_item_info">
                    <div className="container_item_info_item">
                      <h4
                        style={{
                          marginLeft: "10px",
                        }}
                      >
                        {" "}
                        Mã đơn: {orderInfo.info.order_code}
                      </h4>
                      <h4
                        style={{
                          marginLeft: "10px",
                        }}
                      >
                        Tổng tiền: {formatPrice(orderInfo.info.cod)}
                      </h4>
                      <h4
                        style={{
                          marginLeft: "10px",
                        }}
                      >
                        Hoa hồng:{" "}
                        {formatPrice(orderInfo.info.share_general_agency)}
                      </h4>

                      {orderInfo?.info?.line_items_at_time?.map((v, i) => (
                        <div key={i} className="container_item_info_product">
                          <div className="container_item_info_product_image">
                            <img
                              style={{
                                background: "url(/img/default_product.jpg)",
                                backgroundSize: "contain",
                              }}
                              src={v.image_url}
                              alt="img_product"
                            />
                          </div>
                          <div className="container_item_info_product_info">
                            <h3>Tên sản phẩm: {v.name}</h3>
                            <br />
                            <span>Tổng số lượng: {v.quantity}</span>
                            <br />
                            <br />
                            <span>
                              Giá sản phẩm:{" "}
                              {formatPrice(v.before_discount_price)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="container_item_tabs">
                    <div className="container_item_tabs_item">
                      <Tabs
                        defaultActiveKey={1}
                        items={items2}
                        onChange={onChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </TestScreenStyles1>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <TestScreenStyles>
              <div className="container">
                {account?.agency_type?.is_general_agency === true ? null : (
                  <div className="container_item">
                    <div className="container_item_status">
                      <h3>Trạng thái đơn hàng</h3>
                      <Menu />
                    </div>

                    {/* <h3>Trạng thái thanh toán</h3>
                <Menu1 /> */}
                  </div>
                )}

                <div className="container_item">
                  <div className="container_item_info">
                    <h4
                      style={{
                        marginLeft: "10px",
                      }}
                    >
                      {" "}
                      Mã đơn: {orderInfo.info.order_code}
                    </h4>

                    {orderInfo?.info?.line_items_at_time?.map((v, i) => (
                      <div className="container_item_info_product">
                        <div className="container_item_info_product_image">
                          <img
                            style={{
                              background: "url(/img/default_product.jpg)",
                              backgroundSize: "contain",
                            }}
                            src={v.image_url}
                            alt="img_product"
                          />
                        </div>
                        <div className="container_item_info_product_info">
                          <h3>Tên sản phẩm: {v.name}</h3>
                          <br />
                          <span>Tổng số lượng: {v.quantity}</span>
                          <br />
                          <br />
                          <span>
                            Giá sản phẩm: {formatPrice(v.before_discount_price)}
                          </span>
                          <br />
                          <br />
                          <span>
                            Giá sau khuyến mãi: {formatPrice(v.after_discount)}
                          </span>
                          {v.distributes_selected.length > 0 ? (
                            <>
                              <br />
                              <br />
                              <span>
                                Phân loại: {v.distributes_selected[0].value}
                              </span>
                            </>
                          ) : null}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="container_item_tab">
                    <Tabs
                      defaultActiveKey="1"
                      items={items}
                      onChange={onChange}
                    />
                  </div>
                </div>
                {account?.agency_type?.is_general_agency === true ? (
                  <div className="container_item1">
                    <h3>Tổng tiền: {formatPrice(orderInfo.info.cod)}</h3>
                    <h4>
                      Hoa hồng: {formatPrice(orderInfo.info.share_agency)}
                    </h4>
                  </div>
                ) : (
                  <div className="container_item1">
                    <div className="container_item1_payment">
                      <h3>Trạng thái thanh toán</h3>
                      <Menu1 />
                    </div>

                    <div className="container_item1_total">
                      <h3>Tổng tiền</h3>
                      <div className="container_item_total">
                        <div className="container_item_payment_title">
                          <span>Tạm tính: </span>
                          <br />
                          <br />
                          <span>Phí giao hàng:</span>
                          <br />
                          <br />
                          <span>Giảm giá:</span>
                          <br />
                          <br />
                          <span>Đã thanh toán:</span>
                          <br />
                          <br />
                          <span>Thành tiền:</span>
                          <br />
                          <br />
                          <span>còn nợ:</span>
                        </div>
                        <div className="container_item_payment_value">
                          <span>
                            {" "}
                            {formatPrice(
                              orderInfo.info.total_before_discount || 0
                            )}
                          </span>
                          <br />
                          <br />

                          <span>
                            <FontAwesomeIcon
                              onClick={showModal1}
                              icon={faPen}
                            />{" "}
                            + {formatPrice(orderInfo.info.total_shipping_fee)}{" "}
                            <Modal
                              title="Thay đổi phí vận chuyển"
                              visible={visible1}
                              onOk={() => setVisible1(false)}
                              onCancel={handleCancel1}
                              footer={[
                                <Button key="back" onClick={handleCancel1}>
                                  Đóng
                                </Button>,
                                <Button
                                  form="myForm1"
                                  key="submit"
                                  htmlType="submit"
                                  type="primary"
                                >
                                  Lưu
                                </Button>,
                              ]}
                            >
                              <Form
                                id="myForm1"
                                name="basic"
                                initialValues={{ remember: true }}
                                onFinish={handleOk1} // Xử lý submit form khi nhấn OK
                                // labelCol={{ span: 10 }}
                                // wrapperCol={{ span: 16 }}
                              >
                                <Form.Item
                                  label="Phí vận chuyển"
                                  name="editableField"
                                  rules={[
                                    {
                                      required: true,
                                      message: "Please input your value!",
                                    },
                                  ]}
                                >
                                  <Input />
                                </Form.Item>
                              </Form>
                            </Modal>
                          </span>
                          <br />
                          <br />
                          <span>
                            -
                            {formatPrice(
                              orderInfo.info.product_discount_amount
                            )}
                          </span>

                          <br />
                          <br />
                          <span>
                            {" "}
                            {formatPrice(
                              orderInfo.info.total_final -
                                orderInfo.info.remaining_amount
                            )}
                          </span>
                          <br />
                          <br />
                          <span>{formatPrice(orderInfo.info.total_final)}</span>
                          <br />
                          <br />
                          <span>
                            {formatPrice(orderInfo.info.remaining_amount)}{" "}
                          </span>
                          <br />
                        </div>
                      </div>
                      <Button
                        onClick={showModal}
                        style={{
                          backgroundColor: "#E56F25",
                          borderColor: "#E56F25",
                        }}
                        type="primary"
                      >
                        Thanh toán còn lại
                      </Button>
                      <Modal
                        title="Thanh toán còn lại"
                        visible={visible}
                        onOk={() => setVisible(false)}
                        onCancel={handleCancel}
                        footer={[
                          <Button key="back" onClick={handleCancel}>
                            Đóng
                          </Button>,
                          <Button
                            form="myForm"
                            key="submit"
                            htmlType="submit"
                            type="primary"
                          >
                            Thanh toán còn lại
                          </Button>,
                        ]}
                      >
                        <Form
                          id="myForm"
                          name="basic"
                          initialValues={{ remember: true }}
                          onFinish={handleOk} // Xử lý submit form khi nhấn OK
                          labelCol={{ span: 10 }}
                          wrapperCol={{ span: 16 }}
                        >
                          <Form.Item
                            label="Khách hàng cần thanh toán"
                            name="staticField1"
                          >
                            <Input
                              readOnly
                              defaultValue={formatPrice(
                                orderInfo.info.remaining_amount
                              )}
                            />
                          </Form.Item>

                          <Form.Item
                            rules={[
                              {
                                required: true,
                                message: "Please input your value!",
                              },
                            ]}
                            label="Hình thức thanh toán"
                            name="selectBox"
                          >
                            <AntdSelect>
                              <Option value="0">Tiền mặt</Option>
                              <Option value="1">Quẹt thẻ</Option>
                              <Option value="3">Chuyển khoản</Option>
                            </AntdSelect>
                          </Form.Item>
                          <Form.Item
                            label="Khách hàng đưa"
                            name="editableField"
                            rules={[
                              {
                                required: true,
                                message: "Please input your value!",
                              },
                            ]}
                          >
                            <Input
                              value={inputValue1}
                              onChange={handleInputChange1}
                            />
                          </Form.Item>
                          {orderInfo.info.remaining_amount - inputValue2 < 0 ? (
                            <Form.Item label={"Tiền thừa"}>
                              <span>
                                {formatPrice(
                                  Math.abs(
                                    orderInfo.info.remaining_amount -
                                      inputValue2
                                  )
                                )}
                              </span>
                            </Form.Item>
                          ) : (
                            <Form.Item label={"còn nợ"}>
                              <span>
                                {formatPrice(
                                  orderInfo.info.remaining_amount - inputValue2
                                )}
                              </span>
                            </Form.Item>
                          )}
                        </Form>
                      </Modal>
                    </div>
                  </div>
                )}
              </div>
            </TestScreenStyles>
          </React.Fragment>
        )}
      </React.Fragment>
    </React.Fragment>
  );
};

export default AgencyOrderDetail;
