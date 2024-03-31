import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductSection from "./ProductHome/ProductHome1/ProductSection";
import Product from "./ProductHome/ProductHome2/Product";
import CategoryProduct from "./ProductHome/ProductHome2/CategoryProduct";
import BannerAds from "./ProductHome/ProductHome2/BannerAds";
import Product4 from "./ProductHome/ProductHome4/Product";
import BannerAds4 from "./ProductHome/ProductHome4/BannerAds";
import SpecialProduct from "./ProductHome/ProductHome3/SpecialProduct";
import Product3 from "./ProductHome/ProductHome3/Product";
import BannerAds3 from "./ProductHome/ProductHome3/BannerAds";
import ProductDeal from "./ProductHome/ProductHome5/ProductDeal";
import Product5 from "./ProductHome/ProductHome5/Product";
import BannerAds7 from "./ProductHome/ProductHome7/BannerAds";
import ProductSection7 from "./ProductHome/ProductHome7/ProductSection";
import Product7 from "./ProductHome/ProductHome7/ProductList";
import ProductDeal7 from "./ProductHome/ProductHome7/ProductSection";
import { voucherActions } from "../actions/voucherActions";
import Voucher from "./ProductHome/ProductHome9/Voucher";

import BannerAds8 from "./ProductHome/ProductHome8/BannerAds";
import ProductSection8 from "./ProductHome/ProductHome8/ProductSection";
import CategorySection from "./ProductHome/ProductHome6/CategorySection";
import SalesProductsSection from "./ProductHome/ProductHome6/SalesProductsSection";
import NewProductsSection from "./ProductHome/ProductHome6/NewProductsSection";
import ProductSection6 from "./ProductHome/ProductHome6/Product";

import Product9 from "./ProductHome/ProductHome9/Product";
import Product12 from "./ProductHome/ProductHome12/Product";
import ProductDeal9 from "./ProductHome/ProductHome9/ProductDeal";
import ProductDeal12 from "./ProductHome/ProductHome12/ProductDeal";
import ProductHome10 from "./ProductHome/ProductHome10/ProductHome10";
import ProductHome11FlashSale from "./ProductHome/ProductHome11/ProductHome11FlashSale";
// import Banner_2 from "./Banner/Banner2/index";
// import Banner_3 from "./Banner/Banner3/index";
// import Banner_4 from "./Banner/Banner4/index";
// import Banner_5 from "./Banner/Banner5/index";
// import Banner_6 from "./Banner/Banner6/index";
// import Banner_7 from "./Banner/Banner7/index";
// import Banner_8 from "./Banner/Banner8/index";
// import Banner_9 from "./Banner/Banner9/index";

import { constants as c } from "../constants";
import { appActions } from "../actions/appActions";
// import Header_Home from "./Header/headerHome";
import PageLoading from "./PageLoading";
import ProductHome11Promotions from "./ProductHome/ProductHome11/ProductHome11Promotions";
import ProductHome11Category from "./ProductHome/ProductHome11/ProductHome11Category";
import BlogNews from "./BlogNews";
import Footer from "./Footer";
import CategoryHome from "./ProductHome/ProductHome12/CategoryHome";
import "./ProductHome/ProductHome12/ProductHome12.css";

// const  ProductSection = React.lazy(() => import("./ProductHome/ProductHome1/ProductSection"));
// const Product = React.lazy(() => import("./ProductHome/ProductHome2/Product"));
// const CategoryProduct = React.lazy(() => import("./ProductHome/ProductHome2/CategoryProduct"));
// const BannerAds = React.lazy(() => import("./ProductHome/ProductHome2/BannerAds"));
// const Product4 = React.lazy(() => import("./ProductHome/ProductHome4/Product"));

// const  BannerAds4 = React.lazy(() => import("./ProductHome/ProductHome4/BannerAds"));

