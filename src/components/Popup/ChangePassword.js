import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { userActions as u } from "../../actions/userActions";

const ChangePasswordStyles = styled.div``;

const ChangePassword = ({ setShowModalChangePassword }) => {
  const dispatch = useDispatch();
  const appTheme = useSelector((state) => state.app.appTheme);

  const [information, setInformation] = useState({
    old_password: "",
    new_password: "",
  });
  const [error, setError] = useState({
    old_password: "",
    new_password: "",
  });
  const [typePassword, setTypePassword] = useState({
    old_password: "password",
    new_password: "password",
  });

  const handleChangeInputInfomation = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setError((prevError) => {
      return {
        ...prevError,
        [name]: "",
      };
    });
    setInformation((prevInformation) => {
      return {
        ...prevInformation,
        [name]: value,
      };
    });
  };
  const handleUpdatePassword = (e) => {
    e.preventDefault();

    if (!information.old_password) {
      setError((prevError) => {
        return {
          ...prevError,
          old_password: "Vui lòng nhập mật khẩu cũ !",
        };
      });
    }
    if (!information.new_password) {
      setError((prevError) => {
        return {
          ...prevError,
          new_password: "Vui lòng nhập mật khẩu mới !",
        };
      });
    }
    if (!information.old_password || !information.new_password) return;
    dispatch(
      u.changePassword(information, () => {
        setShowModalChangePassword(false);
        setInformation({
          old_password: "",
          new_password: "",
        });
        setError({
          old_password: "",
          new_password: "",
        });
        setTypePassword({
          old_password: "password",
          new_password: "password",
        });
      })
    );
  };
  const handleBack = () => {
    setError({
      old_password: "",
      new_password: "",
    });
    setInformation({
      old_password: "",
      new_password: "",
    });
    setTypePassword({
      old_password: "password",
      new_password: "password",
    });
    setShowModalChangePassword(false);
  };
  const handleShowPassword = (typeInput, typePassword) => {
    setTypePassword((prevTypePassword) => ({
      ...prevTypePassword,
      [typePassword]: typeInput,
    }));
  };
  return (
    <ChangePasswordStyles>
      <div>
        <button
          className="back-btn"
          onClick={handleBack}
          style={{
            cursor: "pointer",
          }}
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        <h4
          style={{
            marginTop: "-18px",
            textAlign: "center",
          }}
        >
          Thay đổi mật khẩu
        </h4>
      </div>
      <div
        className="profile__information"
        style={{
          marginTop: "30px",
        }}
      >
        <form onSubmit={handleUpdatePassword}>
          <div
            className="profile__content"
            style={{
              gridTemplateColumns: `repeat(1, 1fr)`,
            }}
          >
            <div className="">
              <div className="profile__item">
                <div className="profile__item__icon">
                  <i className="fa fa-user-lock"></i>
                </div>
                <input
                  name="old_password"
                  value={information.old_password}
                  type={typePassword.old_password}
                  placeholder="Nhập mật khẩu cũ"
                  onChange={handleChangeInputInfomation}
                />
                {typePassword.old_password === "password" ? (
                  <div
                    className="profile__item__icon"
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => handleShowPassword("text", "old_password")}
                  >
                    <i class="fa fa-eye-slash"></i>
                  </div>
                ) : (
                  <div
                    className="profile__item__icon"
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      handleShowPassword("password", "old_password")
                    }
                  >
                    <i className="fa fa-eye"></i>
                  </div>
                )}
              </div>
              {error.old_password && (
                <div className="profile__item__error">{error.old_password}</div>
              )}
            </div>
            <div className="">
              <div className="profile__item">
                <div className="profile__item__icon">
                  <i className="fa fa-user-lock"></i>
                </div>
                <input
                  name="new_password"
                  value={information.new_password}
                  type={typePassword.new_password}
                  placeholder="Nhập mật khẩu mới"
                  onChange={handleChangeInputInfomation}
                />
                {typePassword.new_password === "password" ? (
                  <div
                    className="profile__item__icon"
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => handleShowPassword("text", "new_password")}
                  >
                    <i class="fa fa-eye-slash"></i>
                  </div>
                ) : (
                  <div
                    className="profile__item__icon"
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      handleShowPassword("password", "new_password")
                    }
                  >
                    <i className="fa fa-eye"></i>
                  </div>
                )}
              </div>
              {error.new_password && (
                <div className="profile__item__error">{error.new_password}</div>
              )}
            </div>
          </div>
          <div className="profile__btn">
            <button style={{ background: appTheme.color_main_1 }}>
              Thay đổi
            </button>
          </div>
        </form>
      </div>
    </ChangePasswordStyles>
  );
};

export default ChangePassword;
