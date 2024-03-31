import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { collaboratorActions as c } from "../../../actions/collaboratorActions";
import { formatPrice } from "../../../helper";
import { constants } from "../../../constants";
import history from "../../../history";

const CollaboratorInformationWalletStyles = styled.div`
  .collab__wallet__content {
    display: flex;
    row-gap: 10px;
    column-gap: 20px;
    .collab__wallet__header {
      display: flex;
      flex-direction: column;
      row-gap: 15px;
      width: 32%;
      flex-shrink: 0;
      .collab__wallet__header__item {
        padding: 1rem;
        border-radius: 5px;
        width: 100%;
        .collab__wallet__header__item-title {
          display: flex;
          align-items: center;
          column-gap: 10px;
          font-weight: 500;
          font-size: 18px;
          color: #2d3436;
          img {
            width: 30px;
            height: 30px;
          }
        }
        .collab__wallet__header__item-count {
          margin-top: 10px;
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          font-weight: 500;
          color: #757575;
          & > span:last-child {
            cursor: pointer;
            &:hover {
              text-decoration: underline;
            }
          }
        }
      }
    }
    .collab__wallet__body {
      width: 100%;
      display: flex;
      flex-direction: column;
      row-gap: 20px;
      .collab__wallet__title {
        font-size: 14px;
        font-weight: 500;
        color: #757575;
      }
      .collab__wallet__rewards {
        width: 100%;
        height: 100%;
        padding: 20px;
        border-radius: 6px;
        box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
        .collab__wallet__gift {
          display: flex;
          flex-direction: column;
          align-items: center;
          row-gap: 10px;
          img {
            width: 64px;
            height: 64px;
          }
          .collab__wallet__rewards-count {
            text-align: center;
            font-size: 12px;
            font-weight: 600;
          }
        }
        .collab__wallet__revenue {
          margin-top: 30px;
          display: flex;
          flex-direction: column;
          row-gap: 10px;
          .collab__wallet__revenue__item {
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            .collab__wallet__revenue__item-title {
              display: flex;
              align-items: flex-end;
              column-gap: 10px;
              color: #757575;
              img {
                width: 26px;
                height: 26px;
                object-fit: contain;
              }
            }
            .collab__wallet__revenue__item-count {
              display: flex;
              align-items: center;
              font-weight: 500;
              .collab__wallet__revenue__item-icon {
                margin-left: 4px;
                width: 16px;
                height: 16px;
              }
            }
          }
        }
      }
    }
  }
  @media only screen and (max-width: 1200px) {
    .collab__wallet__content {
      flex-direction: column;
      .collab__wallet__header {
        width: 100%;
        flex-direction: row;
        column-gap: 15px;
        .collab__wallet__header__item {
          .collab__wallet__header__item-title {
            font-size: 16px;
          }
        }
      }
    }
  }
  @media only screen and (max-width: 576px) {
    .collab__wallet__content {
      .collab__wallet__header {
        flex-direction: column;
      }
    }
  }
`;

