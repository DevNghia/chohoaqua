import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import styled from "styled-components";
import ModalImageVideoReview from "../../../components/Modal/ModalImageVideoReview";
import { productActions } from "../../../actions/productActions";
import Paginate from "../../../components/Paginate";
const CommentTabStyles = styled.div`
  .review_product {
    display: flex;
    align-items: center;
    margin: 20px 0 28px;
    column-gap: 8px;
    & > span {
      font-size: 20px;
      font-weight: 600;
      text-transform: uppercase;
      font-family: "Inter", sans-serif;
    }
    div:last-child {
      span {
        font-weight: 500;
        font-family: "Inter", sans-serif;
      }
      span:last-child {
        margin-right: 4px;
      }
    }
  }
  .review_detail {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 20px;
    margin-left: 24px;
    .review_all {
      padding: 12px 20px;
      border: 1px solid #eee;
      border-radius: 8px;
      cursor: pointer;
      span {
        font-family: "Inter", sans-serif;
      }
      span:last-child {
        font-size: 14px;
      }
    }
    .review_star {
      display: flex;
      align-items: center;
      padding: 12px 20px;
      border: 1px solid #eee;
      border-radius: 8px;
      column-gap: 4px;
      cursor: pointer;
      span {
        font-size: 14px;
        font-family: "Inter", sans-serif;
      }
    }
  }
  .comment_list {
    & > div {
      display: flex;
      padding: 28px 20px;
      column-gap: 12px;
    }
    & > div:not(:last-of-type) {
      border-bottom: 1px solid #eee;
    }
    .review_avt {
      width: 40px;
      height: 40px;
      border-radius: 100rem;
      img {
        width: 100%;
        height: 100%;
        border-radius: 100rem;
        object-fit: cover;
      }
    }
    .review_info {
      .review_name {
        font-size: 14px;
        font-weight: 500;
        font-family: "Inter", sans-serif;
        text-align: left;
        margin: 0 !important;
        padding-bottom: 0;
      }
      .review_infoStar {
        display: flex;
        margin-top: 4px;
      }
      .review_time {
        color: #bfbebb;
        text-align: left;
        margin: 12px 0;
        font-size: 12px;
        span {
          font-family: "Inter", sans-serif;
        }
        span:nth-child(2) {
          padding: 0 4px;
        }
      }
      .review_description {
        margin-bottom: 12px;
        font-family: "Inter", sans-serif;
      }
      .review_listImage {
        display: flex;
        column-gap: 12px;
        & > div {
          width: 96px;
          height: 96px;
          border-radius: 6px;
          border: 1px solid #ececec;
          position: relative;
          cursor: pointer;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 6px;
          }
        }
      }
    }
  }
`;

