import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { constants as c } from "../../constants";
import DataLoading from "./child/DataLoading";
import { comboActions } from "../../actions/comboActions";
import { bonusProductActions } from "../../actions/bonusProductActions";

import PageLoading from "../../components/PageLoading";
import styled from "styled-components";
import {Link} from "react-router-dom";

const Header = React.lazy(() => import("../../components/Header"));
const ComboCard = React.lazy(() => import("./child/ComboCard"));
const BonusCard = React.lazy(() => import("./child/BonusCard"));
const BonusLadderCard = React.lazy(() => import("./child/BonusLadderCard"));

const EmptyCombo = React.lazy(() =>
  import("../../components/Empty/EmptyCombo")
);
const Footer = React.lazy(() => import("../../components/Footer"));

const CompoPageStyles = styled.div`
  .combo-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

function ComboPage() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.combo.status);
  const list = useSelector((state) => state.combo.list);
  const bonusProducts = useSelector((state) => state.bonusProduct.list);

  useEffect(() => {
    document.title = "Combo tặng thưởng";
    if (status === c.LOADING) dispatch(comboActions.getAllCombos());
    if (bonusProducts.status === c.LOADING)
      dispatch(bonusProductActions.getAllBonusProduct());
  }, []);

  console.log(bonusProducts);
  return (
    <React.Fragment>
      {/* <Header /> */}
      {status !== c.LOADING ? (
        list.length == 0 && bonusProducts.data?.length === 0 ? (
          <React.Fragment>
            <EmptyCombo />
            <Footer />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <CompoPageStyles className="combo-page">
              <div className="container">
                {list.length > 0 && (
                  <>
                      <Link to = "/khuyen-mai">
                        <i className="ri-arrow-left-line" ></i>
                      </Link>
                    <h3>Combo sản phẩm</h3>
                    <div className="list">
                      {list.map((v, i) => (
                        <ComboCard
                          key={i}
                          name={v.name}
                          end={v.end_time}
                          set_limit_amount={v.set_limit_amount}
                          value={v.value_discount}
                          type={v.discount_type}
                          products={v.products_combo}
                        />
                      ))}
                    </div>
                  </>
                )}
                {bonusProducts.data?.length > 0 && (
                  <>
                    <h3>Thưởng sản phẩm</h3>

                    <div className="list">
                      {bonusProducts.data?.map((v, i) => {
                        if (v.ladder_reward === true)
                          return (
                            <BonusLadderCard
                              key={i}
                              name={v.name}
                              end={v.end_time}
                              set_limit_amount={v.set_limit_amount}
                              value={v.value_discount}
                              type={v.discount_type}
                              bonusProductLadder={v}
                            />
                          );
                        else
                          return (
                            <BonusCard
                              key={i}
                              name={v.name}
                              end={v.end_time}
                              set_limit_amount={v.set_limit_amount}
                              value={v.value_discount}
                              type={v.discount_type}
                              bonusProduct={v}
                            />
                          );
                      })}
                    </div>
                  </>
                )}
              </div>
            </CompoPageStyles>
            <Footer />
          </React.Fragment>
        )
      ) : null}
    </React.Fragment>
  );
}
export { ComboPage };
