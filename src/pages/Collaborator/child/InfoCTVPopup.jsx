import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { uploadImage } from "../../../helper";
import { collaboratorActions as a } from "../../../actions/collaboratorActions";
import styled from "styled-components";

const InfoCTVPopupStyles = styled.div`
  .info-popup {
    padding: 1em 2em;
    width: 550px;
    max-height: calc(100% - 2em);
    overflow-y: scroll;
    max-width: calc(100% - 1em);
    border-radius: 0.5em;
    background-color: white;
    justify-content: space-evenly;
    position: relative;
    .row {
      align-items: center;
      margin-bottom: 1em;
      label {
        font-size: 13px;
        width: 8em;
        color: #757575;
      }
      input {
        width: calc(100% - 8em);
        font-size: 15px;
        padding: 0.75em;
        display: block;
        border: 1px solid #e4e4e4;
        border-radius: 0.25em;
        font-size: 13px;
      }
    }
    & > .row:last-of-type {
      & > div {
        width: calc(100% - 8em);
        column-gap: 10px;
        .idcard-img {
          width: calc(50% - 0.5em);
          .image {
            margin-top: 0.5em;
            width: 100%;
            position: relative;
            .blur {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background-color: rgba(0, 0, 0, 0.4);
              z-index: 4;
              color: white;
              font-size: 20px;
              font-weight: 500;
              display: flex;
              justify-content: center;
              align-items: center;
              cursor: pointer;
            }
            .img-container {
              width: 100%;
              padding-top: 63%;
              display: block;
              position: relative;
              margin: auto;
              img {
                position: absolute;
                top: 0;
                left: 0;
                bottom: 0;
                right: 0;
                width: 100%;
                height: 100%;
                object-fit: cover;
              }
            }
          }
        }
      }
    }
    span {
      width: 100%;
      display: flex;
      justify-content: center;
      column-gap: 20px;
      button {
        padding: 8px 20px;
        font-size: 16px;
        color: white;
        border-radius: 0.25em;
        margin-top: 1em;
        font-weight: 500;
        &:last-of-type {
          color: #757575;
          background-color: #e4e4e4;
        }
      }
    }
  }
`;

