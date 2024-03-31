import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { collaboratorActions as a } from "../../../actions/collaboratorActions";
import { formatPrice, handleImgErr } from "../../../helper";
import InfoCTVPopup from "./InfoCTVPopup";
import { constants as c } from "../../../constants";

const CollaboratorPaymentStyles = styled.div`
  display: flex;
  flex-direction: column-reverse;
  row-gap: 20px;
  color: #757575;
  .payment-policy {
    width: 100%;
    height: 100%;
    padding: 20px;
    border-radius: 6px;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
    .payment-policy__title {
      font-size: 16px;
      font-weight: 500;
      display: flex;
      align-items: center;
      column-gap: 10px;
      margin-bottom: 20px;
      color: #2d3436;
      img {
        width: 24px;
        height: 24px;
        object-fit: contain;
      }
    }
    .payment-policy__content {
      .payment-policy__text {
        margin-bottom: 5px;
      }
      .payment-policy__note {
        color: #2d3436;
        font-weight: 500;
        display: inline-block;
        margin-bottom: 5px;
      }
      b {
        color: #2d3436;
      }
    }
    .payment-policy__request {
      display: flex;
      flex-direction: column;
      align-items: center;
      row-gap: 10px;
      button {
        padding: 0.5em 1em;
        color: white;
        font-size: 16px;
        border-radius: 0.25em;
        display: block;
        margin: auto;
        margin-top: 1em;
        cursor: pointer;
      }
    }
  }
  .payment-info {
    width: 100%;
    height: 100%;
    padding: 20px;
    border-radius: 6px;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
    .payment-info__top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .payment-info__title {
        font-size: 16px;
        font-weight: 500;
        display: flex;
        align-items: center;
        column-gap: 10px;
        margin-bottom: 20px;
        color: #2d3436;
        img {
          width: 24px;
          height: 24px;
          object-fit: contain;
        }
      }
      button {
        padding: 0.5em 1em;
        font-size: 16px;
        color: white;
        border-radius: 0.25em;
        cursor: pointer;
      }
    }
    .payment-info__content {
      .payment-info__main {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        row-gap: 8px;
        .image {
          margin-top: 0.5em;
          width: 220px;
          height: 130px;
          img {
            width: 100%;
            height: 100%;
            border-radius: 8px;
            object-fit: cover;
          }
        }
        .payment-info__item {
          span {
            color: #2d3436;
            font-weight: 500;
          }
        }
      }
    }
  }
  @media only screen and (max-width: 576px) {
    .payment-info {
      .payment-info__content {
        .payment-info__main {
          grid-template-columns: repeat(1, 1fr);
        }
      }
    }
  }
`;

