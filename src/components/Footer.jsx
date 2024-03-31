import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer1 from "./Footer/Footer1/index";

import Footer2 from "./Footer/Footer2/index";
import TopFooter from "./Footer/TopFooter";

import Footer3 from "./Footer/Footer3/index";
import Footer4 from "./Footer/Footer4/index";
import Footer5 from "./Footer/Footer5/index";
import Footer7 from "./Footer/Footer7/index";

import CustomFooter from "./Footer/CustomFooter/index";
import BannerAdsSection from "./Blog/Blog7/BannerAdsSection";
import BannerAds3 from "./Blog/Blog3/BannerAds";

import { ToastContainer } from "react-toastify";
import Footer6 from "./Footer/Footer6";
export default function Footer() {
  const footerType = useSelector((state) => {
    return state.app.appTheme.footer_type;
  });
  const appTheme = useSelector((state) => state.app.appTheme);

  const is_use_footer_html = useSelector(
    (state) => state.app.appTheme.is_use_footer_html
  );
  const tokenInfo = useSelector((state) => state.user.tokenInfo);
  const bannerAds = useSelector((state) => state.app.bannerAds);
  const headerType = useSelector((state) => state.app.appTheme.header_type);

  function renderBanners() {
    if (bannerAds.type_5.length > 0) {
      if (appTheme.home_page_type === 9) {
        return (
          bannerAds.type_5?.length > 0 && (
            <BannerAdsSection banners_ads={bannerAds?.type_5} />
          )
        );
      } else {
        return <BannerAds3 banners={bannerAds?.type_5}></BannerAds3>;
      }
    }
  }

  function renderTopFooter() {
    if (appTheme.is_show_list_post_contact === true) {
      return <TopFooter></TopFooter>;
    }
  }

  function renderFooter(footerType) {
    if (is_use_footer_html == true) {
      return (
        <>
          {" "}
          {renderBanners()}
          {renderTopFooter()}
          <CustomFooter />
        </>
      );
    }
    if (!footerType) {
      return <div></div>;
    }
    if (footerType == 1) {
      return (
        <>
          {renderBanners()}
          {renderTopFooter()}
          <Footer1 />
        </>
      );
    }
    if (footerType == 2) {
      return (
        <>
          {" "}
          {renderBanners()}
          {renderTopFooter()}
          <Footer2 />
        </>
      );
    }
    if (footerType == 3) {
      return (
        <>
          {" "}
          {renderBanners()}
          {renderTopFooter()}
          <Footer3 />
        </>
      );
    }
    if (footerType == 4) {
      return (
        <>
          {" "}
          {renderBanners()}
          {renderTopFooter()}
          <Footer4 />
        </>
      );
    }
    if (footerType == 5) {
      return (
        <>
          {" "}
          {renderBanners()}
          {renderTopFooter()}
          <Footer5 />
        </>
      );
    }
    // if (Number(footerType) == 6) {
    //   return (
    //     <>

    //       <Footer6 />
    //     </>
    //   );
    // }
    if (footerType == 7) {
      return (
        <>
          <Footer7 />
        </>
      );
    }
  }
  return (
    <React.Fragment>
      {/* <>
      {appTheme.home_page_type === 9 && (
            <BannerAdsSection7 banners_ads={homeInfo.banner_ads.type_5} />
          )}
      </> */}
      <ToastContainer />
      {renderFooter(footerType)}
    </React.Fragment>
  );
}
