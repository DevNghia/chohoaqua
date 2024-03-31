import React, { useState } from "react";
import { Chart as ChartJS, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { agencyActions as a } from "../../../actions/agencyAction";
import PickerDate from "../../../components/PickerDate/PickerDate";
import { formatPrice } from "../../../helper";
ChartJS.register(...registerables);

const AgencyReportChartImportStyles = styled.div`
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

const AgencyReportChartImport = () => {
  const dispatch = useDispatch();
  const { reportImport: report } = useSelector((state) => state.agency);

  const [typeChart, setTypeChart] = useState("TOTAL_FINAL");

  function getReport(query) {
    dispatch(a.getAgencyReportImport(query));
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
    label: "Số lượng khách hàng giới thiệu",
    backgroundColor: "#ffbf00",
    fill: false,
  };

  if (!reportData2) {
    dispatch(a.getAgencyReportImport());
  } else {
    labels = reportData2.data_prime_time.charts.map(
      (dataInTime) => dataInTime.time
    );
    total_final = {
      data: reportData2.data_prime_time.charts.map(
        (dataInTime) => dataInTime.total_after_discount_no_bonus
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
      label: "Số lượng khách hàng giới thiệu",
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

  if (typeChart == "TOTAL_FINAL") {
    reportData = {
      labels: labels,
      datasets: [total_final],
    };
  }
  if (typeChart == "ORDER_COUNT") {
    reportData = {
      labels: labels,
      datasets: [total_order_count],
    };
  }
  if (typeChart == "CUSTOMER_COUNT") {
    reportData = {
      labels: labels,
      datasets: [total_referral_of_customer_count],
    };
  }
  function onChangeDate(query) {
    getReport(query);
  }

  return !reportData2 ? (
    <div></div>
  ) : (
    <AgencyReportChartImportStyles className="report">
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
                {formatPrice(
                  reportData2?.data_prime_time?.total_after_discount_no_bonus ??
                    0
                )}
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
              Số khách hàng giới thiệu:{" "}
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
              <option value="CUSTOMER_COUNT">
                {" "}
                Theo số khách hàng giới thiệu
              </option>
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
    </AgencyReportChartImportStyles>
  );
};

export default AgencyReportChartImport;
