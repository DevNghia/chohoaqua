import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../actions/userActions";
import { constants as c } from "../../constants";
import { appActions } from "../../actions/appActions";

import PageLoading from "../../components/PageLoading";

const Header = React.lazy(() => import("../../components/Header"));
const Footer = React.lazy(() => import("../../components/Footer"));

function AccountPage() {
  const appTheme = useSelector((state) => state.app.appTheme);

  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);
  const badges = useSelector((state) => state.user.badges);
  const status = useSelector((state) => state.user.status);

  const [currentActive, setCurrentActive] = React.useState("");
  function handleLogout() {
    dispatch(userActions.accountLogout());
    window.location.href = "/";
  }
  function handleShowCollaboratorRegisForm(e) {
    e.preventDefault();
    dispatch(appActions.changePopup(c.COLLABORATOR_REGIS_POPUP));
  }
  function handleShowAgencyRegisForm(e) {
    e.preventDefault();
    dispatch(appActions.changePopup(c.AGENCY_REGIS_POPUP));
  }
  function handleShowProfile() {
    onClickOption();
    dispatch(appActions.changePopup(c.PROFILE_POPUP));
  }
  function onClickOption() {
    setCurrentActive("");
  }
  useEffect(() => {
    if (status === c.LOADING) dispatch(userActions.getUserProfile());
  });
  return (
    <React.Fragment>
      {/* <Header /> */}
      {status === c.SUCCESS ? (
        <React.Fragment>
          <div className="account-page">
            <div className="account-info" style={{ position: "unset" }}>
              <div className="row">
                <div className="avt">{profile.name[0]}</div>
                <div style={{ marginLeft: "1em" }}>
                  <div className="name">{profile.name}</div>
                  <div className="email">{profile.email}</div>
                  <div className="phone">{profile.phone_number}</div>
                </div>
              </div>
            </div>
            {/* <div style={{ marginTop: "0.5em" }}>
              <div className="link row">
                <img src="/img/coin.png" alt="" />
                <div style={{ marginLeft: "0.75em" }}>
                  <div>Xu tích lũy</div>
                  <div style={{ marginTop: "4px" }}>
                    Bạn đang có <span>{profile.points} </span> điểm
                  </div>
                </div>
              </div>
              <a href="/ma-giam-gia" className="link row">
                <img src="/img/voucher.svg" alt="" />
                <div style={{ marginLeft: "0.75em" }}>Mã giảm giá</div>
              </a>
            </div> */}
            {/* <div style={{ marginTop: "0.5em" }}>
              <a href="/dia-chi" className="link row">
                <i className="fas fa-address-book"></i>
                <div style={{ marginLeft: "0.75em" }}>Sổ địa chỉ</div>
              </a>
              <a href="/don-hang" className="link row">
                <i className="fas fa-clipboard"></i>
                <div style={{ marginLeft: "0.75em" }}>Quản lý đơn hàng</div>
              </a>
              <a href="/danh-gia-cua-toi" className="link row">
                <i className="fas fa-pen-square"></i>
                <div style={{ marginLeft: "0.75em" }}>Đánh giá của tôi</div>
              </a>
            </div>
            <div style={{ marginTop: "0.5em" }}>
              <a href="/yeu-thich" className="link row">
                <i className="fas fa-heart"></i>
                <div style={{ marginLeft: "0.75em" }}>Sản phẩm yêu thích</div>
              </a>
              <div className="link row">
                <i className="fas fa-tag"></i>
                <div style={{ marginLeft: "0.75em" }}>Mua lại</div>
              </div>
            </div> */}

            <div style={{ marginTop: "0.5em" }}>
              <a href="/don-hang" className="link row">
                <i
                  class="fas fa-money-bill icon-user"
                  style={{ color: appTheme.color_main_1 }}
                ></i>{" "}
                <div style={{ marginLeft: "0.75em" }}>Đơn hàng của tôi</div>
              </a>
              <a href="/san-pham-da-mua" className="link row">
                <i
                  class="fas fa-shopping-cart icon-user"
                  style={{ color: appTheme.color_main_1 }}
                ></i>{" "}
                <div style={{ marginLeft: "0.75em" }}>Sản phẩm đã mua</div>
              </a>
              <a href="/dia-chi" className="link row">
                <i
                  class="fas fa-map-marker icon-user"
                  style={{ color: appTheme.color_main_1 }}
                ></i>{" "}
                <div style={{ marginLeft: "0.75em" }}>Địa chỉ nhận hàng</div>
              </a>
              <a href="/danh-gia-cua-toi" className="link row">
                <i
                  class="fas fa-star icon-user"
                  style={{ color: appTheme.color_main_1 }}
                ></i>{" "}
                <div style={{ marginLeft: "0.75em" }}> Đánh giá của tôi</div>
              </a>

              <a href="/yeu-thich" className="link row">
                <i
                  class="far fa-grin-hearts icon-user"
                  style={{ color: appTheme.color_main_1 }}
                ></i>{" "}
                <div style={{ marginLeft: "0.75em" }}> Sản phẩm yêu thích</div>
              </a>
              {!profile.is_agency && (
                <div>
                  {profile.is_collaborator ||
                  badges.collaborator_register_request != null ? (
                    <a href="/cong-tac-vien" className="link row">
                      <i
                        class="fas fa-hand-holding-medical icon-user"
                        style={{ color: appTheme.color_main_1 }}
                      ></i>{" "}
                      <div style={{ marginLeft: "0.75em" }}>
                        {" "}
                        Ví cộng tác viên
                      </div>
                    </a>
                  ) : (
                    <a
                      onClick={handleShowCollaboratorRegisForm}
                      className="link row"
                      href="/cong-tac-vien"
                    >
                      <i
                        class="fas fa-hands-helping icon-user"
                        style={{ color: appTheme.color_main_1 }}
                      ></i>{" "}
                      <div style={{ marginLeft: "0.75em" }}>
                        {" "}
                        Đăng ký cộng tác viên
                      </div>
                    </a>
                  )}
                </div>
              )}

              {profile.is_agency && badges.status_collaborator != 1 && (
                <a href="/dai-ly" className="link row">
                  <i
                    class="fas fa-hotel icon-user"
                    style={{ color: appTheme.color_main_1 }}
                  ></i>{" "}
                  <div style={{ marginLeft: "0.75em" }}> Đại lý</div>
                </a>
              )}
              {!profile.is_agency && badges.status_collaborator != 1 && (
                <a
                  onClick={handleShowAgencyRegisForm}
                  href="/dai-ly"
                  className="link row"
                >
                  <i
                    class="fas fa-hotel icon-user"
                    style={{ color: appTheme.color_main_1 }}
                  ></i>{" "}
                  <div style={{ marginLeft: "0.75em" }}>
                    {" "}
                    Đăng ký làm đại lý
                  </div>
                </a>
              )}
              <a href="/xu-tich-luy" className="link row">
                <i
                  class="fab fa-bitcoin icon-user"
                  style={{ color: appTheme.color_main_1 }}
                ></i>{" "}
                <div style={{ marginLeft: "0.75em" }}> Xu tích lũy</div>
              </a>
              <a onClick={handleShowProfile} className="link row">
                <i
                  class="fas fa-edit icon-user"
                  style={{ color: appTheme.color_main_1 }}
                ></i>{" "}
                <div style={{ marginLeft: "0.75em" }}> Cập nhật thông tin</div>
              </a>
            </div>
            <button onClick={handleLogout}>Đăng xuất</button>
          </div>
          <Footer />
        </React.Fragment>
      ) : null}
      {/* <Footer /> */}
    </React.Fragment>
  );
}
export default AccountPage;
