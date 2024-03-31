import React, { useState } from "react";

import styled from "styled-components";
import { constants as c } from "../../constants";

import { order_status_code, order_payment_code } from "../../utils/statusOrder";
import { Tabs, Button, Alert, notification } from "antd";

const Header = React.lazy(() => import("../../components/Header"));
const Footer = React.lazy(() => import("../../components/Footer"));

function TestScreen(props) {
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
      props.isSelected ? "white" : props.isDisabled ? "#8DABD4" : "black"};
    // pointer-events: ${(props) => (props.isDisabled ? "none" : "auto")};
  `;

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

    // const [a, setA] = useState(null);
    // const handleMouseEnter = () => {
    //   console.log("mount: ", a);
    // };

    const handleClick = (index, fieldByValue) => {
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
          setPackingSelected(true); // Chọn nút "PACKING"
          setOutOfStockSelected(false); // Hủy chọn nút "OUT_OF_STOCK"
        } else if (fieldByValue === "OUT_OF_STOCK") {
          setOutOfStockSelected(true); // Chọn nút "OUT_OF_STOCK"
          setPackingSelected(false); // Hủy chọn nút "PACKING"
        } else if (fieldByValue === "SHIPPING") {
          setWaitingForProgressingSelected(false);
          setShippingSelected(true);
        } else if (fieldByValue === "COMPLETED") {
          setCompletedSelected(true);
        } else if (fieldByValue === "USER_CANCELLED") {
          setUserCancelledSelected(true);
        } else if (fieldByValue === "CUSTOMER_CANCELLED") {
          setWaitingForProgressingSelected(false);
          setCustomerCancelledSelected(true);
        } else if (fieldByValue === "DELIVERY_ERROR") {
          setDeliveryErrorSelected(true);
        } else if (fieldByValue === "CUSTOMER_RETURNING") {
          setCustomerReturningSelected(true);
        } else if (fieldByValue === "CUSTOMER_HAS_RETURNS") {
          setCustomerHasReturnsSelected(true);
        } else if (fieldByValue === "RECEIVED_PRODUCT") {
          setReceivedProductSelected(true);
        }
      }
    };

    return (
      <MenuContainer>
        <ul>
          {order_status_code.map((item, index) => (
            <MenuItem
              key={index}
              isSelected={selectedItem === index}
              onClick={() => handleClick(index, item.field_by_value)}
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
                (shippingSelected && item.field_by_value === "OUT_OF_STOCK") ||
                (completedSelected &&
                  item.field_by_value === "WAITING_FOR_PROGRESSING") ||
                (completedSelected && item.field_by_value === "PACKING") ||
                (completedSelected && item.field_by_value === "OUT_OF_STOCK") ||
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
                (userCancelledSelected && item.field_by_value === "PACKING") ||
                (userCancelledSelected &&
                  item.field_by_value === "OUT_OF_STOCK") ||
                (userCancelledSelected &&
                  item.field_by_value === "COMPLETED") ||
                (userCancelledSelected &&
                  item.field_by_value === "CUSTOMER_CANCELLED") ||
                (userCancelledSelected && item.field_by_value === "SHIPPING") ||
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
                (deliveryErrorSelected && item.field_by_value === "PACKING") ||
                (deliveryErrorSelected &&
                  item.field_by_value === "OUT_OF_STOCK") ||
                (deliveryErrorSelected &&
                  item.field_by_value === "COMPLETED") ||
                (deliveryErrorSelected &&
                  item.field_by_value === "USER_CANCELLED") ||
                (deliveryErrorSelected && item.field_by_value === "SHIPPING") ||
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

  const MenuContainer1 = styled.div`
    ul {
      list-style-type: none;
      padding: 1px;
    }
  `;

  const MenuItem1 = styled.li`
    cursor: ${(props) => (props.isDisabled ? "not-allowed" : "pointer")};
    padding: 10px;
    margin-bottom: 5px;
    text-align: start;
    background-color: ${(props) => (props.isSelected ? "#FF8C00" : "#F5F5F5")};
    color: ${(props) =>
      props.isSelected ? "white" : props.isDisabled ? "#8DABD4" : "black"};
    // pointer-events: ${(props) => (props.isDisabled ? "none" : "auto")};
  `;

  const Menu1 = () => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [unpaidSelected, setUnpaidSelected] = useState(false);
    const [partiallyPaidSelected, setPartiallyPaidSelected] = useState(false);
    const [paidSelected, setPaidSelected] = useState(false);
    const [refundsSelected, setRefundsSelected] = useState(false);

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
          setPartiallyPaidSelected(true);
        } else if (fieldByValue === "PAID") {
          setPaidSelected(true);
        } else if (fieldByValue === "REFUNDS") {
          setRefundsSelected(true);
        }
      }
    };

    return (
      <MenuContainer1>
        <ul>
          {order_payment_code.map((item, index) => (
            <MenuItem1
              key={index}
              isSelected={selectedItem === index}
              onClick={() => handleClick(index, item.field_by_value)}
              isDisabled={
                (partiallyPaidSelected && item.field_by_value === "UNPAID") ||
                (paidSelected && item.field_by_value !== "PAID") ||
                (refundsSelected && item.field_by_value !== "REFUNDS")
                // (outOfStockSelected && item.field_by_value !== "OUT_OF_STOCK")
              } // Tắt nút "WAITING_FOR_PROGRESSING" khi "PACKING" được chọn và tắt tất cả các nút nếu "OUT_OF_STOCK" được chọn
            >
              {item.title}
            </MenuItem1>
          ))}
        </ul>
      </MenuContainer1>
    );
  };

  const TestScreenStyles = styled.footer`
    .container {
      border: 1px solid #d1d2d4;
      display: grid;
      grid-template-columns: 1fr 3fr 1.5fr;

      .container_item {
        border: 1px solid #d1d2d4;
        align-items: center;
        // text-align: center;
        .container_item_total {
          border: 2px solid #d1d2d4;
          display: flex;
          padding-top: 20px;
          padding-bottom: 20px;
          padding-left: 30px;
          padding-right: 30px;
          .container_item_payment_title {
            flex: 1;
            border: 1px solid #d1d2d4;
            text-align: start;
          }
          .container_item_payment_value {
            flex: 1;
            text-align: end;
          }
        }
        .container_item_tab {
          border: 1px solid #d1d2d4;
          display: flex;
          justify-content: space-around;
        }
        .container_item_info {
          border: 1px solid #d1d2d4;
          padding: 10px;
          .container_item_info_product {
            border: 5px solid #d1d2d4;
            display: flex;
            .container_item_info_product_image {
              border: 3px solid #d1d2d4;
              flex: 1;
              display: flex;
              justify-content: center; /* Căn giữa theo chiều ngang */
              align-items: center;
            }
            .container_item_info_product_info {
              border: 3px solid #d1d2d4;
              flex: 3;
            }
          }
        }
      }
      .container_item1 {
        border: 1px solid #d1d2d4;
        align-items: center;
        text-align: center;
        .container_item_total {
          border: 2px solid #d1d2d4;
          display: flex;
          padding-top: 20px;
          padding-bottom: 20px;
          padding-left: 30px;
          padding-right: 30px;
          .container_item_payment_title {
            flex: 1;
            border: 1px solid #d1d2d4;
            text-align: start;
          }
          .container_item_payment_value {
            flex: 1;
            text-align: end;
          }
        }
        .container_item_tab {
          border: 1px solid #d1d2d4;
          display: flex;
          justify-content: space-around;
        }
        .container_item_info {
          border: 1px solid #d1d2d4;
          padding: 10px;
          .container_item_info_product {
            border: 5px solid #d1d2d4;
            display: flex;
            .container_item_info_product_image {
              border: 3px solid #d1d2d4;
              flex: 1;
            }
            .container_item_info_product_info {
              border: 3px solid #d1d2d4;
              flex: 3;
            }
          }
        }
      }
    }

    @media (max-width: 810px) {
      .container {
        border: 1px solid #d1d2d4;
        display: flex;
        flex-direction: column;
        align-items: center;
        .container_item {
          border: 1px solid #d1d2d4;
        }
      }
    }
  `;

  const items = [
    {
      key: "1",
      label: "Thông tin khách hàng",
      children: "Content of Tab Pane 1",
    },
    {
      key: "2",
      label: "Lịch sử đơn hàng",
      children: "Content of Tab Pane 2",
    },
    {
      key: "3",
      label: "Lịch sử thanh toán",
      children: "Content of Tab Pane 3",
    },
  ];
  const onChange = (key) => {
    console.log(key);
  };

  return (
    <React.Fragment>
      <TestScreenStyles>
        <div className="container">
          <div className="container_item">
            <h3>Trạng thái đơn hàng</h3>
            <Menu />
            <h3>Trạng thái thanh toán</h3>
            <Menu1 />
          </div>
          <div className="container_item">
            <div className="container_item_info">
              Mã đơn: #210224HAN7AU9V | 1 sản phẩm
              <div className="container_item_info_product">
                <div className="container_item_info_product_image">
                  <img
                    style={{ width: "150px", height: "auto" }}
                    src="https://cf.shopee.vn/file/sg-11134201-22100-l5ifsk46iuivf1?new-width=320&image-type=webp"
                    alt="img_product"
                  />
                </div>
                <div className="container_item_info_product_info">
                  <h3>
                    Tên sản phẩm: Bộ Phấn Trang Điểm PINKFLASH Gồm Phấn Phủ +
                    Kem Che Khuyết Điểm + Son Môi + Quà Tặng
                  </h3>
                  <br />
                  <span>Tổng số lượng:</span>
                  <br />
                  <br />
                  <span>Giá sản phẩm:</span>
                </div>
              </div>
            </div>
            <div className="container_item_tab">
              <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
            </div>
          </div>
          <div className="container_item1">
            <h3>Tổng tiền</h3>
            <div className="container_item_total">
              <div className="container_item_payment_title">
                <span>Tạm tính</span>
                <br />
                <span>Phí giao hàng</span>
                <br />
                <span>Đã hoàn thành</span>
                <br />
                <span>Thành tiền</span>
                <br />
                <span>còn nợ </span>
              </div>
              <div className="container_item_payment_value">
                <span>273.000</span>
                <br />
                <span>bút + 0đ</span>
                <br />
                <span>0đ</span>
                <br />
                <span>273.000</span>
                <br />
                <span>273.000 </span>
                <br />
              </div>
            </div>
            <Button
              style={{
                backgroundColor: "#E56F25",
                borderColor: "#E56F25",
              }}
              type="primary"
            >
              Thanh toán còn lại
            </Button>
          </div>
        </div>
      </TestScreenStyles>
      <Footer />
    </React.Fragment>
  );
}
export default TestScreen;
