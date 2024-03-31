import React from "react";
import styled from "styled-components";
import BlogList from "./BlogList";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Blog9Styles = styled.section`
  margin: 15px 0;
  .blog9__content {
    background-color: #fff;
    .blog9__title {
      position: relative;
      padding: 5px 10px 5px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      h2 {
        padding-left: 10px;
      }
      .productHome11__showAll {
        cursor: pointer;
        i {
          font-size: 12px;
        }
      }
      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 4px;
        background-color: red;
      }
    }
    .blog9-content-list {
      padding: 0 10px;
    }
  }
`;

const Blog = (props) => {
  const { posts } = props;
  return (
    <Blog9Styles className="blog9">
      <div className="wrapper-container">
        <div className="blog9__content">
          <div className="blog9__title">
            <h2>
              <Link to={"/tin-tuc"}>Tin tức mới</Link>
            </h2>
            <div class="productHome11__showAll">
              <Link to={"/tin-tuc"}>
                Xem tất cả{" "}
                <i class="fa fa-chevron-right" aria-hidden="true"></i>
              </Link>
            </div>
          </div>
          <div className="blog9-content-list">
            <BlogList posts={posts}></BlogList>
          </div>
        </div>
      </div>
    </Blog9Styles>
  );
};

export default Blog;
