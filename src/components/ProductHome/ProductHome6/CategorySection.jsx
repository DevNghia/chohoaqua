import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Slider from "react-slick";
import "./style.css"
export default function CategorySection(props) {
  const { categories } = props;
  const appTheme = useSelector((state) => state.app.appTheme);
  const categoryImages = [
    '/img/banner_index_img1.png',
    '/img/banner_index_img3.png',
    '/img/banner_index_img2.png',
    '/img/banner_index_img5.png',
    '/img/banner_index_img4.png',
    '/img/banner_index_img8.png',
    '/img/banner_index_img9.png',
    '/img/banner_index_img6.png',
    '/img/banner_index_img7.png',
  ];
  
  function renderCategoryBanners(index, value) {
    var banner = [];
    if (categories[index]) {
      banner.push(
        <div className="col-md-4 col-12 category-block">
          <Link to={`/san-pham?danh-muc=${categories[index].slug}-${categories[index].id}`} alt="">
            <img src={value} alt="" />
          </Link>
        </div>
      );
    } else {
      banner.push(
        <div className="col-md-4 col-12 category-block">
          <Link to="#" alt="">
            <img src={value} alt="" />
          </Link>
        </div>
      );
    }
    return (banner);
  }

  return (
    <section className="category-section product6">
      <div className="container">
        <div className="row">
          <div className="col-12 section-head">
            <h2 className="section-title text-center">
      				<hr className="hr-1" />
      				<hr className="hr-2" />
      				<hr className="hr-3" />
      				<span className="banner-top uppercase">TỦ ĐỒ CỦA GIA ĐÌNH VIỆT</span>
      			</h2>
          </div>
          <div className="category-banners row">
            {categoryImages.map((v, i) => {
              return renderCategoryBanners(i, v)
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
