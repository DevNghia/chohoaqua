import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Paginate from "../../../components/Paginate";
import Select from "../../../components/Select";
import { agencyActions as a } from "../../../actions/agencyAction";
import {
  formatPrice,
  hideParentElement,
  showNextElement,
} from "../../../helper";
import styled from "styled-components";
import history from "../../../history";
import PickerDate from "../../../components/PickerDate/PickerDate";
import { order_status_code } from "../../../utils/statusOrder";
import moment from "moment";

const AgencyOrderStyles = styled.div`
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

const AgencyOrder = ({ setTabActive }) => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.agency.orders);
  const account = useSelector((state) => state.agency.account);
  const profile = useSelector((state) => state.user.profile);

  const [currentStatus, setCurrentStatus] = useState("Trạng thái");
  const [queries, setQueries] = useState({
    date_from: getQueryParams("date_from") || "",
    date_to: getQueryParams("date_to") || "",
    page: getQueryParams("page") || 1,
    limit: getQueryParams("limit") || 20,
    field_by: getQueryParams("field_by") || "",
    field_by_value: getQueryParams("field_by_value") || "",
    type: getQueryParams("type") || "",
  });

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
    setQueries((prevQueries) => ({ ...prevQueries, page: page }));
  }

  function handleRemoveFilterPhoneNumber() {
    history.push("/dai-ly");
    setTabActive("order");
    const params = getParams(
      queries.page,
      queries.limit,
      moment(new Date()).format("YYYY-MM-DD"),
      moment(new Date()).format("YYYY-MM-DD")
    );
    setCurrentStatus("Tất cả");
    setQueries((prevQueries) => ({ ...prevQueries, type: "day" }));

    dispatch(a.getSharedOrder(params));
  }
  function getQueryParams(name) {
    const searchParams = new URLSearchParams(window.location.search);
    const param = searchParams.get(name) ?? "";
    return param;
  }
  function onChangeDate(query, date) {
    setQueries((prevQueries) => ({
      ...prevQueries,
      date_from: date.date_from,
      date_to: date.date_to,
    }));
  }

  const phoneNumber = getQueryParams("phone_number");
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
    const params = getParams(
      queries.page,
      queries.limit,
      queries.date_from,
      queries.date_to,
      queries.field_by,
      queries.field_by_value
    );

    dispatch(a.getSharedOrder(params));
    dispatch(a.getAccountInfo());
  }, [
    dispatch,
    queries.date_from,
    queries.date_to,
    queries.field_by,
    queries.field_by_value,
    queries.limit,
    queries.page,
  ]);
  return (
    <AgencyOrderStyles className="receipt-tab">
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
        <Select
          placeholder={currentStatus}
          handleSelect={handleSort}
          showDetail={(e) => showNextElement(e, 200)}
          values={[
            {
              title: "Tất cả",
            },
            ...order_status_code,
          ]}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          rowGap: "10px",
          marginBottom: "20px",
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
        <div>
          {phoneNumber ? (
            <span
              style={{
                padding: "5px 10px",
                backgroundColor: "#ffa700",
                borderRadius: "5px",
                color: "#fff",
                cursor: "pointer",
              }}
              onClick={handleRemoveFilterPhoneNumber}
            >
              Bỏ lọc SĐT
            </span>
          ) : null}
        </div>
      </div>
      <div className="order__table-main">
        <table className="order__table">
          <thead>
            <tr>
              <th className="order-id">Mã đơn hàng</th>
              <th className="date">Thời gian</th>
              <th className="n-product">Sản phẩm</th>
              <th className="total">Tổng tiền</th>
              <th className="status">T.t đơn hàng</th>
              <th className="status">T.t thanh toán</th>
              <th className="status">Hoa hồng</th>
            </tr>
          </thead>
          <tbody>
            {(orders?.data ?? []).map(
              (v, i) =>
                v.line_items_at_time.length > 0 && (
                  <tr key={i}>
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
                    <td className="status">
                      {v.agency_ctv_by_customer_referral_id == profile.id
                        ? formatPrice(v.share_agency_referen, false, true)
                        : formatPrice(v.share_agency, false, true)}
                    </td>
                  </tr>
                )
            )}
          </tbody>
        </table>
      </div>
      {orders?.data.length > 0 && (
        <Paginate
          handlePageSelect={handlePageSelect}
          totalPage={orders.last_page}
          currentPage={orders.current_page}
        />
      )}
    </AgencyOrderStyles>
  );
};

export default AgencyOrder;
