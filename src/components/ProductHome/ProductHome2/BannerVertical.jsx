import Slider from "react-slick";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
export default function HomeBanner(props) {
  const appTheme = useSelector((state) => state.app.appTheme);
  const { banners, discountProducts } = props;

  return (
    <div className="" style={{ marginTop: "14px" }}>
      {banners.map((v, i) => (
        <a href={v.link_to == null ? "#" : v.link_to}>
          <img
            style={{
              height: "450px",
              width: "100%",
              objectFit: "cover",
            }}
            src={v.image_url}
            alt={v.title}
          />
        </a>
      ))}
    </div>
  );
}
