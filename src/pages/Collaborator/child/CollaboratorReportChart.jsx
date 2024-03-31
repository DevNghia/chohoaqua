import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { collaboratorActions as a } from "../../../actions/collaboratorActions";
import PickerDate from "../../../components/PickerDate/PickerDate";
import { formatPrice } from "../../../helper";

const CollaboratorReportChartStyles = styled.div`
  .report__content {
    display: flex;
    justify-content: space-between;
    color: #757575;
  }
  @media only screen and (max-width: 768px) {
    .report__content {
      .date-picker {
        width: auto !important;
      }
    }
  }
  @media only screen and (max-width: 576px) {
    .report__content {
      flex-direction: column-reverse;
      row-gap: 20px;
    }
  }
`;

const CollaboratorReportChart = () => {
  const dispatch = useDispatch();
  const report = useSelector((state) => state.collaborator.report);

  const [typeChart, setTypeChart] = useState("TOTAL_FINAL");

  function getReport(query) {
    dispatch(a.getCollaboratorReport(query));
  }
  function changeSelect(event) {
    setTypeChart(event.target.value);
  }

  var reportData2 = report;
  var labels = [];
  var total_final = {
    data: [],
    label: "Tổng tiền hàng",
    backgroundColor: "#3e95cd",
    fill: false,
  };
  var total_order_count = {
    data: [],
    label: "Số lượng đơn hàng",
    backgroundColor: "#ff6666",
    fill: false,
  };
  var total_referral_of_customer_count = {
    data: [],
    label: "Số lượng ctv giới thiệu",
    backgroundColor: "#ffbf00",
    fill: false,
  };

  if (reportData2 == null) {
    dispatch(a.getCollaboratorReport());
  } else {
    labels = reportData2.data_prime_time.charts.map(
      (dataInTime) => dataInTime.time
    );
    total_final = {
      data: reportData2.data_prime_time.charts.map(
        (dataInTime) => dataInTime.total_final
      ),
      label: "Tổng tiền hàng",
      backgroundColor: "#3e95cd",
      fill: false,
    };
    total_order_count = {
      data: reportData2.data_prime_time.charts.map(
        (dataInTime) => dataInTime.total_order_count
      ),
      label: "Số lượng đơn hàng",
      backgroundColor: "#ff6666",
      fill: false,
    };
    total_referral_of_customer_count = {
      data: reportData2.data_prime_time.charts.map(
        (dataInTime) => dataInTime.total_referral_of_customer_count
      ),
      label: "Số lượng ctv giới thiệu",
      backgroundColor: "#ffbf00",
      fill: false,
    };

    var reportData = {};

    if (typeChart == "TOTAL_FINAL") {
      reportData = {
        labels: labels,
        datasets: [total_final],
      };
    }
  }

  if (typeChart == "ORDER_COUNT") {
    reportData = {
      labels: labels,
      datasets: [total_order_count],
    };
  }
  if (typeChart == "CTV") {
    reportData = {
      labels: labels,
      datasets: [total_referral_of_customer_count],
    };
  }
  function onChangeDate(query) {
    getReport(query);
  }

  return reportData2 == null ? (
    <div></div>
  ) : (
    <CollaboratorReportChartStyles className="report">
      <div className="report__content">
        <div className="col col-7">
          <PickerDate onChangeDate={onChangeDate} />
          <div
            style={{
              marginTop: "25px",
              display: "flex",
              columnGap: "20px",
              flexWrap: "wrap",
            }}
          >
            <p>
              Tổng tiền hàng:{" "}
              <span
                style={{
                  color: "#2d3436",
                }}
              >
                {formatPrice(reportData2?.data_prime_time?.total_final ?? 0)}
              </span>
            </p>
            <p>
              Số lượng đơn:{" "}
              <span
                style={{
                  color: "#2d3436",
                }}
              >
                {reportData2?.data_prime_time?.total_order_count ?? 0}
              </span>
            </p>
            <p>
              Số CTV giới thiệu:{" "}
              <span
                style={{
                  color: "#2d3436",
                }}
              >
                {reportData2?.data_prime_time
                  ?.total_referral_of_customer_count ?? 0}
              </span>
            </p>
          </div>
        </div>
        <div className="col col-5 float-end">
          <div
            className="row"
            style={{
              alignItems: "center",
            }}
          >
            <label style={{ whiteSpace: "nowrap", paddingRight: "10px" }}>
              Biểu đồ chi tiết
            </label>
            <select
              onChange={changeSelect}
              name=""
              id="input"
              class="form-control form-select"
              required=""
              style={{ maxWidth: 280 }}
            >
              <option value="TOTAL_FINAL">Theo tổng tiền hàng</option>
              <option value="ORDER_COUNT"> Theo số lượng đơn hàng</option>
              <option value="CTV"> Theo số CTV giới thiệu</option>
            </select>
          </div>
        </div>
      </div>
      <div className="col-12" style={{ width: "auto" }}>
        <Bar
          data={reportData}
          options={{
            title: {
              display: true,
              text: "Báo cáo doanh số ",
            },
            legend: {
              display: true,
              position: "bottom",
            },
          }}
        />
      </div>
    </CollaboratorReportChartStyles>
  );
};

export default CollaboratorReportChart;
