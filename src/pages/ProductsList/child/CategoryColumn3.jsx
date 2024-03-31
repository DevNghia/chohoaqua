import Slider from "react-slick";
import { Link } from "react-router-dom";
import BannerVertical from "../../../components/BannerVertical";
import { constants as c } from "../../../constants";
import { useSelector } from "react-redux";
import "./CategoryColumn3.css";
import FilterPrice from "../../../components/Filter/FilterPrice";
import FilterAttribute from "../../../components/Filter/FilterAttribute";

export default function HomeBanner(props) {
  const categories = useSelector((state) => state.category.categories);
  const appTheme = useSelector((state) => state.app.appTheme);
  const { bannerAds } = props;

  function handleCateClick(id) {
    window.location.href = `/san-pham?danh-muc-ids=${id}`;
  }

  var bannerSettings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    dotsClass: "slick-dots slick-thumb",
  };
  return (
    <div className="category-product3">
      <div className="section_product aside_category ">
        <div
          className="block-product site_category"
          style={{
            border: "1px solid #dcd4d4",
            borderRadius: "6px",
          }}
        >
          <h3
            style={{
              backgroundColor: appTheme.color_main_1,
              "border-radius": "6px",
              padding: "7px",
            }}
          >
            <Link
              to="/san-pham"
              title="Trái cây"
              style={{
                padding: "16px",
                color: appTheme.color_main_1 == null ? "black" : "white",
              }}
            >
              Danh mục
            </Link>
          </h3>
          <div className="column">
            <Link
              className="all-img"
              style={{ display: "flex" }}
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
              />
              <div style={{ marginTop: "5px" }}>Tất cả sản phẩm</div>
            </Link>
            {categories.map((v, i) => (
              <div className="menu-main">
                <Link
                  key={i}
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "normal",
                  }}
                  to={`/san-pham?danh-muc=${v.slug}-${v.id}`}
                >
                  <div className="image">
                    <div className="img-nav">
                      <img src={v.image_url} />
                    </div>
                  </div>
                  <div className="list-name" style={{ marginTop: 7 }}>
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
                  <div className="sub-menu-1">
                    <ul>
                      {v.category_children.map((item) => (
                        <li>
                          <Link
                            style={{ cursor: "pointer", display: "flex" }}
                            to={`/san-pham?danh-muc-con=${item.slug}-${item.id}`}
                          >
                            <div className="sub-menu-1-item">
                              <div className="image">
                                <div className="img-list">
                                  <img src={item.image_url} />
                                </div>
                              </div>
                              <div className="list-names"> {item.name}</div>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
        {bannerAds.status === c.SUCCESS
          ? bannerAds.type_6.length > 0 && (
              <BannerVertical banners={bannerAds.type_6} />
            )
          : null}
      </div>
      <FilterPrice></FilterPrice>
      <FilterAttribute></FilterAttribute>
    </div>
  );
}
