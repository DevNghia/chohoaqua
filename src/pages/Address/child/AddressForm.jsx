import { useSelector, useDispatch } from "react-redux";
// import Select from "../../../components/Select";
import { appActions as a } from "../../../actions/appActions";
import { constants as c } from "../../../constants";
import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
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
  .select-address {
    width: 100%;
    border: 1px solid #e4e4e4;
    border-radius: 5px;
    margin-top: 1em;
    margin-bottom: 2px;
    .css-1s2u09g-control {
      border: none !important;
      &:hover {
        border: none !important;
        box-shadow: none !important;
      }
    }
  }
`;

export default function AddressForm(props) {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

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
      setCurrentProvince({
        value: currentAddress.province,
        label: currentAddress.province_name,
      });
      setCurrentDistrict({
        value: currentAddress.district,
        label: currentAddress.district_name,
      });
      setCurrentWard({
        value: currentAddress.wards,
        label: currentAddress.wards_name,
      });
      setName(currentAddress.name);
      setPhone(currentAddress.phone ? currentAddress.phone : "");
      setEmail(currentAddress.email);
      setDetail(currentAddress.address_detail ?? "");
      setIsDefault(currentAddress.isDefault ?? currentAddress.is_default);
    } else {
      setCurrentWard(null);
      setCurrentProvince(null);
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
    var id = event.value;
    setCurrentProvince(event);
    setCurrentWard(null);
    setCurrentDistrict(null);
    dispatch(a.getDistrictsList(id));
  };
  const handleDistricts = (event) => {
    var id = event.value;
    setCurrentDistrict(event);
    setCurrentWard(null);
    dispatch(a.getWardsList(id));
  };
  const handleWards = (event) => {
    setCurrentWard(event);
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
    if (
      !name ||
      !phone ||
      !detail ||
      !currentProvince?.value ||
      !currentDistrict?.value ||
      !currentWard?.value
    ) {
      setMessage("Vui lòng điền đầy đủ thông tin !");
      return;
    }
    const addressInfo = {
      name,
      address_detail: detail,
      country: 1,
      province: currentProvince.value,
      district: currentDistrict.value,
      wards: currentWard.value,
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
    props.handleClose();
    if (props.isEditDefault) {
      props.setCheckShipping(0);
    }
  }

  function changeAddressSelect(dataAddress) {
    const options = dataAddress.reduce((dataStore, currentAddress) => {
      return [
        ...dataStore,
        {
          value: currentAddress.id,
          label: currentAddress.name,
        },
      ];
    }, []);
    return options;
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
            {...register("name", {
              onChange: handleChangeName,
              required: true,
            })}
            // onChange={handleChangeName}
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
              onChange: handleChangePhone,
              required: true,
              pattern: /^\d+$/,
              pattern: /((09|03|07|08|05)+([0-9]{8})\b)/,
              minLength: 10,
            })}
            // onChange={handleChangePhone}
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

          <Select
            options={changeAddressSelect(provinces)}
            placeholder="Tỉnh/Thành phố..."
            className="select-address"
            onChange={handleProvin}
            value={currentProvince}
            noOptionsMessage={() => "Không tìm thấy kết quả"}
          ></Select>
          <Select
            options={changeAddressSelect(districts)}
            placeholder="Quận/Huyện..."
            className="select-address"
            onChange={handleDistricts}
            value={currentDistrict}
            noOptionsMessage={() => "Không tìm thấy kết quả"}
          ></Select>
          <Select
            options={changeAddressSelect(wards)}
            placeholder="Phường/Xã..."
            className="select-address"
            onChange={handleWards}
            value={currentWard}
            noOptionsMessage={() => "Không tìm thấy kết quả"}
          ></Select>
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
            <button className="cancel-btn" onClick={() => props.handleBack()}>
              Hủy bỏ
            </button>
          </div>
        </div>
      </form>
    </AddressFormStyles>
  );
}
