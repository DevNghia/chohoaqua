import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { handleImgErr } from "../../../helper";
import BannerVertical from "../../../components/BannerVertical";
import { constants as c } from "../../../constants";
import CategoryC from "../../../components/CategoryColumn";
import "./CategoryColumn5.css"
export default function CategoryColumn(props) {
  const {bannerAds} = props

  const categories = useSelector((state) => state.news.categories);
  const appTheme = useSelector((state) => state.app.appTheme.home_page_type);

  return (
    <div className="categories-column-5 categories-columns">
      {appTheme == 5 ? (
        <CategoryC border={false} title="Danh mục tin tức" />
      ) : (
        <div className="main-title">
          <h3>Danh mục</h3>
        </div>
      )}
      <div className="column">
        {categories.list.map((v, i) => (
          <Link
            key={i}
            style={{
              cursor: "pointer",
              display: "flex",
              "border-top": `${i == 0 ? null : "2px dotted #e5e5e5"}`,
              margin: "0 13px",
              padding: "0.5em",
            }}
            to={
              v.title
                ? `/tin-tuc?danh-muc=${v.slug}-${v.id}`
                : `/tin-tuc?danh-muc=${v.id}`
            }
          >
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
            <div>{v.title}</div>
          </Link>
        ))}
      </div>
      {bannerAds.status === c.SUCCESS
        ? bannerAds.length > 0 && (
            <BannerVertical banners={bannerAds.type_7} />
          )
        : null}
    </div>
  );
}