// const  SpecialProduct = React.lazy(() => import("./ProductHome/ProductHome3/SpecialProduct"));
// const Product3 = React.lazy(() => import("./ProductHome/ProductHome3/Product"));

// const  BannerAds3 = React.lazy(() => import("./ProductHome/ProductHome3/BannerAds"));
// const ProductDeal = React.lazy(() => import("./ProductHome/ProductHome5/ProductDeal"));
// const Product5 = React.lazy(() => import("./ProductHome/ProductHome5/Product"));
// const BannerAds8 = React.lazy(() => import("./ProductHome/ProductHome8/BannerAds"));
// const ProductSection8 = React.lazy(() => import("./ProductHome/ProductHome8/ProductSection"));
// const Product8= React.lazy(() => import("./ProductHome/ProductHome8/ProductList"));
// const  BannerAds9 = React.lazy(() => import("./ProductHome/ProductHome9/BannerAds"));
// const ProductSection9 = React.lazy(() => import("./ProductHome/ProductHome9/ProductSection"));
// const  CategorySection = React.lazy(() => import("./ProductHome/ProductHome6/CategorySection"));
// const SalesProductsSection = React.lazy(() => import("./ProductHome/ProductHome6/SalesProductsSection"));
// const  NewProductsSection = React.lazy(() => import("./ProductHome/ProductHome6/NewProductsSection"));
// const ProductSection6 = React.lazy(() => import("./ProductHome/ProductHome6/Product"));

