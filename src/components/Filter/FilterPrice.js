import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { formatNumber, formatPriceV2 } from "../../helper";

const FilterPriceStyles = styled.div`
  background-color: #ffffff;
  padding: 10px;
  margin-top: 10px;
  .filter__price__title {
    font-weight: 500;
    margin-bottom: 20px;
  }
  .filter__price__distance {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
    .filter__price__input input {
      width: 95px;
      height: 30px;
      padding: 0 5px;
      border: 1px solid rgba(0, 0, 0, 0.2);
      border-radius: 3px;
    }
    .filter__price__line {
      flex-shrink: 0;
      width: 10px;
      height: 1.5px;
      background-color: rgba(0, 0, 0, 0.2);
    }
  }
  .filter__price__apply {
    width: 100%;
    height: 30px;
    text-align: center;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.5s;
    &:hover {
      opacity: 0.9;
      transform: scale(1.03);
    }
  }
  .filter__price__error {
    font-size: 12px;
    color: #ff424f;
    margin-bottom: 10px;
  }
`;

const FilterPrice = () => {
  const appTheme = useSelector((state) => state.app.appTheme);

  const history = useHistory();

  const [priceFilter, setPriceFilter] = useState({
    min_price: new URLSearchParams(window.location.search).get("min_price")
      ? formatPriceV2(
          new URLSearchParams(window.location.search).get("min_price")
        )
      : "",
    max_price: new URLSearchParams(window.location.search).get("max_price")
      ? formatPriceV2(
          new URLSearchParams(window.location.search).get("max_price")
        )
      : "",
  });
  const [messageError, setMessageError] = useState("");

  const handleChangePriceFilter = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPriceFilter({
      ...priceFilter,
      [name]: formatPriceV2(value),
    });
    setMessageError("");
  };

  const handleApplyPriceFilter = () => {
    const min_price = Number(formatNumber(priceFilter.min_price));
    const max_price = Number(formatNumber(priceFilter.max_price));
    if (min_price && max_price && min_price > max_price) {
      setMessageError("Vui lòng chọn khoảng giá phù hợp");
    } else if (
      min_price ||
      max_price ||
      (min_price && max_price && min_price < max_price)
    ) {
      const searchParams = new URLSearchParams(window.location.search);
      const searchTextParam = searchParams.get("search") ?? "";
      const descendingParam = searchParams.get("descending") ?? "";
      const soryByParam = searchParams.get("sort_by") ?? "";

      const paramsPrice = `${
        min_price && max_price
          ? `min_price=${min_price}&max_price=${max_price}`
          : min_price
          ? `min_price=${min_price}`
          : `max_price=${max_price}`
      }`;
      const pathName = `/san-pham${
        searchTextParam || (descendingParam && soryByParam)
          ? `?search=${searchTextParam}&sort_by=${soryByParam}&descending=${descendingParam}&` +
            paramsPrice
          : `?${paramsPrice}`
      }`;
      history.push(pathName);
    }
  };

  const handleClearPrice = () => {
    setPriceFilter({
      min_price: "",
      max_price: "",
    });
  };

  return (
    <FilterPriceStyles className="filter__price">
      <div id="filter_price_clear" onClick={handleClearPrice}></div>
      <div className="filter__price__title">Khoảng giá</div>
      <div className="filter__price__distance">
        <div className="filter__price__input">
          <input
            type="text"
            name="min_price"
            id="filter__min__price"
            placeholder="₫ TỪ"
            value={priceFilter.min_price}
            onChange={handleChangePriceFilter}
          ></input>
        </div>
        <div className="filter__price__line"></div>
        <div className="filter__price__input">
          <input
            type="text"
            name="max_price"
            id="filter__max__price"
            placeholder="₫ ĐẾN"
            value={priceFilter.max_price}
            onChange={handleChangePriceFilter}
          ></input>
        </div>
      </div>
      {messageError ? (
        <p className="filter__price__error">{messageError}</p>
      ) : null}
      <button
        className="filter__price__apply"
        style={{
          backgroundColor: appTheme.color_main_1,
          color: "#ffffff",
        }}
        onClick={handleApplyPriceFilter}
      >
        Áp dụng
      </button>
    </FilterPriceStyles>
  );
};

export default FilterPrice;
