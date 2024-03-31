import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  convertNumberPhone,
  formatNumberPhone,
  isCheckValidNumberPhone,
  uploadImage,
  validateNumberPhone,
} from "../../../helper";
import { userActions } from "../../../actions/userActions";
import styled from "styled-components";
import Select from "react-select";
import DatePicker from "react-datepicker";
import { appActions as a } from "../../../actions/appActions";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import ChangePassword from "../ChangePassword";
const ProfilePopupStyles = styled.div`
  .profile {
    width: 750px;
    margin-top: -20px;
    .profile__information {
      margin-top: 20px;

      .profile__item-img {
        display: flex;
        justify-content: center;
        margin-bottom: 30px;
        .profile__item__avatar {
          position: relative;
          border-radius: 100%;
          width: 100px;
          height: 100px;
          padding: 5px;
          border: 1px dashed transparent;
          cursor: pointer;
          &:hover {
            .profile__item__icon-image {
              transform: translate(-50%, 30%) scale(1.1);
            }
          }
          img {
            width: 100%;
            height: 100%;
            border-radius: 100%;
            object-fit: cover;
          }
          .profile__item__icon-image {
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translate(-50%, 30%);
            width: 32px;
            height: 32px;
            border-radius: 100%;
            box-shadow: 0 0 0 2px white;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #111d36;
            transition: all 0.5s;
            i {
              color: white;
              font-size: 12px;
            }
          }
        }
      }
      .profile__content {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        row-gap: 15px;
        column-gap: 15px;
        .profile__item__error {
          color: #e74c3c;
          margin-top: 3px;
        }
      }
      .profile__itemBottom {
        margin-top: 15px;
      }
      .profile__item {
        display: flex;
        height: 45px;
        border-radius: 10px;
        border: 1px solid #e9e9eb;
        &.disabled {
          background-color: rgba(0, 0, 0, 0.05);
        }
        .profile__item__icon {
          width: 45px;
          height: 45px;
          flex-shrink: 0;
          border-top-left-radius: inherit;
          border-bottom-left-radius: inherit;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          &::after {
            content: "";
            width: 1px;
            height: 50%;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            right: 0;
            background-color: #e9e9eb;
          }
          i {
            color: #646363;
          }
        }
        .profile__item__gender {
          display: flex;
          align-items: center;
          column-gap: 20px;
          padding-left: 0.75rem;
          & > div {
            display: flex;
            align-items: center;
            column-gap: 5px;
          }
        }

        input,
        select {
          border: none !important;
          margin: 0 !important;
          width: 100% !important;
          height: 100% !important;
          border-top-left-radius: initial !important;
          border-bottom-left-radius: initial !important;
          border-top-right-radius: inherit !important;
          border-bottom-right-radius: inherit !important;
        }
        #input-container {
          width: 100%;
          .r-input-group {
            height: 100%;
          }
        }
        .css-b62m3t-container {
          width: 100%;
          .css-1s2u09g-control {
            border-top-right-radius: 10px;
            border-bottom-right-radius: 10px;
            min-height: auto !important;
            border: none !important;
            height: 100%;
            box-shadow: none !important;
            &:hover {
              border: none;
            }
          }
          .css-1pahdxg-control {
            border-top-right-radius: 10px;
            border-bottom-right-radius: 10px;
            min-height: auto !important;
            height: 100%;
            border: none !important;
            box-shadow: none !important;
            &:hover {
              border: none !important;
            }
          }
        }
      }
      .profile__btn {
        display: flex;
        justify-content: center;
        margin-top: 20px;
        column-gap: 15px;
        button {
          width: 170px;
          height: 45px;
          color: white;
          font-size: 18px;
          border-radius: 10px;
          font-weight: 500;
        }
      }
    }
  }
  @media screen and (max-width: 1400px) {
    .profile {
      width: 650px;
      .profile__information {
        .profile__content {
          row-gap: 10px;
        }
        .profile__itemBottom {
          margin-top: 10px;
        }
        .profile__item {
          height: 38px;
          .profile__item__icon {
            width: 38px;
            height: 38px;
          }
        }
        .profile__btn {
          button {
            height: 38px;
            font-size: 17px;
          }
        }
      }
    }
  }
  @media screen and (max-width: 500px) {
    .profile {
      width: 100%;
    }
  }
`;

const genders = [
  {
    id: 0,
    value: 1,
    label: "Nam",
  },
  {
    id: 1,
    value: 2,
    label: "Nữ",
  },
  {
    id: 2,
    value: 0,
    label: "Khác",
  },
];

