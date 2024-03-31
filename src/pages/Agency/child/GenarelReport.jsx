import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Paginate from "../../../components/Paginate";
import Select from "../../../components/Select";
import { agencyActions as a } from "../../../actions/agencyAction";
import { cartActions as c } from "../../../actions/cartActions";
import {
  formatPrice,
  hideParentElement,
  showNextElement,
} from "../../../helper";
import styled from "styled-components";
import history from "../../../history";
import PickerDate from "../../../components/PickerDate/PickerDate";
import { order_status_code } from "../../../utils/statusOrder";
import moment from "moment/moment";
import { CSVLink } from "react-csv";

const AgencyOrderImportStyles = styled.div`
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
const ExportButtonContainer = styled.div`
  .export-link {
    background-color: #4caf50; /* Màu nền */
    border: none;
    color: white;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 4px;
  }

  .export-link:hover {
    background-color: #45a049; /* Màu nền khi di chuột vào */
  }
`;
const GenarelReport = () => {
  const dispatch = useDispatch();
  const { ordersImport: orders } = useSelector((state) => state.agency);
  const ordersList = useSelector((state) => state.cart.ordersList);
  const account = useSelector((state) => state.agency.account);
  const report = useSelector((state) => state.agency.reportss);

  const [currentStatus, setCurrentStatus] = useState("Trạng thái");
  const [queries, setQueries] = useState({
    date_from: "",
    date_to: "",
    page: getQueryParams("page") || 1,
    limit: getQueryParams("limit") || 20,
    field_by: getQueryParams("field_by") || "",
    field_by_value: getQueryParams("field_by_value") || "",
    type: getQueryParams("type") || "",
    // is_affiliated_order: true,
    // is_confirm_receipt_general: true,
  });
  const [query, setQuery] = useState({
    date_from: moment(new Date()).format("YYYY-MM-DD"),
    date_to: moment(new Date()).format("YYYY-MM-DD"),
  });
  function getQueryParams(name) {
    const searchParams = new URLSearchParams(window.location.search);
    const param = searchParams.get(name) ?? "";
    return param;
  }

  function getParams(
    page = 1,
    limit = 20,
    date_from,
    date_to,
    field_by,
    field_by_value
  ) {
    let params = `?page=${page}&limit=${limit}`;

    if (date_from) {
      params += `&date_from=${date_from}`;
    }

    if (date_to) {
      params += `&date_to=${date_to}`;
    }

    if (field_by && field_by_value) {
      params += `&field_by=${field_by}&field_by_value=${field_by_value}`;
    }

    const searchParams = new URLSearchParams(window.location.search);
    const phoneNumber = searchParams.get("phone_number") ?? "";
    if (phoneNumber) {
      params += `&phone_number=${phoneNumber}`;
    }

    return params;
  }

  function handleSort(option, e) {
    let newQuery = { ...queries };
    let keys = [...Object.keys(option)];
    hideParentElement(e);
    for (let i = 0; i < keys.length; i++) {
      if (keys[i] !== "title") newQuery[keys[i]] = option[keys[i]];
      else {
        if (currentStatus === option.title) return;
        if (option.title === "Tất cả")
          newQuery = {
            field_by: "",
            field_by_value: "",
          };
        setCurrentStatus(option.title);
        newQuery.page = 1;
      }
    }
    setQueries((prevQueries) => ({ ...prevQueries, ...newQuery }));
  }

  function handlePageSelect(page) {
    setQueries((prevQueries) => ({ ...prevQueries, page: page.page }));
  }
  function handleShowInfo(id) {
    window.location.href = `/don-hang/${id}`;
  }
  function onChangeDate(query, date) {
    setQueries((prevQueries) => ({
      ...prevQueries,
      date_from: date.date_from,
      date_to: date.date_to,
    }));
  }

  const phoneNumber = getQueryParams("phone_number");

  function handleChangeQueryString(q) {
    let queryKeys = [...Object.keys(q)];

    let queryStr = queryKeys.reduce((rs, v) => `${rs}${v}=${q[v]}&`, "?");

    // dispatch(c.getOrdersList(queryStr));
    dispatch(a.getReportGen(queryStr));
  }
  useEffect(() => {
    if (queries.field_by && queries.field_by_value) {
      const status =
        order_status_code.filter(
          (order_status) =>
            order_status.field_by_value === queries.field_by_value
        )?.[0]?.title || "Tất cả";
      setCurrentStatus(status);
    }
  }, []);

  useEffect(() => {
    // const params = getParams(
    //   queries.page,
    //   queries.limit,
    //   queries.date_from,
    //   queries.date_to,
    //   queries.field_by,
    //   queries.field_by_value
    // );

    // dispatch(a.getOrderImport(params));
    // dispatch(a.getOrderImport(params));
    let queryKeys = [...Object.keys(query)];
    let queryStr = queryKeys.reduce((rs, v) => `${rs}${v}=${query[v]}&`, "?");
    // dispatch(c.getOrdersList(getParams()));
    handleChangeQueryString(queries);
    dispatch(a.getAccountInfo());
    // dispatch(a.getReportGen());
  }, [
    dispatch,
    queries.date_from,
    queries.date_to,
    queries.field_by,
    queries.field_by_value,
    queries.limit,
    queries.page,
  ]);
  const data = [
    [
      "STT",
      "Họ tên khách hàng",
      "Số điện thoại",
      "Vai trò",
      "Tổng doanh số",
      "Tổng hoa hồng",
    ],
    ...(report?.data ?? []).map((chart, index) => [
      index + 1,
      chart.name,
      chart.phone_number,
      chart.is_collaborator === 1
        ? "Cộng tác viên"
        : chart.is_agent_have_general_agency === 1
        ? "Đại lý trực thuộc"
        : chart.is_agency === 0 &&
          chart.is_agent_have_general_agency === 0 &&
          chart.is_collaborator === 0 &&
          chart.is_general_agency === 0
        ? "Khách hàng"
        : null,
      chart.total_final,
      chart.total_share,
    ]),
  ];
  return (
    <AgencyOrderImportStyles className="receipt-tab">
      <div
        className="sort-option row"
        style={{ justifyContent: "space-between", marginBottom: "1em" }}
      >
        <div
          style={{
            display: "flex",
          }}
        >
          <PickerDate onChangeDate={onChangeDate} type={queries.type} />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          // flexDirection: "row",
          // rowGap: "10px",
          // marginBottom: "20px",
        }}
      >
        <div
          style={{
            flex: 1,
          }}
        >
          <h4>
            Cấp đại lý:{" "}
            <span style={{ color: "DodgerBlue " }}>
              {account?.agency_type?.name == null
                ? "Chưa có cấp"
                : account?.agency_type?.name}
            </span>
          </h4>
        </div>

        <div
          style={{
            flex: 1,
            textAlign: "end",
          }}
        >
          <ExportButtonContainer>
            <CSVLink data={data} className="export-link">
              Export Excel
            </CSVLink>
          </ExportButtonContainer>
        </div>
      </div>
      <div className="order__table-main">
        <table className="order__table">
          <thead>
            <tr>
              <th className="order-id">STT</th>
              <th className="order-id">Họ tên khách hàng</th>
              <th className="date">Số điện thoại</th>
              <th className="n-product">Vai trò</th>
              {/* <th className="total">Cấp đại lý(nếu lọc theo đại lý)</th> */}
              <th className="status">Tổng doanh số</th>
              <th className="status">Tổng hoa hồng</th>
            </tr>
          </thead>
          <tbody>
            {(report?.data ?? []).map((v, i) => (
              <tr key={i}>
                <td> {i + 1}</td>
                <td className="customer-id">{v.name}</td>
                <td>{v.phone_number}</td>
                <td>
                  {v.is_collaborator === 1 ? "Cộng tác viên" : null}
                  {v.is_agent_have_general_agency === 1
                    ? "Đại lý trực thuộc"
                    : null}
                  {v.is_agency === 0 &&
                  v.is_agent_have_general_agency === 0 &&
                  v.is_collaborator === 0 &&
                  v.is_general_agency === 0
                    ? "Khách hàng"
                    : null}
                </td>
                <td>{formatPrice(v.total_final)}</td>
                <td>{formatPrice(v.total_share)}</td>
                {/* <td className="date">{v.created_at.split(" ")[0]}</td>
                    <td className="n-product">
                      <div>{v.line_items_at_time[0].name}</div>
                      <span>
                        {v.line_items_at_time.length > 1
                          ? `0${v.line_items_at_time.length - 1} sản phẩm khác`
                          : null}
                      </span>
                    </td>
                    <td className="total"> {formatPrice(v.total_final)}</td> */}
                {/* <td className="status">{v.order_status_name}</td>
                    <td className="status">
                      {v.payment_status_name}
                      <br />
                    </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {report?.data?.length > 0 && (
        <Paginate
          handlePageSelect={handlePageSelect}
          totalPage={report.pagination.last_page}
          currentPage={report.pagination.current_page}
        />
      )}
    </AgencyOrderImportStyles>
  );
};

export default GenarelReport;
