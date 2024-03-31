// import ProductCard from "../../../components/ProductCard";
import Slider from "react-slick";
import { Link, NavLink } from "react-router-dom";
import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import ProductItem11Promotions from "../../ProductItem/ProductItem11/ProductItem11Promotions";

const ProductListStyles = styled.div`
  margin-top: 0 !important;
  .product-category-list {
    background-color: transparent;
  }
  .slick-list {
    margin: 0 -5px;
  }
  .slick-slide > div {
    padding: 0 5px;
  }
  .product-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }

  @media screen and (min-width: 600px) {
    .product-list {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  @media screen and (min-width: 768px) {
    .product-list {
      grid-template-columns: repeat(4, 1fr);
    }
  }
  @media screen and (min-width: 992px) {
    .product-list {
      grid-template-columns: repeat(5, 1fr);
    }
  }
`;

export default function ProductList11Promotions(props) {
  const { banners, categories, discountProducts } = props;
  const appTheme = useSelector((state) => state.app.appTheme);

  const info = useMemo(() => {
    if (categories && categories.length > 0) {
      return {
        category: categories.filter((v) => v.name === props.title),
      };
    } else {
      return {};
    }
  }, [categories]);
  const [firstLine, setFirstLine] = useState(props.products);

  return (
    <ProductListStyles className="product-category-list-wrap product11">
      <div className="container">
        <div className="product-category-list ajax-response-parent">
          <div className="product-category-list-heading flex justify-between items-center">
            <div className="category-title flex items-center">
              <Link
                to={
                  info.category && info.category.length > 0
                    ? `/san-pham?danh-muc=${info.category[0].slug}-${info.category[0].id}`
                    : "#"
                }
              >
                <h2 className="section-title text-blue ml-2">{props.title}</h2>
              </Link>
            </div>
          </div>
          <div className="product-category-list-body">
            <div
              className="product-category-tab show"
              style={{ display: "block" }}
            >
              <div className="product-list">
                {firstLine?.slice(0, 15).map((v, i) => (
                  <ProductItem11Promotions product={v} key={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProductListStyles>
  );
}
