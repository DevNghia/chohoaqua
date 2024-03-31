import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header_1 from "./Header/Header1/index";
import Header_2 from "./Header/Header2/index";
import Header_3 from "./Header/Header3/index";
import Header_4 from "./Header/Header4/index";
import Header_5 from "./Header/Header5/index";
import Header_6 from "./Header/Header6/index";

import Header_7 from "./Header/Header7/index";
import Header_8 from "./Header/Header8/index";
import Header_9 from "./Header/Header9/index";
import Header_10 from "./Header/Header10/index";

import { constants as c } from "../constants";
import { appActions } from "../actions/appActions";
import { propTypes } from "react-spinkit";
// import Header_Home from "./Header/headerHome";
import { categoryActions } from "../actions/categoryActions";
import Header_11 from "./Header/Header11";
import Header_12 from "./Header/Header12";
import Header_13 from "./Header/Header13";

export default function Header(props) {
  const dispatch = useDispatch();
  const headerType = useSelector((state) => state.app.appTheme.header_type);
  const appTheme = useSelector((state) => state.app);
  const [loadFont, setLoadFont] = useState(false);
  const bannerAds = useSelector((state) => state.app.bannerAds);

  const category = useSelector((state) => state.category);

  useEffect(() => {
    console.log("headerType : ", appTheme);
    if (category.status === c.LOADING)
      dispatch(categoryActions.getCategories());
    if (bannerAds.status === c.LOADING) dispatch(appActions.getBannerAds());
  }, []);

  function renderHeader(headerType) {
    // if (!headerType || headerType == 1) {
    //   return <Header_1 />;
    // }
    // if (headerType == 2) {
    //   return <Header_2 />;
    // }
    // if (headerType == 3) {
    //   return <Header_3 />;
    // }
    // if (headerType == 4) {
    //   return <Header_4 />;
    // }
    // if (headerType == 5) {
    //   return <Header_5 />;
    // }
    // if (headerType == 6) {
    //   return <Header_6 />;
    // }
    // if (headerType == 7) {
    //   return <Header_1 />;
    // }
    // if (headerType == 8) {
    //   return <Header_8 />;
    // }

    // if (headerType == 9) {
    //   return <Header_9 />;
    // }
    if (!headerType || headerType == 1) {
      return <Header_2 />;
    }
    if (headerType == 2) {
      return <Header_2 location={props.location} />;
    }
    if (headerType == 3) {
      return <Header_3 location={props.location} />;
    }
    if (headerType == 4) {
      return <Header_4 location={props.location} />;
    }
    if (headerType == 5) {
      return <Header_5 location={props.location} />;
    }
    if (headerType == 6) {
      return <Header_6 location={props.location} />;
    }

    if (headerType == 7) {
      return <Header_7 />;
    }

    if (headerType == 8) {
      return <Header_8 />;
    }
    if (headerType == 9) {
      return <Header_9 />;
    }
    if (headerType == 10) {
      return <Header_10 />;
    }
    if (headerType == 11) {
      return <Header_11 />;
    }
    if (headerType == 12) {
      return <Header_12 />;
    }
    if (headerType == 13) {
      return <Header_13 />;
    }
  }

  return <React.Fragment>{renderHeader(headerType)}</React.Fragment>;
}
