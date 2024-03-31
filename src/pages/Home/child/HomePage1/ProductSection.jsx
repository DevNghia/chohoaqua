import ProductCard from "../../../components/ProductCard";
import Slider from "react-slick";
export default function ProductSection(props) {
  var settings = {
    infinite: false,
    slidesToShow: 5,
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
    ]
  };
  return (
    <div className="product-section">
      <h3>{props.title}</h3>
      <Slider {...settings}>
        {
          props.products.map((v, i) =>
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