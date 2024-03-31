import "./contact.css";
import React from "react";
import { useSelector } from "react-redux";
export default function HotlineContact(props) {
  const appTheme = useSelector((state) => state.app.appTheme);

  return (
    <ul id="tnContact">
      {appTheme.id_facebook == null ||
      appTheme.id_facebook === "" ||
      appTheme.is_show_icon_facebook === false ? (
        ""
      ) : (
        <li>
          {" "}
          <a
            target="_blank"
            href={"https://www.messenger.com/t/" + appTheme.id_facebook}
            class="iconfb"
          >
            {" "}
            <i class="fab fa-facebook-f"></i>{" "}
          </a>{" "}
          <span class="label fb">Chat Facebook</span>{" "}
        </li>
      )}

      {appTheme == null ||
      appTheme.id_zalo == null ||
      appTheme.id_zalo === "" ||
      appTheme.is_show_icon_zalo === false ? (
        ""
      ) : (
        <li>
          <a target="_blank" href={appTheme.id_zalo} class="iconzalo">
            {" "}
            <img
              src="//bizweb.dktcdn.net/thumb/icon/100/434/926/themes/839444/assets/icon_zalomessage.png?1635216927204"
              alt="zalo"
            />{" "}
          </a>{" "}
          <span class="label zalo">Nhắn tin zalo</span>{" "}
        </li>
      )}

      {appTheme == null ||
      appTheme.phone_number_hotline == null ||
      appTheme.phone_number_hotline === "" ||
      appTheme.is_show_icon_hotline === false ? (
        ""
      ) : (
        <li>
          {" "}
          <a href={"tel:" + appTheme.phone_number_hotline} class="iconcall">
            {" "}
            <i class="fas fa-phone"></i>{" "}
          </a>{" "}
          <span class="label call">Gọi điện thoại</span>{" "}
        </li>
      )}
    </ul>
  );
}
