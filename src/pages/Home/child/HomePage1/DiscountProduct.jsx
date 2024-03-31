import { useSelector } from "react-redux";
import { formatPrice } from "../../../helper"
export default function DiscountProduct(props) {
  const { product_discount, price, images, id, slug } = props.product;
  const appTheme = useSelector(state => state.app.appTheme);
  let avt = images.length > 0 ? images[0].image_url : "/img/default_product.jpg";
  function handleClick() {
    window.location.href = `/san-pham/${slug}-${id}`;
  }
  return (
    <div className="discount-product-card" onClick={handleClick}>
      <div className="image">
        <div className="img-container">
          <img src={avt} alt="" />
        </div>
      </div>
      <div className="price" style={{ color: appTheme.color_main_1 }}>
        {formatPrice(product_discount == null || product_discount.discount_price == null ? 0 : product_discount.discount_price)}
      </div>
      <div className="prev-price">
        {formatPrice(min_price)}
      </div>
    </div>
  )
}