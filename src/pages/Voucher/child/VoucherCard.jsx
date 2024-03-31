import React from 'react';
import styled from 'styled-components';

import { formatPrice } from '../../../helper';
import ProductVoucher from './ProductVoucher';

const VoucherCardStyles = styled.div`
  width: 100%;
  background-color: white;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 30px;
  @media screen and (max-width: 767.8px) {
    padding-bottom: 0px;
    margin-bottom: 0px;
    padding: 8px;
  }
  @media screen and (min-width: 768px) and (max-width: 992px) {
    margin-bottom: 15px;
    padding: 8px;
  }
  .voucher-list {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .voucher-content {
    gap: 31px;
    @media screen and (min-width: 768px) and (max-width: 992px) {
      gap: 12px;
    }
    @media screen and (max-width: 767.8px) {
      gap: 12px;
    }
    display: flex;
    &--code {
      margin-top: 20px;
      width: 80%;
      white-space: nowrap;
      overflow-x: hidden;
      text-overflow: ellipsis;
    }
    &_name {
      width: 15rem;
      @media screen and (min-width: 768px) and (max-width: 992px) {
        width: 11rem;
      }
      @media screen and (max-width: 767.8px) {
        width: 10rem;
      }
      &__img {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        background-image: url('/img/Union.svg');
        background-repeat: no-repeat;
        background-size: cover;
        height: 112px;
        text-align: center;
        color: white;
        font-weight: 600;
        font-size: 16px;
        @media screen and (min-width: 768px) and (max-width: 992px) {
          height: 80px;
          font-size: 14px;
        }
        @media screen and (max-width: 767.8px) {
          height: 70px;
          font-size: 12px;
        }
        .vc-info {
          position: absolute;
          top: 7px;
          left: -6px;
          width: 108px;
          height: 37px;
          background-image: url('/img/voucherInfor.svg');
          background-repeat: no-repeat;
          background-size: cover;
          text-align: center;
          color: white;
          &_text {
            position: absolute;
            top: 9px;
            left: 5px;
            font-size: 12px;
            font-weight: 500;
          }
          @media screen and (min-width: 768px) and (max-width: 992px) {
            width: 90px;
            height: 29px;
            left: -5px;
            &_text {
            position: absolute;
            top: 7px;
            left: 5px;
            font-size: 10px;
            font-weight: 500;
          }
          }
          @media screen and (max-width: 767.8px) {
            left: -4px;
            width: 75px;
            height: 24px;
            &_text {
              top: 4px;
            }
          }
        }
      }
    }

    &_info {
      font-size: 16px;
      font-weight: 500;
      line-height: 30px;
      .info__code {
        margin-top: -6px;
        font-weight: 600;
        font-size: 16px;
      }
      .info__end {
        color: #ee4d2d;
      }
      @media screen and (min-width: 768px) and (max-width: 992px) {
        font-size: 14px;
        font-weight: 500;
        line-height: 22px;
      }
      @media screen and (max-width: 767.8px) {
        line-height: 15px;
        font-size: 13px;
      }
    }
  }

  .list-products {
    margin-top: 20px;
    @media screen and (max-width: 767.8px) {
      margin-top: 10px;
      font-size: 14px;
    }
  }

  .products {
    margin-top: 20px;
    margin-bottom: 5px;
    display: flex;
    height: fit-content;
    align-items: center;
    .card-wraper {
      display: flex;
      @media screen and (max-width: 767.8px) {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 10px;
      }
    }
    .btn-buy--product {
      height: 36px;
      cursor: pointer;
      border: 1px solid #ee4d2d;
      border-radius: 2px;
      background-color: #ffeeee;
      color: #ee4d2d;
      align-items: center;
      text-align: center;
      padding: 6px 12px;
      display: flex;
      justify-content: space-between;
    }
    .product-view--more {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 25px;
      @media screen and (min-width: 768px) and (max-width: 992px) {
        grid-gap: 5px;
      }
    }
    @media screen and (max-width: 767.8px) {
      margin-top: 10px;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 15px;
    }
  }
  @media screen and (max-width: 767.8px) {
    .voucher-content {
      &_info {
        margin-top: 10px;
      }
    }
    .products {
      .product-view--more {
        grid-gap: 8px;
        grid-template-columns: repeat(2, 1fr);
      }
    }
  }
`;

const ImgViewMoreStyled = styled.div`
  cursor: pointer;
  .view-more--container{
    cursor: pointer;
    position: absolute;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 18px;
    font-weight: bold;
  }
  .arrow-icon{
    margin-top: 3px;
  }
  position: relative;
  width: 100%;
  border-radius: 8px;
  height: 220px;
  border: 1px solid #d1c5c5;
  overflow: hidden;
  > img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
  > span {
    position: absolute;
    width: 100%;
    font-size: 20px;
    top: 50%;
    left: 70%;
    font-weight: 400;
    transform: translate(-50%, -50%);
    color: #ffffff;
    z-index: 10;
    cursor: pointer;
    @media screen and (min-width: 768px) and (max-width: 992px) {
      font-size: 15px;
    }
    @media screen and (max-width: 767.8px) {
      font-size: 16px;
      left: 70%;
    }
  }
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    inset: 0;
    background-color: #000000;
    opacity: 0.4;
    cursor: pointer;
    &:hover {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      inset: 0;
      background-color: #000000;
      opacity: 0.6;
    }
  }
  @media screen and (min-width: 768px) and (max-width: 992px) {
    height: 170px;
  }
  @media screen and (max-width: 767.8px) {
    height: 130px;
  }
`;

