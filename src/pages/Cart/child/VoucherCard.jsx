import { useSelector } from "react-redux";
import styled from "styled-components";
import { formatPrice, formatNoD } from "../../../helper";

const VoucherCardStyles = styled.div`
  .voucher-content {
    box-shadow: 0 2px 6px 0 rgb(0 0 0 / 10%);
    border-radius: 10px !important;
    height: 9rem !important;
    .voucher-img {
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
    }
  }
  .voucher-count {
    top: 0.75rem;
    &::after {
      border-left-color: ${(props) => props.colorTheme} !important;
    }
  }
  .voucher-title {
    padding: 10px 0;
    .voucher-text {
      & > span {
        div {
          span {
            font-weight: 500 !important;
          }
        }
      }
    }
  }
`;

export default function VoucherCard(props) {
  const appTheme = useSelector((state) => state.app.appTheme);
  function buildItemsProduct(voucher) {
    var pros = "";

    voucher.products.forEach((element) => {
      pros += element.name + ",";
    });

    if (pros.length > 0) {
      pros = pros.substring(0, pros.length - 1);
    }

    return pros?.length > 60 ? pros.slice(0, 60) + "..." : pros;
  }

  return (
    <VoucherCardStyles className="FSFSpc" colorTheme={appTheme.color_main_1}>
      <div className="qa9DDd U0bjBP VK0V4t voucher-content">
        {/* <button className="info-btn" style={{ backgroundColor: "green" }} onClick={() => props.onSelect(props.voucher.code)}>
         Áp dụng
      </button> */}
        <div className="rUjxLt voucher-img" style={{ marginLeft: "10px" }}>
          <div style={{ width: "120px", height: "120px" }}>
            {props.voucher.discount_for === 1 ? (
              <img
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: appTheme.color_main_1,
                }}
                src="./img/iconfreeship.png"
                alt="icon-freeshipping"
              />
            ) : (
              <img
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: appTheme.color_main_1,
                }}
                src="./img/iconvoucher.png"
                alt="iconvoucher"
              />
            )}
          </div>
          <div className="jIFCDN" />
        </div>
        <div
          className="iGWmjk SJcecu aoD7ll voucher-title"
          style={{ borderColor: "#e8e8e8" }}
        >
          <div
            className="RystvV hX0Gca C8GVIk voucher-text"
            onClick={() => props.onSelect(props.voucher.code)}
            data-dismiss="modal"
          >
            <div>
              <span className="io0LX9">
                {props.voucher.discount_for === 1 && (
                  <div className="EB8SEw">
                    <div className="oDOFV5 dA2zot">
                      <div
                        className="MCYRBF"
                        style={{
                          backgroundImage:
                            'url("https://cf.shopee.vn/file/29fce99e108e60ab2835854f4150c4d4")',
                          height: "14px",
                          width: "48.8px",
                        }}
                      />
                    </div>
                  </div>
                )}

                <span style={{ "font-weight": "600" }} className="kEhYtN">
                  {props.voucher.name}
                </span>
              </span>
            </div>
            <div>
              <span
                className="kEhYtN"
                style={{
                  "font-size": ".84rem",
                  marginTop: "7px",
                  display: "-webkit-box",
                  "-webkit-line-clamp": "2",
                  "-webkit-box-orient": "vertical",
                  overflow: "hidden",
                }}
              >
                Áp dụng:{" "}
                {props.voucher.voucher_type == 0 && <>Toàn bộ sản phẩm</>}
                {props.voucher.voucher_type == 1 && (
                  <>Các sản phẩm: {buildItemsProduct(props.voucher)}</>
                )}
              </span>
            </div>
            <div>
              <span className="kEhYtN" style={{ "font-size": ".84rem" }}>
                Đơn hàng từ:{" "}
                {formatPrice(Number(props.voucher.value_limit_total))}
              </span>
            </div>

            <div className="aHZeXi">
              <div className="_0ZX7+X">
                <div className="YsfdPb">
                  {`
                  ${
                    props.voucher.discount_for != 1
                      ? props.voucher.discount_type === 0
                        ? "Giảm: " +
                          formatPrice(Number(props.voucher.value_discount))
                        : "Giảm: " + props.voucher.value_discount + "%"
                      : props.voucher.is_free_ship === true
                      ? "Miễn phí vận chuyển"
                      : "Giảm: " +
                        formatPrice(Number(props.voucher.ship_discount_value))
                  }
                     `}
                </div>
              </div>
            </div>
            <span className="m9r1QO Ye-hND wAr1RU">
              <div className="mpTlYm">
                <span className="rSFiRJ X4QhKP">
                  HSD: {props.voucher.end_time}
                </span>
              </div>
            </span>
          </div>
          <div className="uEtbTV JR-5UM KaAPQW">
            <div className="Sw3kAk agVqol">
              <div className="_2B0ZkF z9U4WD" />
            </div>
            {/* <div className="r2IIGm">
            <a
              href="/voucher/details?evcode=RlNWLTQxNTUxNDM4OTk1NDU2MA%3D%3D&promotionId=415514389954560&signature=e716f7bb60d75b56ea9def511154f3747be717748d0f8b637630ef24ff201ea2"
              rel="noopener noreferrer"
              target="_blank"
            >
              Điều Kiện
            </a>
          </div> */}
          </div>
        </div>
        <div
          className="gJh+4V jjYXLV fpTTCj voucher-count"
          style={{
            backgroundColor: appTheme.color_main_1,
            boxShadow: "0 2px 4px 0 rgb(0 0 0 / 10%)",
          }}
        >
          Còn lại {formatNoD(Number(props.voucher.amount - props.voucher.used))}{" "}
          lượt sử dụng
        </div>
      </div>
    </VoucherCardStyles>
    // <div className="voucher-card row">
    //   <button className="info-btn" style={{ backgroundColor: "green" }} onClick={() => props.onSelect(props.voucher.code)}>
    //     Áp dụng
    //   </button>
    //   <div className="name">
    //     <div>
    //       {props.voucher.name}
    //     </div>
    //   </div>
    //   <div className="info">
    //     <div>
    //       <div className="value">
    //         Giảm {props.voucher.discount_for != 1 ? (
    //           props.voucher.discount_type === 1 ? props.voucher.value_discount + "%" : "₫" + formatPrice(props.voucher.value_discount)
    //         ) : ( props.voucher.is_free_ship === true ? "Miễn phí vận chuyển" :formatPrice(props.voucher.ship_discount_value) )}
    //       </div>
    //       <div className="code">
    //         <span style={{fontWeight : "600"}}>{props.voucher.discount_for !== 1 ? "Giảm giá đơn hàng" : "Giảm giá vận chuyển" }</span>
    //       </div>
    //       <div className="code">
    //         <span>Mã: </span> {props.voucher.code}
    //       </div>
    //       {
    //         props.voucher.value_limit_total &&
    //         <div className="apply">
    //           Cho đơn hàng từ {formatPrice(props.voucher.value_limit_total)}
    //         </div>
    //       }
    //     </div>
    //     <div className="end">
    //       <span>HSD: </span> {props.voucher.end_time.split(" ")[0]}
    //     </div>
    //   </div>
    // </div>
  );
}
