import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { constants as c } from "../../constants";
import { appActions } from "../../actions/appActions";
import PageLoading from "../../components/PageLoading";

const Header = React.lazy(() => import("../../components/Header"));
const ProductSection = React.lazy(() => import("./child/ProductSection"));
const Blog = React.lazy(() => import("./child/HomePage5/Blog"));
const HomeBanner = React.lazy(() => import("./child/HomeBanner"));
const Footer = React.lazy(() => import("../../components/Footer"));

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

      <div className="home-page container">
        {homeInfo.status === c.LOADING ? (
          <PageLoading />
        ) : (
          <React.Fragment>
            <HomeBanner
              banners={info.banners}
              categories={info.categories}
              discountProducts={info.sale_products}
            />
            {info.sale_products.length > 0 && (
              <ProductSection
                title="Sản phẩm giảm giá"
                products={info.sale_products}
              />
            )}
            {info.new_products.length > 0 && (
              <ProductSection
                title="Sản phẩm mới"
                products={info.new_products}
              />
            )}
            {info.hot_products.length > 0 && (
              <ProductSection
                title="Sản phẩm nổi bật"
                products={info.hot_products}
              />
            )}
            {info.listlayout.length > 0 &&
              info.listlayout.map((layout) => (
                <ProductSection
                  title={layout.title}
                  products={layout.list}
                  categories={info.categories}
                />
              ))}
            {info.new_posts.length > 0 && <Blog posts={info.new_posts} />}
          </React.Fragment>
        )}
      </div>

      <Footer />
    </React.Fragment>
  );
}
export default HomePage;
