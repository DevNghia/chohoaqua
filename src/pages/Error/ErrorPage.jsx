import React from "react";
import { useSelector } from "react-redux";
import queryString from "query-string";

import { constants as c } from "../../constants";
import { useEffect } from "react";

const Header = React.lazy(() => import("../../components/Header"));
const Footer = React.lazy(() => import("../../components/Footer"));

function ErrorPage(props) {
  let query = queryString.parse(props.location.search);
  const categoryStatus = useSelector((state) => state.category.status);
  useEffect(() => {
    if (Object.keys(query).length > 0) {
      document.title = query.message;
    } else {
      document.title = "Trang không tồn tại";
    }
    if (query.code == "undefined") {
      window.location.href = "/";
    }
  });

  return (
    <React.Suspense fallback={""}>
      {" "}
      <React.Fragment>
        {Object.keys(query).length > 0 ? (
          <div className="err-page">
            {query.code} <br />
            {query.message}
          </div>
        ) : (
          <div className="err-page">
            404 <br />
            Trang không tồn tại
          </div>
        )}
        <Footer />
      </React.Fragment>
    </React.Suspense>
  );
}
export default ErrorPage;
