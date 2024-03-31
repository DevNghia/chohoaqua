import "./contact.css";
import React from "react";
import { useSelector } from "react-redux";
export default function HotlineContact(props) {
  const appTheme = useSelector((state) => state.app.appTheme);

  return (
    <div className="quick-contact-nav">
      <ul>
        {appTheme == null ||
        appTheme.phone_number_hotline == null ||
        appTheme.phone_number_hotline === "" ||
        appTheme.is_show_icon_hotline === false ? (
          ""
        ) : (
          <li>
            <a
              href={"tel:" + appTheme.phone_number_hotline}
              rel="nofollow"
              className="button"
            >
              <i className="icon-phone-w" aria-hidden="true" />
              Gọi điện
            </a>
          </li>
        )}

        {appTheme == null ||
        appTheme.id_zalo == null ||
        appTheme.id_zalo === "" ||
        appTheme.is_show_icon_zalo === false ? (
          ""
        ) : (
          <li>
            <a
              target="_blank"
              rel="nofollow"
              id="messengerButton"
              href={appTheme.id_zalo}
            >
              <i className="ticon-zalo-circle2" />
              Chat Zalo
            </a>
          </li>
        )}

        {appTheme.id_facebook == null ||
        appTheme.id_facebook === "" ||
        appTheme.is_show_icon_facebook === false ? (
          ""
        ) : (
          <li>
            <a
              target="_blank"
              rel="nofollow"
              id="messengerButton"
              href={"https://www.messenger.com/t/" + appTheme.id_facebook}
            >
              <i className="ticon-messenger" />
              Messenger
            </a>
          </li>
        )}
      </ul>
    </div>
  );
}
