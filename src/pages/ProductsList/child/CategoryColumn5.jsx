import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { handleImgErr } from "../../../helper";
import BannerVertical from "../../../components/BannerVertical";
import { constants as c } from "../../../constants";
import CategoryC from "../../../components/CategoryColumn";
import "./CategoryColumn5.css";
import FilterPrice from "../../../components/Filter/FilterPrice";
import FilterAttribute from "../../../components/Filter/FilterAttribute";
import styled from "styled-components";
import { useEffect, useState } from "react";

const CategoryColumn5Styles = styled.div`
  .menu-main {
    .sub-menu-1 {
      ul {
        flex-direction: row !important;
      }
    }
  }
  .menu_collapse{
    display: flex;
    column-gap: 10px;
    align-items: center;
    justify-content: center;
    color: #0071c4;
    cursor: pointer;
    margin-top: 5px;
    font-size: 14px;
    padding: 5px 0 10px;
  }
`;

export default function CategoryColumn(props) {
  const categories = useSelector((state) => state.category.categories);
  const { bannerAds } = props;
  const appTheme = useSelector((state) => state.app.appTheme);

  const [categoriesShow, setCategoriesShow] = useState([]);
  const [collapseCategory, setCollapseCategory] = useState(null);

  const handleCollapse = () => {
    setCategoriesShow(collapseCategory ? categories : categories.slice(0,10));
    setCollapseCategory(!collapseCategory);
  }

  useEffect(() => {
    if (categories?.length > 10) {
      setCategoriesShow(categories.slice(0, 10));
      setCollapseCategory(true);
    } else {
      setCategoriesShow(categories);
    }
  }, [categories]);

  return (
    <CategoryColumn5Styles className="categories-column5 categories-column">
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
        {categoriesShow.map((v, i) => (
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
              <div
                className="sub-menu-1"
                style={{
                  width: `255px`,
                }}
              >
                <ul>
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
                          <div
                            className="image"
                            style={{
                              flexShrink: "0",
                            }}
                          >
                            <div className="img-list">
                              <img
                                src={item.image_url}
                                style={{
                                  width: "35px",
                                  height: "35px",
                                }}
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
        {collapseCategory === null ? null : collapseCategory  ? (
          <div className="menu_collapse" onClick={handleCollapse}>
            Xem thêm <i className="fa fa-angle-double-down"></i>
          </div>
        ) : (
          <div className="menu_collapse" onClick={handleCollapse}>Thu gọn <i className="fa fa-angle-double-up"></i></div>
        )}
      </div>
      <FilterPrice></FilterPrice>
      <FilterAttribute></FilterAttribute>
      {bannerAds.status === c.SUCCESS
        ? bannerAds.type_6.length > 0 && (
            <BannerVertical banners={bannerAds.type_6} />
          )
        : null}
    </CategoryColumn5Styles>
  );
}
