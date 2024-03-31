import Slider from "react-slick";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { RangeDatePicker } from "react-google-flight-datepicker";
import "react-google-flight-datepicker/dist/main.css";

export default function PickerDate(props) {
  const appTheme = useSelector((state) => state.app.appTheme);
  const { banners, discountProducts } = props;

  const [currentDayStart, setCurrentDayStart] = useState(Date.now());
  const [currentDayEnd, setCurrentDayEnd] = useState(Date.now());
  const [typeDate, setTypeDate] = useState("HOM-NAY");

  const selectionRange = {
    startDate: currentDayStart,
    endDate: currentDayEnd,
    key: "selection",
  };

  function changeSelect(event) {
    setTypeDate(event.target.value);

    getTimeByType(event.target.value);
  }

  function getTimeByType(typeDate) {
    var date1 = new Date();
    var date2 = new Date();
    var type = "day";

    if (typeDate == "HOM-NAY") {
      var today = new Date();
      date1 = new Date();
      date2 = new Date();
      type = "day";
    }

    if (typeDate == "THANG-NAY") {
      var date = new Date();
      var date1 = new Date(date.getFullYear(), date.getMonth(), 1);
      var date2 = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      type = "month";
    }

    if (typeDate == "TUAN-NAY") {
      var dt = new Date(); //current date of week
      var currentWeekDay = dt.getDay();
      var lessDays = currentWeekDay == 0 ? 6 : currentWeekDay - 1;
      var date1 = new Date(new Date(dt).setDate(dt.getDate() - lessDays));
      var date2 = new Date(new Date(date1).setDate(date1.getDate() + 6));
      type = "week";
    }

    if (typeDate == "NAM-NAY") {
      var date = new Date();
      var date1 = new Date(date.getFullYear(), 0);
      var date2 = new Date(date.getFullYear(), 11, 31);
      type = "year";
    }

    setCurrentDayStart(date1);
    setCurrentDayEnd(date2);

    if (typeDate != "TUY-CHINH") {
      var strTime1 =
        date1.getFullYear() +
        "-" +
        (date1.getMonth() + 1) +
        "-" +
        date1.getDate();
      var strTime2 =
        date2.getFullYear() +
        "-" +
        (date2.getMonth() + 1) +
        "-" +
        date2.getDate();

      props.onChangeDate("?date_from=" + strTime1 + "&date_to=" + strTime2, {
        date_from: strTime1,
        date_to: strTime2,
        type,
      });
    }
  }

  function onDateChange(d1, d2) {
    setCurrentDayStart(d1);
    setCurrentDayEnd(d2);

    var date1 = new Date(d1);
    var date2 = new Date(d2);

    var strTime1 =
      date1.getFullYear() +
      "-" +
      (date1.getMonth() + 1) +
      "-" +
      date1.getDate();
    var strTime2 =
      date2.getFullYear() +
      "-" +
      (date2.getMonth() + 1) +
      "-" +
      date2.getDate();
    props.onChangeDate("?date_from=" + strTime1 + "&date_to=" + strTime2, {
      date_from: strTime1,
      date_to: strTime2,
      type: "other",
    });
  }
  function getQueryParams(name) {
    const searchParams = new URLSearchParams(window.location.search);
    const param = searchParams.get(name) ?? "";
    return param;
  }

  useEffect(() => {
    if (props.type) {
      const type =
        props.type === "day"
          ? "HOM-NAY"
          : props.type === "week"
          ? "TUAN-NAY"
          : props.type === "month"
          ? "THANG-NAY"
          : props.type === "year"
          ? "NAM-NAY"
          : "TUY-CHINH";
      if (type === "TUY-CHINH") {
        const dateFrom = getQueryParams("date_from");
        const dateTo = getQueryParams("date_to");
        if (dateFrom && dateTo) {
          setCurrentDayStart(new Date(dateFrom));
          setCurrentDayEnd(new Date(dateTo));
        }
      }
      // else {
      //   getTimeByType(type);
      // }
      setTypeDate(type);
    }
  }, [props.type]);

  return (
    <div
      className="row date-picker"
      style={{
        alignItems: "center",
      }}
    >
      <div
        className="col-12 row"
        style={{
          alignItems: "center",
        }}
      >
        {props.hideText != true && (
          <label
            style={{
              paddingRight: "10px",
              whiteSpace: "nowrap",
              fontSize: "14px",
            }}
          >
            Thời gian
          </label>
        )}
        <select
          onChange={changeSelect}
          value={typeDate}
          name=""
          id="input"
          class="form-control form-select"
          required=""
          style={{ maxWidth: 200, width: "190px important" }}
        >
          <option value="HOM-NAY">Hôm nay</option>
          <option value="TUAN-NAY">Tuần này</option>
          <option value="THANG-NAY">Tháng này</option>
          <option value="NAM-NAY">Năm này</option>
          <option value="TUY-CHINH">Tùy chỉnh</option>
        </select>
      </div>

      <div className="col-12">
        {typeDate == "TUY-CHINH" ? (
          <RangeDatePicker
            startDate={currentDayStart}
            endDate={currentDayEnd}
            onChange={(startDate, endDate) => onDateChange(startDate, endDate)}
            minDate={new Date(1900, 0, 1)}
            maxDate={new Date(2100, 0, 1)}
            dateFormat="DD/MM/YYYY"
            monthFormat="MMM YYYY"
            startDatePlaceholder="Ngày bắt đầu"
            endDatePlaceholder="Ngày kết thúc"
            disabled={false}
            className="my-own-class-name"
            startWeekDay="monday"
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
