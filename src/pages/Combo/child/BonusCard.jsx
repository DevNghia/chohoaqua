import ProductCombo from "./ProductBonus";
import Slider from "react-slick";
import { formatPrice } from "../../../helper";
import { cartActions } from "../../../actions/cartActions";
import { useDispatch } from "react-redux";
import moment from "moment";
export default function BonusCard(props) {
  var {
    discount_type,
    value_discount,
    start_time,
    end_time,
    amount,
    bonus_products,
    value_limit_total,
    select_products,
  } = props.bonusProduct;

  const { name } = props;
  const dispatch = useDispatch();

  var products = [];
  var productsBonus = [];

  if (select_products?.length > 0) {
    select_products.forEach((element) => {
      products.push(element.product);
    });
  }

  if (bonus_products?.length > 0) {
    bonus_products.forEach((element) => {
      productsBonus.push(element.product);
    });
  }

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

  var value_discount =
    discount_type == 0 ? formatPrice(value_discount) : value_discount + "%";
  var startTime = moment(start_time).format("DD-MM-YYYY");
  var endTime = moment(end_time).format("DD-MM-YYYY");
  var amountbonusProduct = amount;
  var valueLimitTotal = formatPrice(value_limit_total);
  var nameListProduct = " ";
  if (products?.length > 0) {
    products.forEach((element, index) => {
      if (index == products.length - 1)
        nameListProduct = nameListProduct + ", " + element.name + ", vv...";
      else nameListProduct = nameListProduct + ", " + element.name;
    });
  }

  var nameListProductBonus = " ";
  if (productsBonus?.length > 0) {
    productsBonus.forEach((element, index) => {
      if (index == productsBonus.length - 1)
        nameListProductBonus =
          nameListProductBonus + ", " + element.name + ", vv...";
      else nameListProductBonus = nameListProductBonus + ", " + element.name;
    });
  }
  function handleBuyNow(products) {
    products.forEach((product) => {
      dispatch(
        cartActions.addCart(
          {
            product_id: product.id,
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

  console.log(products);

  return (
    <div className="combo-card">
      <button
        className="info-btn buy-now-btn"
        style={{ right: "141px" }}
        onClick={() => handleBuyNow(products)}
      >
        Mua ngay
      </button>
      <button className="info-btn">Thưởng sản phẩm</button>
      <div className="top">
        <div className="name">
          <div>{name}</div>
        </div>
        <div className="info">
          <div>
            <div className="date">HSD: {endTime}</div>
            {amount ? (
              <div className="note">Số lượng có hạn: {amount}</div>
            ) : (
              <div className="note">Số lượng không giới hạn {amount}</div>
            )}
            <div className="note">
              Thưởng các sản phẩm sau: {nameListProductBonus}
            </div>
          </div>
          <div className="note">Áp dụng khi mua các sản phẩm bên dưới</div>
        </div>
      </div>
      <div className="products">
        <Slider {...settings}>
          {products.map((v, i) => (
            <div className="card-wraper" key={i}>
              <ProductCombo
                product={v}
                quantity={select_products[i].quantity}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
