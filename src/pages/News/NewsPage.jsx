import React, { useMemo, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { newsActions as a } from "../../actions/newsActions";
import { constants as c } from "../../constants";
import { stringToSlug } from "../../utils/stringToSlug";
import { appActions } from "../../actions/appActions";
import { FacebookIcon } from "react-share";
import { useHistory } from "react-router-dom";
import { FacebookShareButton } from "react-share";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";
import styled from "styled-components";
const BannerVertical = React.lazy(() =>
  import("../../components/BannerVertical")
);
const Header = React.lazy(() => import("../../components/Header"));
const Footer = React.lazy(() => import("../../components/Footer"));
const NewsCard = React.lazy(() => import("./child/NewsCard"));

const NewsPageStyles = styled.div`
  .link-popup {
    width: 400px;

    .copyShareContent {
      display: flex;
      border-radius: 4px;
      overflow: hidden;

      input {
        padding: 4px;
        flex-grow: 1;
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        border: 1px solid #ecf0f1;
      }
      .copyShareLink {
        margin: 0 !important;
        background-color: rgba(0, 0, 0, 0.3) !important;
        color: #ffffff !important;
        border-top-left-radius: 0 !important;
        border-bottom-left-radius: 0 !important;
        height: 100%;
        transition: all 0.5s;
        cursor: pointer;
        &:hover {
          background-color: rgba(0, 0, 0, 0.4) !important;
        }
      }
    }
  }
`;

function NewsPage(props) {
  const badges = useSelector((state) => state.user.badges);
  const profile = useSelector((state) => state.user.profile);

  const bannerAds = useSelector((state) => state.app.bannerAds);

  const dispatch = useDispatch();
  const pageInfo = useSelector((state) => state.news.info);
  const latestNews = useSelector((state) => state.news.list);
  const categories = useSelector((state) => state.news.categories);
  const [customClass, setCustomClass] = useState("");
  const myShareBtn = useRef(null);

  // document.title = pageInfo.title ? pageInfo.title : "Tin tức";
  document.title =
    pageInfo.title == null || pageInfo.title == ""
      ? pageInfo.title || "Tin tức"
      : pageInfo.title;

  console.log(pageInfo);
  function modalClick(e) {
    if (!customClass) return;
    let containers = document.querySelectorAll(".link-popup");
    for (let i = 0; i < containers.length; i++) {
      if (containers[i].contains(e.target)) return;
    }
    setCustomClass("");
  }
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    let newsId = -1;
    if (props.match.params.id) {
      let arr = props.match.params.id.split("-");
      newsId = arr[arr.length - 1];
    }

    if (pageInfo.status === c.LOADING) dispatch(a.getNewsInfo(newsId));
    if (pageInfo.status === c.SUCCESS) {
      if (parseInt(newsId) !== pageInfo.id)
        dispatch({ type: c.RESET_NEWS_STATUS });
      if (categories.status === c.LOADING) dispatch(a.getNewsCategory());
      if (latestNews.status === c.LOADING) dispatch(a.getAllNews(""));
    }
  }, [props.match.params.id, pageInfo]);

  function togglePopup() {
    setCustomClass(customClass ? "" : "center");
  }
  function copySharedLink() {
    const link = `${window.location.origin}/tin-tuc/${pageInfo.id}${
      profile?.id
        ? `?cowc_id=${profile.id}&rp=${encodedString(profile.phone_number)}`
        : ""
    }`;
    navigator.clipboard.writeText(link);
    togglePopup();
    dispatch(appActions.changePopup(c.AUTOHIDE_POPUP, "Copy Link thành công"));
  }
  function encodedString(str) {
    return btoa(str);
  }
  function hanldeShare() {
    myShareBtn.current.click();
  }

  console.log("pageInfo", pageInfo);
  return (
    <React.Fragment>
      {/* <Header /> */}
      {pageInfo.status === c.SUCCESS && categories.status === c.SUCCESS ? (
        <React.Fragment>
          <NewsPageStyles className="news-page">
            <div className="container">
              <div className="main-view">
                <div className="title">
                  <h4>
                    <span
                      onClick={() => {
                        window.location.href = "/";
                      }}
                    >
                      Trang chủ /
                    </span>
                    <span
                      onClick={() => {
                        window.location.href = "/tin-tuc";
                      }}
                    >
                      Tin tức /
                    </span>

                    {pageInfo.categories != null &&
                      pageInfo.categories.length > 0 && (
                        <span
                          onClick={() => {
                            window.location.href = `/tin-tuc?danh-muc=${pageInfo.categories[0].slug}-${pageInfo.categories[0].id}`;
                          }}
                        >
                          {pageInfo.categories[0].title} /
                        </span>
                      )}

                    {pageInfo.title}
                  </h4>
                </div>
                <div style={{ display: "flex", "justify-content": "start" }}>
                  <div className="news-category" style={{ width: "auto" }}>
                    {categories.list.map((v, i) => (
                      <Link
                        key={i}
                        className="news-category-card"
                        to={`/tin-tuc?danh-muc=${v.slug}-${v.id}`}
                      >
                        {v.title}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="news">
                  <div
                    style={{
                      display: "flex",
                      "justify-content": "space-between",
                    }}
                  >
                    <h1 className="title">{pageInfo.title}</h1>
                    <div
                      className="collaborator-action"
                      style={{
                        "margin-top": "0.5em",
                      }}
                    >
                      <div className="share">
                        {/* <label>Đăng bài: </label> */}
                        <button
                          style={{ fontSize: "13px", width: "30px" }}
                          onClick={hanldeShare}
                        >
                          <i className="fab fa-facebook-f"></i>
                        </button>
                      </div>
                      <button
                        style={{
                          fontSize: "13px",
                          width: "30px",
                          padding: "0",
                        }}
                        onClick={togglePopup}
                        id="link-btn"
                      >
                        <i className="fa fa-link"></i>
                      </button>
                    </div>
                  </div>

                  <div className="date">
                    <img src="/img/calendar.png" alt="" />
                    {pageInfo.created_at.split(" ")[0]}
                  </div>
                  <div className="paragraph">
                    <div
                      className="sun-editor-editable"
                      dangerouslySetInnerHTML={{ __html: pageInfo.content }}
                    ></div>

                    <div style={{ display: "none" }}>
                      <FacebookShareButton
                        ref={myShareBtn}
                        url={`${window.location.origin}/tin-tuc/${pageInfo.id}${
                          profile?.id
                            ? `?cowc_id=${profile.id}&rp=${encodedString(
                                profile.phone_number
                              )}`
                            : ""
                        }`}
                        quote={pageInfo.content}
                      >
                        <FacebookIcon size={40} round />
                      </FacebookShareButton>
                    </div>
                    {/* {badges.status_collaborator === 1 && ( */}

                    {/* )} */}
                  </div>
                </div>
              </div>
              <div className="latest-news">
                <h3 style={{ background: "white", marginBottom: "0px" }}>
                  Tin mới nhất
                </h3>
                <div className="column" style={{ background: "white" }}>
                  {latestNews.data.map(
                    (v, i) => i < 6 && <NewsCard key={v.id} {...v} />
                  )}
                </div>
                {bannerAds.status === c.SUCCESS
                  ? bannerAds?.type_7.length > 0 && (
                      <BannerVertical banners={bannerAds.type_7} />
                    )
                  : null}
              </div>
            </div>
            <div className={`modal ${customClass}`} onClick={modalClick}>
              <div className="link-popup">
                <div className="copyShareContent">
                  <input
                    readOnly
                    value={`${window.location.origin}/tin-tuc/${pageInfo.id}${
                      profile?.id
                        ? `?cowc_id=${profile.id}&rp=${encodedString(
                            profile.phone_number
                          )}`
                        : ""
                    }`}
                  ></input>
                  <button onClick={copySharedLink} className="copyShareLink">
                    <i className="fa fa-copy"></i>
                  </button>
                </div>
              </div>
            </div>
          </NewsPageStyles>

          <Footer />
        </React.Fragment>
      ) : null}
    </React.Fragment>
  );
}
export default NewsPage;
