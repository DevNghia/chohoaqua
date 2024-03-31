import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export default function CategoryHome() {
  const history = useHistory();
  const appTheme = useSelector((state) => state.app.appTheme);
  const categories = useSelector((state) => state.category.categories);
  useEffect(() => {
    if (window.location.pathname !== "/") {
    }
  }, [window.location.pathname]);

  // lọc bỏ nhưng thằng category có category_children
  //   const newListCategory = categories.filter((v) => !v.category_children.length);
  return (
    <div className={``}>
      <nav className="">
        <ul
          className=""
          style={{
            display: "flex",
            // overflow: "hidden",
            overflowX: "scroll",
            background: "white",
            height: "114px",
          }}
        >
          {categories.map((v, i) => (
            <>
              <li
                className=""
                style={{
                  padding: "12px",
                  cursor: "pointer",
                  width: "calc(100% / 11)",
                  flexShrink: "0",
                  cursor: "pointer",
                }}
                // onClick={() => setShowChildren(!isShowChildren)}
              >
                <div
                  style={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    flexDirection: "column",
                    gap: "4px",
                  }}
                  onClick={
                    () => history.push(`/san-pham?danh-muc=${v.slug}-${v.id}`)
                    // !v.category_children.length
                    //   ?
                    //   : null
                  }
                >
                  <img
                    src={v.image_url || "./img/default_product.jpg"}
                    alt="category"
                    style={{ width: "48px", height: "48px" }}
                  />
                  <span
                    style={{
                      fontWeight: "500",
                      display: "block",
                      color: "black",
                      fontSize: "11px",
                      textTransform: "uppercase",
                      padding: "4px 8px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      //   whiteSpace: "nowrap",
                      lineHeight: "1.2em",
                      maxHeight: "28px",
                      width: "100px",
                      textAlign: "center",
                    }}
                  >
                    {" "}
                    {v.name}
                  </span>
                  {/* </Link> */}
                </div>
              </li>
              {/* {v.category_children.length > 0 &&
                v.category_children.map((v2) => (
                  <li
                    className=""
                    style={{
                      padding: "12px",
                      cursor: "pointer",
                      width: "calc(100% / 11)",
                      flexShrink: "0",
                      cursor: "pointer",
                    }}
                  >
                    <div
                      style={{
                        alignItems: "center",
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        flexDirection: "column",
                        gap: "4px",
                      }}
                      onClick={
                        () =>
                          history.push(`/san-pham?danh-muc=${v2.slug}-${v2.id}`)
                     
                      }
                    >
                      <img
                        src={v2.image_url || "./img/default_product.jpg"}
                        alt="category"
                        style={{ width: "48px", height: "48px" }}
                      />
                      <span
                        style={{
                          fontWeight: "500",
                          display: "block",
                          color: "black",
                          fontSize: "11px",
                          textTransform: "uppercase",
                          padding: "4px 8px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          lineHeight: "1.2em",
                          maxHeight: "28px",
                          width: "100px",
                          textAlign: "center",
                        }}
                      >
                        {" "}
                        {v2.name}
                      </span>
                    </div>
                  </li>
                ))} */}
            </>
          ))}
        </ul>
      </nav>
    </div>
  );
}
