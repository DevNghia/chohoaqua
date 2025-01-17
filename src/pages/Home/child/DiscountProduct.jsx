import { useSelector } from "react-redux";
import { formatPrice, formatPriceOrContact } from "../../../helper";
export default function DiscountProduct(props) {
  const { product_discount, price, images, id, name, slug, min_price } =
    props.product;
  console.log("DiscountProduct ~ props.product", props.product);
  const appTheme = useSelector((state) => state.app.appTheme);
  let avt =
    images.length > 0 ? images[0].image_url : "/img/default_product.jpg";
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
        {formatPrice(product_discount?.discount_price ?? 0)}
      </div>
      <div
        class={`prev-price ${
          product_discount == null ||
          product_discount == 0 ||
          formatPriceOrContact(min_price) == "Liên hệ"
            ? "hide"
            : ""
        }`}
      >
        {formatPriceOrContact(min_price)}
      </div>
      {/* <div className="prev-price">
        {formatPrice(price)}
      </div> */}
    </div>
  );
}
