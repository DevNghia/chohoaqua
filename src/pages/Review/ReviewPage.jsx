import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { constants as c } from "../../constants";
import { userActions as a } from "../../actions/userActions";
import PageLoading from "../../components/PageLoading";
import ModalImageVideoReview from "../../components/Modal/ModalImageVideoReview";

const ReviewCard = React.lazy(() => import("./child/ReviewCard"));
const AwaitReviewCard = React.lazy(() => import("./child/AwaitReviewCard"));
const Header = React.lazy(() => import("../../components/Header"));
const Footer = React.lazy(() => import("../../components/Footer"));

function ReviewPage() {
  const dispatch = useDispatch();
  const pageInfo = useSelector((state) => state.user.myReview);
  const awaitReview = useSelector((state) => state.user.awaitReview);
  const [reviewSelected, setReviewSelected] = useState({
    data: null,
    index: 0,
  });
  const [showModalReview, setShowModalReview] = useState(false);

  const [currentTab, setCurrentTab] = useState("await");

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
  const tabs = {
    await: (
      <div className="container row">
        {awaitReview.list?.map((v, i) => (
          <AwaitReviewCard
            key={i}
            name={v.product.name}
            images={v.product?.images}
            stars={v.stars}
            content={v.content}
            id={v.product.id}
            order_code={v.order_code}
          />
        ))}
      </div>
    ),
    reviewed: (
      <div className="container">
        {pageInfo.list?.map((v, i) => (
          <ReviewCard
            key={i}
            name={v.product.name}
            images={v.product?.images}
            stars={v.stars}
            content={v.content}
            id={v.product.id}
            video_url_review={v.video_url}
            images_review={v.images ? JSON.parse(v.images) : []}
            review={v}
            handleShowImageVideoEvaluate={handleShowImageVideoEvaluate}
          />
        ))}
        <ModalImageVideoReview
          showModal={showModalReview}
          reviewSelected={reviewSelected}
          setShowModal={setShowModalReview}
          setReviewSelected={setReviewSelected}
        ></ModalImageVideoReview>
      </div>
    ),
  };

  useEffect(() => {
    document.title = "Đánh giá của tôi";
    console.log(pageInfo);
    if (pageInfo.status === c.LOADING || awaitReview.status === c.LOADING) {
      dispatch(a.getUserReview());
      dispatch(a.getUserAwaitReview());
    }
  });
  return (
    <React.Fragment>
      {/* <Header /> */}
      {pageInfo.status === c.LOADING ? null : (
        <div className="review-page">
          <div className="collaborator-page">
            <div className="container">
              <div className="row tabs">
                <div
                  onClick={() => {
                    setCurrentTab("await");

                    dispatch(a.getUserAwaitReview());
                  }}
                  className={currentTab === "await" ? "active" : ""}
                >
                  Chờ đánh giá
                </div>
                <div
                  onClick={() => {
                    setCurrentTab("reviewed");
                    dispatch(a.getUserReview());
                  }}
                  className={currentTab === "reviewed" ? "active" : ""}
                  style={{ marginLeft: "1.5em", marginRight: "1.5em" }}
                >
                  Đã đánh giá
                </div>
              </div>
              {tabs[currentTab]}
            </div>
          </div>
        </div>
      )}
      {pageInfo.status === c.LOADING ? null : <Footer />}
    </React.Fragment>
  );
}
export default ReviewPage;
