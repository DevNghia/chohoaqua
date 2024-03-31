import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { appActions } from "../../../actions/appActions";
import { userActions } from "../../../actions/userActions";
import { constants as c } from "../../../constants";
import { validURL } from "../../../helper";
import HotlineContact from "../../HotlineContact/HotlineContact5";
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

  console.log(infoStore);
  return (
    <React.Fragment>
      <HotlineContact />

      <footer className="footer6">
        <div
          className="footer-subscription6"
          style={{ backgroundImage: "url(/img/home_sm_img.webp)" }}
        >
          <div className="container">
            <div className="row col-md-8 col-7 items-center">
              <div class="link-shop-map text-center">
                <a href="#">
                  Mời bạn xem địa chỉ hệ thống cửa hàng của chúng tôi
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="footer-bottom6">
            <div className="row row-2 row-lg-4" style={{ flexWrap: "wrap" }}>
              <div className="w-100 Module Module-210  col-lg-3 col-md-6">
                <div className="ModuleContent">
                  <div className="footer-item footer-social">
                    <div className="footer-title">Kết nối với chúng tôi:</div>
                    <div className="flex  icon-footer" style={{ opacity: 1 }}>
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
                  <div className="row a app-logo" style={{ marginTop: "10px" }}>
                    {infoStore.link_google_play != null &&
                      infoStore.link_google_play !== "" &&
                      validURL(infoStore.link_google_play) && (
                        <a href={infoStore.link_google_play}>
                          <img
                            src="/img/play.png"
                            alt=""
                            style={{ maxWidth: "100%", height: "35px" }}
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
                            style={{ maxWidth: "100%", height: "35px" }}
                          />
                        </a>
                      )}
                  </div>
                </div>
              </div>
              <div className="w-100 Module Module-212 col-lg-3 col-md-6">
                <div className="ModuleContent">
                  <div className="footer-item footer-nav">
                    <div className="footer-title">
                      Chính sách quy định chung
                    </div>
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
              <div className="w-100 Module Module- col-lg-3 col-md-6">
                <div className="ModuleContent">
                  <div className="footer-item footer-nav">
                    <div className="footer-title">Liên hệ</div>
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
              <div className="w-100 Module Module-214 col-lg-3 col-md-6">
                <div className="ModuleContent">
                  <div className="footer-item">
                    <div
                      className="footer-title"
                      style={{ marginBottom: "0px" }}
                    ></div>

                    {appTheme.id_facebook == null ||
                    appTheme.id_facebook === "" ||
                    appTheme.is_show_icon_facebook === false ? (
                      ""
                    ) : (
                      <iframe
                        src={`https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2F${appTheme.id_facebook}&tabs&width=300&height=130&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=2694191920841488`}
                        style={{ border: "none", overflow: "hidden" }}
                        scrolling="no"
                        allowFullScreen={true}
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                        width={300}
                        height={130}
                        frameBorder={0}
                      />
                    )}
                  </div>
                  <div className="footer-item">
                    <div className="footer-title"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-copyright6 Module Module-215">
          <div className="ModuleContent">
            <div className="container">
              <div className="row items-center no-gutter">
                <div className="col-lg-8 col-md-6 col-6">
                  <div className="company-info">
                    <div className="footer-title">
                      Thông tin chủ sở hữu website
                    </div>
                    <p>
                      {appTheme.contact_phone_number != null &&
                        appTheme.contact_phone_number !== "" && (
                          // " - " + appTheme.contact_phone_number}
                          <a href={`tel:${appTheme.contact_phone_number}`}>
                            {" "}
                            {appTheme.contact_phone_number}
                          </a>
                        )}
                      {appTheme.contact_email != null &&
                        appTheme.contact_email !== "" && (
                          // " - " + appTheme.contact_email}
                          <a href={`mailto:${appTheme.contact_email}`}>
                            {" "}
                            - {appTheme.contact_email}
                          </a>
                        )}
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
                <div class="col-lg-4 col-md-6 col" style={{ "flex-grow": "1" }}>
                  {appTheme.link_ministry_of_industry_and_trade == null ||
                  appTheme.link_ministry_of_industry_and_trade === "" ||
                  appTheme.is_show_icon_ministry_of_industry_and_trade ===
                    false ? (
                    ""
                  ) : (
                    <div class="bct">
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
                    </div>
                  )}
                </div>
                {/* <div className="col-lg-4 col-md-6 col-6">
                  <div className="bct">
                    <a
                      title="DMCA.com Protection Status"
                      className="dmca-badge"
                    >
                      {" "}
                      <img
                        src="/img/badge.png"
                        alt="DMCA.com Protection Status"
                      />
                    </a>
                  </div>
                </div> */}
              </div>
              <div
                className="row no-gutter"
                style={{ justifyContent: "space-between" }}
              >
                <div className="col-6">
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
                <div className="col-6">
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
              infoStore.link_google_play !== "" &&
              validURL(infoStore.link_google_play) && (
                <a className="col-6" href={infoStore.link_google_play}>
                  <img src="/img/play.png" alt="" />
                </a>
              )}
            {infoStore.link_apple_store != null &&
              infoStore.link_apple_store !== "" &&
              validURL(infoStore.link_apple_store) && (
                <a className="col-6" href={infoStore.link_apple_store}>
                  <img src="/img/app.png" alt="" />
                </a>
              )}
          </div>
        </div>
        <hr class="hr-1" />
        <hr class="hr-2" />
        <hr class="hr-3" />
      </footer>
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
