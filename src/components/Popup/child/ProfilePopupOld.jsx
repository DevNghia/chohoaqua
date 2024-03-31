import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { uploadImage } from "../../../helper";
import { userActions } from "../../../actions/userActions";
export default function ProfilePopup(props) {
  const myFile = useRef(null);
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);
  const [updateInfo, setUpdateInfo] = useState(profile);
  const DoB = profile.date_of_birth ? profile.date_of_birth.split(" ")[0] : "";
  const [startDate, setStartDate] = useState(new Date(profile.date_of_birth));
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    setPreviewImage(profile?.avatar_image);
  }, [profile?.avatar_image]);

  useEffect(() => {
    if (!selectedFile) return;
    let url = URL.createObjectURL(selectedFile);
    setPreviewImage(url);
  }, [selectedFile]);
  function handleInputChange(e) {
    let info = { ...updateInfo };
    info[e.target.name] = e.target.value;
    if (e.target.name === "sex") info.sex = parseInt(e.target.value);
    setUpdateInfo(info);
  }
  function handleSelectImage() {
    myFile.current.click();
  }
  function handleFileSelect(e) {
    if (!e.target.files) return;
    setSelectedFile(e.target.files[0]);
  }
  async function handleSubmit() {
    let profile = { ...updateInfo };
    if (selectedFile) {
      let formData = new FormData();
      formData.append("image", selectedFile);
      let url = await uploadImage(formData);
      profile.avatar_image = url;
    }
    profile.date_of_birth = `${startDate.getFullYear()}-${
      startDate.getMonth() + 1
    }-${startDate.getDate()}`;
    dispatch(userActions.updateUserProfile(profile));
  }

  var range = (start, end) =>
    [...Array(end - start + 1)].map((_, i) => start + i);

  function buildListDays() {
    var list = range(1, 31).map((e) => <option value={e}>{e}</option>);
    list.splice(0, 0, <option value={0}>Ngày</option>);
    return list;
  }
  function handleChangeOption(event) {
    var value = event.target.value;
    var name = event.target.name;

    if (name == "day") {
      var date = new Date();

      date.setDate(startDate.getDate());
      date.setMonth(startDate.getMonth());
      date.setFullYear(startDate.getFullYear());
      date.setDate(value);
      setStartDate(date);
    }
    if (name == "month") {
      var date = new Date();

      date.setDate(startDate.getDate());
      date.setMonth(startDate.getMonth());
      date.setFullYear(startDate.getFullYear());
      date.setMonth(value - 1);
      setStartDate(date);
    }
    if (name == "year") {
      var date = new Date();

      date.setDate(startDate.getDate());
      date.setMonth(startDate.getMonth());
      date.setFullYear(startDate.getFullYear());
      date.setFullYear(value);
      setStartDate(date);
    }
  }

  function buildListMonths() {
    var list = range(1, 12).map((e) => <option value={e}>{e}</option>);
    list.splice(0, 0, <option value={0}>Tháng</option>);
    return list;
  }

  function buildListYears() {
    var list = range(1900, 2022).map((e) => <option value={e}>{e}</option>);
    list.splice(0, 0, <option value={0}>Năm</option>);
    return list;
  }

  return (
    <div className="modal center">
      <div className="profile-popup">
        <button className="close-popup-btn" onClick={props.handleClose}>
          <i className="far fa-times-circle"></i>
        </button>
        <h4>Cập nhật thông tin</h4>
        <input
          autoComplete="off"
          type="text"
          name="name"
          placeholder="Họ và tên"
          value={updateInfo.name}
          onChange={handleInputChange}
        />

        <div className="bvIJNZ">
          <div className="form-control">
            <label
              className="input-label"
              style={{
                marginRight: 14,
              }}
            >
              Ngày sinh
            </label>
            <div className="style__StyledBirthdayPicker-sc-1325vtm-0 bvIJNZ">
              <select
                name="day"
                onChange={handleChangeOption}
                value={startDate.getDate()}
              >
                {buildListDays()}
              </select>

              <select
                name="month"
                onChange={handleChangeOption}
                value={startDate.getMonth() + 1}
              >
                {buildListMonths()}
              </select>
              <select
                name="year"
                onChange={handleChangeOption}
                value={startDate.getFullYear()}
              >
                {buildListYears()}
              </select>
            </div>
          </div>
        </div>

        <div className="row">
          <label>Giới tính: </label>
          <div>
            <div className="row">
              <label htmlFor="male">Nam</label>
              <input
                checked={updateInfo.sex === 1}
                name="sex"
                value="1"
                type="checkbox"
                id="male"
                onChange={handleInputChange}
              />
            </div>
            <div className="row">
              <label htmlFor="female">Nữ</label>
              <input
                checked={updateInfo.sex === 2}
                name="sex"
                value="2"
                type="checkbox"
                id="female"
                onChange={handleInputChange}
              />
            </div>
            <div className="row">
              <label htmlFor="other">Khác</label>
              <input
                checked={updateInfo.sex === 0}
                name="sex"
                value="0"
                type="checkbox"
                id="other"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className="blur">Chọn ảnh đại diện</div>
          <div className="image" onClick={handleSelectImage}>
            <div className="img-container">
              <img
                alt=""
                src={previewImage ? previewImage : "/img/default_product.jpg"}
                style={{
                  background: "url(/img/default_product.jpg)",
                  backgroundSize: "contain",
                }}
              />
            </div>
          </div>
        </div>
        <div style={{ display: "none" }}>
          <input ref={myFile} type="file" onChange={handleFileSelect} />
        </div>
        <button onClick={handleSubmit} className="submit-btn">
          Cập nhật
        </button>
      </div>
    </div>
  );
}
