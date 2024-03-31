import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { appActions } from "../../actions/appActions";
import { userActions } from "../../actions/userActions";
import { constants as c } from "../../constants";

export default function Footer1() {
  const dispatch = useDispatch();

  const [phone, setPhone] = useState("");
  const tokenInfo = useSelector((state) => state.user.tokenInfo);
  const cartInfo = useSelector((state) => state.cart.cartInfo);
  const appTheme = useSelector((state) => state.app.appTheme);
  const infoStore = useSelector((state) => state.app.infoStore);
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
  return (
    <React.Fragment>
      <div className="top-footer1">
        <div className="container row">
          <div
            className="policy-card"
            onClick={() => handlePolicyClick(appTheme.post_id_terms)}
          >
            <i
              className="far fa-clipboard"
              style={{ color: appTheme.color_main_1 }}
            ></i>
            Quy chế hoạt động website
          </div>
          <div
            className="policy-card"
            onClick={() => handlePolicyClick(appTheme.post_id_return_policy)}
          >
            <i
              className="fas fa-undo"
              style={{ color: appTheme.color_main_1 }}
            ></i>
            Chính sách đổi trả và hoàn tiền
          </div>
          <div
            className="policy-card"
            onClick={() => handlePolicyClick(appTheme.post_id_support_policy)}
          >
            <i
              className="far fa-life-ring"
              style={{ color: appTheme.color_main_1 }}
            ></i>
            Chính sách bảo hành
          </div>
          <div
            className="policy-card"
            onClick={() => handlePolicyClick(appTheme.post_id_privacy_policy)}
          >
            <i
              className="fas fa-shield-alt"
              style={{ color: appTheme.color_main_1 }}
            ></i>
            Chính sách bảo mật thông tin
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
