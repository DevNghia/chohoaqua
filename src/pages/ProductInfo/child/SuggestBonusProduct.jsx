import React from "react";
import { useSelector } from "react-redux";
import "./style.css";
import { formatPrice } from "../../../helper";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default function SuggestBonusProduct({ idMainProduct }) {
  const bonusProducts = useSelector((state) => state.bonusProduct.list.data);

  const itemProduct = (product, isBonus = false) => {
    const { id, name, images, price } = product;
    return (
      <div className="product-sub-item" key={id}>
        <Link to={`/san-pham/${id}`}>
          <img
            src={images[0]?.image_url || "/img/default_product.jpg"}
            alt=""
          />
        </Link>
        {isBonus ? (
          <p className="product-bonus">Quà tặng</p>
        ) : (
          <p className="product-price">{formatPrice(price)}</p>
        )}
        <Link to={`/san-pham/${id}`}>
          <p className="product-name">{name}</p>
        </Link>
      </div>
    );
  };

  const hasPromotions = () => {
    let check = false;
    bonusProducts.forEach((promotions) => {
      const { select_products, bonus_products_ladder, ladder_reward } =
        promotions;
      if (ladder_reward) {
        bonus_products_ladder.forEach((item) => {
          if (item.product_id === idMainProduct) {
            check = true;
          }
        });
      }
      select_products.forEach((item) => {
        if (item.product_id === idMainProduct) {
          check = true;
        }
      });
    });
    return check;
  };

  const renderLadderList = (promotions) => {
    const { bonus_products_ladder } = promotions;
    if (!bonus_products_ladder && !bonus_products_ladder.length) return null;

    return bonus_products_ladder.map((item) => {
      const { bo_product, from_quantity, bo_quantity, product_id } = item;
      if (product_id !== idMainProduct) return null;
      return (
        <div
          key={item}
          className="ladder-content"
          style={{ fontSize: "16px", margin: "4px 0" }}
        >
          Mua {from_quantity} sản phẩm trên để được tặng {bo_quantity}
          <Link to={`/san-pham/${bo_product.id}`}>
            <span className="link-to-product text-decoration underline">
              {bo_product.name}
            </span>
          </Link>
        </div>
      );
    });
  };

  const renderNonLadderList = (promotions) => {
    var { bonus_products, select_products, ladder_reward } = promotions;
    var arrGroup = [];
    //tìm sp có cùng group id với sp chính
    select_products.forEach((item) => {
      if (item.product.id == idMainProduct) {
        arrGroup.push(item.group_product);
      }
    });

    bonus_products = bonus_products.filter((item) =>
      arrGroup.includes(item.group_product)
    );
    select_products = select_products.filter((item) =>
      arrGroup.includes(item.group_product)
    );

    const listSelectProducts = select_products.filter(
      (item) => item.product.id !== idMainProduct
    );

    if (ladder_reward) return null;
    if(bonus_products.length == 0) return null;
    if (!listSelectProducts.length ) {
      return (
        <div className="promotion-item" key={promotions}>
     
            <div>
            <p className="title">Được tặng:</p>
            <div className="item-list">
              {bonus_products.map((item) => itemProduct(item.product, true))}
            </div>
          </div>
          
        </div>
      );
    }
    return (
      <div className="promotion-item" key={promotions}>
        <div>
          <p className="title">Mua thêm:</p>
          <div className="item-list">
            {listSelectProducts.map((item, index) => {
              if (index > 2) return null;
              return itemProduct(item.product);
            })}
          </div>
        </div>
        <div>
          <p className="title">Để được tặng:</p>
          <div className="item-list">
            {bonus_products.map((item, index) => {
              if (index > 2) return null;
              return itemProduct(item.product, true);
            })}
          </div>
        </div>
      </div>
    );
  };

  const renderPromotions = (promotions) => {
    return (
      <div key={promotions}>
        {renderNonLadderList(promotions)}
        {renderLadderList(promotions)}
      </div>
    );
  };

  return (
    <div className="suggest-product">
      <div className="title">
        <img src="/img/gift-48.png" alt="" /> Chương trình khuyến mãi:
      </div>
      {hasPromotions() ? (
        bonusProducts.map((item) => renderPromotions(item))
      ) : (
        <span>Hiện sản phẩm này chưa có chương trình khuyến mãi</span>
      )}
    </div>
  );
}
