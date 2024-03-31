import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { appActions } from "../../../actions/appActions";
import { userActions } from "../../../actions/userActions";
import { constants as c } from "../../../constants";
import { validURL } from "../../../helper";
import HotlineContact from "../../HotlineContact/HotlineContact5";
import "./style.css";
import TopFooter from "./TopFooter";
import styled from "styled-components";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const FooterStyles = styled.div`
  .footer__content {
    background-color: #fff;
    .footer-top {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 20px;
      margin-bottom: 80px;
      padding: 10px;
      .footer__item {
        .footer__title {
          margin-bottom: 10px;
          font-size: 15px;
        }
        .footer__body {
          display: flex;
          flex-direction: column;
          row-gap: 8px;
          .footer__hotline {
            display: flex;
            column-gap: 5px;
            align-items: center;
            a {
              color: #2f80ed;
              font-weight: 600;
            }
          }
          .footer__itemConnect {
            display: flex;
            align-items: center;
            column-gap: 5px;
            font-size: 12px;
          }
        }
      }
    }
    .footer-contact {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      border-top: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      font-size: 16px;
      .footer-middle__left {
        display: flex;
        align-items: center;
        column-gap: 20px;
        .footer-middle__device {
          a {
            display: flex;
            align-items: center;
            column-gap: 5px;
            img {
              width: 32px;
              height: 32px;
            }
            div {
              flex-shrink: 0;
              font-weight: 600;
              font-size: 12px;
            }
          }
        }
      }
      .footer-middle__right {
        display: flex;
        align-items: center;
        column-gap: 20px;
        .payment-item {
          display: flex;
          column-gap: 5px;
        }
      }
    }
    .footer-organization {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      .footer-organization-left {
        .footer-organization__name {
          font-size: 16px;
          text-transform: uppercase;
          white-space: pre-wrap;
          margin-bottom: 5px;
        }
        .footer-organization__content {
          white-space: pre-wrap;
        }
      }
    }
  }
  @media screen and (max-width: 992px) {
    .footer__content {
      .footer-top {
        grid-template-columns: repeat(3, 1fr);
        margin-bottom: 20px;
      }
      .footer-contact {
        flex-direction: column;
        align-items: start;
        row-gap: 10px;
      }
      .footer-organization {
        flex-direction: column;
        align-items: start;
        row-gap: 10px;
      }
    }
  }
  @media screen and (max-width: 768px) {
    .footer__content {
      .footer-top {
        grid-template-columns: repeat(1, 1fr);
        margin-bottom: 20px;
      }
      .footer-contact {
        flex-direction: column;
        align-items: start;
        row-gap: 10px;
      }
      .footer-organization {
        flex-direction: column;
        align-items: start;
        row-gap: 10px;
      }
    }
    .mobile.footer-mobile1 {
      position: fixed;
    }
  }
`;