export default function ProfilePopup(props) {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);
  const appTheme = useSelector((state) => state.app.appTheme);
  const provinces = useSelector((state) => state.app.addressData.provinces);
  const districts = useSelector((state) => state.app.addressData.districts);
  const wards = useSelector((state) => state.app.addressData.wards);
  const [information, setInformation] = useState({
    name: "",
    sex: 1,
    province: null,
    district: null,
    date_of_birth: null,
    wards: null,
    address_detail: null,
    avatar_image: null,
    referral_phone_number: "",
  });
  const [selectedImage, setSelectedImage] = useState(false);
  const [errorName, setErrorName] = useState(null);
  const [errorReferralNumberPhone, setErrorReferralNumberPhone] =
    useState(null);
  const [showModalChangePassword, setShowModalChangePassword] = useState(false);

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

  const handleChangeInputInfomation = (e, address) => {
    var value;
    var name;
    if (address === undefined && e.target === undefined) {
      value = e;
      name = "date_of_birth";
    } else if (address === undefined && e.target.files === null) {
      name = e.target.name;
      value = e.target.value;
    } else if (address === undefined && e.target.files !== null) {
      const file = e.target.files[0];
      file.image = URL.createObjectURL(file);
      value = file;
      name = e.target.name;
      setSelectedImage(true);
    } else {
      value = e;
      name = address.name;
    }
    if (name === "province") {
      dispatch(a.getDistrictsList(value.value));
      setInformation((info) => {
        return {
          ...info,
          [name]: value,
          district: null,
          wards: null,
        };
      });
    } else if (name === "district") {
      dispatch(a.getWardsList(value.value));
      setInformation((info) => {
        return {
          ...info,
          [name]: value,
          wards: null,
        };
      });
    } else {
      setInformation((info) => {
        return {
          ...info,
          [name]: value,
        };
      });
    }
  };
  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    if (information.name === "") {
      setErrorName("Họ tên không được để trống!");
      return;
    }
    if (
      information.referral_phone_number &&
      information.referral_phone_number !== profile.referral_phone_number
    ) {
      const isValid =
        formatNumberPhone(information.referral_phone_number) &&
        information.referral_phone_number?.trim()?.length == 10;
      if (!isValid) {
        setErrorReferralNumberPhone("SĐT người giới thiệu chưa đúng định dạng");
        return;
      } else {
        const data = {
          referral_phone_number: information.referral_phone_number?.trim(),
        };

        dispatch(
          userActions.updateReferalNumberPhone(
            data,
            () => {
              updateProfile();
            },
            (msgError) => {
              setErrorReferralNumberPhone(msgError);
            }
          )
        );
      }
    } else {
      updateProfile();
    }
  };

  const updateProfile = async () => {
    if (selectedImage) {
      let formData = new FormData();
      formData.append("image", information.avatar_image);
      let url = await uploadImage(formData);
      information.avatar_image = url;
    } else {
      information.avatar_image = information.avatar_image.image;
    }
    const newInformation = {
      ...information,
      date_of_birth: moment(information.date_of_birth).format("YYYY-MM-DD"),
      province:
        information.province !== null ? information.province?.value : null,
      district:
        information.district !== null ? information.district?.value : null,
      wards: information.wards !== null ? information.wards?.value : null,
    };

    dispatch(userActions.updateUserProfile(newInformation));
  };

  const handleShowModalChangePassword = () => {
    setShowModalChangePassword(true);
  };

  useEffect(() => {
    return () => {
      information.avatar_image &&
        URL.revokeObjectURL(information.avatar_image.image);
    };
  }, [information.avatar_image]);
  useEffect(() => {
    if (Object.entries(profile).length > 0) {
      dispatch(a.getDistrictsList(profile.province));
      dispatch(a.getWardsList(profile.district));
      setInformation({
        name: profile.name,
        date_of_birth: isNaN(Date.parse(profile.date_of_birth))
          ? null
          : new Date(profile.date_of_birth),
        sex: profile.sex,
        province:
          profile.province !== null
            ? {
                value: profile.province,
                label: profile.province_name,
              }
            : null,
        district:
          profile.district !== null
            ? {
                value: profile.district,
                label: profile.district_name,
              }
            : null,
        wards:
          profile.wards !== null
            ? {
                value: profile.wards,
                label: profile.wards_name,
              }
            : null,
        address_detail: profile.address_detail,
        avatar_image: {
          image: profile.avatar_image
            ? profile.avatar_image
            : "./img/default_product.jpg",
        },
        referral_phone_number: profile.referral_phone_number
          ? profile.referral_phone_number
          : "",
      });
    }
  }, [dispatch, profile]);
  return (
    <ProfilePopupStyles className="modal center">
      <div className="profile-popup profile">
        <button
          className="close-popup-btn"
          onClick={props.handleClose}
          style={{
            cursor: "pointer",
          }}
        >
          <i className="far fa-times-circle"></i>
        </button>
        {showModalChangePassword ? (
          <ChangePassword
            setShowModalChangePassword={setShowModalChangePassword}
          ></ChangePassword>
        ) : (
          <>
            <h4>Cập nhật thông tin</h4>
            <div className="profile__information">
              <form onSubmit={handleUpdateProfile}>
                <div className="profile__item-img">
                  <label
                    className="profile__item__avatar"
                    style={{ borderColor: appTheme.color_main_1 }}
                  >
                    <img
                      src={
                        information.avatar_image !== null
                          ? information.avatar_image.image
                          : process.env.PUBLIC_URL + "/img/default_product.jpg"
                      }
                      loading="lazy"
                      alt=""
                    />
                    <input
                      type="file"
                      hidden
                      name="avatar_image"
                      onChange={handleChangeInputInfomation}
                      accept="image/*"
                    />
                    <div className="profile__item__icon-image">
                      <i className="fa fa-pencil-alt"></i>
                    </div>
                  </label>
                </div>
                <div className="profile__content">
                  <div className="">
                    <div className="profile__item">
                      <div className="profile__item__icon">
                        <i className="fa fa-user-edit"></i>
                      </div>
                      <input
                        name="name"
                        value={information.name}
                        type="text"
                        placeholder="Nhập họ và tên"
                        onChange={handleChangeInputInfomation}
                      />
                    </div>
                    {errorName && (
                      <div className="profile__item__error">{errorName}</div>
                    )}
                  </div>
                  <div className="profile__item">
                    <div className="profile__item__icon">
                      <i className="fa fa-calendar-alt"></i>
                    </div>
                    <DatePicker
                      name="date_of_birth"
                      placeholderText="Chọn ngày sinh"
                      selected={information.date_of_birth}
                      onChange={(date) => handleChangeInputInfomation(date)}
                    />
                  </div>
                  <div className="profile__item">
                    <div className="profile__item__icon">
                      <i className="fa fa-transgender"></i>
                    </div>
                    <div className="profile__item__gender">
                      {genders.length > 0 &&
                        genders.map((gender) => (
                          <div key={gender.id}>
                            <input
                              checked={Number(information.sex) === gender.value}
                              name="sex"
                              value={gender.value}
                              type="radio"
                              id={gender.label}
                              onChange={handleChangeInputInfomation}
                            />
                            <label htmlFor={gender.label}>{gender.label}</label>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="profile__item">
                    <div className="profile__item__icon">
                      <i className="fa fa-address-card"></i>
                    </div>
                    <Select
                      options={changeAddressSelect(provinces)}
                      name="province"
                      onChange={handleChangeInputInfomation}
                      placeholder="Tỉnh/Thành phố"
                      value={information.province}
                      noOptionsMessage={() => "Không tìm thấy kết quả"}
                    ></Select>
                  </div>
                  <div className="profile__item">
                    <div className="profile__item__icon">
                      <i className="fa fa-address-card"></i>
                    </div>
                    <Select
                      options={changeAddressSelect(districts)}
                      name="district"
                      onChange={handleChangeInputInfomation}
                      placeholder="Quận/Huyện"
                      value={information.district}
                      noOptionsMessage={() => "Không tìm thấy kết quả"}
                    ></Select>
                  </div>
                  <div className="profile__item">
                    <div className="profile__item__icon">
                      <i className="fa fa-address-card"></i>
                    </div>
                    <Select
                      options={changeAddressSelect(wards)}
                      name="wards"
                      onChange={handleChangeInputInfomation}
                      placeholder="Xã/Phường"
                      value={information.wards}
                      noOptionsMessage={() => "Không tìm thấy kết quả"}
                    ></Select>
                  </div>
                  <div className="profile__item">
                    <div className="profile__item__icon">
                      <i className="fa fa-address-card"></i>
                    </div>
                    <input
                      name="address_detail"
                      type="text"
                      value={information.address_detail}
                      placeholder="Nhập địa chỉ nhà"
                      onChange={handleChangeInputInfomation}
                    />
                  </div>
                  <div>
                    <div
                      className={`profile__item profile__numberPhoneReferral ${
                        profile.referral_phone_number &&
                        formatNumberPhone(profile.referral_phone_number) &&
                        isCheckValidNumberPhone(profile.referral_phone_number)
                          ? "disabled"
                          : ""
                      }`}
                    >
                      <div className="profile__item__icon">
                        <i className="fa fa-phone"></i>
                      </div>
                      <input
                        name="referral_phone_number"
                        type="text"
                        value={information.referral_phone_number}
                        placeholder="SĐT người giới thiệu"
                        onChange={handleChangeInputInfomation}
                        readOnly={
                          profile.referral_phone_number &&
                          formatNumberPhone(profile.referral_phone_number) &&
                          isCheckValidNumberPhone(profile.referral_phone_number)
                            ? true
                            : false
                        }
                      />
                    </div>
                    {errorReferralNumberPhone && (
                      <div className="profile__item__error">
                        {errorReferralNumberPhone}
                      </div>
                    )}
                  </div>
                </div>

                <div className="profile__btn">
                  <button style={{ background: appTheme.color_main_1 }}>
                    Cập nhập
                  </button>
                  <button
                    style={{
                      border: `1px solid ${appTheme.color_main_1}`,
                      color: appTheme.color_main_1,
                    }}
                    type="button"
                    onClick={handleShowModalChangePassword}
                  >
                    Thay đổi mật khẩu
                  </button>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </ProfilePopupStyles>
  );
}
