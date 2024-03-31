import React, { Fragment, useEffect, useState, useMemo } from "react";
import ItemProduct from "../Home/child/HomePage3/ItemProduct";
import { useSelector, useDispatch } from "react-redux";
import { constants as c } from "../../constants";
import { appActions } from "../../actions/appActions";
import PageLoading from "../../components/PageLoading";
const Product = React.lazy(() => import("./child/HomePage3/Product"));
const SpecialProduct = React.lazy(() =>
  import("./child/HomePage3/SpecialProduct")
);
const CategoryProduct1 = React.lazy(() =>
  import("./child/HomePage3/CategoryProduct1")
);
const Header = React.lazy(() => import("../../components/Header"));
const Footer = React.lazy(() => import("../../components/Footer"));
const Blog = React.lazy(() => import("./child/HomePage3/Blog"));
const Banner = React.lazy(() => import("./child/HomePage3/Banner"));
const BannerAds = React.lazy(() => import("./child/HomePage3/BannerAds"));

function HomePage3(props) {
  const categories = useSelector((state) => state.category.categories);
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
        new_products: homeInfo.layouts.filter(
          (v) => v.type_layout === "PRODUCTS_NEW"
        )[0].list,
        sale_products: homeInfo.layouts.filter(
          (v) => v.type_layout === "PRODUCTS_DISCOUNT"
        )[0].list,
        new_posts: homeInfo.layouts.filter(
          (v) => v.type_layout === "POSTS_NEW"
        )[0].list,
        new_products: homeInfo.layouts.filter(
          (v) => v.type_layout === "PRODUCTS_NEW"
        )[0].list,
        hot_products: homeInfo.layouts.filter(
          (v) => v.type_layout === "PRODUCTS_TOP_SALES"
        )[0].list,
        listLayout: homeInfo.layouts.filter(
          (v) => v.type_layout == "PRODUCT_BY_CATEGORY"
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
      {homeInfo.status === c.LOADING ? (
        <PageLoading />
      ) : (
        <React.Fragment>
          {<Banner banners={info.banners} />}
          <CategoryProduct1 categories={info.categories} />
          {info.sale_products.length > 0 && (
            <SpecialProduct products={info.sale_products} />
          )}
          {homeInfo.banner_ads.type_0.length > 0 && (
            <BannerAds banners={homeInfo.banner_ads.type_0} />
          )}

          <div class="container">
            <div class="row">
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                {homeInfo.banner_ads.type_2.length > 0 && (
                  <BannerAds banners={homeInfo.banner_ads.type_2} />
                )}

                {info.new_products.length > 0 && (
                  <Product
                    title="Sản phẩm mới"
                    categories={info.categories}
                    products={info.new_products}
                  />
                )}
                {homeInfo.banner_ads.type_1.length > 0 && (
                  <BannerAds banners={homeInfo.banner_ads.type_1} />
                )}
                {info.hot_products.length > 0 && (
                  <Product
                    title="Sản phẩm nổi bật"
                    products={info.hot_products}
                  />
                )}
                {info.listLayout.length > 0 &&
                  info.listLayout.map((layout) => (
                    <Product
                      title={layout.title}
                      categories={info.categories}
                      products={layout.list}
                    />
                  ))}
              </div>{" "}
            </div>
          </div>

          {homeInfo.banner_ads.type_4.length > 0 && (
            <BannerAds banners={homeInfo.banner_ads.type_4} />
          )}

          {info.new_posts.length > 0 && <Blog posts={info.new_posts} />}
          {homeInfo.banner_ads.type_5.length > 0 && (
            <BannerAds banners={homeInfo.banner_ads.type_5} />
          )}
        </React.Fragment>
      )}
      <Footer />
    </React.Fragment>
  );
}
export default HomePage3;