const CollaboratorInformationWallet = ({ setTabActive }) => {
  const dispatch = useDispatch();
  const info = useSelector((state) => state.collaborator.info);
  const appTheme = useSelector((state) => state.app.appTheme);

  const [reward, setReward] = useState({
    total: null,
    index: -1,
    totalNeed: null,
  });
  const handlePrice = (steps, indexBonus) => {
    return steps[indexBonus]?.bonus;
  };

  useEffect(() => {
    if (info.status !== "LOADING" && info.steps_bonus?.length > 0) {
      const rewardTemp = {
        total: null,
        index: -1,
        totalNeed: null,
      };
      let isExisted = false;
      info.steps_bonus.forEach((element, index) => {
        const totalReward =
          Number(
            info.type_rose == 0 ? info.total_final : info.share_collaborator
          ) - Number(element.limit);
        if (isExisted === false) {
          if (totalReward > 0) {
            rewardTemp.total = totalReward;
            rewardTemp.index = index;
            rewardTemp.totalNeed = null;
          } else {
            rewardTemp.index = index;
            rewardTemp.totalNeed = Math.abs(totalReward);
            isExisted = true;
          }
        }
      });
      setReward(rewardTemp);
    }
  }, [info.share_collaborator, info.status, info.steps_bonus]);

  useEffect(() => {
    dispatch(c.getInfo());
  }, [dispatch]);

  var date = new Date();
  var date1 = new Date(date.getFullYear(), date.getMonth(), 1);
  var date2 = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  var strTime1 =
    date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate();
  var strTime2 =
    date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDate();

  const handleShowOrderShare = () => {
    setTabActive("order");
    history.push(
      `/cong-tac-vien?field_by_value=COMPLETED&field_by=order_status_code&date_from=${strTime1}&date_to=${strTime2}&type=month&order=commission`
    );
  };
  const handleShowOrderImport = () => {
    setTabActive("order");
    history.push(
      `/cong-tac-vien?field_by_value=COMPLETED&field_by=order_status_code&date_from=${strTime1}&date_to=${strTime2}&type=month&order=import`
    );
  };

  var type = info.type_rose == 0 ? "Doanh số" : "Hoa hồng";

  return (
    <CollaboratorInformationWalletStyles className="collab__wallet">
      {info.status === constants.SUCCESS ? (
        <div className="collab__wallet__content">
          <div className="collab__wallet__header">
            <div
              className="collab__wallet__header__item"
              style={{
                border: `1px dashed ${appTheme.color_main_1}`,
              }}
            >
              <div className="collab__wallet__header__item-title">
                <img src="/img/balance.png" alt="balance" />
                <span>Số dư hiện tại</span>
              </div>
              <div className="collab__wallet__header__item-count">
                <span>{formatPrice(info.balance, false, true)}</span>
                <span onClick={() => setTabActive("order")}>
                  Đóng băng:{" "}
                  {formatPrice(info.money_payment_request ?? 0, false, true)}
                </span>
              </div>
            </div>
            <div
              className="collab__wallet__header__item"
              style={{
                border: `1px dashed ${appTheme.color_main_1}`,
              }}
            >
              <div className="collab__wallet__header__item-title">
                <img src="/img/commission.png" alt="commission" />
                <span>Hoa hồng tháng này</span>
              </div>
              <div className="collab__wallet__header__item-count">
                <span>{formatPrice(info.share_collaborator, false, true)}</span>
                <span onClick={handleShowOrderShare}>
                  {info.number_order_comission} Đơn hàng
                </span>
              </div>
            </div>
            <div
              className="collab__wallet__header__item"
              style={{
                border: `1px dashed ${appTheme.color_main_1}`,
              }}
            >
              <div className="collab__wallet__header__item-title">
                <img src="/img/receipt.png" alt="receipt" />
                <span>Doanh số tháng này</span>
              </div>
              <div className="collab__wallet__header__item-count">
                <span>{formatPrice(info.total_final, false, true)}</span>
                <span onClick={handleShowOrderImport}>
                  {info.number_order} Đơn hàng
                </span>
              </div>
            </div>
          </div>
          <div className="collab__wallet__body">
            <div className="collab__wallet__rewards">
              <div className="collab__wallet__gift">
                <img
                  src={`${
                    reward.total > 0 ? "/img/reward.png" : "/img/gift.png"
                  }`}
                  alt="gift"
                />
                <div
                  className="collab__wallet__rewards-count"
                  style={{
                    color: appTheme.color_main_1,
                  }}
                >
                  {reward.total !== null
                    ? `Đạt thưởng ${formatPrice(
                        handlePrice(
                          info.steps_bonus,
                          reward.totalNeed !== null
                            ? reward.index - 1
                            : reward.index
                        )
                      )}`
                    : ""}
                </div>
                {info.steps_bonus.length > 0 && (
                  <div className="collab__wallet__title">
                    {reward.totalNeed !== null
                      ? `${type} cần thêm ${formatPrice(
                          reward.totalNeed
                        )} để đạt thưởng ${formatPrice(
                          info.steps_bonus[reward.index]?.bonus
                        )}`
                      : `Chúc mừng bạn đã đạt thưởng ${formatPrice(
                          handlePrice(
                            info.steps_bonus,
                            reward.totalNeed !== null
                              ? reward.index - 1
                              : reward.index
                          )
                        )}`}
                  </div>
                )}
              </div>
              <div className="collab__wallet__revenue">
                {info.steps_bonus.length > 0 &&
                  info.steps_bonus.map((step, index) => (
                    <div className="collab__wallet__revenue__item">
                      <div className="collab__wallet__revenue__item-title">
                        <img
                          src={
                            reward.index >= index && reward.total >= 0
                              ? "/img/gift-box (2).png"
                              : "/img/gift_close.png"
                          }
                          style={{
                            width:
                              reward.index >= index && reward.total >= 0
                                ? "26px"
                                : "22px",
                            height:
                              reward.index >= index && reward.total >= 0
                                ? "26px"
                                : "22px",
                            marginLeft:
                              reward.index >= index && reward.total >= 0
                                ? "0"
                                : "4px",
                          }}
                          alt="gift"
                        />
                        <span>
                          {type} đạt {` ${formatPrice(step.limit)}`}
                        </span>
                      </div>
                      <div
                        className="collab__wallet__revenue__item-count"
                        style={{
                          color: appTheme.color_main_1,
                        }}
                      >
                        Thưởng {formatPrice(step.bonus)}
                        <span
                          className="collab__wallet__revenue__item-icon"
                          style={{
                            color:
                              reward.index >= index && reward.total >= 0
                                ? "#27ae60"
                                : "#757575",
                          }}
                        >
                          {reward.index >= index && reward.total >= 0 && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                              />
                            </svg>
                          )}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </CollaboratorInformationWalletStyles>
  );
};

export default CollaboratorInformationWallet;
