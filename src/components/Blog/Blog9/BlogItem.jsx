import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const BlogItemStyles = styled.div`
  .blog9-content {
    .blog9-image {
      height: 230px;
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
    .blog9-summary {
      padding: 15px;
      text-align: center;
      a {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        height: 40px;
        overflow: hidden;
        color: #070707;
        font-size: 16px;
        line-height: 20px;
        font-size: 14px;
        &:hover {
          color: #070707;
        }
      }
    }
  }
`;

const BlogItem = ({ post }) => {
  return (
    <BlogItemStyles className="blog9-card">
      <div className="blog9-content">
        <div className="blog9-image">
          <Link to={`/tin-tuc/${post.slug}-${post.id}`}>
            <img src={post.image_url} alt={post.title} loading="lazy" />
          </Link>
        </div>
        <div className="blog9-summary">
          <Link to={`/tin-tuc/${post.slug}-${post.id}`}>{post.summary}</Link>
        </div>
      </div>
    </BlogItemStyles>
  );
};

export default BlogItem;
