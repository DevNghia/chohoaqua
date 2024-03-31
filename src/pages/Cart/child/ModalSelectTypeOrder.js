import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { appActions } from "../../../actions/appActions";
import { constants as c } from "../../../constants";
const ModalSelectTypeOrderStyles = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  .modal_overlay {
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.3);
  }
  .modal_content {
    position: absolute;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    border-radius: 10px;
    .modal_selectTypeOrder {
      width: 350px;
      .modal_header {
        padding: 1.25rem 1.5625rem;
        border-bottom: 1px solid #ebebeb;
        display: flex;
        justify-content: space-between;
        align-items: center;
        h5 {
          text-transform: uppercase;
          font-size: 16px;
        }
        & > span {
          width: 25px;
          height: 25px;
          border-radius: 100rem;
          border: 2px solid rgb(153, 153, 153);
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          svg {
            color: rgb(153, 153, 153);
            width: 16px;
            height: 16px;
          }
        }
      }
      .modal_selectTypeOrder_content {
        & > div {
          padding: 1.25rem 1.5625rem;
          display: flex;
          flex-direction: column;
          row-gap: 10px;
          .checkBtn {
            align-items: center;
            column-gap: 10px;
            .custom-checkbox {
              width: 10px;
              height: 10px;
              border-radius: 100rem;
            }
            label {
              cursor: pointer;
            }
          }
        }
        .selectTypeOrder_btn {
          display: flex;
          justify-content: center;
          margin-top: 5px;
          button {
            width: 200px;
            height: 35px;
            border-radius: 100rem;
            color: white;
            font-weight: 700;
            cursor: pointer;
          }
        }
      }
    }
  }
`;
const ModalSelectTypeOrder = ({
  setShowSelectModalTypeOrder = () => {},
  showSelectModalTypeOrder = false,
}) => {
  const appTheme = useSelector((state) => state.app.appTheme);
  const [checkedTypeOrder, setCheckedTypeOrder] = useState(1);
  const history = useHistory();

  const dispatch = useDispatch();
  const handleContinueOrder = () => {
    if (checkedTypeOrder === 1) {
      history.push("/gio-hang?s=2");
    } else {
      dispatch(appActions.changePopup(c.PHONE_POPUP));
    }
    setShowSelectModalTypeOrder(false);
  };
  return ReactDOM.createPortal(
    <ModalSelectTypeOrderStyles
      style={{
        visibility: `${showSelectModalTypeOrder ? "visible" : "hidden"}`,
        opacity: `${showSelectModalTypeOrder ? "1" : "0"}`,
        transition: "all .5s",
      }}
    >
      <div
        className="modal_overlay"
        onClick={() => setShowSelectModalTypeOrder(false)}
      ></div>
      <div className="modal_content">
        <div className="modal_selectTypeOrder">
          <div className="modal_header">
            <h5>Chọn phương thức đặt hàng</h5>
            <span onClick={() => setShowSelectModalTypeOrder(false)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </div>
          <div className="modal_selectTypeOrder_content">
            <div>
              <div className="row checkBtn">
                <input
                  type="checkbox"
                  name="delivery"
                  id={1}
                  value={1}
                  checked={checkedTypeOrder === 1}
                  onChange={(e) => setCheckedTypeOrder(Number(e.target.value))}
                  style={{ display: "none" }}
                />
                <span
                  className="custom-checkbox"
                  onClick={(e) => setCheckedTypeOrder(1)}
                  style={{
                    cursor: "pointer",
                    backgroundColor:
                      checkedTypeOrder === 1 ? appTheme.color_main_1 : "white",
                    boxShadow: `${
                      checkedTypeOrder === 1
                        ? `0 0 0 2px white, 0 0 0 3px ${appTheme.color_main_1}`
                        : "0 0 0 2px white, 0 0 0 3px #dadada"
                    }`,
                  }}
                ></span>
                <label htmlFor={1}>Đặt hàng không cần tài khoản</label>
              </div>
              <div className="row checkBtn">
                <input
                  type="checkbox"
                  name="delivery"
                  id={2}
                  value={2}
                  checked={checkedTypeOrder === 2}
                  onChange={(e) => setCheckedTypeOrder(Number(e.target.value))}
                  style={{ display: "none" }}
                />
                <span
                  className="custom-checkbox"
                  onClick={(e) => setCheckedTypeOrder(2)}
                  style={{
                    cursor: "pointer",
                    backgroundColor:
                      checkedTypeOrder === 2 ? appTheme.color_main_1 : "white",
                    boxShadow: `${
                      checkedTypeOrder === 2
                        ? `0 0 0 2px white, 0 0 0 3px ${appTheme.color_main_1}`
                        : "0 0 0 2px white, 0 0 0 3px #dadada"
                    }`,
                  }}
                ></span>
                <label htmlFor={2}>Tôi đã có tài khoản</label>
              </div>
              <div className="selectTypeOrder_btn">
                <button
                  style={{
                    backgroundColor: appTheme.color_main_1,
                  }}
                  onClick={handleContinueOrder}
                >
                  Tiếp tục
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModalSelectTypeOrderStyles>,
    document.querySelector("body")
  );
};

export default ModalSelectTypeOrder;