export default function InfoCTVPopup(props) {
  const dispatch = useDispatch();
  const [updateInfo, setUpdateInfo] = useState(props.info);
  const [loadingUp, setLoadingUp] = useState(false);
  const [lastTimeClick, setLastTimeClick] = useState(new Date());
  const appTheme = useSelector((state) => state.app.appTheme);
  const frontFile = useRef(null);
  const backFile = useRef(null);
  function handleInputChange(e) {
    let info = { ...updateInfo };
    info[e.target.name] = e.target.value;
    setUpdateInfo(info);
  }

  useEffect(() => {
    setUpdateInfo(props.info);
  }, [props.info]);

  function handleFileSelect(e, type) {
    if (!e.target.files) return;
    let info = { ...updateInfo };
    let url = URL.createObjectURL(e.target.files[0]);
    if (type === "front") info.front_card = url;
    if (type === "back") info.back_card = url;
    setUpdateInfo(info);
    return () => URL.revokeObjectURL(url);
  }

  async function handleOnlyUpdate(onOk = null) {
    setLoadingUp(true);
    let endDate = new Date();
    if (endDate.getTime() - lastTimeClick.getTime() < 1000) return;
    setLastTimeClick(endDate);
    let info = { ...updateInfo };
    let formData;
    if (frontFile.current.files[0]) {
      formData = new FormData();
      formData.append("image", frontFile.current.files[0]);
      info.front_card = await uploadImage(formData);
    }
    if (backFile.current.files[0]) {
      formData = new FormData();
      formData.append("image", backFile.current.files[0]);
      info.back_card = await uploadImage(formData);
    }
    setLoadingUp(false);
    dispatch(a.updateInfo(info, true));
    if (onOk != null) {
      onOk();
    }
  }
  async function handleSubmit() {
    await handleOnlyUpdate();
    props.onClose();
  }
  function onNextPolicy() {
    handleOnlyUpdate(() => {
      props.onNext();
    });
  }
  return (
    <InfoCTVPopupStyles className={`modal ${props.customClass}`}>
      <div className="info-popup hide-scroll">
        <div
          className="row"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignContent: "center",
            alignItems: "center",
            color: "#2d3436",
          }}
        >
          <h4 style={{ marginTop: 8 }}>Thông tin CTV</h4>

          <div onClick={props.onClose}>
            <i
              className="far fa-times-circle"
              style={{
                fontSize: 20,
              }}
            ></i>
          </div>
        </div>

        <div className="row">
          <label htmlFor="name">Họ và tên: </label>
          <input
            autoComplete="off"
            type="text"
            id="name"
            name="first_and_last_name"
            onChange={handleInputChange}
            value={updateInfo.first_and_last_name}
            placeholder={props.info.first_and_last_name}
          />
        </div>
        <div className="row">
          <label htmlFor="account_name">Tên tài khoản</label>
          <input
            type="text"
            id="account_name"
            name="account_name"
            onChange={handleInputChange}
            value={updateInfo.account_name}
            placeholder={props.info.account_name}
          />
        </div>
        <div className="row">
          <label htmlFor="account_number">Số tài khoản</label>
          <input
            type="text"
            id="account_number"
            name="account_number"
            onChange={handleInputChange}
            value={updateInfo.account_number}
            placeholder={props.info.account_number}
          />
        </div>
        <div className="row">
          <label htmlFor="bank">Ngân hàng</label>
          <input
            type="text"
            id="bank"
            name="bank"
            onChange={handleInputChange}
            value={updateInfo.bank}
            placeholder={props.info.bank}
          />
        </div>
        <div className="row">
          <label htmlFor="branch">Chi nhánh</label>
          <input
            type="text"
            id="branch"
            name="branch"
            onChange={handleInputChange}
            value={updateInfo.branch}
            placeholder={props.info.branch}
          />
        </div>
        <div className="row">
          <label htmlFor="cmnd">CMND/CCCD:</label>
          <input
            type="text"
            id="cmnd"
            name="cmnd"
            onChange={handleInputChange}
            value={updateInfo.cmnd}
            placeholder={props.info.cmnd}
          />
        </div>
        <div className="row">
          <label htmlFor="issued_by">Nơi cấp:</label>
          <input
            type="text"
            id="issued_by"
            name="issued_by"
            onChange={handleInputChange}
            value={updateInfo.issued_by}
            placeholder={props.info.issued_by}
          />
        </div>
        <div className="row">
          <label></label>
          <div className="row">
            <div className="idcard-img">
              <label>Mặt trước: </label>
              <div style={{ display: "none" }}>
                <input
                  onChange={(e) => handleFileSelect(e, "front")}
                  ref={frontFile}
                  type="file"
                  accept="image/jpeg, image/jpg, image/png"
                />
              </div>
              <div className="image">
                <div className="blur" onClick={() => frontFile.current.click()}>
                  Thay đổi
                </div>
                <div className="img-container">
                  <img src={updateInfo.front_card} alt="" />
                </div>
              </div>
            </div>
            <div className="idcard-img">
              <label>Mặt sau: </label>
              <div style={{ display: "none" }}>
                <input
                  onChange={(e) => handleFileSelect(e, "back")}
                  ref={backFile}
                  type="file"
                  accept="image/jpeg, image/jpg, image/png"
                />
              </div>
              <div className="image">
                <div className="blur" onClick={() => backFile.current.click()}>
                  Thay đổi
                </div>
                <div className="img-container">
                  <img src={updateInfo.back_card} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <span>
          {props.isReg ? (
            <button
              onClick={() => {
                if (loadingUp == false) {
                  onNextPolicy();
                } else {
                  onNextPolicy();
                }
              }}
              className="submit-btn"
              style={{
                background: loadingUp == true ? "grey" : appTheme.color_main_1,
              }}
            >
              Tiếp tục
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="submit-btn"
              style={{ background: appTheme.color_main_1 }}
            >
              Cập nhật
            </button>
          )}
          <button onClick={props.onClose}>Hủy</button>
        </span>
      </div>
    </InfoCTVPopupStyles>
  );
}
