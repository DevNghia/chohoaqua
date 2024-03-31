import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const BlogItemStyles = styled.div`
  .blog8-content {
    .blog8-image {
      height: 258px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: all 0.5s;
        &:hover {
          transform: scale(1.1);
        }
      }
    }
    .blog8-summary {
      padding: 15px;
      text-align: center;
      a {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        height: 54px;
        overflow: hidden;
        color: #070707;
        font-size: 16px;
        line-height: 27px;
        text-transform: uppercase;
        font-weight: bold;
        &:hover {
          color: #070707;
        }
      }
    }
  }
`;

const BlogItem = ({ post }) => {
  return (
    <BlogItemStyles className="blog8-card">
      <div className="blog8-content">
        <div className="blog8-image">
          <Link to={`/tin-tuc/${post.slug}-${post.id}`}>
            <img src={post.image_url} alt={post.title} loading="lazy" />
          </Link>
        </div>
        <div className="blog8-summary">
          <Link to={`/tin-tuc/${post.slug}-${post.id}`}>{post.summary}</Link>
        </div>
      </div>
    </BlogItemStyles>
  );
};

export default BlogItem;
