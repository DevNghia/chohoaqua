import Slider from "react-slick";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import styled from "styled-components";

const CategoryProduct3Styles = styled.div`
  .slick-prev,
  .slick-next {
    top: 50% !important;
  }
`;

export default function HomeBanner(props) {
  const { banners, categories, discountProducts } = props;
  const appTheme = useSelector((state) => state.app.appTheme);

  function handleCateClick(id) {
    window.location.href = `/san-pham?danh-muc-ids=${id}`;
  }

  var settings = {
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1028,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <CategoryProduct3Styles
      className="awe-section-2 banner3-category-product"
      style={{}}
    >
      <section className="section_category category-1">
        <div className="container">
          <div className="cate-list">
            <div className="swiper-container">
              <Slider {...settings}>
                {categories.length > 0
                  ? categories.map((v, i) => (
                      <div className="swiper-slide">
                        <div className="cate-item">
                          <Link
                            className="image"
                            to={`/san-pham?danh-muc=${v.slug}-${v.id}`}
                            title="Trứng và bơ"
                          >
                            <img
                              className="image_cate_thumb lazy"
                              width={160}
                              height={160}
                              src={
                                v.image_url
                                  ? v.image_url
                                  : "./img//default_product.jpg"
                              }
                              alt=""
                            />
                          </Link>
                          <h3 className="title_cate_">
                            <Link to={`/san-pham?danh-muc=${v.slug}-${v.id}`}>
                              {v.name}
                            </Link>
                          </h3>
                        </div>
                      </div>
                    ))
                  : null}
              </Slider>
            </div>
          </div>
        </div>
      </section>
    </CategoryProduct3Styles>
  );
}
