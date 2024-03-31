import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { productActions as a } from "../../actions/productActions";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import useDebounce from "../../hooks/useDebounce";
import { formatPriceOrContact } from "../../helper";

const SearchStyles = styled.div`
  position: absolute;
  z-index: 60;
  top: 100%;
  background: #fff;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  &.disabled {
    display: none;
  }
  .search-container__title {
    padding: 10px;
    border-bottom: 1px solid #eee;
    background-color: #f5f5f5;
    font-size: 13px;
    color: #666;
  }
  .suggest_search {
    margin-bottom: 0;
  }
  .product_suggest {
    padding: 10px;
    .item-main {
      display: flex;
      .item-img {
        width: 60px;
        height: auto;
        flex-shrink: 0;
        margin: 0 6px 0 0;
      }
      .item-info {
        width: calc(100% - 66px);
        h3 {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          color: #333;
          font-size: 14px;
          overflow: hidden;
        }
      }
      .product-price {
        margin-top: 5px;
        display: flex;
        column-gap: 5px;
        align-items: center;
        .product__old-price {
          color: #999;
          font-size: 13px;
          text-decoration: line-through;
        }
      }
    }
  }
  &.rightPosition{
    right: 0;
  }
  &.leftPosition{
    left: 0;
  }
`;

export default function Search(props) {
  const { searchValue, limit = 5 } = props;
  const dispatch = useDispatch();
  const pageInfo = useSelector((state) => state.product.listSuggest);
  const appTheme = useSelector((state) => state.app.appTheme);
  const avt = "/img/default_product.jpg";

  const debouncedValue = useDebounce(searchValue, 500);
  const [suggestSearchModal, setSuggestSearchModal] = useState(false);
  const searchFirstRef = useRef(false);

  const handlePrice = (product) => {
    const { min_price, product_discount } = product;
    let discount = 0;

    if (product_discount) {
      discount = min_price * 0.01 * (100 - product_discount.value);
    }

    return (
      <div className="product-price flex items-end">
        <strong
          className="price text-main"
          style={{ color: appTheme.color_main_1 }}
        >
          {formatPriceOrContact(discount == 0 ? min_price : discount)}
        </strong>
        <del
          className={`product__old-price ${
            product_discount == null ||
            product_discount == 0 ||
            formatPriceOrContact(min_price) == "Liên hệ"
              ? "visible_discount"
              : ""
          }`}
        >
          {formatPriceOrContact(min_price)}{" "}
        </del>
      </div>
    );
  };

  const handleClickOutSide = (e) => {
    if (!e.target.closest(".search-modal") && !e.target.closest(".search-text"))
      setSuggestSearchModal(false);
  };

  useEffect(() => {
    const queries = `?limit=${limit}${
      debouncedValue ? `&search=${debouncedValue}` : ""
    }`;
    if (debouncedValue) {
      if (searchValue && searchFirstRef.current) {
        setSuggestSearchModal(true);
        dispatch(a.getSuggestProducts(queries));
      }
      searchFirstRef.current = true;
    }
  }, [dispatch, debouncedValue]);

  useEffect(() => {
    if (debouncedValue && searchValue === "") {
      const queries = `?limit=${limit}`;
      setSuggestSearchModal(false);
      dispatch(a.getSuggestProducts(queries));
    }
  }, [searchValue]);
  useEffect(() => {
    window.addEventListener("click", handleClickOutSide);

    return () => {
      window.removeEventListener("click", handleClickOutSide);
    };
  }, []);
  return (
    <>
      <SearchStyles
        {...props}
        className={`search-modal  ${
          pageInfo?.data?.length > 0 && suggestSearchModal ? "" : "disabled"
        } ${props.position === 'right' ? 'rightPosition' : 'leftPosition'} `}
        style={{
          width: props.width ? props.width : "100%",
          top: props.top ? props.top : '100%',
        }}
      >
        <div className="search-container">
          <div className="search-container__title">Sản phẩm gợi ý</div>
          <ul className="suggest_search">
            {pageInfo?.data?.length > 0
              ? pageInfo.data.map((product, index) => (
                  <li
                    className="product_suggest"
                    key={product.id}
                    style={{
                      borderBottom:
                        index !== pageInfo.data.length - 1
                          ? "1px solid #eee"
                          : "1px solid transparent",
                    }}
                  >
                    <Link to={`/san-pham/${product.slug}-${product.id}`}>
                      <div className="item-main">
                        <div className="item-img">
                          <img
                            src={
                              product.images?.length > 0
                                ? product.images[0].image_url
                                : avt
                            }
                            alt={product.name}
                          />
                        </div>
                        <div className="item-info">
                          <h3>{product.name}</h3>
                          {handlePrice(product)}
                        </div>
                      </div>
                    </Link>
                  </li>
                ))
              : null}
          </ul>
        </div>
      </SearchStyles>
    </>
  );
}
