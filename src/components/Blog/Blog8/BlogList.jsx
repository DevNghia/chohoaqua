import React, { useRef } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import BlogItem from "./BlogItem";

const BlogListStyles = styled.div`
  margin-left: -8px;
  position: relative;
  .blog__main {
    padding-left: 8px;
  }

  .blog8__btn {
    position: absolute;
    top: calc(50% - 20px);
    z-index: 100;
    padding: 0px;
    margin: 0px;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(7, 7, 7, 0.5);
    color: #fff;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      background: rgba(7, 7, 7, 0.7);
    }
    &.blog8__btnPrev {
      left: 8px;
    }
    &.blog8__btnNext {
      right: 0;
    }
    svg {
      width: 16px;
      height: 16px;
    }
  }
`;

const BlogList = ({ posts }) => {
  const slider2 = useRef();
  const setting = {
    infinite: posts.length > 3,
    arrows: false,
    slidesToShow: 3,
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
    ],
  };

  return (
    <BlogListStyles className="blog8__listProduct">
      {posts.length > 3 && (
        <>
          <button
            className="blog8__btn blog8__btnPrev"
            onClick={() => slider2.current.slickPrev()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
              <path
                fill="currentColor"
                d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"
              ></path>
            </svg>
          </button>
          <button
            className="blog8__btn blog8__btnNext"
            onClick={() => slider2.current.slickNext()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
              <path
                fill="currentColor"
                d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"
              ></path>
            </svg>
          </button>
        </>
      )}
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
