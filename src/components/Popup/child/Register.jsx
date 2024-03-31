import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { requestOtp, validateEmail } from "../../../helper";
import { appActions } from "../../../actions/appActions";
import { userActions } from "../../../actions/userActions";
import { constants as c } from "../../../constants";
import RegisterOTP from "./RegisterOTP";
import styled from "styled-components";

const RegisterStyles = styled.div`
  .btn__otp {
    transition: all 0.5s;
    &:hover {
      transform: scale(1.05);
    }
  }
  .form__input {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    label {
      width: 85px !important;
    }
    input {
      margin-bottom: 0 !important;
    }
  }
  .form__input-referral-phone-content {
    display: flex;
    & > div {
      margin-bottom: 0 !important;
      display: flex;
      align-items: center;
      column-gap: 3px;
    }
  }
  .regis-popup {
    h4 {
      text-align: center;
      margin-bottom: 30px !important;
      margin-top: 0px !important;
    }
  }
  @media screen and (max-width: 500px) {
    .modal {
      width: 100% !important;
      height: 100% !important;
      margin: 0 !important;
      .regis-popup {
        h4 {
          font-size: 20px;
          margin-bottom: 20px !important;
        }
        .back-btn {
          top: 14px;
        }
        .close-btn {
          top: 10px !important;
        }
        .form__input {
          input {
            padding: 0.5rem;
          }
          &.form__input-referral-phone {
            .form__input-referral-phone-content {
              label {
                width: 50px !important;
              }
            }
          }
        }
      }
    }
  }
`;

