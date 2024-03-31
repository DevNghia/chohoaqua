import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Paginate from "../../../components/Paginate";
import { formatPrice } from "../../../helper";
import { agencyActions as a } from "../../../actions/agencyAction";
import styled from "styled-components";

const ListAgencyRequestStyles = styled.div`
  .order__table {
    width: 100%;
    border: 1px solid #e4e4e4;
    border-radius: 0.25em;
    tr {
      height: 2em;
      th,
      td {
        text-align: left;
        padding: 0.75em;
      }
    }
    tbody {
      tr {
        td {
          border-top: 1px solid #e4e4e4;
          color: #757575;
        }
      }
    }
  }
  @media only screen and (max-width: 768px) {
    .order__table-main {
      overflow-x: scroll;
      .order__table {
        min-width: 768px;
      }
    }
  }
`;

const AgencyRequest = () => {
  const dispatch = useDispatch();
  const bonus = useSelector((state) => state.agency.bonus);

  function handlePageSelect(bonusData) {
    dispatch(a.getBonusHistory(`?limit=20&page=${bonusData.page}`));
  }
  useEffect(() => {
    dispatch(a.getBonusHistory("?limit=20"));
  }, [dispatch]);
  return (
    <ListAgencyRequestStyles className="receipt-tab">
      <div className="order__table-main">
        <table className="order__table">
          <thead>
            <tr>
              <th></th>
              <th>STT</th>
              <th>Tên profile</th>
              <th>Tên tài khoản</th>
              <th>Số điện thoại</th>
              <th>Doanh số</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
              <th>Thời gian yêu cầu</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="order-id"></td>
              <td className="order-id">1</td>
              <td className="date">Nguyễn Trung Hiếu</td>
              <td className="n-product">HieuPC</td>
              <td className="total">0854808229</td>
              <td className="status">2.779.999đ</td>
              <td className="status">Đã duyệt</td>
              <td className="status"></td>
              <td className="status"> 09:36:11 21/02/2024</td>
            </tr>

            {/* {(orders?.data ?? []).map(
              (v, i) =>
                v.line_items_at_time.length > 0 && (
                  <tr key={i} onClick={() => handleShowInfo(v.order_code)}>
                    <td className="order-id" style={{ minWidth: "160px" }}>
                      {v.order_code}
                    </td>
                    <td className="date">{v.created_at.split(" ")[0]}</td>
                    <td className="n-product">
                      <div>{v.line_items_at_time[0].name}</div>
                      <span>
                        {v.line_items_at_time.length > 1
                          ? `0${v.line_items_at_time.length - 1} sản phẩm khác`
                          : null}
                      </span>
                    </td>
                    <td className="total"> {formatPrice(v.total_final)}</td>
                    <td className="status">{v.order_status_name}</td>
                    <td className="status">
                      {v.payment_status_name}
                      <br />
                    </td>
                  </tr>
                )
            )} */}
          </tbody>
        </table>
      </div>
    </ListAgencyRequestStyles>
  );
};

export default AgencyRequest;
