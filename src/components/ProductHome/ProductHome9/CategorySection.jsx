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
    <div className="header-10 home-page-10">

    <section className="section awe-section-2 ">
        <section className="section_collections section">
          <div className="container card border-0">
            <div className="title_module_main heading-bar">
              <h2 className="heading-bar__title">
                <a
                  className="link"
                  href="#featured-categories"
                  title="DANH MỤC NỔI BẬT"
                >
                  DANH MỤC NỔI BẬT
                </a>
              </h2>
            </div>
            <div className="mt-2 text-center row flex-nowrap collections-slide slick-initialized slick-slider">
              <div aria-live="polite" className="slick-list draggable">
                <div
                  className="slick-track"
                  style={{
                    opacity: 1,
                    width: "1278px",
                    transform: "translate3d(0px, 0px, 0px)",
                  }}
                  role="listbox"
                >
                  <div
                    className="item slick-slide slick-current slick-active"
                    data-slick-index={0}
                    aria-hidden="false"
                    style={{ width: "213px" }}
                    tabIndex={-1}
                    role="option"
                    aria-describedby="slick-slide30"
                  >
                    <a
                      href="https://becareskin.com/danh-muc/cham-soc-da-mat"
                      title="Chăm sóc da mặt"
                      className="pos-relative d-flex align-items-center"
                      tabIndex={0}
                    >
                      <img
                        className="img-fluid m-auto object-contain mh-100"
                        src="https://becareskin.com/wp-content/uploads/2021/12/icon_cham-soc-da-mat-1.png"
                        width={120}
                        height={120}
                        alt="Chăm sóc da mặt"
                      />
                    </a>
                    <h3 className="mb-0">
                      <a
                        href="https://becareskin.com/danh-muc/cham-soc-da-mat"
                        title="Chăm sóc da mặt"
                        tabIndex={0}
                      >
                        Chăm sóc da mặt
                      </a>
                    </h3>
                  </div>
                  <div
                    className="item slick-slide slick-active"
                    data-slick-index={1}
                    aria-hidden="false"
                    style={{ width: "213px" }}
                    tabIndex={-1}
                    role="option"
                    aria-describedby="slick-slide31"
                  >
                    <a
                      href="https://becareskin.com/danh-muc/cham-soc-co-the"
                      title="Chăm sóc cơ thể"
                      className="pos-relative d-flex align-items-center"
                      tabIndex={0}
                    >
                      <img
                        className="img-fluid m-auto object-contain mh-100"
                        src="https://becareskin.com/wp-content/uploads/2021/12/icon_cham-soc-da-toan-than-1.png"
                        width={120}
                        height={120}
                        alt="Chăm sóc cơ thể"
                      />
                    </a>
                    <h3 className="mb-0">
                      <a
                        href="https://becareskin.com/danh-muc/cham-soc-co-the"
                        title="Chăm sóc cơ thể"
                        tabIndex={0}
                      >
                        Chăm sóc cơ thể
                      </a>
                    </h3>
                  </div>
                  <div
                    className="item slick-slide slick-active"
                    data-slick-index={2}
                    aria-hidden="false"
                    style={{ width: "213px" }}
                    tabIndex={-1}
                    role="option"
                    aria-describedby="slick-slide32"
                  >
                    <a
                      href="https://becareskin.com/danh-muc/thuc-pham-chuc-nang"
                      title="Thực phẩm chức năng"
                      className="pos-relative d-flex align-items-center"
                      tabIndex={0}
                    >
                      <img
                        className="img-fluid m-auto object-contain mh-100"
                        src="https://becareskin.com/wp-content/uploads/2021/12/3501376.png"
                        width={120}
                        height={120}
                        alt="Thực phẩm chức năng"
                      />
                    </a>
                    <h3 className="mb-0">
                      <a
                        href="https://becareskin.com/danh-muc/thuc-pham-chuc-nang"
                        title="Thực phẩm chức năng"
                        tabIndex={0}
                      >
                        Thực phẩm chức năng
                      </a>
                    </h3>
                  </div>
                  <div
                    className="item slick-slide slick-active"
                    data-slick-index={3}
                    aria-hidden="false"
                    style={{ width: "213px" }}
                    tabIndex={-1}
                    role="option"
                    aria-describedby="slick-slide33"
                  >
                    <a
                      href="https://becareskin.com/danh-muc/cham-soc-toc"
                      title="Chăm sóc tóc"
                      className="pos-relative d-flex align-items-center"
                      tabIndex={0}
                    >
                      <img
                        className="img-fluid m-auto object-contain mh-100"
                        src="https://becareskin.com/wp-content/uploads/2021/12/icon_cham-soc-toc-1.png"
                        width={120}
                        height={120}
                        alt="Chăm sóc tóc"
                      />
                    </a>
                    <h3 className="mb-0">
                      <a
                        href="https://becareskin.com/danh-muc/cham-soc-toc"
                        title="Chăm sóc tóc"
                        tabIndex={0}
                      >
                        Chăm sóc tóc
                      </a>
                    </h3>
                  </div>
                  <div
                    className="item slick-slide slick-active"
                    data-slick-index={4}
                    aria-hidden="false"
                    style={{ width: "213px" }}
                    tabIndex={-1}
                    role="option"
                    aria-describedby="slick-slide34"
                  >
                    <a
                      href="https://becareskin.com/danh-muc/trang-diem"
                      title="Trang điểm"
                      className="pos-relative d-flex align-items-center"
                      tabIndex={0}
                    >
                      <img
                        className="img-fluid m-auto object-contain mh-100"
                        src="https://becareskin.com/wp-content/uploads/2021/12/icon_trang-diem-1.png"
                        width={120}
                        height={120}
                        alt="Trang điểm"
                      />
                    </a>
                    <h3 className="mb-0">
                      <a
                        href="https://becareskin.com/danh-muc/trang-diem"
                        title="Trang điểm"
                        tabIndex={0}
                      >
                        Trang điểm
                      </a>
                    </h3>
                  </div>
                  <div
                    className="item slick-slide slick-active"
                    data-slick-index={5}
                    aria-hidden="false"
                    style={{ width: "213px" }}
                    tabIndex={-1}
                    role="option"
                    aria-describedby="slick-slide35"
                  >
                    <a
                      href="https://becareskin.com/danh-muc/nuoc-hoa"
                      title="Nước hoa"
                      className="pos-relative d-flex align-items-center"
                      tabIndex={0}
                    >
                      <img
                        className="img-fluid m-auto object-contain mh-100"
                        src="https://becareskin.com/wp-content/uploads/2021/12/icon_nuoc-hoa-1.png"
                        width={120}
                        height={120}
                        alt="Nước hoa"
                      />
                    </a>
                    <h3 className="mb-0">
                      <a
                        href="https://becareskin.com/danh-muc/nuoc-hoa"
                        title="Nước hoa"
                        tabIndex={0}
                      >
                        Nước hoa
                      </a>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
      </div>
  );
}
