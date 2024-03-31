import React, { useRef } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import BlogItem from "./BlogItem";

const BlogListStyles = styled.div`
  .slick-list {
    margin: 0 -5px;
  }
  .slick-slide > div {
    padding: 0 5px;
  }
`;

const BlogList = ({ posts }) => {
  const slider2 = useRef();
  const setting = {
    infinite: posts.length > 4,
    slidesToShow: 4,
    slidesToScroll: 1,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          infinite: posts.length > 2,
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          infinite: posts.length > 3,
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          infinite: posts.length > 4,
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <BlogListStyles className="blog9__listProduct">
      <Slider {...setting} ref={slider2}>
        {posts.map((post) => (
          <div className="blog__main" key={post.id}>
            <BlogItem post={post} />
          </div>
        ))}
      </Slider>
    </BlogListStyles>
  );
};

export default BlogList;
