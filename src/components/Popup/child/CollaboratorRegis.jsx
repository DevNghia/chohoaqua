import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { collaboratorActions as a } from "../../../actions/collaboratorActions";
import InfoCTVPopup from "../../../pages/Collaborator/child/InfoCTVPopup";

export default function CollaboratorRegis(props) {
  const dispatch = useDispatch();
  const [isAgree, setIsAgree] = useState(false);
  const appTheme = useSelector((state) => state.app.appTheme);
  const infoStore = useSelector((state) => state.app.infoStore);
  const badges = useSelector((state) => state.user.badges);
  const account = useSelector((state) => state.collaborator.account);
  const [customClass, setcustomClass] = useState("center");
  const [isScreenPolicy, setIsScreenPolicy] = useState(false);

  function handleClosePopup() {
    props.handleClose();
  }
  function handleSubmit() {
    if (isAgree) dispatch(a.regisCollaborator());
  }
  function onNextPolicy() {
    setIsScreenPolicy(true);
  }

  useEffect(() => {
    dispatch(a.getAccountInfo());
  }, [dispatch]);

  console.log("CollaboratorPayment ~ account", account);

  if (isScreenPolicy == false) {
    return (
      <InfoCTVPopup
        customClass={"center"}
        info={account}
        onClose={handleClosePopup}
        isReg={true}
        onNext={onNextPolicy}
      />
    );
  }

  return (
    <div className="modal center">
      <div className="collaborator-regis-popup">
        <h3>Đăng ký cộng tác viên</h3>
        <h4>Điều khoản</h4>
        <div className="policy">
          {badges &&
          !badges.is_default_terms_agency_collaborator &&
          badges.terms_collaborator ? (
            <div className="info">{badges.terms_collaborator}</div>
          ) : (
            <>
              <span>Chính sách giá</span>
              <div className="info">
                Trên {infoStore.name}, toàn bộ sản phẩm đều có thể mua với giá
                được chiết khấu cao khi đăng ký trở thành Người Bán. Đồng thời
                Người Bán có thể nhận hoa hồng khi giới thiệu thành công cho bạn
                bè/ bên thứ ba mua sản phẩm trên {infoStore.name}. Bằng việc
                minh bạch thông tin sản phẩm và hướng dẫn chi tiết,{" "}
                {infoStore.name} giúp người dùng tìm được sản phẩm tốt nhất cho
                mình và với những ai đam mê kinh doanh, {infoStore.name} sẽ giúp
                bạn vận hành, tối ưu toàn diện công việc kinh doanh của mình.
              </div>
            </>
          )}
        </div>
        <div className="row">
          <input
            id="agree"
            type="checkbox"
            checked={isAgree}
            onChange={() => setIsAgree(!isAgree)}
          />
          <label htmlFor="agree">Tôi đồng ý vời điều khoản cộng tác viên</label>
        </div>
        <button
          className="regis"
          style={{
            background: isAgree ? appTheme.color_main_1 : "rgb(184, 184, 184)",
          }}
          onClick={handleSubmit}
        >
          Xác nhận
        </button>
        <button className="close-btn" onClick={props.handleClose}>
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
  );
}
