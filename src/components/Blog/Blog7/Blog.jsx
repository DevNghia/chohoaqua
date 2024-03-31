// import BlogCard from "https://https://https://components/BlogCard";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import moment from "moment";
import Introduce from "./Introduce";
import BlogWithCategory from "./BlogWithCategory";
import Blog5 from "../Blog5/Blog";

import "./style.css";
export default function Blog(props) {
  const { posts } = props;
  const appTheme = useSelector((state) => state.app.appTheme);
  var { posts_by_category } = props;
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

  function extractContent(s) {
    var span = document.createElement("span");
    span.innerHTML = s;
    return span.textContent || span.innerText;
  }

  console.log(props.posts_by_category);
  return (
    <div className="blog-7">
      {appTheme.post_id_about != null &&
        appTheme.post_id_about != "" &&
        appTheme.home_page_type === 9 && (
          <Introduce posts_id={appTheme.post_id_about}></Introduce>
        )}
      <>
        {posts.length > 0 && (
          <Blog5 styleTitle={props.styleTitle} posts={props.posts} />
        )}
      </>

      {/* <section className="awe-section-3">
        <div className="container space-40">
          <div
            className="row section"
            id="SectionOne"
            name="Tin tức và thư viện ảnh"
          >
            <div className="widget TextList" data-version={2} id="TextList1" style = {{width : "60%"}}>
              <div className="col-md-6">
                <div className="title-text space-20">
                  <h2>
                    <a href="search/label/tin-tuc.html" title="Tin tức">
                      Tin tức nổi bật
                    </a>
                  </h2>
                  <Link className="read-more" to="/tin-tuc" title="Xem tất cả">
                    Xem tất cả <i className="fa fa-angle-double-right" />
                  </Link>
                </div>
                <div className="home-blog">
                  {posts.slice(0, 3).map((v, i) => (
                    <div className="item">
                      {" "}
                      <Link
                         to={
                          v.title
                            ? `/tin-tuc/${v.slug}-${v.id}`
                            : `/tin-tuc/${v.id}`
                        }
                        title={v.title}
                        className="thumb img-shine"
                      >
                        <img
                          className="img-responsive basic lazyloaded"
                          src={v.image_url}
                          alt={v.title}
                        />
                      </Link>{" "}
                      <div className="text">
                        {" "}
                        <h3>
                          {" "}
                          <Link
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
                  ))}
                </div>
              </div>
            </div>
            <div className="widget LinkList" data-version={2} id="LinkList2" style = {{width : "40%"}}>
              <div className="col-md-6 left">
                <div className="title-text space-20">
                  <h2>&nbsp;</h2>
                </div>
                <div className="home-box-lightbox">
                  {homeInfo?.banner_ads.type_6?.length >
                    0 && (
                      homeInfo?.banner_ads.type_6.map((v, i) => (
                        <Link to={v.link_to} title={v.title}>
                          <img
                            style = {{width : "267px" , height : "178px"}}
                            alt={v.title}
                            className="img-responsive basic lazyload"
                            src={v.image_url}
                          />
                        </Link>
                      ))
                    )}
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      {(posts_by_category ?? []).length > 0 && (
        <div className="blog-category-container">
          {appTheme.home_page_type === 9 &&
            (posts_by_category ?? []).map((layout) => (
              <BlogWithCategory
                slug={layout?.list[0]?.categories[0]?.slug}
                id={layout?.list[0]?.categories[0]?.id}
                title={layout?.list[0]?.categories[0]?.title}
                posts={layout.list}
              ></BlogWithCategory>

              // <ProductSection title={layout.title}
              //   categories={info.categories}
              //   products={layout.list} />
            ))}
        </div>
      )}
    </div>
  );
}
