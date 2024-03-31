import BlogCard from "../../BlogCard";
import Slider from "react-slick";
import "./style.css";
import styled from "styled-components";

const BlogSection1Styles = styled.div`
  .slick-slider {
    .slick-arrow {
      top: 50% !important;
    }
  }
  .blog-card {
    .blog-title {
      font-size: 18px !important;
      text-transform: uppercase;
      height: 48px !important;
    }
  }
`;

export default function BlogSection(props) {
  console.log(props.posts);
  var settings = {
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,

    arrow: true,
    dotsClass: "slick-dots slick-thumb",
    responsive: [
      {
        breakpoint: 580,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <BlogSection1Styles className="blog-section1">
      <h2>Bài viết mới</h2>
      <Slider {...settings}>
        {props.posts.map((v, i) => (
          <div className="card-container" key={i}>
            <BlogCard
              key={i}
              id={v.id}
              title={v.title}
              img={v.image_url}
              quote={v.summary}
              slug={v.slug}
              date={v.updated_at}
            />
          </div>
        ))}
      </Slider>
    </BlogSection1Styles>
  );
}
