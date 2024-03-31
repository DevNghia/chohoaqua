import React, { useState, useEffect } from "react";
import styled from "styled-components";
import history from "../../../history";
import { useSelector } from "react-redux";
// const tabs = [
//   {
//     id: 1,
//     value: "wallet",
//     name: "Thông tin ví",
//     icon: (
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         fill="none"
//         viewBox="0 0 24 24"
//         strokeWidth="1.5"
//         stroke="currentColor"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3"
//         />
//       </svg>
//     ),
//     childs: [],
//   },
//   {
//     id: 2,
//     name: "Thống kê nhập hàng",
//     value: "",
//     icon: (
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         fill="none"
//         viewBox="0 0 24 24"
//         strokeWidth="1.5"
//         stroke="currentColor"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
//         />
//       </svg>
//     ),
//     childs: [
//       {
//         id: 2.1,
//         name: "Đơn hàng",
//         value: "order_import",
//       },
//       {
//         id: 2.2,
//         name: "Báo cáo",
//         value: "report_import",
//       },
//     ],
//   },
//   {
//     id: 3,
//     name: "Thống kê hoa hồng",
//     value: "",
//     icon: (
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         fill="none"
//         viewBox="0 0 24 24"
//         strokeWidth="1.5"
//         stroke="currentColor"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
//         />
//       </svg>
//     ),
//     childs: [
//       {
//         id: 3.1,
//         name: "Đơn hàng",
//         value: "order",
//       },
//       {
//         id: 3.2,
//         name: "Lịch sử thay đổi số dư",
//         value: "balance",
//       },
//       {
//         id: 3.3,
//         name: "Thưởng nấc thang",
//         value: "ladder",
//       },
//       {
//         id: 3.4,
//         name: "Báo cáo",
//         value: "report",
//       },
//     ],
//   },
//   {
//     id: 4,
//     name: "Thanh toán",
//     icon: (
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         fill="none"
//         viewBox="0 0 24 24"
//         strokeWidth="1.5"
//         stroke="currentColor"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
//         />
//       </svg>
//     ),
//     value: "payment",
//     childs: [],
//   },
//   {
//     id: 5,
//     name: "Danh sách giới thiệu",
//     icon: (
//       <svg
//         viewBox="0 0 19 20"
//         fill="currentColor"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <path
//           d="M11.0265 14.6043L7.17745 12.5051C6.67493 13.0423 6.02243 13.416 5.30476 13.5775C4.58709 13.739 3.83743 13.6809 3.15321 13.4108C2.46898 13.1407 1.88183 12.671 1.46805 12.0628C1.05427 11.4546 0.833008 10.7359 0.833008 10.0003C0.833008 9.2647 1.05427 8.54609 1.46805 7.93787C1.88183 7.32966 2.46898 6.85996 3.15321 6.58983C3.83743 6.31969 4.58709 6.26161 5.30476 6.42313C6.02243 6.58465 6.67493 6.95831 7.17745 7.49553L11.0274 5.39636C10.8092 4.531 10.914 3.61574 11.3224 2.82215C11.7307 2.02857 12.4144 1.41114 13.2454 1.08562C14.0764 0.760093 14.9975 0.748819 15.8362 1.05391C16.6749 1.359 17.3736 1.9595 17.8012 2.74286C18.2288 3.52621 18.356 4.43863 18.159 5.30908C17.962 6.17953 17.4543 6.94824 16.731 7.47112C16.0078 7.994 15.1186 8.23515 14.2303 8.14936C13.342 8.06357 12.5154 7.65673 11.9056 7.00511L8.05561 9.10428C8.20338 9.69219 8.20338 10.3075 8.05561 10.8954L11.9056 12.9946C12.5157 12.3433 13.3425 11.9369 14.2308 11.8515C15.1192 11.7662 16.0082 12.0077 16.7312 12.531C17.4541 13.0542 17.9615 13.8231 18.1581 14.6936C18.3547 15.5641 18.2271 16.4765 17.7991 17.2596C17.3712 18.0428 16.6723 18.643 15.8335 18.9477C14.9947 19.2524 14.0736 19.2408 13.2427 18.9149C12.4119 18.589 11.7284 17.9714 11.3204 17.1776C10.9125 16.3839 10.808 15.4686 11.0265 14.6034V14.6043ZM4.49986 11.8332C4.98609 11.8332 5.45241 11.64 5.79623 11.2962C6.14004 10.9524 6.3332 10.4861 6.3332 9.99986C6.3332 9.51363 6.14004 9.04732 5.79623 8.7035C5.45241 8.35968 4.98609 8.16653 4.49986 8.16653C4.01363 8.16653 3.54732 8.35968 3.2035 8.7035C2.85968 9.04732 2.66653 9.51363 2.66653 9.99986C2.66653 10.4861 2.85968 10.9524 3.2035 11.2962C3.54732 11.64 4.01363 11.8332 4.49986 11.8332ZM14.5832 6.3332C15.0694 6.3332 15.5357 6.14004 15.8796 5.79623C16.2234 5.45241 16.4165 4.98609 16.4165 4.49986C16.4165 4.01363 16.2234 3.54732 15.8796 3.2035C15.5357 2.85968 15.0694 2.66653 14.5832 2.66653C14.097 2.66653 13.6307 2.85968 13.2868 3.2035C12.943 3.54732 12.7499 4.01363 12.7499 4.49986C12.7499 4.98609 12.943 5.45241 13.2868 5.79623C13.6307 6.14004 14.097 6.3332 14.5832 6.3332ZM14.5832 17.3332C15.0694 17.3332 15.5357 17.14 15.8796 16.7962C16.2234 16.4524 16.4165 15.9861 16.4165 15.4999C16.4165 15.0136 16.2234 14.5473 15.8796 14.2035C15.5357 13.8597 15.0694 13.6665 14.5832 13.6665C14.097 13.6665 13.6307 13.8597 13.2868 14.2035C12.943 14.5473 12.7499 15.0136 12.7499 15.4999C12.7499 15.9861 12.943 16.4524 13.2868 16.7962C13.6307 17.14 14.097 17.3332 14.5832 17.3332Z"
//           fill="currentColor"
//         />
//       </svg>
//     ),
//     value: "referralCode",
//     childs: [],
//   },
//   {
//     id: 6,
//     name: "Yêu cầu làm đại lý",
//     icon: (
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         fill="none"
//         viewBox="0 0 24 24"
//         strokeWidth="1.5"
//         stroke="currentColor"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
//         />
//       </svg>
//     ),
//     value: "request",
//     childs: [],
//   },
// ];

