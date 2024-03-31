import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import Slider from "react-slick";
import styled from "styled-components";
import { constants as c } from "../../constants";
const ModalImageProductStyles = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  .modal_overlay {
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.3);
  }
  .modal_content {
    position: absolute;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    border-radius: 10px;
    .modal_image {
      max-width: 1140px;
      width: 100%;
      border-radius: 10px;
      overflow: hidden;
      .modal_header {
        display: flex;
        justify-content: flex-end;
        padding: 8px;
        span {
          width: 32px;
          height: 32px;
          cursor: pointer;
          border-radius: 100rem;
          background-color: rgba(0, 0, 0, 0.3);
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
          svg {
            width: 20px;
            height: 20px;
          }
        }
      }
    }
    .modal_text {
      display: flex;
      padding: 20px 40px;
      column-gap: 12px;
      .modal_img {
        width: 550px;
        height: 550px;
        padding: 4px;
        border-radius: 10px;
        overflow: hidden;
        border: 1px solid #dee2e6;
        &:hover .slick-arrow {
          visibility: visible;
          opacity: 1;
        }
        .slick-arrow {
          border-radius: 100%;
          width: 40px;
          height: 40px;
          visibility: hidden;
          opacity: 0;
          transition: all 0.3s;
        }
        .slick-next {
          right: 0px;
        }
        .slick-prev {
          left: 0px;
        }
        video {
          width: 100% !important;
          height: 540px !important;
        }
        img {
          width: 100% !important;
          height: 540px !important;
          object-fit: cover;
          border-radius: 10px !important;
        }
      }
    }
    .image_detail {
      width: 340px;
    }
    .list_image {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      margin-top: 12px;
      .bg_video,
      .bg_img {
        position: relative;
        overflow: hidden;
        cursor: pointer;
        height: 90px;
        border-radius: 10px;
      }
      .bg_video video {
        object-fit: cover;
      }
      .bg_video video,
      .bg_img img {
        width: 100%;
        height: 100%;
        overflow: hidden;
        border-radius: 10px;
      }
      .overlayImage {
        position: absolute;
        inset: 0;
        z-index: 10;
        transition: all 0.3s;
        &:hover {
          background-color: rgba(255, 255, 255, 0.2);
        }
      }
    }
  }
  @media (max-width: 1200px) {
    .modal_content {
      .modal_text {
        padding: 15px 30px;
        .modal_img {
          width: 400px;
          height: 400px;
          video {
            height: 390px !important;
          }
          img {
            height: 390px !important;
          }
        }
      }
      .image_detail {
        width: 200px;
      }
      .list_image {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  }
  @media (max-width: 768px) {
    .modal_content {
      width: 100%;
      .modal_text {
        flex-direction: column;
        padding: 15px;
        .modal_img {
          width: 100%;
          height: 350px;
          video {
            height: 340px !important;
          }
          img {
            height: 340px !important;
          }
        }
      }
      .image_detail {
        width: 100%;
      }
      .list_image {
        grid-template-columns: repeat(5, 1fr);
        .bg_video,
        .bg_img {
          height: 70px;
        }
      }
    }
  }
`;
const ModalImageVideoReview = ({
  setShowModal = () => {},
  showModal = false,
  reviewSelected = {
    data: null,
    index: 0,
  },
  setReviewSelected = () => {},
}) => {
  const sliderImageVideoRef = useRef();
  var settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // handle image Parse JSON data
  const handleImage = (data) => {
    if (!data) return "";
    return JSON.parse(data);
  };

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [showModal]);
  //Handle Image Video
  useEffect(() => {
    var myTimeout = "";
    if (reviewSelected.data) {
      myTimeout = setTimeout(() => {
        sliderImageVideoRef.current.slickGoTo(reviewSelected.index);
      }, 300);
    }
    return () => clearTimeout(myTimeout);
  }, [reviewSelected.data, reviewSelected.index]);
  const handleCloseModal = () => {
    setShowModal(false);
    setReviewSelected({
      data: null,
      index: 0,
    });
  };

  return ReactDOM.createPortal(
    <ModalImageProductStyles
      style={{
        visibility: `${showModal ? "visible" : "hidden"}`,
        opacity: `${showModal ? "1" : "0"}`,
        transition: "all .5s",
      }}
    >
      <div className="modal_overlay" onClick={handleCloseModal}></div>
      <div className="modal_content">
        <div className="modal_image">
          <div className="modal_header">
            <div onClick={handleCloseModal}>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>
          </div>
          <div className="flex px-10 py-5 gap-x-3 modal_text">
            <div className="modal_img">
              {reviewSelected.data ? (
                <Slider
                  ref={sliderImageVideoRef}
                  {...settings}
                  style={{ width: "100%", height: "100%" }}
                >
                  {reviewSelected.data?.video_url ? (
                    <div className="videoModal">
                      <video
                        style={{
                          height: "440px",
                          width: "400px",
                          borderRadius: "10px",
                          cursor: "pointer",
                        }}
                        controls
                        muted
                        autoPlay={"autoplay"}
                        preLoad="auto"
                        loop
                      >
                        <source src={reviewSelected.data?.video_url} />
                      </video>
                    </div>
                  ) : null}
                  {handleImage(reviewSelected.data?.images)?.length > 0
                    ? handleImage(reviewSelected.data?.images).map((v, i) => (
                        <div className="imageModal" key={i}>
                          <div className="imgModal-container">
                            <img
                              src={v}
                              alt={"ảnh sản phẩm"}
                              style={{
                                background: `url(${c.DEFAULT_PRODUCT_IMG})`,
                                backgroundSize: "contain",
                                width: "400px",
                                height: "440px",
                                borderRadius: "10px",
                                cursor: "pointer",
                              }}
                            />
                          </div>
                        </div>
                      ))
                    : null}
                </Slider>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </ModalImageProductStyles>,
    document.querySelector("body")
  );
};

export default ModalImageVideoReview;
