import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { newsActions as a } from "../../../actions/newsActions";
import { constants as c } from "../../../constants";
function NewsPage(props) {
  const dispatch = useDispatch();
  const pageInfo = useSelector((state) => state.news.info);

  useEffect(() => {
    let newsId = props.posts_id;
    if (pageInfo.status === c.LOADING) dispatch(a.getNewsInfo(newsId));
    if (pageInfo.status === c.SUCCESS) {
      if (parseInt(newsId) !== pageInfo.id)
        dispatch({ type: c.RESET_NEWS_STATUS });
    }
  }, [props.posts_id, pageInfo]);

  function extractContent(s) {
    var span = document.createElement("span");
    span.innerHTML = s;
    return span.textContent || span.innerText;
  }
  console.log(pageInfo);

  return (
    <React.Fragment>
      {pageInfo.status === c.SUCCESS ? (
        <section className="awe-section-2">
          <div className="section-abouts space-20 bg-gray">
            <div className="container">
              <div className="row section" id="About" name="About">
                <div
                  className="widget HTML widget-1"
                  data-version={2}
                  id="HTML1"
                >
                  <div className="col-md-6 col-sm-6">
                    <div className="title-text bg-grey text-left">
                      <Link
                        to={
                          pageInfo.title
                            ? `/tin-tuc/${pageInfo.slug}-${pageInfo.id}`
                            : `/tin-tuc/${pageInfo.id}`
                        }
                        title={pageInfo.title}
                      >
                        {" "}
                        <h2>{pageInfo.title}</h2>
                      </Link>
                    </div>
                    <div className="content">
                      <p>{extractContent(pageInfo.summary)} </p>
                    </div>
                  </div>
                </div>
                <div
                  className="widget HTML widget-2"
                  data-version={2}
                  id="HTML2"
                >
                  <div className="col-md-6 col-sm-6 text-center">
                    <Link
                      to={
                        pageInfo.title
                          ? `/tin-tuc/${pageInfo.slug}-${pageInfo.id}`
                          : `/tin-tuc/${pageInfo.id}`
                      }
                      title={pageInfo.title}
                    >
                      <img
                        alt={pageInfo.title}
                        className="img-responsive basic"
                        src={pageInfo.image_url}
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </React.Fragment>
  );
}
export default NewsPage;