const CollaboratorPayment = () => {
  const dispatch = useDispatch();
  const info = useSelector((state) => state.collaborator.info);
  const account = useSelector((state) => state.collaborator.account);

  const appTheme = useSelector((state) => state.app.appTheme);
  const [customClass, setcustomClass] = useState("");
  const [payment_auto, setPaymentAuto] = useState(false);
  const {
    first_and_last_name,
    bank,
    branch,
    account_name,
    account_number,
    back_card,
    front_card,
    cmnd,
    issued_by,
  } = account;

  const {
    payment_limit,
    has_payment_request,
    payment_1_of_month,
    payment_16_of_month,
  } = info;
  function requestPayment() {
    dispatch(a.requestPayment());
  }
  function handleShowPopup() {
    setcustomClass("center");
  }
  function handleClosePopup() {
    setcustomClass("");
  }
  function getContentPayment() {
    if (payment_1_of_month == true && payment_16_of_month == true) {
      return "ngày 1 và ngày 16";
    }
    if (payment_1_of_month == true) {
      return "ngày 1";
    }
    if (payment_16_of_month == true) {
      return "ngày 16";
    }
    return "";
  }
  function updatePaymentAuto(v) {
    setPaymentAuto(v);
    var data = account;
    data.payment_auto = v;
    dispatch(a.updateInfo(data));
  }

  useEffect(() => {
    dispatch(a.getAccountInfo());
  }, [dispatch]);

  return (
    <CollaboratorPaymentStyles className="payment ">
      <div className="payment-info">
        <div className="payment-info__top">
          <div className="payment-info__title">
            <img src="/img/wallet.png" alt="wallet" />
            <span>Thông tin thanh toán</span>
          </div>
          <button
            onClick={handleShowPopup}
            style={{ background: appTheme.color_main_1 }}
          >
            Cập nhập
          </button>
        </div>
        <div className="payment-info__content">
          <div className="payment-info__main">
            <div className="payment-info__item">
              <label>Họ và tên: </label>
              <span>{first_and_last_name}</span>
            </div>
            <div className="payment-info__item">
              <label>Số tài khoản: </label>
              <span>{account_number}</span>
            </div>
            <div className="payment-info__item">
              <label>Tên tài khoản: </label>
              <span>{account_name}</span>
            </div>
            <div className="payment-info__item">
              <label>Ngân hàng: </label>
              <span>{bank ? `${bank} (Chi nhánh ${branch})` : ""}</span>
            </div>
            <div className="payment-info__item">
              <label>CMND/CCCD: </label>
              <span>{cmnd}</span>
            </div>
            <div className="payment-info__item">
              <label>Nơi cấp: </label>
              <span>{issued_by ?? ""}</span>
            </div>
            <div className="payment-info__item">
              <label>Mặt trước: </label>
              <div className="image">
                <img
                  src={front_card ? front_card : "./img/default_product.jpg"}
                  alt=""
                  onError={handleImgErr}
                />
              </div>
            </div>
            <div className="payment-info__item">
              <label>Mặt sau: </label>
              <div className="image">
                <img
                  src={back_card ? back_card : "./img/default_product.jpg"}
                  alt=""
                  onError={handleImgErr}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="payment-policy">
        <div className="payment-policy__title">
          <img src="/img/rules.png" alt="" />
          <div>Chính sách thanh toán</div>
        </div>
        <div className="payment-policy__content">
          <div className="payment-policy__text">
            Tiền từ ví CTV{" "}
            {first_and_last_name ? `của ${first_and_last_name}` : ""} sẽ được
            thanh toán định kỳ
          </div>
          <span>
            <span className="payment-policy__note">Lưu ý:</span> <br />
            &nbsp;&nbsp;&nbsp;&nbsp; - Bạn cần có số dư tối thiểu là{" "}
            <b>{formatPrice(payment_limit)} VNĐ</b> để được thanh toán định kỳ
          </span>

          {getContentPayment() != "" ? (
            <>
              <br />
              <span>
                &nbsp;&nbsp;&nbsp;&nbsp; - Shop sẽ lên danh sách và thanh toán
                định kỳ vào <b>{getContentPayment()}</b> hàng tháng
              </span>
            </>
          ) : (
            ""
          )}

          <div
            style={{
              display: "flex",
              paddingTop: 5,
            }}
          >
            <input
              onChange={(e) => {
                updatePaymentAuto(e.target.checked);
              }}
              name="sex"
              type="checkbox"
              id="male"
              checked={payment_auto}
              style={{}}
            />
            <div
              style={{
                cursor: "pointer",
              }}
              onClick={() => {
                updatePaymentAuto(!payment_auto);
              }}
            >
              {" "}
              &nbsp;Cho phép shop tự động thanh toán định kỳ{" "}
            </div>
          </div>
        </div>
        <div className="payment-policy__request">
          {!has_payment_request ? (
            <button
              onClick={!has_payment_request && requestPayment}
              style={{ background: appTheme.color_main_1 }}
            >
              Gửi yêu cầu thanh toán
            </button>
          ) : (
            <button style={{ background: "#b8b8b8", cursor: "initial" }}>
              Đã gửi yêu cầu thanh toán{" "}
              {formatPrice(info.money_payment_request ?? 0)}
            </button>
          )}
          <label>
            Gửi yêu cầu thanh toán trước ít nhất 3 ngày trước thời hạn thanh
            toán
          </label>
        </div>
      </div>
      {account.status === c.LOADING ? null : (
        <InfoCTVPopup
          customClass={customClass}
          info={account}
          onClose={handleClosePopup}
        />
      )}
    </CollaboratorPaymentStyles>
  );
};

export default CollaboratorPayment;
