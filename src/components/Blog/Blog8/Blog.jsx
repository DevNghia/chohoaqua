import React from "react";
import styled from "styled-components";
import BlogList from "./BlogList";

const Blog8Styles = styled.section`
  margin-bottom: 50px;
  .blog8__content {
    .blog8__titlte {
      text-align: center;
      text-transform: uppercase;
      margin-bottom: 30px;
      h2 {
        color: #070707;
        font-size: 32px;
        line-height: 54px;
      }
      p {
        font-size: 14px;
        line-height: 21px;
        color: #070707;
        font-weight: bold;
      }
    }
  }
  @media screen and (max-width: 400px) {
    .blog8__content {
      .blog8__titlte {
        h2 {
          font-size: 20px;
        }
      }
    }
  }
`;

const Blog = (props) => {
  const { posts } = props;
  console.log("Blog ~ posts", posts);
  return (
    <Blog8Styles className="blog8">
      <div className="wrapper-container">
        <div className="blog8__content">
          <div className="blog8__titlte">
            <h2>Tin tức mới</h2>
            <p>tin tức mới được đăng tải, cập nhập</p>
          </div>
          <BlogList posts={posts}></BlogList>
        </div>
      </div>
    </Blog8Styles>
  );
};

export default Blog;
