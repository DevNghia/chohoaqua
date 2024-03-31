import { useMemo, useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FacebookIcon } from "react-share";
import { useHistory } from "react-router-dom";
import { FacebookShareButton } from "react-share";
import { constants as c } from "../../../constants";
import { appActions } from "../../../actions/appActions";
import { cartActions } from "../../../actions/cartActions";
import { userActions } from "../../../actions/userActions";
import { productActions } from "../../../actions/productActions";
import { voucherActions } from "../../../actions/voucherActions";
import { bonusProductActions } from "../../../actions/bonusProductActions";

import { comboActions } from "../../../actions/comboActions";

import { formatNoD, formatPrice, formatPriceOrContact } from "../../../helper";
import Slider from "react-slick";
import "./style.css";
import "react-toastify/dist/ReactToastify.css";
import { fromCodePoint } from "core-js/library/es7/string";
import moment from "moment";
import styled from "styled-components";
import ModalImageProduct from "./ModalImageProduct";
import ratioHeightProduct from "./setRatioHeight";
import SuggestBonusProduct from "./SuggestBonusProduct";
import { min } from "date-fns";
const MainInfoStyles = styled.div`
  --height: ${(props) => props.heightProduct}px;
  .breadcrumbs {
    h4 {
      font-size: 14px;
      font-weight: 400;
      color: #999;
      width: 50%;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      font-family: "Inter", sans-serif;
    }
    .breadcrumbs_product {
      color: #000000;
    }
  }
  .main-info {
    padding: 10px 0;
    .product-images {
      border-right: none !important;
      width: 400px;
      max-width: 400px;
      .like-btn {
        right: 14px !important;
        top: 14px !important;
        border-top-right-radius: 10px;
      }
      .product-thumnails {
        position: relative;
        margin-bottom: 10px;
        .img-container {
          height: var(--height) !important;
          img {
            object-fit: cover !important;
          }
        }
        &:hover .slick-arrow {
          visibility: visible;
          opacity: 1;
        }
        .slick-arrow {
          border-radius: 100%;
          width: 40px;
          height: 40px;
          visibility: hidden;
          opacity: 0;
          transition: all 0.3s;
        }
        .slick-next {
          right: 0px;
        }
        .slick-prev {
          left: 0px;
        }
      }
      .video {
        padding: 1rem;
      }
    }
    .product-order-info {
      padding-left: 30px !important;
      .name {
        font-size: 25px;
        font-weight: 400;
        margin-bottom: 0.5rem;
        line-height: 1.2;
        max-width: 100% !important;
      }
      .sku {
        p {
          font-size: 14px;
          font-family: "Inter", sans-serif;
          color: #000000;
        }
      }
      .price-wraper {
        background: none !important;
        border-top: 1px solid #f0f1f2 !important;
        margin-top: 20px !important;
        margin-bottom: 0 !important;
        padding-left: 0 !important;
        padding-right: 0 !important;
        .price-inline {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          column-gap: 10px;
        }
        .price {
          font-size: 30px !important;
          white-space: nowrap;
          font-family: "Inter", sans-serif;
        }
        .past-price {
          color: #979797;
          margin: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 10px;
          white-space: nowrap;
          font-family: "Inter", sans-serif;
        }
        .discount {
          .discount-bg {
            padding: 6px 12px;
            border-radius: 20px;
            display: inline-block;
            color: #fbff00;
            font-size: 12px;
            font-weight: 700;
            font-family: "Inter", sans-serif;
          }
        }
        .save {
          display: flex;
          font-size: 14px;
          margin-top: 4px;
          font-family: "Inter", sans-serif;
          .price-save {
            font-family: "Inter", sans-serif;
          }
        }
      }
      .distributes-list {
        .distribute {
          display: flex;
          align-items: center;
          .distribute-name {
            color: #727272;
            font-weight: 400;
            margin-top: 6px;
            margin-bottom: 10px;
            width: 20%;
            font-family: "Inter", sans-serif;
          }
          .distribute-values {
            display: flex;
            column-gap: 8px;
            button {
              border-radius: 10px !important;
              cursor: pointer;
              font-family: "Inter", sans-serif;
            }
          }
        }
      }
      .cart-action {
        border-top: 1px solid #f0f1f2 !important;
        color: #727272;
        font-weight: 400;
        margin-top: 10px;
        padding-top: 1.5em !important;
        .cart-inline {
          display: flex;
          align-items: center;

          .cart-count {
            width: 20%;
            font-family: "Inter", sans-serif;
          }
          .change-quantity {
            button {
              padding: 10px;
              border-radius: 50%;
              border: 1px solid #ccc;
              width: 38px;
              cursor: pointer;
              font-weight: 900;
            }
            input {
              width: 50px;
              text-align: center;
              font-size: 18px;
            }
          }
          .row {
            border-radius: 10px;
            overflow: hidden;
            button {
              cursor: pointer;
              borderradius: 50% !important;
            }
          }
        }

        .actions {
          .button-cart {
            margin-top: 30px;
          }
          #addcart-btn {
            cursor: pointer;
            transition: all 0.5s;
            border: 1px solid currentColor !important;
            border-radius: 100rem !important;
            cursor: pointer;
            font-family: "Inter", sans-serif;
            margin-bottom: 0 !important;
          }

          #addcart-btn:last-of-type {
            color: white !important;
          }
          #outOfStock-btn {
            margin-top: 30px;
            margin-right: 15px;
            user-select: none;
            font-family: "Inter", sans-serif;
            border-radius: 100rem;
            padding: 10px 20px;
            font-size: 16px;
            color: white;
          }
        }
      }

      .flashsale {
        padding: 15px;
        background-color: #fffee8;
        margin-top: 10px;
        border-radius: 10px;
        .flashsale__header {
          display: flex;
          align-items: center;
          .flashsale__title {
            h5 {
              font-family: "Inter", sans-serif;
              text-transform: uppercase;
              font-size: 20px;
              font-weight: 500;
              line-height: 1.2;
              margin-bottom: 2px;
            }
            span {
              font-family: "Inter", sans-serif;
              color: #727272;
              font-size: 14px;
              line-height: 21px;
            }
          }
          .flashsale__countdown-wrapper {
            margin-left: 20px;
            flex-shrink: 1;
            .flashsale__countdown {
              display: flex;
              align-items: center;
              column-gap: 10px;
              .countdown {
                width: 42px;
                height: 42px;
                background-color: white;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                border-radius: 100rem;
                div {
                  font-weight: 500;
                }
                span {
                  font-size: 9px;
                }
              }
            }
          }
        }
      }
    }
    .cart-sales {
      border-top: 1px solid #eee;
      margin: 10px 16px 0 30px;
      .cart-salesContent {
        padding: 15px 0;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        row-gap: 20px;
        column-gap: 30px;
      }
      .cart-salesItem {
        display: flex;
        align-items: center;
        column-gap: 16px;
        span {
          font-family: "Inter", sans-serif;
        }
        div {
          width: 32px;
          height: 32px;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
  .product-promotion {
    border: none;
    margin-top: 0;
    .promotion-name {
      border-bottom: none;
      padding: 0;
      text-align: left;
      font-family: "Inter", sans-serif;
    }
    .voucher-cardItem {
      background: #fff;
      padding: 7px;
      margin: 4px;
      position: relative;
      border-radius: 5px;
      filter: drop-shadow(0px 0px 3px rgba(0, 0, 0, 0.1));
      display: flex;
      min-height: 100px;
      &:before {
        content: "";
        position: absolute;
        box-sizing: border-box;
        top: 0;
        left: -3px;
        height: 100%;
        width: 10px;
        color: #fff;
        background-clip: padding-box;
        background: repeating-linear-gradient(
              #e5e5e5,
              #e5e5e5 5px,
              transparent 0,
              transparent 9px,
              #e5e5e5 0,
              #e5e5e5 10px
            )
            0/1px 100% no-repeat,
          radial-gradient(
              circle at 0 7px,
              transparent,
              transparent 2px,
              #e5e5e5ee 0,
              #e5e5e5 3px,
              currentColor 0
            )
            1px 0/100% 10px repeat-y;
      }
      .voucher-card {
        padding: 5px 5px 5px 8px;
        margin-left: 4px;
        width: 100%;
        .voucher-image {
          padding: 0 !important;
          .voucher-c {
            font-size: 14px;
            text-transform: uppercase;
            font-weight: 600;
            font-family: "Inter", sans-serif;
            border-radius: 100rem;
            display: inline-block;
            margin: 3px 0 5px;
          }
        }
      }
      .promotion-detail {
        font-family: "Inter", sans-serif;
        padding: 0;
        font-size: 13px;
        line-height: 1.2;
        margin-top: 4px;
        color: #727272;
      }
      .set-time {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 10px;
        margin-bottom: 5px;
        .time-expired {
          font-size: 12px !important;
          margin-top: 0;
          font-family: "Inter", sans-serif;
        }
        .type-promotion {
          font-size: 11px !important;
          padding: 6px;
          text-align: center;
          border: 1px solid transparent;
          border-radius: 100rem;
          width: 113px;
        }
        .conditional {
          font-size: 11px;
          text-decoration: underline;
          color: #2e72d2;
          cursor: pointer;
        }
      }
    }
  }
  .product_imageContent {
    width: 400px !important;
    height: 100px;
    overflow: hidden;
    .img-container {
      img {
        object-fit: cover !important;
      }
    }
  }
  .productProgram_horizontal {
    display: none !important;
    background-color: white;
  }
  .collaborator-action {
    margin-top: 10px;
  }
  .collaborator-action-social {
    border-radius: 100rem !important;
  }
  .link-popup {
    width: 400px;

    .copyShareContent {
      display: flex;
      border-radius: 4px;
      overflow: hidden;

      input {
        padding: 4px;
        flex-grow: 1;
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        border: 1px solid #ecf0f1;
      }
      .copyShareLink {
        margin: 0 !important;
        background-color: rgba(0, 0, 0, 0.3) !important;
        color: #ffffff !important;
        border-top-left-radius: 0 !important;
        border-bottom-left-radius: 0 !important;
        height: 100%;
        transition: all 0.5s;
        cursor: pointer;
        &:hover {
          background-color: rgba(0, 0, 0, 0.4) !important;
        }
      }
    }
  }
  .content-popup {
    background-color: #fff;
    width: 500px;
    max-width: 90%;
    padding: 1em;
    border-radius: 0.5em;
    .content-popup-link {
      margin: 10px 0;
      span {
        color: #1e79ea;
        margin-left: 4px;
      }
    }
    .btn-content-copy {
      display: flex;
      column-gap: 5px;
      align-items: center;
      color: #fff;
      background-color: #0073ff;
      padding: 10px 20px;
      border-radius: 100rem;
      cursor: pointer;
    }
  }
  .displaySell-btn {
    padding: 10px 20px;
    margin-top: 30px;
    font-size: 16px;
    border-radius: 100rem;
    white-space: nowrap;
    cursor: pointer;
    color: #fff;
    background-color: #1465e4;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .product-combo {
    margin: 30px 0px;
    .product-combo-header {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      font-weight: 600;
      padding: 15px 0px;
      border-top: 1px solid rgb(226, 229, 236);
      border-bottom: 1px solid rgb(226, 229, 236);
    }
    .product-combo-data {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      margin: 10px 0px;
      padding: 5px 0px;
    }
  }
  @media (max-width: 1200px) {
    .productProgram_horizontal {
      display: flex !important;
      column-gap: 10px;
      flex-wrap: wrap;
      align-items: center;
    }
    .productProgram_vertical {
      display: none !important;
    }
  }
  @media (max-width: 1400px) {
    .product-order-info {
      .price-wraper {
        .price-inline {
          .price {
            font-size: 26px !important;
          }
        }
      }
    }
  }
  @media (max-width: 1100px) {
    .main-info {
      flex-direction: column;
      .product_size {
        min-height: 300px !important;
      }
      .product-images {
        max-width: 100%;
        .product-thumnails {
          height: var(--height);
          .slick-list {
            height: var(--height);
            .slick-track {
              height: var(--height);
              .img-container {
                height: var(--height) !important;
                img,
                video {
                  height: var(--height) !important;
                }
              }
            }
          }
        }
      }
      .cart-salesContent {
        display: none !important;
      }
    }
    .productProgram_horizontal {
      justify-content: center;
    }
    .cart-sales {
      margin-left: 15px;
    }
    .product-images {
      width: 100% !important;
      .product_imageContent {
        width: 100% !important;
      }
      .product-thumnails .video video {
        width: 100%;
      }
      .product-thumnails .image .img-container img {
        width: 100% !important;
      }
      .product_imageContent {
        width: 80% !important;
        height: 100px;
        .slick-slider {
          height: 100%;
        }
        margin: 0 auto;
        .slick-next,
        .slick-prev {
          top: 50% !important;
        }
      }
    }
    .distributes-list {
      margin-top: 20px;
    }
    .main-info.row .product-order-info {
      width: 100% !important;
      .name {
        max-width: 100%;
      }
    }
  }
  @media (max-width: 992px) {
    .main-info {
      .product-order-info {
        .price-wraper {
          margin-top: 10px !important;
          padding-top: 1em !important;
        }
      }
      .button-cart {
        display: flex;
        width: 100%;
        column-gap: 20px;

        margin-top: 15px !important;
      }
      #outOfStock-btn {
        margin-top: calc(15px + 0.5em) !important;
      }
      .displaySell-btn {
        margin-top: calc(15px + 0.5em) !important;
      }
      .collaborator-action {
        flex-direction: row !important;
        margin-top: 15px;
      }
    }
  }
  @media (max-width: 600px) {
    .main-info {
      .cart-salesContent {
        display: none !important;
      }
      .btnFunction-cart {
        display: flex;
        gap: 10px;
        .btnMain-cart {
          display: flex;
          gap: 10px;
        }
      }
      .displaySell-btn {
        margin-top: calc(15px + 1em) !important;
      }
      .product-order-info {
        padding-top: 1em !important;
        .price-wraper {
          .price-inline {
            .price {
              font-size: 24px !important;
            }
          }
        }
      }
    }
  }
  @media (max-width: 520px) {
    .product_imageContent {
      height: 90px !important;
      .image {
        padding: 0.5rem !important;
      }
    }
  }
  @media (max-width: 500px) {
    .main-info {
      .product-order-info {
        .price-wraper {
          .price-inline {
            .price {
              font-size: 20px !important;
            }
            .past-price {
              font-size: 11px !important;
            }
            .discount {
              .discount-bg {
                padding: 4px 8px;
                font-size: 11px;
              }
            }
          }
        }
        .flashsale {
          .flashsale__header {
            flex-direction: column;
            row-gap: 20px;
            .flashsale__title {
              text-align: center;
            }
          }
        }
        .cart-action {
          .cart-inline {
            .cart-count {
              width: 25%;
            }
          }
        }
        .distributes-list {
          .distribute {
            .distribute-name {
              width: 25%;
            }
          }
        }
      }
      .displaySell-btn {
        margin-top: 0 !important;
      }
    }
    .btnFunction-cart {
      flex-direction: column;
      .btnMain-cart {
        flex-direction: column;
      }
      #addcart-btn {
        margin-top: 0 !important;
      }
    }
  }
  @media (max-width: 420px) {
    .product_imageContent {
      height: 75px !important;
      img {
        height: 65px !important;
      }
    }
  }
  @media (max-width: 370px) {
    .product_imageContent {
      height: 68px !important;
      img {
        height: 60px !important;
      }
    }
    .button-cart {
      flex-direction: column !important;
    }
  }
`;

