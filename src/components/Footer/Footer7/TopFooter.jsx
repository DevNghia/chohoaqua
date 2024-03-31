import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { appActions } from "../../../actions/appActions";
import { userActions } from "../../../actions/userActions";
import { constants as c } from "../../../constants";
import styled from "styled-components";

const TopFooterStyles = styled.div`
  margin-bottom: 15px;
  .slogan-body {
    background-color: #fff;
    padding: 15px 0 10px;
    .row-slogan {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      .slogan-item {
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        column-gap: 8px;
        .icon-slogan {
          img {
            height: 48px;
            width: auto;
          }
        }
      }
    }
  }
  @media screen and (max-width: 500px) {
    .slogan-body {
      .row-slogan {
        .slogan-item {
          flex-direction: column;
          .icon-slogan {
            img {
              height: 40px;
              width: auto;
            }
          }
        }
      }
    }
  }
`;

export default function TopFooter() {
  const dispatch = useDispatch();

  const [phone, setPhone] = useState("");
  const tokenInfo = useSelector((state) => state.user.tokenInfo);
  const cartInfo = useSelector((state) => state.cart.cartInfo);
  const appTheme = useSelector((state) => state.app.appTheme);

  return (
    <React.Fragment>
      <TopFooterStyles className="top-footer7">
        <div className="container">
          <div id="slogan-main">
            <div className="slogan-top" />
            <div className="slogan-body">
              <div className="row-slogan">
                <div className="slogan-item">
                  <span className="icon-slogan">
                    <img
                      className="lazy-img lazy-loaded"
                      src={
                        process.env.PUBLIC_URL + "/img/dich-vu-uy-tin-icon.svg"
                      }
                      width={64}
                      height={48}
                      alt="✓"
                    />
                  </span>
                  <span className="service-name">Dịch vụ uy tín</span>
                </div>
                <div className="slogan-item">
                  <span className="icon-slogan">
                    <img
                      className="lazy-img lazy-loaded"
                      src={
                        process.env.PUBLIC_URL + "/img/doi-tra-hang-icon.svg"
                      }
                      width={64}
                      height={48}
                      alt="✓"
                    />
                  </span>
                  <span className="service-name">Đổi trả trong 7 ngày</span>
                </div>
                <div className="slogan-item">
                  <span className="icon-slogan">
                    <img
                      className="lazy-img lazy-loaded"
                      src={process.env.PUBLIC_URL + "/img/xe-giao-van.svg"}
                      width={64}
                      height={48}
                      alt="✓"
                    />
                  </span>
                  <span className="service-name">Giao hàng toàn quốc</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TopFooterStyles>
    </React.Fragment>
  );
}
