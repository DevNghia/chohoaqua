import ProductCard from "../../../components/ProductCard";
import Slider from "react-slick";
import { useEffect, useState } from "react";
export default function ProductSection(props) {
  const [firstLine, setFirstLine] = useState(props.products);
  const [secondLine, setSecondLine] = useState([]);
  var settings1 = {
    infinite: false,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        }
      },
    ]
  };
  var settings2 = {
    infinite: props.products.length > 5,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          infinite: props.products.length > 2,
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          infinite: props.products.length > 3,
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 992,
        settings: {
          infinite: props.products.length > 4,
          slidesToShow: 4,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 1500,
        settings: {
          infinite: props.products.length > 4,
          slidesToShow: 5,
          slidesToScroll: 1,
        }
      },
    ]
  };
  useEffect(() => {
    const width = window.innerWidth;
    if (
      width < 600 &&
      props.products.length > 4
    ) {
      let firstArr = props.products.slice(0, 2);
      let secondArr = props.products.slice(2);
      setFirstLine(firstArr);
      setSecondLine(secondArr);
    }
    if (
      width >= 600 &&
      width < 768 &&
      props.products.length > 6
    ) {
      let firstArr = props.products.slice(0, 3);
      let secondArr = props.products.slice(3);
      setFirstLine(firstArr);
      setSecondLine(secondArr);
    }
    if (
      width >= 768 &&
      width < 992 &&
      props.products.length > 8
    ) {
      let firstArr = props.products.slice(0, 4);
      let secondArr = props.products.slice(4);
      setFirstLine(firstArr);
      setSecondLine(secondArr);
    }
    if (
      width >= 992 &&
      width < 1500 &&
      props.products.length > 10
    ) {
      let firstArr = props.products.slice(0, 5);
      let secondArr = props.products.slice(5);
      setFirstLine(firstArr);
      setSecondLine(secondArr);
    }
    if (
      width >= 1500 &&
      props.products.length > 12
    ) {
      let firstArr = props.products.slice(0, 6);
      let secondArr = props.products.slice(6);
      setFirstLine(firstArr);
      setSecondLine(secondArr);
    }
  }, [])
  return (
    <div className="product-section">
      <h3>{props.title}</h3>
      <Slider {...settings1}>
        {
          firstLine.map((v, i) =>
            <div className="card-container" key={i}>
              <ProductCard
                key={i}
                product={v}
              />
            </div>
          )
        }
      </Slider>
      <Slider {...settings2}>
        {
          secondLine.map((v, i) =>
            <div className="card-container" key={i}>
              <ProductCard
                key={i}
                product={v}
              />
            </div>
          )
        }
      </Slider>
    </div>
  )
}