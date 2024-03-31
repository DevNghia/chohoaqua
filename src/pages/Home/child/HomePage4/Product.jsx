import Slider from "react-slick";
import { useEffect, useState, useRef } from "react";


import { useSelector } from "react-redux";
import ItemProduct from "./ItemProduct";
export default function HomeBanner(props) {
  const { banners, categories, discountProducts } = props;
  const appTheme = useSelector((state) => state.app.appTheme);
  const [firstLine, setFirstLine] = useState(props.products);
  const [secondLine, setSecondLine] = useState([]);
  var settings1 = {
    infinite: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
    ],
  };
  var settings2 = {
    infinite: props.products.length > 4,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          infinite: props.products.length > 2,
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          infinite: props.products.length > 3,
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          infinite: props.products.length > 4,
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          infinite: props.products.length > 4,
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
    ],
  };
  useEffect(() => {
    const width = window.innerWidth;
    if (width < 600 && props.products.length > 4) {
      let firstArr = props.products.slice(0, 2);
      let secondArr = props.products.slice(2);
      setFirstLine(firstArr);
      setSecondLine(secondArr);
    }
    if (width >= 600 && width < 768 && props.products.length > 6) {
      let firstArr = props.products.slice(0, 3);
      let secondArr = props.products.slice(3);
      setFirstLine(firstArr);
      setSecondLine(secondArr);
    }
    if (width >= 768 && width < 992 && props.products.length > 8) {
      let firstArr = props.products.slice(0, 4);
      let secondArr = props.products.slice(4);
      setFirstLine(firstArr);
      setSecondLine(secondArr);
    }
    if (width >= 992 && width < 1400 && props.products.length > 10) {
      let firstArr = props.products.slice(0, 4);
      let secondArr = props.products.slice(4);
      setFirstLine(firstArr);
      setSecondLine(secondArr);
    }
    if (width >= 1400 && props.products.length > 10) {
      let firstArr = props.products.slice(0, 5);
      let secondArr = props.products.slice(5);
      setFirstLine(firstArr);
      setSecondLine(secondArr);
    }
  }, []);

  function handleCateClick(id) {
    window.location.href = `/san-pham?danh-muc-ids=${id}`;
  }
  return (
    <section className="section_product_new" style={{ "margin-top": props.style ? "100px" : "20px" }}>
      <div className="container">
        <h2 className="title-block">
          {props.title}
        </h2>
        <div className="container">
          <Slider {...settings1}>
            {firstLine.map((v, i) => (
              <ItemProduct key={i} product={v} />
            ))}
          </Slider>
        </div>
        <div className="container" style = {{marginTop : "10px"}}> 
          <Slider {...settings2}>
            {secondLine.map((v, i) => (
              <ItemProduct key={i} product={v} />
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}