export default function Footer7() {
  const dispatch = useDispatch();

  const [phone, setPhone] = useState("");
  const tokenInfo = useSelector((state) => state.user.tokenInfo);
  const cartInfo = useSelector((state) => state.cart.cartInfo);
  const appTheme = useSelector((state) => state.app.appTheme);
  const infoStore = useSelector((state) => state.app.infoStore);

  const cartNumber = cartInfo ? (cartInfo.line_items ?? []).length : 0;
  const history = useHistory();
  function handlePhoneChange(e) {
    setPhone(e.target.value);
  }
  function handlePhoneCheck() {
    if (tokenInfo || phone.length < 7) return;
    dispatch(userActions.accountCheck({ email: null, phone_number: phone }));
  }
  function handleAccountClick(e) {
    e.preventDefault();
    if (!tokenInfo) {
      dispatch(appActions.changePopup(c.PHONE_POPUP));
    } else {
      history.push("/tai-khoan");
    }
  }
  function handlePostClick(e, id) {
    if (!id) e.preventDefault();
  }
  function handlePolicyClick(id) {
    if (id) window.location.href = `/tin-tuc/${id}`;
  }
  function handleShowPhonePopup() {
    dispatch(appActions.changePopup(c.PHONE_POPUP));
  }
  function handleLogout() {
    dispatch(userActions.accountLogout());
  }
  function checkToken(e) {
    if (!tokenInfo) {
      e.preventDefault();
      handleShowPhonePopup();
    }
  }

  return (
    <FooterStyles>
      <HotlineContact />
      <TopFooter></TopFooter>
      <div className="footer7">
        <div className="container">
          <div className="footer__content">
            <div className="footer-top">
              <div className="footer__item">
                <div className="footer__title">
                  <h4>Tổng đài hỗ trợ</h4>
                </div>
                <div className="footer__body">
                  <div className="footer__hotline">
                    <span>Hotline:</span>
                    <a
                      className="link"
                      href={`tel:${appTheme.phone_number_hotline}`}
                    >
                      {" "}
                      {appTheme.phone_number_hotline}
                    </a>
                  </div>
                </div>
              </div>
              <div className="footer__item">
                <div className="footer__title">
                  <h4>Liên hệ</h4>
                </div>
                <div className="footer__body">
                  <div>
                    <span>Điện thoại:</span>{" "}
                    <a
                      style={{ opacity: "1" }}
                      href={`tel:${appTheme.contact_phone_number}`}
                    >
                      {" "}
                      {appTheme.contact_phone_number}
                    </a>
                  </div>
                  <div>
                    <span>Email:</span>
                    <a
                      style={{ opacity: "1" }}
                      href={`mailto:${appTheme.contact_email}`}
                    >
                      {" "}
                      {appTheme.contact_email}
                    </a>
                  </div>
                  {appTheme.contact_time_work == null ? (
                    ""
                  ) : (
                    <div>
                      <span>Thời gian làm việc:</span>{" "}
                      {appTheme.contact_time_work}
                    </div>
                  )}
                  <div
                    style={{
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    <span>Địa chỉ:</span> {appTheme?.contact_address}
                  </div>
                </div>
              </div>
              <div className="footer__item">
                <div className="footer__title">
                  <h4>Về chúng tôi</h4>
                </div>
                <div className="footer__body">
                  <div>
                    <a
                      href={
                        appTheme.post_id_about
                          ? `/tin-tuc/${appTheme.post_id_about}`
                          : "/#"
                      }
                      onClick={(e) =>
                        handlePostClick(e, appTheme.post_id_about)
                      }
                    >
                      Giới thiệu
                    </a>
                  </div>
                  <div>
                    <a
                      href={
                        appTheme.post_id_help
                          ? `/tin-tuc/${appTheme.post_id_help}`
                          : "/#"
                      }
                      onClick={(e) => handlePostClick(e, appTheme.post_id_help)}
                    >
                      Giúp đỡ
                    </a>
                  </div>
                  <div>
                    <a
                      href={
                        appTheme.post_id_terms
                          ? `/tin-tuc/${appTheme.post_id_terms}`
                          : "/#"
                      }
                      onClick={(e) =>
                        handlePostClick(e, appTheme.post_id_terms)
                      }
                    >
                      Tham gia
                    </a>
                  </div>
                </div>
              </div>
              <div className="footer__item">
                <div className="footer__title">
                  <h4>Tài khoản của tôi</h4>
                </div>
                <div className="footer__body">
                  {tokenInfo ? (
                    <div
                      style={{
                        cursor: "pointer",
                        lineHeight: "1.5em",
                      }}
                      onClick={handleLogout}
                    >
                      Thoát tài khoản
                    </div>
                  ) : (
                    <div
                      style={{
                        cursor: "pointer",
                        lineHeight: "1.5em",
                      }}
                      onClick={handleShowPhonePopup}
                    >
                      Đăng nhập
                    </div>
                  )}
                  <div>
                    <a href="/don-hang" onClick={checkToken}>
                      Lịch sử đơn hàng
                    </a>
                  </div>
                  <div>
                    <a href="/yeu-thich" onClick={checkToken}>
                      Sản phẩm yêu thích
                    </a>
                  </div>
                </div>
              </div>
              <div className="footer__item">
                <div className="footer__title">
                  <h4>Kết nối với chúng tôi</h4>
                </div>
                <div className="footer__body">
                  <div className="footer__itemConnect">
                    {appTheme.contact_fanpage == null ||
                    appTheme.contact_fanpage === "" ||
                    appTheme.is_show_icon_facebook === false ? (
                      ""
                    ) : (
                      <button
                        className="p-0 m-0"
                        style={{ background: "transparent" }}
                      >
                        <a href={appTheme.contact_fanpage}>
                          <img
                            src="/img/facebook-icon-circle.svg"
                            alt=""
                            style={{ height: "28px" }}
                          />
                        </a>
                      </button>
                    )}
                    <span>Facebook</span>
                  </div>
                  <div className="footer__itemConnect">
                    {appTheme.id_zalo == null ||
                    appTheme.id_zalo === "" ||
                    appTheme.is_show_icon_zalo === false ? (
                      ""
                    ) : (
                      <button
                        className="p-0 m-0"
                        style={{ padding: 0, background: "transparent" }}
                      >
                        <a href={appTheme.id_zalo}>
                          <img
                            src="/img/zalo-icon-circle.svg"
                            alt=""
                            style={{ height: "28px" }}
                          />
                        </a>
                      </button>
                    )}
                    <span>Zalo</span>
                  </div>
                  <div className="footer__itemConnect">
                    {appTheme.id_youtube == null ||
                    appTheme.id_youtube === "" ||
                    appTheme.is_show_icon_youtube === false ? (
                      ""
                    ) : (
                      <button
                        className="p-0 m-0"
                        style={{ background: "transparent" }}
                      >
                        <a
                          href={
                            "https://www.youtube.com/@" + appTheme.id_youtube ??
                            ""
                          }
                        >
                          <img
                            src="/img/youtube-icon-circle.svg"
                            alt=""
                            style={{ height: "30px" }}
                          />
                        </a>
                      </button>
                    )}
                    <span>Youtube</span>
                  </div>
                  <div className="footer__itemConnect">
                    {appTheme.id_tiktok == null ||
                    appTheme.id_tiktok === "" ||
                    appTheme.is_show_icon_tiktok === false ? (
                      ""
                    ) : (
                      <button style={{ background: "transparent" }}>
                        <a
                          href={
                            "https://www.tiktok.com/@" + appTheme.id_tiktok ??
                            ""
                          }
                        >
                          {" "}
                          <img
                            src="/img/tiktok-icon-circle.svg"
                            alt=""
                            style={{ height: "30px", borderRadius: "3px" }}
                          />
                        </a>
                      </button>
                    )}
                    <span>Tiktok</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer-contact">
              <div className="footer-middle__left">
                <div>Tải ứng dụng trên điện thoại</div>
                <div className="footer-middle__device">
                  {infoStore.link_apple_store != null &&
                    infoStore.link_apple_store !== "" &&
                    validURL(infoStore.link_apple_store) && (
                      <a href={infoStore.link_apple_store}>
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "/img/apple-icon-circle.svg"
                          }
                          alt="apple"
                        />
                        <div>App Store</div>
                      </a>
                    )}
                </div>
                <div className="footer-middle__device">
                  {infoStore.link_google_play != null &&
                    infoStore.link_google_play !== "" &&
                    validURL(infoStore.link_google_play) && (
                      <a href={infoStore.link_google_play}>
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "/img/playstore-icon-circle.svg"
                          }
                          alt="playstore"
                        />
                        <div>Goole Play</div>
                      </a>
                    )}
                </div>
              </div>
              <div className="footer-middle__right">
                <div>Chấp nhận thanh toán</div>
                <div className="payment-item">
                  <img
                    src={process.env.PUBLIC_URL + "/img/internet-banking.svg"}
                    alt="thanh toán online"
                  />
                  <img
                    src={process.env.PUBLIC_URL + "/img/cash.svg"}
                    alt="thanh toán tiền mặt"
                  />
                </div>
              </div>
            </div>
            <div className="footer-organization">
              <div className="footer-organization-left">
                <div className="footer-organization__name">
                  {appTheme.contact_individual_organization_name}
                </div>
                {appTheme.content_ministry_of_industry_and_trade !== null &&
                appTheme.content_ministry_of_industry_and_trade !== "" ? (
                  <div className="footer-organization__content">
                    {appTheme.content_ministry_of_industry_and_trade}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="footer-organization-right">
                {appTheme.link_ministry_of_industry_and_trade == null ||
                appTheme.link_ministry_of_industry_and_trade === "" ||
                appTheme.is_show_icon_ministry_of_industry_and_trade ===
                  false ? (
                  ""
                ) : (
                  <button
                    className="p-0 m-0"
                    style={{ background: "transparent" }}
                  >
                    <a href={appTheme.link_ministry_of_industry_and_trade}>
                      <img
                        src="/img/logoSaleNoti.png"
                        alt=""
                        style={{ height: "42px", width: "auto" }}
                      />
                    </a>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mobile footer-mobile1">
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
            onClick={handleAccountClick}
            style={{ color: appTheme.color_main_1 }}
          >
            <i className="fas fa-user"></i>
            Cá nhân
          </a>
        </div>
      </div>
    </FooterStyles>
  );
}
