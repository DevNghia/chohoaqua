// import BlogCard from "../../../components/BlogCard";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LazyImage from "../../LazyImage";
import Lazyload from "react-lazyload";
import Slider from "react-slick";
import "./style.css";
import styled from "styled-components";

const Blog4Styles = styled.section`
  .content_blog.clearfix {
    display: flex;
    flex-direction: column;
    .toparticle {
      flex-grow: 1;
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
    }
  }
  @media screen and (max-width: 600px) {
    .item_blog_base {
      display: flex;
      flex-direction: column;
      .thumb {
        width: 100% !important;
        img {
          height: 400px !important;
        }
      }
    }
    .content_blog.clearfix {
      width: 100% !important;
    }
  }
`;

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
            <div className="item_blog_base" style={{ background: "white" }}>
              <Link
                className="thumb"
                to={v.title ? `/tin-tuc/${v.slug}-${v.id}` : `/tin-tuc/${v.id}`}
              >
                <Lazyload throttle={300} placeholder={<LazyImage></LazyImage>}>
                  <img
                    style={{
                      height: "190px",
                      width: "100%",
                      objectFit: "cover",
                    }}
                    src={v.image_url}
                    className="lazyload img-responsive"
                    alt={v.title}
                  />
                </Lazyload>
              </Link>
              <div
                className="content_blog clearfix"
                style={{ padding: "10px" }}
              >
                <h3>
                  <Link
                    className="a-title"
                    style={{
                      display: "-webkit-box",
                      "-webkit-line-clamp": "2",

                      overflow: "hidden",
                      "-webkit-box-orient": "vertical",
                    }}
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
                <div
                  className="toparticle"
                  style={{
                    marginTop: "5px",
                  }}
                >
                  <span>{v.created_at ? v.created_at.split(" ")[0] : ""}</span>
                </div>
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
    <Blog4Styles className="section_blog4">
      <div className="container">
        <div className="swap">
          <h2 className="title-block upscape">Tin tức mới nhất 2</h2>
          <div className="row-blog blogs_mobile_base">
            <div className="col-lg-6 col-12">
              <div
                className="item_blog_base"
                style={{ background: "white", marginRight: "10px" }}
              >
                <Link
                  to={
                    posts.title
                      ? `/tin-tuc/${posts.slug}-${posts.id}`
                      : `/tin-tuc/${posts.id}`
                  }
                >
                  <img
                    style={{
                      width: "100%",
                      height: "400px",
                    }}
                    src={posts.image_url}
                    className="lazyload img-responsive"
                    alt=""
                  />
                </Link>
                <div
                  className="content_blog clearfix"
                  style={{ padding: "10px" }}
                >
                  <h3>
                    <Link
                      className="a-title"
                      style={{
                        display: "-webkit-box",
                        "-webkit-line-clamp": "2",

                        overflow: "hidden",
                        "-webkit-box-orient": "vertical",
                      }}
                      to={
                        posts.title
                          ? `/tin-tuc/${posts.slug}-${posts.id}`
                          : `/tin-tuc/${posts.id}`
                      }
                    >
                      {posts.title}
                    </Link>
                  </h3>
                  <div
                    className="blog-quote"
                    style={{
                      display: "-webkit-box",
                      "-webkit-line-clamp": "2",

                      overflow: "hidden",
                      "-webkit-box-orient": "vertical",
                    }}
                    dangerouslySetInnerHTML={{
                      __html: extractContent(posts.summary),
                    }}
                  ></div>
                  <div
                    className="toparticle"
                    style={{
                      marginTop: "5px",
                    }}
                  >
                    <span>
                      {posts.created_at ? posts.created_at.split(" ")[0] : ""}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-12">
              <div
                className="wraplog"
                style={{
                  maxHeight: "100%",
                  position: "absolute",
                  overflow: "auto",
                  width: "100%",
                  paddingRight: 15,
                  display: "flex",
                  flexDirection: "column",
                  rowGap: "20px",
                }}
              >
                {showBlog()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Blog4Styles>
  );
}
