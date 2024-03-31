import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { appActions } from "../../../actions/appActions";
import { userActions } from "../../../actions/userActions";
import { constants as c } from "../../../constants";
import { validURL } from "../../../helper";
import HotlineContact from "../../HotlineContact/HotlineContact5";
import { Link } from "react-router-dom";
import "./style.css";
export default function Footer3() {
  const dispatch = useDispatch();

  const [phone, setPhone] = useState("");
  const tokenInfo = useSelector((state) => state.user.tokenInfo);
  const cartInfo = useSelector((state) => state.cart.cartInfo);
  const appTheme = useSelector((state) => state.app.appTheme);
  const infoStore = useSelector((state) => state.app.infoStore);
  const badges = useSelector((state) => state.user.badges);

  const cartNumber = cartInfo ? (cartInfo.line_items ?? []).length : 0;
  function handlePhoneChange(e) {
    setPhone(e.target.value);
  }
  function handlePhoneCheck() {
    if (tokenInfo || phone.length < 7) return;
    dispatch(userActions.accountCheck({ email: null, phone_number: phone }));
  }
  function handleAccountClick(e) {
    if (!tokenInfo) {
      e.preventDefault();
      dispatch(appActions.changePopup(c.PHONE_POPUP));
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

  console.log("infoStore::: ", appTheme);
  return (
    <React.Fragment>
      <HotlineContact />

      <div className="header-10 home-page-10 footer7">
        <footer
          className="footer bg-white"
          style={{ footerOverlay: "#f6f6f6" }}
        >
          <div className="mid-footer">
            <div
              className="container"
              style={{
                "max-width": "1150px",
                margin: "auto",
              }}
            >
              <div className="row">
                <div className="col-xs-12 col-md-6 col-xl-4 footer-click footer-1">
                  <Link to="/" className="logo-wrapper mb-3 d-block">
                    <img
                      style={{
                        width: "200px",
                        height: "54px",
                        objectFit: "contain",
                      }}
                      className="img-fluid"
                      src={appTheme.logo_url}
                      alt="BECARE SKIN"
                      width={248}
                      height={53}
                    />
                  </Link>
                  <div
                    style={{
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    <span>Địa chỉ:</span> {appTheme?.contact_address}
                  </div>
                  <div className="single-contact">
                    <i className="fa fa-mobile-alt" />
                    <div className="content">
                      Số điện thoại:{" "}
                      <a
                        className="link"
                        href={`tel:${appTheme.contact_phone_number}`}
                      >
                        {" "}
                        {appTheme.contact_phone_number}
                      </a>
                    </div>
                  </div>
                  <div className="single-contact">
                    <i className="fa fa-envelope" />
                    <div className="content">
                      Email:{" "}
                      <a
                        className="link"
                        href={`mailto:${appTheme.contact_email}`}
                      >
                        {" "}
                        {appTheme.contact_email}
                      </a>
                    </div>
                  </div>
                  {/* <div className="single-contact">
                  <small>Becareskin.com nhận đặt hàng trực tuyến và giao hàng tận nơi. KHÔNG hỗ trợ đặt mua và nhận hàng trực tiếp tại văn phòng cũng như tất cả kho hàng Becareskin trên toàn quốc.</small>
                </div> */}
                  <div className="social-footer">
                    <h4 className="title-menu">Theo dõi chúng tôi </h4>
                    <ul className="follow_option d-flex flex-wrap align-items-center p-0 list-unstyled">
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
                          <button
                            style={{ padding: 0, background: "transparent" }}
                          >
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
                                "https://www.youtube.com/@" +
                                  appTheme.id_youtube ?? ""
                              }
                            >
                              {" "}
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
                                "https://www.tiktok.com/@" +
                                  appTheme.id_tiktok ?? ""
                              }
                            >
                              {" "}
                              <img
                                src="/img/tiktok.png"
                                alt=""
                                style={{ height: "30px", borderRadius: "3px" }}
                              />
                            </a>
                          </button>
                        )}
                      </div>
                      <div
                        className="row link__app"
                        style={{
                          display: "flex",
                          columnGap: "5px",
                          marginTop: "10px",
                        }}
                      >
                        {infoStore.link_google_play != null &&
                          infoStore.link_google_play !== "" &&
                          validURL(infoStore.link_google_play) && (
                            <a href={infoStore.link_google_play}>
                              <img
                                src="/img/play.png"
                                alt=""
                                style={{
                                  maxWidth: "10em",
                                  maxHeight: "2.2em",
                                }}
                              />
                            </a>
                          )}
                        {infoStore.link_apple_store != null &&
                          infoStore.link_apple_store !== "" &&
                          validURL(infoStore.link_apple_store) && (
                            <a href={infoStore.link_apple_store}>
                              <img
                                src="/img/app.png"
                                alt=""
                                style={{
                                  maxWidth: "10em",
                                  maxHeight: "2.2em",
                                }}
                              />
                            </a>
                          )}
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
                            <a
                              href={
                                appTheme.link_ministry_of_industry_and_trade
                              }
                            >
                              <img
                                src="/img/logoSaleNoti.png"
                                alt=""
                                style={{ height: "35px", width: "auto" }}
                              />
                            </a>
                          </button>
                        )}
                      </div>
                    </ul>
                    <div>
                      {appTheme.content_ministry_of_industry_and_trade !==
                        null &&
                      appTheme.content_ministry_of_industry_and_trade !== "" ? (
                        <p
                          style={{
                            marginBottom: "0",
                          }}
                        >
                          <span style={{ fontSize: "15px" }}>
                            {appTheme.content_ministry_of_industry_and_trade}
                          </span>{" "}
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
                <div
                  className="col-xs-12 col-md-6 col-xl-3 footer-click"
                  style={{ zIndex: 1 }}
                >
                  <h4 className="title-menu clicked">
                    Chính sách{" "}
                    <i className="fa fa-angle-down d-md-none d-inline-block" />
                  </h4>
                  <ul className="list-menu toggle-mn">
                    <li className="li_menu">
                      {" "}
                      <a
                        className="link"
                        onClick={() =>
                          handlePolicyClick(appTheme.post_id_terms)
                        }
                      >
                        Quy chế hoạt động website{" "}
                      </a>
                    </li>
                    <li className="li_menu">
                      {" "}
                      <a
                        className="link"
                        onClick={() =>
                          handlePolicyClick(appTheme.post_id_return_policy)
                        }
                      >
                        Chính sách đổi trả và hoàn tiền{" "}
                      </a>
                    </li>
                    <li className="li_menu">
                      {" "}
                      <a
                        className="link"
                        onClick={() =>
                          handlePolicyClick(appTheme.post_id_support_policy)
                        }
                      >
                        Chính sách bảo hành{" "}
                      </a>
                    </li>
                    <li className="li_menu">
                      {" "}
                      <a
                        className="link"
                        onClick={() =>
                          handlePolicyClick(appTheme.post_id_privacy_policy)
                        }
                      >
                        Chính sách bảo mật thông tin{" "}
                      </a>
                    </li>
                    <li className="li_menu">
                      {" "}
                      <a
                        className="link"
                        onClick={() =>
                          handlePolicyClick(appTheme.post_id_delivery_policy)
                        }
                      >
                        Chính sách vận chuyển và giao nhận{" "}
                      </a>
                    </li>
                    <li className="li_menu">
                      {" "}
                      <a
                        className="link"
                        onClick={() =>
                          handlePolicyClick(appTheme.post_id_payment_policy)
                        }
                      >
                        Chính sách thanh toán{" "}
                      </a>
                    </li>
                    <li className="li_menu">
                      {" "}
                      <a
                        className="link"
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
                <div
                  className="col-xs-12 col-md-6 col-xl-2 footer-click"
                  style={{ zIndex: 1 }}
                >
                  <h4 className="title-menu clicked">
                    Về chúng tôi{" "}
                    <i className="fa fa-angle-down d-md-none d-inline-block" />
                  </h4>
                  <ul className="list-menu toggle-mn">
                    <li className="li_menu">
                      {" "}
                      <a
                        className="link"
                        href={
                          appTheme.post_id_about
                            ? `/tin-tuc/${appTheme.post_id_about}`
                            : "/#"
                        }
                        onClick={(e) =>
                          handlePostClick(e, appTheme.post_id_about)
                        }
                      >
                        Giới thiệu{" "}
                      </a>
                    </li>
                    <li className="li_menu">
                      {" "}
                      <a
                        className="link"
                        href={
                          appTheme.post_id_help
                            ? `/tin-tuc/${appTheme.post_id_help}`
                            : "/#"
                        }
                        onClick={(e) =>
                          handlePostClick(e, appTheme.post_id_help)
                        }
                      >
                        Giúp đỡ
                      </a>
                    </li>
                    <li className="li_menu">
                      {" "}
                      <a
                        className="link"
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
                    </li>
                  </ul>
                </div>
                <div className="col-xs-12 col-md-6 col-xl-3 footer-click">
                  <div className="ModuleContent">
                    <div className="footer-item">
                      <div className="footer-title">Hỗ trợ thanh toán</div>
                      <img
                        style={{ width: "285px", margin: "unset" }}
                        alt="#"
                        src="/img/hinhthucthanhtoan.png"
                      />
                    </div>
                    <div className="footer-item">
                      <div className="footer-title">ĐỐI TÁC VẬN CHUYỂN</div>
                      <img
                        style={{ width: "285px", margin: "unset" }}
                        alt="#"
                        src="/img/doitacvanchuyen.png"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-footer-bottom copyright clearfix py-2">
            <div className="container">
              <div className="row">
                <div
                  id="copyright"
                  className="col-xl-4 col-lg-12 col-md-12 col-xs-12 fot_copyright"
                >
                  <span className="wsp">
                    © Bản quyền thuộc về{" "}
                    <a target="_blank" className>
                      {badges.config_user_vip == null
                        ? "IKITECH.VN"
                        : badges.config_user_vip.customer_copyright ||
                          "IKITECH.VN"}{" "}
                    </a>{" "}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
      <div className="mobile footer-mobile6">
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
          <a href="/khuyen-mai" style={{ color: appTheme.color_main_1 }}>
            <i className="fab fa-salesforce"></i>
            Khuyến mãi
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
      </div>
    </React.Fragment>
  );
}
