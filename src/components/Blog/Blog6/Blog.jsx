// import BlogCard from "../../../components/BlogCard";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import moment from "moment";
import LazyImage from "../../LazyImage";
import Lazyload from "react-lazyload";
import "./style.css";
export default function Blog(props) {
  const { posts } = props;

  var settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  function renderCategory(post) {
    var data = post.categories[0];
    if (data?.id) {
      var cate = [
        <Link
          to={
            data
              ? `/tin-tuc?danh-muc=${data.slug}-${data.id}`
              : `/tin-tuc?danh-muc=${data.id}`
          }
          title={data.title}
          className="article-cate uppercase"
        >
          {data.title}
        </Link>,
      ];
    } else {
      var cate = [];
    }

    return cate;
  }

  return (
    <section className="news-section blog6">
      <div className="container">
        <div className="row">
          <div className="col-12 section-head">
            <img src="/img/img_title_article.png" alt="" />
          </div>
          <div className="col-12 col-md-6">
            <div className="news-slider">
              <Slider {...settings}>
                {posts.slice(0, 10).map((v, i) => (
                  <div className="swiper-slide">
                    <Link
                      to={
                        v.title
                          ? `/tin-tuc/${v.title
                              .replace(/[^a-zA-Z ]/g, "")
                              .replace(/\s/g, "-")}-${v.id}`
                          : `/tin-tuc/${v.id}`
                      }
                      title={v.title}
                      className="object-fit-img img"
                    >
                                      <Lazyload
                                       offset={100}
                    throttle={300}
                    placeholder={<LazyImage></LazyImage>}
                  >
                      <img src={v.image_url} alt={v.title} />

                  </Lazyload>
                    </Link>
                    <div className="article-info">
                      {renderCategory(v)}
                      <h3 className="text-center uppercase">
                        <Link
                          to={
                            v.title
                              ? `/tin-tuc/${v.title
                                  .replace(/[^a-zA-Z ]/g, "")
                                  .replace(/\s/g, "-")}-${v.id}`
                              : `/tin-tuc/${v.id}`
                          }
                          title={v.title}
                          className="article-title"
                        >
                          {v.title}
                        </Link>
                      </h3>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
            <Link
              to="/tin-tuc"
              title="Xem thêm bài viết khác"
              className="read-more"
            >
              Xem thêm bài viết khác{" "}
              <i className="fa fa-angle-double-right"></i>
            </Link>
          </div>
          <div className="col-12 col-md-6 most-view">
            <h4 className="uppercase">BÀI VIẾT XEM NHIỀU NHẤT</h4>
            <div className="most-view-content row">
              {posts.slice(0, 10).map((v, i) => (
                <div className="most-view-item col-12">
                  <div className="grid row">
                    <div className="col-4">
                      <Link
                            to={
                          v.title
                            ? `/tin-tuc/${v.slug}-${v.id}`
                            : `/tin-tuc/${v.id}`
                        }
                        title={v.title}
                        className="article-img"
                      >
                          <Lazyload
                           offset={100}
                    throttle={300}
                    placeholder={<LazyImage></LazyImage>}
                  >
                          <img src={v.image_url} alt={v.title} />

                  </Lazyload>
                      </Link>
                    </div>
                    <div className="col-8">
                      <div className="article-info">
                        <Link
                          to={
                            v.title
                              ? `/tin-tuc/${v.slug}-${v.id}`
                              : `/tin-tuc/${v.id}`
                          }
                          title={v.title}
                          className="article-title"
                        >
                          {v.title}
                        </Link>
                        <div className="article-date">
                          <i className="fa fa-calendar" aria-hidden="true" />{" "}
                          {moment(v.created_at).format("DD/MM/YYYY")}
                        </div>
                        {renderCategory(v)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
