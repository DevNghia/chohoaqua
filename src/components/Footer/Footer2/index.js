import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { appActions } from "../../../actions/appActions";
import { userActions } from "../../../actions/userActions";
import { constants as c } from "../../../constants";
import { validURL } from "../../../helper";
import HotlineContact from "../../HotlineContact/HotlineContact5";
import "./style.css";
import styled from "styled-components";

const FooterStyles = styled.footer``;

export default function Footer2() {
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
  const handleAddress = () => {
    const address = appTheme?.contact_address;
    if (address) {
      const multipleAddress = address?.split("\n");
      if (multipleAddress.length > 1) {
        return (
          <div>
            {multipleAddress.map((address, index) => (
              <div key={index}>
                <span>Địa chỉ {index + 1}: </span>
                {address}
              </div>
            ))}
          </div>
        );
      } else {
        return (
          <>
            <span>Địa chỉ: </span>
            {multipleAddress}
          </>
        );
      }
    }
    return "";
  };

  return (
    <React.Fragment>
      <HotlineContact />
      <div
        className="footer-subscription5"
        style={{
          "background-image":
            `url("/img/footer-bg-1.png"), linear-gradient(to right, white, ` +
            appTheme.color_main_1 +
            `, white)`,
          height: "90px",
          "background-position": "50%",
          padding: "26px 0",
          color: "#fff",
          backgroundColor: appTheme.color_main_1,
        }}
      >
        <div className="container">
          <div className="row row-lg-2 items-center"></div>
        </div>
      </div>
      <FooterStyles className="footer5 container">
        <div className="">
          <div className="footer-bottom5">
            <div className="footer-bottomContent">
              <div className="w-100 Module Module-210">
                <div className="ModuleContent">
                  {appTheme.phone_number_hotline == null ||
                  appTheme.phone_number_hotline === "" ||
                  appTheme.is_show_icon_hotline === false ? (
                    ""
                  ) : (
                    <div className="footer-item footer-info">
                      <div className="footer-title">
                        HOTLINE
                        {/* <a style = {{display : "initial"}} href={`tel:${appTheme.contact_time_work}`}>  ( 033558744 )</a>
                      {
                        appTheme.contact_time_work != null && appTheme.contact_time_work != ""  &&  (
                           <a href={`tel:${appTheme.contact_time_work}`}>  ( {appTheme.contact_time_work} )</a>
                        )
                      } */}
                      </div>
                      <a>
                        <em
                          className="ri-phone-fill"
                          style={{ color: appTheme.color_main_1 }}
                        />
                        <strong style={{ color: appTheme.color_main_1 }}>
                          <a href={`tel:${appTheme.phone_number_hotline}`}>
                            {" "}
                            {appTheme.phone_number_hotline}
                          </a>
                        </strong>
                      </a>
                    </div>
                  )}

                  <div className="footer-item footer-social">
                    <div className="footer-title">Kết nối với chúng tôi:</div>
                    <div className="row icon-footer" style={{ opacity: 1 }}>
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
                              "https://www.tiktok.com/@" + appTheme.id_tiktok ??
                              ""
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
                  </div>
                  <div
                    className="row a"
                    style={{
                      margin: "10px auto",

                      display: "flex",
                    }}
                  >
                    <div
                      style={{
                        paddingRight: 10,
                      }}
                    >
                      {infoStore.link_google_play != null &&
                        infoStore.link_google_play !== "" && (
                          <a href={infoStore.link_google_play}>
                            <img
                              src="/img/play.png"
                              alt=""
                              style={{ height: "40px" }}
                            />
                          </a>
                        )}
                    </div>
                    <div
                      style={{
                        paddingRight: 10,
                      }}
                    >
                      {infoStore.link_apple_store != null &&
                        infoStore.link_apple_store !== "" && (
                          <a href={infoStore.link_apple_store}>
                            <img
                              src="/img/app.png"
                              alt=""
                              style={{ height: "40px" }}
                            />
                          </a>
                        )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-100 Module Module-212 ">
                <div className="ModuleContent">
                  <div className="footer-item footer-nav">
                    <div className="footer-title">Chính sách</div>
                    <ul>
                      <li>
                        <a
                          onClick={() =>
                            handlePolicyClick(appTheme.post_id_terms)
                          }
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
              <div className="w-100 Module Module-213 ">
                <div className="ModuleContent">
                  <div className="footer-item footer-nav">
                    <div className="footer-title">Về chúng tôi</div>
                    <ul>
                      <li>
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
                          Giới thiệu{" "}
                        </a>
                      </li>
                      <li>
                        <a
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
                      <li>
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
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="w-100 Module Module-214 ">
                <div className="ModuleContent">
                  <div className="footer-item">
                    <div className="footer-title">Hỗ trợ thanh toán</div>
                    <img alt="#" src="/img/hinhthucthanhtoan.png" />
                  </div>
                  <div className="footer-item">
                    <div className="footer-title">ĐỐI TÁC VẬN CHUYỂN</div>
                    <img alt="#" src="/img/doitacvanchuyen.png" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-copyright5 Module Module-215 ">
          <div
            className="ModuleContent"
            style={{
              margin: 20,
            }}
          >
            <div className="container">
              <div className="row items-center no-gutter">
                <div className="col-lg-8 col-md-6 col">
                  <div className="company-info">
                    <p>
                      <strong>
                        {appTheme.contact_individual_organization_name}
                      </strong>
                    </p>
                    <div
                      style={{
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      <span>Địa chỉ:</span> {appTheme?.contact_address}
                    </div>
                  </div>
                </div>
                <div
                  className="col-lg-4 col-md-6 col"
                  style={{ flexGrow: "1" }}
                >
                  <div className="bct">
                    {appTheme.link_ministry_of_industry_and_trade == null ||
                    appTheme.link_ministry_of_industry_and_trade === "" ||
                    appTheme.is_show_icon_ministry_of_industry_and_trade ===
                      false ? (
                      ""
                    ) : (
                      <>
                        <a href={appTheme.link_ministry_of_industry_and_trade}>
                          <img
                            alt="Đăng ký bộ công thương"
                            src="/img/bct.png"
                            style={{ width: "137px", height: "52.3333px" }}
                          />
                        </a>
                        <a
                          title="DMCA.com Protection Status"
                          className="dmca-badge"
                          style={{
                            width: "141px",
                            height: "35px",
                            marginLeft: "8px",
                            marginBottom: "7px",
                          }}
                        >
                          {" "}
                          <img
                            src="/img/badge.png"
                            alt="DMCA.com Protection Status"
                            style={{ height: "100%" }}
                          />
                        </a>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="row no-gutter">
                <div className="col-md-6">
                  <div className="copyright">
                    {appTheme.content_ministry_of_industry_and_trade !== null &&
                    appTheme.content_ministry_of_industry_and_trade !== "" ? (
                      <p>
                        <span style={{ fontSize: "13px" }}>
                          {appTheme.content_ministry_of_industry_and_trade}
                        </span>{" "}
                      </p>
                    ) : (
                      ""
                    )}

                    <p>
                      <span style={{ fontSize: "13px" }}>
                        Copyright{" "}
                        {badges.config_user_vip == null
                          ? "IKITECH.VN"
                          : badges.config_user_vip.customer_copyright ||
                            "IKITECH.VN"}
                        . All right reserved.
                      </span>{" "}
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="web-term">
                    <a
                      onClick={() => handlePolicyClick(appTheme.post_id_terms)}
                    >
                      Quy chế hoạt động website{" "}
                    </a>
                    <span>|</span>
                    <a
                      onClick={() =>
                        handlePolicyClick(appTheme.post_id_privacy_policy)
                      }
                    >
                      Chính sách bảo mật thông tin
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row show-mobile">
            {infoStore.link_google_play != null &&
              infoStore.link_google_play !== "" && (
                <a href={infoStore.link_google_play}>
                  <img src="/img/play.png" alt="" width={150} />
                </a>
              )}
            &nbsp;&nbsp;
            {infoStore.link_apple_store != null &&
              infoStore.link_apple_store !== "" && (
                <a href={infoStore.link_apple_store}>
                  <img src="/img/app.png" alt="" width={150} />
                </a>
              )}
          </div>
        </div>
      </FooterStyles>
      <div
        style={{
          paddingLeft: 10,
        }}
        className="container mobile footer-mobile5"
      >
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
      </div>
    </React.Fragment>
  );
}
