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
  const point_history = useSelector((state) => state.user.point_history);

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
    if (point_history.status === c.LOADING)
      dispatch(userActions.getUserPointsHistory());
  });

  console.log(point_history);
  var references = [];
  if (point_history.data && point_history.data?.length > 0) {
    references = point_history?.data.filter(
      (v, i) => v.type === "REFERRAL_CUSTOMER"
    );
  }

  console.log(references);
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
                  <div className="name">Mã giới thiệu</div>
                  <div className="phone">{profile.phone_number}</div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: "0.5em" }}>
              <div className="link row">
                <div style={{ marginLeft: "0.75em", fontWeight: "500" }}>
                  Danh sách đã giới thiệu
                </div>
              </div>
            </div>
            {references.map((v, i) => {
              return (
                <div style={{ marginTop: "0.5em" }}>
                  <a className="link row">
                    <div style={{ marginLeft: "0.75em" }}>{v.content}</div>
                  </a>
                </div>
              );
            })}
          </div>
          <Footer />
        </React.Fragment>
      ) : null}
      {/* <Footer /> */}
    </React.Fragment>
  );
}
export default AccountPage;
