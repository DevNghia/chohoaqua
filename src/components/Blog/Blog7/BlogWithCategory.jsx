// import BlogCard from "https://https://https://components/BlogCard";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import moment from "moment";
import LazyImage from "../../LazyImage";
import Lazyload from "react-lazyload";
import Introduce from "./Introduce";
import "./style.css";
export default function Blog(props) {
  const { posts } = props;
  const appTheme = useSelector((state) => state.app.appTheme);

  var settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  function extractContent(s) {
    var span = document.createElement("span");
    span.innerHTML = s;
    return span.textContent || span.innerText;
  }
  return (
    <div style={{ marginTop: "20px" }}>
      <section className="awe-section-3 ">
        <div className="container space-40">
          <div
            className="row section"
            id="SectionOne"
            name="Tin tức và thư viện ảnh"
          >
            <div className="widget TextList" data-version={2} id="TextList1">
              <div className="col-md-6">
                <div className="title-text space-20">
                  <h2>
                    <Link
                      to={
                        props.title
                          ? `/tin-tuc?danh-muc=${props.slug}-${props.id}`
                          : `/tin-tuc?danh-muc=${props.id}`
                      }
                      title="Tin tức"
                    >
                      {props.title}
                    </Link>
                  </h2>
                  {/* <Link className="read-more" to="/tin-tuc" title="Xem tất cả">
                    Xem tất cả <i className="fa fa-angle-double-right" />
                  </Link> */}
                </div>
                <div className="home-blog post-with-category">
                  {posts.map((v, i) => {
                    var rightColumn = Math.floor(posts.length / 2);
                    var leftColumn = Math.ceil(posts.length / 2);
                    var length = posts.length;

                    return (
                      <div
                        className={`item item-with-category ${length > 2 && (i == length - 1 || i == length - 2)
                            ? ""
                            : "border-bottom-item"
                          } `}
                      >
                        {" "}
                        <Link
                          to={
                            v.title
                              ? `/tin-tuc/${v.slug}-${v.id}`
                              : `/tin-tuc/${v.id}`
                          }
                          title={v.title}
                          className="thumb img-shine name"
                        >
                          <Lazyload
                            offset={100}
                            throttle={300}
                            placeholder={<LazyImage></LazyImage>}
                          >
                            <img
                              className="img-responsive basic lazyloaded"
                              src={v.image_url}
                              alt={v.title}
                            />
                          </Lazyload>

                        </Link>{" "}
                        <div className="text text-with-category">
                          {" "}
                          <h3>
                            {" "}
                            <Link
                              className="name"
                              to={
                                v.title
                                  ? `/tin-tuc/${v.slug}-${v.id}`
                                  : `/tin-tuc/${v.id}`
                              }
                              title="Giá dịch vụ y tế trong và ngoài phạm vi BHYT tăng từ 20/8"
                            >
                              {v.title}
                            </Link>{" "}
                          </h3>{" "}
                          <div className="date">
                            {" "}
                            {moment(v.created_at).format("DD")}{" "}
                            <span>
                              {" "}
                              tháng {moment(v.created_at).format("MM")}{" "}
                            </span>{" "}
                          </div>{" "}
                          <p className="text3line">
                            {extractContent(v.summary)}{" "}
                          </p>
                        </div>{" "}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