const AgencyTabsStyles = styled.div`
  background-color: white;
  width: 260px;
  border-radius: 0.25rem;
  flex-shrink: 0;
  padding: 1rem;
  .agency__tabsContent {
    display: flex;
    flex-direction: column;
    .agency__tabsItem {
      column-gap: 10px;
      padding: 12px;
      display: flex;
      align-items: center;
      cursor: pointer;
      color: #757575;
      transition: all 0.3s;
      font-size: 16px;
      &:not(.agency__tabsItem-hasChilds):hover {
        color: #2d3436;
      }

      .agency__tabsIcon {
        width: 20px;
        height: 20px;
        flex-shrink: 0;
        svg {
          width: 100%;
          height: 100%;
        }
      }
    }
    .agency__tabsIconDropdown {
      font-size: 12px;
    }
    .agency__tabsItem-hasChilds {
      cursor: default;
      user-select: none;
      pointer-events: none;
    }
    .agency_tabItem-active {
      color: #2d3436;
    }
  }
  .agency__tabsContent.mobile {
    display: none;
    .agency__tabsItem {
      position: relative;
      &.agency__tabsItemMobile-hasChilds:hover {
        color: #757575;
        cursor: default;
      }
      &:hover .agency__tabsItemChildMain-mobile {
        opacity: 1;
        visibility: visible;
        transform: translateY(0px);
      }
      .agency__tabsItemChildMain-mobile {
        position: absolute;
        top: calc(100% + 1px);
        left: 0;
        z-index: 100;
        background-color: white;
        border-radius: 10px;
        box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
        white-space: nowrap;
        opacity: 0;
        visibility: hidden;
        transform: translateY(10px);
        transition: all 0.5s;
      }
    }
    .agency__tabsItem.agency__tabsItem-hasChilds {
      &:hover {
        color: red;
      }
    }
  }
  @media only screen and (max-width: 976px) {
    width: 100%;
    padding: 0 1rem;
    .agency__tabsContent {
      flex-direction: row;
      width: 100%;
      &:not(.mobile) {
        display: none;
      }
      &.mobile {
        display: flex;
        .agency__tabsItem {
          padding: 12px 20px;
        }
      }
    }
  }
  @media only screen and (max-width: 576px) {
    .agency__tabsContent {
      &.mobile {
        flex-direction: column;
        width: 180px;
      }
    }
  }
`;

