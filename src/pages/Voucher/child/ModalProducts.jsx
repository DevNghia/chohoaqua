import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import ProductVoucher from "./ProductVoucher.jsx";
import Paginate from "../../../components/Paginate.jsx";
import { constants as c } from "../../../constants";
import { voucherActions } from "../../../actions/voucherActions.js";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 30px;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  position: absolute;
  top: 6%;
  bottom: 6%;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 20px;
  padding-right: 0;
  width: 70%;
  height: 90%;
  .modal-search--container {
    display: flex;
    width: 350px;
    border: 1px solid #cacaca;
    margin-right: 20px;
    border-radius: 10px;
    overflow: hidden;
  }
  .modal-search {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding-bottom: 30px;
    .modal-code {
      margin-top: 20px;
      color: #ee4d2d;
      font-size: 22px;
      @media screen and (min-width: 768px) and (max-width: 992px) {
        font-size: 18px;
      }
    }
    &_input {
      flex: 1;
      padding: 10px 0px 10px 9px;
      height: 38px;
      > input {
        width: 100%;
      }
    }
    &_btn {
      margin-left: -9px;
      background: #bc4053;
      border-bottom-right-radius: 3px;
      border-top-right-radius: 3px;
      width: 25%;
      color: white;
      cursor: pointer;
    }
  }
  .btn-close {
    text-align: right;
    margin-right: 20px;
  }
  @media screen and (min-width: 768px) and (max-width: 991.9px) {
    max-height: 700px;
  }
  @media screen and (max-width: 767.9px) {
    width: 95%;
    top: 3%;
    height: 95%;
    .modal-search {
      display: block;
      margin: 0 auto;
      &--container {
        width: calc(100% - 20px);
      }
      .modal-code {
        font-size: 16px;
        overflow: hidden;
        text-overflow: ellipsis;
        margin: 8px 0;
      }
    }
    .modal-title {
      font-size: 16px;
    }
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  @media screen and (max-width: 575.9px) {
    margin-left: 93%;
  }
`;

const ModalListProducts = styled.div`
  width: 100%;
  height: 100%;

  .pagination {
    display: flex;
    height: auto;
    padding: 30px auto;
  }
`;

const ListProductContainer = styled.div`
  text-align: center;
  padding-right: 10px;
  height: 80%;
  width: 100%;
  overflow-y: scroll;
  position: relative;
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 4px;
    right: 0;
    position: absolute;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  @media screen and (max-width: 576.1px) {
    max-height: 75%;
    overflow-x: hidden;
  }
  .pagination {
    margin-bottom: 15px;
    padding-bottom: 15px;
  }
`;

const ListProductStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 20px;
  .no_data {
    width: 800px;
    margin-top: 8%;
  }
  .no_data__img {
    width: 700px;
    height: 450px;
    object-fit: cover;
    margin-left: 12%;
  }
  .no_data__text {
    margin-left: 30%;
    font-size: 16px;
    margin-bottom: 10px;
    color: #ff5b5b;
  }
  @media screen and (max-width: 991.9px) {
    grid-template-columns: repeat(4, 1fr);
    .no_data {
      width: 570px;
      margin-top: 8%;
    }
  }
  @media screen and (max-width: 767.9px) {
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 10px;
    .no_data {
      display: block;
      margin-top: 20px;
    }
    .no_data__img {
      width: 40%;
      height: auto;
      object-fit: contain;
      margin-left: 0;
    }
    .no_data__text {
      margin-left: 0;
      font-size: 13px;
    }
  }
  @media screen and (min-width: 350px) and (max-width: 549px) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
  }
  @media screen and (min-width: 550px) and (max-width: 679.9px) {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
  }
  @media screen and (min-width: 680px) and (max-width: 767.9px) {
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 10px;
  }
`;

const LoadingStyled = styled.div`
  .loader {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: inline-block;
    border-top: 4px solid #fff;
    border-right: 4px solid transparent;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
  }
  .loader::after {
    content: "";
    box-sizing: border-box;
    position: absolute;
    left: 0;
    top: 0;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border-left: 4px solid #ff3d00;
    border-bottom: 4px solid transparent;
    animation: rotation 0.5s linear infinite reverse;
  }
  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const ProductModal = ({ isOpen, onClose, product }) => {
  const dispatch = useDispatch();
  const listProductsByVoucherId = useSelector(
    (state) => state.voucher.listProductsByVoucherId
  );
  const [searchText, setSearchText] = useState("");

  const voucher_id = product?.id;
  useEffect(() => {
    if (isOpen) {
      dispatch(voucherActions.getAllProductsByVoucherId(voucher_id, 1, ""));
    }
  }, [voucher_id]);

  function handlePageSelect(pageSelected) {
    dispatch(
      voucherActions.getAllProductsByVoucherId(
        voucher_id,
        pageSelected.page,
        searchText
      )
    );
  }

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      voucherActions.getAllProductsByVoucherId(voucher_id, 1, searchText)
    );
  };

  const handleCloseModal = () => {
    setSearchText("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      {listProductsByVoucherId.status === c.LOADING ? (
        <LoadingStyled>
          <span class="loader"></span>
        </LoadingStyled>
      ) : (
        <ModalContent>
          <div className="btn-close">
            <CloseButton onClick={handleCloseModal}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="black"
                style={{ width: 20, height: 20 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </CloseButton>
          </div>
          <h2 className="modal-title">
            Danh sách các sản phẩm áp dụng voucher
          </h2>
          <div className="modal-search">
            <p className="modal-code">Mã: {product.code}</p>
            <div className="modal-search--container">
              <form className="modal-search_input" onSubmit={onSubmit}>
                <input
                  type="text"
                  placeholder="Tìm kiếm tên sản phẩm..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </form>
              <button
                type="submit"
                onClick={onSubmit}
                className="modal-search_btn"
              >
                Tìm kiếm
              </button>
            </div>
          </div>

          {/* list product */}
          <ModalListProducts>
            <ListProductContainer>
              <ListProductStyled>
                {listProductsByVoucherId?.data[0]?.data?.length ? (
                  listProductsByVoucherId?.data[0]?.data?.map((prd, index) => (
                    <ProductVoucher product={prd} key={index} />
                  ))
                ) : (
                  <div className="no_data">
                    <p className="no_data__text">
                      Không có sản phẩm nào phù hợp với từ khóa bạn nhập!
                    </p>
                  </div>
                )}
              </ListProductStyled>
              {listProductsByVoucherId?.data[0]?.data?.length > 0 && (
                <div className="pagination">
                  <Paginate
                    handlePageSelect={handlePageSelect}
                    totalPage={listProductsByVoucherId?.data[0]?.last_page}
                    currentPage={listProductsByVoucherId?.data[0]?.current_page}
                  />
                </div>
              )}
            </ListProductContainer>
          </ModalListProducts>
        </ModalContent>
      )}
    </ModalOverlay>
  );
};

export default ProductModal;
