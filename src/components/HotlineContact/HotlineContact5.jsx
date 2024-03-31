import "./contact5.css";
import React from "react";
import { useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
import Chat from "./Chat";
export default function HotlineContact(props) {
  const appTheme = useSelector((state) => state.app.appTheme);
  const [isMobile, setIsMobile] = useState(false);
  const handleResize = () => {
    if (window.innerWidth < 720) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };
  const styleFb = () => {
    if (isMobile) {
      return {
        right: "33px",
      };
    }
    return {
      left: "33px",
    };
  };
  const stylePhone = () => {
    if (isMobile) {
      return {
        right: "1px",
      };
    }
    return {
      left: "1px",
    };
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
  });
  return (
    <div
      className="contactgroup_style1"
      data-animate="fadeInUp"
      data-animated="true"
    >
      <Chat></Chat>
      {/* <a
        href="https://m.me/LoveWorldVietNam"
        className="item facebook-messenger item facebook-messenger"
        target
        style={{ color: "white", backgroundColor: "#136FB8" }}
      >
        <img src="https://i.imgur.com/6M8vn4I.png" style={{ width: "28px",
    height: "28px"}}
   
/>
      </a> */}
      {appTheme == null ||
      appTheme.id_zalo == null ||
      appTheme.id_zalo === "" ||
      appTheme.is_show_icon_zalo === false ? (
        ""
      ) : (
        <a
          href={appTheme.id_zalo}
          className="item zalo item zalo"
          target
          style={{ color: "white", backgroundColor: "#136FB8" }}
        >
          <svg
            className="adminz_svg"
            style={{ fill: "currentColor" }}
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 512 512"
            xmlSpace="preserve"
          >
            <style
              type="text/css"
              dangerouslySetInnerHTML={{
                __html: ".st0{fill-rule:evenodd;clip-rule:evenodd;}",
              }}
            />
            <path
              className="st0"
              d="M126.1,500.4c10.3,0,20.6,0,28.3,0l0,0l0,0c2.6,0,5.1,0,7.7,0h162.1c12.9,0,25.7,0,41.2,0c25.7,0,54,0,79.8,0l0,0c38.6,0,66.9-30.9,66.9-69.5V364c0,0,0,0,0-2.6s0-2.6,0-2.6c-2.6,0-5.1,0-5.1,2.6c-7.7,5.1-18,12.9-25.7,18c-15.4,12.9-33.4,25.7-51.5,33.4c-72,25.7-138.9,25.7-205.8,10.3c-2.6-2.6-5.1,0-7.7,0s-5.1,0-7.7,0c0,0,0,0-2.6,0c-7.7,0-15.4,0-28.3,7.7c-28.3,7.7-64.3,10.3-84.9,7.7l0,0l0,0l0,0c0,0-2.6-2.6,0-2.6c0,0,0,0,2.6,0l2.6-2.6c15.4-10.3,28.3-20.6,38.6-36c12.9-15.4,7.7-20.6-5.1-30.9l0,0c-54-54-69.5-110.6-64.3-190.4c7.7-43.7,25.7-79.8,54-110.6c15.4-20.6,36-36,59.2-48.9l0,0c0,0,2.6,0,2.6-2.6l-2.6-2.6c-12.9,0-25.7,0-38.6,0c-25.7,0-48.9,0-74.6,0C33.4,11.6,0,37.3,0,81c0,77.2,0,157,0,234.2c0,38.6,0,77.2,0,115.8c0,36,28.3,66.9,64.3,66.9C84.9,500.4,105.5,500.4,126.1,500.4z M92.6,441.2L92.6,441.2c2.6,2.6,5.1,2.6,5.1,5.1C97.8,443.8,95.2,443.8,92.6,441.2L92.6,441.2z M151.8,495.3C149.2,495.3,149.2,495.3,151.8,495.3C149.2,492.7,149.2,492.7,151.8,495.3C149.2,492.7,149.2,492.7,151.8,495.3C149.2,495.3,149.2,495.3,151.8,495.3z"
            />
            <path d="M172.4,250.9c18,0,33.4,0,48.9,0c7.7,0,12.9,2.6,15.4,10.3c0,7.7-5.1,15.4-12.9,15.4c-18,0-36,0-54,0c-5.1,0-10.3,0-15.4,0c-7.7,0-12.9-2.6-15.4-7.7c-2.6-7.7,0-12.9,2.6-18c18-23.2,33.4-43.7,51.5-66.9c0-2.6,2.6-5.1,2.6-5.1c0-2.6-2.6,0-5.1,0c-10.3-2.6-23.2,0-36-2.6c-2.6,0-5.1,0-7.7,0c-7.7,0-10.3-7.7-7.7-12.9c0-5.1,5.1-7.7,7.7-7.7c2.6-2.6,5.1-2.6,7.7-2.6c20.6,0,41.2,0,59.2,0c2.6,0,7.7,0,10.3,0c7.7,2.6,10.3,10.3,7.7,18c0,5.1-5.1,12.9-10.3,18c-12.9,18-28.3,36-43.7,54C177.5,245.7,175,248.3,172.4,250.9L172.4,250.9z" />
            <path d="M303.6,191.7c2.6-2.6,5.1-7.7,10.3-7.7c7.7-2.6,18,5.1,18,12.9c0,23.2,0,43.7,0,66.9c0,5.1-2.6,10.3-10.3,12.9c-5.1,2.6-12.9,0-15.4-5.1c-2.6-2.6-2.6-2.6-5.1,0c-10.3,7.7-20.6,10.3-33.4,5.1c-20.6-7.7-28.3-23.2-30.9-41.2c-2.6-20.6,5.1-38.6,23.2-48.9C275.3,178.8,290.7,178.8,303.6,191.7L303.6,191.7z M265,232.8c0,5.1,2.6,10.3,5.1,12.9c5.1,7.7,18,10.3,25.7,2.6c2.6,0,2.6-2.6,2.6-2.6c5.1-7.7,5.1-23.2,0-30.9c-2.6-5.1-7.7-7.7-12.9-7.7C272.7,207.1,265,214.8,265,232.8L265,232.8z M380.8,232.8c0-28.3,18-51.5,46.3-51.5s48.9,18,51.5,46.3c0,28.3-15.4,48.9-43.7,51.5C403.9,281.7,380.8,261.1,380.8,232.8L380.8,232.8z M409.1,230.3c0,5.1,2.6,10.3,5.1,15.4c5.1,7.7,18,10.3,25.7,2.6l2.6-2.6c7.7-7.7,7.7-23.2,0-30.9c-2.6-5.1-7.7-7.7-12.9-7.7C419.4,207.1,409.1,214.8,409.1,230.3L409.1,230.3z M373.1,209.7c0,18,0,36,0,51.5c0,7.7-5.1,15.4-15.4,15.4c-2.6,0-2.6,0-5.1,0c-5.1-2.6-10.3-7.7-10.3-15.4v-87.5c0-5.1,0-10.3,0-15.4c0-7.7,5.1-15.4,12.9-15.4s15.4,5.1,15.4,15.4C373.1,173.7,373.1,191.7,373.1,209.7L373.1,209.7z" />
          </svg>
        </a>
      )}

      {appTheme.phone_number_hotline == null ||
      appTheme.phone_number_hotline === "" ||
      appTheme.is_show_icon_hotline === false ? (
        ""
      ) : (
        <a
          href={"tel:" + appTheme.phone_number_hotline}
          className="item call item call"
          target
          style={{
            color: "white",
            backgroundColor: appTheme.color_main_1
              ? appTheme.color_main_1
              : "rgb(155, 79, 58)",
          }}
        >
          <svg
            className="adminz_svg"
            style={{ fill: "currentColor" }}
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 512 512"
            xmlSpace="preserve"
          >
            <g>
              <path d="M23.2,218.7c-8.7-23.5-15-47.5-13.1-73c1.2-15.7,7.1-29.1,18.6-40.1c12.6-11.8,24.4-24.2,36.7-36.2c16-15.8,36.1-15.7,52.1,0c9.9,9.7,19.7,19.6,29.5,29.5c9.5,9.5,19.1,19,28.6,28.6c16.7,16.9,16.8,36.6,0.1,53.4c-12,12-23.9,24.1-36.1,35.9c-3.2,3.1-3.5,5.7-1.8,9.6c8,19.2,19.6,36.3,32.6,52.3c26.2,32.2,55.8,60.8,91.1,82.9c7.6,4.7,15.9,8.2,23.8,12.5c4.1,2.2,6.8,1.5,10.1-1.9c11.9-12.3,24.1-24.4,36.3-36.5c16-15.8,36-15.9,52,0c19.6,19.4,39.1,38.9,58.5,58.5c16.3,16.4,16.2,36.5-0.2,53c-11.1,11.2-22.8,21.8-33.2,33.5c-15.2,17-34.4,22.6-56.2,21.4c-31.8-1.7-61.1-12.3-89.4-26c-62.8-30.5-116.4-72.8-161.3-126.2C68.7,310.3,41.3,267.3,23.2,218.7z M502.2,254.5c0-134.9-109.7-244.7-244.6-244.7v46.6c109.2,0,198.1,88.9,198.1,198.1L502.2,254.5L502.2,254.5z M368.2,254.5h46.6c0-86.7-70.6-157.3-157.3-157.3v46.6c29.6,0,57.4,11.5,78.3,32.4S368.2,224.9,368.2,254.5z" />
            </g>
          </svg>
        </a>
      )}
      {/* <a
        href="https://goo.gl/maps/9sBJhKacLjgxvyWq7"
        className="item gmap item gmap"
        target
        style={{ color: "white", backgroundColor: "#9b4f3a" }}
      >
        <svg
          className="adminz_svg"
          style={{ fill: "currentColor" }}
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 512 512"
          xmlSpace="preserve"
        >
          <style
            type="text/css"
            dangerouslySetInnerHTML={{
              __html: ".st0{fill-rule:evenodd;clip-rule:evenodd;}",
            }}
          />
          <path
            className="st0"
            d="M119,51.2C154.9,17.9,203.5,0,254.7,0s99.8,17.9,135.7,51.2s56.3,76.8,56.3,122.9c-2.6,156.2-192,337.9-192,337.9S65.3,330.2,65.3,174.1C65.3,128,85.8,84.5,119,51.2z M334.1,174.1c0,38.4-33.3,69.1-76.8,69.1c-41,0-76.8-30.7-76.8-69.1s33.3-69.1,76.8-69.1C300.8,105,334.1,135.7,334.1,174.1z"
          />
        </svg>
      </a> */}
    </div>
  );
}
