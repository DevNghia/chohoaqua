import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { appActions } from "../../../actions/appActions";
import { constants as c } from "../../../constants";

const Footer6Styles = styled.footer`
  padding-top: 50px;
  border-top: 1px solid #d1d2d4;
  .footer__content {
    .footer__content-main {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      column-gap: 50px;
      padding-bottom: 40px;
      .footer__item-left {
        .footer__title-left {
          display: flex;
          column-gap: 10px;
          margin-bottom: 16px;
          .footer__logo {
            height: 35px;
            width: 100px;
            img {
              object-fit: cover;
              width: 100%;
              height: 100%;
            }
          }
        }
        p {
          line-height: 24px;
          color: #6c6d70;
          margin-bottom: 12px;
          span {
            color: #3e3e3f;
            font-weight: 600;
          }
        }
        .footer__iconSocials {
          margin-bottom: 30px;
          .icon-footer {
            display: flex;
            column-gap: 20px;
          }
        }
        .footer__hotline {
          a {
            background: #221f20;
            border-radius: 16px 0px;
            font-weight: 600;
            font-size: 16px;
            line-height: 24px;
            text-align: center;
            text-transform: uppercase;
            color: #f7f8f9;
            padding: 12px 24px;
          }
        }
      }
      .footer__item {
        &:nth-child(3),
        &:nth-child(4) {
          .footer__main {
            ul {
              li {
                a:hover {
                  color: #221f20;
                }
              }
            }
          }
        }
        .footer__title {
          font-weight: 600;
          font-size: 24px;
          line-height: 32px;
          color: #221f20;
          margin-bottom: 30px;
        }
        .footer__main {
          ul {
            li {
              font-size: 14px;
              line-height: 24px;
              color: #57585a;
              margin-bottom: 16px;
              display: block;
              cursor: pointer;
              a:hover {
                color: #57585a;
              }
            }
          }
        }
        .footer__download {
          p {
            margin-bottom: 20px;
          }
          .footer__downloadApp {
            display: flex;
            a {
              img {
                width: 130px;
                height: 42px;
                border-radius: 8px;
              }
            }
          }
        }
      }
    }
    .footer__company {
      display: flex;
      justify-content: center;
      padding: 20px 0 20px;
      border-top: 1px solid #d1d2d4;
      p {
        text-align: center;
        color: #57585a;
        a {
          color: #57585a;
          &:hover {
            color: #57585a;
          }
        }
      }
    }
    .mobile-fixed {
      position: fixed;
    }
  }
  @media (max-width: 1400px) {
    .footer__content {
      .wrapper-container {
        max-width: 1080px;
      }
    }
  }
  @media (max-width: 1100px) {
    .footer__content {
      .footer__content-main {
        display: flex;
        flex-direction: column-reverse;
        align-items: center;
        text-align: center;
        .footer__item:first-child {
          .footer__item-left {
            .footer__title-left {
              justify-content: center;
            }
            .footer__iconSocials {
              .icon-footer {
                justify-content: center;
              }
            }
          }
        }
      }
    }
  }
`;

