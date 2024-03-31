import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Paginate from "../../../components/Paginate";
import { formatPrice } from "../../../helper";
import { collaboratorActions as a } from "../../../actions/collaboratorActions";
import styled from "styled-components";

const CollaboratorRewardLadderStyles = styled.div`
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
    .table__rewardLadder {
      overflow-x: scroll;
      table {
        min-width: 768px;
      }
    }
  }
`;

const CollaboratorRewardLadder = () => {
  const dispatch = useDispatch();
  const bonus = useSelector((state) => state.collaborator.bonus);

  function handlePageSelect(bonusData) {
    dispatch(a.getBonusHistory(`?limit=20&page=${bonusData.page}`));
  }
  useEffect(() => {
    dispatch(a.getBonusHistory("?limit=20"));
  }, [dispatch]);
  return (
    <CollaboratorRewardLadderStyles className="receipt-tab">
      <div className="table__rewardLadder">
        <table>
          <thead>
            <tr>
              <th className="date">Tháng</th>
              <th className="value">Doanh số</th>
              <th>Tổng hoa hồng</th>
              <th>Tiền thưởng</th>
              <th>Đã nhận</th>
              {/* <th className="mobile"></th> */}
            </tr>
          </thead>
          <tbody>
            {bonus.data.map((v, i) => (
              <tr key={i}>
                <td className="date">
                  {v.month}/{v.year}
                </td>
                <td className="value">{formatPrice(v.total_final)}</td>
                <td className="value">{formatPrice(v.share_collaborator)}</td>
                <td className="value">{formatPrice(v.money_bonus_current)}</td>
                <td className="value">{formatPrice(v.money_bonus_rewarded)}</td>
                {/* <td style={{ color: appTheme.color_main_1 }}>{v.awarded === true ? "Đã nhận" : ""}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {bonus?.data.length > 0 && (
        <Paginate
          totalPage={bonus.last_page}
          currentPage={bonus.current_page}
          handlePageSelect={handlePageSelect}
        />
      )}
    </CollaboratorRewardLadderStyles>
  );
};

export default CollaboratorRewardLadder;
