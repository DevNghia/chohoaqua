// import BlogCard from "../../../components/BlogCard";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Slider from "react-slick";
export default function Blog(props) {
  const appTheme = useSelector((state) => state.app.appTheme);
  var settings = {
    infinite: false,
    slidesToShow: 4,
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
        <div className="swiper-slides">
          <div className="item_blog_base" style={{ margin: "15px" }}>
            <Link
              className="thumb"
              to={v.title ? `/tin-tuc/${v.slug}-${v.id}` : `/tin-tuc/${v.id}`}
            >
              <img
                style={{ height: "100%", width: "100%", objectFit: "cover" }}
                src={v.image_url}
                className="lazy img-responsive"
              />
            </Link>
          </div>
          <h5 style={{marginLeft:"16px"}}>
            <Link
              className="a-title"
              to={v.title ? `/tin-tuc/${v.slug}-${v.id}` : `/tin-tuc/${v.id}`}
            >
              {v.title}
            </Link>
          </h5>
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
    <section className="awe-section-9">
      <div className="container section_blog" id="section_blog">
        <div className="swap">
          <div className="block-title">
            <h3 style={{ fontWeight: "700" }}>Tin tức mới nhất</h3>
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
