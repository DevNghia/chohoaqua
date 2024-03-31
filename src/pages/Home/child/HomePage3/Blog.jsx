// import BlogCard from "../../../components/BlogCard";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Slider from "react-slick";
export default function Blog(props) {
  const appTheme = useSelector((state) => state.app.appTheme);
  var settings = {
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };

  function showBlog() {
    var array = [];
    for (let [i, v] of Object.entries(props.posts)) {
      console.log(i);
      array.push(
        <div className="swiper-slide">
          <div className="item_blog_base" style={{ margin: "15px" }}>
            <Link
              className="thumb"
              to={
                v.title
                  ? `/tin-tuc/${v.slug}-${v.id}`
                  : `/tin-tuc/${v.id}`
              }
            >
              <img
                style={{ height: "100%" , objectFit :"cover"}}
                src={v.image_url}
                className="lazy img-responsive"
              />
            </Link>
            <div className="content_blog clearfix">
              <h3>
                <Link
                  className="a-title"
                  to={
                    v.title
                      ? `/tin-tuc/${v.slug}-${v.id}`
                      : `/tin-tuc/${v.id}`
                  }
                >
                  {v.title}
                </Link>
              </h3>

              <div className="time-post">
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
                    dangerouslySetInnerHTML={{ __html: extractContent(v.summary) }}
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
    var span = document.createElement('span');
    span.innerHTML = s;
    return span.textContent || span.innerText;
  };

  return (
    <section className="awe-section-9">
      <div className="container section_blog" id="section_blog">
        <div className="swap">
          <div className="block-title">
            <h2>
              Tin tức mới nhất
            </h2>
          </div>
          <div className="blogs_mobile_base">
            <div className="blog-swiper swiper-container">
              <Slider {...settings}>{showBlog()}</Slider>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
