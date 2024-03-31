import { useSelector } from "react-redux";
import styled from "styled-components";

const DiscountProductStyles = styled.div`
  position: absolute;
  z-index: 1;
  left: 2px;
  bottom: 0;
  .product__discountContent {
    display: flex;
    align-items: center;
    column-gap: 5px;
    border-radius: 25px;
    padding-right: 8px;
    span {
      font-size: 12px;
      color: white;
    }
  }
`;
const DiscountProduct = (props) => {
  const appTheme = useSelector((state) => state.app.appTheme);
  console.log(props.hasInCombo, "sdad");
  var textBonus = "Khuyến mãi";
  if (props.hasInCombo) {
    textBonus = "Combo";
  } else if (props.hasInBonusProduct) {
    textBonus = "Thưởng sản phẩm";
  } else if (props.hasInProductDiscount) {
    textBonus = "Giảm giá";
  }
  return (
    <DiscountProductStyles className="product__discount">
      <div
        className="product__discountContent"
        style={{
          backgroundColor: appTheme.color_main_1,
        }}
      >
        <img
          style={{
            width: "25px",
            height: "25px",
          }}
          alt={textBonus}
          src="https://cdn.tgdd.vn/2020/10/content/icon1-50x50.png"
        ></img>
        <span>{textBonus}</span>
      </div>
    </DiscountProductStyles>
  );
};

export default DiscountProduct;
