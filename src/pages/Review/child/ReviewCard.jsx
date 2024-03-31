import React from "react";
import { constants as c } from "../../../constants";
export default function ReviewCard(props) {
  let {
    id,
    name,
    images,
    stars,
    content,
    images_review,
    video_url_review,
    review,
    handleShowImageVideoEvaluate,
  } = props;
  const imagesConvert =
    images && images?.length > 0
      ? images
      : [{ image_url: c.DEFAULT_PRODUCT_IMG }];
  return (
    <React.Fragment>
      <div className="review-card reviewed">
        <div className="row">
          <div className="image">
            <div className="img-container">
              <img
                src={imagesConvert?.[0]?.image_url}
                alt=""
                style={{
                  background: "url(/img/default_product.jpg)",
                  backgroundSize: "contain",
                }}
              />
            </div>
          </div>
          <div className="info">
            <div className="name">{name}</div>
            <div className="stars">
              <span>Đánh giá: </span> {stars} <i className="fas fa-star"></i>
            </div>
            <div>
              <a href={`/san-pham/${id}`}>Thông tin sản phẩm</a>
            </div>
          </div>
          <textarea
            disabled
            placeholder="Không có nội dung đánh giá"
            value={content ? content : ""}
          ></textarea>

          <div className="image">
            <div className="img-container">
              {video_url_review ? (
                <video
                  style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    right: "0",
                    bottom: "0",
                    width: "100%",
                    height: "100%",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    handleShowImageVideoEvaluate(review, "video", 0)
                  }
                >
                  <source src={video_url_review} />
                </video>
              ) : images_review?.length > 0 ? (
                <img
                  src={images_review[0]}
                  alt=""
                  style={{
                    background: "url(/img/default_product.jpg)",
                    backgroundSize: "contain",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    handleShowImageVideoEvaluate(review, "image", 0)
                  }
                />
              ) : (
                <img
                  // src={images_review[0]}
                  src={"/img/default_product.jpg"}
                  alt=""
                  style={{
                    background: "url(/img/default_product.jpg)",
                    backgroundSize: "contain",
                  }}
                />
              )}
            </div>
          </div>
        </div>
        <textarea
          className="mobile"
          disabled
          placeholder="Không có nội dung đánh giá"
          value={content ? content : ""}
        ></textarea>
      </div>
    </React.Fragment>
  );
}
