import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Slider from "react-slick";
import "./style.css";
import $ from "jquery";
import styled from "styled-components";
import { constants as c } from "../../../constants";
import { appActions } from "../../../actions/appActions";

const HomeBanner8Styles = styled.section`
  height: 410px;
  .product-category {
    .column {
      height: 410px;
    }
    .menu-main {
      .list-name {
        width: 180px !important;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    }
  }
  .sub-menu-2 {
    ul {
      display: flex !important;
      flex-direction: column;
      flex-wrap: wrap;
      grid-gap: 0 !important;
      gap: 0 !important;
      overflow-x: auto;
      li {
        .image {
          width: 30px;
          height: 30px;
          flex-shrink: 0;
        }
        .list-names {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
  @media screen and (max-width: 1400px) {
    .object-fit-img.img {
      .image-sale {
        height: 140px !important;
      }
    }
  }
  @media screen and (max-width: 1280.98px) {
    .big-banner-promo {
      .object-fit-img.img {
        //padding-top: 450px !important;
      }
    }
  }
  @media screen and (max-width: 600px) {
    height: 250px;
    .product-category {
      .column {
        height: 250px;
      }
    }
    .big-banner-promo {
      img {
        height: 250px !important;
      }
    }
    .slick-arrow {
      top: 30% !important;
    }
  }
`;
const GadgetStyles = styled.div`
  display: none;
  h2 {
    margin: 10px 0 15px 0;
  }
  .gadget {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    padding: 0 10px;
    column-gap: 5px;
    .gadget__item {
      display: flex;
      flex-direction: column;
      align-items: center;
      row-gap: 10px;
      .gadget__item__img {
        width: 50px;
        height: 50px;
        border-radius: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        svg {
          width: 24px;
          height: 24px;
          color: #fff;
        }
      }
      .gadget__item__title {
        text-align: center;
        height: 32px;
      }
    }
  }
  @media screen and (max-width: 600px) {
    display: block;
  }
`;

