import ProductCombo from "./ProductCombo";
import Slider from "react-slick";
import { formatPrice } from "../../../helper";
import { cartActions } from "../../../actions/cartActions";
import { useDispatch } from "react-redux";
export default function ComboCard(props) {
  const { name, value, type, products, end, set_limit_amount } = props;
  var settings = {
    infinite: products.length > 4,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          infinite: products.length > 2,
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          infinite: products.length > 4,
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          infinite: products.length > 5,
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const dispatch = useDispatch();

  function handleBuyNow(products) {
    products.forEach((product) => {
      dispatch(
        cartActions.addCart(
          {
            product_id: product.product.id,
            quantity: 1,
            distributes: [],
          },
          true
        )
      );
    });
    setTimeout(() => {
      window.location.href = "/gio-hang";
    }, 3000);
  }
  console.log(products, "aaa");
  return (
    <div className="combo-card">
      <button
        className="info-btn buy-now-btn"
        onClick={() => handleBuyNow(products)}
      >
        Mua ngay
      </button>
      <button className="info-btn">Combo</button>
      <div className="top">
        <div className="name">
          <div>{name}</div>
        </div>
        <div className="info">
          <div>
            <div className="value">
              Giảm {type === 1 ? value + "%" : "₫" + formatPrice(value)}
            </div>
            <div className="date">HSD: {end.split(" ")[0]}</div>
            {set_limit_amount == false ? (
              <div className="note">Số lượng không giới hạn</div>
            ) : (
              <div className="note">Số lượng có hạn</div>
            )}
          </div>
          <div className="note">Áp dụng khi mua combo sản phẩm bên dưới</div>
        </div>
      </div>
      <div className="products">
        <Slider {...settings}>
          {products.map((v, i) => (
            <div className="card-wraper" key={i}>
              <ProductCombo product={v.product} quantity={v.quantity} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
