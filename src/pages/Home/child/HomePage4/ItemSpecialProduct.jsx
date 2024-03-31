import Slider from "react-slick";
import { Link } from "react-router-dom";
import { standardProductLink } from "../../../../helper";

import {
  formatPrice,
  formatPriceOrContact,
  handleImgErr,
} from "../../../../helper";

import { useSelector } from "react-redux";
export default function ItemProduct(props) {
  const appTheme = useSelector((state) => state.app.appTheme);
  const badges = useSelector((state) => state.user.badges);
  let {
    min_price,
    price,
    product_discount,
    percent_collaborator,
    images,
    name,
    slug,
    id,
  } = props.product;
  let pastPrice = min_price;
  let discount = 0;
  let discount_percent = 0;
  let avt = "/img/default_product.jpg";
  if (product_discount) {
    discount_percent = product_discount.value;
    discount = min_price * 0.01 * (100-product_discount.value);
    price = min_price - discount;
  }
  if (images.length) avt = images[0].image_url;

  function handleCateClick(id) {
    window.location.href = `/san-pham?danh-muc-ids=${id}`;
  }
  return (
    <div className="section_product product_1" id="product_1">
      <div className="container">
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12 col-12">
            <div className="block-product">
              <div className="swiper-container">
                <div className="swiper-wrapper">
                  <div className="swiper-slide">
                    <div className=" item_product_main">
                      <div className="product-block-item">
                        <div
                          class={`sale-label sale-top-right ${
                            product_discount == null || product_discount == 0
                              ? "hide"
                              : "show"
                          }`}
                        >
                          <span>- {discount_percent}%</span>
                        </div>
                        <div className="product-transition">
                          <Link
                            className="product-thumb"
                            to={`/san-pham/${slug}-${id}`}
                            href="oi-le-ruot-do.html"
                          >
                            <img
                              className="product-thumbnail lazy"
                              src={avt}
                              alt="Ổi lê ruột đỏ"
                            />
                          </Link>
                        </div>
                        <div className="product-info">
                          <a
                            href="dao-do-my.html"
                            title="Đào đỏ Mỹ"
                            className="item-product-name"
                          >
                            {name}
                          </a>
                          <div className="product__price">
                            <span className="price">
                              {" "}
                              ₫{formatPriceOrContact(min_price)}
                            </span>

                            <span
                              class={`old-price ${
                                product_discount == null ||
                                product_discount == 0
                                  ? "hide"
                                  : ""
                              }`}
                            >
                              {"  "}₫{formatPriceOrContact(discount)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    // <div className="swiper-slide">
    //   <div className=" item_product_main">
    //     <div className="product-block-item">
    //       <div
    //         class={`sale-label sale-top-right ${
    //           product_discount == null || product_discount == 0
    //             ? "hide"
    //             : "show"
    //         }`}
    //       >
    //         <span>- {discount_percent}%</span>
    //       </div>
    //       <div className="product-transition">
    //         <Link
    //           className="product-thumb"
    //           to={`/san-pham/${standardProductLink(name)}-${id}`}
    //           href="oi-le-ruot-do.html"
    //         >
    //           <img
    //             className="product-thumbnail lazy"
    //             src={avt}
    //             alt="Ổi lê ruột đỏ"
    //           />
    //         </Link>

    //       </div>
    //       <div className="product-info">
    //         <a
    //           href="oi-le-ruot-do.html"
    //           title="Ổi lê ruột đỏ"
    //           className="item-product-name"
    //         >
    //           {name}
    //         </a>
    //         <div className="product__price">
    //           <span className="price"> ₫{formatPriceOrContact(price)}</span>
    //           {/* <span className="old-price">50.000₫</span> */}
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}
