import React, { useEffect, useMemo } from "react";
import PageLoading from "../../components/PageLoading";

import { useSelector, useDispatch } from "react-redux";
import { constants as c } from "../../constants";
import { appActions } from "../../actions/appActions";
const HomeBanner = React.lazy(() => import("./child/HomePage8/HomeBanner"));
const Blog = React.lazy(() => import("./child/HomePage8/Blog"));
const ProductSection = React.lazy(() =>
  import("../Home/child/HomePage8/ProductSection")
);
const Products = React.lazy(() =>
  import("../Home/child/HomePage8/ProductList")
);
const BannerAds = React.lazy(() => import("./child/HomePage2/BannerAds"));
const Header = React.lazy(() => import("../../components/Header"));
const Footer = React.lazy(() => import("../../components/Footer"));
function HomePage(props) {
  const dispatch = useDispatch();
  const appTheme = useSelector((state) => state.app.appTheme);
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
  console.log(homeInfo);
  return (
    <React.Fragment>
      <div className="main">
        <div className="hidden-logo-top"></div>
        <Header />
        <main className="container fs-container">
          {homeInfo.status === c.LOADING ? (
            <PageLoading />
          ) : (
            <React.Fragment>
              <HomeBanner
                banners_ads={homeInfo.banner_ads.type_0}
                banners={info.banners}
                categories={info.categories}
              />
              {homeInfo.banner_ads.type_3.length > 0 && (
                <BannerAds banners={homeInfo.banner_ads.type_3} />
              )}
              {info.sale_products.length > 0 && (
                <ProductSection
                  title="Sản phẩm giảm giá"
                  products={info.sale_products}
                />
              )}
              {info.new_products.length > 0 && (
                <Products title="SẢN PHẨM MỚI" products={info.new_products} />
              )}
              {homeInfo.banner_ads.type_1.length > 0 && (
                <BannerAds banners={homeInfo.banner_ads.type_1} />
              )}
              {info.hot_products.length > 0 && (
                <Products
                  title="SẢN PHẨM NỔI BẬT"
                  products={info.hot_products}
                />
              )}
              {info.listLayout.length > 0 &&
                info.listLayout.map((layout) => (
                  <Products
                    title={layout.title}
                    categories={info.categories}
                    products={layout.list}
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
        </main>
        <Footer />
      </div>
    </React.Fragment>
  );
}
export default HomePage;
