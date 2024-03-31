import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { appActions } from "../../../actions/appActions";
import { userActions } from "../../../actions/userActions";
import { constants as c } from "../../../constants";
export default function Login(props) {
  const dispatch = useDispatch();
  const phone = useSelector(state => state.user.phone);
  const message = useSelector(state => state.app.message);
  const appTheme = useSelector(state => state.app.appTheme);
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  function handleBack() {
    dispatch(appActions.changePopup(c.PHONE_POPUP));
  };
  function handleForgotPass() {
    dispatch(appActions.changePopup(c.FORGOT_PASS_POPUP));
  }
  function handleInputChange(e) {
    setPassword(e.target.value);
  }
  function handleLogin() {
    dispatch(userActions.accountLogin({
      email_or_phone_number: phone,
      password
    }))
  }
  function handleEnter(e) {
    if (e.key === "Enter")
      handleLogin()
  }
  return (
    <div className="modal center">
      <div className="login-popup" onKeyDown={handleEnter}>
        <h4>Nhập mật khẩu</h4>
        <div>Vui lòng nhập mật khẩu truy cập <span>{phone}</span></div>
        <div className="input-pass">
          <input autoFocus type={showPass ? "text" : "password"} name="password" placeholder="Mật khẩu" value={password} onChange={handleInputChange} />
          <span class="show-pass" onClick={() => {
            setShowPass(!showPass)
          }}>{showPass ? "Ẩn" : "Hiện"}</span>
        </div>
        <label
          onClick={handleForgotPass}
          style={{ color: appTheme.color_main_1 }}>Quên mật khẩu</label>
        <button className="next-btn" onClick={handleLogin} style={{ background: appTheme.color_main_1 }}>
          Đăng nhập
        </button>
        <p>{message}</p>
        <button className="close-btn" onClick={props.handleClose}>
          <i className="fas fa-times"></i>
        </button>
        <button className="back-btn" onClick={handleBack}>
          <i className="fas fa-chevron-left"></i>
        </button>
      </div>
    </div>
  )
}