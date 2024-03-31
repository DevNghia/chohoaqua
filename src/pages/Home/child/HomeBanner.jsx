import Slider from "react-slick";
import { Link } from "react-router-dom";
import CategoryCard from "../../../components/CategoryCard";
import DiscountProduct from "./DiscountProduct";
import { handleImgErr } from "../../../helper";
import { useSelector } from "react-redux";
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
  return (
    <div className="home-banner row">
      <div className="categories-column">
        <div
          className="main-title"
          style={{ position: "relative", background: "transparent" }}
        >
          <div
            style={{
              backgroundColor: appTheme.color_main_1,
              opacity: "0.25",
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          ></div>
          <h3>Danh mục</h3>
        </div>
        <div className="column">
          <Link
            style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
            to="/san-pham"
          >
            <img
              src="/img/cubes.png"
              alt=""
              style={{
                width: "30px",
                objectFir: "contain",
                marginRight: "8px",
              }}
            />
            <div>Tất cả sản phẩm</div>
          </Link>
          {categories.map((v, i) => (
            <div className="menu-main">
              <Link
                key={i}
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                }}
                to={`/san-pham?danh-muc=${v.slug}-${v.id}`}
              >
                <div className="image">
                  <div className="img-container">
                    <img src={v.image_url} alt="" />
                  </div>
                </div>
                <div style={{ marginTop: 7 }}>{v.name}</div>
              </Link>

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
              <div className="sub-menu-1">
                <ul>
                  {v.category_children.map((child) => (
                    <li>
                      {" "}
                      <Link
                        style={{ cursor: "pointer", display: "flex" }}
                        to={`/san-pham?danh-muc-con=${child.slug}-${child.id}`}
                      >
                        <div className="sub-menu-1-item">
                          <div className="image">
                            <div className="img-container">
                              <img src={child.image_url} alt="" />
                            </div>
                          </div>
                          {child.name}
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="middle">
        <div className="banners">
          <Slider {...bannerSettings}>
            {banners.map((v, i) => (
              <div key={i} className="image">
                <div className="img-container">
                  <a href={v.link_to == null ? "#" : v.link_to}>
                    <img
                      src={v.image_url}
                      title={v.title}
                      onError={handleImgErr}
                      alt={v.title}
                    />
                  </a>
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <div className="categories-row">
          <Slider {...cateSettings}>
            {categories.map((v, i) => (
              <div className="card-container" key={i}>
                <CategoryCard
                  image={v.image_url}
                  title={v.name}
                  id={v.id}
                  key={i}
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <div className="discount-products">
        <div
          className="main-title"
          style={{ position: "relative", background: "transparent" }}
        >
          <div
            style={{
              backgroundColor: appTheme.color_main_1,
              opacity: "0.25",
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          ></div>
          <h3 style={{ zIndex: 4 }}>Ưu đãi hôm nay</h3>
        </div>
        <div className="row" style={{ background: appTheme.color_main_1 }}>
          {discountProducts.map((v, i) => (
            <DiscountProduct product={v} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
