import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CategoryItem from "./CategoryItem";

export default function Categories({ categories }) {
  const appTheme = useSelector((state) => state.app.appTheme);
  useEffect(() => {
    if (window.location.pathname !== "/") {
    }
  }, [window.location.pathname]);
  return (
    <div
      className={`navigation-wrapper ${
        window.location.pathname !== "/" && "notHome"
      }`}
    >
      <nav className="h-100 wrapper">
        <ul className="navigation list-group list-group-flush scroll">
          {categories.map((v, i) => (
            <>
              <CategoryItem v={v} />
            </>
          ))}
        </ul>
      </nav>
    </div>
  );
}
