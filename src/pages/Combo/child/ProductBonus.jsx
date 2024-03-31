import { formatPrice } from "../../../helper";
import { useSelector } from "react-redux";
export default function ProductCombo(props) {
  console.log("ProductCombo ~ props", props);
  const appTheme = useSelector((state) => state.app.appTheme);
  let { price, product_discount, images, id, min_price, max_price } =
    props.product;

  let avt = "/img/default_product.jpg";
  if (product_discount) {
    price = product_discount.discount_price;
  }
  if (images.length) avt = images[0].image_url;
  function handleClick() {
    window.location.href = `/san-pham/${id}`;
  }
  return (
    <div className="discount-product-card" onClick={handleClick}>
      <div className="image">
        <div className="img-container">
          <img src={avt} alt="" />
        </div>
      </div>
      <div className="price" style={{ color: appTheme.color_main_1 }}>
        {min_price === max_price
          ? formatPrice(min_price)
          : `${formatPrice(min_price)} - ${formatPrice(max_price)}`}
      </div>
      <div className="prev-price">Số lượng: {props.quantity}</div>
    </div>
  );
}
