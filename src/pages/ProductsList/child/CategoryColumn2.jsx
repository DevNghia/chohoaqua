import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { handleImgErr } from "../../../helper";
import BannerVertical from "../../../components/BannerVertical";
import { constants as c } from "../../../constants";
import "./CategoryColumn2.css";
import FilterPrice from "../../../components/Filter/FilterPrice";
import styled from "styled-components";
import FilterAttribute from "../../../components/Filter/FilterAttribute";

const CategoryColumn2Styles = styled.div`
  .menu-main {
    &:hover {
      .sub-menu-1 {
        margin-left: 215px !important;
      }
    }
  }
`;

export default function CategoryColumn2(props) {
  const { bannerAds } = props;

  const categories = useSelector((state) => state.category.categories);
  const appTheme = useSelector((state) => state.app.appTheme);
  return (
    <CategoryColumn2Styles className="category_column2">
      <aside className="blog-aside aside-item sidebar-category categories-column-1">
        <div
          className="aside-title text-center text-xl-left"
          style={{ backgroundColor: appTheme.color_main_1 }}
        >
          <h2 className="title-head">
            <span>Danh mục</span>
          </h2>
        </div>
        <div className="column">
          <Link
            className="all-img"
            style={{ display: "flex", padding: "20px 10px 10px 5px" }}
            to={`/san-pham`}
          >
            <img
              className="img-title"
              src="/img/cubes.png"
              style={{
                width: "30px",
                marginRight: "15px",
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
                <div className="list-name" style={{ marginTop: 5 }}>
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
                  <ul
                    style={{
                      width: `calc(238px*${Math.ceil(
                        v.category_children.length / 8
                      )})`,
                      maxWidth: `calc(238px*4)`,
                      height:
                        Math.ceil(v.category_children.length / 8) > 1
                          ? "450px"
                          : `calc(56px*${v.category_children.length})`,
                      gap: 0,
                      boxShadow: "2px 3px 10px 2px rgba(0, 0, 0, 0.05)",
                    }}
                  >
                    {v.category_children.map((item) => (
                      <li
                        style={{
                          width: "238px",
                        }}
                      >
                        <Link
                          style={{ cursor: "pointer", display: "flex" }}
                          to={`/san-pham?danh-muc-con=${item.slug}-${item.id}`}
                        >
                          <div className="sub-menu-1-item">
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
        {bannerAds.status === c.SUCCESS
          ? bannerAds.type_6.length > 0 && (
              <BannerVertical banners={bannerAds.type_6} />
            )
          : null}
      </aside>
      <FilterPrice></FilterPrice>
      <FilterAttribute></FilterAttribute>
    </CategoryColumn2Styles>
  );
}
