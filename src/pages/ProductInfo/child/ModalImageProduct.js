import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import styled from "styled-components";
import { constants as c } from "../../../constants";
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
const ModalImageProduct = ({
  setShowImageModal = () => {},
  showImageModal = false,
  imageIndex = 0,
  _curentImages = [],
  video_url = "",
  name = "",
}) => {
  const sliderImageRef = useRef();
  const appTheme = useSelector((state) => state.app.appTheme);
  var settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    if (showImageModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [showImageModal]);
  //Handle Image border
  const [selectedImage, setSelectedImage] = useState(0);
  useEffect(() => {
    setSelectedImage(imageIndex);
    sliderImageRef.current.slickGoTo(imageIndex);
  }, [imageIndex]);
  const handleShowImageModal = () => {
    setShowImageModal(false);
  };
  const handleChangeSlide = (index) => {
    setSelectedImage(index);
    sliderImageRef.current.slickGoTo(index);
  };
  return ReactDOM.createPortal(
    <ModalImageProductStyles
      style={{
        visibility: `${showImageModal ? "visible" : "hidden"}`,
        opacity: `${showImageModal ? "1" : "0"}`,
        transition: "all .5s",
      }}
    >
      <div
        className="modal_overlay"
        onClick={() => setShowImageModal(false)}
      ></div>
      <div className="modal_content">
        <div className="modal_image">
          <div className="modal_header">
            <div onClick={() => setShowImageModal(false)}>
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
              <Slider
                ref={sliderImageRef}
                beforeChange={(oldIndex, i) => setSelectedImage(i)}
                {...settings}
                style={{ width: "100%", height: "100%" }}
              >
                {_curentImages.map((v, i) => {
                  if (i == 0 && video_url != "" && video_url != null) {
                    return (
                      <div className="videoModal" key={i}>
                        <video
                          onClick={handleShowImageModal}
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
                          <source src={v} type="video/mp4" />
                        </video>
                      </div>
                    );
                  } else {
                    return (
                      <div className="imageModal" key={i}>
                        <div className="imgModal-container">
                          <img
                            onClick={handleShowImageModal}
                            src={v.image_url}
                            alt={name}
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
                    );
                  }
                })}
              </Slider>
            </div>
            <div className="image_detail" style={{ padding: "0 8px" }}>
              <div className="grid grid-cols-3 gap-[10px] list_image mt-3">
                {_curentImages.length > 0 &&
                  _curentImages.map((v, i) => {
                    if (i == 0 && video_url != "" && video_url != null) {
                      return (
                        <div className="bg_video" key={i}>
                          <video
                            style={{
                              height: "100%",
                              width: "100%",
                              borderRadius: "10px",
                              cursor: "pointer",
                              border: `2px solid  ${
                                selectedImage === i
                                  ? appTheme.color_main_1
                                  : "#dee2e6"
                              }`,
                            }}
                            controls
                            muted
                            autoPlay={"autoplay"}
                            preLoad="auto"
                            loop
                          >
                            <source src={v} type="video/mp4" />
                          </video>
                          <div
                            className="overlayImage absolute inset-0 z-10 transition-all hover:bg-[rgba(255,255,255,0.2)]"
                            onClick={() => handleChangeSlide(i)}
                          ></div>
                        </div>
                      );
                    } else {
                      return (
                        <div className="bg_img" key={i}>
                          <img
                            src={v.image_url}
                            alt={`img-${i}`}
                            style={{
                              background: `url(${c.DEFAULT_PRODUCT_IMG})`,
                              backgroundSize: "contain",
                              width: "100%",
                              height: "100%",
                              borderRadius: "10px",
                              cursor: "pointer",
                              border: `2px solid  ${
                                selectedImage === i
                                  ? appTheme.color_main_1
                                  : "#dee2e6"
                              }`,
                            }}
                          />
                          <div
                            className="overlayImage absolute inset-0 z-10 transition-all hover:bg-[rgba(255,255,255,0.2)]"
                            onClick={() => handleChangeSlide(i)}
                          ></div>
                        </div>
                      );
                    }
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModalImageProductStyles>,
    document.querySelector("body")
  );
};

export default ModalImageProduct;
