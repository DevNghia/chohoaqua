import { useSelector, useDispatch } from "react-redux";
import Select from "../../../components/Select";
import { appActions as a } from "../../../actions/appActions";
import { constants as c } from "../../../constants";
import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const AddressFormStyles = styled.div`
  .address-form {
    border-radius: 10px;
    .from-list {
      column-gap: 10px;
      label {
        width: auto !important;
      }
    }
    input,
    select {
      border-radius: 5px !important;
    }
  }
  .addressForm-btn {
    margin-top: 20px;
    button {
      border-radius: 5px;
      cursor: pointer;
      height: 35px;
      width: 120px;
    }
  }
`;

export default function AddressForm(props) {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  var customClass = props.customClass ?? "",
    currentAddress = props.currentAddress ?? {};

  const dispatch = useDispatch();
  const provinces = useSelector((state) => state.app.addressData.provinces);
  const districts = useSelector((state) => state.app.addressData.districts);
  const wards = useSelector((state) => state.app.addressData.wards);
  const [currentProvince, setCurrentProvince] = useState(null);
  const [currentDistrict, setCurrentDistrict] = useState(null);
  const [currentWard, setCurrentWard] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isDefault, setIsDefault] = useState(false);
  const [email, setEmail] = useState("");
  const [detail, setDetail] = useState("");
  const [errMsg, setMessage] = useState("");
  useEffect(() => {
    reset({});
    if (currentAddress && currentAddress.id != null) {
      dispatch(a.getDistrictsList(currentAddress.province));
      dispatch(a.getWardsList(currentAddress.district));
      setCurrentProvince(currentAddress.province);
      setCurrentDistrict(currentAddress.district);
      setCurrentWard(currentAddress.wards);
      setName(currentAddress.name);
      setPhone(currentAddress.phone ? currentAddress.phone : "");
      setEmail(currentAddress.email);
      setDetail(currentAddress.address_detail ?? "");
      setIsDefault(currentAddress.isDefault ?? currentAddress.is_default);
    } else {
      setCurrentWard(null);
      setCurrentProvince(0);
      setCurrentDistrict(null);
      setName("");
      setPhone("");
      setEmail("");
      setDetail("");
      setIsDefault(false);
    }
  }, [currentAddress, dispatch]);

  function showDetail(e) {
    let currentElement = e.currentTarget;
    let nextElement = currentElement.nextElementSibling;
    let parentElement = currentElement.parentElement;
    if (nextElement.style.maxHeight) {
      nextElement.style.maxHeight = null;
      parentElement.style.zIndex = 2;
    } else {
      nextElement.style.maxHeight = 130 + "px";
      nextElement.style.overflowY = "scroll";
      parentElement.style.zIndex = 10;
    }
  }
  function handleCLose(e) {
    props.handleClose(e);
    setMessage("");
  }

  const handleProvin = (event) => {
    var id = event.target.value;
    setCurrentProvince(id);
    setCurrentWard(0);
    setCurrentDistrict(0);
    dispatch(a.getDistrictsList(id));
  };
  const handleDistricts = (event) => {
    var id = event.target.value;
    setCurrentDistrict(id);
    setCurrentWard(0);
    dispatch(a.getWardsList(id));
  };
  const handleWards = (event) => {
    var id = event.target.value;
    setCurrentWard(id);
  };

  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangePhone(e) {
    setPhone(e.target.value);
  }
  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }
  function handleChangeDetail(e) {
    setDetail(e.target.value);
  }
  function handleSubmit2() {
    var provinceId =
      currentProvince != null && currentProvince.id != null
        ? currentProvince.id
        : currentProvince;
    var districtId =
      currentDistrict != null && currentDistrict.id != null
        ? currentDistrict.id
        : currentDistrict;
    var wardId =
      currentWard != null && currentWard.id != null
        ? currentWard.id
        : currentWard;

    if (
      !name ||
      !phone ||
      !detail ||
      !currentProvince ||
      !currentDistrict ||
      !currentWard
    ) {
      if (!currentAddress) {
        setMessage("Vui lòng điền đầy đủ thông tin !");
        return;
      }
    }
    const addressInfo = {
      name,
      address_detail: detail,
      country: 1,
      province: provinceId,
      district: districtId,
      wards: wardId,
      phone,
      email,
      is_default: isDefault,
    };
    if (!currentAddress || currentAddress.id == null) {
      dispatch(a.changePopup(c.MESSAGE_POPUP));

      props.handleAddAddress(addressInfo);
      return;
    }
    dispatch(a.changePopup(c.MESSAGE_POPUP));

    addressInfo.id = currentAddress.id;
    props.handleUpdateAddress(addressInfo);
  }
  return (
    <AddressFormStyles className={"form-container " + customClass}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(handleSubmit2);
        }}
      >
        <div className="address-form">
          {props.showTitle == true && (
            <div
              className="row"
              style={{
                width: "100%",
                justifyContent: "space-between",
                padding: 11,
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={props.handleBack}
              >
                <button>
                  <i
                    className="fas fa-angle-left"
                    style={{
                      fontSize: 25,
                      cursor: "pointer",
                    }}
                  ></i>
                </button>
                &nbsp; &nbsp;
                <h4>{props.isAdd ? "Thêm địa chỉ" : "Sửa địa chỉ"}</h4>
              </div>
              <button
                class="voucher-address-delete"
                style={{
                  fontSize: "23px",
                  cursor: "pointer",
                  color: "rgb(153, 153, 153)",
                }}
                onClick={props.handleBack}
              >
                <i class="far fa-times-circle" aria-hidden="true"></i>
              </button>
            </div>
          )}

          <input
            type="text"
            name="name"
            id="name"
            value={name}
            placeholder="Tên"
            {...register("name", { required: true })}
            onChange={handleChangeName}
          />
          {errors.name && (
            <p style={{ fontSize: 13, color: "red" }}>Xin mời bạn nhập tên</p>
          )}
          <input
            type="number"
            name="phone"
            id="phone"
            value={phone}
            placeholder="Số điện thoại"
            {...register("phone", {
              required: true,
              pattern: /^\d+$/,
              pattern: /((09|03|07|08|05)+([0-9]{8})\b)/,
              minLength: 10,
            })}
            onChange={handleChangePhone}
          />
          {Object.keys(errors).length !== 0 && (
            <span>
              {errors.phone?.type === "required" && (
                <p style={{ fontSize: 13, color: "red" }}>
                  Bạn chưa nhập số điện thoại
                </p>
              )}
              {errors.phone?.type === "pattern" && (
                <p style={{ fontSize: 13, color: "red" }}>
                  Số điện thoại không hợp lệ
                </p>
              )}
              {errors.phone?.type === "minLength" && (
                <p style={{ fontSize: 13, color: "red" }}>
                  Số điện thoại không hợp lệ
                </p>
              )}
            </span>
          )}

          {/* <input className="email" type="text" name="email" id="email"
            value={email}
            placeholder="Email"
            onChange={handleChangeEmail}
            
          />
            {Object.keys(errors).length !== 0 && <ul></ul>} */}

          <select
            value={currentProvince}
            className="select-list"
            onChange={handleProvin}
            required
          >
            <option value={0} selected>
              Tỉnh/Thành phố
            </option>
            {provinces.map((v) => (
              <option value={v.id}>{v.name}</option>
            ))}
          </select>
          <select
            value={currentDistrict}
            className="select-list"
            onChange={handleDistricts}
            required
          >
            <option value={0} disabled selected>
              Quận/Huyện
            </option>
            {districts.map((disttric) => (
              <option value={disttric.id}>{disttric.name}</option>
            ))}
          </select>
          <select
            value={currentWard}
            className="select-list"
            onChange={handleWards}
            required
          >
            <option value={0} disabled selected>
              Phường/Xã
            </option>
            {wards.map((ward) => (
              <option value={ward.id}>{ward.name}</option>
            ))}
          </select>
          <input
            className="address"
            type="text"
            name="detail"
            id="detail"
            value={detail}
            placeholder="Địa chỉ"
            onChange={handleChangeDetail}
          />
          <div className="err-msg">{errMsg}</div>

          <div
            class="from-list"
            style={{
              border: "none",
            }}
          >
            <input
              onChange={(e) => {
                setIsDefault(e.target.checked);
              }}
              name="sex"
              type="checkbox"
              id="male"
              checked={isDefault}
              style={{
                width: 20,
                marginTop: "3px",
              }}
            />
            <label
              htmlFor="male"
              style={{
                width: 150,
              }}
            >
              Cài đặt địa chỉ mặc định
            </label>
          </div>

          <div className="addressForm-btn">
            <button className="save-btn" onClick={handleSubmit(handleSubmit2)}>
              {currentAddress && currentAddress.id != null
                ? "Cập nhật"
                : "Lưu địa chỉ"}
            </button>
            <button className="cancel-btn" onClick={handleCLose}>
              Hủy bỏ
            </button>
          </div>
        </div>
      </form>
    </AddressFormStyles>
  );
}
