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
  function extractContent(s) {
    var span = document.createElement('span');
    span.innerHTML = s;
    var text = span.textContent || span.innerText;
    return text.slice(0, 200);
  };
  function showBlog() {
    var array = [];
    for (let [i, v] of Object.entries(props.posts)) {
      console.log(i);
      array.push(
        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
          <div className="item">
            <article className="blog-item text-center">
              <div>
                <div className="blog-item-thumbnail">
                  <Link
                    to={
                      v.title
                        ? `/tin-tuc/${v.title
                            .replace(/[^a-zA-Z ]/g, "")
                            .replace(/\s/g, "-")}-${v.id}`
                        : `/tin-tuc/${v.id}`
                    }
                  >
                    <img
                      style={{
                        height: "207px",
                        width: "415px",
                        "border-radius": "10px",
                      }}
                      src={v.image_url}
                    />
                  </Link>
                </div>
                <div className="blog-item-info m-4">
                  <h3 className="blog-item-name">
                    <Link
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
                  </h3>{" "}
                  <div
                    style={{
                      display: "-webkit-box",
                      "-webkit-line-clamp": "2",
                      "-webkit-box-orient": "vertical",
                      overflow: "hidden",

                    }}
                    className=""
                    dangerouslySetInnerHTML={{ __html: extractContent(v.summary) }}
                  ></div>
                  <Link
                    style={{
                      "margin-top": "10px",
                       background: appTheme.color_main_1
                    }}
                    to={
                      v.title
                        ? `/tin-tuc/${v.title
                            .replace(/[^a-zA-Z ]/g, "")
                            .replace(/\s/g, "-")}-${v.id}`
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
    <section className="awe-section-8" id="awe-section-8">
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
            <p>
              Tin tức vệ sinh an toàn thực phẩm cập nhật mới nhất
              <br /> mỗi ngày cho bạn
            </p>
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
    </section>
  );
}
