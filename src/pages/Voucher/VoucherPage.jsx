import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { constants as c } from '../../constants';
import { voucherActions } from '../../actions/voucherActions';
import styled from 'styled-components';
import ModalProducts from './child/ModalProducts.jsx';

const VoucherCard = React.lazy(() => import('./child/VoucherCard'));
const EmptyVoucher = React.lazy(() => import('../../components/Empty/EmptyVoucher'));
const Footer = React.lazy(() => import('../../components/Footer'));

const ListVoucherStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
  @media screen and (min-width: 768px) and (max-width: 992px) {
    grid-gap: 15px;
  }
  @media (max-width: 767.7px) {
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 8px;
  }
  @media (max-width: 767.7px) {
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 8px;
  }
`;

const TitleStyled = styled.div`
  font-weight: bold;
  @media screen and (min-width: 768px) and (max-width: 992px) {
    font-size: 30px;
  }
  @media (max-width: 767.7px) {
    font-size: 14px;
  }
`;

function VoucherPage() {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.voucher.list);
  const allProductArray = useMemo(() => list.data.filter((v) => v.voucher_type === 0), [list]);
  const specialProductArray = useMemo(() => list.data.filter((v) => v.voucher_type === 1), [list]);
  const [voucherSelected, setVoucherSelected] = useState();
  const [deviceWidth, setDeviceWidth] = useState(window.innerWidth);
  const handleDevice = () => {
    const width = window.innerWidth;
    setDeviceWidth(width);
  }
  useEffect(() => {
    document.title = 'Mã giảm giá';
    if (list.status === c.LOADING) dispatch(voucherActions.getAllVoucher());
  }, []);
  useEffect(() => {
    window.addEventListener('resize', handleDevice) 
    return () => {
      window.removeEventListener('resize', handleDevice) 
    };
  }, []);
  return (
    <React.Fragment>
      <ModalProducts
        isOpen={voucherSelected ? true : false}
        onClose={() => setVoucherSelected(null)}
        product={voucherSelected}
      />

      {list.status === c.LOADING ? null : list.data.length === 0 ? (
        <React.Fragment>
          <EmptyVoucher />
          <Footer />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div className="voucher-page">
            <div className="container">
              {allProductArray.length > 0 && (
                <TitleStyled>
                  <h3>Voucher áp dụng toàn shop</h3>
                </TitleStyled>
              )}
              <ListVoucherStyled>
                {allProductArray.map((v, i) => (
                  <VoucherCard key={i} {...v} />
                ))}
              </ListVoucherStyled>
              {specialProductArray.length > 0 && (
                <TitleStyled>
                  <h3>Voucher áp dụng cho sản phẩm</h3>
                </TitleStyled>
              )}
              <ListVoucherStyled>
                {specialProductArray.map((v, i) => (
                  <VoucherCard key={i} {...v} setVoucherSelected={setVoucherSelected} deviceWidth={deviceWidth}/>
                ))}
              </ListVoucherStyled>
            </div>
          </div>
          <Footer />
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
export default VoucherPage;
