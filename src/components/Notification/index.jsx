import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { appActions } from "../../actions/appActions";
import { userActions } from "../../actions/userActions";
import "./style.css";

import { useLocation } from "react-router-dom";
export default function Header_1(props) {
  const dispatch = useDispatch();
  const [currentActive, setCurrentActive] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const wrapperRef = useRef(null);
  const tokenInfo = useSelector((state) => state.user.tokenInfo);
  const appTheme = useSelector((state) => state.app.appTheme);
  const badges = useSelector((state) => state.user.badges);
  const [showFullContent, setShowFullContent] = useState([]);
  const profile = useSelector((state) => state.user.profile);
  const notify = useSelector((state) => state.user.notify);
  console.log("🚀 ~ file: index.jsx:18 ~ Header_1 ~ notify:", notify);

  const location = useLocation();
  useEffect(() => {
    const currentPath = location.pathname;
    const searchParams = new URLSearchParams(location.search);
    setSearchValue(searchParams.get("search") ?? "");
  }, [location]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside, true);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleClickOutside(event) {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target))
      setCurrentActive("");

    console.log(wrapperRef);
  }

  function toggleMenu(selector) {
    const menuToggle = document.querySelector(`${selector} .menu`);
    menuToggle.classList.toggle("active");
  }
  function handleToggleActive(type) {
    if (currentActive === type) {
      setCurrentActive("");
      return;
    }
    if (currentActive == "") {
      dispatch(userActions.readAllNoti());
    }
    setCurrentActive(type);
  }

  function handleNotificationClick(v, e) {
    if (e.target.closest(".show-more-button")) return;
    console.log("test button");
    handleToggleActive("notify");
    if (v.type === "NEW_MESSAGE") {
      dispatch(appActions.setChatStatus("active"));
      return;
    }
    let arr = v.title.split(" ");
    // let orderID = arr[arr.length - 1];
    let orderID = v.references_value;
    if (v.type === "NEW_POST") {
      window.location.href = `/tin-tuc/${orderID}`;
      return;
    }

    if (v.type?.includes("ORDER_STATUS" || v.type === "NEW_ORDER") && orderID) {
      window.location.href = `/don-hang/${orderID}`;
    }

    if (v.type_action === "PRODUCT" && v.value_action) {
      window.location.href = `/san-pham/${v.value_action}`;
    }

    if (v.type_action === "LINK" && v.value_action) {
      window.location.href = `${v.value_action}`;
    }

    if (v.type_action === "CATEGORY_PRODUCT" && v.value_action) {
      window.location.href = `/san-pham?danh-muc=${v.value_action}`;
    }

    if (v.type_action === "POST" && v.value_action) {
      window.location.href = `/tin-tuc/${v.value_action}`;
    }

    if (v.type_action === "CATEGORY_POST" && v.value_action) {
      window.location.href = `/tin-tuc?danh-muc=${v.value_action}`;
    }
  }

  function handleShowMoreContent(index) {
    setShowFullContent((prev) => {
      const newShowFullContent = [...prev];
      newShowFullContent[index] = !newShowFullContent[index];
      return newShowFullContent;
    });
  }

  return (
    <React.Fragment>
      {!tokenInfo ? (
        ""
      ) : (
        <div
          className="cart-drop"
          style={{
            margin: "auto 0",
          }}
        >
          <div
            className="notify header-dropdown"
            style={props.style && props.style?.header_dropdown}
            ref={wrapperRef}
          >
            <div
              onClick={() => handleToggleActive("notify")}
              className="header-btn row"
              style={{
                minWidth: props.header12 ? "auto" : "70px",
                marginLeft: props.header12 ? "0" : "10px",
              }}
            >
              {props.useIcon === true ? (
                <i
                  class="fas fa-bell"
                  style={{
                    fontSize: props.fontSize ? props.fontSize : "27px",
                    color: props.colorIcon ?? "grey",
                    cursor: "pointer",
                  }}
                ></i>
              ) : (
                <img src="/img/bell (1).png" alt="" />
              )}

              <div style={{ width: props.hideTitle === true ? "0px" : "90px" }}>
                {badges.notification_unread === 0 ? (
                  <div style={{ margin: 18 }}>{null}</div>
                ) : (
                  <div className="number">{badges.notification_unread}</div>
                )}

                {props.hideTitle !== true && (
                  <div
                    className="title"
                    style={{ color: props.colorIcon ?? "grey" }}
                  >
                    Thông báo
                  </div>
                )}
              </div>
            </div>
            <div
              className={
                currentActive === "notify"
                  ? "menu dropdown active"
                  : "menu dropdown"
              }
            >
              <div
                style={{ background: appTheme.color_main_1 }}
                className="title"
              >
                <h3 style={{ color: "white" }}>Thông báo mới</h3>
              </div>
              <div className="column hide-scroll">
                {notify.data.map((v, i) => (
                  <div key={i} style={{ marginBottom: "20px" }}>
                    <button
                      className="item"
                      style={{ width: "100%", float: "left" }}
                      onClick={(e) => handleNotificationClick(v, e)}
                    >
                      <div className="notify-header">
                        <div className="title" style={{ textAlign: "left" }}>
                          {v.type === "NEW_POST" ? "Có bài viết mới" : v.title}
                        </div>
                        <div className="show-more-button">
                          {v.content?.split(" ")?.length > 17 && (
                            <button onClick={() => handleShowMoreContent(i)}>
                              {showFullContent[i] ? (
                                <i class="fa fa-angle-up"></i>
                              ) : (
                                <i class="fa fa-angle-down"></i>
                              )}
                            </button>
                          )}
                        </div>
                      </div>
                      <div
                        className={`content ${
                          showFullContent[i] ? "active" : ""
                        }`}
                        style={{
                          textAlign: "left",
                        }}
                      >
                        {showFullContent[i] ? (
                          v.content
                        ) : (
                          <span>
                            {(profile.is_general_agency &&
                              v.content === "Đang chuẩn bị hàng") ||
                            (profile.is_agency &&
                              v.content === "Đang chuẩn bị hàng") ||
                            (profile.is_agent_have_general_agency &&
                              v.content === "Đang chuẩn bị hàng")
                              ? "Đã xác nhận"
                              : `${v.content
                                  ?.split(" ")
                                  ?.slice(0, 17)
                                  ?.join(" ")} ${
                                  v.content?.split(" ")?.length > 17
                                    ? "..."
                                    : ""
                                }`}

                            {/* {`${v.content
                              ?.split(" ")
                              ?.slice(0, 17)
                              ?.join(" ")} ${
                              v.content?.split(" ")?.length > 17 ? "..." : ""
                            }`} */}
                          </span>
                        )}
                      </div>

                      <div className="date">
                        {`${v.created_at.split(" ")[0]}  ${v.created_at
                          .split(" ")[1]
                          .slice(0, 5)}`}
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
