import queryString from "query-string";
import { useSelector } from "react-redux";
import { showNextElement } from "../../../helper";
import Select from "./Select";
import Paginate from "../../../components/Paginate";
import ProductCard from "../../../components/ProductCard";
import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const CategoryPageStyles = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-left: 5px;
  .category_list {
    background-color: #fff;
    .category_content {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      flex-wrap: wrap;
      gap: 15px;
      .category_item {
        a {
          text-align: center;
          vertical-align: top;
          width: 100%;
          display: flex;
          justify-content: center;
          flex-direction: column;
          .category_image {
            width: 60px;
            height: 60px;
            margin: 0 auto 5px;
            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
              border-radius: 5px;
            }
          }
          .category_name {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
  @media only screen and (max-width: 1090px) {
    .category_list {
      .category_content {
        grid-template-columns: repeat(6, 1fr);
      }
    }
  }
  @media only screen and (max-width: 920px) {
    .category_list {
      .category_content {
        grid-template-columns: repeat(4, 1fr);
      }
    }
  }
  @media only screen and (max-width: 500px) {
    .category_list {
      display: none;
    }
    .category_line {
      display: none;
    }
  }
`;

export default function ListProduct(props) {
  const pageInfo = useSelector((state) => state.product.list);
  const appTheme = useSelector((state) => state.app.appTheme);
  const categories = useSelector((state) => state.category.categories);
  let query = queryString.parse(props.location.search);

  const [descending, setDescending] = useState("");
  const [sort_by, setSortBy] = useState("");
  const [categoriesChild, setCategoriesChild] = useState([]);

  function handleSort(option) {
    let keys = [...Object.keys(option)];
    for (let i = 0; i < keys.length; i++) {
      if (keys[i] !== "title") query[keys[i]] = option[keys[i]];
    }
    let queryKeys = [...Object.keys(query)];
    let queryStr = queryKeys.reduce((rs, v) => `${rs}${v}=${query[v]}&`, "?");
    console.log(window.location.origin, window.location.pathname, queryStr);
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
    console.log(window.location.origin, window.location.pathname, queryStr);
    // window.location.href = window.location.origin + window.location.pathname + queryStr
    return queryStr;
    // props.setCurrentSort({sort_by : option.sort_by , descending : option.descending})
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

  const location = useLocation();
  useEffect(() => {
    const currentPath = location.pathname;
    const searchParams = new URLSearchParams(location.search);
    setDescending(searchParams.get("descending") ?? "");
    setSortBy(searchParams.get("sort_by") ?? "");
  }, [location]);

  function getPlaceholder() {
    var index = arr_sort.findIndex((e) => e.descending == descending);
    if (index != -1) {
      return arr_sort[index].title;
    }
    return "Sắp xếp";
  }
  useEffect(() => {
    if (categories?.length > 0) {
      const searchParams = document.location.search;
      const id = searchParams?.split("-")?.slice(-1)
        ? searchParams?.split("-")?.slice(-1)[0]
        : "";
      let newCategoriesChild = [];
      categories.forEach((category) => {
        if (category?.id == id) {
          newCategoriesChild = category.category_children;
          return;
        }
        // else {
        //   let newCategoriesTemp = category.category_children;
        //   category.category_children?.forEach((categoryChild) => {
        //     if (categoryChild?.id == id) {
        //       newCategoriesChild = newCategoriesTemp;
        //       return;
        //     }
        //   });
        // }
      });

      setCategoriesChild(newCategoriesChild);
    }
  }, [categories]);

  return (
    <CategoryPageStyles className="category_page">
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
      {categoriesChild.length > 0 && (
        <div className="category_list">
          <div className="category_content">
            {categoriesChild.map((item) => (
              <div className="category_item" key={item.id}>
                <Link to={`san-pham?danh-muc-con=${item.slug}-${item.id}`}>
                  <div className="category_image">
                    <img
                      src={
                        item.image_url
                          ? item.image_url
                          : process.env.PUBLIC_URL + `/img/default_product.jpg`
                      }
                      alt={item.name}
                    />
                  </div>
                  <div className="category_name">{item.name}</div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
      {categoriesChild.length > 0 && (
        <div
          style={{
            margin: "30px auto 30px",
            width: "30%",
            height: "1px",
            backgroundColor: appTheme.color_main_1,
            opacity: "0.3",
          }}
          className="category_line"
        ></div>
      )}

      <div
        className="products-list"
        style={{
          width: "100%",
        }}
      >
        <div className="sort-option row">
          <span
            style={{
              fontSize: "16px",
            }}
          >
            Có {pageInfo.total} sản phẩm trong danh mục
          </span>

          <Select
            placeholder={props.getPlaceholder}
            handleSelect={getUrl}
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
    </CategoryPageStyles>
  );
}
