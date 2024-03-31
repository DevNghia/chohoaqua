import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { handleImgErr } from "../../../helper";
import BannerVertical from "../../../components/BannerVertical";
import { constants as c } from "../../../constants";
import CategoryC from "../../../components/CategoryColumn";
import FilterPrice from "../../../components/Filter/FilterPrice";
import FilterAttribute from "../../../components/Filter/FilterAttribute";
export default function CategoryColumn(props) {
  const categories = useSelector((state) => state.category.categories);
  const appTheme = useSelector((state) => state.app.appTheme);
  const { bannerAds } = props;

  return (
    <div className="categories-column">
      <div className="column">
        {appTheme.home_page_type == 5 ? (
          <CategoryC title="Danh mục sản phẩm" />
        ) : (
          <div className="main-title">
            <h3>Danh mục</h3>
          </div>
        )}
        <Link className="all-img" style={{ display: "flex" }} to={`/san-pham`}>
          <img
            className="image-title"
            src="/img/cubes.png"
            style={{ width: "30px", marginRight: "17px", objectFit: "contain" }}
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
              <div className="name-list" style={{ marginTop: 6 }}>
                {v.name}
              </div>
              {v.category_children.length > 0 && (
                <i
                  className="fas fa-chevron-right"
                  style={{ color: appTheme.color_main_1, marginTop: 9 }}
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
      <FilterPrice></FilterPrice>
      <FilterAttribute></FilterAttribute>
      {bannerAds.status === c.SUCCESS
        ? bannerAds.type_6.length > 0 && (
            <BannerVertical banners={bannerAds.type_6} />
          )
        : null}
    </div>
  );
}
