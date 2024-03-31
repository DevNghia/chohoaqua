import Slider from "react-slick";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
export default function HomeBanner(props) {
  const { banners, categories, discountProducts } = props;
  const appTheme = useSelector((state) => state.app.appTheme);

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
    <section className="awe-section-5">
      <div className="section_product product_1" id="product_1">
        <div
          className="block-product"
          style={{
            border: "1px solid #dcd4d4",
          }}
        >
          <div >
          <div>

          <h3 style={{
            background : "#3ba66b",
            "border-radius": "6px",
            padding : "7px"
          }}>
                <Link to="/san-pham" title="Trái cây" style={{padding : "16px"}}>
                  Danh mục
                </Link>
              </h3>
            <div className="title-links">
           
              <div className="btn-more-cate d-md-none"></div>
              <div className="block-cate">
                <ul>
                  {categories.length > 0
                    ? categories.map((v, i) => (
                        <li>
                          <div>
                  
                          <Link
                            title="Rau sạch"
                            to={`/san-pham?danh-muc=${v.slug}-${v.id}`}
                          >
                                        <img
                              style={{
                                width: "38px",

                                height: "38px",

                                "margin-right": "10px",
                              }}
                              src={v.image_url}
                              alt=""
                            />
                            {v.name}
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
      </div>
    </section>
  );
}
