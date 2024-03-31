import ProductCombo from "./ProductBonusLadder";
import Slider from "react-slick";
import { formatPrice } from "../../../helper";
import { cartActions } from "../../../actions/cartActions";
import { useDispatch } from "react-redux";
import moment from "moment";
export default function BonusLadderCard(props) {
  var {
    discount_type,
    value_discount,
    start_time,
    end_time,
    amount,
    bonus_products_ladder,
    value_limit_total,
  } = props.bonusProductLadder;
  const { name } = props;

  console.log(props.bonusProductLadder, "ttt");

  console.log(props.bonusProductLadder);
  var select_products = bonus_products_ladder[0]?.product;
  var select_name = null;
  if (select_products) {
    select_name = select_products.name;
    select_products = [select_products];
  }

  var products = [];
  var productsBonus = [];
  console.log(select_products);
  if (select_products?.length > 0) {
    select_products.forEach((element) => {
      products.push(element);
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

  if (bonus_products_ladder?.length > 0) {
    bonus_products_ladder.forEach((element) => {
      productsBonus.push({
        ...element.bo_product,
        from_quantity: element.from_quantity,
        bo_quantity: element.bo_quantity,
      });
    });
  }
  var value_discount =
    discount_type == 0 ? formatPrice(value_discount) : value_discount + "%";
  var startTime = moment(start_time).format("DD-MM-YYYY");
  var endTime = moment(end_time).format("DD-MM-YYYY");
  var amountbonusProductLadder = amount;
  var valueLimitTotal = formatPrice(value_limit_total);
  var nameListProduct = " ";
  if (products?.length > 0) {
    products.forEach((element, index) => {
      if (index == products.length - 1) nameListProduct = " " + element.name;
      else nameListProduct = nameListProduct + ", " + element.name;
    });
  }

  const dispatch = useDispatch();

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

  var nameListProductBonus = "";

  var nameListProductBonus = [];
  console.log(productsBonus, select_name);
  if (productsBonus?.length > 0 && select_name !== null) {
    productsBonus.forEach((element, index) => {
      console.log(element);
      if (index == productsBonus.length - 1)
        nameListProductBonus.push(
          <div style={{ marginTop: "8px" }}>
            -{" "}
            {`Mua ${element.from_quantity} sản phẩm ${select_name} - Tặng  ${element.bo_quantity}` +
              " " +
              element.name +
              ","}
          </div>
        );
      else
        nameListProductBonus.push(
          <div style={{ marginTop: "8px" }}>
            -{" "}
            {`Mua ${element.from_quantity} sản phẩm ${select_name} - Tặng ${element.bo_quantity}` +
              " " +
              element.name +
              ","}
          </div>
        );
    });
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

            <div className="note">Ưu đãi: {nameListProductBonus}</div>
          </div>
          <div className="note">Áp dụng khi mua các sản phẩm bên dưới</div>
        </div>
      </div>
      <div className="products">
        <Slider {...settings}>
          {products.map((v, i) => (
            <div className="card-wraper" key={i}>
              <ProductCombo product={v} quantity={v.quantity} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
