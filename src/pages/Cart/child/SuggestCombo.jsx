import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { comboActions } from "../../../actions/comboActions";

import { constants as c } from "../../../constants";

export default function Login(props) {
  const { cartInfo } = props;
  const combos = useSelector((state) => state.combo.list);
  const status = useSelector((state) => state.combo.status);

  const dispatch = useDispatch();
  if (status === c.LOADING) dispatch(comboActions.getAllCombos());

  var result = [];
  console.log("total", combos, cartInfo.line_items);
  function checkItemInCombo() {
    var filter = false;
    for (const item of cartInfo.line_items) {
      var filter = combos.filter((v, i) => {
        if (v.products_combo.length > 0) {
          return (
            v.products_combo.filter(
              (_v, _i) => item.product.id === _v.product.id
            ).length > 0
          );
        }
      });

      if (filter.length > 0) return true;
    }
    return false;
  }
  console.log("view_combo", combos);
  if (combos && combos.length > 0) {
    if (checkItemInCombo() == true) {
      result = [...combos];
    }
  }

  console.log("suggest_combo", combos, cartInfo, result);

  return (
    <>
      {/* {result.map((v, id) => {
        return (
          <>
          <label htmlFor="">Mua các sản phẩm sa</label>
            <div className="list-review-ex">
              {v.products_combo?.map((v, id) => {
                return (
                  <div style={{ "font-size": "12px" }} className="item-review">
                    {v.product?.name}
                  </div>
                );
              })}
            </div>
          </>
        );
      })} */}
    </>
  );
}
