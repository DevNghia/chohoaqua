import React from "react";
import Slider from "react-slick";
import styled from "styled-components";

const Banner10Styles = styled.section`
  .banner10__content {
    .banner10_content__slide {
      img {
        width: 100%;
      }
    }
    .slick-dots {
      bottom: 20px;
      li {
        button {
          border: 2px solid white;
          border-radius: 100rem;
          &::before {
            color: white !important;
          }
        }
      }
    }
    .slick-arrow {
      z-index: 9999;
      height: 50px;
      line-height: 60px;
      width: 50px;
      background: rgba(7, 7, 7, 0.7) !important;
      padding: 0px;
      margin: 0px;
    }
    .slick-prev {
      left: 15px;
      &::before {
        font-family: inherit;
      }
    }
    .slick-next {
      right: 10px;
      &::before {
        font-family: inherit;
      }
    }
    @media screen and (max-width: 400px) {
      .slick-arrow {
        height: 30px;
        width: 30px;
        display: flex !important;
        justify-content: center;
      }
      .slick-prev {
        left: 15px;
      }
      .slick-next {
        right: 10px;
      }
      .slick-prev,
      .slick-next {
        &::before {
          line-height: 25px;
          font-family: inherit;
        }
      }
    }
  }
`;

const HomeBanner = (props) => {
  const { banners } = props;
  var bannerSettings = {
    dots: true,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
  };

  return (
    <Banner10Styles className="banner10">
      <div className="banner10__content">
        <Slider {...bannerSettings}>
          {banners.map((banner, index) => (
            <div className="banner10_content__slide" key={index}>
              <img src={banner.image_url} alt={banner.title} />
            </div>
          ))}
        </Slider>
      </div>
    </Banner10Styles>
  );
};

export default HomeBanner;
