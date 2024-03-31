import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../../actions/userActions";
import { validateEmail } from "../../../helper";
export default function PhoneCheck(props) {
  const dispatch = useDispatch();
  const [email_or_phone_number, setPhone] = useState(phone);
  const [errMsg, setMsg] = useState("");
  const appTheme = useSelector((state) => state.app.appTheme);
  const infoStore = useSelector((state) => state.app.infoStore);
  const phone = useSelector((state) => state.user.phone);

  function handlePhoneCheck() {
    if (email_or_phone_number.length === 0) {
      setMsg("Không được để trống !");
      return;
    }
    var regExp = /[a-zA-Z]/g;
    if (regExp.test(email_or_phone_number)) {
      if (!validateEmail(email_or_phone_number)) {
        setMsg("Tài khoản không hợp lệ !");
        return;
      }
    } else {
      if (email_or_phone_number.length < 10) {
        setMsg("Số điện thoại không hợp lệ !");
        return;
      }
    }

    dispatch(
      userActions.accountCheck({
        email: email_or_phone_number,
        phone_number: email_or_phone_number,
      })
    );
  }
  function handleInputChange(e) {
    setPhone(e.target.value);
  }
  function handleEnter(e) {
    if (e.key === "Enter") handlePhoneCheck();
  }
  return (
    <div className="modal center ">
      <div className="phone-popup row" onKeyDown={handleEnter}>
        <div className="box-popup-content">
          <h4>Xin chào</h4>
          <div>Vui lòng nhập Số điện thoại hoặc email</div>
          <input
            autoFocus
            value={email_or_phone_number}
            placeholder="Số điện thoại hoặc email"
            name="email_or_phone_number"
            onChange={handleInputChange}
          />
          {errMsg && <div className="err-msg">{errMsg}</div>}
          <button
            className="next-btn"
            onClick={handlePhoneCheck}
            style={{ background: appTheme.color_main_1 }}
          >
            Tiếp tục
          </button>
          <button className="close-btn" onClick={props.handleClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div
          className="image-popup hidden-mobile"
          style={{ background: appTheme.headerBackgroudColor }}
        >
          <img src={appTheme.logo_url} alt="" />
          <div className="content">
            <h5 style={{ color: appTheme.color_main_1 }}>
              Mua sắm tại {infoStore.name}
            </h5>
            <p>Siêu ưu đãi mỗi ngày</p>
          </div>
        </div>
      </div>
    </div>
  );
}
