import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { constants as c } from "../../constants";
import { appActions } from "../../actions/appActions";
import PageLoading from "../../components/PageLoading";
import { layouts } from "chart.js";

const BannerAds = React.lazy(() => import("./child/HomePage3/BannerAds"));
const Header = React.lazy(() => import("../../components/Header"));
const Footer = React.lazy(() => import("../../components/Footer"));
const Blog = React.lazy(() => import("./child/HomePage4/Blog"));
const BannerMain = React.lazy(() => import("./child/HomePage4/BannerMain"));
const ProductSection = React.lazy(() => import("./child/HomePage4/Product"));

function HomePage(props) {
  const dispatch = useDispatch();
  const homeInfo = useSelector((state) => state.app.home);
  const appTheme = useSelector((state) => state.app.appTheme);
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
        new_products: homeInfo.layouts.filter(
          (v) => v.type_layout === "PRODUCTS_NEW"
        )[0].list,
        new_posts: homeInfo.layouts.filter(
          (v) => v.type_layout === "POSTS_NEW"
        )[0].list,
        hot_products: homeInfo.layouts.filter(
          (v) => v.type_layout === "PRODUCTS_TOP_SALES"
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
      <Header categories={info.categories} />
      <div className="main-index">
        {homeInfo.status === c.LOADING ? (
          <PageLoading />
        ) : (
          <React.Fragment>
            <BannerMain banners={info.banners} />
            <div style={{ marginTop: "20px" }}></div>
            {homeInfo.banner_ads.type_0.length > 0 && (
              <BannerAds banners={homeInfo.banner_ads.type_0} />
            )}

            {homeInfo.banner_ads.type_3.length > 0 && (
              <BannerAds banners={homeInfo.banner_ads.type_3} />
            )}

            {info.sale_products.length > 0 && (
              <ProductSection
                title="Sản phẩm giảm giá"
                products={info.sale_products}
              />
            )}

            {homeInfo.banner_ads.type_2.length > 0 && (
              <BannerAds banners={homeInfo.banner_ads.type_2} />
            )}
            {info.new_products.length > 0 && (
              <ProductSection
                title="Sản phẩm mới"
                products={info.new_products}
              />
            )}
            {homeInfo.banner_ads.type_1.length > 0 && (
              <BannerAds banners={homeInfo.banner_ads.type_1} />
            )}
            {info.hot_products.length > 0 && (
              <ProductSection
                title="Sản phẩm nổi bật"
                products={info.hot_products}
              />
            )}
            {info.listLayout.length > 0 &&
              info.listLayout.map((layout) => (
                <ProductSection
                  title={layout.title}
                  products={layout.list}
                  categories={info.categories}
                />
              ))}

            {homeInfo.banner_ads.type_4.length > 0 && (
              <BannerAds banners={homeInfo.banner_ads.type_4} />
            )}

            {info.new_posts.length > 0 && <Blog posts={info.new_posts} />}
            {homeInfo.banner_ads.type_5.length > 0 && (
              <BannerAds banners={homeInfo.banner_ads.type_5} />
            )}
          </React.Fragment>
        )}
      </div>
      <Footer />
    </React.Fragment>
  );
}
export default HomePage;
