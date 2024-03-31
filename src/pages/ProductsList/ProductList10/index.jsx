import React, { useEffect, useState } from "react";
import queryString from "query-string";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { showNextElement } from "../../../helper";
import styled from "styled-components";
import Select from "../child/Select";
import ProductCard from "../../../components/ProductCard";
import Paginate from "../../../components/Paginate";
import ProductItem10 from "../../../components/ProductItem/ProductItem10/ProductItem10";

const ProductList10Styles = styled.section`
  width: 100%;
  margin-left: 20px;
  .product__categoryDivide {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin: 0 !important;
    .product__categoryCard {
    }
  }
  @media screen and (max-width: 992px) {
    .product__categoryDivide {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media screen and (max-width: 400px) {
    .breadcrumbs {
      padding: 15px 100px 15px 0 !important;
    }
  }
`;

const ProductList10 = (props) => {
  const pageInfo = useSelector((state) => state.product.list);
  let query = queryString.parse(props.location.search);

  function handleSort(option) {
    let keys = [...Object.keys(option)];
    for (let i = 0; i < keys.length; i++) {
      if (keys[i] !== "title") query[keys[i]] = option[keys[i]];
    }
    let queryKeys = [...Object.keys(query)];
    let queryStr = queryKeys.reduce((rs, v) => `${rs}${v}=${query[v]}&`, "?");
    window.location.href =
      window.location.origin + window.location.pathname + queryStr;
  }

  function getUrl(option) {
    let keys = [...Object.keys(option)];
    for (let i = 0; i < keys.length; i++) {
      if (keys[i] !== "title") query[keys[i]] = option[keys[i]];
    }
    let queryKeys = [...Object.keys(query)];
    let queryStr = queryKeys.reduce((rs, v) => `${rs}${v}=${query[v]}&`, "?");
    return queryStr;
  }

  const arr_sort = [
    {
      title: "Giá tiền: Tăng dần",
      sort_by: "price",
      descending: "false",
    },
    {
      title: "Giá tiền: Giảm dần",
      sort_by: "price",
      descending: "true",
    },
  ];

  return (
    <ProductList10Styles className="products-list">
      <div className="breadcrumbs ">
        <h4 className="cps-container">
          <span
            onClick={() => {
              window.location.href = "/";
            }}
          >
            Trang chủ /{" "}
          </span>
          Danh sách sản phẩm
        </h4>
      </div>
      <div className="sort-option row">
        <span>Có {pageInfo.total} sản phẩm trong danh mục</span>

        <Select
          placeholder={props.getPlaceholder}
          handleSelect={getUrl}
          showDetail={showNextElement}
          values={arr_sort}
        />
      </div>
      <div className="row product__categoryDivide">
        {pageInfo.data.map((product, index) => (
          <div className="product__categoryCard" key={index}>
            <ProductItem10 product={product} />
          </div>
        ))}
      </div>
      <Paginate
        currentPage={pageInfo.current_page}
        totalPage={pageInfo.last_page}
        handlePageSelect={handleSort}
      />
    </ProductList10Styles>
  );
};

export default ProductList10;
