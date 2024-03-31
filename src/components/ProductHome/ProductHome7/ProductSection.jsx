import ProductCard from "../../ProductCard";
import Slider from "react-slick";
import { useEffect, useState } from "react";
import "./style.css";
import styled from "styled-components";
import { useSelector } from "react-redux";

const Product8Styles = styled.div`
  background: transparent !important;
  padding: 0 5px !important;
  .name-sale-list {
    height: 30px !important;
    width: 250px !important;
    margin-left: 0 !important;
  }
  .product-card {
    box-shadow: 0 0 6px 0 #afafaf;
  }
  @media screen and (max-width: 600px) {
    .slick-list {
      margin-top: 0 !important;
    }
  }
`;

export default function ProductSection(props) {
  const [firstLine, setFirstLine] = useState(props.products);
  const appTheme = useSelector((state) => state.app.appTheme);
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
        breakpoint: 1500,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
    ],
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
        breakpoint: 1500,
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
    if (width >= 992 && width < 1500 && props.products.length > 10) {
      let firstArr = props.products.slice(0, 5);
      let secondArr = props.products.slice(5);
      setFirstLine(firstArr);
      setSecondLine(secondArr);
    }
    if (width >= 1500 && props.products.length > 12) {
      let firstArr = props.products.slice(0, 5);
      let secondArr = props.products.slice(5);
      setFirstLine(firstArr);
      setSecondLine(secondArr);
    }
  }, []);
  return (
    <Product8Styles
      className="product-sections product8"
      style={{
        border: `1px solid ${appTheme.color_main_1}`,
      }}
    >
      <svg
        className="name-sale-list"
        style={{ padding: "0px" }}
        width="272.222"
        height="38.337"
        viewBox="0 0 272.222 38.337"
      >
        <path
          id="power-2"
          data-name="power"
          d="M8.315,0,0,17H8.315L2.772,34l19.4-21.25H11.087L19.4,0Z"
          transform="translate(2.3 0.5)"
          fill="#fedb00"
          stroke="#f3a306"
          stroke-width="1"
        ></path>
        <g
          id="Group_184"
          data-name="Group 184"
          transform="translate(-98.699 -620)"
        >
          <g id="Group_364" data-name="Group 364" transform="translate(-107 6)">
            <g
              id="Group_185"
              data-name="Group 185"
              transform="translate(134 10)"
            >
              <g
                transform="matrix(1, 0, 0, 1, 71.7, 604)"
                filter="url(#Path_1419)"
              >
                <path
                  id="Path_1419-2"
                  data-name="Path 1419"
                  d="M-38.372,0h-4.309l1.514-7.583H-47.3L-48.814,0h-4.335l3.765-18.84h4.335l-1.579,7.893h6.133l1.579-7.893h4.309Zm18.917-7.725a10.532,10.532,0,0,1-3.06,5.868A8.045,8.045,0,0,1-28.176.272a6.224,6.224,0,0,1-5.059-2.31,6.5,6.5,0,0,1-1.229-5.687l.686-3.39a10.7,10.7,0,0,1,3-5.875,7.853,7.853,0,0,1,5.6-2.122,6.358,6.358,0,0,1,5.111,2.323,6.438,6.438,0,0,1,1.294,5.674Zm-3.623-3.416a4.488,4.488,0,0,0-.382-3.338,2.633,2.633,0,0,0-2.387-1.268,2.732,2.732,0,0,0-2.31,1.255,8.575,8.575,0,0,0-1.313,3.351l-.686,3.416a4.769,4.769,0,0,0,.3,3.377A2.513,2.513,0,0,0-27.5-3.093a2.876,2.876,0,0,0,2.355-1.281,8.122,8.122,0,0,0,1.385-3.351Zm19.461-4.335h-4.49L-11.2,0h-4.335l3.093-15.476h-4.451l.673-3.364H-2.944ZM4.975-4.7a1.83,1.83,0,0,0-.323-1.714A8.106,8.106,0,0,0,2.465-7.686,11.971,11.971,0,0,1-2.109-10.3a4,4,0,0,1-1.016-3.817A5.512,5.512,0,0,1-.621-17.8a8.742,8.742,0,0,1,4.846-1.307,6.476,6.476,0,0,1,4.6,1.553,4.163,4.163,0,0,1,1.08,4.218l-.039.078H5.661a2.018,2.018,0,0,0-.375-1.812,2.193,2.193,0,0,0-1.734-.673,2.63,2.63,0,0,0-1.5.472,1.79,1.79,0,0,0-.828,1.132,1.481,1.481,0,0,0,.4,1.572,12.773,12.773,0,0,0,2.769,1.352A9.4,9.4,0,0,1,8.482-8.7a4.479,4.479,0,0,1,.8,3.979A5.516,5.516,0,0,1,6.8-.983,8.885,8.885,0,0,1,1.947.272,8.1,8.1,0,0,1-2.885-1.145Q-4.872-2.562-4.212-5.5l.026-.078H.019q-.3,1.423.524,1.954a3.759,3.759,0,0,0,2.077.531,2.735,2.735,0,0,0,1.495-.459A1.79,1.79,0,0,0,4.975-4.7ZM20.166-3.662h-5.2L13.269,0H8.935L18.29-18.84h4.632L24.76,0H20.412ZM16.517-7.026h3.429l-.414-6.3-.078-.013ZM31.009-3.364h7.44L37.777,0H26l3.765-18.84H34.1ZM52.2-8.061H45.463l-.932,4.7h7.958L51.816,0H39.524l3.765-18.84H55.607l-.673,3.364H46.951l-.815,4.05h6.741Z"
                  transform="translate(82.3 28)"
                  fill="#fb4700"
                ></path>
              </g>
              <path
                id="Path_1418"
                data-name="Path 1418"
                d="M-37.648,0h-4.228l1.485-7.439h-6.018L-47.893,0h-4.253l3.694-18.484H-44.2l-1.549,7.744h6.018l1.549-7.744h4.228Zm18.561-7.579a10.333,10.333,0,0,1-3,5.757A7.894,7.894,0,0,1-27.644.267,6.107,6.107,0,0,1-32.608-2a6.382,6.382,0,0,1-1.206-5.58l.673-3.326A10.494,10.494,0,0,1-30.2-16.669a7.7,7.7,0,0,1,5.5-2.082,6.238,6.238,0,0,1,5.015,2.279,6.316,6.316,0,0,1,1.27,5.567Zm-3.555-3.352a4.4,4.4,0,0,0-.375-3.275,2.583,2.583,0,0,0-2.342-1.244,2.68,2.68,0,0,0-2.266,1.231,8.413,8.413,0,0,0-1.289,3.288l-.673,3.352a4.679,4.679,0,0,0,.3,3.313,2.466,2.466,0,0,0,2.3,1.231,2.822,2.822,0,0,0,2.311-1.257,7.969,7.969,0,0,0,1.358-3.288Zm19.094-4.253H-7.954L-10.988,0h-4.253l3.034-15.184h-4.367l.66-3.3H-2.888ZM4.881-4.608a1.8,1.8,0,0,0-.317-1.682,7.953,7.953,0,0,0-2.146-1.25,11.745,11.745,0,0,1-4.488-2.564,3.923,3.923,0,0,1-1-3.745A5.408,5.408,0,0,1-.609-17.469a8.578,8.578,0,0,1,4.754-1.282,6.354,6.354,0,0,1,4.513,1.523,4.084,4.084,0,0,1,1.06,4.139l-.038.076H5.554a1.98,1.98,0,0,0-.368-1.777,2.151,2.151,0,0,0-1.7-.66,2.581,2.581,0,0,0-1.473.463A1.756,1.756,0,0,0,1.2-13.876a1.453,1.453,0,0,0,.394,1.542A12.532,12.532,0,0,0,4.31-11.007,9.226,9.226,0,0,1,8.322-8.538a4.394,4.394,0,0,1,.787,3.9A5.411,5.411,0,0,1,6.671-.965,8.717,8.717,0,0,1,1.911.267a7.952,7.952,0,0,1-4.742-1.39Q-4.78-2.514-4.132-5.4l.025-.076H.019q-.292,1.4.514,1.917a3.688,3.688,0,0,0,2.038.521,2.683,2.683,0,0,0,1.466-.451A1.756,1.756,0,0,0,4.881-4.608Zm14.9,1.016h-5.1L13.019,0H8.766l9.179-18.484H22.49L24.292,0H20.027Zm-3.58-3.3H19.57l-.406-6.183-.076-.013ZM30.424-3.3h7.3L37.064,0H25.511l3.694-18.484h4.253ZM51.219-7.909H44.6L43.691-3.3H51.5L50.838,0H38.778l3.694-18.484H54.558l-.66,3.3H46.065l-.8,3.974h6.614Z"
                transform="translate(154.5 631)"
                fill="#fedb00"
                stroke="#a71609"
                stroke-linecap="round"
                stroke-width="0.5"
              ></path>
            </g>
          </g>
          <g transform="matrix(1, 0, 0, 1, 98.7, 620)" filter="url(#power)">
            <path
              id="power-2"
              data-name="power"
              d="M8.315,0,0,17H8.315L2.772,34l19.4-21.25H11.087L19.4,0Z"
              transform="translate(2.3 0.5)"
              fill="#fedb00"
              stroke="#f3a306"
              stroke-width="1"
            ></path>
          </g>
        </g>
      </svg>
      <Slider {...settings1}>
        {firstLine.map((v, i) => (
          <div className="card-container" key={i}>
            <ProductCard key={i} product={v} />
          </div>
        ))}
      </Slider>
      <Slider {...settings2}>
        {secondLine.map((v, i) => (
          <div className="card-container" key={i}>
            <ProductCard key={i} product={v} />
          </div>
        ))}
      </Slider>
    </Product8Styles>
  );
}
