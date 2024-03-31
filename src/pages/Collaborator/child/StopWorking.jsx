import { constants as c } from "../../../constants";
import { useDispatch, useSelector } from "react-redux";
import { appActions } from "../../../actions/appActions";

export default function StopWorking(props) {
  const dispatch = useDispatch();
  const appTheme = useSelector((state) => state.app.appTheme);

  function handleShowCollaboratorRegisForm(e) {
    e.preventDefault();
    dispatch(appActions.changePopup(c.COLLABORATOR_REGIS_POPUP));
  }

  const collaborator_register_request =
    props.badges?.collaborator_register_request;
  if (
    collaborator_register_request != null &&
    collaborator_register_request.has_request == true
  ) {
    if (collaborator_register_request.status == 0) {
      return (
        <div className="stop-working">
          <div>
            <img
              style={{
                height: 100,
              }}
              src="/img/ctv/talk.png"
            ></img>
            <h3>Đang chờ duyệt !</h3>
            <br />
            <h3>Yêu cầu làm cộng tác viên đang chờ cửa hàng xử lý.</h3>
          </div>
        </div>
      );
    }

    if (collaborator_register_request.status == 1) {
      return (
        <div className="stop-working">
          <div>
            <img
              style={{
                height: 100,
              }}
              src="/img/ctv/reject.png"
            ></img>
            <h3>Yêu cầu của bạn không được chấp nhận !</h3>
            <br />
            <h3>{collaborator_register_request.note}</h3>
            <br />
            <button
              onClick={handleShowCollaboratorRegisForm}
              className="submit-btn"
              style={{
                background: appTheme.color_main_1,
                padding: "8px 20px",
                fontSize: "16px",
                color: "white",
                borderRadius: "0.25em",
                marginTop: "1em",
                fontWeight: "500",
              }}
            >
              Gửi lại
            </button>
          </div>
        </div>
      );
    }

    if (collaborator_register_request.status == 3) {
      return (
        <div className="stop-working">
          <div>
            <img
              style={{
                height: 100,
              }}
              src="/img/ctv/talk.png"
            ></img>
            <h3>Đang chờ duyệt !</h3>
            <br />
            <h3>Yêu cầu của bạn đã được gửi lại và đang chờ xử lý.</h3>
          </div>
        </div>
      );
    }
  }

  return (
    <div className="stop-working">
      <div>
        <h3>Đang chờ duyệt !</h3>
        <h3>Bạn chưa được duyệt làm CTV.</h3>
      </div>
    </div>
  );
}
