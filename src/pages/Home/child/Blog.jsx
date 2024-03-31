// import BlogCard from "../../../components/BlogCard";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Slider from "react-slick";
export default function Blog(props) {
  const appTheme = useSelector((state) => state.app.appTheme);
  const posts = props.posts[0];

  var settings = {
    infinite: props.posts.length > 3,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          infinite: props.posts.length > 2,
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
      if (i > 0) {
        array.push(
          <div className="w-100 b-list">
            <div className="item_blog_base" style={{ background: "white" }}>
              <Link
                style={{ "line-height": "1.5" }}
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
                    objectFit:"cover"
                  }}
                  src={v.image_url}
                  className="lazyload img-responsive"
                />
              </Link>
              <div
                className="content_blog clearfix"
                style={{ padding: "10px" }}
              >
                <div className="toparticle">
                  <span>{v.created_at ? v.created_at.split(" ")[0] : ""}</span>
                  &nbsp;&nbsp;
                </div>
                <h3>
                  <Link
                    style={{
                      display: "block",
                      margin: "0",
                      color: "#323c42",
                      "font-weight": "bold",
                      "line-height": "1.3",
                      "font-size": "20px",
                    }}
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
                    display: "-webkit-inline-flex",
                    "-webkit-line-clamp": "3",

                    overflow: "hidden",
                    "-webkit-box-orient": "vertical",
                  }}
                  dangerouslySetInnerHTML={{
                    __html: extractContent(v.content),
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
        
          <div className="row-blog blogs_mobile_base">
            <Slider {...settings}>
              {props.posts.map((v, i) => (
                <div>
                    <div className="item_blog_base" style={{ background: "white" ,     margin: "0 10px" }}>
                  <Link
                    to={
                      v.title
                        ? `/tin-tuc/${v.slug}-${v.id}`
                        : `/tin-tuc/${v.id}`
                    }
                  >
                    <img
                      style={{
                        width: "100%",
                        height: "300px",
                        objectFit: "cover"
                      }}
                      src={v.image_url}
                      className="lazyload img-responsive"
                    />
                  </Link>
                  <div
                    className="content_blog clearfix"
                    style={{ padding: "10px" }}
                  >
                    <div className="toparticle">
                      <span>
                        {v.created_at ? v.created_at.split(" ")[0] : ""}
                      </span>
                      &nbsp;&nbsp;<span></span>
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
                      className=""
                      style={{
                        "display": "-webkit-inline-flex",
                        "-webkit-line-clamp": "2",

                        "-webkit-box-orient": "vertical",
                        "height" : "40px",
                        "overflow": "hidden",

                      }}
                      dangerouslySetInnerHTML={{
                        __html: extractContent(v.content),
                      }}
                    ></div>{" "}
                  </div>
                </div>
                    </div>
              ))}
            </Slider>
          </div>
        </div>
   
  );
}