const AgencyTabs = ({ tabActive, setTabActive }) => {
  const account = useSelector((state) => state.agency.account);

  const tabs = [
    {
      id: 3,
      value: "wallet",
      name: "Thông tin ví",
      icon: (
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
            d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3"
          />
        </svg>
      ),
      childs: [],
    },
    {
      id: 4,
      name: "Thống kê nhập hàng",
      value: "",
      icon: (
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
            d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
          />
        </svg>
      ),
      childs: [
        {
          id: 4.1,
          name: "Đơn hàng nhập",
          value: "order_import",
        },
        {
          id: 4.2,
          name: "Đại lý nhập hàng",
          value: "order_agency_import",
        },
        // {
        //   id: 4.3,
        //   name: "Báo cáo",
        //   value: "report_import",
        // },
      ],
    },
    {
      id: 5,
      name: "Thống kê hoa hồng",
      value: "",
      icon: (
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
            d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
          />
        </svg>
      ),
      childs: [
        {
          id: 5.1,
          name: "Đơn hàng",
          value: "orderss",
        },
        // {
        //   id: 5.1,
        //   name: "Đơn hàng",
        //   value: "order",
        // },
        {
          id: 5.2,
          name: "Lịch sử thay đổi số dư",
          value: "balance",
        },
        {
          id: 5.3,
          name: "Thưởng nấc thang",
          value: "ladder",
        },
        {
          id: 5.4,
          name: "Báo cáo",
          value: "report",
        },
      ],
    },
    {
      id: 6,
      name: "Thanh toán",
      icon: (
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
            d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
          />
        </svg>
      ),
      value: "payment",
      childs: [],
    },
    {
      id: 7,
      name: "Danh sách giới thiệu",
      icon: (
        <svg
          viewBox="0 0 19 20"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.0265 14.6043L7.17745 12.5051C6.67493 13.0423 6.02243 13.416 5.30476 13.5775C4.58709 13.739 3.83743 13.6809 3.15321 13.4108C2.46898 13.1407 1.88183 12.671 1.46805 12.0628C1.05427 11.4546 0.833008 10.7359 0.833008 10.0003C0.833008 9.2647 1.05427 8.54609 1.46805 7.93787C1.88183 7.32966 2.46898 6.85996 3.15321 6.58983C3.83743 6.31969 4.58709 6.26161 5.30476 6.42313C6.02243 6.58465 6.67493 6.95831 7.17745 7.49553L11.0274 5.39636C10.8092 4.531 10.914 3.61574 11.3224 2.82215C11.7307 2.02857 12.4144 1.41114 13.2454 1.08562C14.0764 0.760093 14.9975 0.748819 15.8362 1.05391C16.6749 1.359 17.3736 1.9595 17.8012 2.74286C18.2288 3.52621 18.356 4.43863 18.159 5.30908C17.962 6.17953 17.4543 6.94824 16.731 7.47112C16.0078 7.994 15.1186 8.23515 14.2303 8.14936C13.342 8.06357 12.5154 7.65673 11.9056 7.00511L8.05561 9.10428C8.20338 9.69219 8.20338 10.3075 8.05561 10.8954L11.9056 12.9946C12.5157 12.3433 13.3425 11.9369 14.2308 11.8515C15.1192 11.7662 16.0082 12.0077 16.7312 12.531C17.4541 13.0542 17.9615 13.8231 18.1581 14.6936C18.3547 15.5641 18.2271 16.4765 17.7991 17.2596C17.3712 18.0428 16.6723 18.643 15.8335 18.9477C14.9947 19.2524 14.0736 19.2408 13.2427 18.9149C12.4119 18.589 11.7284 17.9714 11.3204 17.1776C10.9125 16.3839 10.808 15.4686 11.0265 14.6034V14.6043ZM4.49986 11.8332C4.98609 11.8332 5.45241 11.64 5.79623 11.2962C6.14004 10.9524 6.3332 10.4861 6.3332 9.99986C6.3332 9.51363 6.14004 9.04732 5.79623 8.7035C5.45241 8.35968 4.98609 8.16653 4.49986 8.16653C4.01363 8.16653 3.54732 8.35968 3.2035 8.7035C2.85968 9.04732 2.66653 9.51363 2.66653 9.99986C2.66653 10.4861 2.85968 10.9524 3.2035 11.2962C3.54732 11.64 4.01363 11.8332 4.49986 11.8332ZM14.5832 6.3332C15.0694 6.3332 15.5357 6.14004 15.8796 5.79623C16.2234 5.45241 16.4165 4.98609 16.4165 4.49986C16.4165 4.01363 16.2234 3.54732 15.8796 3.2035C15.5357 2.85968 15.0694 2.66653 14.5832 2.66653C14.097 2.66653 13.6307 2.85968 13.2868 3.2035C12.943 3.54732 12.7499 4.01363 12.7499 4.49986C12.7499 4.98609 12.943 5.45241 13.2868 5.79623C13.6307 6.14004 14.097 6.3332 14.5832 6.3332ZM14.5832 17.3332C15.0694 17.3332 15.5357 17.14 15.8796 16.7962C16.2234 16.4524 16.4165 15.9861 16.4165 15.4999C16.4165 15.0136 16.2234 14.5473 15.8796 14.2035C15.5357 13.8597 15.0694 13.6665 14.5832 13.6665C14.097 13.6665 13.6307 13.8597 13.2868 14.2035C12.943 14.5473 12.7499 15.0136 12.7499 15.4999C12.7499 15.9861 12.943 16.4524 13.2868 16.7962C13.6307 17.14 14.097 17.3332 14.5832 17.3332Z"
            fill="currentColor"
          />
        </svg>
      ),
      value: "referralCode",
      childs: [],
    },
    {
      id: 8,
      name: "Báo cáo tổng quan",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path d="M64 32C64 14.3 49.7 0 32 0S0 14.3 0 32V64 368 480c0 17.7 14.3 32 32 32s32-14.3 32-32V352l64.3-16.1c41.1-10.3 84.6-5.5 122.5 13.4c44.2 22.1 95.5 24.8 141.7 7.4l34.7-13c12.5-4.7 20.8-16.6 20.8-30V66.1c0-23-24.2-38-44.8-27.7l-9.6 4.8c-46.3 23.2-100.8 23.2-147.1 0c-35.1-17.6-75.4-22-113.5-12.5L64 48V32z" />
        </svg>
      ),
      value: "genarel_report",
      childs: [],
    },
  ];

  // const newTab = {
  //   id: 7,
  //   name: "Đơn hàng",
  //   value: "order_agency_import",
  //   icon: (
  //     <svg
  //       xmlns="http://www.w3.org/2000/svg"
  //       fill="none"
  //       viewBox="0 0 24 24"
  //       strokeWidth="1.5"
  //       stroke="currentColor"
  //     >
  //       <path
  //         strokeLinecap="round"
  //         strokeLinejoin="round"
  //         d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
  //       />
  //     </svg>
  //   ),
  //   value: "request",
  //   childs: [],
  // };

  // // Kiểm tra xem object có id = 6 đã tồn tại trong mảng hay chưa
  // const existingTab = tabs.find((tab) => tab.id === 7);

  // // Nếu object chưa tồn tại trong mảng, thêm vào mảng
  // if (!existingTab) {
  //   if (account?.agency_type?.is_general_agency == false) {
  //     tabs.push(newTab);

  //   }
  // }

  // const tabss = tabs.filter(
  //   (tabs) =>
  //     !(tabs.id === 1 && account?.agency_type?.is_general_agency === false)
  // );
  let updatedTabs = tabs.map((tab) => {
    if (tab.id === 4 && account?.agency_type?.is_general_agency === false) {
      return {
        ...tab,
        childs: tab.childs.filter((child) => child.id !== 4.2),
      };
    }
    return tab;
  });

  if (account?.agency_type?.is_general_agency === true) {
    updatedTabs = updatedTabs.filter((tab) => tab.id !== 7);
  }
  return (
    <AgencyTabsStyles className="agency__tabs">
      <div className="agency__tabsContent">
        {updatedTabs.map((tab) => (
          <>
            <div
              className={`agency__tabsItem ${
                tab.childs.length > 0 ? "agency__tabsItem-hasChilds" : ""
              } ${tabActive === tab.value ? "agency_tabItem-active" : ""}`}
              key={tab.id}
              onClick={() => {
                setTabActive(tab.value);
                history.push("/dai-ly");
              }}
            >
              <div className="agency__tabsIcon">{tab.icon}</div>
              <div className="agency__tabsTitle">{tab.name}</div>
            </div>
            {tab.childs.length > 0
              ? tab.childs.map((tabChild) => (
                  <div
                    className={`agency__tabsItem agency__tabsItemChild ${
                      tabActive === tabChild.value
                        ? "agency_tabItem-active"
                        : ""
                    }`}
                    key={tabChild.id}
                    onClick={() => {
                      setTabActive(tabChild.value);
                      history.push("/dai-ly");
                    }}
                  >
                    <div
                      className="agency__tabsIcon"
                      style={{
                        width: "16px",
                        height: "16px",
                      }}
                    ></div>
                    <div className="agency__tabsTitle">{tabChild.name}</div>
                  </div>
                ))
              : null}
          </>
        ))}
      </div>
      <div className="agency__tabsContent mobile">
        {tabs.map((tab) => (
          <>
            {tab.childs.length > 0 ? (
              <div
                className={`agency__tabsItem  agency__tabsItemMobile-hasChilds ${
                  tabActive === tab.value ? "agency_tabItem-active" : ""
                }`}
                key={tab.id}
              >
                <div className="agency__tabsIcon">{tab.icon}</div>
                <div className="agency__tabsTitle">{tab.name}</div>
                {tab.childs.length > 0 && (
                  <div className="agency__tabsIconDropdown">
                    <i className="fas fa-chevron-down" aria-hidden="true"></i>
                  </div>
                )}
                <div className="agency__tabsItemChildMain-mobile">
                  {tab.childs.length > 0
                    ? tab.childs.map((tabChild) => (
                        <div
                          className={`agency__tabsItem agency__tabsItemChild-mobile ${
                            tabActive === tabChild.value
                              ? "agency_tabItem-active"
                              : ""
                          }`}
                          key={tabChild.id}
                          onClick={() => setTabActive(tabChild.value)}
                        >
                          <div className="agency__tabsTitle">
                            {tabChild.name}
                          </div>
                        </div>
                      ))
                    : null}
                </div>
              </div>
            ) : (
              <div
                className={`agency__tabsItem ${
                  tabActive === tab.value ? "agency_tabItem-active" : ""
                }`}
                key={tab.id}
                onClick={() => setTabActive(tab.value)}
              >
                <div className="agency__tabsIcon">{tab.icon}</div>
                <div className="agency__tabsTitle">{tab.name}</div>
                {tab.childs.length > 0 && (
                  <div className="agency__tabsIconDropdown">
                    <i className="fas fa-chevron-down" aria-hidden="true"></i>
                  </div>
                )}
                <div className="agency__tabsItemChildMain-mobile">
                  {tab.childs.length > 0
                    ? tab.childs.map((tabChild) => (
                        <div
                          className={`agency__tabsItem agency__tabsItemChild-mobile ${
                            tabActive === tabChild.value
                              ? "agency_tabItem-active"
                              : ""
                          }`}
                          key={tabChild.id}
                          onClick={() => setTabActive(tabChild.value)}
                        >
                          <div className="agency__tabsTitle">
                            {tabChild.name}
                          </div>
                        </div>
                      ))
                    : null}
                </div>
              </div>
            )}
          </>
        ))}
      </div>
    </AgencyTabsStyles>
  );
};

export default AgencyTabs;
