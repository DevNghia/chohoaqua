import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Slider from "react-slick";

export default function HomeBanner(props) {
  const { banners, categories, discountProducts } = props;
  const appTheme = useSelector((state) => state.app.appTheme);

  var bannerSettings = {
    dots: true,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
  };
  var cateSettings = {
    infinite: categories.length > 5,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          centerMode: true,
          arrows: false,
          infinite: categories.length > 2,
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          infinite: categories.length > 4,
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          infinite: categories.length > 4,
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
    ],
  };
  function handleCateClick(id) {
    window.location.href = `/san-pham?danh-muc-ids=${id}`;
  }

  function MouseOver(event) {
    event.target.style.color = appTheme.color_main_1;
  }
  function MouseOut(event) {
    event.target.style.color = "";
  }

  return (
    <section className="home-1">
      <div className="container">
        <div className="home-banner flex flex-wrap">
          <div className="product-category-wrapper Module Module-1282">
            <div className="ModuleContent">
              <div className="product-category dropdown-5">
                <div
                  className="product-category-toggle flex items-center"
                  data-url="/danh-muc-san-pham"
                >
                  <em className="ri-align-left" />
                  <strong>Danh mục sản phẩm</strong>
                  <em className="ri-arrow-drop-down-fill" />
                </div>
                <div className="dropdown-content product-category-dropdown">
                  <div className="product-category-list">
                    <div className="column">
                      <Link className="all-img" style={{ display: "flex" }} to={`/san-pham`}>
                        <img className="img-title" src="/img/cubes.png" style={{ width: "30px", marginRight: "17px", objectFit: "contain" }} />
                        <div style={{ marginTop: "5px" }}>Tất cả sản phẩm</div>
                      </Link>
                      {categories.map((v, i) => (
                        <div className="menu-main">
                          <Link key={i} style={{ cursor: "pointer", display: "flex", alignItems: "normal" }} to={`/san-pham?danh-muc=${v.slug}-${v.id}`}>
                            <div className="image">
                              <div className="img-nav">
                                <img src={v.image_url} />
                              </div>
                            </div>
                            <div className="list-name" style={{ marginTop: 8 }}>
                              {v.name}
                            </div>
                            {v.category_children.length > 0 && <i
                              className="fas fa-chevron-right"
                              style={{ color: appTheme.color_main_1, marginLeft: "auto", marginTop: 9 }}
                            ></i>}
                            <div className="sub-menu-2" style={{ width: "225px", paddingLeft: "15px" }}>
                              <ul>
                                {v.category_children.map((item) => (
                                  <li>

                                    <div className="sub-menu-2-item">
                                      <Link style={{ cursor: "pointer", display: "flex", alignItems: "center",
                                          width: "100%" }}
                                        to={`/san-pham?danh-muc-con=${item.slug}-${item.id}`}>
                                        <div className="image">
                                          <div className="img-list">
                                            <img src={item.image_url} />
                                          </div>
                                        </div>
                                        <div className="list-names"> {item.name}</div>

                                      </Link></div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </Link>
                        </div>
                      ))}

                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="big-banner-promo-wrapper Module Module-222">
            <div className="ModuleContent">
              <div className="big-banner-promo">
                <div className="swiper-container">
                  <div className="">
                    <Slider {...bannerSettings}>
                      {banners.map((v, i) => (
                        <div className="swiper-slide">
                            <a href={v.link_to == null ? "#" : v.link_to} className="object-fit-img img">
                            <img src={v.image_url}       alt={v.title}/>
                          </a>
                        </div>
                      ))}
                    </Slider>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="small-banner-promo-wrapper hidden-mobile Module Module-223">
            <div className="ModuleContent">
              <div className="small-banner-promo">
                <ul className="list-banner" style={{
                  "max-height": "500px",
                  "overflow": "auto"
                }}>

                  {props.banners_ads.map((v, i) => (
                    <li>
                      <a
                        className="object-fit-img img"
                        href={v.link_to == null ? "#" : v.link_to}
                      >
                        <img src={v.image_url}
                        />
                      </a>
                    </li>
                  ))}


                </ul>
              </div>
            </div>
          </div>
          <div className="feature-group-wrap w-100 Module Module-225">
            <div className="ModuleContent">
              <h1
                style={{ textAlign: "center" }}
                className="section-title text-blue"
              >
                {appTheme.contact_individual_organization_name}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