const ProductVoucherList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 20px;
  @media screen and (min-width: 768px) and (max-width: 992px) {
    column-gap: 5px;
  }
  > div {
    width: auto;
    max-width: 100%;
  }
  @media screen and (max-width: 767.8px) {
    display: contents;
    > div {
    width: 143px;
  }
  }
`;

export default function VoucherCard(props) {
  const isMobile = props.deviceWidth <= 768;
  return (
    <VoucherCardStyles>
      <div className="voucher-list top">
        {/* top */}
        <div className="voucher-content">
          {/* left */}
          <div className="voucher-content_name">
            <div className="voucher-content_name__img">
              <div className="vc-info">
                <span className="vc-info_text">
                  {props.set_limit_amount === false ? (
                    <div className="end">
                      <span>SL không giới hạn</span>
                    </div>
                  ) : (
                    <div className="end">
                      <span>SL có hạn</span>
                    </div>
                  )}
                </span>
              </div>
              <span className="voucher-content--code">{props.code}</span>
            </div>
          </div>
          {/* right */}
          <div className="voucher-content_info">
            <div>
              <div className="info__code">
                <span>Mã: </span> {props.code}
              </div>
              <div className="info__value">
                {props.is_free_ship ? (
                  'Miễn phí vận chuyển'
                ) : props.ship_discount_value ? (
                  `Giảm ${formatPrice(props.ship_discount_value)} phí vận chuyển`
                ) : (
                  <>
                    {' '}
                    Giảm {props.discount_type === 1 ? props.value_discount + '%' : formatPrice(props.value_discount)}
                  </>
                )}
                {props.value_limit_total && (
                  <span className="info__apply">
                    {props.max_value_discount > 0
                      ? ` giảm tối đa ${formatPrice(props.max_value_discount)} cho đơn hàng từ ${formatPrice(
                          props.value_limit_total,
                        )}`
                      : ` cho đơn hàng từ ${formatPrice(props.value_limit_total)}`}
                  </span>
                )}
              </div>
            </div>
            {props.set_limit_amount === false ? (
              <div className="end">
                <span>Số lượng không giới hạn</span>
              </div>
            ) : (
              <div className="end">
                <span>Số lượng có hạn</span>
              </div>
            )}
            <div className="info__end">
              <span>HSD: </span> {props.end_time.split(' ')[0]}
            </div>
          </div>
        </div>
      </div>

      {/* List of applicable products */}
      <div className="list-products">
        {props.voucher_type === 1 && props.set_limit_total && (
          <h4 className="list-products--title">Áp dụng khi mua các sản phẩm sau</h4>
        )}
        {props.voucher_type === 1 && !props.set_limit_total && (
          <h4 className="list-products--title">Áp dụng khi mua các sản phẩm sau</h4>
        )}
        {props.voucher_type === 1 && (
          <div className="products">
            <div className="card-wraper" >
              {props.products?.length < 4 ? (
                isMobile && props.products?.length > 1 ? (
                  <>
                    <ProductVoucherList>
                      {props.products.slice(0, 1).map((product, index) => (
                        <ProductVoucher product={product} key={index} />
                      ))}
                    </ProductVoucherList>
                    <ImgViewMoreStyled
                      onClick={() =>
                        props.setVoucherSelected({
                          id: props.id,
                          name: props.name,
                          code: props.code,
                        })
                      }
                    >
                      <img
                        src={props?.products[0]?.images[0]?.image_url || '/img/default_product.jpg'}
                        alt="anhsanpham"
                      />
                      <div className='view-more--container'>
                        <span>
                          Xem thêm{' '}
                          <i class="fa fa-angle-right arrow-icon"></i>
                        </span>
                      </div>
                    </ImgViewMoreStyled>
                  </>
                ) : (
                  <ProductVoucherList>
                    {props.products.map((v, i) => (
                      <ProductVoucher product={v} key={i} />
                    ))}
                  </ProductVoucherList>
                )
              ) : isMobile ? (
                <>
                  <ProductVoucherList>
                    {props.products.slice(0, 1).map((product, index) => (
                      <ProductVoucher product={product} key={index} />
                    ))}
                  </ProductVoucherList>
                  <ImgViewMoreStyled
                    onClick={() =>
                      props.setVoucherSelected({
                        id: props.id,
                        name: props.name,
                        code: props.code,
                      })
                    }
                  >
                    <img
                      src={props?.products[0]?.images[0]?.image_url || '/img/default_product.jpg'}
                      alt="anhsanpham"
                    />
                    <div className='view-more--container'>
                      <span>
                        Xem thêm{' '}
                        <i class="fa fa-angle-right arrow-icon"></i>
                      </span>
                    </div>
                  </ImgViewMoreStyled>
                </>
              ) : (
                <div className="product-view--more">
                  {props.products.slice(0, 2).map((product, index) => (
                    <ProductVoucher product={product} key={index} />
                  ))}
                  <ImgViewMoreStyled
                    onClick={() =>
                      props.setVoucherSelected({
                        id: props.id,
                        name: props.name,
                        code: props.code,
                      })
                    }
                  >
                    <img
                      src={props?.products[0]?.images[0]?.image_url || '/img/default_product.jpg'}
                      alt="anhsanpham"
                    />
                    <div className='view-more--container'>
                      <span>
                        Xem thêm{' '}
                        <i class="fa fa-angle-right arrow-icon"></i>
                      </span>
                    </div>
                  </ImgViewMoreStyled>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </VoucherCardStyles>
  );
}
