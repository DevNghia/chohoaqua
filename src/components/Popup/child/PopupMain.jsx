import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { appActions } from "../../../actions/appActions";
import { userActions } from "../../../actions/userActions";
import { constants as c } from "../../../constants";
import { toPage } from "../../../utils/toUtils";
import moment, { localeData } from "moment";
import { parse } from "date-fns";
import Slider from "react-slick";
import styled from "styled-components";

const PopupMainStyles = styled.div`
  &.active {
    .login-popup {
      animation: openModal 0.5s linear 1;
    }
  }
  @keyframes openModal {
    0% {
      opacity: 0;
      transform: scale(0);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
  @media screen and (max-width: 400px) {
    .login-popup {
      width: 100%;
      img {
        width: 90vw;
       // max-width: 100% !important;
      }
    }
  }
`;

export default function Login(props) {
  const dispatch = useDispatch();
  const appTheme = useSelector((state) => state.app.appTheme);
  const bannerAds = useSelector((state) => state.app.bannerAds) ?? {};
  const [listAds, setListAds] = useState([]);
  const [indexSelectedAds, setIndexSelectedAds] = useState();

  const [isShowAds, setIsShowAds] = useState(false);

  const isShowPopup = useSelector((state) => state.app.isShowPopup);
  var settings1 = {
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  function checkExsit(list, id) {
    var x = false;
    if (list.length == 0) {
      return false;
    }
    for (const item of list) {
      if (item == id) {
        x = true;
        return x;
      }
    }
    return x;
  }

  const getCookie = (name) => {
    let cookieValue = "";
    let cookieArray = [];
    let result = {};
    //Get cookie
    cookieValue = document.cookie;

    //Divide the cookie into an array and convert them to JSON
    if (cookieValue) {
      cookieArray = cookieValue.split(";");

      cookieArray.forEach((data) => {
        data = data.split("=");

        //data[0]: Cookie name
        //data[1]: Cookie value

        console.log("result:: ", data);
        result[data[0]?.trim()] = data[1];
      });
    }

    return result[name];
  };

  const setCookie = (name, json) => {
    let cookieValue = "";

    //Specify the cookie name and value
    cookieValue = name?.trim() + "=" + JSON.stringify(json) + ";";

    //Specify the path to set the cookie
    cookieValue += "path=/ ;";

    //Set cookie

    document.cookie = cookieValue;
  };
  const handleSelectedAds = (index) => {
    if (index === listAds.length - 1) {
      props.handleClose();
    } else {
      setIndexSelectedAds(index + 1);
    }
  };
  useEffect(() => {
    try {
      var list_popup =
        getCookie("list_popup_main") ||
        JSON.stringify({ expired: 1, item: [] });
      var parse_list_popup = JSON.parse(list_popup);

      const newListAds = [];
      let isCheckedShowAds = false;
      for (const item of bannerAds.popups) {
        if (checkExsit(parse_list_popup.item, item.id) == false) {
          newListAds.push(item);
          parse_list_popup.item?.push(item.id);
          isCheckedShowAds = true;
        } else {
          if (item.show_once === false) {
            newListAds.push(item);
            parse_list_popup.item?.push(item.id);
            isCheckedShowAds = true;
          }
        }
      }

      setCookie("list_popup_main", parse_list_popup);
      setIndexSelectedAds(0);
      setIsShowAds(isCheckedShowAds);
      setListAds(newListAds);
    } catch (error) {
      localStorage.removeItem("list_popup_main");
    }
  }, [isShowPopup]);

  return (
    <>
      {isShowAds ? (
        <>
          {listAds?.length > 0 &&
            listAds.map((ads, index) => (
              <PopupMainStyles
                className={`modal center ${
                  indexSelectedAds == index ? "active" : ""
                }`}
                style={{
                  display: indexSelectedAds == index ? "flex" : "none",
                }}
              >
                <div
                  className="login-popup"
                  style={{ background: "none", padding: "0em" }}
                >
                  <div>
                    <img
                      onClick={() => toPage(ads.type_action, ads.value_action)}
                      src={ads.link_image}
                      className="img-responsive"
                      alt="image_ads"
                      style={{
                        maxWidth: "95vw",
                        maxHeight: "500px",
                      }}
                    />

                    <button
                      className="close-btn"
                      onClick={() => handleSelectedAds(index)}
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                </div>
              </PopupMainStyles>
            ))}
        </>
      ) : null}
    </>
  );
}
