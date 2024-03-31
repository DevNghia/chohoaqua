import ProductCard from "../../ProductCard";
import Slider from "react-slick";
import { useEffect, useState } from "react";
import "../../Header/Header10/style.css";
import "./style.css";
import ItemProduct from "../../ProductHome/ProductHome5/ItemProduct";
export default function ProductSection(props) {
  const [firstLine, setFirstLine] = useState(props.products);
  const [secondLine, setSecondLine] = useState([]);
  var settings1 = {
    infinite: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
    ],
  };
  var settings2 = {
    infinite: props.products.length > 5,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          infinite: props.products.length > 2,
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          infinite: props.products.length > 3,
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          infinite: props.products.length > 4,
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1500,
        settings: {
          infinite: props.products.length > 4,
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
    ],
  };
  useEffect(() => {
    const width = window.innerWidth;
    if (width < 600 && props.products.length > 4) {
      let firstArr = props.products.slice(0, 2);
      let secondArr = props.products.slice(2);
      setFirstLine(firstArr);
      setSecondLine(secondArr);
    }
    if (width >= 600 && width < 768 && props.products.length > 6) {
      let firstArr = props.products.slice(0, 3);
      let secondArr = props.products.slice(3);
      setFirstLine(firstArr);
      setSecondLine(secondArr);
    }
    if (width >= 768 && width < 992 && props.products.length > 8) {
      let firstArr = props.products.slice(0, 4);
      let secondArr = props.products.slice(4);
      setFirstLine(firstArr);
      setSecondLine(secondArr);
    }
    if (width >= 992 && width < 1500 && props.products.length > 10) {
      let firstArr = props.products.slice(0, 5);
      let secondArr = props.products.slice(5);
      setFirstLine(firstArr);
      setSecondLine(secondArr);
    }
    if (width >= 1500 && props.products.length > 12) {
      let firstArr = props.products.slice(0, 5);
      let secondArr = props.products.slice(5);
      setFirstLine(firstArr);
      setSecondLine(secondArr);
    }
  }, []);
  return (
    <div className="header-10 home-page-10 product9">
      <section className="section awe-section-4 ">
        <link
          rel="stylesheet"
          href="https://becareskin.com/wp-content/themes/X-V1-21/assets/flashsale.css"
          media="all"
        />
        <section
          className="section_flashsale flashsale"
          style={{
            backgroundColor: "#d82e4d",
            countdownBackground: "#ffffff",
            countdownColor: "#d82e4d",
            processBackground: "#fedfe2",
            processColor1: "#eb395f",
            processColor2: "#fabad3",
            stockColor: "#242424",
          }}
        >
          <div className="container pt-3 py-2 card border-0">
            <div className="title_module_main row heading-bar d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center flex-wrap flashsale__header col-12 col-lg-6">
                <div>
                  <h2 className="heading-bar__title flashsale__title">
                    <a
                      className="link"
                      href="#"
                      title="ƯU ĐÃI HOT, ĐỪNG BỎ LỠ!!"
                    >
                      ƯU ĐÃI HOT, ĐỪNG BỎ LỠ!!
                    </a>
                    <span className="ega-dot">
                      <span className="ega-ping" />
                    </span>
                  </h2>
                  <span className="flashsale__countdown-label" style={{}}>
                    Sản phẩm sẽ trở về giá gốc khi hết thời gian ưu đãi
                  </span>
                </div>
              </div>
            </div>
            <div>
              <div style={{ limitColumn: 5 }}>
                <div
                  className="product-list"
                  style={{ marginTop: "10px", marginBottom: "10px" }}
                >
                  <div style={{ width: "100%" }}>
                    <Slider {...settings1}>
                      {firstLine.map((v, i) => (
                        <ItemProduct product={v} />
                      ))}
                    </Slider>
                  </div>
                </div>
                {/* <div className="flashsale__item col-12 col-xl-15">
                  <div className="item_product_main">
                    <form
                      action="#"
                      method="post"
                      className="variants product-action"
                      encType="multipart/form-data"
                    >
                      <div className="product-thumbnail pos-relative">
                        <a
                          className="image_thumb pos-relative embed-responsive embed-responsive-1by1"
                          href="https://becareskin.com/san-pham/nuoc-tay-trang-bioderma"
                          title="Nước Tẩy Trang Bioderma 500ml"
                        >
                          <img
                            src="https://becareskin.com/wp-content/uploads/2021/12/bioderma-bensibio-H2O-500ml.jpg"
                            alt="Nước Tẩy Trang Bioderma 500ml"
                            data-image-scale="--image-scale: 0.5;--img-left: 0; transform: translate(0,-50%) scale(var(--image-scale));transform-origin: left center;"
                          />
                        </a>
                        <div className="label_product">
                          <div className="label_wrapper">-30%</div>
                        </div>
                        <div className="product-action">
                          <div className="group_action">
                            <a
                              title="Thêm vào yêu thích"
                              href="javascript:;"
                              className="xem_nhanh btn-circle btn-views btn_view btn right-to quick-view btn-addiwisth"
                              pro-id={28}
                            >
                              <i className="fas fa-heart" />
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="product-info">
                        <span className="product-vendor">BIODERMA</span>
                        <h3 className="product-name">
                          <a
                            href="https://becareskin.com/san-pham/nuoc-tay-trang-bioderma"
                            title="Nước Tẩy Trang Bioderma 500ml"
                          >
                            Nước Tẩy Trang Bioderma 500ml
                          </a>
                        </h3>
                        <div className="product-item-cta position-relative">
                          <div className="price-box">
                            <span className="price">350.000₫</span>
                            <span className="compare-price">500.000₫</span>
                            <div className="label_product d-lg-none d-md-none d-xl-none d-inline-block">
                              <div className="label_wrapper">-30%</div>
                            </div>
                          </div>
                          <button
                            className="product-item-btn btn add_to_cart active btn-addcart"
                            title="Thêm vào giỏ hàng"
                            pro-id={28}
                          >
                            <i className="fas fa-shopping-cart" />
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}
