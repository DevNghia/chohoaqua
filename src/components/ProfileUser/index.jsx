import { Link } from "react-router-dom";
import { userActions } from "../../actions/userActions";
import { constants as c } from "../../constants";
import { appActions } from "../../actions/appActions";
import React from "react";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
function Index(props) {
  const dispatch = useDispatch();
  const badges = useSelector((state) => state.user.badges);
  const profile = useSelector((state) => state.user.profile);
  const [currentActive, setCurrentActive] = React.useState("");
  const tokenInfo = useSelector((state) => state.user.tokenInfo);
  const appTheme = useSelector((state) => state.app.appTheme);
  const [showOption, setShowOption] = useState(false);
  var accountInfoStyle = props.accountInfoStyle ? props.accountInfoStyle : {};
  function handleToggleActive(type) {
    if (currentActive === type) {
      setCurrentActive("");
      return;
    }
    setCurrentActive(type);
  }
  function handleShowCollaboratorRegisForm(e) {
    e.preventDefault();
    dispatch(appActions.changePopup(c.COLLABORATOR_REGIS_POPUP));
  }
  function handleShowPhonePopup() {
    dispatch(appActions.changePopup(c.PHONE_POPUP));
  }
  function handleShowAgencyRegisForm(e) {
    e.preventDefault();
    dispatch(appActions.changePopup(c.AGENCY_REGIS_POPUP));
  }
  function handleLogout() {
    dispatch(userActions.accountLogout());
  }
  function handleShowProfile() {
    onClickOption();
    dispatch(appActions.changePopup(c.PROFILE_POPUP));
  }
  function onChangeShowButton(value) {
    if (value == true) {
      setCurrentActive("account");
    } else {
      setCurrentActive("");
    }

    setShowOption(value);
  }
  function handleShowModalAddReferralPhone(type) {
    dispatch({
      type: c.CHANGE_POPUP,
      popupType: c.AUTOHIDE_POPUP,
      messageInfo: `Bạn cần có người giới thiệu để đăng ký làm ${
        type === "ctv" ? "ctv" : "đại lý"
      }`,
    });
  }

  function onClickOption() {
    setCurrentActive("");
  }

  return (
    <div
      class="user"
      style={{
        position: "relative",
      }}
      onMouseEnter={() => {
        onChangeShowButton(true);
      }}
      onMouseLeave={() => {
        onChangeShowButton(false);
      }}
    >
      {tokenInfo ? (
        <div
          className="account-info header-dropdown"
          style={{
            marginRight: "12px",
            ...accountInfoStyle,
          }}
        >
          <button
            style={{ cursor: "pointer", ...props.styleElmUserList }}
            onClick={() => handleToggleActive("account")}
            className="row user-list"
          >
            <a title="Tài khoản của bạn">
              <i
                class={`${
                  props.header12 ? "fa fa-user" : "fa fa-user-circle-o"
                }`}
                style={{
                  fontSize: props.header12 ? "20px" : "27px",
                  color:
                    props.colorIcon ?? `${props.header11 ? "#000000" : "grey"}`,
                  ...props.styleIcon,
                }}
              ></i>
            </a>
            <div className="name-user" style={{ marginLeft: "10px" }}>
              <h5
                className="account"
                style={{
                  color:
                    props.colorText ?? `${props.header11 ? "#000000" : "grey"}`,
                }}
              >
                Tài khoản
              </h5>
              <div
                className="row"
                style={{
                  justifyContent: "center",
                }}
              >
                <h5
                  style={{
                    whiteSpace: "nowrap",
                    color:
                      props.colorText ??
                      `${props.header11 ? "#000000" : "grey"}`,
                  }}
                >
                  {" "}
                  {profile.name}
                </h5>
                <i
                  style={{
                    marginLeft: "3px",
                    color: props.colorIcon ?? null,
                    ...props.styleIcon,
                  }}
                  class="fas fa-caret-down"
                ></i>
              </div>
            </div>
          </button>
          <div
            className={
              currentActive === "account"
                ? " menu dropdown active"
                : "menu dropdown"
            }
            style={{
              visibility: currentActive === "account" ? "visible" : "hidden",
            }}
          >
            <ul className="nav-list-user">
              <li onClick={onClickOption}>
                <i
                  class="fas fa-money-bill icon-user"
                  style={{ color: appTheme.color_main_1 }}
                ></i>
                <Link to="/don-hang">Đơn hàng của tôi</Link>
              </li>
              <li onClick={onClickOption}>
                <i
                  class="fas fa-shopping-cart icon-user"
                  style={{ color: appTheme.color_main_1 }}
                ></i>
                <Link to="/san-pham-da-mua">Sản phẩm đã mua</Link>
              </li>
              <li onClick={onClickOption}>
                <i
                  class="fas fa-map-marker icon-user"
                  style={{ color: appTheme.color_main_1 }}
                ></i>
                <Link to="/dia-chi">Địa chỉ nhận hàng</Link>
              </li>
              {profile.is_agency ||
              profile.is_general_agency ||
              profile.is_agent_have_general_agency ? null : (
                <Link to="/danh-gia-cua-toi">
                  <li onClick={onClickOption}>
                    <i
                      class="fas fa-star icon-user"
                      style={{ color: appTheme.color_main_1 }}
                    ></i>
                    Đánh giá của tôi
                  </li>
                </Link>
              )}

              <Link to="/ma-gioi-thieu">
                <li onClick={onClickOption}>
                  <i
                    class="fas fa-share icon-user"
                    style={{ color: appTheme.color_main_1 }}
                  ></i>
                  Mã giới thiệu
                </li>
              </Link>
              <Link to="/yeu-thich">
                <li onClick={onClickOption}>
                  <i
                    class="far fa-grin-hearts icon-user"
                    style={{ color: appTheme.color_main_1 }}
                  ></i>
                  Sản phẩm yêu thích
                </li>
              </Link>

              {!profile.is_agency &&
                !profile.is_general_agency &&
                !profile.is_agent_have_general_agency &&
                badges.agency_register_request?.status != 0 &&
                badges.agency_register_request?.status != 3 && (
                  <div>
                    {profile.is_collaborator ||
                    badges.collaborator_register_request != null ? (
                      <>
                        {/* <Link onClick={handleShowAgencyRegisForm} to="/dai-ly">
                          <li onClick={onClickOption}>
                            <i
                              class="fas fa-hotel icon-user"
                              style={{ color: appTheme.color_main_1 }}
                            ></i>
                            Đăng ký làm đại lý
                          </li>
                        </Link> */}
                        <Link to="/cong-tac-vien">
                          <li onClick={onClickOption}>
                            <i
                              class="fas fa-hand-holding-medical icon-user"
                              style={{ color: appTheme.color_main_1 }}
                            ></i>
                            Ví cộng tác viên
                          </li>
                        </Link>
                      </>
                    ) : (
                      <>
                        {badges.required_agency_ctv_has_referral_code &&
                        profile.is_agency === false &&
                        profile.is_collaborator === false &&
                        // profile.is_agent_have_general_agency === false &&
                        !profile.referral_phone_number ? (
                          <div
                            style={{
                              color: "#323c42",
                            }}
                          >
                            <li
                              onClick={() =>
                                handleShowModalAddReferralPhone("ctv")
                              }
                            >
                              <i
                                class="fas fa-hands-helping icon-user"
                                style={{ color: appTheme.color_main_1 }}
                              ></i>
                              Đăng ký cộng tác viên
                            </li>
                          </div>
                        ) : (
                          <Link
                            onClick={handleShowCollaboratorRegisForm}
                            to="/cong-tac-vien"
                          >
                            <li onClick={onClickOption}>
                              <i
                                class="fas fa-hands-helping icon-user"
                                style={{ color: appTheme.color_main_1 }}
                              ></i>
                              Đăng ký cộng tác viên
                            </li>
                          </Link>
                        )}
                      </>
                    )}
                  </div>
                )}

              {((profile.is_agency && badges.status_collaborator != 1) ||
                (profile.is_general_agency &&
                  badges.status_collaborator != 1) ||
                (profile.is_agent_have_general_agency &&
                  badges.status_collaborator != 1)) && (
                <Link to="/dai-ly">
                  <li onClick={onClickOption}>
                    <i
                      class="fas fa-hotel icon-user"
                      style={{ color: appTheme.color_main_1 }}
                    ></i>
                    Đại lý
                  </li>
                </Link>
              )}

              {!profile.is_agency &&
                !profile.is_general_agency &&
                !profile.is_agent_have_general_agency &&
                badges.status_collaborator != 1 &&
                badges.collaborator_register_request?.status != 0 &&
                badges.collaborator_register_request?.status != 3 && (
                  <>
                    {badges.required_agency_ctv_has_referral_code &&
                    profile.is_agency === false &&
                    profile.is_collaborator === false &&
                    !profile.referral_phone_number ? (
                      <div
                        style={{
                          color: "#323c42",
                        }}
                      >
                        <li
                          onClick={() =>
                            handleShowModalAddReferralPhone("agency")
                          }
                        >
                          <i
                            class="fas fa-hotel icon-user"
                            style={{ color: appTheme.color_main_1 }}
                          ></i>
                          Đăng ký làm đại lý
                        </li>
                      </div>
                    ) : (
                      <Link onClick={handleShowAgencyRegisForm} to="/dai-ly">
                        <li onClick={onClickOption}>
                          <i
                            class="fas fa-hotel icon-user"
                            style={{ color: appTheme.color_main_1 }}
                          ></i>
                          Đăng ký làm đại lý
                        </li>
                      </Link>
                    )}
                  </>
                )}
              <Link to="/xu-tich-luy">
                <li onClick={onClickOption}>
                  <i
                    class="fab fa-bitcoin icon-user"
                    style={{ color: appTheme.color_main_1 }}
                  ></i>
                  Xu tích lũy
                </li>
              </Link>
              <a>
                <li
                  // style={{ fontSize: "13px", cursor: "pointer" }}
                  onClick={handleShowProfile}
                >
                  <i
                    class="fas fa-edit icon-user"
                    style={{ color: appTheme.color_main_1 }}
                  ></i>
                  Cập nhật thông tin
                </li>
              </a>
              <a>
                <li
                  // style={{ fontSize: "13px", cursor: "pointer" }}
                  onClick={handleLogout}
                >
                  <i
                    class="fas fa-sign-out-alt icon-user"
                    style={{ color: appTheme.color_main_1 }}
                  ></i>
                  Thoát tài khoản
                </li>
              </a>
            </ul>
          </div>
        </div>
      ) : (
        <div
          className="login-user-name"
          style={
            props.styleObj
              ? props.styleObj
              : {
                  cursor: "pointer",
                }
          }
        >
          <div className=" hidden-mobile login">
            <div
              className="row"
              style={{
                alignItems: "center",
              }}
            >
              {props.hideIcon != true && (
                <div
                  style={props.stylelmLogin}
                  className="login"
                  onClick={handleShowPhonePopup}
                >
                  <i
                    className={
                      props.header12 ? "fa fa-user" : "fas fa-user-circle"
                    }
                    style={{
                      fontSize: props.header12 ? "20px" : "27px",
                      marginRight: 10,
                      color:
                        props.colorIcon ??
                        `${props.header11 ? "#000000" : "grey"}`,
                      ...props.styleIcon,
                    }}
                  ></i>
                </div>
              )}
              <div style={props.elmContainerLogin} className="container-login">
                <div className="row box-login">
                  <button
                    style={{ paddingRight: "4px" }}
                    onClick={handleShowPhonePopup}
                    className="item-about about-5 about-cart cta-gio-hang"
                  >
                    <div class="about__box-contentt">
                      <h5
                        style={{
                          fontSize: "12px",
                          cursor: "pointer",
                          color:
                            props.colorText ??
                            `${props.header11 ? "#000000" : "grey"}`,
                          whiteSpace: props.header12 ? "nowrap" : "initial",
                        }}
                        class="mb-0 title"
                      >
                        Đăng nhập / Đăng ký
                      </h5>
                    </div>
                  </button>
                </div>
                {/* <h5
                  onClick={handleShowPhonePopup}
                  style={{
                    fontSize: "12px",
                    padding: "0",
                    cursor: "pointer",
                    color: props.colorText ?? null
                  }}
                  className="user-login"
                >
                  Tài khoản
                  <i
                    style={{
                      marginLeft: "10px",
                      color: props.colorText ?? null
                    }}
                    class="fas fa-angle-down"
                  ></i>
                </h5> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Index;