const queriesReviewDefault = {
  has_image_video: "",
  filter_by: "",
  filter_by_value: "",
  page: 1,
  limit: 20,
};
export default function CommentTab(props) {
  const dispatch = useDispatch();

  const reviews = useSelector((state) => state.product.review);

  const [typeReviews, setTypeReviews] = useState("total");
  const [reviewSelected, setReviewSelected] = useState({
    data: null,
    index: 0,
  });
  const [showModalReview, setShowModalReview] = useState(false);
  const appTheme = useSelector((state) => state.app.appTheme);

  const [queries, setQueries] = useState(queriesReviewDefault);

  const handleSelectPageReview = (option) => {
    setQueries((prevQueries) => ({ ...prevQueries, page: option.page }));
  };
  // handle image Parse JSON data
  const handleImage = (data) => {
    if (!data) return "";
    return JSON.parse(data);
  };
  // Hanlde Show Modal Image Video Evaluate
  const handleShowImageVideoEvaluate = (review, type, index) => {
    setShowModalReview(true);
    if (review.video_url) {
      setReviewSelected({
        data: review,
        index: type === "video" ? index : index + 1,
      });
    } else {
      setReviewSelected({
        data: review,
        index: index,
      });
    }
  };

  //Handle change comments
  const handleShowComment = (type) => {
    setTypeReviews(type);

    const typeQuery =
      type === "total"
        ? {}
        : type === "total_has_image_video"
        ? { has_image_video: true }
        : type === "total_5_stars"
        ? { filter_by: "stars", filter_by_value: "5" }
        : type === "total_4_stars"
        ? { filter_by: "stars", filter_by_value: "4" }
        : type === "total_3_stars"
        ? { filter_by: "stars", filter_by_value: "3" }
        : type === "total_2_stars"
        ? { filter_by: "stars", filter_by_value: "2" }
        : type === "total_1_stars"
        ? { filter_by: "stars", filter_by_value: "1" }
        : {};

    setQueries(() => ({ ...queriesReviewDefault, ...typeQuery, page: 1 }));
  };

  const getParams = (
    page,
    limit,
    has_image_video,
    filter_by,
    filter_by_value
  ) => {
    var params = `?page=${page}&limit=${limit}`;
    if (has_image_video !== "") {
      params += `&has_image_video=${has_image_video}`;
    }
    if ((filter_by !== "") & (filter_by_value !== "")) {
      params += `&filter_by=${filter_by}&filter_by_value=${filter_by_value}`;
    }

    return params;
  };

  useEffect(() => {
    const params = getParams(
      queries.page,
      queries.limit,
      queries.has_image_video,
      queries.filter_by,
      queries.filter_by_value
    );
    dispatch(productActions.getProductReview(props.productId, params));
  }, [
    dispatch,
    props.productId,
    queries.filter_by,
    queries.filter_by_value,
    queries.has_image_video,
    queries.limit,
    queries.page,
  ]);
  return reviews.info?.total_reviews > 0 ? (
    <CommentTabStyles className="comment">
      <div className="review_product flex items-center mb-5 mt-7 gap-x-2">
        <span className="text-xl font-semibold uppercase">Đánh giá</span>
        <div className="flex text-red1">
          {Array(5)
            .fill(null)
            .map((item, index) => (
              <i key={index} className="fas fa-star"></i>
            ))}
        </div>
        <div>
          <span className="font-medium text-red1">
            {Math.round(reviews.info.averaged_stars * 10) / 10}
          </span>
          <span className="mr-1 font-medium text-red1"> / 5</span>
          <span> ({reviews.info?.total_reviews} đánh giá)</span>
        </div>
      </div>
      <div className="review_detail flex flex-wrap gap-3 mb-5 ml-6">
        <div
          className="review_all px-5 py-3 text-white border rounded-lg bg-red1 border-red1"
          style={{
            backgroundColor:
              typeReviews === "total" ? appTheme.color_main_1 : "transparent",
            color: typeReviews === "total" ? "white" : "#000000",
            borderColor: typeReviews === "total" ? "tranparent" : "#eee",
          }}
          onClick={() => handleShowComment("total")}
        >
          <span>Tất cả</span>
          <span className="text-sm"> ({reviews.info.total_reviews})</span>
        </div>
        <div
          className="review_all px-5 py-3 border rounded-lg"
          onClick={() => handleShowComment("total_has_image_video")}
          style={{
            backgroundColor:
              typeReviews === "total_has_image_video"
                ? appTheme.color_main_1
                : "transparent",
            color:
              typeReviews === "total_has_image_video" ? "white" : "#000000",
            borderColor:
              typeReviews === "total_has_image_video" ? "tranparent" : "#eee",
          }}
        >
          <span>Có hình ảnh / video</span>
          <span className="text-sm">
            {" "}
            ({reviews.info.total_has_image_video})
          </span>
        </div>
        <div
          className="review_star flex items-center px-5 py-3 border rounded-lg gap-x-1"
          onClick={() => handleShowComment("total_5_stars")}
          style={{
            backgroundColor:
              typeReviews === "total_5_stars"
                ? appTheme.color_main_1
                : "transparent",
            color: typeReviews === "total_5_stars" ? "white" : "#000000",
            borderColor:
              typeReviews === "total_5_stars" ? "tranparent" : "#eee",
          }}
        >
          <div className="flex text-red1">
            {Array(5)
              .fill(null)
              .map((item, index) => (
                <i key={index} className="fas fa-star"></i>
              ))}
          </div>
          <span className="text-sm"> ({reviews.info.total_5_stars})</span>
        </div>
        <div
          className="review_star flex items-center px-5 py-3 border rounded-lg gap-x-1"
          onClick={() => handleShowComment("total_4_stars")}
          style={{
            backgroundColor:
              typeReviews === "total_4_stars"
                ? appTheme.color_main_1
                : "transparent",
            color: typeReviews === "total_4_stars" ? "white" : "#000000",
            borderColor:
              typeReviews === "total_4_stars" ? "tranparent" : "#eee",
          }}
        >
          <div className="flex text-red1">
            {Array(4)
              .fill(null)
              .map((item, index) => (
                <i key={index} className="fas fa-star"></i>
              ))}
          </div>
          <span className="text-sm"> ({reviews.info.total_4_stars})</span>
        </div>
        <div
          className="review_star flex items-center px-5 py-3 border rounded-lg gap-x-1"
          onClick={() => handleShowComment("total_3_stars")}
          style={{
            backgroundColor:
              typeReviews === "total_3_stars"
                ? appTheme.color_main_1
                : "transparent",
            color: typeReviews === "total_3_stars" ? "white" : "#000000",
            borderColor:
              typeReviews === "total_3_stars" ? "tranparent" : "#eee",
          }}
        >
          <div className="flex text-red1">
            {Array(3)
              .fill(null)
              .map((item, index) => (
                <i key={index} className="fas fa-star"></i>
              ))}
          </div>
          <span className="text-sm"> ({reviews.info.total_3_stars})</span>
        </div>
        <div
          className="review_star flex items-center px-5 py-3 border rounded-lg gap-x-1"
          onClick={() => handleShowComment("total_2_stars")}
          style={{
            backgroundColor:
              typeReviews === "total_2_stars"
                ? appTheme.color_main_1
                : "transparent",
            color: typeReviews === "total_2_stars" ? "white" : "#000000",
            borderColor:
              typeReviews === "total_2_stars" ? "tranparent" : "#eee",
          }}
        >
          <div className="flex text-red1">
            {Array(2)
              .fill(null)
              .map((item, index) => (
                <i key={index} className="fas fa-star"></i>
              ))}
          </div>
          <span className="text-sm"> ({reviews.info.total_2_stars})</span>
        </div>
        <div
          className="review_star flex items-center px-5 py-3 border rounded-lg gap-x-1"
          onClick={() => handleShowComment("total_1_stars")}
          style={{
            backgroundColor:
              typeReviews === "total_1_stars"
                ? appTheme.color_main_1
                : "transparent",
            color: typeReviews === "total_1_stars" ? "white" : "#000000",
            borderColor:
              typeReviews === "total_1_stars" ? "tranparent" : "#eee",
          }}
        >
          <div className="flex text-red1">
            {Array(1)
              .fill(null)
              .map((item, index) => (
                <i key={index} className="fas fa-star"></i>
              ))}
          </div>
          <span className="text-sm"> ({reviews.info.total_1_stars})</span>
        </div>
      </div>
      <div className="comment_list">
        {reviews.info?.data.length > 0 ? (
          reviews.info.data.map((review, index) => (
            <div
              className={`flex px-5 border-b py-7 gap-x-3 ${
                Array(5).fill(null).length - 1 === index ? "" : "border-b"
              }`}
              key={index}
            >
              <div>
                <div className="review_avt w-10 h-10 rounded-full">
                  <img
                    className="w-full h-full rounded-full oject-cover"
                    src={
                      review.customer.avatar_image
                        ? review.customer.avatar_image
                        : process.env.PUBLIC_URL + "/img/default_product.jpg"
                    }
                    alt="avatar"
                  />
                </div>
              </div>
              <div className="review_info">
                <h3 className="review_name text-sm font-medium">
                  {review.customer.name}
                </h3>
                <div className="review_infoStar flex mt-1 text-red1">
                  {Array(review.stars)
                    .fill(null)
                    .map((item, index) => (
                      <i key={index} className="fas fa-star"></i>
                    ))}
                </div>
                <div className="review_time my-3 text-[#6c757d] text-xs">
                  <span>{review.created_at}</span>
                  {/* <span className="px-1">|</span>
                <span>Phân loại hàng: {review.product}</span> */}
                </div>
                <div className="review_description mb-3">{review.content}</div>
                <div className="review_listImage flex gap-x-3">
                  {review.video_url ? (
                    <div
                      className="w-24 h-24 rounded-md"
                      onClick={() =>
                        handleShowImageVideoEvaluate(review, "video", 0)
                      }
                    >
                      <video
                        style={{
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        <source src={review.video_url} />
                      </video>
                      <div
                        className="video_icon"
                        style={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          width: "100%",
                          padding: "1px 3px",
                          backgroundColor: "rgba(0, 0, 0, 0.5)",
                        }}
                      >
                        <svg
                          width="23"
                          height="18"
                          viewBox="0 0 23 18"
                          fill="white"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M5 4C4.44772 4 4 4.44772 4 5V13C4 13.5523 4.44772 14 5 14H13C13.5523 14 14 13.5523 14 13V5C14 4.44772 13.5523 4 13 4H5ZM11.5 9C11.5 10.3807 10.3807 11.5 9 11.5C7.61929 11.5 6.5 10.3807 6.5 9C6.5 7.61929 7.61929 6.5 9 6.5C10.3807 6.5 11.5 7.61929 11.5 9ZM9 10.6667C9.92047 10.6667 10.6667 9.92047 10.6667 9C10.6667 8.07952 9.92047 7.33333 9 7.33333C8.07953 7.33333 7.33333 8.07952 7.33333 9C7.33333 9.92047 8.07953 10.6667 9 10.6667ZM18.1667 4.83333L14.8333 7.33306V10.6667L18.1667 13.1667V4.83333Z"
                            fill="white"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  ) : null}
                  {handleImage(review.images)?.length > 0 &&
                    handleImage(review.images).map((item, index) => (
                      <div
                        className="w-24 h-24 rounded-md"
                        key={index}
                        onClick={() =>
                          handleShowImageVideoEvaluate(review, "image", index)
                        }
                      >
                        <img
                          className="object-cover w-full h-full rounded-md"
                          src={
                            item ||
                            process.env.PUBLIC_URL + "/img/default_product.jpg"
                          }
                          alt=""
                        />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div
            style={{
              textAlign: "center",
              display: "block",
              fontSize: "20px",
              fontWeight: "500",
            }}
          >
            Chưa có review nào!
          </div>
        )}
      </div>
      <Paginate
        currentPage={reviews.info.current_page}
        totalPage={reviews.info.last_page}
        handlePageSelect={handleSelectPageReview}
      />
      <ModalImageVideoReview
        showModal={showModalReview}
        reviewSelected={reviewSelected}
        setShowModal={setShowModalReview}
        setReviewSelected={setReviewSelected}
      ></ModalImageVideoReview>
    </CommentTabStyles>
  ) : (
    <CommentTabStyles
      className="comment"
      style={{ textAlign: "center", fontSize: "18px", color: "#757575" }}
    >
      Chưa có nhận xét cho sản phẩm này
    </CommentTabStyles>
  );
}
