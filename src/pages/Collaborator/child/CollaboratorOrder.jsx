import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Paginate from "../../../components/Paginate";
import Select from "../../../components/Select";
import { collaboratorActions as a } from "../../../actions/collaboratorActions";
import {
  formatPrice,
  hideParentElement,
  showNextElement,
} from "../../../helper";
import styled from "styled-components";
import history from "../../../history";
import PickerDate from "../../../components/PickerDate/PickerDate";
import moment from "moment";
import { order_status_code } from "../../../utils/statusOrder";

const CollaboratorOrderStyles = styled.div`
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

const CollaboratorOrder = ({ setTabActive }) => {
  const dispatch = useDispatch();
  const appTheme = useSelector((state) => state.app.appTheme);
  const orders = useSelector((state) => state.collaborator.orders);
  const profile = useSelector((state) => state.user.profile);

  const superior = useSelector((state) => state.collaborator.superior);

  const [currentStatus, setCurrentStatus] = useState("Trạng thái");
  const [queries, setQueries] = useState({
    date_from: getQueryParams("date_from") || "",
    date_to: getQueryParams("date_to") || "",
    page: getQueryParams("page") || 1,
    limit: getQueryParams("limit") || 20,
    field_by: getQueryParams("field_by") || "",
    field_by_value: getQueryParams("field_by_value") || "",
    type: getQueryParams("type") || "",
    order: getQueryParams("order") || "",
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
    field_by_value,
    order = ""
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

    if (order) {
      params += `&order=${order}`;
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
  function handleRemoveFilterPhoneNumber() {
    history.push("/cong-tac-vien");
    setTabActive("order");
    const params = getParams(
      queries.page,
      queries.limit,
      moment(new Date()).format("YYYY-MM-DD"),
      moment(new Date()).format("YYYY-MM-DD"),
      ""
    );
    setCurrentStatus("Tất cả");
    setQueries((prevQueries) => ({ ...prevQueries, type: "day" }));

    dispatch(a.getSharedOrder(params));
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
      queries.field_by_value,
      queries.order
    );

    dispatch(a.getSharedOrder(params));
    dispatch(a.getSuperior(profile.id));
  }, [
    dispatch,
    queries.date_from,
    queries.date_to,
    queries.field_by,
    queries.field_by_value,
    queries.limit,
    queries.order,
    queries.page,
  ]);

  function handleShowInfo(id) {
    window.location.href = `/don-hang/${id}`;
  }
  return (
    <CollaboratorOrderStyles className="receipt-tab">
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
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h4>
          Đại lý cấp trên:{" "}
          <span style={{ color: "DodgerBlue " }}>
            {superior[0]?.name_superior}
          </span>
        </h4>
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

      <div className="order__table-main">
        <table className="order__table">
          <thead>
            <tr>
              <th className="date">Ngày đặt</th>
              <th className="value">Mã đơn hàng</th>
              <th className="value">Tên người đặt đơn</th>
              <th className="value">SĐT nhận đơn</th>
              <th className="value">Giá trị đơn hàng</th>

              <th>Trạng thái</th>
              {/* <th>Hoa hồng giới thiệu</th> */}
              <th>Hoa hồng</th>
              {/* <th className="mobile"></th> */}
            </tr>
          </thead>
          <tbody>
            {orders.data.map((order, i) => (
              <tr key={i} onClick={() => handleShowInfo(order.order_code)}>
                <td className="date">{order.created_at.slice(0, 10)}</td>
                <td className="value">{order.order_code}</td>
                <td className="value">{order.customer?.name}</td>
                <td className="value">{order.customer_phone}</td>
                <td className="value">{formatPrice(order.total_final)}</td>
                <td>{order.order_status_name}</td>

                <td>
                  {order.collaborator_by_customer_id == profile.id
                    ? formatPrice(order.share_collaborator, false, true)
                    : formatPrice(
                        order.share_collaborator_referen,
                        false,
                        true
                      )}
                </td>
                {/* <td className="mobile">
                <button style={{ background: appTheme.color_main_1 }}>
                  Chi tiết
                </button>
              </td> */}
              </tr>
            ))}
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
    </CollaboratorOrderStyles>
  );
};

export default CollaboratorOrder;