const gadgets = [
  {
    id: 1,
    title: "Thuởng sản phẩm",
    url: "/combo-giam-gia",
    background:
      "linear-gradient(298.21deg, #F5AD37 3.58%, rgba(245, 173, 55, 0.6) 100%)",
    icon: (
      <svg
        width="512"
        height="512"
        viewBox="0 0 512 512"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M261.333 165.333H256C253.488 165.231 251.035 164.546 248.833 163.332C246.631 162.119 244.742 160.41 243.314 158.341C241.887 156.272 240.96 153.899 240.607 151.41C240.254 148.921 240.484 146.384 241.28 144C248.747 125.226 255.573 106.026 261.12 87.253C265.813 72.7463 284.16 27.3063 330.24 27.3063C348.199 26.7309 365.653 33.3035 378.771 45.5821C391.89 57.8606 399.601 74.8419 400.213 92.7997C400.213 133.973 353.493 150.826 336.213 156.8C311.783 163.175 286.571 166.048 261.333 165.333ZM330.027 58.6663C305.493 58.6663 294.4 87.0397 291.627 95.7863C287.787 108.16 283.733 120.533 279.253 132.906C294.548 132.809 309.759 130.657 324.48 126.506C336.64 122.24 367.147 110.72 367.147 92.1597C366.49 82.861 362.256 74.1783 355.335 67.9335C348.414 61.6887 339.344 58.3673 330.027 58.6663Z"
          fill="currentColor"
        />
        <path
          d="M250.027 165.333C225.337 165.768 200.708 162.752 176.853 156.373C123.733 139.093 112.853 112 112.853 92.3732C112.943 84.0835 114.708 75.8975 118.045 68.3083C121.381 60.719 126.219 53.8835 132.267 48.2132C145.715 34.6841 163.964 27.0163 183.04 26.8799C218.88 26.8799 237.013 60.3732 250.453 84.2666C259.187 103.853 266.322 124.115 271.787 144.853C272.448 147.207 272.56 149.68 272.117 152.084C271.673 154.488 270.684 156.758 269.227 158.72C267.814 160.701 265.961 162.329 263.815 163.477C261.669 164.624 259.286 165.259 256.853 165.333H250.027ZM180.693 58.6666C170.563 59.1029 160.999 63.4639 154.027 70.8265C150.986 73.5081 148.527 76.7848 146.802 80.4541C145.078 84.1234 144.124 88.1074 144 92.1599C144 105.173 159.787 117.76 186.667 126.507C202.351 130.561 218.468 132.71 234.667 132.907C231.216 121.546 227.011 110.428 222.08 99.6266L234.667 91.9466L220.8 99.6266C208.427 75.9466 197.76 59.0932 181.333 58.6666H180.693Z"
          fill="currentColor"
        />
        <path
          d="M453.333 218.666V192C453.333 176.44 447.152 161.518 436.15 150.516C425.148 139.514 410.226 133.333 394.667 133.333H117.333C101.774 133.333 86.8519 139.514 75.8498 150.516C64.8476 161.518 58.6667 176.44 58.6667 192V218.666H453.333Z"
          fill="currentColor"
        />
        <path
          d="M272 250.667V485.334H394.667C410.226 485.334 425.148 479.153 436.15 468.151C447.152 457.148 453.333 442.226 453.333 426.667V250.667H272Z"
          fill="currentColor"
        />
        <path
          d="M240 250.667H58.6667V426.667C58.6667 442.226 64.8476 457.148 75.8498 468.151C86.8519 479.153 101.774 485.334 117.333 485.334H240V250.667Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Voucher",
    url: "/ma-giam-gia",
    background:
      "linear-gradient(296.12deg, #349EF0 5.79%, rgba(52, 158, 240, 0.6) 97.29%)",
    icon: (
      <svg
        width="512"
        height="330"
        viewBox="0 0 512 330"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M497 0H151.245V45C151.245 53.291 144.536 60 136.245 60C127.954 60 121.245 53.291 121.245 45V0H15C6.709 0 0 6.709 0 15V105C0 113.291 6.709 120 15 120C39.814 120 60 140.186 60 165C60 189.814 39.814 210 15 210C6.709 210 0 216.709 0 225V315C0 323.291 6.709 330 15 330H120V285C120 276.709 126.709 270 135 270C143.291 270 150 276.709 150 285V330H497C505.291 330 512 323.291 512 315V15C512 6.709 505.291 0 497 0ZM150 225C150 233.291 143.291 240 135 240C126.709 240 120 233.291 120 225V195C120 186.709 126.709 180 135 180C143.291 180 150 186.709 150 195V225ZM150 135C150 143.291 143.291 150 135 150C126.709 150 120 143.291 120 135V105C120 96.709 126.709 90 135 90C143.291 90 150 96.709 150 105V135ZM242 105C242 80.186 262.186 60 287 60C311.814 60 332 80.186 332 105C332 129.814 311.814 150 287 150C262.186 150 242 129.814 242 105ZM278.68 267.48C271.781 262.88 269.92 253.579 274.52 246.679L394.52 66.679C399.105 59.78 408.407 57.934 415.321 62.519C422.22 67.119 424.081 76.42 419.481 83.32L299.481 263.32C294.956 270.117 285.689 272.126 278.68 267.48ZM407 270C382.186 270 362 249.814 362 225C362 200.186 382.186 180 407 180C431.814 180 452 200.186 452 225C452 249.814 431.814 270 407 270Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Tích điểm",
    url: "/xu-tich-luy",
    background:
      "linear-gradient(299.17deg, #FD6162 13.41%, rgba(253, 97, 98, 0.6) 96.83%)",
    icon: (
      <svg
        width="532"
        height="532"
        viewBox="0 0 532 532"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="266" cy="266" r="266" fill="white" />
        <path
          d="M456.36 221.047C452.43 209.228 442.19 200.768 429.63 198.976L337.07 185.807L295.68 103.684C295.68 103.684 295.68 103.684 295.68 103.674C290.06 92.5409 278.69 85.6084 266 85.6084C253.31 85.6084 241.94 92.5409 236.32 103.684L194.93 185.807L102.37 198.976C89.81 200.768 79.57 209.218 75.64 221.047C71.73 232.865 74.94 245.594 84.02 254.27L151 318.19L135.18 408.449C133.04 420.709 138.09 432.84 148.35 440.155C158.62 447.459 171.96 448.409 183.21 442.622L266 400.009L348.79 442.642C353.67 445.139 358.95 446.392 364.21 446.392C371.04 446.392 377.84 444.297 383.64 440.165C393.91 432.86 398.96 420.718 396.81 408.459L381 318.19L447.98 254.26C457.06 245.594 460.27 232.865 456.36 221.047ZM431.22 237.448L359.72 305.676C356.9 308.369 355.61 312.266 356.27 316.075L373.16 412.425C374.02 417.36 370.91 420.17 369.53 421.149C368.17 422.138 364.47 424.155 359.96 421.835L271.59 376.333C269.83 375.422 267.92 374.982 266 374.982C264.08 374.982 262.17 375.432 260.41 376.333L172.05 421.815C167.5 424.165 163.82 422.128 162.46 421.139C161.08 420.16 157.97 417.35 158.83 412.415L175.72 316.065C176.39 312.256 175.1 308.369 172.27 305.666L100.77 237.438C97.11 233.942 97.93 229.889 98.46 228.293C98.99 226.706 100.76 222.946 105.81 222.222L204.61 208.161C208.52 207.613 211.9 205.204 213.65 201.738L257.83 114.083C260.09 109.598 264.3 109.099 266 109.099C267.7 109.099 271.91 109.588 274.17 114.063L318.35 201.728C320.1 205.194 323.47 207.603 327.39 208.151L426.18 222.212C431.24 222.937 433.01 226.697 433.54 228.283C434.06 229.898 434.88 233.942 431.22 237.448Z"
          fill="#FD6162"
        />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Sản phẩm mới",
    url: "/san-pham",
    background:
      "linear-gradient(296.6deg, #5DB561 3.84%, rgba(93, 181, 97, 0.6) 100%)",
    icon: (
      <svg
        width="512"
        height="512"
        viewBox="0 0 512 512"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M509.991 248.501L479.714 196.053V135.5C479.714 130.141 476.855 125.188 472.213 122.509L419.767 92.2329L389.492 39.7869C386.812 35.1459 381.86 32.2869 376.501 32.2869H315.947L263.499 2.00887C258.859 -0.669125 253.142 -0.670125 248.5 2.00887L196.053 32.2859H135.5C130.141 32.2859 125.188 35.1449 122.509 39.7869L92.234 92.2329L39.787 122.509C35.145 125.188 32.286 130.14 32.286 135.5V196.053L2.00901 248.501C-0.669994 253.142 -0.669994 258.858 2.00901 263.499L32.285 315.947V376.5C32.285 381.859 35.144 386.812 39.786 389.491L92.233 419.767L122.509 472.213C125.188 476.855 130.14 479.714 135.5 479.714H196.054L248.501 509.991C250.821 511.33 253.411 512 256.001 512C258.591 512 261.18 511.33 263.5 509.991L315.947 479.714H376.5C381.859 479.714 386.812 476.855 389.491 472.214L419.766 419.768L472.212 389.492C476.854 386.813 479.713 381.861 479.713 376.501V315.948L509.99 263.5C512.67 258.858 512.67 253.142 509.991 248.501ZM182.633 304.2C182.633 310.81 178.306 316.64 171.98 318.556C165.606 320.484 158.794 317.981 155.152 312.52L118.366 257.341V304.2C118.366 312.484 111.65 319.2 103.366 319.2C95.082 319.2 88.366 312.484 88.366 304.2V207.8C88.366 201.19 92.693 195.36 99.019 193.444C105.346 191.53 112.18 193.98 115.847 199.48L152.633 254.659V207.8C152.633 199.516 159.349 192.8 167.633 192.8C175.917 192.8 182.633 199.516 182.633 207.8V304.2ZM247.967 241C256.251 241 262.967 247.716 262.967 256C262.967 264.284 256.251 271 247.967 271H230.834V289.2H264.034C272.318 289.2 279.034 295.916 279.034 304.2C279.034 312.484 272.318 319.2 264.034 319.2H215.834C207.55 319.2 200.834 312.484 200.834 304.2V207.8C200.834 199.516 207.55 192.8 215.834 192.8H264.034C272.318 192.8 279.034 199.516 279.034 207.8C279.034 216.084 272.318 222.8 264.034 222.8H230.834V241H247.967ZM431.219 211.438L407.119 307.838C405.501 314.308 399.806 318.934 393.142 319.19C392.949 319.197 392.754 319.201 392.562 319.201C386.13 319.202 380.384 315.088 378.336 308.944L360.433 255.234L342.53 308.944C340.421 315.271 334.387 319.429 327.724 319.19C321.06 318.934 315.365 314.308 313.747 307.838L289.647 211.438C287.638 203.401 292.524 195.257 300.561 193.249C308.6 191.236 316.742 196.125 318.751 204.163L330.357 250.59L346.201 203.058C348.243 196.933 353.975 192.801 360.431 192.801C366.887 192.801 372.619 196.933 374.661 203.058L390.505 250.59L402.111 204.163C404.121 196.126 412.265 191.238 420.301 193.249C428.341 195.257 433.228 203.4 431.219 211.438Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
];

export default function HomeBanner(props) {
  const dispatch = useDispatch();

  const { banners, categories, discountProducts } = props;
  const appTheme = useSelector((state) => state.app.appTheme);
  const tokenInfo = useSelector((state) => state.user.tokenInfo);

  useEffect(() => {
    $(".parent").on("mouseover", function () {
      var $menuItem = $(this),
        $submenuWrapper = $(".wrapper", $menuItem);
      var menuItemPos = $menuItem.position();
      $submenuWrapper.css({
        top: menuItemPos.top,
        left: menuItemPos.left + Math.round($menuItem.outerWidth() * 1),
      });
    });
  });
  var bannerSettings = {
    dots: false,
    // autoplay: true,
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

  console.log(banners);

  return (
    <>
      <HomeBanner8Styles className="home-1 home-8 banner-8">
        <div className="container">
          <div className="home-banner home-banner-8 flex flex-wrap" style={{width:"100%"}}>
            <div className="product-category-wrapper Module Module-1282">
              <div className="ModuleContent">
                <div className="product-category dropdown-5">
                  <div className="dropdown-content product-category-dropdown">
                    <div className="product-category-list wrapper">
                      <div className="column" style={{ marginTop: "10px" }}>
                        <Link
                          className="all-img"
                          style={{ display: "flex", paddingLeft: "13px" }}
                          to={`/san-pham`}
                        >
                          <img
                            className="img-title"
                            src="/img/cubes.png"
                            style={{
                              width: "30px",
                              marginRight: "17px",
                              objectFit: "contain",
                            }}
                            alt=""
                          />
                          <div style={{ marginTop: "5px" }}>
                            Tất cả sản phẩm
                          </div>
                        </Link>
                        <a
                          href="#"
                          className="menu-main parent"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            cursor: "pointer",
                          }}
                        >
                          <div
                            className="icon-nav-top"
                            style={{
                              fontSize: "20px",
                              marginRight: "14px",
                              objectFit: "contain",
                            }}
                          >
                            <i class="fab fa-salesforce"></i>
                          </div>
                          <div className="title-nav-list-header">
                            Khuyến mại
                          </div>
                          <i
                            className="fas fa-chevron-right"
                            style={{
                              color: appTheme.color_main_1,
                              marginLeft: "auto",
                            }}
                          ></i>
                          <div className="sub-menu-2 wrapper">
                            <ul
                              style={{
                                width: "223px",
                                height: "90px",
                              }}
                            >
                              <li
                                style={{
                                  width: "223px",
                                }}
                              >
                                <div
                                  className="sub-menu-2-item"
                                  style={{
                                    height: "45px",
                                  }}
                                >
                                  <Link
                                    style={{
                                      cursor: "pointer",
                                    }}
                                    to={`/ma-giam-gia`}
                                  >
                                    Voucher
                                  </Link>
                                </div>
                                <div
                                  className="sub-menu-2-item"
                                  style={{
                                    height: "45px",
                                  }}
                                >
                                  <Link
                                    style={{
                                      cursor: "pointer",
                                    }}
                                    to={`/combo-giam-gia`}
                                  >
                                    Combo tặng thưởng
                                  </Link>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </a>

                        {categories.map((v, i) => (
                          <div className="menu-main parent">
                            <Link
                              key={i}
                              style={{
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                width: "100%",
                              }}
                              to={`/san-pham?danh-muc=${v.slug}-${v.id}`}
                            >
                              <div className="image">
                                <div className="img-nav">
                                  <img
                                    style={{ borderRadius: "4px" }}
                                    src={
                                      v.image_url || "./img/default_product.jpg"
                                    }
                                    alt="category"
                                  />
                                </div>
                              </div>
                              <div
                                className="list-name"
                                style={{
                                  marginRight: "3px",
                                }}
                              >
                                {v.name}
                              </div>
                              {v.category_children.length > 0 && (
                                <i
                                  className="fas fa-chevron-right"
                                  style={{
                                    color: appTheme.color_main_1,
                                    marginLeft: "auto",
                                    marginTop: 9,
                                  }}
                                ></i>
                              )}
                              <div className="sub-menu-2 wrapper">
                                <ul
                                  style={{
                                    width: `calc(223px*${Math.ceil(
                                      v.category_children.length / 8
                                    )})`,
                                    maxWidth: `calc(223px*4)`,
                                    height:
                                      Math.ceil(
                                        v.category_children.length / 8
                                      ) > 1
                                        ? "442px"
                                        : `calc(54px*${v.category_children.length})`,
                                  }}
                                >
                                  {v.category_children.map((item) => (
                                    <li
                                      style={{
                                        width: "223px",
                                      }}
                                    >
                                      <div className="sub-menu-2-item">
                                        <Link
                                          style={{
                                            cursor: "pointer",
                                            display: "flex",
                                            alignItems: "center",
                                            width: "100%",
                                            height: "33px",
                                          }}
                                          to={`/san-pham?danh-muc-con=${item.slug}-${item.id}`}
                                        >
                                          <div className="image">
                                            <div className="img-list">
                                              <img
                                                src={
                                                  item.image_url ||
                                                  "./img/default_product.jpg"
                                                }
                                                alt="category"
                                              />
                                            </div>
                                          </div>
                                          <div className="list-names">
                                            {" "}
                                            {item.name}
                                          </div>
                                        </Link>
                                      </div>
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
                    <div className="swiper-img">
                      <Slider {...bannerSettings}>
                        {banners.map((v, i) => (
                          <div className="swiper-slide">
                            <a
                              href={v.link_to == null ? "#" : v.link_to}
                              className="object-fit-img img"
                            >
                              <img
                                style={{ height: "410px" }}
                                src={v.image_url}
                                alt={v.title}
                              />
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
                  <ul className="list-banner">
                    {props.banners_ads.map((v, i) => (
                      <li>
                        <a
                          className="object-fit-img img"
                          href={v.link_to == null ? "#" : v.link_to}
                        >
                          <img
                            style={{ height: "177px" }}
                            className="image-sale "
                            src={v.image_url}
                          />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </HomeBanner8Styles>
      <GadgetStyles>
        <div className="container">
          <h2>TIỆN ÍCH CỦA TÔI</h2>
          <div className="gadget">
            {gadgets.map((gadget) => {
              if (gadget.title === "Tích điểm") {
                if (tokenInfo) {
                  return (
                    <div className="gadget__item" key={gadget.id}>
                      <Link
                        to={gadget.url}
                        className="gadget__item__img"
                        style={{
                          background: gadget.background,
                        }}
                      >
                        {gadget.icon}
                      </Link>
                      <Link to={gadget.url} className="gadget__item__title">
                        {gadget.title}
                      </Link>
                    </div>
                  );
                } else {
                  return (
                    <div className="gadget__item" key={gadget.id}>
                      <a
                        onClick={() =>
                          dispatch(appActions.changePopup(c.PHONE_POPUP))
                        }
                        className="gadget__item__img"
                        style={{
                          background: gadget.background,
                        }}
                      >
                        {gadget.icon}
                      </a>
                      <a
                        onClick={() =>
                          dispatch(appActions.changePopup(c.PHONE_POPUP))
                        }
                        className="gadget__item__title"
                      >
                        {gadget.title}
                      </a>
                    </div>
                  );
                }
              } else {
                return (
                  <div className="gadget__item" key={gadget.id}>
                    <Link
                      to={gadget.url}
                      className="gadget__item__img"
                      style={{
                        background: gadget.background,
                      }}
                    >
                      {gadget.icon}
                    </Link>
                    <Link to={gadget.url} className="gadget__item__title">
                      {gadget.title}
                    </Link>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </GadgetStyles>
    </>
  );
}
