import React from "react";
import queryString from "query-string";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
// import BlogCard from "./BlogCard";
import { constants as c } from "../../../constants";
import PageLoading from "../../../components/PageLoading";
import DataLoading from "./DataLoading";
const BlogCard = React.lazy(() => import("./BlogCard"));
const Paginate = React.lazy(() => import("../../../components/Paginate"));

// import Paginate from "../../../components/Paginate";
function ListNews(props) {
  let query = queryString.parse(props.location.search);
  const pageInfo = useSelector((state) => state.news.list);
  const categories = useSelector((state) => state.news.categories);
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
  return (
    <React.Fragment>
      <div
        className="news-list"
        style={{
          padding: "0px 10px 0px 10px",
        }}
      >
        <div className="title">
          <h3>Danh mục tin tức</h3>
          <h4>
            <span
              onClick={() => {
                window.location.href = "/";
              }}
            >
              Trang chủ /
            </span>{" "}
            Danh mục tin tức
          </h4>
        </div>
        <div className="news-category">
          {categories.list.map((v, i) => (
            <Link
              key={i}
              className="news-category-card"
              to={
                v.title
                  ? `/tin-tuc?danh-muc=${v.slug}-${v.id}`
                  : `/tin-tuc?danh-muc=${v.id}`
              }
            >
              {v.title}
            </Link>
          ))}
        </div>
        <div className="row" style={{}}>
          {pageInfo.data.map((v, i) => (
            <div className="card-container" key={i}>
              <BlogCard
                id={v.id}
                date={v.created_at}
                title={v.title}
                img={v.image_url}
                quote={v.summary}
                slug={v.slug}
              />
            </div>
          ))}
        </div>
        <Paginate
          currentPage={pageInfo.current_page}
          totalPage={pageInfo.last_page}
          handlePageSelect={handleSort}
        />
      </div>
    </React.Fragment>
    // ):<DataLoading />
  );
}
export default React.memo(ListNews);
