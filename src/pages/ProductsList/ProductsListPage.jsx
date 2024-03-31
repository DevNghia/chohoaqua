import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { appActions } from "../../actions/appActions";
import { productActions as a } from "../../actions/productActions";
import { showNextElement } from "../../helper";
import { constants as c } from "../../constants";
import DataLoading from "./child/DataLoading";
import PageLoading from "../../components/PageLoading";
import { useLocation } from "react-router-dom";

const Header = React.lazy(() => import("../../components/Header"));
const Footer = React.lazy(() => import("../../components/Footer"));
const Select = React.lazy(() => import("./child/Select"));
const ListProduct = React.lazy(() => import("./child/ListProducts"));
const ProductList10 = React.lazy(() => import("./ProductList10"));
const CategoryColumn = React.lazy(() => import("./child/CategoryColumn"));
const CategoryColumn2 = React.lazy(() => import("./child/CategoryColumn2"));
const CategoryColumn3 = React.lazy(() => import("./child/CategoryColumn3"));
const CategoryColumn5 = React.lazy(() => import("./child/CategoryColumn5"));
const CategoryColumn8 = React.lazy(() => import("./child/CategoryColumn8"));
const CategoryColumn10 = React.lazy(() => import("./child/CategoryColumn10"));

function ProductsListPage(props) {
  const appTheme = useSelector((state) => state.app.appTheme.home_page_type);
  const dispatch = useDispatch();
  let query = queryString.parse(props.location.search);
  const bannerAds = useSelector((state) => state.app.bannerAds);

  const pageInfo = useSelector((state) => state.product.list);

  const [prevLocation, setPrevLocation] = useState(props.location.state);
  const [currentQuery, setCurrentQuery] = useState(createQueryString(query));
  const [currentSort, setCurrentSort] = useState(null);
  const [handleSelect, setHandleSelect] = useState(false);

  function createQueryString(option) {
    let keys = [...Object.keys(option)];
    for (let i = 0; i < keys.length; i++) {
      if (keys[i] !== "title") {
        if (keys[i] === "danh-muc") {
          let arr = option[keys[i]].split("-");
          let id = arr[arr.length - 1];
          query["category_ids"] = id;
        } else query[keys[i]] = option[keys[i]];
        if (keys[i] === "danh-muc-con") {
          let arr = option[keys[i]].split("-");
          let id = arr[arr.length - 1];
          query["category_children_ids"] = id;
        }
      }
    }
    let queryKeys = [...Object.keys(query)];
    let queryStr = queryKeys.reduce((rs, v) => `${rs}${v}=${query[v]}&`, "?");
    return queryStr;
  }
  function excuteSelect() {
    setHandleSelect(true);
    return "Sắp xếp";
  }
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
      if (keys[i] !== "title") {
        var query1 = {};
        if (handleSelect === true) {
          query[keys[i]] = option[keys[i]];
          query1[keys[i]] = option[keys[i]];
        } else {
          query1[keys[i]] = option[keys[i]];
        }
      }
    }
    let queryKeys = [...Object.keys(query1)];
    let queryStr = queryKeys.reduce((rs, v) => `${rs}${v}=${query[v]}&`, "?");
    return queryStr;
  }

  useEffect(() => {
    document.title = "Danh sách sản phẩm";
    const _queryString = window.location.search;
    const urlParams = new URLSearchParams(_queryString);
    var sort_by = urlParams.get("sort_by");
    var descending = urlParams.get("descending");
    var queryParams = "";
    if (sort_by) queryParams = queryParams + `&sort_by=${sort_by}`;
    if (descending) queryParams = queryParams + `&descending=${descending}`;

    let queryStr = createQueryString(query) + queryParams;

    if (
      queryStr !== currentQuery ||
      prevLocation !== window.location.pathname
    ) {
      dispatch({ type: c.RESET_PRODUCTS_LIST_STATUS });
      setCurrentQuery(queryStr);
      setPrevLocation(window.location.pathname);
    } else if (pageInfo.status === c.LOADING) {
      dispatch(a.getAllProducts(queryStr));
    }
  }, [props.location.search, pageInfo, currentSort]);

  const location = useLocation();
  useEffect(() => {
    const currentPath = location.pathname;
    const searchParams = new URLSearchParams(location.search);
  }, [location]);

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

  function getPlaceholder() {
    var index = arr_sort.findIndex(
      (e) => e.descending == currentSort?.descending
    );
    console.log(index);
    if (index != -1) {
      return arr_sort[index].title;
    }
    return "Sắp xếp";
  }
  console.log(getPlaceholder());
  return (
    // <React.Suspense fallback={<PageLoading />}>
    <React.Fragment>
      {/* <Header /> */}

      <div className="products-list-page container">
        <div className="mobile-tool mobile">
          <span>Có {pageInfo.total} sản phẩm</span>
          <Select
            placeholder={getPlaceholder()}
            handleSelect={getUrl}
            excuteSelect={excuteSelect}
            showDetail={showNextElement}
            values={arr_sort}
          />
        </div>
        <div
          className="row container"
          style={{
            justifyContent: "normal",
          }}
        >
          <div
            style={{
              flexShrink: "0",
            }}
          >
            {appTheme == 1 || appTheme == null || appTheme == 8 ? (
              <CategoryColumn bannerAds={bannerAds} />
            ) : appTheme == 2 ? (
              <CategoryColumn2 bannerAds={bannerAds} />
            ) : appTheme == 3 ? (
              <CategoryColumn3 bannerAds={bannerAds} />
            ) : appTheme == 5 ? (
              <CategoryColumn5 bannerAds={bannerAds} />
            ) : appTheme == 8 ? (
              <CategoryColumn8 bannerAds={bannerAds} />
            ) : appTheme == 10 ? (
              <CategoryColumn10 bannerAds={bannerAds} />
            ) : appTheme == 11 ? (
              <CategoryColumn5 bannerAds={bannerAds} />
            ) : appTheme == 12 ? null : (
              <CategoryColumn bannerAds={bannerAds} />
            )}{" "}
          </div>
          {pageInfo.status === c.SUCCESS ? (
            <>
              {appTheme == 10 ? (
                <ProductList10
                  getPlaceholder={getPlaceholder()}
                  location={props.location}
                />
              ) : (
                <ListProduct
                  getPlaceholder={getPlaceholder()}
                  location={props.location}
                />
              )}
            </>
          ) : (
            <DataLoading />
          )}
        </div>
      </div>
      {pageInfo.status === c.SUCCESS ? <Footer /> : <DataLoading />}
    </React.Fragment>

    // {/* </React.Suspense> */}
  );
}
export default ProductsListPage;
