import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { agencyActions as a } from "../../../actions/agencyAction";
import { formatPrice } from "../../../helper";
import { constants } from "../../../constants";
import history from "../../../history";

const tabs = [
  // {
  //   id: 1,
  //   label: "Thưởng nhập hàng",
  //   value: "import",
  // },
  {
    id: 1,
    label: "Thưởng hoa hồng",
    value: "commission",
  },
];
const AgencyInformationWalletStyles = styled.div`
  .agency__wallet__content {
    display: flex;
    row-gap: 10px;
    column-gap: 20px;
    .agency__wallet__header {
      display: flex;
      flex-direction: column;
      row-gap: 15px;
      width: 32%;
      flex-shrink: 0;
      .agency__wallet__header__item {
        padding: 1rem;
        border-radius: 5px;
        width: 100%;
        .agency__wallet__header__item-title {
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
        .agency__wallet__header__item-count {
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
    .agency__wallet__body {
      width: 100%;
      display: flex;
      flex-direction: column;
      row-gap: 20px;
      .agency__wallet__title {
        font-size: 14px;
        font-weight: 500;
        color: #757575;
      }
      .agency__wallet__rewards {
        width: 100%;
        height: 100%;
        padding: 20px;
        border-radius: 6px;
        box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
        position: relative;
        .agency__wallet__period {
          position: absolute;
          top: 20px;
          left: 20px;
          font-size: 14px;
          color: #757575;
        }
        .agency__wallet__gift {
          display: flex;
          flex-direction: column;
          align-items: center;
          row-gap: 10px;
          img {
            width: 64px;
            height: 64px;
          }
          .agency__wallet__rewards-count {
            text-align: center;
            font-size: 12px;
            font-weight: 600;
          }
        }
        .agency__wallet__revenue {
          margin-top: 30px;
          display: flex;
          flex-direction: column;
          row-gap: 10px;
          .agency__wallet__revenue__item {
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            .agency__wallet__revenue__item-title {
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
            .agency__wallet__revenue__item-count {
              display: flex;
              align-items: center;
              font-weight: 500;
              .agency__wallet__revenue__item-icon {
                margin-left: 4px;
                width: 16px;
                height: 16px;
              }
            }
          }
        }
      }
      .agency__wallet_nav {
        ul {
          display: flex;
          li {
            padding: 8px 10px;
            border-bottom: 1px solid transparent;
            cursor: pointer;
          }
        }
      }
    }
  }
  .agency__wallet__title {
    font-size: 20px;
    margin-bottom: 20px;
  }
  @media only screen and (max-width: 1200px) {
    .agency__wallet__content {
      flex-direction: column;
      .agency__wallet__header {
        width: 100%;
        flex-direction: row;
        column-gap: 15px;
        .agency__wallet__header__item {
          .agency__wallet__header__item-title {
            font-size: 16px;
          }
        }
      }
    }
  }
  @media only screen and (max-width: 576px) {
    .agency__wallet__content {
      .agency__wallet__header {
        flex-direction: column;
      }
    }
  }
`;