export default function Login(props) {
  const dispatch = useDispatch();
  const phone = useSelector((state) => state.user.phone);
  const message = useSelector((state) => state.user.message);
  const status_reg = useSelector((state) => state.user.status_reg);
  const badges = useSelector((state) => state.user.badges);

  const appTheme = useSelector((state) => state.app.appTheme);
  const [timer, setTimer] = useState(0);
  const [validateMsg, setValidateMsg] = useState("");
  const [isSentRequest, setIsSentRequest] = useState(false);
  const [typeSendPhone, changeTypeSend] = useState(!validateEmail(phone));
  const [regisInfo, setRegisInfo] = useState({
    phone_number: !validateEmail(phone) ? phone : null,
    email: validateEmail(phone) ? phone : null,
    name: "",
    otp: "",
    password: "",
    tree: "",
    acreage: "",
    sex: -1,
    referral_phone_number: "",
    otp_from: typeSendPhone == false ? "email" : "phone",
  });
  const [showOTP, setShowOTP] = useState(false);
  function continueOTP() {
    if (
      !regisInfo.phone_number ||
      !regisInfo.password ||
      !regisInfo.sex === -1 ||
      !regisInfo.name
    ) {
      setIsSentRequest(false);
      setValidateMsg("Vui lòng điền đầy đủ thông tin !");
      return;
    }
    if (timer === 0) {
      if (regisInfo.phone_number) {
        requestOtp(phone);
        changeTypeSend(true);
      } else {
        dispatch(userActions.requestSendOtpEmail(regisInfo.email));
        changeTypeSend(false);
      }
      setTimer(30);
    }
    setValidateMsg("");
    dispatch({ type: c.CLEAR_MESSAGE });
    setShowOTP(true);
  }

  function changeTypeSendAc() {
    changeTypeSend(!typeSendPhone);
  }
  function handleBack() {
    dispatch(appActions.changePopup(c.PHONE_POPUP));
  }
  function handleInputChange(e) {
    let info = { ...regisInfo };
    info[e.target.name] = e.target.value;

    if (e.target.name === "sex") info.sex = parseInt(e.target.value);
    setRegisInfo(info);
  }
  function handleRegis() {
    if (
      !regisInfo.phone_number ||
      !regisInfo.password ||
      !regisInfo.sex === -1 ||
      (!regisInfo.otp && badges.is_use_otp == true) ||
      !regisInfo.name
    ) {
      setIsSentRequest(false);
      setValidateMsg("Vui lòng điền đầy đủ thông tin !");
      return;
    }
    setValidateMsg("");
    setIsSentRequest(true);
    dispatch({ type: c.CLEAR_MESSAGE });
    let info = { ...regisInfo };

    info.otp_from = typeSendPhone == true ? "phone" : "email";

    dispatch({ type: c.LOADING_WHEN_SUBMIT_REGISTER });
    dispatch(userActions.accountRegis(info));
  }
  useEffect(() => {
    if (!timer) return;
    let myTimer = setInterval(() => {
      setTimer(timer - 1 >= 0 ? timer - 1 : 0);
    }, 1000);
    return () => clearInterval(myTimer);
  });
  function handleResendOtp() {
    if (timer > 0) return;

    if (typeSendPhone) {
      requestOtp(phone);
    } else {
      dispatch(userActions.requestSendOtpEmail(regisInfo.email));
    }

    setTimer(30);
  }
  useEffect(() => {
    const referralPhone = localStorage.getItem("rp");
    if (referralPhone) {
      const decodedString = atob(referralPhone);
      setRegisInfo((prevRegisInfo) => {
        return {
          ...prevRegisInfo,
          referral_phone_number: decodedString,
        };
      });
    }
  }, []);

  return (
    <RegisterStyles
      style={{
        position: "fixed",
        inset: "0px",
        background: "rgba(0, 0, 0, 0.53)",
        overflowY: "scroll",
        zIndex: "999999",
      }}
    >
      <div
        className="modal center"
        style={{
          position: "relative",
          inset: "0px",
          border: "none",
          background: "rgb(0 0 0 / 0%)",
          overflow: "unset",
          borderRadius: "20px",
          outline: "none",
          padding: "0px",
          width: "470px",
          height: "540px",
          margin: "40px auto",
        }}
      >
        <div className="regis-popup">
          <h4>Nhập thông tin đăng ký</h4>
          <div className="row form__input">
            <label>Họ tên: </label>
            <input
              autoComplete="off"
              type="text"
              name="name"
              placeholder="Họ tên"
              value={regisInfo.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="row form__input">
            <label>SĐT: </label>
            <input
              readOnly={!validateEmail(phone) ? true : false}
              name="phone_number"
              type="text"
              placeholder="Số điện thoại"
              value={regisInfo.phone_number}
              onChange={handleInputChange}
            />
          </div>
          <div className="row form__input">
            <label>Email: </label>
            <input
              readOnly={validateEmail(phone) ? true : false}
              name="email"
              type="text"
              placeholder="Email (không bắt buộc)"
              value={regisInfo.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="row form__input">
            <label htmlFor="password">Mật khẩu: </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Mật khẩu"
              value={regisInfo.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="row form__input">
            <label htmlFor="tree">Cây trồng: </label>
            <input
              id="tree"
              name="tree"
              type="text"
              placeholder="Cây trồng đang canh tác ?"
              value={regisInfo.tree}
              onChange={handleInputChange}
            />
          </div>
          <div className="row form__input">
            <label htmlFor="acreage">Diện tích: </label>
            <input
              id="acreage"
              name="acreage"
              type="text"
              placeholder="Diện tích canh tác ?"
              value={regisInfo.acreage}
              onChange={handleInputChange}
            />
          </div>
          <div className="row form__input form__input-referral-phone">
            <label>Giới tính: </label>
            <div className="form__input-referral-phone-content">
              <div className="row">
                <input
                  checked={regisInfo.sex === 1}
                  name="sex"
                  value="1"
                  type="checkbox"
                  id="male"
                  onChange={handleInputChange}
                />
                <label htmlFor="male">Nam</label>
              </div>
              <div className="row">
                <input
                  checked={regisInfo.sex === 2}
                  name="sex"
                  value="2"
                  type="checkbox"
                  id="female"
                  onChange={handleInputChange}
                />
                <label htmlFor="female">Nữ</label>
              </div>
              <div className="row">
                <input
                  checked={regisInfo.sex === 0}
                  name="sex"
                  value="0"
                  type="checkbox"
                  id="other"
                  onChange={handleInputChange}
                />
                <label htmlFor="other">Khác</label>
              </div>
            </div>
          </div>
          <div>
            <label
              htmlFor="referral_phone_number"
              style={{
                display: "inline-block",
                marginBottom: "8px",
              }}
            >
              Được giới thiệu bởi (nếu có):
            </label>
            <input
              id="referral_phone_number"
              name="referral_phone_number"
              type="text"
              placeholder="Số điện thoại người giới thiệu"
              value={regisInfo.referral_phone_number}
              onChange={handleInputChange}
            />
          </div>
          {/* <div
            style={{
              width: "100%",
              display: "flex",
              columnGap: "10px",
              justifyContent: "space-between",
            }}
          >
            <input
              autoComplete="off"
              name="otp"
              type="text"
              placeholder={
                typeSendPhone ? "Nhập mã OTP" : "Nhập xác nhận từ Email"
              }
              value={regisInfo.otp}
              style={{ width: "calc(100% - 7.5em)" }}
              onChange={handleInputChange}
            />

            <button
              onClick={handleResendOtp}
              style={{
                width: "9em",
                fontSize: "15px",
                height: "100%",
                borderRadius: "0.25em",
                border: `1px solid ${appTheme.color_main_1}`,
                padding: "0.75em 0.5em",
                color: appTheme.color_main_1,
                cursor: "pointer",
              }}
            >
              {timer
                ? `Gửi lại (${timer}s)`
                : typeSendPhone
                ? "Lấy mã OTP"
                : "Lấy mã từ email"}
            </button>
          </div>
          <center
            onClick={changeTypeSendAc}
            style={{ color: "#3498db", fontSize: "8", cursor: "pointer" }}
          >
            {typeSendPhone ? "Xác thực qua Email" : "Xác thực qua SĐT"}
          </center> */}
          <br />
          {validateMsg && (
            <div
              className="err-msg"
              style={{
                textAlign: "center",
                marginTop: "0",
                marginBottom: "8px",
              }}
            >
              {validateMsg}
            </div>
          )}
          {/* {!validateMsg && isSentRequest && !message && (
            <img src="/img/loading1.gif" alt="" />
          )} */}
          {isSentRequest && message && !validateMsg && (
            <div
              className="err-msg"
              style={{
                textAlign: "center",
                marginTop: "0",
                marginBottom: "8px",
              }}
            >
              {message}
            </div>
          )}
          {badges.is_use_otp ? (
            <>
              {!showOTP ? (
                <>
                  {status_reg !== c.LOADING && (
                    <button
                      className="next-btn btn__otp"
                      onClick={continueOTP}
                      style={{
                        background: appTheme.color_main_1,
                        borderRadius: "10px",
                      }}
                    >
                      Tiếp tục
                    </button>
                  )}
                </>
              ) : (
                <>
                  <RegisterOTP
                    timer={timer}
                    typeSendPhone={typeSendPhone}
                    regisInfo={regisInfo}
                    validateMsg={validateMsg}
                    isSentRequest={isSentRequest}
                    message={message}
                    status_reg={status_reg}
                    handleInputChange={handleInputChange}
                    handleResendOtp={handleResendOtp}
                    changeTypeSendAc={changeTypeSendAc}
                    handleRegis={handleRegis}
                    setRegisInfo={setRegisInfo}
                    handleBack={setShowOTP}
                    handleClose={props.handleClose}
                  ></RegisterOTP>
                </>
              )}
            </>
          ) : (
            <button
              className="next-btn btn__otp"
              onClick={handleRegis}
              style={{
                background: appTheme.color_main_1,
                borderRadius: "10px",
              }}
            >
              Đăng ký
            </button>
          )}

          <button
            className="close-btn"
            onClick={props.handleClose}
            style={{
              top: "18px",
              right: "16px",
            }}
          >
            <i className="fas fa-times"></i>
          </button>
          <button className="back-btn" onClick={handleBack}>
            <i className="fas fa-chevron-left"></i>
          </button>
        </div>
      </div>
    </RegisterStyles>
  );
}
