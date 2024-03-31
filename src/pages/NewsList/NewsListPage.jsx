import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { constants as c } from "../../constants";
import { appActions } from "../../actions/appActions";
import PageLoading from "../../components/PageLoading";
import { newsActions as a } from "../../actions/newsActions";

const ListNews = React.lazy(() => import('./child/ListNews'));
const Header = React.lazy(() => import('../../components/Header'));
const Footer = React.lazy(() => import('../../components/Footer'));
const DataLoading = React.lazy(() => import('./child/DataLoading'));
const CategoryColumn = React.lazy(() => import('./child/CategoryColumn'));
const CategoryColumn2 = React.lazy(() => import('./child/CategoryColumn2'));
const CategoryColumn3 = React.lazy(() => import('./child/CategoryColumn3'));
const CategoryColumn5 = React.lazy(() => import('./child/CategoryColumn5'));

function NewsListPage(props) {
  let query = queryString.parse(props.location.search);
  const pageInfo = useSelector((state) => state.news.list);
  const appTheme = useSelector((state) => state.app.appTheme.home_page_type);
  const bannerAds = useSelector((state) => state.app.bannerAds);

  const categories = useSelector((state) => state.news.categories);
  const dispatch = useDispatch();
  const [prevLocation, setPrevLocation] = useState(props.location.state);
  const [currentQuery, setCurrentQuery] = useState(createQueryString(query));
  function createQueryString(option) {
    let keys = [...Object.keys(option)];
    for (let i = 0; i < keys.length; i++) {
      if (keys[i] !== "title") {
        if (keys[i] === "danh-muc") {
          let arr = option[keys[i]].split("-");
          let id = arr[arr.length - 1];
          query["category_ids"] = id;
        } else query[keys[i]] = option[keys[i]];
      }
    }
    let queryKeys = [...Object.keys(query)];
    let queryStr = queryKeys.reduce((rs, v) => `${rs}${v}=${query[v]}&`, "?");
    return queryStr;
  }


  useEffect(() => {
    document.title = "Danh sách bài viết";
    let queryStr = createQueryString(query);

    if (
      queryStr !== currentQuery ||
      prevLocation !== window.location.pathname
    ) {
      dispatch({ type: c.RESET_NEWS_LIST_STATUS });
      setCurrentQuery(queryStr);
      setPrevLocation(window.location.pathname);
    } else if (pageInfo.status === c.LOADING) {
      let queryStr = createQueryString(query);
      dispatch(a.getAllNews(queryStr));
    } else {
      if (categories.status === c.LOADING) {
        dispatch(a.getNewsCategory());
      }
    }
  }, [props.location.search, pageInfo]);
  return (
   
    // <React.Suspense fallback={<PageLoading />}>
    <React.Fragment>
  
    {/* {categories.status === c.SUCCESS ? ( */}
      <div className="news-list-page container">
        <div className="row">
          {appTheme == 1 || appTheme == null ? (
            <CategoryColumn bannerAds={bannerAds} />
          ) : appTheme == 2 ? (
            <CategoryColumn2 bannerAds={bannerAds} />
          ) : appTheme == 3 ? (
            <CategoryColumn3 bannerAds={bannerAds} />
          ) : appTheme == 5 ? (
            <CategoryColumn5 bannerAds={bannerAds} />
          ):(
            <CategoryColumn bannerAds={bannerAds} />
          )}

          {pageInfo.status === c.SUCCESS ? (
            <ListNews location={props.location} />
          ) : (
            <DataLoading />
          )}
        </div>
      </div>
    {/* ) : (
     null
    )} */}
              {pageInfo.status === c.SUCCESS ? (
              <Footer />
          ) : (
            <DataLoading />
          )}

  </React.Fragment>


    // </React.Suspense>
  );
}
export default NewsListPage;
