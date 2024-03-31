// import BlogCard from "../../../components/BlogCard";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LazyImage from "../../LazyImage";
import Lazyload from "react-lazyload";
import Slider from "react-slick";
import "./style.css";
import styled from "styled-components";

const BlogStyles = styled.div`
  .section-content {
    margin: 0 -10px !important;
    .slick-slider {
      .slick-arrow.slick-prev {
        left: 10px !important;
      }
      .slick-arrow.slick-next {
        right: 10px !important;
      }
    }
    .blog-item-info {
      .blog-item-name {
        a {
          text-transform: uppercase;
          height: 48px;
          padding: 0 10px;
        }
      }
    }
  }
`;

export default function Blog(props) {
  const appTheme = useSelector((state) => state.app.appTheme);
  var settings = {
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 580,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  function extractContent(s) {
    var span = document.createElement("span");
    span.innerHTML = s;
    var text = span.textContent || span.innerText;
    return text.slice(0, 200);
  }
  function showBlog() {
    var array = [];

    for (let [i, v] of Object.entries(props.posts)) {
      array.push(
        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
          <div className="item">
            <article className="blog-item text-center">
              <div>
                <div className="blog-item-thumbnail">
                  <Link
                    to={
                      v.title
                        ? `/tin-tuc/${v.slug}-${v.id}`
                        : `/tin-tuc/${v.id}`
                    }
                  >
                    <Lazyload
                     offset={100}
                      throttle={300}
                      placeholder={<LazyImage></LazyImage>}
                    >
                      <img
                        style={{
                          height: "207px",
                          width: "100%",
                          "border-radius": "10px",
                          objectFit:'cover'
                        }}
                        alt=""
                        src={v.image_url}
                      />
                    </Lazyload>
                  </Link>
                </div>
                <div
                  className="blog-item-info m-4"
                  style={{ paddingLeft: "10px", paddingRight: "10px" }}
                >
                  <h3 className="blog-item-name">
                    <Link
                      style={{
                        display: "-webkit-box",
                        "-webkit-line-clamp": "2",
                        "-webkit-box-orient": "vertical",
                        overflow: "hidden",
                        "text-overflow": "ellipsis",
                      }}
                      to={
                        v.title
                          ? `/tin-tuc/${v.title
                              .replace(/[^a-zA-Z ]/g, "")
                              .replace(/\s/g, "-")}-${v.id}`
                          : `/tin-tuc/${v.id}`
                      }
                    >
                      {v.title}
                    </Link>
                  </h3>
                  <div
                    style={{
                      display: "-webkit-box",
                      "-webkit-line-clamp": "2",
                      "-webkit-box-orient": "vertical",
                      overflow: "hidden",
                      height: "34px",
                    }}
                    className=""
                    dangerouslySetInnerHTML={{
                      __html: extractContent(v.summary),
                    }}
                  ></div>
                  <Link
                    style={{
                      "margin-top": "10px",
                      background: appTheme.color_main_1,
                    }}
                    to={
                      v.title
                        ? `/tin-tuc/${v.slug}-${v.id}`
                        : `/tin-tuc/${v.id}`
                    }
                    className="btn"
                  >
                    Chi tiết
                  </Link>
                </div>
              </div>
            </article>
          </div>
        </div>
      );
    }
    return array;
  }

  return (
    <BlogStyles
      className="awe-section-8 blog2"
      id="awe-section-8"
      style={{
        marginTop: "20px",
      }}
    >
      <div className="section section_blog">
        <div className="container">
          <div className="section-title a-center">
            <h2>
              <Link
                title="Tin cập nhật"
                to="/tin-tuc"
                style={{ backgroundColor: appTheme.color_main_1 }}
              >
                Tin cập nhật
              </Link>
            </h2>
            <p>Cập nhật mới nhất mỗi ngày cho bạn</p>
          </div>
          <div className="section-content">
            <div
              className="blog-slider slick_blog"
              data-lg-items={3}
              data-md-items={3}
              data-sm-items={2}
              data-xs-items={2}
              data-nav="true"
            >
              <Slider {...settings}>{showBlog()}</Slider>
            </div>
          </div>
        </div>
      </div>
    </BlogStyles>
  );
}
