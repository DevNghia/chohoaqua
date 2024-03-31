// import ProductCard from "../../../components/ProductCard";
import Slider from "react-slick";
import React, { useEffect, useState , useRef } from "react";
import { useSelector } from "react-redux";
import ItemProduct from "./ItemProduct";
export default function ProductSection(props) {
  const [firstLine, setFirstLine] = useState(props.products);
  const [secondLine, setSecondLine] = useState([]);
  const appTheme = useSelector((state) => state.app.appTheme);

  var bannerSettings = {
    infinite: false,
    slidesToShow: 1 ,
    slidesToScroll: 1,

  };
  var settings1 = {


    infinite: false,
    slidesToShow: 4,
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
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        }
      },
    ]
  };
  var settings2 = {
   
    infinite: false,
    slidesToShow: 4,
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
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 4,
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
      props.products.length > 4
    ) {
      let firstArr = props.products.slice(0, 2);
      let secondArr = props.products.slice(2);
      setFirstLine(firstArr);
      setSecondLine(secondArr);
    }
    if (
      width >= 768 &&
      width < 992 &&
      props.products.length > 4
    ) {
      let firstArr = props.products.slice(0, 3);
      let secondArr = props.products.slice(3);
      setFirstLine(firstArr);
      setSecondLine(secondArr);
    }
    if (
      width >= 992 &&
      width < 1500 &&
      props.products.length > 4
    ) {
      let firstArr = props.products.slice(0, 4);
      let secondArr = props.products.slice(4);
      setFirstLine(firstArr);
      setSecondLine(secondArr);
    }
    if (
      width >= 1500 &&
      props.products.length > 4
    ) {
      let firstArr = props.products.slice(0, 4);
      let secondArr = props.products.slice(4);
      setFirstLine(firstArr);
      setSecondLine(secondArr);
    }
  }, [])

  function showBanner(i,v)
  {
    var arr = []
    if(i==0)
    {
      arr.push(
        <div className="product-deal-image" style = {{height : "100%"}}>
        <img style = {{height : "100%" , objectFit : "cover"}}   src={v.image_url} />
      </div>
      )
    }
    return arr.length == 0 ? null : arr
  }

  return (


    <section className="home-2 section">
    <div className="container">
      <div className="row">
        <div className="col-lg-4 Module Module-1290 hidden-mobile ">
          <div className="ModuleContent">
            <div style={{borderColor: appTheme.color_main_1}} className="product-deal-wrapper product-deal-no-slider hidden-mobile">
              {props.banners_ads.length > 0 ?  <React.Fragment>
              {props.banners_ads.map((v, i) => {
                    return showBanner(i,v)
     
})}
            </React.Fragment> : null}
           
           
            </div>
          </div>
        </div>
        <div className="col-lg-8 Module Module-228">
          <div className="ModuleContent">
            <div className="product-promo-wrapper">
              <div className="product-promo-heading">
                <h2 className="section-title text-blue">
                  {props.title}
                </h2>
              </div>
              <div className="product-list">
                <div className="swiper-container">
                  <div className="">
                  <Slider {...settings1}>
        {
          firstLine.map((v, i) =>
            <ItemProduct product = {v}/>
          )
        }
      </Slider>
                   
                  </div>
                </div>
              </div>
              <div className="product-list">
                <div className="swiper-container">
                  <div className="">
                  <Slider {...settings2}>
        {
          secondLine.map((v, i) =>
          <ItemProduct product = {v}/>

          )
        }
      </Slider>
                  
                  
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>





    // <div className="product-section">
    //   <h3>{props.title}</h3>
    //   <Slider {...settings1}>
    //     {
    //       firstLine.map((v, i) =>
    //         <div className="card-container" key={i}>
    //           <ProductCard
    //             key={i}
    //             product={v}
    //           />
    //         </div>
    //       )
    //     }
    //   </Slider>
    //   <Slider {...settings2}>
    //     {
    //       secondLine.map((v, i) =>
    //         <div className="card-container" key={i}>
    //           <ProductCard
    //             key={i}
    //             product={v}
    //           />
    //         </div>
    //       )
    //     }
    //   </Slider>
    // </div>
  )
}