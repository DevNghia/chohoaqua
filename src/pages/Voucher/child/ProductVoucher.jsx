import styled from 'styled-components';
import { formatPriceOrContact } from '../../../helper';
import { useSelector } from 'react-redux';

const DiscountProductCard = styled.div`
  width: 100%;
  border-radius: 8px;
  height: 220px;
  border: 1px solid #d1c5c5;
  overflow: hidden;
  cursor: pointer;
  .product-image {
    height: 75%;
    @media screen and (max-width: 767.8px) {
      height: 65%;
    }
    &__img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    @media screen and (min-width: 768px) and (max-width: 992px) {
      height: 70%;
    }
  }
  .product-info {
    height: 25%;
    margin-top: 5px;
    margin-left: 8px;
    &_price {
      color: #ee4d2d;
      font-size: 13px;
      font-weight: 500;
      line-height: 22px;
    }
    &_name {
      word-break: break-all;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding-right: 4px;
      color: grey;
    }
    @media screen and (max-width: 767.8px) {
      height: 35%;
      margin-top: 4px;
      margin-left: 4px;
      &_price {
        color: #ee4d2d;
        font-size: 12px;
        font-weight: 500;
        line-height: 14px;
      }
      &_name {
        font-size: 12px;
      }
    }
  }
  @media screen and (min-width: 768px) and (max-width: 992px) {
    height: 170px;
    margin-right: 0;
  }
  @media screen and (max-width: 767.8px) {
    height: 130px;
    margin-right: 0;
  }
`;

export default function ProductVoucher(props) {
  const appTheme = useSelector((state) => state.app.appTheme);
  let { price, product_discount, images, id, min_price, max_price, name } = props.product;
  let avt = '/img/default_product.jpg';

  let discount_percent = null;
  let discount = 0;

  if (product_discount) {
    discount_percent = product_discount.value;
    discount = product_discount.discount_price;
  }
  if (images?.length) avt = images[0].image_url;
  function handleClick() {
    window.location.href = `/san-pham/${id}`;
  }
  return (
    <DiscountProductCard onClick={handleClick}>
      <div className="product-image">
        <img src={avt} className="product-image__img" alt="ảnh sản phẩm" />
      </div>
      <div className="product-info">
        {min_price === max_price ? (
          <div className="product-info_price" style={{ color: appTheme.color_main_1 }}>
            {formatPriceOrContact(
              discount_percent == null ? min_price : min_price - min_price * discount_percent * 0.01,
            )}
          </div>
        ) : (
          <div className="product-info_price" style={{ color: appTheme.color_main_1 }}>
            {formatPriceOrContact(
              discount_percent == null ? min_price : min_price - min_price * discount_percent * 0.01,
            )}
            {' - '}

            {formatPriceOrContact(
              discount_percent == null ? max_price : max_price - max_price * discount_percent * 0.01,
            )}
          </div>
        )}
        <div className="product-info_name">{name}</div>
      </div>
    </DiscountProductCard>
  );
}
