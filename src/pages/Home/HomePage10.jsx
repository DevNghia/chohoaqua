import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import PageLoading from "../../components/PageLoading";
import { constants as c } from "../../constants";
import { appActions } from "../../actions/appActions";
const HomeBanner = React.lazy(() => import("./child/HomePage9/HomeBanner"));
const Footer = React.lazy(() => import("../../components/Footer"));
const BannerAds = React.lazy(() => import("./child/HomePage2/BannerAds"));
const Header = React.lazy(() => import("../../components/Header"));
const ProductSection = React.lazy(() =>
  import("./child/HomePage9/ProductSection")
);
function HomePage(props) {
  const appTheme = useSelector((state) => state.app.appTheme);
  const dispatch = useDispatch();
  const homeInfo = useSelector((state) => state.app.home);
  const info = useMemo(() => {
    if (homeInfo.status === c.SUCCESS) {
      return {
        banners: homeInfo.banner.list,
        categories: homeInfo.layouts.filter(
          (v) => v.type_layout === "CATEGORY"
        )[0].list,
        sale_products: homeInfo.layouts.filter(
          (v) => v.type_layout === "PRODUCTS_DISCOUNT"
        )[0].list,
        hot_products: homeInfo.layouts.filter(
          (v) => v.type_layout === "PRODUCTS_TOP_SALES"
        )[0].list,
        new_products: homeInfo.layouts.filter(
          (v) => v.type_layout === "PRODUCTS_NEW"
        )[0].list,
        new_posts: homeInfo.layouts.filter(
          (v) => v.type_layout === "POSTS_NEW"
        )[0].list,
        listLayout: homeInfo.layouts.filter(
          (v) => v.type_layout === "PRODUCT_BY_CATEGORY"
        ),
      };
    } else {
      return {};
    }
  }, [homeInfo]);
  useEffect(() => {
    document.title = appTheme.home_title;
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    if (homeInfo.status === c.LOADING) {
      dispatch(appActions.getHomeInfo());
    }
  });
  return (
    <React.Fragment>
      <Header />
      <main className="container">
        {homeInfo.status === c.LOADING ? (
          <PageLoading />
        ) : (
          <React.Fragment>
            <HomeBanner
              banners_ads={homeInfo.banner_ads.type_0}
              banners={info.banners}
              categories={info.categories}
            />
            {info.sale_products.length > 0 && (
              <ProductSection
                title="sản phẩm sale"
                products={info.sale_products}
              />
            )}
            {homeInfo.banner_ads.type_1.length > 0 && (
              <BannerAds banners={homeInfo.banner_ads.type_1} />
            )}
          </React.Fragment>
        )}
      </main>
      <Footer />
    </React.Fragment>
  );
}
export default HomePage;
