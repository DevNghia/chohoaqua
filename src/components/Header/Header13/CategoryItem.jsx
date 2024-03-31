import { is } from "core-js/core/object";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory  } from "react-router-dom";
import styled from "styled-components";

export default function CategoryItem({ v }) {
  const history = useHistory ();
  const appTheme = useSelector((state) => state.app.appTheme);
  const [isShowChildren, setShowChildren] = useState(false);
  
  const textChildrenStyles = styled.div`
    color: red;
    &:hover {
      color: ${appTheme.color_main_1};
    }
  `;

  return (
    <li
      //   className="menu-item list-group-item menu-main parent"
      className="category-item"
      style={{
        padding: "12px",
        borderBottom: "1px solid #e5e5e5",
        cursor: "pointer",
      }}
      onClick={() => setShowChildren(!isShowChildren)}
    >
      {/* <Link
        to={`/san-pham?danh-muc=${v.slug}-${v.id}`}
        className="menu-item__link"
        title="Chăm sóc da mặt"
      > */}
      <div
        style={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
        onClick={() =>
          !v.category_children.length
            ? history.push(`/san-pham?danh-muc=${v.slug}-${v.id}`)
            : null
        }
      >
        <span
          style={{
            fontWeight: "500",
            display: "block",
            color: "black",
            fontSize: "14px",
            textTransform: "uppercase",
          }}
        >
          {" "}
          {v.name}
        </span>
        {/* </Link> */}
        {v.category_children.length > 0 && (
          <i
            className={`fas fa-chevron-${isShowChildren ? "up" : "down"}`}
            style={{
              color: appTheme.color_main_1,
              marginLeft: "auto",
              fontSize: "12px",
              //   marginTop: 9,
            }}
          ></i>
        )}
      </div>
      {isShowChildren && (
        <div
          //    className="sub-menu-2 wrapper"
          className="sub-category-2"
        >
          <ul
            style={{
              width: `calc(223px*${Math.ceil(v.category_children.length / 8)})`,
              maxWidth: `calc(223px*4)`,
              // height:
              //   Math.ceil(v.category_children.length / 8) > 1
              //     ? "378px"
              //     : `calc(46px*${v.category_children.length})`,
              marginTop: v.category_children.length ? "12px" : "0",
            }}
          >
            {v.category_children.map((item) => (
              <li
                style={{
                  width: "223px",
                }}
              >
                <div className="sub-category-2-item">
                  <Link
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                      padding: "12px 6px",
                      fontSize: "14px",
                    }}
                    to={`/san-pham?danh-muc-con=${item.slug}-${item.id}`}
                  >
                    {/* <div className="image">
                    <div className="img-list">
                      <img
                        src={item.image_url || "./img/default_product.jpg"}
                        alt="category"
                      />
                    </div>
                  </div> */}
                    <textChildrenStyles> {item.name}</textChildrenStyles>
                    {/* <div className="list-names"> {item.name}</div> */}
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}
