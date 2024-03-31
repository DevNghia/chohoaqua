import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Paginate from "../../../components/Paginate";
import { formatPrice } from "../../../helper";
import { agencyActions as a } from "../../../actions/agencyAction";
import styled from "styled-components";

const AgencyHistoryBalanceStyles = styled.div`
  table {
    width: 100%;
    border: 1px solid #e4e4e4;
    border-radius: 0.25em;
    overflow: hidden;
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
    .table__balance {
      overflow-x: scroll;
      table {
        min-width: 768px;
      }
    }
  }
`;

const AgencyHistoryBalance = () => {
  const dispatch = useDispatch();
  const history = useSelector((state) => state.agency.history);

  function handlePageSelect(historyData) {
    dispatch(a.getBalanceHistory(`?limit=20&page=${historyData.page}`));
  }

  useEffect(() => {
    dispatch(a.getBalanceHistory("?limit=20"));
  }, [dispatch]);
  return (
    <AgencyHistoryBalanceStyles className="balance-tab">
      <div className="table__balance">
        <table>
          <thead>
            <tr>
              <th>Ngày</th>
              <th>Giá trị</th>
              <th className="detail">Nội dung</th>
              <th className="balance">Số dư</th>
            </tr>
          </thead>
          <tbody>
            {history.data.map((v, i) => (
              <tr key={i}>
                <td className="date">{v.created_at.slice(0, 10)}</td>
                <td>{formatPrice(v.money, false, true)}</td>
                <td className="detail">
                  {v.note === "" ? v.type_name : v.note}
                </td>
                <td className="balance">
                  {formatPrice(v.current_balance, false, true)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {history?.data.length > 0 && (
        <Paginate
          handlePageSelect={handlePageSelect}
          totalPage={history.last_page}
          currentPage={history.current_page}
        />
      )}
    </AgencyHistoryBalanceStyles>
  );
};

export default AgencyHistoryBalance;
