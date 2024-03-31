import Slider from "react-slick";
import { Link } from "react-router-dom";
import BannerVertical from "../../../components/BannerVertical";
import { constants as c } from "../../../constants";
import { handleImgErr } from "../../../helper";
import { useSelector } from "react-redux";
import "./CategoryColumn3.css"
export default function HomeBanner(props) {
  const categories = useSelector((state) => state.news.categories);
  const appTheme = useSelector((state) => state.app.appTheme);
  const { homeInfo } = props;
  const {bannerAds} = props

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
    <div className="category-post-3 ">
      <div
        className="section_product aside_category product_1 categories-column-1"
        id="product_1"
      >
        <div
          className="block-product site_category"
          style={{
            border: "1px solid #dcd4d4",
            borderRadius: "6px",
          }}
        >
          <div>
            <div>
              <h3
                style={{
                  backgroundColor: appTheme.color_main_1,
                  borderRadius: "6px",
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
              <div className="title-links">
                <div className="btn-more-cate d-md-none"></div>
                <div className="block-cate">
                  <ul>
                    {categories.list.length > 0
                      ? categories.list.map((v, i) => (
                        <li>
                          <div >
                            <Link
                              className="list-icon-block-cate"
                              title={v.title}
                              to={
                                v.title
                                  ? `/tin-tuc?danh-muc=${v.slug}-${v.id}`
                                  : `/tin-tuc?danh-muc=${v.id}`
                              }
                            >
                              <img
                                onError={handleImgErr}
                                src={v.image_url}
                                alt=""
                                style={{
                                  objectFir: "contain",
                                  marginRight: "8px",
                                }}
                              />
                              <div className="title-block-cate">{v.title}</div>
                            </Link>
                          </div>
                        </li>
                      ))
                      : null}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {bannerAds.status === c.SUCCESS
          ? bannerAds.type_7.length > 0 && (
            <BannerVertical banners={bannerAds.type_7} />
          )
          : null}
      </div>
    </div>
  );
}
