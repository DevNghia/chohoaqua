import React, { useEffect, useState } from "react";
import { constants as c } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import { formatPrice } from "../../helper/index";

import Footer from "../../components/Footer";
import { userActions } from "../../actions/userActions";
import PageLoading from "../../components/PageLoading";
import styled from "styled-components";

const WalletStyles = styled.div`
  .wallet-coin {
    padding: 0 10px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 30px;
    .wallet-item {
      .wallet-item-title {
        display: flex;
        align-items: center;
        column-gap: 20px;
        margin-bottom: 10px;
        img {
          width: 30px;
          height: 30px;
        }
        i {
          font-size: 30px;
          color: #f5dc0e;
        }
      }
      .wallet-item-coin {
        width: 100%;
        padding: 20px 0;
        border: 1px dashed #dbc821;
        border-radius: 5px;
        text-align: center;
        color: goldenrod;
      }
    }
  }
  @media only screen and (max-width: 576px) {
    .wallet-coin {
      grid-template-columns: repeat(1, 1fr);
      row-gap: 20px;
    }
  }
`;

function Waller() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);
  const points = useSelector((state) => state.user.reward_points);
  const point_history = useSelector((state) => state.user.point_history);
  const [show, setShow] = React.useState(false);
  console.log(point_history + "points");
  const status = useSelector((state) => state.user.status);
  useEffect(() => {
    dispatch(userActions.getUserProfile());
    dispatch(userActions.getUserPoints());
    dispatch(userActions.getUserPointsHistory());
  }, []);
  var sum = 0;
  return (
    <React.Fragment>
      {/* <Header /> */}
      {status === c.SUCCESS ? (
        <React.Fragment>
          <div className="container">
            <WalletStyles className="table">
              <div className="wallet-coin">
                <div className="wallet-item">
                  <div className="wallet-item-title">
                    <img src="./img/coin.png" alt="coint" />
                    <h4>Xu tích lũy :</h4>
                  </div>
                  <div className="wallet-item-coin"> {profile.points} Xu</div>
                </div>
                <div className="wallet-item">
                  <div className="wallet-item-title">
                    <i className="fab fa-bitcoin"></i>
                    <h4>Chính sách tích xu :</h4>
                  </div>
                  <div className="wallet-item-coin">
                    <span>1 Xu / {points.money_a_point} VND</span>
                  </div>
                </div>
              </div>
              <div style={{ marginLeft: "10px" }}>
                <div className="row Compensation">
                  <div className="box-Compensation">
                    <i class="fas fa-file-contract"></i>
                  </div>
                  <div className="box-Compensation">
                    <h5>Hoàn xu đơn hàng</h5>
                    <h5 style={{ fontSize: "12px", color: "green" }}>
                      {points.percent_refund}% giới hạn 1 Xu
                    </h5>
                    <h6>
                      Ví dụ : 100k hoàn 10% = 10k = 10k Xu (1000 Xu = 1000 VND)
                    </h6>
                  </div>
                </div>
                <div className="row Compensations">
                  <div className="box-Compensations">
                    <i class="far fa-registered"></i>
                  </div>
                  <div className="box-Compensation">
                    <h5>Đánh giá sản phẩm</h5>
                    <h5 style={{ fontSize: "12px", color: "green" }}>
                      + {points.point_review} xu
                    </h5>
                  </div>
                </div>
                <div className="row Compensationt">
                  <div className="box-Compensations">
                    <i class="fas fa-users"></i>
                  </div>
                  <div className="box-Compensation">
                    <h5>Giới thiệu bạn bè </h5>
                    <h5 style={{ fontSize: "12px", color: "green" }}>
                      + {points.point_introduce_customer} xu
                    </h5>
                  </div>
                </div>
              </div>
              <div>
                <h5 className="history-coin" onClick={() => setShow(!show)}>
                  {show ? " Lịch sử tích xu" : " Lịch sử tích xu"}
                </h5>
                {point_history.data?.length > 0 && show && (
                  <div className="box-coins" id="box-coints">
                    {point_history.data?.length > 0 &&
                      point_history.data.map((v, i) => {
                        return (
                          <div key={i}>
                            <div className="box-points-history row">
                              <div className="content-points-history">
                                <h5>{v.content}</h5>
                                <h5 className="time-points-history">
                                  {v.created_at}
                                </h5>
                              </div>
                              <div className="points-history">
                                <h5
                                  style={{
                                    fontWeight: "bold",
                                    textAlign: "right",
                                    color: "black",
                                  }}
                                >
                                  {v.current_point}
                                </h5>
                                <h5
                                  className="points-rigth"
                                  style={{
                                    color: v.point < 0 ? "red" : "green",
                                  }}
                                >
                                  {v.point <= 0 ? "" : "+"}
                                  {v.point}
                                </h5>
                              </div>
                            </div>
                            <p
                              style={{
                                borderBottom: "1px solid #ebdada",
                                marginLeft: "50px",
                                marginRight: "50px",
                              }}
                            ></p>
                          </div>
                        );
                      })}
                  </div>
                )}
              </div>
            </WalletStyles>
          </div>
          <Footer />
        </React.Fragment>
      ) : null}
      {/* <Footer /> */}
    </React.Fragment>
  );
}

export default Waller;
