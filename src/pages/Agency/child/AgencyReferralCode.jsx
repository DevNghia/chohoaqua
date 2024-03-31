import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Paginate from "../../../components/Paginate";
import { formatPrice } from "../../../helper";
import { agencyActions as a } from "../../../actions/agencyAction";
import styled from "styled-components";
import PickerDate from "../../../components/PickerDate/PickerDate";
import history from "../../../history";
import moment from "moment";

const AgencyReferralCodeStyles = styled.div`
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
    .table__referral {
      overflow-x: scroll;
      table {
        min-width: 768px;
      }
    }
  }
`;

const AgencyReferralCode = ({ setTabActive }) => {
  const dispatch = useDispatch();
  const referral = useSelector((state) => state.agency.referral);
  const report = useSelector((state) => state.agency.reportss);
  const [queries, setQueries] = useState({
    date_from: "",
    date_to: "",
    page: 1,
    limit: 20,
    type: "day",
  });

  function getParams(page = 1, limit = 20, date_from, date_to) {
    let params = `?page=${page}&limit=${limit}`;

    if (date_from) {
      params += `&date_from=${date_from}`;
    }

    if (date_to) {
      params += `&date_to=${date_to}`;
    }

    return params;
  }

  function handlePageSelect(referralData) {
    setQueries((prevQueries) => ({
      ...prevQueries,
      page: referralData.page,
    }));
  }
  function onChangeDate(query, date) {
    setQueries((prevQueries) => ({
      ...prevQueries,
      date_from: date.date_from,
      date_to: date.date_to,
      type: date.type,
    }));
  }

  function handleOrder(phone_number) {
    setTabActive("order");
    history.push(
      `/dai-ly?phone_number=${phone_number}&date_from=${queries.date_from}&date_to=${queries.date_to}&type=${queries.type}&field_by_value=COMPLETED&field_by=order_status_code`
    );
  }
  useEffect(() => {
    const params = getParams(
      queries.page,
      queries.limit,
      queries.date_from,
      queries.date_to
    );
    dispatch(a.getReportGen(params));
    // dispatch(a.getAgencyReferralCode(params));
  }, [
    dispatch,
    queries.date_from,
    queries.date_to,
    queries.limit,
    queries.page,
  ]);
  return (
    <AgencyReferralCodeStyles className="receipt-tab">
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
        }}
      >
        <PickerDate onChangeDate={onChangeDate} />
      </div>
      <div className="table__referral">
        <table>
          <thead>
            <tr>
              <th>Tên</th>
              <th>SĐT</th>

              <th>Tổng đơn</th>
            </tr>
          </thead>
          <tbody>
            {report.data.map((v, i) => (
              <tr key={i}>
                <td>{v.name}</td>
                <td className="value">{v.phone_number}</td>

                <td
                  className="value"
                  // onClick={() => handleOrder(v.phone_number)}
                  // style={{
                  //   color: "#008dff",
                  //   cursor: "pointer",
                  // }}
                >
                  {v.total_order}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {report?.data.length > 0 && (
        <Paginate
          totalPage={report.pagination.last_page}
          currentPage={report.pagination.current_page}
          handlePageSelect={handlePageSelect}
        />
      )}
    </AgencyReferralCodeStyles>
  );
};

export default AgencyReferralCode;
