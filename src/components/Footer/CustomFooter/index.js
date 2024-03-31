import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { appActions } from "../../../actions/appActions";
import ReactDOM from "react-dom";
import { constants as c } from "../../../constants";

import HotlineContact from "../../HotlineContact/HotlineContact5";
import "./style.css";

import styled from "styled-components";

const CustomFooterStyles = styled.div`
  @media screen and (max-width: 768px) {
    display: flex !important;
  }
`;

export default function CustomFooter() {
  const dispatch = useDispatch();

  const tokenInfo = useSelector((state) => state.user.tokenInfo);
  const cartInfo = useSelector((state) => state.cart.cartInfo);
  const appTheme = useSelector((state) => state.app.appTheme);
  const badges = useSelector((state) => state.user.badges);

  const cartNumber = cartInfo ? (cartInfo.line_items ?? []).length : 0;

  function handleAccountClick(e) {
    if (!tokenInfo) {
      e.preventDefault();
      dispatch(appActions.changePopup(c.PHONE_POPUP));
    }
  }

  return (
    <>
      <HotlineContact />
      <div className="custom-footer">
        <div className="html-footer   ">
          <div
            className="sun-editor-editable1"
            dangerouslySetInnerHTML={{ __html: appTheme.html_footer }}
          ></div>
        </div>
      </div>
      {ReactDOM.createPortal(
        <CustomFooterStyles className="mobile custom-footer-mobile1">
          <div className="footer-icon">
            <a href="/gio-hang" style={{ color: appTheme.color_main_1 }}>
              <div className="cart-number">{cartNumber}</div>
              <i className="fas fa-shopping-cart"></i>
              Giỏ hàng
            </a>
          </div>
          <div className="footer-icon">
            <a href="/tin-tuc" style={{ color: appTheme.color_main_1 }}>
              <i className="fas fa-scroll"></i>
              Tin tức
            </a>
          </div>
          <div className="footer-icon">
            <a href="/" style={{ color: appTheme.color_main_1 }}>
              <i className="fas fa-home"></i>
              Trang chủ
            </a>
          </div>
          <div className="footer-icon">
            <a href="/danh-muc" style={{ color: appTheme.color_main_1 }}>
              <i className="fas fa-th-list"></i>
              Danh mục
            </a>
          </div>
          <div className="footer-icon">
            <a
              href="/tai-khoan"
              onClick={handleAccountClick}
              style={{ color: appTheme.color_main_1 }}
            >
              <i className="fas fa-user"></i>
              Cá nhân
            </a>
          </div>
        </CustomFooterStyles>,
        document.querySelector("body")
      )}

      <div
        className="text-center"
        style={{
          backgroundColor: "#111723",
          textAlign: "center",
          color: "#f2f3f8",
          paddingBottom: "10px",
          fontSize: "13px",
        }}
      >
        {badges.config_user_vip == null ? (
          <p>
            {" "}
            Design by{" "}
            <a href="https://ikitech.vn" style={{ color: "#f2f3f8" }}>
              IKITECH.VN
            </a>
          </p>
        ) : (
          badges.config_user_vip.customer_copyright || "IKITECH.VN"
        )}
      </div>
    </>
  );
}
