// import BlogCard from "../../../components/BlogCard";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Slider from "react-slick";
export default function Blog(props) {
  const appTheme = useSelector((state) => state.app.appTheme);
  const posts = props.posts[0];

  var settings = {
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  function extractContent(s) {
    var span = document.createElement("span");
    span.innerHTML = s;
    return span.textContent || span.innerText;
  }

  function showBlog() {
    var array = [];
    for (let [i, v] of Object.entries(props.posts)) {
      if (i > 0) {
        array.push(
          <div className="w-100 b-list">
            <div className="item_blog_base" style ={{background : "white"}}>
              <Link
                className="thumb"
                to={
                  v.title
                    ? `/tin-tuc/${v.slug}-${v.id}`
                    : `/tin-tuc/${v.id}`
                }
              >
                <img
                  style={{
                    maxHeight: "190px",
                    width: "100%",
                    objectFit :"cover"
                  }}
                  src={v.image_url}
                  className="lazyload img-responsive"
                />
              </Link>
              <div className="content_blog clearfix" style = {{padding : "10px"}}>
                <div className="toparticle">
                  <span>{v.created_at ? v.created_at.split(" ")[0] : ""}</span>
                  &nbsp;&nbsp;
                </div>
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
                <div
                  className="blog-quote"
                  style={{
                    display: "-webkit-box",
                    "-webkit-line-clamp": "3",

                    overflow: "hidden",
                    "-webkit-box-orient": "vertical",
                  }}
                  dangerouslySetInnerHTML={{
                    __html: extractContent(v.summary),
                  }}
                ></div>
                {/* <p>{v.content}</p> */}
              </div>
            </div>
          </div>
        );
      }
    }
    return array;
  }

  return (
    <div className="section_blog">
      <div className="container">
        <div className="swap">
          <h2 className="title-block upscape">
            Tin tức mới nhất
          </h2>
          <div className="row-blog blogs_mobile_base">
            <div className="col-lg-6 col-12">
              <div className="item_blog_base" style ={{background : "white"}}>
                <Link
                  to={
                    posts.title
                      ? `/tin-tuc/${posts.slug}-${
                          posts.id
                        }`
                      : `/tin-tuc/${posts.id}`
                  }
                >
                  <img
                    style={{
                      width: "610px",
                      height: "458px",
                      objectFit: "cover",
                    }}
                    src={posts.image_url}
                    className="lazyload img-responsive"
                  />
                </Link>
                <div className="content_blog clearfix" style = {{padding : "10px"}}>
                  <div className="toparticle">
                    <span>
                      {posts.created_at ? posts.created_at.split(" ")[0] : ""}
                    </span>
                    &nbsp;&nbsp;<span></span>
                  </div>
                  <h3>
                    <Link
                      className="a-title"
                      to={
                        posts.title
                          ? `/tin-tuc/${posts.slug}-${
                              posts.id
                            }`
                          : `/tin-tuc/${posts.id}`
                      }
                    >
                      {posts.title}
                    </Link>
                  </h3>
                  <div
                    className="blog-quote"
                    style = {{
                      display: "-webkit-box",
                      "-webkit-line-clamp": "2",
  
                      overflow: "hidden",
                      "-webkit-box-orient": "vertical",
                    }}
                    dangerouslySetInnerHTML={{
                      __html: extractContent(posts.content),
                    }}
                  ></div>{" "}
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-12">
              <div
                className="wraplog"
                style={{
                  "max-height": "100%",
                  position : "absolute",
                  overflow: "auto",
             
                }}
              >
                {showBlog()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
