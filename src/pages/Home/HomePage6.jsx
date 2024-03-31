import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { constants as c } from "../../constants";
import { appActions } from "../../actions/appActions";
import PageLoading from "../../components/PageLoading";
import ProductSection from "./child/HomePage6/Product";

const HomeBanner = React.lazy(() => import("./child/HomePage6/HomeBanner"));
const CategorySection = React.lazy(() =>
  import("./child/HomePage6/CategorySection")
);
const SalesProductsSection = React.lazy(() =>
  import("./child/HomePage6/SalesProductsSection")
);
const NewProductsSection = React.lazy(() =>
  import("./child/HomePage6/NewProductsSection")
);
const Header = React.lazy(() => import("../../components/Header"));
const Footer = React.lazy(() => import("../../components/Footer"));
const Blog = React.lazy(() => import("./child/HomePage6/Blog"));
const BannerAdsSection = React.lazy(() =>
  import("./child/HomePage6/BannerAdsSection")
);

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
        new_products: homeInfo.layouts.filter(
          (v) => v.type_layout === "PRODUCTS_NEW"
        )[0].list,
        hot_products: homeInfo.layouts.filter(
          (v) => v.type_layout === "PRODUCTS_TOP_SALES"
        )[0].list,
        sale_products: homeInfo.layouts.filter(
          (v) => v.type_layout === "PRODUCTS_DISCOUNT"
        )[0].list,
        new_posts: homeInfo.layouts.filter(
          (v) => v.type_layout === "POSTS_NEW"
        )[0].list,
        listlayout: homeInfo.layouts.filter(
          (v) => v.type_layout === "PRODUCT_BY_CATEGORY"
        ),
      };
    } else {
      return {};
    }
  }, [homeInfo]);
  useEffect(() => {
    // if(appTheme.home_page_type == 6) {
    //   require('bootstrap/dist/css/bootstrap.min.css');
    // }

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
      <main>
        <div id="ctl00_divCenter" className="middle-fullwidth">
          {homeInfo.status === c.LOADING ? (
            <PageLoading />
          ) : (
            <React.Fragment>
              <HomeBanner banners={info.banners} />
              {info.categories.length > 0 && (
                <CategorySection categories={info.categories} />
              )}
              {info.sale_products.length > 0 && (
                <SalesProductsSection
                  title="Sản phẩm giảm giá"
                  banners_ads={homeInfo.banner_ads.type_3}
                  products={info.sale_products}
                />
              )}
              {info.new_products.length > 0 && (
                <NewProductsSection
                  title="Sản phẩm mới"
                  banners_ads={homeInfo.banner_ads.type_2}
                  products={info.new_products}
                />
              )}
              {info.hot_products.length > 0 && (
                <NewProductsSection
                  title="Sản phẩm bán chạy"
                  banners_ads={homeInfo.banner_ads.type_1}
                  products={info.hot_products}
                />
              )}
              {info.listlayout.length > 0 &&
                info.listlayout.map((layout) => (
                  <ProductSection
                    // banner_ads={homeInfo.banner_ads.type_5}
                    title={layout.title}
                    categories={info.categories}
                    products={layout.list}
                  />
                ))}
              {info.new_posts.length > 0 && <Blog posts={info.new_posts} />}
              {homeInfo.banner_ads.type_5.length > 0 && (
                <BannerAdsSection banners_ads={homeInfo.banner_ads.type_5} />
              )}
            </React.Fragment>
          )}
        </div>
      </main>
      <Footer />
    </React.Fragment>
  );
}
export default HomePage;
