import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { constants as c } from "../../../constants";

const RegisterOTPStyles = styled.div`
  .regis-popup {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .opt__content {
    text-align: center;
    .otp__title {
      font-weight: 600;
      margin-bottom: 25px;
    }
    .otp__header {
      color: #949494;
      margin-bottom: 60px;
      font-weight: 500;
    }
    .otp__code {
      display: flex;
      justify-content: center;
      margin-bottom: 50px;
      .otp__code__item {
        display: flex;
        align-items: center;
        input {
          width: 32px;
          text-align: center;
          padding: 10px 0px;
          border-radius: inherit;
          border: none;
          color: #434844;
          font-size: 40px;
          margin: 0px 10px;
          border-bottom: 1px solid rgb(224, 224, 224);
          &::placeholder {
            color: #bbbbc5;
          }
        }
      }
    }
    .otp__method {
      .otp__methodContent {
        width: 75%;
        margin: 0 auto;
        line-height: 24px;
        span {
          &:first-child {
            color: #bbbbc5;
          }
          &:last-child {
            cursor: pointer;
            &:hover {
              text-decoration: underline;
            }
          }
        }
      }
      .otp__methodChange {
        margin: 20px 0 20px 0;
        span {
          color: #bbbbc5;
        }
        & > div {
          margin-top: 7px;
          font-weight: 500;
        }
      }
    }
  }
  .btn__otp {
    transition: all 0.5s;
    width: 100%;
    color: white;
    font-size: 20px;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      transform: scale(1.05);
    }
    .otp__loading {
      display: inline-block;
      width: 20px;
      height: 20px;
      border-radius: 100rem;
      border: 2px solid white;
      border-top-color: transparent;
      animation: spin 1s linear infinite;
    }
  }
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
const InputStyles = styled.input`
  &:focus {
    border-bottom-color: ${(props) => props.colorTheme}!important;
  }
`;

const RegisterOTP = ({
  timer,
  typeSendPhone,
  regisInfo,
  handleResendOtp,
  changeTypeSendAc,
  validateMsg,
  isSentRequest,
  message,
  status_reg,
  handleRegis,
  handleBack,
  setRegisInfo,
}) => {
  const dispatch = useDispatch();
  const appTheme = useSelector((state) => state.app.appTheme);
  const [otpArray, setOtpArray] = useState(Array(6).fill(""));

  const handleChangeOTP = (e, indexChange) => {
    dispatch({ type: c.CLEAR_MESSAGE });
    const regex = /^[0-9\b]+$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      const newOtpArray = [...otpArray];
      otpArray.forEach((item, index) => {
        if (index === indexChange) {
          newOtpArray[index] = e.target.value;
          return;
        }
        newOtpArray[index] = item;
      });
      setOtpArray(newOtpArray);
      const inputsOtp = document.querySelectorAll(".otp__code__item input");
      if (indexChange < 5 && e.target.value !== "") {
        inputsOtp[indexChange + 1].focus();
      }
    }
  };
  const handleKeyDownOTP = (e, indexChange) => {
    const inputsOtp = document.querySelectorAll(".otp__code__item input");
    if (
      inputsOtp[indexChange].value === "" &&
      (indexChange > 0) & (e.key === "Backspace")
    ) {
      inputsOtp[indexChange - 1].focus();
    }
  };

  const handleChangeMethod = () => {
    setOtpArray(Array(6).fill(""));
    changeTypeSendAc();
  };
  const handleBackOtp = () => {
    handleBack(false);
    dispatch({ type: c.CLEAR_MESSAGE });
  };
  useEffect(() => {
    const strOtp = otpArray.reduce((prevItem, currentItem) => {
      return prevItem.concat(currentItem);
    }, "");
    setRegisInfo((prevRegisInfo) => {
      return { ...prevRegisInfo, otp: strOtp };
    });
  }, [otpArray]);
  return (
    <RegisterOTPStyles
      style={{
        position: "fixed",
        inset: "0px",
        background: "rgba(0, 0, 0, 0.53)",
        overflowY: "scroll",
        zIndex: "1000",
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
        <div
          className="regis-popup"
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <div className="opt__content">
            <div className="otp__title">
              Xác thực qua {typeSendPhone ? "số điện thoại" : "email"}
            </div>
            <div className="otp__header">
              Mã đã được gửi tới{" "}
              {typeSendPhone ? regisInfo.phone_number : regisInfo.email}
            </div>
            <div className="otp__code">
              {Array(6)
                .fill("")
                .map((item, index) => (
                  <div className="otp__code__item">
                    <InputStyles
                      colorTheme={appTheme.color_main_1}
                      value={otpArray[index]}
                      type="text"
                      placeholder="0"
                      maxLength={1}
                      onChange={(e) => handleChangeOTP(e, index)}
                      onKeyDown={(e) => handleKeyDownOTP(e, index)}
                    />
                  </div>
                ))}
            </div>
            <div className="otp__method">
              <div className="otp__methodChange">
                {timer !== 0 ? (
                  <>
                    <span>
                      Gửi lại mã sau{" "}
                      <span
                        className="otp__method__timers"
                        style={{
                          color: appTheme.color_main_1,
                        }}
                      >
                        {timer}s
                      </span>
                    </span>
                  </>
                ) : (
                  <>
                    <span>Không gửi được?</span>
                    <div
                      className=""
                      onClick={handleResendOtp}
                      style={{
                        color: appTheme.color_main_1,
                        textDecoration: "underline",
                        cursor: "pointer",
                      }}
                    >
                      {timer
                        ? `Gửi lại (${timer}s)`
                        : typeSendPhone
                        ? "Gửi lại mã OTP"
                        : "Gửi lại mã từ email"}
                    </div>
                  </>
                )}
              </div>
              <div className="otp__methodContent">
                <span>Bạn có muốn đổi phương thức không?</span>
                <span onClick={handleChangeMethod}>
                  {typeSendPhone ? " Xác thực qua Email" : " Xác thực qua SĐT"}
                </span>
              </div>
              <div
                className="err-msg"
                style={{
                  textAlign: "center",
                  marginTop: "10px",
                  marginBottom: "8px",
                  fontSize: "13px",
                }}
              >
                {isSentRequest && message && !validateMsg ? message : ""}
              </div>
            </div>
          </div>
          {status_reg === c.LOADING ? (
            <button
              className="btn__otp"
              style={{
                background: appTheme.color_main_1,
                borderRadius: "10px",
                height: "44px",
              }}
            >
              <span className="otp__loading"></span>
            </button>
          ) : (
            <button
              className="btn__otp"
              onClick={handleRegis}
              style={{
                background: appTheme.color_main_1,
                borderRadius: "10px",
                height: "44px",
                cursor: "pointer",
              }}
            >
              Đăng ký
            </button>
          )}

          <button
            className="back-btn"
            onClick={handleBackOtp}
            style={{
              cursor: "pointer",
            }}
          >
            <i className="fas fa-chevron-left"></i>
          </button>
        </div>
      </div>
    </RegisterOTPStyles>
  );
};

export default RegisterOTP;