const Footer6 = () => {
  const dispatch = useDispatch();
  const appTheme = useSelector((state) => state.app.appTheme);

  const tokenInfo = useSelector((state) => state.user.tokenInfo);
  const infoStore = useSelector((state) => state.app.infoStore);
  const cartInfo = useSelector((state) => state.cart.cartInfo);
  const cartNumber = cartInfo ? (cartInfo.line_items ?? []).length : 0;
  const badges = useSelector((state) => state.user.badges);

  const handleShowPhonePopup = () => {
    dispatch(appActions.changePopup(c.PHONE_POPUP));
  };

  function handlePolicyClick(id) {
    if (id) window.location.href = `/tin-tuc/${id}`;
  }

  const checkToken = () => {
    if (!tokenInfo) {
      handleShowPhonePopup();
    }
  };

  return (
    <Footer6Styles>
      <div className="footer__content">
        <div className="wrapper-container">
          <div className="footer__content-main">
            <div className="footer__item">
              <div className="footer__item-left">
                <div className="footer__title-left">
                  <div className="footer__logo">
                    <img src={appTheme.logo_url} alt={appTheme.home_title} />
                  </div>
                  {appTheme.link_ministry_of_industry_and_trade == null ||
                  appTheme.link_ministry_of_industry_and_trade === "" ||
                  appTheme.is_show_icon_ministry_of_industry_and_trade ===
                    false ? (
                    ""
                  ) : (
                    <div class="footer__ministryIndustryTrade">
                      <a href={appTheme.link_ministry_of_industry_and_trade}>
                        <img alt="Đăng ký bộ công thương" src="/img/bct.png" />
                      </a>
                    </div>
                  )}
                  {/* <div className="footer__ministryIndustryTrade">
                    <img
                      src={process.env.PUBLIC_URL + "/img/bct.png"}
                      alt="Ministry of Industry and Trade"
                    />
                  </div> */}
                </div>
                <p>{appTheme.contact_individual_organization_name}</p>
                {appTheme.content_ministry_of_industry_and_trade !== null &&
                appTheme.content_ministry_of_industry_and_trade !== "" ? (
                  <p>{appTheme.content_ministry_of_industry_and_trade}</p>
                ) : (
                  ""
                )}
                <ul className="footer__iconSocials">
                  <div className="icon-footer" style={{ opacity: 1 }}>
                    {appTheme.contact_fanpage == null ||
                    appTheme.contact_fanpage === "" ||
                    appTheme.is_show_icon_facebook === false ? (
                      ""
                    ) : (
                      <button style={{ background: "transparent" }}>
                        <a href={appTheme.contact_fanpage}>
                          <img
                            src="/img/facebook.png"
                            alt=""
                            style={{ height: "28px" }}
                          />
                        </a>
                      </button>
                    )}
                    {appTheme.id_zalo == null ||
                    appTheme.id_zalo === "" ||
                    appTheme.is_show_icon_zalo === false ? (
                      ""
                    ) : (
                      <button style={{ padding: 0, background: "transparent" }}>
                        <a href={appTheme.id_zalo}>
                          <img
                            src="/img/zalo.png"
                            alt=""
                            style={{ height: "28px" }}
                          />
                        </a>
                      </button>
                    )}

                    {appTheme.id_youtube == null ||
                    appTheme.id_youtube === "" ||
                    appTheme.is_show_icon_youtube === false ? (
                      ""
                    ) : (
                      <button style={{ background: "transparent" }}>
                        <a
                          href={
                            "https://www.youtube.com/@" + appTheme.id_youtube ??
                            ""
                          }
                        >
                          <img
                            src="/img/youtube.png"
                            alt=""
                            style={{ height: "30px" }}
                          />
                        </a>
                      </button>
                    )}
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
                          <img
                            src="/img/tiktok.png"
                            alt=""
                            style={{ height: "30px", borderRadius: "3px" }}
                          />
                        </a>
                      </button>
                    )}
                  </div>
                </ul>
                {appTheme.phone_number_hotline && (
                  <div className="footer__hotline">
                    <a
                      href={`tel:${appTheme.phone_number_hotline}`}
                    >{`Hotline: ${appTheme.phone_number_hotline}`}</a>
                  </div>
                )}
              </div>
            </div>
            <div className="footer__item">
              <div className="footer__title">Liên hệ</div>
              <div className="footer__main">
                <ul>
                  <li>
                    <span>Điện thoại: </span>
                    <a href={`tel:${appTheme.contact_phone_number}`}>
                      {appTheme.contact_phone_number}
                    </a>
                  </li>
                  <li>
                    <span>Email: </span>
                    <a
                      className="link"
                      href={`mailto:${appTheme.contact_email}`}
                    >
                      {appTheme.contact_email}
                    </a>
                  </li>
                  <li>
                    <span>Thời gian làm việc: </span>
                    {appTheme.contact_time_work}
                  </li>
                  <li>
                    {" "}
                    <div
                      style={{
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      <span>Địa chỉ:</span> {appTheme?.contact_address}
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="footer__item">
              <div className="footer__title">Về chúng tôi</div>
              <div className="footer__main">
                <ul>
                  <li>
                    <a
                      href={
                        appTheme.post_id_about
                          ? `/tin-tuc/${appTheme.post_id_about}`
                          : "#"
                      }
                    >
                      Giới thiệu
                    </a>
                  </li>
                  <li>
                    <a
                      href={
                        appTheme.post_id_help
                          ? `/tin-tuc/${appTheme.post_id_help}`
                          : "/#"
                      }
                    >
                      Giúp đỡ
                    </a>
                  </li>
                  <li>
                    <a
                      href={
                        appTheme.post_id_terms
                          ? `/tin-tuc/${appTheme.post_id_terms}`
                          : "#"
                      }
                    >
                      Tham gia
                    </a>
                  </li>
                </ul>
                <div className="footer__download">
                  {((infoStore.link_google_play != null &&
                    infoStore.link_google_play !== "") ||
                    (infoStore.link_apple_store != null &&
                      infoStore.link_apple_store !== "")) && (
                    <p>Download app</p>
                  )}

                  <div className="row show-mobile footer__downloadApp">
                    {infoStore.link_google_play != null &&
                      infoStore.link_google_play !== "" && (
                        <a href={infoStore.link_google_play}>
                          <img
                            src={process.env.PUBLIC_URL + "/img/play.png"}
                            alt={infoStore.link_google_play}
                          />
                        </a>
                      )}
                    &nbsp;&nbsp;
                    {infoStore.link_apple_store != null &&
                      infoStore.link_apple_store !== "" && (
                        <a href={infoStore.link_apple_store}>
                          <img
                            src={process.env.PUBLIC_URL + "/img/app.png"}
                            alt={infoStore.link_google_play}
                          />
                        </a>
                      )}
                  </div>
                </div>
              </div>
            </div>
            <div className="footer__item">
              <div className="footer__title">Chính sách</div>
              <div className="footer__main">
                {/* <ul>
                  <li onClick={handleShowPhonePopup}>Đăng nhập</li>
                  <li>
                    <a href="/don-hang" onClick={checkToken}>
                      Lịch sử đơn hàng
                    </a>
                  </li>
                  <li>
                    <a href="/yeu-thich" onClick={checkToken}>
                      Sản phẩm yêu thích
                    </a>
                  </li>
                </ul> */}
                <ul>
                  <li>
                    <a
                      onClick={() => handlePolicyClick(appTheme.post_id_terms)}
                    >
                      Quy chế hoạt động website{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() =>
                        handlePolicyClick(appTheme.post_id_return_policy)
                      }
                    >
                      Chính sách đổi trả và hoàn tiền{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() =>
                        handlePolicyClick(appTheme.post_id_support_policy)
                      }
                    >
                      Chính sách bảo hành{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() =>
                        handlePolicyClick(appTheme.post_id_privacy_policy)
                      }
                    >
                      Chính sách bảo mật thông tin{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() =>
                        handlePolicyClick(appTheme.post_id_delivery_policy)
                      }
                    >
                      Chính sách vận chuyển và giao nhận{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() =>
                        handlePolicyClick(appTheme.post_id_payment_policy)
                      }
                    >
                      Chính sách thanh toán{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() =>
                        handlePolicyClick(
                          appTheme.post_id_goods_inspecstion_policy
                        )
                      }
                    >
                      Chính sách kiểm hàng{" "}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="footer__company">
          <p>
            {badges.config_user_vip == null
              ? "IKITECH.VN"
              : badges.config_user_vip.customer_copyright || "IKITECH.VN"}
          </p>
        </div>
        <div className="mobile footer-mobile1 mobile-fixed">
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
            {!tokenInfo ? (
              <a onClick={checkToken} style={{ color: appTheme.color_main_1 }}>
                <i className="fas fa-user"></i>
                Cá nhân
              </a>
            ) : (
              <a href="/tai-khoan" style={{ color: appTheme.color_main_1 }}>
                <i className="fas fa-user"></i>
                Cá nhân
              </a>
            )}
          </div>
        </div>
      </div>
    </Footer6Styles>
  );
};

export default Footer6;
