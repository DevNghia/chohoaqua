import React, { useEffect, useRef, useState } from "react";
import CommentTab from "./CommentTab";
import styled from "styled-components";
import { useSelector } from "react-redux";
const DetailInfoStyles = styled.div`
  .detail {
    h3 {
      font-family: "Inter", sans-serif;
    }
    .row {
      font-size: 14px !important;
    }
    .title {
      background: transparent !important;
      font-weight: 600 !important;
      font-family: "Inter", sans-serif;
    }
    .info {
      background: transparent !important;
      font-weight: 400;
      font-family: "Inter", sans-serif;
    }
  }
  .tabs {
    .row {
      h3 {
        font-family: "Inter", sans-serif;
      }
    }
  }
  .btn-more {
    display: flex;
    justify-content: center;
    margin-top: 15px;
    & > div {
      display: flex;
      align-items: center;
      cursor: pointer;
      column-gap: 8px;
      font-size: 18px;
    }
  }
`;
export default function DetailInfo(props) {
  const { description, attributes } = props;
  const [currentTab, setCurrentTab] = useState("description");
  const appTheme = useSelector((state) => state.app.appTheme);
  const [moreDescription, setMoreDescription] = useState({
    isMore: false,
    height: "auto",
  });
  const isSetShowMoreRef = useRef(false);

  const handleShowMoreDescription = (type) => {
    setMoreDescription((prevMoreDescription) => ({
      ...prevMoreDescription,
      height: type === "shorten" ? "1000px" : "auto",
    }));
  };

  useEffect(() => {
    const descriptionContent = document.querySelector("#description");
    if (descriptionContent && isSetShowMoreRef.current === false) {
      if (descriptionContent.offsetHeight > 1000) {
        setMoreDescription((prev) => ({
          ...prev,
          isMore: true,
          height: "800px",
        }));
        isSetShowMoreRef.current = true;
      }
    }
  }, []);
  return (
    <DetailInfoStyles className="detail-info">
      <div className="detail">
        <h3>Thông tin chi tiết</h3>
        {attributes.map((v, i) => (
          <div className="row" key={i}>
            <div className="title">{v.name}</div>
            <div className="info">{v.value}</div>
          </div>
        ))}
      </div>
      <div className="tabs">
        <React.Fragment>
          <div className="row">
            <h3
              onClick={() => setCurrentTab("description")}
              style={{
                borderBottom: `2px solid ${
                  currentTab === "description"
                    ? appTheme.color_main_1
                    : "transparent"
                }`,
              }}
            >
              Mô tả sản phẩm
            </h3>
            <h3
              onClick={() => setCurrentTab("comment")}
              style={{
                borderBottom: `2px solid ${
                  currentTab === "comment"
                    ? appTheme.color_main_1
                    : "transparent"
                }`,
              }}
            >
              Đánh giá
            </h3>
          </div>
          {currentTab === "description" ? (
            <React.Fragment>
              {description ? (
                <>
                  <div
                    className="description sun-editor-editable"
                    id="description"
                    style={{
                      paddingLeft: "1em",
                      height: moreDescription.isMore
                        ? moreDescription.height
                        : "auto",
                      overflow: moreDescription.isMore ? "hidden" : "visible",
                    }}
                    dangerouslySetInnerHTML={{ __html: description }}
                  ></div>
                  {moreDescription.isMore ? (
                    <>
                      {moreDescription.height === "auto" ? (
                        <div
                          className="btn-more"
                          onClick={() => handleShowMoreDescription("shorten")}
                        >
                          <div>
                            Thu gọn <i className="fa fa-angle-up"></i>
                          </div>
                        </div>
                      ) : (
                        <div
                          className="btn-more"
                          onClick={() => handleShowMoreDescription("seeMore")}
                        >
                          <div>
                            Xem thêm <i className="fa fa-angle-down"></i>
                          </div>
                        </div>
                      )}
                    </>
                  ) : null}
                </>
              ) : (
                <div className="description">
                  <div
                    style={{
                      textAlign: "center",
                      fontSize: "18px",
                      color: "#757575",
                    }}
                  >
                    Sản phẩm chưa có mô tả từ nhà cung cấp
                  </div>
                </div>
              )}
            </React.Fragment>
          ) : (
            <CommentTab productId={props.productId} />
          )}
        </React.Fragment>
      </div>
    </DetailInfoStyles>
  );
}
