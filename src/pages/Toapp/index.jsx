import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { isAndroid, isDesktop, isIOS, isMobile } from "react-device-detector";
import QRCode from "react-qr-code";
const Header = React.lazy(() => import("../../components/Header"));
const Footer = React.lazy(() => import("../../components/Footer"));
function Toapp(props) {
  const infoStore = useSelector((state) => state.app.infoStore);
  if (
    isAndroid &&
    infoStore.link_google_play != null &&
    infoStore.link_google_play != ""
  ) {
    window.location.href = infoStore.link_google_play;
  }
  if (
    isIOS &&
    infoStore.link_apple_store != null &&
    infoStore.link_apple_store != ""
  ) {
    window.location.href = infoStore.link_apple_store;
  }
  if (
    (infoStore.link_google_play == null || infoStore.link_google_play === "") &&
    (infoStore.link_apple_store == null || infoStore.link_apple_store === "")
  ) {
    return (
      <div>
        <React.Fragment>
          <Header />
          <div className="text-error-app">
            <h4>KHÔNG CÓ APP</h4>
          </div>
          <Footer />
        </React.Fragment>
      </div>
    );
  }
  return (
    <React.Fragment>
      {/* <Header /> */}
      <div className=" box-to-app row">
        <div style={{ margin: "auto" }}>
          <h5>Tải ứng dụng trên điện thoại</h5>

          <div className="row scant-box">
            {infoStore.link_google_play == null ||
            infoStore.link_google_play === "" ||
            infoStore.link_google_play === false ? (
              ""
            ) : (
              <div className="box-scan">
                <QRCode
                  className="QRCode"
                  size={100}
                  value={infoStore.link_google_play}
                />
                <span>
                  <a href={infoStore.link_google_play}>
                    <img src="/img/play.png" alt="" />
                  </a>
                </span>
              </div>
            )}
            {infoStore.link_apple_store == null ||
            infoStore.link_apple_store === "" ||
            infoStore.link_apple_store === false ? (
              ""
            ) : (
              <div className="box-scan">
                <QRCode
                  className="QRCode"
                  size={100}
                  value={infoStore.link_apple_store}
                />
                <span>
                  <a href={infoStore.link_apple_store}>
                    <img src="/img/app.png" alt="" />
                  </a>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
}
export default Toapp;
