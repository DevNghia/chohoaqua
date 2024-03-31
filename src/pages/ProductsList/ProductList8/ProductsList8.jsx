import queryString from "query-string";
import React, { useEffect, useMemo } from "react";
import { useState } from "react";
import PageLoading from "../../../components/PageLoading";
import { useSelector } from "react-redux";
import { constants as c } from "../../../constants";
import { showNextElement } from "../../../helper";
import Select from "../../../components/Select";
import Paginate from "../../../components/Paginate";
import ProductCard from "../../../components/ProductCard";
import "./ProductsList8.css"
import { useLocation } from 'react-router-dom';

const BlogSection = React.lazy(() => import("../../Home/child/BlogSection"));
const BannerAds = React.lazy(() =>
  import("../../Home/child/HomePage2/BannerAds")
);
export default function ProductList(props) {
  const [count, setCount] = useState("");
  const homeInfo = useSelector((state) => state.app.home);
  const pageInfo = useSelector((state) => state.product.list);
  const [descending, setDescending] = useState("");
  const [sort_by, setSortBy] = useState("");

  let query = queryString.parse(props.location.search);
  const info = useMemo(() => {
    if (homeInfo.status === c.SUCCESS) {
      return {
        banners: homeInfo.banner.list,
      };
    } else {
      return {};
    }
  }, [homeInfo]);

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

  const location = useLocation();
  useEffect(() => {
    const currentPath = location.pathname;
    const searchParams = new URLSearchParams(location.search);
    setDescending(searchParams.get("descending") ?? "");
    setSortBy(searchParams.get("sort_by") ?? "");
  }, [location]);

  function getPlaceholder() {
    var index = arr_sort.findIndex((e) => e.descending == descending) 
    if(index != -1) {
      return arr_sort[index].title
    }
    return "Sắp xếp"
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
  ]

  return (
    <div className="products-lists ">
      <div className="breadcrumbs">
        <h4 className="">
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

      <div className="products-list">
        {homeInfo.status === c.LOADING ? (
          <PageLoading />
        ) : (
          <div>
            {homeInfo.banner_ads.type_2.length > 0 && (
              <BannerAds banners={homeInfo.banner_ads.type_2} />
            )}
          </div>
        )}
        <h3 className="title-list-product">Sắp xếp theo</h3>
        <div className="sort-options row">
          <Select
            placeholder={getPlaceholder()}
            handleSelect={handleSort}
            showDetail={showNextElement}
            values={arr_sort}
          />
        </div>
        <div className="row">
          {pageInfo.data.map((v, i) => (
            <ProductCard key={i} product={v} />
          ))}
        </div>
        <Paginate
          currentPage={pageInfo.current_page}
          totalPage={pageInfo.last_page}
          handlePageSelect={handleSort}
        />
      </div>
    </div>
  );
}
