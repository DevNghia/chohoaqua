// import BlogCard from "../../../components/BlogCard";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";

import Slider from "react-slick";
export default function Blog(props) {
  const [firstLine, setFirstLine] = useState(props.posts);
  const [secondLine, setSecondLine] = useState([]);
  const [mainLine, setMainLine] = useState([]);
  const appTheme = useSelector((state) => state.app.appTheme);

  var settings = {
    infinite: false,
    slidesToShow: 2,
    slidesToScroll: 1,
  };

  useEffect(() => {
    const width = window.innerWidth;
    if (props.posts.length > 0) {
      let mainArr = props.posts.slice(0, 1);
      let firstArr = props.posts.slice(1, 3);
      let secondArr = props.posts.slice(3, 5);
      setFirstLine(firstArr);
      setSecondLine(secondArr);
      setMainLine(mainArr);
    }

    // if (width >= 600 && width < 768 && props.posts.length > 6) {
    //   let firstArr = props.posts.slice(0, 2);
    //   let secondArr = props.posts.slice(2);
    //   setFirstLine(firstArr);
    //   setSecondLine(secondArr);
    // }
    // if (width >= 768 && width < 992 && props.posts.length > 8) {
    //   let firstArr = props.posts.slice(0, 2);
    //   let secondArr = props.posts.slice(4);
    //   setFirstLine(firstArr);
    //   setSecondLine(secondArr);
    // }
    // if (width >= 992 && width < 1200 && props.posts.length > 10) {
    //   let firstArr = props.posts.slice(0, 2);
    //   let secondArr = props.posts.slice(2);
    //   setFirstLine(firstArr);
    //   setSecondLine(secondArr);
    // }
    // if (width >= 1200 && props.posts.length > 10) {
    //   let firstArr = props.posts.slice(0, 2);
    //   let secondArr = props.posts.slice(2);
    //   setFirstLine(firstArr);
    //   setSecondLine(secondArr);
    // }
  }, []);

  function extractContent(s) {
    var span = document.createElement("span");
    span.innerHTML = s;
    var text = span.textContent || span.innerText;
    return text.slice(0, 200);
  }

  function showBlog(posts, isItemBig = false) {
    var array = [];
    for (let [i, v] of Object.entries(posts)) {
      array.push(
        <div className="swiper-slide">
          <div
            className={`tip-item tip-item-${
              isItemBig == true ? "big" : "small"
            }`}
          >
            <div className="tip-img object-fit-img">
              <Link
                to={
                  v.title
                    ? `/tin-tuc/${v.title
                        .replace(/[^a-zA-Z ]/g, "")
                        .replace(/\s/g, "-")}-${v.id}`
                    : `/tin-tuc/${v.id}`
                }
                title="Sữa nội địa Nhật nào tốt? Cập nhật bảng giá sữa Nhật nội địa mới nhất"
              >
                <img src={v.image_url} />
              </Link>
            </div>
            <div className="tip-caption position-absolute left-0 right-0 bottom-0 flex items-center">
              <Link
                className="title"
                to={
                  v.title
                    ? `/tin-tuc/${v.title
                        .replace(/[^a-zA-Z ]/g, "")
                        .replace(/\s/g, "-")}-${v.id}`
                    : `/tin-tuc/${v.id}`
                }
              >
                {extractContent(v.title)}
              </Link>
            </div>
          </div>
        </div>
      );
    }
    return array;
  }

  return (
    <section className="home-4 section pt-0">
      <div className="container">
        <div className="tip-list-wrap Module Module-226">
          <div className="ModuleContent">
            <div className="tip-list-heading flex justify-between items-center">
              <div className="section-title text-blue ml-2">
                TIN TỨC & SỰ KIỆN
              </div>
              <div className="view-more-desktop hidden-mobile">
                <Link
                  style={{ background: appTheme.color_main_1 }}
                  className="flex flex-center"
                  to="/tin-tuc"
                >
                  Tất cả bài viết
                </Link>
              </div>
            </div>
            <div className="tip-list">
              <div className="swiper-container">
                <div className="swiper-wrapper">
                  {showBlog(mainLine, true)}
                  {showBlog(firstLine, false)}
                  {showBlog(secondLine, false)}
                </div>
              </div>
            </div>
            <Link
              className="flex flex-center view-more-mobile hidden-desktop"
              to="/tin-tuc"
            >
              <strong className="text-blue">Xem tất cả &gt;</strong>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