export default function MainInfo(props) {
  let {
    id,
    name,
    images,
    distributes,
    product_discount,
    quantity_in_stock_with_distribute,
    content_for_collaborator,
    min_price,
    max_price,
    min_price_before_override,
    max_price_before_override,
    price,
    percent_collaborator,
    percent_agency,
    video_url,
    sku,
    check_inventory,
    type_share_collaborator_number,
    money_amount_collaborator,
    stars,
    count_stars,
    is_medicine,
    is_product_retail_step,
    product_retail_steps,
    slug,

    commission_agency,
  } = props.product;
  if (!images.length) images.push({ image_url: "/img/default_product.jpg" });
  let discount_percent = null;
  let discount = 0;
  let maxCommission = 0;
  let minCommission = 0;
  let elementDistributes;
  let commissions;
  const profile = useSelector((state) => state.user.profile);
  console.log("profile:;;;;;;;;;;;;;;;;;", profile);
  if (
    commission_agency === 0 &&
    profile.is_collaborator === false &&
    profile.is_agency === true &&
    profile.is_general_agency === false &&
    distributes.length > 0
  ) {
    elementDistributes = distributes[0].element_distributes;

    // Lấy giá trị commission từ mỗi phần tử và chuyển thành mảng các giá trị commission
    commissions = elementDistributes.map((item) => item.commission);

    // Lấy phần tử lớn nhất và nhỏ nhất
    maxCommission = Math.max(...commissions);
    minCommission = Math.min(...commissions);
  }
  if (profile.is_general_agency === true && distributes.length > 0) {
    elementDistributes = distributes[0].element_distributes;

    // Lấy giá trị commission từ mỗi phần tử và chuyển thành mảng các giá trị commission
    commissions = elementDistributes.map((item) => item.commission);

    // Lấy phần tử lớn nhất và nhỏ nhất
    maxCommission = Math.max(...commissions);
    minCommission = Math.min(...commissions);
  }
  if (profile.is_agent_have_general_agency === true && distributes.length > 0) {
    elementDistributes = distributes[0].element_distributes;

    // Lấy giá trị commission từ mỗi phần tử và chuyển thành mảng các giá trị commission
    commissions = elementDistributes.map((item) => item.commission);

    // Lấy phần tử lớn nhất và nhỏ nhất
    maxCommission = Math.max(...commissions);
    minCommission = Math.min(...commissions);
  }
  if (profile.is_collaborator === true && distributes.length > 0) {
    elementDistributes = distributes[0].element_distributes;

    // Lấy giá trị commission từ mỗi phần tử và chuyển thành mảng các giá trị commission
    commissions = elementDistributes.map(
      (item) => item.collaborator_commission
    );

    // Lấy phần tử lớn nhất và nhỏ nhất
    maxCommission = Math.max(...commissions);
    minCommission = Math.min(...commissions);
  }

  if (product_discount) {
    discount_percent = product_discount.value;
    discount = product_discount.discount_price;
  }
  const history = useHistory();
  const [buyNow, setBuynow] = useState([]);
  const dispatch = useDispatch();
  const myShareBtn = useRef(null);
  const vouchers = useSelector((state) => state.voucher.list);
  const bonusProducts = useSelector((state) => state.bonusProduct.list);
  const tokenInfo = useSelector((state) => state.user.tokenInfo);
  const combos = useSelector((state) => state.combo);

  const appTheme = useSelector((state) => state.app.appTheme);
  const badges = useSelector((state) => state.user.badges);

  const account = useSelector((state) => state.agency.account);
  // {account?.agency_type?.name == null
  //   ? "Chưa có cấp"
  //   : account?.agency_type?.name}
  // console.log("cấp.........: ", account?.agency_type?.name);

  const productVouchers = useMemo(() => {
    return vouchers.data.filter((v) => {
      if (v.voucher_type === 0) return false;
      return v.products.filter((p) => p.id === id).length > 0;
    });
  }, [vouchers, id]);

  const productCombos = useMemo(() => {
    return combos.list?.filter((v) => {
      return v.products_combo.filter((p) => p.product.id === id).length > 0;
    });
  }, [combos, id]);

  const productBonus = useMemo(() => {
    return (bonusProducts.data ?? []).filter((v) => {
      return (
        v.select_products.filter(
          (p) => p.product.id === id && v.ladder_reward == false
        ).length > 0
      );
    });
  }, [bonusProducts, id]);

  const productBonusLadder = useMemo(() => {
    return (bonusProducts.data ?? []).filter((v) => {
      return (
        v.bonus_products_ladder.filter(
          (p) => p.product.id === id && v.ladder_reward == true
        ).length > 0
      );
    });
  }, [bonusProducts, id]);

  const [currentImages, setCurrentImages] = useState(images);
  const [currentPrice, setCurrentPrice] = useState(null);
  const [currentSku, setCurrentSku] = useState(sku);
  const [commission, setCommission] = useState("");
  const [collCommission, setCollCommission] = useState("");
  const [currentQuantityInStock, setCurrentQuantityInStock] = useState(
    quantity_in_stock_with_distribute
  );
  const [selectedDistributes, setSelectedDistributes] = useState(-1);
  const [selectedSubDistribute, setSelectedSubdistribute] = useState(-1);
  const [selectedNumber, setSelectedNumber] = useState(
    quantity_in_stock_with_distribute > 0 || check_inventory == false
      ? 1
      : quantity_in_stock_with_distribute === -1
      ? 1
      : 0
  );
  const [customClass, setCustomClass] = useState("");
  const [showContentBuy, setShowContentBuy] = useState(false);

  const productState = useSelector((state) => state.product);
  var settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  useEffect(() => {
    if (vouchers.status === c.LOADING) dispatch(voucherActions.getAllVoucher());
    if (combos.status === c.LOADING) dispatch(comboActions.getAllCombos());
    if (bonusProducts.status === c.LOADING)
      dispatch(bonusProductActions.getAllBonusProduct());
  }, []);
  function modalClick(e) {
    if (!customClass) return;
    let containers = document.querySelectorAll(".link-popup");
    for (let i = 0; i < containers.length; i++) {
      if (containers[i].contains(e.target)) return;
    }
    setCustomClass("");
  }
  function modalClickContent(e) {
    let containers = document.querySelectorAll(".content-popup");
    for (let i = 0; i < containers.length; i++) {
      if (containers[i].contains(e.target)) return;
    }
    setShowContentBuy(false);
  }
  function increaseNumber() {
    if (
      check_inventory == false ||
      selectedNumber + 1 <= currentQuantityInStock ||
      currentQuantityInStock === -1
    )
      setSelectedNumber(selectedNumber + 1);
  }
  function decreaseNumber() {
    if (selectedNumber > 1) setSelectedNumber(selectedNumber - 1);
  }
  function handleAddCart(isBuyNow) {
    if (distributes.length && selectedDistributes === -1) {
      dispatch(productActions.setErrorDistribute(distributes[0].name));
      return;
    }
    if (
      distributes.length &&
      selectedSubDistribute === -1 &&
      distributes[0].sub_element_distribute_name
    ) {
      dispatch(
        productActions.setErrorDistribute(
          distributes[0].sub_element_distribute_name
        )
      );
      return;
    }
    dispatch(productActions.setErrorDistribute(""));
    let d = [];
    let sd = {};
    if (distributes.length) {
      sd.name = distributes[0].name;
      sd.value = distributes[0].element_distributes[selectedDistributes].name;
    }
    if (selectedSubDistribute !== -1)
      sd.sub_element_distributes =
        distributes[0].element_distributes[
          selectedDistributes
        ].sub_element_distributes[selectedSubDistribute].name;
    d.push(sd);
    dispatch(
      cartActions.addCart(
        {
          product_id: id,
          quantity: selectedNumber,
          distributes: d,
        },
        true,
        isBuyNow
      )
    );
    // if (isBuyNow == true) {
    //   window.location.href = "/gio-hang";
    //   return;
    // }
    dispatch(userActions.getUserBadges());
  }
  function hanldeShare() {
    myShareBtn.current.click();
  }
  function handleToggleWishList() {
    dispatch(productActions.toggleWishList(id, props.isLiked));
    dispatch(userActions.getUserBadges());
  }
  function handleShowContentBuy() {
    setShowContentBuy(true);
  }
  const sliderRef = useRef();
  const goToImage = (index) => {
    sliderRef.current.slickGoTo(index);
  };

  ////////////////////////////
  function handleSelectDistribute(index) {
    setSelectedDistributes(index);
    let p;
    let q;
    let sku;
    let c;
    let coll;

    var image = distributes[0].element_distributes[index].image_url;
    if (image) {
      if (currentImages[0].name !== undefined) {
        currentImages.shift();
      }
      currentImages.unshift(distributes[0].element_distributes[index]);
      setCurrentImages(currentImages);
      goToImage(0);
    }
    if (selectedSubDistribute !== -1) {
      if (
        distributes[0].element_distributes[index].sub_element_distributes
          .length > 0
      ) {
        p =
          distributes[0].element_distributes[index].sub_element_distributes[
            selectedSubDistribute
          ].price ?? min_price;
        q =
          distributes[0].element_distributes[index].sub_element_distributes[
            selectedSubDistribute
          ].quantity_in_stock ?? quantity_in_stock_with_distribute;
        sku =
          distributes[0].element_distributes[index].sub_element_distributes[
            selectedSubDistribute
          ].sku ?? currentSku;
      } else {
        p = min_price;
        q = quantity_in_stock_with_distribute;
        sku = currentSku;
      }

      setCurrentPrice(p);
      setCurrentQuantityInStock(q);
      setCurrentSku(sku);
      return;
    }
    if (
      distributes[0].element_distributes[index].sub_element_distributes
        .length === 0
    ) {
      p = distributes[0].element_distributes[index].price;
      sku = distributes[0].element_distributes[index].sku;
      q = distributes[0].element_distributes[index].quantity_in_stock;
      c = distributes[0].element_distributes[index].commission;
      coll = distributes[0].element_distributes[index].collaborator_commission;

      setCollCommission(coll);
      setCommission(c);
      setCurrentPrice(p ? p : currentPrice);
      setCurrentQuantityInStock(q);
      setCurrentSku(sku ? sku : currentSku);
    }
  }

  ////////////////////////////////

  function handleSelectSubdistribute(index, price) {
    setSelectedSubdistribute(index);
    let p;
    let q;
    let sku;
    if (selectedDistributes !== -1) {
      if (
        distributes[0].element_distributes[selectedDistributes]
          .sub_element_distributes.length > 0
      ) {
        p =
          distributes[0].element_distributes[selectedDistributes]
            .sub_element_distributes[index].price;
        q =
          distributes[0].element_distributes[selectedDistributes]
            .sub_element_distributes[index].quantity_in_stock;
        sku =
          distributes[0].element_distributes[selectedDistributes]
            .sub_element_distributes[index].sku;
      } else {
        p = min_price;
        q = quantity_in_stock_with_distribute;
        sku = currentSku;
      }
      setCurrentPrice(p ? p : currentPrice);
      setCurrentSku(sku ? sku : currentSku);
      setCurrentQuantityInStock(q);
    }
  }
  const textAreaRef = useRef(null);
  function copyVoucherCode(code) {
    navigator.clipboard.writeText(code);
    textAreaRef.current?.select();
    document.execCommand("copy");
    dispatch(appActions.changePopup(c.AUTOHIDE_POPUP, "Đã lưu mã giảm giá"));
  }
  function togglePopup() {
    setCustomClass(customClass ? "" : "center");
  }
  function copySharedLink() {
    const link = showLinkAffiliate();
    navigator.clipboard.writeText(link);
    togglePopup();
    dispatch(appActions.changePopup(c.AUTOHIDE_POPUP, "Copy Link thành công"));
  }
  function copySharedContent() {
    const link = showLinkAffiliate();
    navigator.clipboard.writeText(
      `${content_for_collaborator}\nLink mua hàng: ${link}`
    );
    dispatch(appActions.changePopup(c.AUTOHIDE_POPUP, "Copy Link thành công"));
  }

  function encodedString(str) {
    return btoa(str);
  }

  function onChangeQuantity(e) {
    setSelectedNumber(e.target.value);
  }

  function handleShowVoucherPopup(id) {
    var productVoucher = productVouchers?.filter((v) => {
      return v.id === id;
    })[0];
    dispatch({ type: c.GET_VOUCHERS_POPUP, data: productVoucher });
    dispatch(appActions.changePopup(c.VOUCHER_DETAIL_POPUP));
  }

  function handleShowComboPopup(id) {
    var productCombo = productCombos?.filter((v) => {
      return v.id === id;
    })[0];
    dispatch({ type: c.GET_COMBOS_POPUP, data: productCombo });
    dispatch(appActions.changePopup(c.COMBO_DETAIL_POPUP));
  }

  function handleShowBonusProductPopup(id) {
    var bonus = productBonus?.filter((v) => {
      return v.id === id;
    })[0];
    dispatch({ type: c.GET_BONUS_PRODUCT_POPUP, data: bonus });
    dispatch(appActions.changePopup(c.BONUS_PRODUCT_DETAIL_POPUP));
  }

  function handleShowBonusProductLadderPopup(id) {
    var bonus = productBonusLadder?.filter((v) => {
      return v.id === id;
    })[0];
    dispatch({ type: c.GET_BONUS_PRODUCT_LADDER_POPUP, data: bonus });
    dispatch(appActions.changePopup(c.BONUS_PRODUCT_LADDER_DETAIL_POPUP));
  }
  var _curentImages = currentImages ? [...currentImages] : [];
  if (video_url !== null && video_url !== "") {
    _curentImages.unshift(video_url);
  }

  const handleShowModalChat = () => {
    const btnChat = document.getElementById("btn__chat__message");
    if (btnChat) {
      btnChat.click();
    }
  };

  function showListName(v) {
    var nameListProductBonus = [];

    if (v && v.bonus_products_ladder?.length > 0) {
      v.bonus_products_ladder?.forEach((element, index) => {
        console.log(element);
        if (index == v.bonus_products_ladder.length - 1)
          nameListProductBonus.push(
            <div style={{ marginTop: "8px" }}>
              {`- Mua ${element.from_quantity} sản phẩm ${element.product.name} - Tặng  ${element.bo_quantity}` +
                " " +
                element.bo_product.name}
            </div>
          );
        else
          nameListProductBonus.push(
            <div style={{ marginTop: "8px" }}>
              {`- Mua ${element.from_quantity} sản phẩm ${element.product.name} - Tặng ${element.bo_quantity}` +
                " " +
                element.bo_product.name}
            </div>
          );
      });
    }
    return nameListProductBonus;
  }
  // handle Timer
  const timerRef = useRef();
  const [timer, setTimer] = useState({
    seconds: 0,
    minutes: 0,
    hours: 0,
    days: 0,
  });

  const startTimer = () => {
    const total = moment(product_discount.end_time).diff(moment());

    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    const days = Math.floor(total / 1000 / 60 / 60 / 24);
    // if (total >= 0) {
    setTimer({
      seconds: seconds > 9 ? seconds : "0" + seconds,
      minutes: minutes > 9 ? minutes : "0" + minutes,
      hours: hours > 9 ? hours : "0" + hours,
      days: days > 9 ? days : "0" + days,
    });
    // }
  };
  useEffect(() => {
    if (product_discount?.value) {
      const id = setInterval(() => {
        startTimer();
      }, 1000);
      timerRef.current = id;
    }
    return () => {
      clearInterval(timerRef.current);
    };
  }, [product_discount?.value]);
  //Handle Image border
  const [selectedImage, setSelectedImage] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);
  const handleMouseOverImage = (e, index) => {
    setSelectedImage(index);
    sliderRef.current.slickGoTo(index);
  };
  const handleShowImageModal = () => {
    setShowImageModal(true);
  };

  const [heightProduct, setHeightProduct] = useState();
  const handleChangeSizeHeightProduct = () => {
    const productItem = document.querySelector(".product-item");
    setHeightProduct(productItem.getBoundingClientRect().width);
  };
  useEffect(() => {
    handleChangeSizeHeightProduct();
    window.addEventListener("resize", handleChangeSizeHeightProduct);
    return () => {
      window.removeEventListener("resize", handleChangeSizeHeightProduct);
    };
  }, []);

  const renderStarRating = (rating = 5) => {
    return (
      <div
        style={{
          display: "flex",
          columnGap: "3px",
          alignItems: "center",
        }}
      >
        <div className="star-rating">
          {Array(5)
            .fill(null)
            .map((v, index) => (
              <i
                key={index}
                style={{
                  color:
                    Math.floor(rating) >= index + 1 ? "#e4d237" : "#c4bdbd",
                  fontSize: "20px",
                  marginRight: "4px",
                }}
                className={"fas fa-star"}
              ></i>
            ))}
        </div>
        {appTheme.is_show_product_count_stars ? (
          <div
            style={{
              fontSize: "20px",
            }}
          >
            ({count_stars})
          </div>
        ) : null}
      </div>
    );
  };

  ///////////////////////////
  const showPrice = () => {
    let priceRetailStep = 0;

    if (badges.status_agency !== 1 && is_product_retail_step) {
      priceRetailStep =
        product_retail_steps.filter(
          (product, index) =>
            Number(selectedNumber) > 0 &&
            ((product.from_quantity <= Number(selectedNumber) &&
              product.to_quantity >= Number(selectedNumber)) ||
              (index === product_retail_steps.length - 1 &&
                product.from_quantity <= Number(selectedNumber)))
        )?.[0]?.price || 0;
    }
    return (
      <div className="price-inline">
        {priceRetailStep !== 0 ? (
          <>
            <div className="price" style={{ color: appTheme.color_main_1 }}>
              {formatPriceOrContact(
                discount_percent == null
                  ? priceRetailStep
                  : priceRetailStep - priceRetailStep * discount_percent * 0.01
              )}
            </div>
            {discount_percent > 0 ? (
              <div>
                {product_discount && (
                  <div>
                    <div className="row">
                      <div className="past-price">
                        {formatPrice(priceRetailStep)}
                      </div>
                      <div className="discount">
                        <div
                          className="discount-bg"
                          style={{
                            backgroundColor: appTheme.color_main_1,
                          }}
                        >
                          -{discount_percent}%
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : null}
          </>
        ) : (
          <>
            {currentPrice == null ? (
              min_price === max_price ? (
                <div className="price" style={{ color: appTheme.color_main_1 }}>
                  {formatPriceOrContact(
                    discount_percent == null
                      ? min_price
                      : min_price - min_price * discount_percent * 0.01
                  )}
                </div>
              ) : (
                <div className="price" style={{ color: appTheme.color_main_1 }}>
                  {formatPriceOrContact(
                    discount_percent == null
                      ? min_price
                      : min_price - min_price * discount_percent * 0.01
                  )}
                  {" - "}

                  {formatPriceOrContact(
                    discount_percent == null
                      ? max_price
                      : max_price - max_price * discount_percent * 0.01
                  )}
                </div>
              )
            ) : (
              <div className="price" style={{ color: appTheme.color_main_1 }}>
                {formatPriceOrContact(
                  discount_percent == null
                    ? currentPrice
                    : currentPrice - currentPrice * discount_percent * 0.01
                )}
              </div>
            )}
            {discount_percent > 0 && (
              <div>
                {product_discount && (
                  <div>
                    {currentPrice == null ? (
                      min_price === max_price ? (
                        <div className="row">
                          <div className="past-price">
                            {formatPrice(
                              currentPrice == null ? min_price : currentPrice
                            )}
                          </div>
                          <div className="discount">
                            <div
                              className="discount-bg"
                              style={{
                                backgroundColor: appTheme.color_main_1,
                              }}
                            >
                              -{discount_percent}%
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="row">
                          <div className="past-price">
                            {formatPrice(
                              currentPrice == null ? min_price : currentPrice
                            )}
                            {" - "}
                            {formatPrice(
                              currentPrice == null ? max_price : currentPrice
                            )}
                          </div>
                          <div className="discount">
                            <div
                              className="discount-bg"
                              style={{
                                backgroundColor: appTheme.color_main_1,
                              }}
                            >
                              -{discount_percent}%
                            </div>
                          </div>
                        </div>
                      )
                    ) : (
                      <div className="row">
                        <div className="past-price">
                          {formatPrice(
                            currentPrice == null ? min_price : currentPrice
                          )}
                        </div>
                        <div className="discount">
                          <div
                            className="discount-bg"
                            style={{
                              backgroundColor: appTheme.color_main_1,
                            }}
                          >
                            -{discount_percent}%
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    );
  };

  ////////////////////////////
  const showCommission = () => {
    let priceRetailStep = 0;

    if (badges.status_agency !== 1 && is_product_retail_step) {
      priceRetailStep =
        product_retail_steps.filter(
          (product, index) =>
            Number(selectedNumber) > 0 &&
            ((product.from_quantity <= Number(selectedNumber) &&
              product.to_quantity >= Number(selectedNumber)) ||
              (index === product_retail_steps.length - 1 &&
                product.from_quantity <= Number(selectedNumber)))
        )?.[0]?.price || 0;
    }

    return priceRetailStep !== 0 ? (
      <div
        className="price-save"
        style={{
          color: appTheme.color_main_1,
        }}
      >
        {formatPrice(
          priceRetailStep *
            (percent_collaborator * 0.01) *
            (1 - discount_percent * 0.01)
        )}{" "}
      </div>
    ) : (
      <>
        {type_share_collaborator_number === 0 ? (
          <div>
            {currentPrice == null ? (
              min_price === max_price || percent_collaborator === 0 ? (
                <div
                  className="price-save"
                  style={{
                    color: appTheme.color_main_1,
                  }}
                >
                  {formatPrice(
                    (discount == 0 ? min_price : discount) *
                      (percent_collaborator * 0.01)
                  )}
                </div>
              ) : (
                <div
                  className="price-save"
                  style={{
                    color: appTheme.color_main_1,
                  }}
                >
                  {formatPrice(
                    discount_percent == null
                      ? min_price *
                          (percent_collaborator * 0.01) *
                          (1 - discount_percent * 0.01)
                      : min_price *
                          (1 - discount_percent * 0.01) *
                          (percent_collaborator * 0.01)
                  )}{" "}
                  -{" "}
                  {formatPrice(
                    discount_percent == null
                      ? max_price * percent_collaborator * 0.01
                      : max_price *
                          (1 - discount_percent * 0.01) *
                          (percent_collaborator * 0.01)
                  )}
                </div>
              )
            ) : (
              <div
                className="price-save"
                style={{
                  color: appTheme.color_main_1,
                }}
              >
                {formatPrice(
                  discount_percent == null
                    ? currentPrice *
                        (percent_collaborator * 0.01) *
                        (1 - discount_percent * 0.01)
                    : currentPrice *
                        (1 - discount_percent * 0.01) *
                        (percent_collaborator * 0.01)
                )}
              </div>
            )}
          </div>
        ) : (
          <div
            className="price-save"
            style={{
              color: appTheme.color_main_1,
            }}
          >
            {formatPrice(money_amount_collaborator)}
          </div>
        )}
      </>
    );
  };

  const showLinkAffiliate = () => {
    const link = moment().valueOf();
    return `${window.location.origin}/san-pham/${slug}-${id}${
      profile?.id
        ? `?cowc_id=${profile.id}&rp=${encodedString(
            profile.phone_number
          )}&ex=${link}`
        : ""
    }`;
  };

  return (
    <MainInfoStyles
      heightProduct={
        heightProduct * ratioHeightProduct(Number(appTheme.home_page_type))
      }
    >
      <div className="breadcrumbs">
        <h4>
          <span
            onClick={() => {
              window.location.href = "/";
            }}
          >
            Trang chủ /{" "}
          </span>
          <span
            onClick={() => {
              window.location.href = "/san-pham";
            }}
          >
            Sản phẩm /{" "}
          </span>
          <span className="breadcrumbs_product">{name}</span>
        </h4>
      </div>
      <div className="main-info row">
        <div className="product-images">
          <div className="product-thumnails">
            <button className="like-btn" onClick={handleToggleWishList}>
              {props.isLiked ? (
                <i className="fas fa-heart"></i>
              ) : (
                <i className="far fa-heart"></i>
              )}
            </button>
            <div className="product-fixedImage">
              <Slider
                ref={sliderRef}
                beforeChange={(oldIndex, i) => setSelectedImage(i)}
                {...settings}
                style={{ width: "100%", height: "100%" }}
              >
                {_curentImages.map((v, i) => {
                  if (i == 0 && video_url != "" && video_url != null) {
                    return (
                      <div className="video" key={i}>
                        <video
                          heightProduct={
                            heightProduct *
                            ratioHeightProduct(Number(appTheme.home_page_type))
                          }
                          onClick={handleShowImageModal}
                          className="product-item"
                          style={{
                            width: "400px",
                            borderRadius: "10px",
                            cursor: "pointer",
                          }}
                          controls
                          muted
                          autoPlay={"autoplay"}
                          preLoad="auto"
                          loop
                        >
                          <source src={v} type="video/mp4" />
                        </video>
                      </div>
                    );
                  } else {
                    return (
                      <div className="image" key={i}>
                        <div className="img-container">
                          <img
                            heightProduct={
                              heightProduct *
                              ratioHeightProduct(
                                Number(appTheme.home_page_type)
                              )
                            }
                            className="product-item"
                            onClick={handleShowImageModal}
                            src={v.image_url}
                            alt={name}
                            style={{
                              background: `url(${c.DEFAULT_PRODUCT_IMG})`,
                              backgroundSize: "contain",
                              width: "400px",
                              borderRadius: "10px",
                              cursor: "pointer",
                            }}
                          />
                        </div>
                      </div>
                    );
                  }
                })}
              </Slider>
            </div>
            <ModalImageProduct
              video_url={video_url}
              _curentImages={_curentImages}
              name={name}
              setShowImageModal={setShowImageModal}
              showImageModal={showImageModal}
              imageIndex={selectedImage}
            ></ModalImageProduct>
          </div>
          <div
            className="product_imageContent"
            style={{
              width: "428px",
            }}
          >
            <Slider
              {...{
                infinite: true,
                slidesToShow: 4,
                slidesToScroll: 1,
              }}
            >
              {_curentImages.map((v, i) => {
                if (i == 0 && video_url != "" && video_url != null) {
                  return (
                    <div className="video" key={i}>
                      <video
                        onMouseOver={(e) => handleMouseOverImage(e, i)}
                        style={{
                          height: "80px",
                          borderRadius: "6px",
                          width: "100%",
                          cursor: "pointer",
                          border: `2px solid ${
                            selectedImage === i
                              ? appTheme.color_main_1
                              : "transparent"
                          }`,
                        }}
                        controls
                        muted
                        autoPlay={"autoplay"}
                        preLoad="auto"
                        loop
                      >
                        <source src={v} type="video/mp4" />
                      </video>
                    </div>
                  );
                } else {
                  return (
                    <div className="image" key={i}>
                      <div className="img-container">
                        <img
                          onMouseOver={(e) => handleMouseOverImage(e, i)}
                          src={v.image_url}
                          alt={name}
                          style={{
                            background: `url(${c.DEFAULT_PRODUCT_IMG})`,
                            backgroundSize: "contain",
                            height: "80px",
                            borderRadius: "6px",
                            cursor: "pointer",
                            border: `2px solid ${
                              selectedImage === i
                                ? appTheme.color_main_1
                                : "transparent"
                            }`,
                          }}
                        />
                      </div>
                    </div>
                  );
                }
              })}
            </Slider>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <div
            className="product_size"
            style={{
              display: "flex",
            }}
          >
            <div className="product-order-info">
              <h1 className="name">{name}</h1>
              {renderStarRating(stars)}
              <div
                className={`sku ${
                  currentSku == null || currentSku?.length == 0 ? "hide" : ""
                }`}
                style={{ margin: "10px 0" }}
              >
                <p>
                  {check_inventory == false
                    ? "Tình trạng: "
                    : currentQuantityInStock === null ||
                      currentQuantityInStock < 0 ||
                      (currentQuantityInStock !== 0 &&
                        selectedNumber <= currentQuantityInStock)
                    ? "Số lượng: "
                    : null}
                  <span style={{ color: appTheme.color_main_1 }}>
                    {check_inventory == false
                      ? "Còn hàng "
                      : currentQuantityInStock === null ||
                        currentQuantityInStock < 0 ||
                        (currentQuantityInStock !== 0 &&
                          selectedNumber <= currentQuantityInStock)
                      ? `${currentQuantityInStock} sản phẩm `
                      : null}
                  </span>
                  <div style={{ display: "inline-block", color: "#999" }}>
                    |{" "}
                  </div>{" "}
                  Mã SKU:{" "}
                  <span style={{ color: appTheme.color_main_1 }}>
                    {currentSku || "Đang cập nhập"}
                  </span>
                </p>
              </div>
              <div>
                <div>
                  <div className="price-wraper">
                    {showPrice()}

                    <div>
                      {badges.status_collaborator === 1 ? (
                        <span
                          className="save"
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <span
                            style={{
                              display: "inline-block",
                              marginRight: "5px",
                            }}
                          >
                            Hoa hồng:
                          </span>
                          <label
                            style={{
                              color: "deeppink",
                            }}
                          >
                            {distributes.length === 0
                              ? formatPrice(money_amount_collaborator)
                              : collCommission
                              ? formatPrice(collCommission)
                              : formatPrice(minCommission) +
                                " - " +
                                formatPrice(maxCommission)}
                          </label>
                          {/* {collCommission
                            ? formatPrice(collCommission)
                            : money_amount_collaborator != 0
                            ? formatPrice(money_amount_collaborator)
                            : formatPrice(minCommission) +
                              " - " +
                              formatPrice(maxCommission)} */}
                          {/* {formatPrice(minCommission) +
                            " - " +
                            formatPrice(maxCommission)}
                          {formatPrice(collCommission)} */}
                          {/* {showCommission()} */}
                        </span>
                      ) : null}
                      {badges.status_agency === 1 ? (
                        <>
                          <span
                            className="save"
                            style={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            {/* <span
                              style={{
                                display: "inline-block",
                                marginRight: "5px",
                              }}
                            >
                              Giá bán lẻ
                            </span> */}
                            {/* {badges.status_agency === 1 ? (
                              <div>
                                {min_price_before_override ===
                                max_price_before_override ? (
                                  <div
                                    className="price-save"
                                    style={{
                                      color: appTheme.color_main_1,
                                    }}
                                  >
                                    {formatPrice(min_price_before_override)}
                                  </div>
                                ) : (
                                  <div
                                    className="price-save"
                                    style={{
                                      color: appTheme.color_main_1,
                                    }}
                                  >
                                    {formatPrice(min_price_before_override)} -
                                    {formatPrice(max_price_before_override)}
                                  </div>
                                )}
                              </div>
                            ) : null} */}
                          </span>

                          <div
                            className="save"
                            style={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <span
                              style={{
                                display: "inline-block",
                                marginRight: "5px",
                              }}
                            >
                              Hoa hồng:
                            </span>
                            <div>
                              <div
                                className="price-save"
                                style={{
                                  color: appTheme.color_main_1,
                                }}
                              >
                                {/* 10000 */}
                              </div>

                              {currentPrice == null ? (
                                min_price_before_override ===
                                max_price_before_override ? (
                                  <div
                                    className="price-save"
                                    style={{
                                      color: appTheme.color_main_1,
                                    }}
                                  >
                                    <label
                                      style={{
                                        color: "deeppink",
                                      }}
                                    >
                                      {formatPrice(commission_agency)}
                                    </label>
                                    {/* {formatPrice(
                                        (discount == 0
                                          ? min_price_before_override
                                          : min_price_before_override) *
                                          (percent_agency * 0.01)
                                      )} */}
                                  </div>
                                ) : (
                                  <div
                                    className="price-save"
                                    style={{
                                      color: appTheme.color_main_1,
                                    }}
                                  >
                                    <label
                                      style={{
                                        color: "deeppink",
                                      }}
                                    >
                                      {formatPrice(minCommission) +
                                        " - " +
                                        formatPrice(maxCommission)}
                                    </label>
                                    {/* {formatPrice(
                                        discount_percent == null
                                          ? min_price_before_override *
                                              (percent_agency * 0.01) *
                                              (1 - discount_percent * 0.01)
                                          : min_price_before_override *
                                              (1 - discount_percent * 0.01) *
                                              (percent_agency * 0.01)
                                      )}{" "}
                                      -{" "}
                                      {formatPrice(
                                        discount_percent == null
                                          ? max_price_before_override *
                                              percent_agency *
                                              0.01
                                          : max_price_before_override *
                                              (1 - discount_percent * 0.01) *
                                              (percent_agency * 0.01)
                                      )} */}
                                  </div>
                                )
                              ) : (
                                <div
                                  className="price-save"
                                  style={{
                                    color: appTheme.color_main_1,
                                  }}
                                >
                                  <label
                                    style={{
                                      color: "deeppink",
                                    }}
                                  >
                                    {formatPrice(commission)}
                                  </label>
                                  {/* {formatPrice(
                                      discount_percent == null
                                        ? currentPrice *
                                            (percent_agency * 0.01) *
                                            (1 - discount_percent * 0.01)
                                        : currentPrice *
                                            (1 - discount_percent * 0.01) *
                                            (percent_agency * 0.01)
                                    )} */}
                                </div>
                              )}
                            </div>
                          </div>
                        </>
                      ) : null}
                    </div>
                    {product_discount?.end_time && (
                      <div className="flashsale">
                        <div className="flashsale__header">
                          <div className="flashsale__title">
                            <h5>ưu đãi hot!!</h5>
                            <span>Thời gian giảm giá còn</span>
                          </div>
                          <div className="flashsale__countdown-wrapper">
                            <div className="flashsale__countdown">
                              <div
                                className="countdown"
                                style={{
                                  border: `1px solid ${appTheme.color_main_1}`,
                                }}
                              >
                                <div
                                  style={{
                                    color: appTheme.color_main_1,
                                  }}
                                >
                                  {timer.days}
                                </div>
                                <span style={{ color: appTheme.color_main_1 }}>
                                  Ngày
                                </span>
                              </div>
                              <div
                                className="countdown"
                                style={{
                                  border: `1px solid ${appTheme.color_main_1}`,
                                }}
                              >
                                <div
                                  style={{
                                    color: appTheme.color_main_1,
                                  }}
                                >
                                  {timer.hours}
                                </div>
                                <span style={{ color: appTheme.color_main_1 }}>
                                  Giờ
                                </span>
                              </div>
                              <div
                                className="countdown"
                                style={{
                                  border: `1px solid ${appTheme.color_main_1}`,
                                }}
                              >
                                <div
                                  style={{
                                    color: appTheme.color_main_1,
                                  }}
                                >
                                  {timer.minutes}
                                </div>
                                <span style={{ color: appTheme.color_main_1 }}>
                                  Phút
                                </span>
                              </div>
                              <div
                                className="countdown"
                                style={{
                                  border: `1px solid ${appTheme.color_main_1}`,
                                }}
                              >
                                <div
                                  style={{
                                    color: appTheme.color_main_1,
                                  }}
                                >
                                  {timer.seconds}
                                </div>
                                <span style={{ color: appTheme.color_main_1 }}>
                                  Giây
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="distributes-list">
                    {distributes.map((d, i) => (
                      <div className="distribute" key={i}>
                        <div className="distribute-name">{d.name}</div>
                        <div className="distribute-values">
                          {d.element_distributes.map((v, j) => (
                            <button
                              style={
                                selectedDistributes === j
                                  ? {
                                      backgroundColor: appTheme.color_main_1,
                                      color: "white",
                                    }
                                  : {}
                              }
                              onClick={() =>
                                handleSelectDistribute(j, v.price ?? min_price)
                              }
                              key={j}
                            >
                              {v.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                    {distributes != null &&
                      distributes.length > 0 &&
                      distributes[0] &&
                      distributes[0].sub_element_distribute_name != null &&
                      distributes[0].sub_element_distribute_name && (
                        <div className="distribute">
                          <div className="distribute-name">
                            {distributes[0].sub_element_distribute_name}
                          </div>
                          <div className="distribute-values">
                            {distributes[0].element_distributes != null &&
                              distributes[0].element_distributes.length > 0 &&
                              distributes[0].element_distributes[0].sub_element_distributes.map(
                                (v, i) => (
                                  <button
                                    style={
                                      selectedSubDistribute === i
                                        ? {
                                            backgroundColor:
                                              appTheme.color_main_1,
                                            color: "white",
                                          }
                                        : {}
                                    }
                                    onClick={() => handleSelectSubdistribute(i)}
                                    key={i}
                                  >
                                    {v.name}
                                  </button>
                                )
                              )}
                          </div>
                        </div>
                      )}
                  </div>
                  {badges.status_agency !== 1 &&
                  is_product_retail_step &&
                  product_retail_steps?.length > 0 ? (
                    <div class="product-combo">
                      <div class="product-combo-header">
                        <div>Mua từ</div>
                        <div>Đến</div>
                        <div>Đơn giá</div>
                      </div>
                      {product_retail_steps.map((product, index) => (
                        <div
                          class="product-combo-data"
                          key={index}
                          style={{
                            borderBottom:
                              index === product_retail_steps.length - 1
                                ? "1px solid transparent"
                                : "1px solid rgb(226, 229, 236)",
                          }}
                        >
                          <div>{product.from_quantity}</div>
                          <div>{product.to_quantity}</div>
                          <div>
                            {formatPriceOrContact(product.price)}/
                            <span class="product-cost-text">sản phẩm</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : null}

                  <div className="cart-action">
                    {currentQuantityInStock === null ||
                    currentQuantityInStock < 0 ||
                    check_inventory == false ||
                    (currentQuantityInStock !== 0 &&
                      selectedNumber <= currentQuantityInStock) ? (
                      <div className="cart-inline">
                        <div className="cart-count">Số lượng </div>
                        <div className="change-quantity">
                          <button onClick={decreaseNumber}>-</button>
                          <input
                            type="number"
                            value={selectedNumber}
                            onChange={onChangeQuantity}
                            name="quantity"
                          />
                          <button onClick={increaseNumber}>+</button>
                        </div>
                      </div>
                    ) : null}

                    {productState.error_distribute !== "" ? (
                      <p
                        style={{
                          color: "red",
                          marginTop: 10,
                        }}
                      >
                        Chưa chọn: {productState.error_distribute}
                      </p>
                    ) : (
                      ""
                    )}
                    <div className="actions">
                      <div style={{ display: "none" }}>
                        <FacebookShareButton
                          ref={myShareBtn}
                          url={showLinkAffiliate()}
                          quote={content_for_collaborator}
                        >
                          <FacebookIcon size={40} round />
                        </FacebookShareButton>
                      </div>
                      <div
                        style={{
                          display: "flex",
                        }}
                        className="btnFunction-cart"
                      >
                        {is_medicine ? (
                          <>
                            <div className="button-cart">
                              <div className="btnMain-cart">
                                {tokenInfo ? (
                                  <button
                                    id="addcart-btn"
                                    onClick={handleShowModalChat}
                                    style={{
                                      color: appTheme.color_main_1,
                                      background: "white",
                                    }}
                                  >
                                    Gửi tin nhắn
                                  </button>
                                ) : null}

                                <button
                                  id="addcart-btn"
                                  style={{
                                    background: appTheme.color_main_1,
                                    color: appTheme.color_main_1,
                                  }}
                                >
                                  <a
                                    href={
                                      "tel:" + appTheme.phone_number_hotline
                                    }
                                    // target
                                    style={{
                                      color: "#ffffff",
                                    }}
                                  >
                                    Tư vấn ngay
                                  </a>
                                </button>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            {currentQuantityInStock === null ||
                            currentQuantityInStock < 0 ||
                            check_inventory == false ||
                            (currentQuantityInStock !== 0 &&
                              selectedNumber <= currentQuantityInStock) ? (
                              <div className="button-cart">
                                <div className="btnMain-cart">
                                  <button
                                    id="addcart-btn"
                                    onClick={() => handleAddCart(false)}
                                    style={{
                                      color: appTheme.color_main_1,
                                      background: "white",
                                    }}
                                  >
                                    <i
                                      class="fas fa-cart-plus"
                                      style={{ marginRight: "10px" }}
                                    ></i>
                                    Thêm vào giỏ hàng
                                  </button>

                                  <button
                                    id="addcart-btn"
                                    onClick={() => handleAddCart(true)}
                                    style={{
                                      background: appTheme.color_main_1,
                                      color: appTheme.color_main_1,
                                    }}
                                  >
                                    {profile.status === "LOADING"
                                      ? "Mua ngay"
                                      : null}
                                    {profile?.is_collaborator === false &&
                                    profile?.is_agency === false &&
                                    profile?.is_agent_have_general_agency ===
                                      false &&
                                    profile?.is_general_agency === false
                                      ? "Mua ngay"
                                      : null}
                                    {profile?.is_collaborator === true
                                      ? "Mua ngay"
                                      : null}
                                    {profile?.is_agency === true
                                      ? "Nhập hàng"
                                      : null}
                                    {profile?.is_agent_have_general_agency ===
                                    true
                                      ? "Nhập hàng"
                                      : null}
                                    {profile?.is_general_agency === true
                                      ? "Nhập hàng"
                                      : null}
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <button
                                id="outOfStock-btn"
                                style={{
                                  background: "#757575",
                                }}
                              >
                                {currentQuantityInStock == 0
                                  ? "Hết hàng"
                                  : "Vượt quá số lượng trong kho"}
                              </button>
                            )}

                            {profile?.is_collaborator ? (
                              <div>
                                <div
                                  className="displaySell-btn"
                                  onClick={handleShowContentBuy}
                                >
                                  Đăng bán
                                </div>
                              </div>
                            ) : null}
                            {profile?.is_agent_have_general_agency ? (
                              <div>
                                <div
                                  className="displaySell-btn"
                                  onClick={handleShowContentBuy}
                                >
                                  Đăng bán
                                </div>
                              </div>
                            ) : null}

                            {profile?.is_agency &&
                            !profile?.is_general_agency ? (
                              <div>
                                <div
                                  className="displaySell-btn"
                                  onClick={handleShowContentBuy}
                                >
                                  Đăng bán
                                </div>
                              </div>
                            ) : null}
                            {/* {profile?.is_collaborator ||
                            profile?.is_agent_have_general_agency ||
                            profile?.is_agency ? (
                              // profile?.is_general_agency === false ||
                              // profile?.referral_phone_number
                              <div>
                                <div
                                  className="displaySell-btn"
                                  onClick={handleShowContentBuy}
                                >
                                  Đăng bán
                                </div>
                              </div>
                            ) : null} */}
                          </>
                        )}
                      </div>

                      <SuggestBonusProduct idMainProduct={id} />
                      {profile?.is_collaborator ||
                      profile?.is_general_agency === false ? (
                        <div className="collaborator-action">
                          <>
                            <div className="share">
                              <label>Chia sẻ: </label>
                              <button
                                className="collaborator-action-social"
                                onClick={hanldeShare}
                                style={{
                                  marginLeft: "10px",
                                  borderRadius: "10px",
                                  cursor: "pointer",
                                }}
                              >
                                <i className="fab fa-facebook-f"></i>
                              </button>
                            </div>
                            <button
                              className="collaborator-action-social-link"
                              onClick={togglePopup}
                              id="link-btn1"
                              style={{
                                cursor: "pointer",
                                backgroundColor: appTheme.color_main_1,
                                borderRadius: "100rem",
                                width: "2rem",
                                height: "2rem",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                color: "white",
                              }}
                            >
                              <i className="fa fa-link"></i>
                            </button>
                          </>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Voucher */}
            {/* Voucher */}
            {(productCombos?.length > 0 || productVouchers?.length > 0) && (
              <div
                className="productProgram_vertical"
                style={{
                  padding: "10px",
                  paddingBottom: "10px",
                  display: "flex",
                  flexDirection: "column",
                  rowGap: "10px",
                  width: "225px",
                  flexShrink: "0",
                }}
              >
                {productCombos.length > 0 && (
                  <div className="product-voucher product-promotion">
                    {/* Mã giảm giá <br /> */}
                    <div className="column">
                      {productCombos.map((v) => (
                        <div className="voucher-cardItem">
                          <div className="voucher-card" key={v.id}>
                            <div className="voucher-image">
                              <div
                                className="voucher-c"
                                style={{
                                  color: appTheme.color_main_1,
                                }}
                              >
                                {v.name}
                              </div>
                            </div>
                            <div className="voucher-info">
                              <div>
                                <div>
                                  <div className="promotion-detail">
                                    <div>
                                      <div>
                                        {v.discount_for != 1
                                          ? v.discount_type === 0
                                            ? "Giảm: " +
                                              formatPrice(
                                                Number(v.value_discount)
                                              ) +
                                              ` cho ${
                                                v.amount ? v.amount : "những"
                                              } đơn hàng sớm nhất`
                                            : "Giảm: " +
                                              v.value_discount +
                                              "%" +
                                              ` cho ${
                                                v.amount ? v.amount : "những"
                                              } đơn hàng sớm nhất`
                                          : v.is_free_ship === true
                                          ? "Miễn phí vận chuyển"
                                          : "Freeship: " +
                                            formatPrice(
                                              Number(v.ship_discount_value)
                                            )}
                                      </div>
                                    </div>
                                    <div className="set-time">
                                      {/* <div className="time-expired">
                                        HSD:{" "}
                                        {moment(v.end_time.slice(0, 10)).format(
                                          "DD-MM-YYYY"
                                        )}
                                      </div> */}
                                      <div
                                        className="type-promotion"
                                        style={{
                                          color: appTheme.color_main_1,
                                          borderColor: appTheme.color_main_1,
                                        }}
                                      >
                                        Combo
                                      </div>
                                      <span
                                        className="conditional"
                                        onClick={() =>
                                          handleShowComboPopup(v.id)
                                        }
                                      >
                                        Điều kiện
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* <button
               onClick={() => copyVoucherCode(v.name)}
               style={{ background: appTheme.color_main_1 }}
             >
               Lưu
             </button> */}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {productVouchers.length > 0 && (
                  <div className="product-voucher product-promotion">
                    {/* Mã giảm giá <br /> */}
                    <div className="column">
                      {productVouchers.map((v) => (
                        <div className="voucher-cardItem">
                          <div className="voucher-card" key={v.id}>
                            <div className="voucher-image">
                              <div
                                className="voucher-c"
                                style={{
                                  color: appTheme.color_main_1,
                                }}
                              >
                                {v.name}
                              </div>
                            </div>
                            <div className="voucher-info">
                              <div>
                                <div>
                                  <div className="promotion-detail">
                                    <div>
                                      <div>
                                        {v.discount_for != 1
                                          ? v.discount_type === 0
                                            ? "Giảm: " +
                                              formatPrice(
                                                Number(v.value_discount)
                                              ) +
                                              ` cho đơn hàng tối thiểu  ${formatPrice(
                                                v.value_limit_total
                                              )}`
                                            : "Giảm: " +
                                              v.value_discount +
                                              "%" +
                                              ` cho đơn hàng tối thiểu  ${formatPrice(
                                                v.value_limit_total
                                              )}`
                                          : v.is_free_ship === true
                                          ? "Miễn phí vận chuyển"
                                          : "Freeship: " +
                                            formatPrice(
                                              Number(v.ship_discount_value)
                                            )}
                                      </div>
                                    </div>
                                    <div className="set-time">
                                      {/* <div className="time-expired">
                                        HSD:{" "}
                                        {moment(v.end_time.slice(0, 10)).format(
                                          "DD-MM-YYYY"
                                        )}
                                      </div> */}
                                      <div
                                        className="type-promotion"
                                        style={{
                                          color: appTheme.color_main_1,
                                          borderColor: appTheme.color_main_1,
                                        }}
                                      >
                                        Voucher
                                      </div>
                                      <span
                                        className="conditional"
                                        onClick={() =>
                                          handleShowVoucherPopup(v.id)
                                        }
                                      >
                                        Điều kiện
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* <button
               onClick={() => copyVoucherCode(v.name)}
               style={{ background: appTheme.color_main_1 }}
             >
               Lưu
             </button> */}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {/* {productBonusLadder.length > 0 && (
                  <div className="product-voucher product-promotion">
                    <div className="column">
                      {productBonusLadder.map((v) => (
                        <div className="voucher-cardItem">
                          <div className="voucher-card" key={v.id}>
                            <div className="voucher-image">
                              <div
                                className="voucher-c"
                                style={{
                                  color: appTheme.color_main_1,
                                }}
                              >
                                {v.name}
                              </div>
                            </div>
                            <div className="voucher-info">
                              <div>
                                <div>
                                  <div className="promotion-detail">
                                    <div>
                                      <div>
                                        Tặng thưởng các sản phẩm với giới hạn{" "}
                                        {v.amount} sản phẩm
                                      </div>
                                    </div>
                                    <div className="set-time">
                                      <div
                                        className="type-promotion"
                                        style={{
                                          color: appTheme.color_main_1,
                                          borderColor: appTheme.color_main_1,
                                        }}
                                      >
                                        Thưởng sản phẩm
                                      </div>
                                      <span
                                        className="conditional"
                                        onClick={() =>
                                          handleShowBonusProductLadderPopup(
                                            v.id
                                          )
                                        }
                                      >
                                        Điều kiện
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {productBonus.length > 0 && (
                  <div className="product-voucher product-promotion">
                    <div className="column">
                      {productBonus.map((v) => (
                        <div className="voucher-cardItem">
                          <div className="voucher-card" key={v.id}>
                            <div className="voucher-image">
                              <div
                                className="voucher-c"
                                style={{
                                  color: appTheme.color_main_1,
                                }}
                              >
                                {v.name}
                              </div>
                            </div>
                            <div className="voucher-info">
                              <div>
                                <div>
                                  <div className="promotion-detail">
                                    <div>
                                      <div>
                                        Thưởng tặng sản phẩm lên đến {v.amount}{" "}
                                        sản phẩm
                                      </div>
                                    </div>
                                    <div className="set-time">
                                      <div
                                        className="type-promotion"
                                        style={{
                                          color: appTheme.color_main_1,
                                          borderColor: appTheme.color_main_1,
                                        }}
                                      >
                                        Thưởng sản phẩm
                                      </div>
                                      <span
                                        className="conditional"
                                        onClick={() =>
                                          handleShowBonusProductPopup(v.id)
                                        }
                                      >
                                        Điều kiện
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )} */}
              </div>
            )}
          </div>
          <div className="cart-sales">
            <div className="cart-salesContent">
              <div className="cart-salesItem">
                <div>
                  <img
                    src="https://becareskin.com/wp-content/themes/X-V1-21/assets/policy_product_image_1.png"
                    alt=""
                  />
                </div>
                <span>Giao hàng toàn quốc</span>
              </div>
              <div className="cart-salesItem">
                <div>
                  <img
                    src="https://becareskin.com/wp-content/themes/X-V1-21/assets/policy_product_image_2.png"
                    alt=""
                  />
                </div>
                <span>Tích điểm tất cả sản phẩm</span>
              </div>
              <div className="cart-salesItem">
                <div>
                  <img
                    src="https://becareskin.com/wp-content/themes/X-V1-21/assets/policy_product_image_3.png"
                    alt=""
                  />
                </div>
                <span>Ưu đãi khi thanh toán online</span>
              </div>
              <div className="cart-salesItem">
                <div>
                  <img
                    src="https://becareskin.com/wp-content/themes/X-V1-21/assets/policy_product_image_4.png"
                    alt=""
                  />
                </div>
                <span>Cam kết chính hãng</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        {/* Voucher */}
        {(productCombos?.length > 0 || productVouchers?.length > 0) && (
          <div
            className="productProgram_horizontal"
            style={{
              padding: "10px",
              paddingBottom: "10px",
              display: "flex",
              rowGap: "10px",
            }}
          >
            {productCombos.length > 0 && (
              <div
                className="product-voucher product-promotion"
                style={{ width: "230px" }}
              >
                <div className="column">
                  {productCombos.map((v) => (
                    <div className="voucher-cardItem">
                      <div className="voucher-card" key={v.id}>
                        <div className="voucher-image">
                          <div
                            className="voucher-c"
                            style={{
                              color: appTheme.color_main_1,
                            }}
                          >
                            {v.name}
                          </div>
                        </div>
                        <div className="voucher-info">
                          <div>
                            <div>
                              <div className="promotion-detail">
                                <div>
                                  <div>
                                    {v.discount_for != 1
                                      ? v.discount_type === 0
                                        ? "Giảm: " +
                                          formatPrice(
                                            Number(v.value_discount)
                                          ) +
                                          ` cho ${
                                            v.amount ? v.amount : "những"
                                          } đơn hàng sớm nhất`
                                        : "Giảm: " +
                                          v.value_discount +
                                          "%" +
                                          ` cho ${
                                            v.amount ? v.amount : "những"
                                          } đơn hàng sớm nhất`
                                      : v.is_free_ship === true
                                      ? "Miễn phí vận chuyển"
                                      : "Freeship: " +
                                        formatPrice(
                                          Number(v.ship_discount_value)
                                        )}
                                  </div>
                                </div>
                                <div className="set-time">
                                  <div
                                    className="type-promotion"
                                    style={{
                                      color: appTheme.color_main_1,
                                      borderColor: appTheme.color_main_1,
                                    }}
                                  >
                                    Combo
                                  </div>
                                  <span
                                    className="conditional"
                                    onClick={() => handleShowComboPopup(v.id)}
                                  >
                                    Điều kiện
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {productVouchers.length > 0 && (
              <div
                className="product-voucher product-promotion"
                style={{ width: "230px" }}
              >
                {/* Mã giảm giá <br /> */}
                <div className="column">
                  {productVouchers.map((v) => (
                    <div className="voucher-cardItem">
                      <div className="voucher-card" key={v.id}>
                        <div className="voucher-image">
                          <div
                            className="voucher-c"
                            style={{
                              color: appTheme.color_main_1,
                            }}
                          >
                            {v.name}
                          </div>
                        </div>
                        <div className="voucher-info">
                          <div>
                            <div>
                              <div className="promotion-detail">
                                <div>
                                  <div>
                                    {v.discount_for != 1
                                      ? v.discount_type === 0
                                        ? "Giảm: " +
                                          formatPrice(
                                            Number(v.value_discount)
                                          ) +
                                          ` cho đơn hàng tối thiểu  ${formatPrice(
                                            v.value_limit_total
                                          )}`
                                        : "Giảm: " +
                                          v.value_discount +
                                          "%" +
                                          ` cho đơn hàng tối thiểu  ${formatPrice(
                                            v.value_limit_total
                                          )}`
                                      : v.is_free_ship === true
                                      ? "Miễn phí vận chuyển"
                                      : "Freeship: " +
                                        formatPrice(
                                          Number(v.ship_discount_value)
                                        )}
                                  </div>
                                </div>
                                <div className="set-time">
                                  {/* <div className="time-expired">
                                    HSD:{" "}
                                    {moment(v.end_time.slice(0, 10)).format(
                                      "DD-MM-YYYY"
                                    )}
                                  </div> */}
                                  <div
                                    className="type-promotion"
                                    style={{
                                      color: appTheme.color_main_1,
                                      borderColor: appTheme.color_main_1,
                                    }}
                                  >
                                    Voucher
                                  </div>
                                  <span
                                    className="conditional"
                                    onClick={() => handleShowVoucherPopup(v.id)}
                                  >
                                    Điều kiện
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <button
               onClick={() => copyVoucherCode(v.name)}
               style={{ background: appTheme.color_main_1 }}
             >
               Lưu
             </button> */}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* {productBonusLadder.length > 0 && (
              <div
                className="product-voucher product-promotion"
                style={{ width: "230px" }}
              >
                <div className="column">
                  {productBonusLadder.map((v) => (
                    <div className="voucher-cardItem">
                      <div className="voucher-card" key={v.id}>
                        {console.log("test ", v)}
                        <div className="voucher-image">
                          <div
                            className="voucher-c"
                            style={{
                              color: appTheme.color_main_1,
                            }}
                          >
                            {v.name}
                          </div>
                        </div>
                        <div className="voucher-info">
                          <div>
                            <div>
                              <div className="promotion-detail">
                                <div>
                                  <div>
                                    Tặng thưởng các sản phẩm với giới hạn{" "}
                                    {v.amount} sản phẩm
                                  </div>
                                </div>
                                <div className="set-time">
                                  <div
                                    className="type-promotion"
                                    style={{
                                      color: appTheme.color_main_1,
                                      borderColor: appTheme.color_main_1,
                                    }}
                                  >
                                    Thưởng sản phẩm
                                  </div>
                                  <span
                                    className="conditional"
                                    onClick={() =>
                                      handleShowBonusProductLadderPopup(v.id)
                                    }
                                  >
                                    Điều kiện
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {productBonus.length > 0 && (
              <div
                className="product-voucher product-promotion"
                style={{ width: "230px" }}
              >
                <div className="column">
                  {productBonus.map((v) => (
                    <div className="voucher-cardItem">
                      <div className="voucher-card" key={v.id}>
                        <div className="voucher-image">
                          <div
                            className="voucher-c"
                            style={{
                              color: appTheme.color_main_1,
                            }}
                          >
                            {v.name}
                          </div>
                        </div>
                        <div className="voucher-info">
                          <div>
                            <div>
                              <div className="promotion-detail">
                                <div>
                                  <div>
                                    Thưởng tặng sản phẩm lên đến {v.amount} sản
                                    phẩm
                                  </div>
                                </div>
                                <div className="set-time">
                                  <div
                                    className="type-promotion"
                                    style={{
                                      color: appTheme.color_main_1,
                                      borderColor: appTheme.color_main_1,
                                    }}
                                  >
                                    Thưởng sản phẩm
                                  </div>
                                  <span
                                    className="conditional"
                                    onClick={() =>
                                      handleShowBonusProductPopup(v.id)
                                    }
                                  >
                                    Điều kiện
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )} */}
          </div>
        )}
      </div>
      <div className={`modal ${customClass}`} onClick={modalClick}>
        <div className="link-popup">
          <div className="copyShareContent">
            <input readOnly value={showLinkAffiliate()}></input>
            <button onClick={copySharedLink} className="copyShareLink">
              <i className="fa fa-copy"></i>
            </button>
          </div>
        </div>
      </div>
      <div
        className={`modal ${showContentBuy ? "center" : ""}`}
        onClick={modalClickContent}
      >
        <div className="content-popup">
          <div style={{ maxHeight: "70vh", overflowY: "auto" }}>
            {content_for_collaborator}
          </div>
          <div className="content-popup-link">
            Link mua hàng:
            <span>{showLinkAffiliate()}</span>
          </div>
          <div>
            <button className="btn-content-copy" onClick={copySharedContent}>
              <i className="fa fa-copy"></i>Sao chép
            </button>
          </div>
        </div>
      </div>
    </MainInfoStyles>
  );
}