export default function ProductHome(props) {
  const dispatch = useDispatch();
  const productHomeType = useSelector(
    (state) => state.app.appTheme.product_home_type
  );

  const bannerAds = useSelector((state) => state.app.bannerAds);
  const banners = useSelector((state) => state.app.banners);
  const category = useSelector((state) => state.category);

  const sale_products = useSelector((state) => state.app.hot_products);
  const new_products = useSelector((state) => state.app.new_products);
  const hot_products = useSelector((state) => state.app.sale_products);
  const voucher = useSelector((state) => state.voucher.list);

  const products_by_category = useSelector(
    (state) => state.app.products_by_category
  );
  console.log("sale_productsssssssssssssss", products_by_category);
  const headerType = useSelector((state) => state.app.appTheme.header_type);

  useEffect(() => {
    // document.title = appTheme.home_title;
    // window.scrollTo({
    //   top: 0,
    //   behavior: "smooth",
    // });
    if (banners.status === c.LOADING) dispatch(appActions.getAllBanners());
    if (sale_products.status === c.LOADING)
      dispatch(appActions.getAllSaleProduct());
    if (new_products.status === c.LOADING)
      dispatch(appActions.getAllNewProduct());
    if (hot_products.status === c.LOADING)
      dispatch(appActions.getAllHotProduct());
    if (products_by_category.status === c.LOADING)
      dispatch(appActions.getAllListProductWithCategory());
    if (voucher.status === c.LOADING) dispatch(voucherActions.getAllVoucher());
  }, []);

  function renderProductHome(productHomeType) {
    if (!productHomeType || productHomeType == 1) {
      return (
        <>
          {bannerAds.type_0.length > 0 && (
            <BannerAds4 banners={bannerAds.type_0} />
          )}

          {bannerAds.type_3.length > 0 && (
            <BannerAds4 banners={bannerAds.type_3} />
          )}
          {sale_products.data?.length > 0 && (
            <ProductSection
              title="Sản phẩm giảm giá"
              products={sale_products.data}
            />
          )}
          {bannerAds.type_2.length > 0 && (
            <BannerAds banners={bannerAds.type_2} />
          )}
          {new_products.data?.length > 0 && (
            <ProductSection title="Sản phẩm mới" products={new_products.data} />
          )}

          {bannerAds.type_1.length > 0 && (
            <BannerAds banners={bannerAds.type_1} />
          )}
          {hot_products.data?.length > 0 && (
            <ProductSection
              title="Sản phẩm nổi bật"
              products={hot_products.data}
            />
          )}

          {products_by_category.data?.length > 0 &&
            products_by_category.data.map((layout) => (
              <ProductSection
                title={layout.title}
                categories={category.categories}
                products={layout.list}
              />
            ))}
          {/* {bannerAds.type_4.length > 0 && (
            <BannerAds banners={bannerAds.type_4} />
          )} */}
        </>
      );
    }

    if (productHomeType == 2) {
      return (
        <>
          {
            <React.Fragment>
              <CategoryProduct
                banners={banners.data}
                categories={category.categories}
                discountProducts={sale_products.data}
              />
            </React.Fragment>
          }
          {bannerAds.type_0?.length > 0 && (
            <BannerAds banners={bannerAds.type_0} />
          )}
          {/* coupon25k */}
          {bannerAds.type_3?.length > 0 && (
            <BannerAds banners={bannerAds.type_3} />
          )}
          {/* uu dai 13tr */}
          {sale_products.data.length > 0 && (
            <Product title="Sản phẩm giảm giá" products={sale_products.data} />
          )}

          {bannerAds.type_2?.length > 0 && (
            <BannerAds banners={bannerAds.type_2} />
          )}
          {/* san pham moive */}
          {new_products.data.length > 0 && (
            <div
              style={{
                marginTop: 15,
              }}
            >
              <Product title="Sản phẩm mới" products={new_products.data} />
            </div>
          )}
          {bannerAds.type_1?.length > 0 && (
            <BannerAds banners={bannerAds.type_1} />
          )}
          {hot_products.data.length > 0 && (
            <Product title="Sản phẩm nổi bật" products={hot_products.data} />
          )}
          {products_by_category.data.length > 0 &&
            products_by_category.data.map((layout) => (
              <Product
                title={layout.title}
                categories={category.categories}
                products={layout.list}
                banners={layout.banner_ads}
              />
            ))}

          {/* {bannerAds.type_4.length > 0 && (
            <BannerAds banners={bannerAds.type_4} />
          )} */}
          {/* nuoc trai cay */}
        </>
      );
    }
    if (productHomeType == 3) {
      return (
        <>
          {sale_products.data.length > 0 && (
            <SpecialProduct products={sale_products.data} />
          )}
          {bannerAds.type_0?.length > 0 && (
            <BannerAds3 banners={bannerAds.type_0} />
          )}

          <div class="container product3333">
            <div class="row">
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                {bannerAds.type_2?.length > 0 && (
                  <BannerAds3 banners={bannerAds.type_2} />
                )}

                {new_products.data.length > 0 && (
                  <Product3
                    title="Sản phẩm mới"
                    categories={category.categories}
                    products={new_products.data}
                  />
                )}
                {bannerAds.type_1?.length > 0 && (
                  <BannerAds3 banners={bannerAds.type_1} />
                )}
                {hot_products.data.length > 0 && (
                  <Product3
                    title="Sản phẩm nổi bật"
                    products={hot_products.data}
                  />
                )}
                {products_by_category.data.length > 0 &&
                  products_by_category.data.map((layout) => (
                    <Product3
                      title={layout.title}
                      categories={category.categories}
                      products={layout.list}
                    />
                  ))}
              </div>
            </div>
          </div>

          {/* {bannerAds.type_4.length > 0 && (
            <BannerAds3 banners={bannerAds.type_4} />
          )} */}
        </>
      );
    }
    if (productHomeType == 4) {
      return (
        <>
          {bannerAds.type_0.length > 0 && (
            <BannerAds4 banners={bannerAds.type_0} />
          )}

          {bannerAds.type_3.length > 0 && (
            <BannerAds4 banners={bannerAds.type_3} />
          )}

          {sale_products.data.length > 0 && (
            <Product4 title="Sản phẩm giảm giá" products={sale_products.data} />
          )}

          {bannerAds.type_2.length > 0 && (
            <BannerAds4 banners={bannerAds.type_2} />
          )}
          {new_products.data.length > 0 && (
            <Product4 title="Sản phẩm mới" products={new_products.data} />
          )}
          {bannerAds.type_1.length > 0 && (
            <BannerAds4 banners={bannerAds.type_1} />
          )}
          {hot_products.data.length > 0 && (
            <Product4 title="Sản phẩm nổi bật" products={hot_products.data} />
          )}
          {products_by_category.data.length > 0 &&
            products_by_category.data.map((layout) => (
              <Product4
                title={layout.title}
                products={layout.list}
                categories={category.categories}
              />
            ))}

          {/* {bannerAds.type_4.length > 0 && (
            <BannerAds4 banners={bannerAds.type_4} />
          )} */}
        </>
      );
    }
    if (productHomeType == 5) {
      return (
        <>
          <section
            className="home-3 section product55"
            style={{
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <div className="Module Module-229">
              {bannerAds.type_0.length > 0 && (
                <BannerAds4 banners={bannerAds.type_0} />
              )}

              {/* {bannerAds.type_3.length > 0 && (
                <BannerAds4 banners={bannerAds.type_3} />
              )} */}
              {sale_products.data?.length > 0 && (
                <ProductDeal
                  banners_ads={bannerAds.type_3}
                  title="Sản phẩm giảm giá"
                  products={sale_products.data}
                />
              )}
              <div className="ModuleContent">
                {bannerAds.type_2.length > 0 && (
                  <BannerAds4 banners={bannerAds.type_2} />
                )}
                {new_products.data?.length > 0 && (
                  <Product5 title="Sản phẩm mới" products={new_products.data} />
                )}
                {bannerAds.type_1.length > 0 && (
                  <BannerAds4 banners={bannerAds.type_1} />
                )}
                {hot_products.data?.length > 0 && (
                  <Product5
                    title="Sản phẩm nổi bật"
                    products={hot_products.data}
                  />
                )}
                {products_by_category.data?.length > 0 &&
                  products_by_category.data.map((layout) => (
                    <Product5
                      title={layout.title}
                      categories={category.categories}
                      products={layout.list}
                    />
                  ))}
                {/* {bannerAds.type_4.length > 0 && (
                  <BannerAds4 banners={bannerAds.type_4} />
                )} */}
              </div>
            </div>
          </section>
        </>
      );
    }

    if (productHomeType == 6) {
      return (
        <>
          {/* {category.categories.length > 0 && (
            <CategorySection categories={category.categories} />
          )} */}
          {sale_products.data.length > 0 && (
            <Product7
              title="Sản phẩm giảm giá"
              banners_ads={bannerAds.type_3}
              products={sale_products.data}
            />
          )}
          {new_products.data.length > 0 && (
            <Product7
              title="Sản phẩm mới"
              banners_ads={bannerAds.type_2}
              products={new_products.data}
            />
          )}
          {hot_products.data?.length > 0 && (
            <Product7
              title="Sản phẩm nổi bật"
              banners_ads={bannerAds.type_1}
              products={hot_products.data}
            />
          )}
          {products_by_category.data?.length > 0 &&
            products_by_category.data.map((layout) => (
              <Product7
                // banner_ads={bannerAds.type_5}
                title={layout.title}
                categories={category.categories}
                products={layout.list}
              />
            ))}
          {/* {bannerAds.type_4.length > 0 && (
            <BannerAds4 banners={bannerAds.type_4} />
          )} */}
        </>
      );
    }
    if (productHomeType == 7) {
      return (
        <>
          {bannerAds.type_3.length > 0 && (
            <BannerAds7 banners={bannerAds.type_3} />
          )}
          {sale_products.data.length > 0 && (
            <div
              style={{
                marginBottom: 20,
              }}
            >
              <ProductDeal7
                title="Sản phẩm giảm giá"
                products={sale_products.data}
              />
            </div>
          )}
          {bannerAds.type_2.length > 0 && (
            <BannerAds banners={bannerAds.type_2} />
          )}
          {new_products.data.length > 0 && (
            <Product7 title="SẢN PHẨM MỚI" products={new_products.data} />
          )}
          {bannerAds.type_1.length > 0 && (
            <BannerAds7 banners={bannerAds.type_1} />
          )}
          {hot_products.data.length > 0 && (
            <Product7 title="SẢN PHẨM NỔI BẬT" products={hot_products.data} />
          )}
          {products_by_category.data.length > 0 &&
            products_by_category.data.map((layout) => (
              <Product7
                title={layout.title}
                categories={category.categories}
                products={layout.list}
              />
            ))}
          {/* {bannerAds.type_4.length > 0 && (
            <BannerAds7 banners={bannerAds.type_4} />
          )} */}
        </>
      );
    }
    if (productHomeType == 8) {
      return (
        <>
          {sale_products.data.length > 0 && (
            <ProductSection8
              title="sản phẩm sale"
              products={sale_products.data}
            />
          )}
          {bannerAds.type_1.length > 0 && (
            <BannerAds8 banners={bannerAds.type_1} />
          )}
          {hot_products.data.length > 0 && (
            <ProductSection
              title="Sản phẩm nổi bật"
              products={hot_products.data}
            />
          )}
          {bannerAds.type_2.length > 0 && (
            <BannerAds8 banners={bannerAds.type_2} />
          )}
          <div
            className="row"
            style={{ marginTop: "15px", width: "99%", margin: "0px auto" }}
          >
            <img
              src="/img/check-mark.png"
              style={{ width: "20px", marginBottom: "20px" }}
            />
            <h4 style={{ marginTop: "4x", marginLeft: "5px" }}>
              Thương hiệu chính hãng
            </h4>
          </div>
          {bannerAds.type_3.length > 0 && (
            <BannerAds8 banners={bannerAds.type_3} />
          )}
          {new_products.data.length > 0 && (
            <ProductSection
              title="Sản phẩm mới"
              categories={category.categories}
              products={new_products.data}
            />
          )}

          {bannerAds.type_4.length > 0 && (
            <BannerAds8 banners={bannerAds.type_4} />
          )}
          {products_by_category.data.length > 0 &&
            products_by_category.data.map((layout) => (
              <ProductSection
                title={layout.title}
                categories={category.categories}
                products={layout.list}
              />
            ))}
          {/* {bannerAds.type_4.length > 0 && (
              <BannerAds7 banners={bannerAds.type_4} />
            )} */}
        </>
      );
    }

    if (productHomeType == 9) {
      return (
        <>
          <section
            className="home-3 section product55"
            style={{
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <div className="Module Module-229">
              {bannerAds.type_0.length > 0 && (
                <BannerAds4 banners={bannerAds.type_0} />
              )}

              {bannerAds.type_3.length > 0 && (
                <BannerAds4 banners={bannerAds.type_3} />
              )}
              {voucher.data.length > 0 && <Voucher vouchers={voucher.data} />}
              {sale_products.data?.length > 0 && (
                <ProductDeal9
                  products={sale_products.data}
                  banners_ads={bannerAds.type_3}
                  title="Sản phẩm giảm giá"
                  // products={sale_products.data}
                />
              )}
              <div className="ModuleContent">
                {bannerAds.type_2.length > 0 && (
                  <BannerAds4 banners={bannerAds.type_2} />
                )}
                {new_products.data?.length > 0 && (
                  <Product9 title="Sản phẩm mới" products={new_products.data} />
                )}
                {bannerAds.type_1.length > 0 && (
                  <BannerAds4 banners={bannerAds.type_1} />
                )}
                {hot_products.data?.length > 0 && (
                  <Product9
                    title="Sản phẩm nổi bật"
                    products={hot_products.data}
                    // banners={bannerFeaturedProduct}
                  />
                )}
                {products_by_category.data?.length > 0 &&
                  products_by_category.data.map((layout) => (
                    <Product9
                      title={layout.title}
                      categories={category.categories}
                      products={layout.list}
                      banners={layout.banner_ads}
                    />
                  ))}
                {/* {bannerAds.type_4.length > 0 && (
                  <BannerAds4 banners={bannerAds.type_4} />
                )} */}
              </div>
            </div>
          </section>
        </>
      );
    }
    if (Number(productHomeType) === 10) {
      return (
        <>
          {sale_products.data?.length > 0 && (
            <ProductHome10
              title="Sản phẩm giảm giá"
              products={sale_products.data}
            />
          )}
          {new_products.data?.length > 0 && (
            <ProductHome10 title="Sản phẩm mới" products={new_products.data} />
          )}
          {hot_products.data?.length > 0 && (
            <ProductHome10
              title="Sản phẩm nổi bật"
              products={hot_products.data}
            />
          )}
          {products_by_category.data?.length > 0 &&
            products_by_category.data.map((layout, index) => (
              <ProductHome10
                key={index}
                title={layout.title}
                categories={category.categories}
                products={layout.list}
              />
            ))}
        </>
      );
    }
    if (Number(productHomeType) === 11) {
      return (
        <>
          {sale_products.data?.length > 0 && (
            <ProductHome11FlashSale
              title="Flash sale"
              products={sale_products.data}
            />
          )}
          {new_products.data?.length > 0 && (
            <ProductHome11Promotions
              title="Sản phẩm mới"
              products={new_products.data}
            />
          )}
          {hot_products.data?.length > 0 && (
            <ProductHome11Promotions
              title="Sản phẩm nổi bật"
              products={hot_products.data}
            />
          )}
          {products_by_category.data?.length > 0 &&
            products_by_category.data.map((layout, index) => (
              <ProductHome11Category
                key={index}
                title={layout.title}
                categories={category.categories}
                products={layout.list}
                category={layout}
              />
            ))}
        </>
      );
    }
    if (Number(productHomeType) === 12) {
      return (
        <div
          className="home-12"
          style={{ display: "flex", gap: "20px", background: "#F7F7F7" }}
        >
          <div
            style={{
              width: "257px",
              flexShrink: "0",
            }}
            className="home-12-categories"
          ></div>
          <section
            className="home-3 section product55"
            style={{
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <div className="Module Module-229">
              <CategoryHome />
              {sale_products.data?.length > 0 && (
                <ProductDeal12
                  products={sale_products.data}
                  banners_ads={bannerAds.type_3}
                  title="Sản phẩm giảm giá"
                  // products={sale_products.data}
                />
              )}
              <div className="ModuleContent">
                {/* {new_products.data?.length > 0 && (
                  <Product12 title="Sản phẩm mới" products={new_products.data} />
                )} */}
                {hot_products.data?.length > 0 && (
                  <Product12
                    title="Sản phẩm nổi bật"
                    products={hot_products.data}
                    // banners={bannerFeaturedProduct}
                  />
                )}
                {products_by_category.data?.length > 0 &&
                  products_by_category.data.map((layout) => (
                    <Product12
                      title={layout.title}
                      categories={category.categories}
                      products={layout.list}
                      banners={layout.banner_ads}
                    />
                  ))}
              </div>
              <BlogNews />
              {bannerAds.status === c.LOADING ? null : <Footer />}
            </div>
          </section>
        </div>
      );
    }
  }
  return (
    <React.Suspense fallback={<p></p>}>
      {" "}
      <React.Fragment>
        <div className=" container" style={{ background: "white" }}>
          {bannerAds.status === c.LOADING
            ? null
            : renderProductHome(productHomeType)}
          {/* {renderProductHome(productHomeType) } */}
        </div>
      </React.Fragment>
    </React.Suspense>
  );
}