const AgencyInformationWallet = ({ setTabActive }) => {
  const dispatch = useDispatch();
  const info = useSelector((state) => state.agency.info);
  const appTheme = useSelector((state) => state.app.appTheme);
  const account = useSelector((state) => state.agency.account);
  const [reward, setReward] = useState({
    total: null,
    index: -1,
    totalNeed: null,
  });
  const [rewardCommission, setRewardCommission] = useState({
    total: null,
    index: -1,
    totalNeed: null,
  });
  const [tabBonusActive, setTabBonusActive] = useState("commission");

  useEffect(() => {
    if (info.status !== "LOADING" && info.steps_import?.length > 0) {
      const rewardTemp = {
        total: null,
        index: -1,
        totalNeed: null,
      };
      let isExisted = false;
      info.steps_import?.forEach((element, index) => {
        const totalPeriod =
          info.type_bonus_period_import == "0"
            ? Number(info.total_after_discount_no_bonus_in_month)
            : info.type_bonus_period_import == "1"
            ? Number(info.total_after_discount_no_bonus_in_week)
            : info.type_bonus_period_import == "2"
            ? Number(info.total_after_discount_no_bonus_in_quarter)
            : info.type_bonus_period_import == "3"
            ? Number(info.total_after_discount_no_bonus_in_year)
            : 0;
        const totalReward = Number(totalPeriod) - Number(element.limit);
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
    if (info.status !== "LOADING" && info.steps_bonus?.length > 0) {
      const rewardTempComission = {
        total: null,
        index: -1,
        totalNeed: null,
      };
      let isExisted = false;
      info.steps_bonus?.forEach((element, index) => {
        const totalRewardCommission =
          Number(info?.share_agency_ctv) - Number(element.limit);
        if (isExisted === false) {
          if (totalRewardCommission > 0) {
            rewardTempComission.total = totalRewardCommission;
            rewardTempComission.index = index;
            rewardTempComission.totalNeed = null;
          } else {
            rewardTempComission.index = index;
            rewardTempComission.totalNeed = Math.abs(totalRewardCommission);
            isExisted = true;
          }
        }
      });
      setRewardCommission(rewardTempComission);
    }
  }, [
    info?.share_agency_ctv,
    info.status,
    info.steps_bonus,
    info.steps_import,
    info.total_after_discount_no_bonus_in_month,
    info.total_after_discount_no_bonus_in_quarter,
    info.total_after_discount_no_bonus_in_week,
    info.total_after_discount_no_bonus_in_year,
    info.type_bonus_period_import,
  ]);

  var date = new Date();
  var date1 = new Date(date.getFullYear(), date.getMonth(), 1);
  var date2 = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  var strTime1 =
    date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate();
  var strTime2 =
    date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDate();

  const handleShowOrderShare = () => {
    setTabActive("orderss");
    history.push(
      `/dai-ly?field_by_value=COMPLETED&field_by=order_status_code&date_from=${strTime1}&date_to=${strTime2}&type=month`
    );
  };
  const handleShowOrderImport = () => {
    setTabActive("order_import");
    history.push(
      `/dai-ly?field_by_value=PACKING&field_by=order_status_code&date_from=${strTime1}&date_to=${strTime2}&type=month`
    );
  };

  const handlePrice = (steps, indexBonus) => {
    const total = steps?.reduce((prevStep, curStep, index) => {
      return prevStep + (indexBonus >= index ? Number(curStep?.bonus) : 0);
    }, 0);
    return total;
  };
  useEffect(() => {
    dispatch(a.getInfo());
  }, [dispatch]);
  return (
    <React.Fragment>
      {account?.agency_type?.is_general_agency === true ? (
        <AgencyInformationWalletStyles className="agency__wallet">
          {info.status === constants.SUCCESS ? (
            <>
              <div className="agency__wallet__title">
                <h4>Tổng quan tháng này</h4>
              </div>
              <div className="agency__wallet__content">
                <div className="agency__wallet__header">
                  <div
                    className="agency__wallet__header__item"
                    style={{
                      border: `1px dashed ${appTheme.color_main_1}`,
                    }}
                  >
                    <div className="agency__wallet__header__item-title">
                      <img src="/img/balance.png" alt="balance" />
                      <span>Số dư hiện tại</span>
                    </div>
                    <div className="agency__wallet__header__item-count">
                      <span>{formatPrice(info.balance, false, true)}</span>
                      <span>
                        Đóng băng:{" "}
                        {formatPrice(
                          info.money_payment_request ?? 0,
                          false,
                          true
                        )}
                      </span>
                    </div>
                  </div>

                  <div
                    className="agency__wallet__header__item"
                    style={{
                      border: `1px dashed ${appTheme.color_main_1}`,
                    }}
                  >
                    <div className="agency__wallet__header__item-title">
                      <img src="/img/commission.png" alt="commission" />
                      <span>Hoa hồng</span>
                    </div>
                    <div className="agency__wallet__header__item-count">
                      <span>{formatPrice(info.share_general_agency)}</span>
                      <span onClick={handleShowOrderShare}>
                        {info.count_general_ctv} Đơn hàng
                      </span>
                    </div>
                  </div>
                  <div
                    className="agency__wallet__header__item"
                    style={{
                      border: `1px dashed ${appTheme.color_main_1}`,
                    }}
                  >
                    <div className="agency__wallet__header__item-title">
                      <img src="/img/receipt.png" alt="receipt" />
                      <span>Doanh số nhập hàng</span>
                    </div>
                    <div className="agency__wallet__header__item-count">
                      <span>{formatPrice(info.total_import, false, true)}</span>
                      <span onClick={handleShowOrderImport}>
                        {info.count_agency_import} Đơn hàng
                      </span>
                    </div>
                  </div>
                </div>
                <div className="agency__wallet__body">
                  <nav className="agency__wallet_nav">
                    <ul>
                      {tabs.map((tab) => (
                        <li
                          key={tab.id}
                          style={{
                            borderColor:
                              tab.value === tabBonusActive
                                ? "#2d3436"
                                : "transparent",
                            color:
                              tab.value === tabBonusActive
                                ? "#2d3436"
                                : "#a1a198",
                          }}
                          onClick={() => setTabBonusActive(tab.value)}
                        >
                          <span>{tab.label}</span>
                        </li>
                      ))}
                    </ul>
                  </nav>
                  {tabBonusActive === "import" ? (
                    <div className="agency__wallet__rewards">
                      <div className="agency__wallet__period">
                        {info.type_bonus_period_import == "0"
                          ? "Thưởng theo tháng"
                          : info.type_bonus_period_import == "1"
                          ? "Thưởng theo tuần"
                          : info.type_bonus_period_import == "2"
                          ? "Thưởng theo quý"
                          : info.type_bonus_period_import == "3"
                          ? "Thưởng theo năm"
                          : ""}
                      </div>
                      <div className="agency__wallet__gift">
                        <img
                          src={`${
                            reward.total !== null
                              ? "/img/reward.png"
                              : "/img/gift.png"
                          }`}
                          alt="gift"
                        />
                        <div
                          className="agency__wallet__rewards-count"
                          style={{
                            color: appTheme.color_main_1,
                          }}
                        >
                          {reward.total !== null
                            ? `Đạt thưởng ${formatPrice(
                                handlePrice(
                                  info.steps_import,
                                  reward.totalNeed !== null
                                    ? reward.index - 1
                                    : reward.index
                                )
                              )}`
                            : ""}
                        </div>
                        {info.steps_import.length > 0 && (
                          <div className="agency__wallet__title">
                            {reward.totalNeed !== null
                              ? `Doanh thu cần thêm ${formatPrice(
                                  reward.totalNeed
                                )} để đạt thưởng ${formatPrice(
                                  info.steps_import[reward.index]?.bonus
                                )}`
                              : `Chúc mừng bạn đã đạt thưởng ${formatPrice(
                                  handlePrice(
                                    info.steps_import,
                                    reward.totalNeed !== null
                                      ? reward.index - 1
                                      : reward.index
                                  )
                                )}`}
                          </div>
                        )}
                      </div>
                      <div className="agency__wallet__revenue">
                        {info.steps_import.length > 0 &&
                          info.steps_import.map((step, index) => (
                            <div className="agency__wallet__revenue__item">
                              <div className="agency__wallet__revenue__item-title">
                                <img
                                  src={
                                    reward.totalNeed !== null &&
                                    reward.index > index
                                      ? "/img/gift-box (2).png"
                                      : reward.totalNeed === null
                                      ? "/img/gift-box (2).png"
                                      : "/img/gift_close.png"
                                  }
                                  style={{
                                    width:
                                      reward.totalNeed !== null &&
                                      reward.index - 1 > index
                                        ? "26px"
                                        : reward.totalNeed === null
                                        ? "26px"
                                        : "22px",
                                    height:
                                      reward.totalNeed !== null &&
                                      reward.index - 1 > index
                                        ? "26px"
                                        : reward.totalNeed === null
                                        ? "26px"
                                        : "22px",
                                    marginLeft:
                                      reward.totalNeed !== null &&
                                      reward.index - 1 > index
                                        ? "0"
                                        : reward.totalNeed === null
                                        ? "0"
                                        : "4px",
                                  }}
                                  alt="gift"
                                />
                                <span>
                                  Doanh thu đạt {` ${formatPrice(step.limit)}`}
                                </span>
                              </div>
                              <div
                                className="agency__wallet__revenue__item-count"
                                style={{
                                  color: appTheme.color_main_1,
                                }}
                              >
                                Thưởng {formatPrice(step.bonus)}
                                <span
                                  className="agency__wallet__revenue__item-icon"
                                  style={{
                                    color: "#27ae60",
                                  }}
                                >
                                  {reward.totalNeed !== null &&
                                  reward.index - 1 >= index ? (
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
                                  ) : reward.totalNeed === null ? (
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
                                  ) : null}
                                </span>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  ) : (
                    <div className="agency__wallet__rewards">
                      <div className="agency__wallet__period">
                        Thưởng theo tháng
                      </div>
                      <div className="agency__wallet__gift">
                        <img
                          src={`${
                            rewardCommission.total !== null
                              ? "/img/reward.png"
                              : "/img/gift.png"
                          }`}
                          alt="gift"
                        />
                        <div
                          className="agency__wallet__rewards-count"
                          style={{
                            color: appTheme.color_main_1,
                          }}
                        >
                          {rewardCommission.total !== null
                            ? `Đạt thưởng ${formatPrice(
                                handlePrice(
                                  info.steps_bonus,
                                  rewardCommission.totalNeed !== null
                                    ? rewardCommission.index - 1
                                    : rewardCommission.index
                                )
                              )}`
                            : ""}
                        </div>
                        {info.steps_bonus.length > 0 && (
                          <div className="agency__wallet__title">
                            {rewardCommission.totalNeed !== null
                              ? `Hoa hồng cần thêm ${formatPrice(
                                  rewardCommission.totalNeed
                                )} để đạt thưởng ${formatPrice(
                                  info.steps_bonus[rewardCommission.index]
                                    ?.bonus
                                )}`
                              : `Chúc mừng bạn đã đạt thưởng ${formatPrice(
                                  handlePrice(
                                    info.steps_bonus,
                                    rewardCommission.totalNeed !== null
                                      ? rewardCommission.index - 1
                                      : rewardCommission.index
                                  )
                                )}`}
                          </div>
                        )}
                      </div>
                      <div className="agency__wallet__revenue">
                        {info.steps_bonus.length > 0 &&
                          info.steps_bonus.map((step, index) => (
                            <div className="agency__wallet__revenue__item">
                              <div className="agency__wallet__revenue__item-title">
                                <img
                                  src={
                                    rewardCommission.totalNeed !== null &&
                                    rewardCommission.index > index
                                      ? "/img/gift-box (2).png"
                                      : rewardCommission.totalNeed === null
                                      ? "/img/gift-box (2).png"
                                      : "/img/gift_close.png"
                                  }
                                  style={{
                                    width:
                                      rewardCommission.totalNeed !== null &&
                                      rewardCommission.index > index
                                        ? "26px"
                                        : rewardCommission.totalNeed === null
                                        ? "26px"
                                        : "22px",
                                    height:
                                      rewardCommission.totalNeed !== null &&
                                      rewardCommission.index > index
                                        ? "26px"
                                        : rewardCommission.totalNeed === null
                                        ? "26px"
                                        : "22px",
                                    marginLeft:
                                      rewardCommission.totalNeed !== null &&
                                      rewardCommission.index > index
                                        ? "0"
                                        : rewardCommission.totalNeed === null
                                        ? "0"
                                        : "4px",
                                  }}
                                  alt="gift"
                                />
                                <span>
                                  Hoa hồng đạt {` ${formatPrice(step.limit)}`}
                                </span>
                              </div>
                              <div
                                className="agency__wallet__revenue__item-count"
                                style={{
                                  color: appTheme.color_main_1,
                                }}
                              >
                                Thưởng {formatPrice(step.bonus)}
                                <span
                                  className="agency__wallet__revenue__item-icon"
                                  style={{
                                    color: "#27ae60",
                                  }}
                                >
                                  {rewardCommission.totalNeed !== null &&
                                  rewardCommission.index - 1 >= index ? (
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
                                  ) : rewardCommission.totalNeed === null ? (
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
                                  ) : null}
                                </span>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : null}
        </AgencyInformationWalletStyles>
      ) : (
        <AgencyInformationWalletStyles className="agency__wallet">
          {info.status === constants.SUCCESS ? (
            <>
              <div className="agency__wallet__title">
                <h4>Tổng quan tháng này</h4>
              </div>
              <div className="agency__wallet__content">
                <div className="agency__wallet__header">
                  <div
                    className="agency__wallet__header__item"
                    style={{
                      border: `1px dashed ${appTheme.color_main_1}`,
                    }}
                  >
                    <div className="agency__wallet__header__item-title">
                      <img src="/img/balance.png" alt="balance" />
                      <span>Số dư hiện tại</span>
                    </div>
                    <div className="agency__wallet__header__item-count">
                      <span>{formatPrice(info.balance, false, true)}</span>
                      <span>
                        Đóng băng:{" "}
                        {formatPrice(
                          info.money_payment_request ?? 0,
                          false,
                          true
                        )}
                      </span>
                    </div>
                  </div>

                  <div
                    className="agency__wallet__header__item"
                    style={{
                      border: `1px dashed ${appTheme.color_main_1}`,
                    }}
                  >
                    <div className="agency__wallet__header__item-title">
                      <img src="/img/commission.png" alt="commission" />
                      <span>Hoa hồng</span>
                    </div>
                    <div className="agency__wallet__header__item-count">
                      <span>
                        {formatPrice(info.share_agency_ctv, false, true)}
                      </span>
                      <span onClick={handleShowOrderShare}>
                        {info.number_order_ctv} Đơn hàng
                      </span>
                    </div>
                  </div>
                  <div
                    className="agency__wallet__header__item"
                    style={{
                      border: `1px dashed ${appTheme.color_main_1}`,
                    }}
                  >
                    <div className="agency__wallet__header__item-title">
                      <img src="/img/receipt.png" alt="receipt" />
                      <span>Doanh số nhập hàng</span>
                    </div>
                    <div className="agency__wallet__header__item-count">
                      <span>{formatPrice(info.total_import, false, true)}</span>
                      <span onClick={handleShowOrderImport}>
                        {info.count_agency_import} Đơn hàng
                      </span>
                    </div>
                  </div>
                </div>
                <div className="agency__wallet__body">
                  <nav className="agency__wallet_nav">
                    <ul>
                      {tabs.map((tab) => (
                        <li
                          key={tab.id}
                          style={{
                            borderColor:
                              tab.value === tabBonusActive
                                ? "#2d3436"
                                : "transparent",
                            color:
                              tab.value === tabBonusActive
                                ? "#2d3436"
                                : "#a1a198",
                          }}
                          onClick={() => setTabBonusActive(tab.value)}
                        >
                          <span>{tab.label}</span>
                        </li>
                      ))}
                    </ul>
                  </nav>
                  {tabBonusActive === "import" ? (
                    <div className="agency__wallet__rewards">
                      <div className="agency__wallet__period">
                        {info.type_bonus_period_import == "0"
                          ? "Thưởng theo tháng"
                          : info.type_bonus_period_import == "1"
                          ? "Thưởng theo tuần"
                          : info.type_bonus_period_import == "2"
                          ? "Thưởng theo quý"
                          : info.type_bonus_period_import == "3"
                          ? "Thưởng theo năm"
                          : ""}
                      </div>
                      <div className="agency__wallet__gift">
                        <img
                          src={`${
                            reward.total !== null
                              ? "/img/reward.png"
                              : "/img/gift.png"
                          }`}
                          alt="gift"
                        />
                        <div
                          className="agency__wallet__rewards-count"
                          style={{
                            color: appTheme.color_main_1,
                          }}
                        >
                          {reward.total !== null
                            ? `Đạt thưởng ${formatPrice(
                                handlePrice(
                                  info.steps_import,
                                  reward.totalNeed !== null
                                    ? reward.index - 1
                                    : reward.index
                                )
                              )}`
                            : ""}
                        </div>
                        {info.steps_import.length > 0 && (
                          <div className="agency__wallet__title">
                            {reward.totalNeed !== null
                              ? `Doanh thu cần thêm ${formatPrice(
                                  reward.totalNeed
                                )} để đạt thưởng ${formatPrice(
                                  info.steps_import[reward.index]?.bonus
                                )}`
                              : `Chúc mừng bạn đã đạt thưởng ${formatPrice(
                                  handlePrice(
                                    info.steps_import,
                                    reward.totalNeed !== null
                                      ? reward.index - 1
                                      : reward.index
                                  )
                                )}`}
                          </div>
                        )}
                      </div>
                      <div className="agency__wallet__revenue">
                        {info.steps_import.length > 0 &&
                          info.steps_import.map((step, index) => (
                            <div className="agency__wallet__revenue__item">
                              <div className="agency__wallet__revenue__item-title">
                                <img
                                  src={
                                    reward.totalNeed !== null &&
                                    reward.index > index
                                      ? "/img/gift-box (2).png"
                                      : reward.totalNeed === null
                                      ? "/img/gift-box (2).png"
                                      : "/img/gift_close.png"
                                  }
                                  style={{
                                    width:
                                      reward.totalNeed !== null &&
                                      reward.index - 1 > index
                                        ? "26px"
                                        : reward.totalNeed === null
                                        ? "26px"
                                        : "22px",
                                    height:
                                      reward.totalNeed !== null &&
                                      reward.index - 1 > index
                                        ? "26px"
                                        : reward.totalNeed === null
                                        ? "26px"
                                        : "22px",
                                    marginLeft:
                                      reward.totalNeed !== null &&
                                      reward.index - 1 > index
                                        ? "0"
                                        : reward.totalNeed === null
                                        ? "0"
                                        : "4px",
                                  }}
                                  alt="gift"
                                />
                                <span>
                                  Doanh thu đạt {` ${formatPrice(step.limit)}`}
                                </span>
                              </div>
                              <div
                                className="agency__wallet__revenue__item-count"
                                style={{
                                  color: appTheme.color_main_1,
                                }}
                              >
                                Thưởng {formatPrice(step.bonus)}
                                <span
                                  className="agency__wallet__revenue__item-icon"
                                  style={{
                                    color: "#27ae60",
                                  }}
                                >
                                  {reward.totalNeed !== null &&
                                  reward.index - 1 >= index ? (
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
                                  ) : reward.totalNeed === null ? (
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
                                  ) : null}
                                </span>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  ) : (
                    <div className="agency__wallet__rewards">
                      <div className="agency__wallet__period">
                        Thưởng theo tháng
                      </div>
                      <div className="agency__wallet__gift">
                        <img
                          src={`${
                            rewardCommission.total !== null
                              ? "/img/reward.png"
                              : "/img/gift.png"
                          }`}
                          alt="gift"
                        />
                        <div
                          className="agency__wallet__rewards-count"
                          style={{
                            color: appTheme.color_main_1,
                          }}
                        >
                          {rewardCommission.total !== null
                            ? `Đạt thưởng ${formatPrice(
                                handlePrice(
                                  info.steps_bonus,
                                  rewardCommission.totalNeed !== null
                                    ? rewardCommission.index - 1
                                    : rewardCommission.index
                                )
                              )}`
                            : ""}
                        </div>
                        {info.steps_bonus.length > 0 && (
                          <div className="agency__wallet__title">
                            {rewardCommission.totalNeed !== null
                              ? `Hoa hồng cần thêm ${formatPrice(
                                  rewardCommission.totalNeed
                                )} để đạt thưởng ${formatPrice(
                                  info.steps_bonus[rewardCommission.index]
                                    ?.bonus
                                )}`
                              : `Chúc mừng bạn đã đạt thưởng ${formatPrice(
                                  handlePrice(
                                    info.steps_bonus,
                                    rewardCommission.totalNeed !== null
                                      ? rewardCommission.index - 1
                                      : rewardCommission.index
                                  )
                                )}`}
                          </div>
                        )}
                      </div>
                      <div className="agency__wallet__revenue">
                        {info.steps_bonus.length > 0 &&
                          info.steps_bonus.map((step, index) => (
                            <div className="agency__wallet__revenue__item">
                              <div className="agency__wallet__revenue__item-title">
                                <img
                                  src={
                                    rewardCommission.totalNeed !== null &&
                                    rewardCommission.index > index
                                      ? "/img/gift-box (2).png"
                                      : rewardCommission.totalNeed === null
                                      ? "/img/gift-box (2).png"
                                      : "/img/gift_close.png"
                                  }
                                  style={{
                                    width:
                                      rewardCommission.totalNeed !== null &&
                                      rewardCommission.index > index
                                        ? "26px"
                                        : rewardCommission.totalNeed === null
                                        ? "26px"
                                        : "22px",
                                    height:
                                      rewardCommission.totalNeed !== null &&
                                      rewardCommission.index > index
                                        ? "26px"
                                        : rewardCommission.totalNeed === null
                                        ? "26px"
                                        : "22px",
                                    marginLeft:
                                      rewardCommission.totalNeed !== null &&
                                      rewardCommission.index > index
                                        ? "0"
                                        : rewardCommission.totalNeed === null
                                        ? "0"
                                        : "4px",
                                  }}
                                  alt="gift"
                                />
                                <span>
                                  Hoa hồng đạt {` ${formatPrice(step.limit)}`}
                                </span>
                              </div>
                              <div
                                className="agency__wallet__revenue__item-count"
                                style={{
                                  color: appTheme.color_main_1,
                                }}
                              >
                                Thưởng {formatPrice(step.bonus)}
                                <span
                                  className="agency__wallet__revenue__item-icon"
                                  style={{
                                    color: "#27ae60",
                                  }}
                                >
                                  {rewardCommission.totalNeed !== null &&
                                  rewardCommission.index - 1 >= index ? (
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
                                  ) : rewardCommission.totalNeed === null ? (
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
                                  ) : null}
                                </span>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : null}
        </AgencyInformationWalletStyles>
      )}
    </React.Fragment>
  );
};

export default AgencyInformationWallet;
