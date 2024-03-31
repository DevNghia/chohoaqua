// import BlogCard from "../../../components/BlogCard";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LazyImage from "../../LazyImage";
import Lazyload from "react-lazyload";
import Slider from "react-slick";
import "./style.css";
import styled from "styled-components";

const Blog3Styles = styled.div`
  margin-top: 20px;
  .blogs_mobile_base {
    margin: 0 -15px !important;
    .slick-slider {
      .slick-prev {
        left: 15px !important;
      }
      .slick-next {
        right: 15px !important;
      }
    }
  }
  @media only screen and (max-width: 600px) {
    .block-title {
      h2 {
        font-size: 24px !important;
      }
    }
  }
`;

export default function Blog(props) {
  const appTheme = useSelector((state) => state.app.appTheme);
  var settings = {
    infinite: props.posts.length > 2,
    ltr: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrow: true,
    dotsClass: "slick-dots slick-thumb",
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      // {
      //   breakpoint: 768,
      //   settings: {
      //     slidesToShow: 2,
      //     slidesToScroll: 1,
      //   },
      // },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  function showBlog() {
    var array = [];
    for (let [i, v] of Object.entries(props.posts)) {
      array.push(
        <div className="swiper-slide">
          <div className="item_blog_base" style={{ margin: "15px" }}>
            <Link
              className="thumb"
              to={v.title ? `/tin-tuc/${v.slug}-${v.id}` : `/tin-tuc/${v.id}`}
            >
              <Lazyload
                offset={100}
                throttle={300}
                placeholder={<LazyImage></LazyImage>}
              >
                <img
                  style={{ height: "100%", objectFit: "cover" }}
                  src={v.image_url}
                  className="lazy img-responsive"
                />
              </Lazyload>
            </Link>
            <div className="content_blog clearfix">
              <h3>
                <Link
                  className="a-title"
                  style={{ textTransform: "uppercase" }}
                  to={
                    v.title ? `/tin-tuc/${v.slug}-${v.id}` : `/tin-tuc/${v.id}`
                  }
                >
                  {v.title}
                </Link>
              </h3>

              <div className="time-post" style={{ height: "34px" }}>
                <span className="icon posted">
                  <div
                    className="text content-template-3"
                    style={{
                      display: "-webkit-box",
                      "-webkit-line-clamp": "2",

                      overflow: "hidden",
                      "-webkit-box-orient": "vertical",
                      // height: "50px",
                    }}
                    dangerouslySetInnerHTML={{
                      __html: extractContent(v.summary),
                    }}
                  ></div>
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return array;
  }

  function extractContent(s) {
    var span = document.createElement("span");
    span.innerHTML = s;
    return span.textContent || span.innerText;
  }

  return (
    <Blog3Styles className="awe-section-9 blog3">
      <div className="container section_blog" id="section_blog">
        <div className="swap">
          <div className="block-title">
            <h2>Tin tức mới nhất</h2>
          </div>
          <div className="blogs_mobile_base">
            <div className="blog-swiper swiper-container">
              <Slider {...settings}>{showBlog()}</Slider>
            </div>
          </div>
        </div>
      </div>
    </Blog3Styles>
  );
}
