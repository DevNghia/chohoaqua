import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlogSection from "./Blog/Blog1/BlogSection";
import Blog from "./Blog/Blog2/Blog";
import BannerAds from "./Blog/Blog2/BannerAds";
import Blog3 from "./Blog/Blog3/Blog";
import BannerAds3 from "./Blog/Blog3/BannerAds";
import Blog4 from "./Blog/Blog4/Blog";
import BannerAds4 from "./Blog/Blog4/BannerAds";
import Blog5 from "./Blog/Blog5/Blog";
import Blog6 from "./Blog/Blog6/Blog";
import Blog7 from "./Blog/Blog7/Blog";
import Blog8 from "./Blog/Blog8/Blog";
import Blog9 from "./Blog/Blog9/Blog";
import BannerAdsSection from "./Blog/Blog6/BannerAdsSection";

import { constants as c } from "../constants";
import { appActions } from "../actions/appActions";
import PageLoading from "./PageLoading";

export default function BlogNews(props) {
  const dispatch = useDispatch();
  const postHomeType = useSelector(
    (state) => state.app.appTheme.post_home_type
  );
  const appTheme = useSelector((state) => state.app.appTheme);
  const new_posts = useSelector((state) => state.app.new_posts);
  const posts_with_category = useSelector(
    (state) => state.app.posts_with_category
  );
  const bannerAds = useSelector((state) => state.app.bannerAds);
  const headerType = useSelector((state) => state.app.appTheme.header_type);
  console.log(bannerAds);
  useEffect(() => {
    // window.scrollTo({
    //   top: 0,
    //   behavior: "smooth",
    // });

    if (new_posts.status === c.LOADING) dispatch(appActions.getAllNewPosts());
    if (posts_with_category.status === c.LOADING)
      dispatch(appActions.getAllPostWithCategory());
  });

  function renderBlog(postHomeType) {
    if (!postHomeType || postHomeType == 1) {
      return (
        <>
          {new_posts.data?.length > 0 && <BlogSection posts={new_posts.data} />}
        </>
      );
    }

    if (postHomeType == 2) {
      return (
        <>
          {bannerAds.type_4?.length > 0 && (
            <BannerAds banners={bannerAds.type_4} />
          )}
          {new_posts.data?.length > 0 && <Blog posts={new_posts.data} />}
        </>
      );
    }
    if (postHomeType == 3) {
      return (
        <>
          {bannerAds.type_4?.length > 0 && (
            <BannerAds banners={bannerAds.type_4} />
          )}
          {new_posts.data.length > 0 && <Blog3 posts={new_posts.data} />}
        </>
      );
    }

    if (postHomeType == 4) {
      return (
        <>
          {bannerAds.type_4?.length > 0 && (
            <BannerAds banners={bannerAds.type_4} />
          )}
          {new_posts.data.length > 0 && <Blog4 posts={new_posts.data} />}
        </>
      );
    }

    if (postHomeType == 5) {
      return (
        <>
          {bannerAds.type_4?.length > 0 && (
            <BannerAds banners={bannerAds.type_4} />
          )}
          {new_posts.data.length > 0 && <Blog5 posts={new_posts.data} />}
          {/* {bannerAds.type_5.length > 0 && (
  <BannerAds4 banners={bannerAds.type_5} />
)} */}
        </>
      );
    }

    if (postHomeType == 6) {
      return (
        <>
          {bannerAds.type_4?.length > 0 && (
            <BannerAds banners={bannerAds.type_4} />
          )}
          {new_posts.data.length > 0 && <Blog6 posts={new_posts.data} />}
          {/* {bannerAds.type_5.length > 0 && (
  <BannerAdsSection banners_ads={bannerAds.type_5} />
)} */}
        </>
      );
    }

    if (postHomeType == 7) {
      var styleTitle = null;
      if (appTheme.home_page_type === 9)
        styleTitle = {
          color: "black",
          textTransform: "uppercase",
          fontWeight: "400",
          fontSize: "28px",
        };
      return (
        <>
          {new_posts.data.length > 0 && (
            <Blog7
              styleTitle={styleTitle}
              posts={new_posts.data}
              posts_with_category={posts_with_category.data ?? []}
            />
          )}
        </>
      );
    }
    if (Number(postHomeType) === 8) {
      return (
        <>{new_posts.data.length > 0 && <Blog8 posts={new_posts.data} />}</>
      );
    }
    if (Number(postHomeType) === 9) {
      return (
        <>{new_posts.data.length > 0 && <Blog9 posts={new_posts.data} />}</>
      );
    }
  }
  return (
    <React.Suspense fallback={<p></p>}>
      {" "}
      <React.Fragment>
        <div className="home-page container">
          {bannerAds.status === c.LOADING ? null : renderBlog(postHomeType)}
        </div>
      </React.Fragment>
    </React.Suspense>
  );
}
