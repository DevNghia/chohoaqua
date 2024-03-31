import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { handleImgErr } from "../../../helper";
import BannerVertical from "../../../components/BannerVertical";
import { constants as c } from "../../../constants";
import CategoryC from "../../../components/CategoryColumn"
import "./CategoryColumn1.css"
export default function CategoryColumn(props) {
  const {bannerAds} = props
  const categories = useSelector(state => state.news.categories);
  const appTheme = useSelector((state) => state.app.appTheme);

  return (
    <div className="category-product1 categories-columns">
      {
        appTheme.home_page_type == 5 ? <CategoryC title="Danh mục tin tức" /> :
          <div className="main-title" style={{ position: "relative", background: "transparent" }}>
            <div style={{ backgroundColor: appTheme.color_main_1, opacity: "0.25", position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
            </div>
            <h3 >Danh mục</h3>
          </div>
      }
      <div className="column">
        {
          categories.list.map((v, i) =>
            <Link
              key={i}
              style={{ cursor: "pointer" }}
              to={
                v.title ?
                  `/tin-tuc?danh-muc=${v.slug}-${v.id}`
                  :
                  `/tin-tuc?danh-muc=${v.id}`
              }>
              <div className="image">
                <div className="img-container">
                  <img
                    onError={handleImgErr}
                    src={v.image_url}
                    alt=""
                    style={{ objectFir: "contain", marginRight: "8px" }}
                  />
                </div>
              </div>
              <div>
                {v.title}
              </div>
            </Link>
          )
        }
      </div>
      {bannerAds.status === c.SUCCESS
        ? bannerAds.type_7.length > 0 && (
          <BannerVertical banners={bannerAds.type_7} />
        )
        : null}
    </div>
  )
}