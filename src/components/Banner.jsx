import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
// import HomeBanner from "./Banner/Banner1/HomeBanner";
// import CategoryProduct from "./Banner/Banner2/CategoryProduct";
// import Banner from "./Banner/Banner3/Banner";
// import CategoryProduct1 from "./Banner/Banner3/CategoryProduct1";
// import BannerMain4 from "./Banner/Banner4/BannerMain4";
// import HomeBanner5 from "./Banner/Banner5/HomeBanner";
// import HomeBanner6 from "./Banner/Banner6/HomeBanner";
// import HomeBanner7 from "./Banner/Banner9/HomeBanner";

import { constants as c } from "../constants";
import { appActions } from "../actions/appActions";
import { categoryActions } from "../actions/categoryActions";

// import Header_Home from "./Header/headerHome";
import PageLoading from "./PageLoading";

// import Banner_2 from "./Banner/Banner2/index";
// import Banner_3 from "./Banner/Banner3/index";
// import Banner_4 from "./Banner/Banner4/index";
// import Banner_5 from "./Banner/Banner5/index";
// import Banner_6 from "./Banner/Banner6/index";
// import Banner_7 from "./Banner/Banner7/index";
// import Banner_8 from "./Banner/Banner8/index";
// import Banner_9 from "./Banner/Banner9/index";
const HomeBanner = React.lazy(() => import("./Banner/Banner1/HomeBanner"));
const CategoryProduct = React.lazy(() =>
  import("./Banner/Banner2/CategoryProduct")
);
const HomeBanner3 = React.lazy(() => import("./Banner/Banner3/Banner"));
const CategoryProduct1 = React.lazy(() =>
  import("./Banner/Banner3/CategoryProduct1")
);
const BannerMain4 = React.lazy(() => import("./Banner/Banner4/BannerMain"));
const HomeBanner5 = React.lazy(() => import("./Banner/Banner5/HomeBanner"));
const HomeBanner6 = React.lazy(() => import("./Banner/Banner6/HomeBanner"));
const HomeBanner7 = React.lazy(() => import("./Banner/Banner7/HomeBanner"));
const HomeBanner8 = React.lazy(() => import("./Banner/Banner8/HomeBanner"));
const HomeBanner9 = React.lazy(() => import("./Banner/Banner9/HomeBanner"));
const HomeBanner10 = React.lazy(() => import("./Banner/Banner10/HomeBanner"));
const HomeBanner11 = React.lazy(() => import("./Banner/Banner11/HomeBanner"));

export default function BannerHome(props) {
  const dispatch = useDispatch();
  const bannerType = useSelector((state) => state.app.appTheme.banner_type);
  const banners = useSelector((state) => state.app.banners);
  const bannerAds = useSelector((state) => state.app.bannerAds);

  const category = useSelector((state) => state.category);

  const sale_products = useSelector((state) => state.app.hot_products);
  const headerType = useSelector((state) => state.app.appTheme.header_type);

  // useEffect(() => {
  //   // document.title = appTheme.home_title;
  //   window.scrollTo({
  //     top: 0,
  //     behavior: "smooth",
  //   });
  // });

  console.log("bannerr", bannerAds, banners);
  function renderBanner(bannerType) {
    //   if (!bannerType || bannerType == 1) {
    //     return <HomeBanner
    //     banners={banners.data}
    //     categories={category.categories ?? []}
    //     discountProducts={sale_products.data}
    //   />;
    //   }
    //   if (bannerType == 2) {
    //     return <CategoryProduct
    //     banners={banners.data}
    //     categories={category.categories ?? []}
    //     discountProducts={sale_products.data}
    //   />;
    //   }
    //   if (bannerType == 3) {
    //     return <>
    //     <Banner banners={banners.data} />
    //     <CategoryProduct1 categories={category.categories ?? []} />
    //     </>

    //     ;
    //   }
    //   if (bannerType == 4) {
    //     return  <BannerMain4 banners={banners.data} />;
    //   }
    //    if (bannerType == 5) {
    //      return <HomeBanner5
    //   banners_ads={bannerAds.type_0}
    //   banners={banners.data}
    //   categories={category.categories ?? []}
    // />;
    //    }
    //   if (bannerType == 6) {
    //     return <HomeBanner6 banners={banners.data} />;
    //   }
    //   if (bannerType == 7) {
    //     return <HomeBanner
    //     banners={banners.data}
    //     categories={category.categories ?? []}
    //     discountProducts={sale_products.data}/>
    //   }
    //   if (bannerType == 8) {
    //     return <HomeBanner5
    //     banners_ads={bannerAds.type_0}
    //     banners={banners.data}
    //     categories={category.categories ?? []}
    //   />;
    //   }

    //    if (bannerType == 9) {
    //     return <HomeBanner7
    //             banners_ads={bannerAds.type_0}
    //             banners={banners.data}
    //             categories={category.categories ?? []}
    //           />;
    //    }
    if (headerType === 13) return null;
    if (!bannerType || bannerType == 1) {
      return (
        <CategoryProduct
          banners={banners.data}
          categories={category.categories ?? []}
          discountProducts={sale_products.data}
        />
      );
    }
    if (bannerType == 2) {
      return (
        <CategoryProduct
          banners={banners.data}
          categories={category.categories ?? []}
          discountProducts={sale_products.data}
        />
      );
    }
    if (bannerType == 3) {
      return (
        <>
          <HomeBanner3 banners={banners.data} />
          <CategoryProduct1 categories={category.categories ?? []} />
        </>
      );
    }
    if (bannerType == 4) {
      return <BannerMain4 banners={banners.data} />;
    }
    if (bannerType == 5) {
      return (
        <HomeBanner5
          banners_ads={bannerAds.type_7}
          banners={banners.data}
          categories={category.categories ?? []}
        />
      );
    }
    if (bannerType == 6) {
      return <HomeBanner6 banners={banners.data} />;
    }
    if (bannerType == 7) {
      return (
        <HomeBanner7
          banners_ads={bannerAds.type_0}
          banners={banners.data}
          categories={category.categories ?? []}
        />
      );
    }
    if (bannerType == 8) {
      return (
        <HomeBanner8
          banners_ads={bannerAds.type_7}
          banners={banners.data}
          categories={category.categories ?? []}
        />
      );
    }
    if (bannerType == 9) {
      return (
        <HomeBanner9
          banners_ads={bannerAds.type_7}
          banners={banners.data}
          categories={category.categories ?? []}
        />
      );
    }
    if (bannerType == 10) {
      return (
        <HomeBanner10
          // banners_ads={bannerAds.type_7}
          banners={banners.data}
          // categories={category.categories ?? []}
        />
      );
    }
    if (bannerType == 11) {
      return (
        <HomeBanner11
          banners_ads={bannerAds.type_7}
          banners_ads_under={bannerAds.type_0}
          banners={banners.data}
          categories={category.categories ?? []}
        />
      );
    }
  }
  return (
    <React.Suspense fallback={<p></p>}>
      {" "}
      <React.Fragment>
        <div className="home-page ">
          {bannerAds.status === c.LOADING ? null : renderBanner(bannerType)}
          {/* { renderBanner(bannerType) } */}
        </div>
      </React.Fragment>
    </React.Suspense>
  );
}
