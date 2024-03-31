import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { appActions } from "../../actions/appActions";
import { constants as c } from "../../constants";

import PageLoading from "../../components/PageLoading";
const Header = React.lazy(() => import("../../components/Header"));
const Banner = React.lazy(() => import("../../components/Banner"));
const ProductHome = React.lazy(() => import("../../components/ProductHome"));
const BlogNews = React.lazy(() => import("../../components/BlogNews"));
const Footer = React.lazy(() => import("../../components/Footer"));
const BannerAdsSection = React.lazy(() =>
  import("../../components/Blog/Blog7/BannerAdsSection")
);

export default function HomePage() {
  const bannerAds = useSelector((state) => state.app.bannerAds);

  const dispatch = useDispatch();
  const appTheme = useSelector((state) => state.app.appTheme);
  const isShowPopup = useSelector((state) => state.app.isShowPopup);
  const headerType = useSelector((state) => state.app.appTheme.header_type);

  useEffect(() => {
    if (appTheme.home_title != null) {
      document.title = appTheme.home_title;
    } else {
      document.title = "Trang chủ";
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
  function handleShowPopup() {
    if (isShowPopup == false && bannerAds?.popups?.length > 0) {
      dispatch(appActions.changePopup(c.POPUP_MAIN));
      dispatch({ type: c.SHOW_POPUP_MAIN, data: true });
    }
  }

  return (
    <React.Fragment>
      {bannerAds.status === c.LOADING ? null : handleShowPopup()}

      {headerType !== 13 && <Banner />}
      {/* {appTheme.home_page_type === 9 && <BlogNews />} */}
      <ProductHome />
      {/* {appTheme.home_page_type !== 9 && <BlogNews />} */}
      {headerType !== 13 && <BlogNews />}
      {bannerAds.status === c.LOADING || headerType === 13 ? null : <Footer />}
    </React.Fragment>
  );
}
