import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ProductList11Category from "../../ProductList/ProductList11/ProductList11Category";
import Slider from "react-slick";
import { stringToSlug2 } from "../../../utils/stringToSlug";

const ProductHome11CategoryStyles = styled.section`
  margin-top: 15px;
  padding-bottom: 10px;
  background-color: #fff;
  position: relative;
  .product__title {
    position: relative;
    padding: 8px 10px 8px 0;
    display: flex;
    justify-content: space-between;

    .productHome11__showAll {
      cursor: pointer;
      i {
        font-size: 12px;
      }
    }
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 4px;
      background-color: red;
    }
    h2 {
      color: #070707;
      text-transform: uppercase;
      font-size: 16px;
      padding-left: 5px;
      img {
        width: 20px;
        height: 20px;
      }
    }
  }
  .product-list-product-category {
    padding: 0 10px;
    .product_category_title {
      color: #070707;
      text-transform: uppercase;
      font-size: 16px;
      margin: 20px 0 10px 0;
      font-weight: 600;
    }
  }
  .productHome11Category__listProduct {
    margin-left: -8px;
    .product__main {
      padding-left: 8px;
    }
  }
  &.productHome11CategoryDiscount {
    border: 3px solid transparent;
    border-radius: 15px;
    padding: 10px 30px;
    position: relative;
    margin-top: 50px;
    .product__title {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 4;
      width: 100%;
      transform: translateY(-50%);
      display: flex;
      justify-content: center;
      & > h2 {
        display: inline-block;
        padding: 5px 30px;
        border-radius: 30px;
        box-shadow: 0 2px 6px 1px rgba(0, 0, 0, 0.1);
        & > div {
          display: flex;
          align-items: center;
          column-gap: 10px;
        }
      }
    }
    .productHome11Category__content {
      margin-top: 50px;
    }
  }
  .product__category {
    display: flex;
    .product__category__left {
      width: 290px;
      height: 342px;
      overflow: hidden;
      display: none;
      img {
        width: 290px;
        height: 342px;
        object-fit: cover;
      }
    }
    .product__category__right {
      width: 100%;
      max-height: 342px;
      position: relative;
      border-top: 1px solid #eee;
      .product__category__item {
        border-right: 1px solid #eee;
        border-bottom: 1px solid #eee;
        display: flex;
        flex-direction: column;
        text-align: center;
        padding: 14px 0 10px;
        .product__category__image {
          width: 120px;
          height: 120px;
          margin: auto;
          img {
            height: auto;
            max-width: 100%;
            max-height: 100%;
          }
        }
        .product__category__name {
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
          display: -webkit-box;
          margin-top: 9px;
          padding: 0 5px;
        }
      }
    }
  }
  @media screen and (min-width: 920px) {
    .product__category {
      .product__category__left {
        display: block;
      }
      .product__category__right {
        width: calc(100% - 290px);
      }
    }
  }
`;

const ProductHome11Category = ({ title, categories, category, ...props }) => {
  const appTheme = useSelector((state) => state.app.appTheme);

  var settings = {
    infinite: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    rows: 2,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          infinite: false,
          slidesToShow: 2,
          slidesToScroll: 1,
          rows: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          infinite: false,
          slidesToShow: 3,
          slidesToScroll: 1,
          rows: 2,
        },
      },
      {
        breakpoint: 992,
        settings: {
          infinite: false,
          slidesToShow: 4,
          slidesToScroll: 1,
          rows: 2,
        },
      },
      {
        breakpoint: 1500,
        settings: {
          infinite: false,
          slidesToShow: 5,
          slidesToScroll: 1,
          rows: 2,
        },
      },
    ],
  };
  return (
    <ProductHome11CategoryStyles
      className={`productHome11Category`}
      style={{
        borderColor: appTheme.color_main_1,
      }}
    >
      <div className="productHome11Category__content">
        <div className="wrapper-container">
          <div className="product__title">
            <h2>
              {category ? (
                <Link
                  to={
                    category
                      ? `/san-pham?danh-muc=${stringToSlug2(title)}-${
                          category.value_action
                        }`
                      : "#"
                  }
                >
                  <h2>{title}</h2>
                </Link>
              ) : (
                <div>
                  <h2
                    style={{
                      display: "flex",
                      alignItems: "center",
                      columnGap: "5px",
                    }}
                  >
                    <img src="./img/hot-category.png" alt={title} />
                    <span>{title}</span>
                  </h2>
                </div>
              )}
            </h2>
            <div class="productHome11__showAll">
              <Link
                to={
                  categories && categories.length > 0
                    ? `/san-pham?danh-muc=${stringToSlug2(title)}-${
                        category.value_action
                      }`
                    : "#"
                }
              >
                Xem tất cả
                <i class="fa fa-chevron-right" aria-hidden="true"></i>
              </Link>
            </div>
          </div>
          <div className="product__category">
            <div className="product__category__left">
              <Link
                to={
                  category
                    ? `/san-pham?danh-muc=${stringToSlug2(title)}-${
                        category.value_action
                      }`
                    : "#"
                }
              >
                <img
                  src={category.image_url || "./img/default_product.jpg"}
                  alt=""
                />
              </Link>
            </div>
            <div className="product__category__right">
              <Slider {...settings}>
                {category.category_children?.map((v, i) => (
                  <div key={i} className="product__category__item">
                    <div className="product__category__image">
                      <Link to={`/san-pham?danh-muc-con=${v.slug}-${v.id}`}>
                        <img src={v.image_url} alt={v.name} />
                      </Link>
                    </div>
                    <div className="product__category__name">{v.name}</div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
          <div className="product-list-product-category">
            <div className="product_category_title">{title} nổi bật</div>
            <ProductList11Category
              products={props.products}
            ></ProductList11Category>
          </div>
        </div>
      </div>
    </ProductHome11CategoryStyles>
  );
};

export default ProductHome11Category;
