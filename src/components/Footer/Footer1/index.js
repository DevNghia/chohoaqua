import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { appActions } from "../../../actions/appActions";
import { userActions } from "../../../actions/userActions";
import { constants as c } from "../../../constants";
import { validURL } from "../../../helper";
import HotlineContact from "../../HotlineContact/HotlineContact5";
import "./style.css";

export default function Footer1() {
  const dispatch = useDispatch();

  const [phone, setPhone] = useState("");
  const tokenInfo = useSelector((state) => state.user.tokenInfo);
  const cartInfo = useSelector((state) => state.cart.cartInfo);
  const appTheme = useSelector((state) => state.app.appTheme);
  const infoStore = useSelector((state) => state.app.infoStore);
  const cartNumber = cartInfo ? (cartInfo.line_items ?? []).length : 0;
  const badges = useSelector((state) => state.user.badges);

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

  return (
    <React.Fragment>
      <HotlineContact />

      <div className="footer1">
        <div className="container row">
          <div>
            <div
              style={{
                whiteSpace: "pre-wrap",
              }}
            >
              {appTheme.contact_individual_organization_name}
            </div>
            <div
              style={{
                textAlign: "center",
              }}
            >
              {appTheme.title}
            </div>
            <div
              className="flex  icon-footer"
              style={{
                opacity: 1,
              }}
            >
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
                  className="p-0 m-0"
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
                <button
                  className="p-0 m-0"
                  style={{ background: "transparent" }}
                >
                  <a
                    href={
                      "https://www.youtube.com/@" + appTheme.id_youtube ?? ""
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
                    href={"https://www.tiktok.com/@" + appTheme.id_tiktok ?? ""}
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
              {appTheme.link_ministry_of_industry_and_trade == null ||
              appTheme.link_ministry_of_industry_and_trade === "" ||
              appTheme.is_show_icon_ministry_of_industry_and_trade === false ? (
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
                      style={{ height: "28px", width: "auto" }}
                    />
                  </a>
                </button>
              )}
              <button className="p-0 m-0" style={{ background: "transparent" }}>
                <a href="https://play.google.com/store/apps/details?id=com.doapp.store.vitajsc1">
                  <img
                    src="/img/play.png"
                    alt=""
                    style={{ height: "28px", width: "auto" }}
                  />
                </a>
              </button>
              <button className="p-0 m-0" style={{ background: "transparent" }}>
                <a href="https://apps.apple.com/vn/app/ch%E1%BB%A3-n%C3%B4ng-nghi%E1%BB%87p/id6479585741">
                  <img
                    src="/img/app.png"
                    alt=""
                    style={{ height: "28px", width: "auto" }}
                  />
                </a>
              </button>
            </div>
            {/* <div className="row">
              <input type="text" value={phone} onChange={handlePhoneChange} placeholder="Số điện thoại của bạn" />
              <button onClick={handlePhoneCheck}>Đăng ký</button>
            </div> */}
            <div className="row ">
              {infoStore.link_google_play != null &&
                infoStore.link_google_play !== "" &&
                validURL(infoStore.link_google_play) && (
                  <a href={infoStore.link_google_play}>
                    <img src="/img/play.png" alt="" />
                  </a>
                )}
              {infoStore.link_apple_store != null &&
                infoStore.link_apple_store !== "" &&
                validURL(infoStore.link_apple_store) && (
                  <a href={infoStore.link_apple_store}>
                    <img src="/img/app.png" alt="" />
                  </a>
                )}
            </div>
          </div>
          <div className="info">
            <div>
              <h6>Liên hệ</h6>
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
                <span>Email:</span>{" "}
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
                  <span>Thời gian làm việc:</span> {appTheme.contact_time_work}
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
            <div>
              <h6>Về chúng tôi</h6>
              <div>
                <a
                  href={
                    appTheme.post_id_about
                      ? `/tin-tuc/${appTheme.post_id_about}`
                      : "/#"
                  }
                  onClick={(e) => handlePostClick(e, appTheme.post_id_about)}
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
                  onClick={(e) => handlePostClick(e, appTheme.post_id_terms)}
                >
                  Tham gia
                </a>
              </div>
            </div>
            <div>
              <h6>Tài khoản của tôi</h6>
              {tokenInfo ? (
                <div
                  style={{
                    opacity: "0.35",
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
                    opacity: "0.35",
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
              {/* <h6>Đăng ký bán hàng</h6>
              <button onClick={() => { window.open("https://ikitech.vn/", '_blank').focus(); }}>Đăng ký ngay</button>
             */}
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
            href="/tai-khoan"
            onClick={handleAccountClick}
            style={{ color: appTheme.color_main_1 }}
          >
            <i className="fas fa-user"></i>
            Cá nhân
          </a>
        </div>
      </div>
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
        {appTheme.content_ministry_of_industry_and_trade !== null &&
        appTheme.content_ministry_of_industry_and_trade !== "" ? (
          <p style={{ marginBottom: "15px" }}>
            <span style={{ fontSize: "15px" }}>
              {appTheme.content_ministry_of_industry_and_trade}
            </span>{" "}
          </p>
        ) : (
          ""
        )}
        <span style={{ fontSize: "13px" }}>
          {badges.config_user_vip == null
            ? "IKITECH.VN"
            : badges.config_user_vip.customer_copyright || "IKITECH.VN"}
        </span>{" "}
      </div>
    </React.Fragment>
  );
}
