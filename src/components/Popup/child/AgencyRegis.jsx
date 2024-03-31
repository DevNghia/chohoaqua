import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { agencyActions as a } from "../../../actions/agencyAction";
import InfoPopup from "../../../pages/Agency/child/InfoPopup";
export default function AgencyRegis(props) {
  const dispatch = useDispatch();
  const [isAgree, setIsAgree] = useState(false);
  const appTheme = useSelector((state) => state.app.appTheme);
  const infoStore = useSelector((state) => state.app.infoStore);
  const badges = useSelector((state) => state.user.badges);
  const account = useSelector((state) => state.agency.account);
  const [isScreenPolicy, setIsScreenPolicy] = useState(false);

  function handleSubmit() {
    if (isAgree) dispatch(a.regisAgency());
  }
  function onNextPolicy() {
    setIsScreenPolicy(true);
  }

  function handleClosePopup() {
    props.handleClose();
  }
  useEffect(() => {
    dispatch(a.getAccountInfo());
  }, [dispatch]);

  if (isScreenPolicy == false) {
    return (
      <InfoPopup
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
        <h3>Đăng ký đại lý</h3>
        <h4>Điều khoản</h4>
        <div className="policy">
          {badges &&
          !badges.is_default_terms_agency_collaborator &&
          badges.terms_agency ? (
            <div className="info">{badges.terms_agency}</div>
          ) : (
            <>
              <span>Chính sách giá</span>
              <div className="info">
                Trên {infoStore.name}, toàn bộ sản phẩm đều có thể mua với giá
                được chiết khấu cao khi đăng ký trở thành Đại lý. Đồng thời
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
          <label htmlFor="agree">Tôi đồng ý vời điều khoản đại lý</label>
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
