import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatPrice } from "../../../helper";
import { constants as c } from "../../../constants";
import DistributeItem from "./DistributeItem";
import styled from "styled-components";
const CartStyles = styled.div`
  .btn-calculator {
    border-radius: 8px !important;
    button {
      cursor: pointer;
    }
  }
  .item-info {
    align-items: center;
    padding-left: 10px;
  }
  .delete-btn {
    cursor: pointer;
    padding-left: 10px;
  }
  .image {
    .img-container {
      border-radius: 10px;
      img {
        border-radius: 10px;
      }
    }
  }
  &.item-bonus {
    padding-left: 80px !important;
    .image {
      width: 66px !important;
    }
    .item__bonus {
      display: inline-block;
      font-size: 12px;
      color: #3498db;
      padding: 5px 8px;
      border-radius: 5px;
      background-color: rgba(52, 152, 219, 0.1);
      margin-right: 5px;
      margin-bottom: 2px;
    }
  }

  @media screen and (max-width: 400px) {
    .item-info {
    }
  }
`;
export default function CartItem(props) {
  var { is_bonus, allows_choose_distribute } = props;
  let {
    price,
    product_discount,
    quantity_in_stock,
    quantity_in_stock_with_distribute,
    images,
    id,
    name,
    distributes,
    check_inventory,
  } = props.product;
  quantity_in_stock =
    quantity_in_stock >= 0
      ? quantity_in_stock
      : quantity_in_stock === -1
      ? 999999
      : 0;
  let pastPrice = price;
  let avt = "/img/default_product.jpg";
  if (product_discount) price = product_discount.discount_price;
  if (images.length) avt = images[0].image_url;
  const [quantity, setQuantity] = useState(props.quantity);
  const [note, setNote] = useState(props.note);
  const [showNote, setShowNote] = useState(false);
  const oldDistribute = props.distributes_selected;
  const appTheme = useSelector((state) => state.app.appTheme);
  const cartInfo = useSelector((state) => state.cart.cartInfo);
  const badges = useSelector((state) => state.user.badges);
  const [newDistribute, setNewDistribute] = useState(
    props.distributes_selected && props.distributes_selected[0]
      ? props.distributes_selected[0].value
      : ""
  );

  const [newSubDistribute, setNewSubDistribute] = useState(
    props.distributes_selected && props.distributes_selected[0]
      ? props.distributes_selected[0].sub_element_distributes
      : ""
  );

  function handleChangeQuantity(e) {
    let q;
    if (e.target.value === "") {
      setQuantity("");
    } else if (e.target.value == "0") {
      q = 1;
      dispatch({
        type: c.CHANGE_POPUP,
        popupType: c.AUTOHIDE_POPUP,
        messageInfo: "Số lượng không hợp lệ",
      });
    } else {
      q = parseInt(e.target.value);

      var maxQuantity = quantity_in_stock_with_distribute;
      if (props.distributes_selected !== null) {
        maxQuantity = getMaxQuantity(
          props.distributes_selected[0]?.name,
          props.distributes_selected[0]?.value,
          props.distributes_selected[0]?.sub_element_distributes
        );
      }

      if (
        q > maxQuantity &&
        maxQuantity != -1 &&
        check_inventory == true &&
        !badges.allow_semi_negative
      ) {
        q = maxQuantity;

        dispatch({
          type: c.CHANGE_POPUP,
          popupType: c.AUTOHIDE_POPUP,
          messageInfo: "Đã vượt quá số lượng trong kho!",
        });
      }

      props.changeQuantity({
        line_item_id: props.line_item_id,
        product_id: id,
        quantity: q,
        distributes: props.distributes_selected,
        is_order_for_customer: props.is_order_for_customer,
      });
    }
    setQuantity(q);
  }

  function getMaxQuantity(distribute_name, ele, sub) {
    const distributes = props.product.distributes;

    if (distributes == null || distributes.length == 0) {
      return quantity_in_stock_with_distribute;
    }

    if (sub != null) {
      for (const eleItem of distributes[0].element_distributes) {
        if (eleItem.name == ele) {
          for (const su of eleItem.sub_element_distributes) {
            if (su.name == sub) {
              return su.quantity_in_stock;
            }
          }
        }
      }
    }

    if (ele != null) {
      for (const eleItem of distributes[0].element_distributes) {
        if (eleItem.name == ele) {
          return eleItem.quantity_in_stock;
        }
      }
    }
    return quantity_in_stock_with_distribute;
  }

  const dispatch = useDispatch();

  function handleIncrease() {
    props.setCheckBox(false);
    var maxQuantity = getMaxQuantity();

    if (props.distributes_selected !== null) {
      maxQuantity = getMaxQuantity(
        props.distributes_selected[0]?.name,
        props.distributes_selected[0]?.value,
        props.distributes_selected[0]?.sub_element_distributes
      );
    }
    if (
      maxQuantity == -1 ||
      quantity + 1 <= maxQuantity ||
      check_inventory == false ||
      badges.allow_semi_negative
    ) {
      props.changeQuantity({
        line_item_id: props.line_item_id,
        product_id: id,
        quantity: quantity + 1,
        distributes: props.distributes_selected,
        code_voucher: "",
        is_order_for_customer: props.is_order_for_customer,
      });
      setQuantity(quantity + 1);
    } else {
      dispatch({
        type: c.CHANGE_POPUP,
        popupType: c.AUTOHIDE_POPUP,
        messageInfo: "Đã vượt quá số lượng trong kho!",
      });
    }
  }
  //
  function handleDecrease() {
    props.setCheckBox(false);
    if (quantity - 1 >= 1) {
      props.changeQuantity({
        product_id: id,
        code_voucher: "",
        is_order_for_customer: props.is_order_for_customer,
        quantity: quantity - 1,
        line_item_id: props.line_item_id,
        distributes: props.distributes_selected,
      });
      setQuantity(quantity - 1);
    }
  }
  function handleRemoveItem() {
    props.changeQuantity({
      quantity: 0,
      product_id: id,
      code_voucher: "",
      is_order_for_customer: props.is_order_for_customer,
      line_item_id: props.line_item_id,
      distributes: props.distributes_selected,
    });
    setQuantity(0);
  }
  function handleChangeDistribute() {
    if (
      oldDistribute.value === newDistribute &&
      oldDistribute.sub_element_distributes === newSubDistribute
    )
      return;
    props.onShowDistribute();
    props.changeQuantity({
      line_item_id: props.line_item_id,
      product_id: id,
      is_order_for_customer: props.is_order_for_customer,
      quantity,
      distributes: [
        {
          name:
            props.distributes_selected[0]?.name ??
            props.product.distributes[0]?.name,
          value: newDistribute,
          sub_element_distributes: newSubDistribute,
        },
      ],
    });
  }
  function handleChangeNote(note) {
    setNote(note);
    setShowNote(true);
  }
  function handleChangeNoteInput(e) {
    const value = e.target.value;
    setNote(value);
  }
  function handleResetNote() {
    setShowNote(false);
    setNote("");
  }
  function handleUpdateNoteItem() {
    props.changeQuantity({
      line_item_id: props.line_item_id,
      product_id: id,
      quantity: props.quantity,
      distributes: props.distributes_selected,
      code_voucher: "",
      is_order_for_customer: props.is_order_for_customer,
      note: note,
    });
    setShowNote(false);
  }

  console.log(cartInfo, props.quantity, quantity);
  return (cartInfo.line_items ?? []).length === 0 ? (
    <div className="_1fP0AH _2tKeYb">
      <div className="_1g-4gk" />
      <div className="h9wsC4">Giỏ hàng của bạn còn trống!</div>
      <a className="_35zxc9" href="/">
        <button
          className="shopee-button-solid"
          style={{ background: appTheme.color_main_1 }}
        >
          <span className="_3SCpTT">MUA NGAY</span>
        </button>
      </a>
    </div>
  ) : (
    <CartStyles
      className={`cart-item ${is_bonus === true ? "item-bonus" : ""}`}
    >
      <div className="row">
        <div className="image">
          <div className="img-container">
            <img
              src={avt}
              alt="product1"
              style={{
                background: "url(../img/default_product.jpg)",
                backgroundSize: "contain",
              }}
            />
          </div>
        </div>
        <div className="item-info">
          <div
            style={{
              width: "35%",
            }}
          >
            <a href={"/san-pham/" + id} className="name">
              {is_bonus === true && (
                <span className="item__bonus">Quà tặng</span>
              )}
              <span>{name}</span>
            </a>
            {!is_bonus ? (
              <div
                style={{
                  marginLeft: "1em",
                  marginTop: "4px",
                  color: "gray",
                  fontSize: "12px",
                }}
              >
                {!showNote ? (
                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        columnGap: "5px",
                        cursor: "pointer",
                      }}
                      onClick={() => handleChangeNote(props.note)}
                    >
                      <i
                        style={{
                          fontSize: "10px",
                        }}
                        className="fas fa-pencil-alt"
                      ></i>
                      <span>{note ? note : "Thêm ghi chú"}</span>
                    </div>
                  </div>
                ) : (
                  <div
                    style={{
                      marginTop: "5px",
                      display: "flex",
                      alignItems: "center",
                      columnGap: "5px",
                      borderBottom: "1px solid #dadbdb",
                      paddingBottom: "3px",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                      }}
                    >
                      <input
                        style={{
                          color: "gray",
                          width: "100%",
                        }}
                        type="text"
                        value={note}
                        onChange={handleChangeNoteInput}
                        placeholder="Thêm ghi chú"
                      />
                    </div>

                    <div
                      className="iconInputConfirm"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        columnGap: "4px",
                      }}
                    >
                      <span
                        style={{
                          color: "#2ecc71",
                          cursor: "pointer",
                        }}
                        onClick={handleUpdateNoteItem}
                      >
                        <i className="fa fa-check"></i>
                      </span>
                      <span
                        style={{
                          color: "#e74c3c",
                          cursor: "pointer",
                        }}
                        onClick={handleResetNote}
                      >
                        <i className="fa fa-times"></i>
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ) : null}
          </div>

          {is_bonus === true ? (
            <div
              className={`price`}
              style={{
                marginTop: "0",
              }}
            >
              <div
                className="current-price"
                style={{
                  color: appTheme.color_main_1,
                  fontSize: "14px",
                }}
              >
                Miễn phí
              </div>
              {pastPrice !== price && props.before_discount_price > 0 && (
                <div className="past-price">
                  {formatPrice(props.before_discount_price)}
                </div>
              )}
            </div>
          ) : (
            <div
              className={`price`}
              style={{ visibility: is_bonus === true ? "hidden" : "" }}
            >
              <div
                className="current-price"
                style={{ color: appTheme.color_main_1 }}
              >
                {props.item_price > 0
                  ? `${formatPrice(props.item_price)}`
                  : "Liên hệ"}
              </div>
              {pastPrice !== price && props.before_discount_price > 0 && (
                <div className="past-price">
                  {formatPrice(props.before_discount_price)}
                </div>
              )}
            </div>
          )}

          {is_bonus ? (
            <div>
              <span
                style={{
                  color: "#757575",
                }}
              >
                Số lượng:{" "}
              </span>
              <span>{props.quantity}</span>
            </div>
          ) : (
            <div className="row btn-calculator">
              <button
                onClick={() => is_bonus === false && handleDecrease()}
                checked={props.is_use_balance_collaborator}
              >
                -
              </button>
              <input
                type="number"
                value={is_bonus == true ? props.quantity : quantity}
                style={{
                  width:
                    (quantity ?? 0).toString().length == 1
                      ? 55
                      : (quantity ?? 0).toString().length == 2
                      ? 60
                      : (quantity ?? 0).toString().length == 3
                      ? 75
                      : (quantity ?? 0).toString().length == 4
                      ? 75
                      : (quantity ?? 0).toString().length == 5
                      ? 80
                      : (quantity ?? 0).toString().length == 6
                      ? 85
                      : (quantity ?? 0).toString().length * 20,
                }}
                min={0}
                onChange={(e) => is_bonus === false && handleChangeQuantity(e)}
              />
              <button onClick={() => is_bonus === false && handleIncrease()}>
                +
              </button>
            </div>
          )}

          {is_bonus === true ? (
            <button className="delete-btn" style={{ marginTop: "0.7em" }}>
              <img
                src="./img/gift-48.png"
                alt="gift"
                style={{
                  width: "35px",
                }}
              />
            </button>
          ) : (
            <button className="delete-btn" onClick={handleRemoveItem}>
              <i className="fa fa-trash-alt"></i>
            </button>
          )}
        </div>
      </div>
      <DistributeItem
        allows_choose_distribute={allows_choose_distribute}
        product={props.product}
        isShowDistribute={props.isShowDistribute}
        handleChangeDistribute={handleChangeDistribute}
        onShowDistribute={props.onShowDistribute}
        distributes={distributes}
        setNewDistribute={setNewDistribute}
        newDistribute={newDistribute}
        setNewSubDistribute={setNewSubDistribute}
        newSubDistribute={newSubDistribute}
        distributes_selected={props.distributes_selected}
      />
    </CartStyles>
  );
}
