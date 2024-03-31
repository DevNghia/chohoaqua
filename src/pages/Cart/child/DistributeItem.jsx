import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findStock } from "../../../utils/productUltis";
import styled from "styled-components";

const DistributeStyles = styled.div`
  margin-top: 10px;
  & > div {
    opacity: 1 !important;
  }
  .distributes-color,
  .distributes-size {
    padding: 5px 10px !important;
    border-radius: 8px !important;
  }
  .distribute-select {
    box-shadow: 0 0 6px 0 rgb(0 0 0 / 15%) !important;
    padding: 1em 1.5em !important;
    label {
      color: #999;
      margin-bottom: 5px;
    }
    div:first-of-type {
      button {
        min-width: 70px;
        white-space: nowrap;
        border-radius: 8px !important;
      }
    }
    .distribute-select-btn {
      column-gap: 5px;
      flex-wrap: wrap;
    }
    .distribute-select-btnFunction {
      button {
        width: 100px;
        min-height: 35px;
        border-radius: 8px !important;
        &:first-child {
          border: none !important;
        }
      }
    }
  }
`;

export default function DistributeItem(props) {
  var { allows_choose_distribute } = props;

  // const [newSubDistribute, setNewSubDistribute] = useState(
  //   distributes_selected && distributes_selected[0]
  //     ? distributes_selected[0].sub_element_distributes
  //     : ""
  // );
  const appTheme = useSelector((state) => state.app.appTheme);

  const distributes = props.distributes;
  const setNewDistribute = props.setNewDistribute;
  const newDistribute = props.newDistribute;
  const setNewSubDistribute = props.setNewSubDistribute;
  const newSubDistribute = props.newSubDistribute;
  const handleChangeDistribute = props.handleChangeDistribute;
  const distributes_selected = props.distributes_selected;
  const isShowDistribute = props.isShowDistribute;
  const product = props.product;
  console.log(product);
  if (distributes && distributes.length > 0) {
    return (
      <DistributeStyles className="distributes">
        {distributes_selected.map((v, i) => (
          <div key={i}>
            {v.name ? (
              <div
                style={{ background: appTheme.color_main_1 }}
                className="distributes-color"
              >
                {`${v.name}: ${v.value}`}
              </div>
            ) : null}
          </div>
        ))}
        {distributes_selected &&
          distributes_selected.length > 0 &&
          distributes_selected[0] &&
          distributes_selected[0].sub_element_distributes && (
            <div
              className="distributes-size"
              style={{ background: appTheme.color_main_1 }}
            >
              {`${distributes[0].sub_element_distribute_name}: 
                      ${distributes_selected[0].sub_element_distributes}`}
            </div>
          )}
        {allows_choose_distribute === true && (
          <button
            style={{ color: appTheme.color_main_1 }}
            onClick={props.onShowDistribute}
          >
            {distributes_selected?.length == 0 || !distributes
              ? "Chọn phân loại"
              : "Thay đổi"}{" "}
          </button>
        )}
        {(distributes_selected?.length > 0 ||
          !distributes_selected ||
          distributes_selected?.length == 0) && (
          <div
            className={`distribute-select ${
              props.isShowDistribute ? "active" : ""
            }`}
          >
            <label>
              {distributes[0].name ? `${distributes[0].name}:` : null}
            </label>
            <div className="row distribute-select-btn">
              {distributes[0].element_distributes.map((v, i) => (
                <button
                  key={i}
                  onClick={() => setNewDistribute(v.name)}
                  style={
                    v.name === newDistribute
                      ? {
                          backgroundColor: "white",
                          borderColor: appTheme.color_main_1,
                          color: appTheme.color_main_1,
                        }
                      : {
                          backgroundColor: "white",
                        }
                  }
                >
                  {v.name}
                </button>
              ))}
            </div>
            {distributes[0].sub_element_distribute_name && (
              <>
                <label>{distributes[0].sub_element_distribute_name}</label>
                <div className="row">
                  {distributes[0].element_distributes[0].sub_element_distributes.map(
                    (v, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          props.setNewSubDistribute(v.name);
                          setNewSubDistribute(v.name);
                        }}
                        style={
                          v.name === newSubDistribute
                            ? {
                                backgroundColor: appTheme.color_main_1,
                                color: "white",
                              }
                            : {}
                        }
                      >
                        {v.name}
                      </button>
                    )
                  )}
                </div>
              </>
            )}
            <div
              className="distribute-select-btnFunction"
              style={{
                marginTop: "1em",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <button onClick={props.onShowDistribute}>Hủy</button>

              {product.check_inventory == false ||
              findStock(product, newDistribute, newSubDistribute) == -1 ||
              findStock(product, newDistribute, newSubDistribute) > 0 ? (
                <button
                  onClick={handleChangeDistribute}
                  style={{
                    background: appTheme.color_main_1,
                    color: "white",
                    opacity: "0.8",
                  }}
                >
                  Xác nhận
                </button>
              ) : (
                <button
                  style={{
                    background: "grey",
                    color: "white",
                    opacity: "0.8",
                  }}
                >
                  Hết hàng
                </button>
              )}
            </div>
          </div>
        )}
      </DistributeStyles>
    );
  }

  return <div></div>;
}
