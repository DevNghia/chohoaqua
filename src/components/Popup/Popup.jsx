import { useSelector, useDispatch } from "react-redux";
import Login from "./child/Login";
import VoucherDetailPopup from "./child/VoucherDetailPopup";
import ComboDetailPopup from "./child/ComboDetailPopup";
import Calculate from "./child/Calculate";

import BonusProductDetailPopup from "./child/BonusProductDetailPopup";
import BonusProductLadderDetailPopup from "./child/BonusProductLadderDetailPopup";

import OTPInput from "./child/OTPInput";
import Register from "./child/Register";
import RattingPopup from "./child/Ratting";
import PhoneCheck from "./child/PhoneCheck";
import ForgotPass from "./child/ForgotPass";
import AutoHidePopup from "./child/AutoHide";
import OrderSuccess from "./child/OrderSuccess";
import MessagePopup from "./child/MessagePopup";
import PopupMain from "./child/PopupMain";

import { constants as c } from "../../constants";
import CollaboratorRegis from "./child/CollaboratorRegis";
import AgencyRegis from "./child/AgencyRegis";
import { appActions as a } from "../../actions/appActions";
import ProfilePopup from "./child/ProfilePopup";
function Popup() {
  const dispatch = useDispatch();
  function handleClosePopup() {
    dispatch(a.changePopup(c.NO_POPUP));
  }
  const popups = {
    [c.NO_POPUP]: <div></div>,
    [c.MESSAGE_POPUP]: <MessagePopup />,
    [c.AUTOHIDE_POPUP]: <AutoHidePopup />,
    [c.LOGIN_POPUP]: <Login handleClose={handleClosePopup} />,
    [c.VOUCHER_DETAIL_POPUP]: (
      <VoucherDetailPopup handleClose={handleClosePopup} />
    ),
    [c.COMBO_DETAIL_POPUP]: <ComboDetailPopup handleClose={handleClosePopup} />,
    [c.BONUS_PRODUCT_DETAIL_POPUP]: (
      <BonusProductDetailPopup handleClose={handleClosePopup} />
    ),
    [c.BONUS_PRODUCT_LADDER_DETAIL_POPUP]: (
      <BonusProductLadderDetailPopup handleClose={handleClosePopup} />
    ),

    [c.CALCULATE_PRICE]: <Calculate handleClose={handleClosePopup} />,

    [c.OTP_POPUP]: <OTPInput handleClose={handleClosePopup} />,
    [c.REGIS_POPUP]: <Register handleClose={handleClosePopup} />,
    [c.PHONE_POPUP]: <PhoneCheck handleClose={handleClosePopup} />,
    [c.ORDER_POPUP]: <OrderSuccess handleClose={handleClosePopup} />,
    [c.RATTING_POPUP]: <RattingPopup handleClose={handleClosePopup} />,
    [c.PROFILE_POPUP]: <ProfilePopup handleClose={handleClosePopup} />,
    [c.FORGOT_PASS_POPUP]: <ForgotPass handleClose={handleClosePopup} />,
    [c.COLLABORATOR_REGIS_POPUP]: (
      <CollaboratorRegis handleClose={handleClosePopup} />
    ),
    [c.AGENCY_REGIS_POPUP]: <AgencyRegis handleClose={handleClosePopup} />,

    [c.POPUP_MAIN]: <PopupMain handleClose={handleClosePopup} />,
  };
  const currentPopup = useSelector((state) => state.app.currentPopup);
  return popups[currentPopup];
}
export default Popup;
