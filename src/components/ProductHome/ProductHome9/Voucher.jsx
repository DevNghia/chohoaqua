import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./style.css";
import { formatPriceV2 } from "../../../helper";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default function Voucher({ vouchers }) {
  console.log("vouchers: ", vouchers);
  const appTheme = useSelector((state) => state.app.appTheme);
  const [isCopied, setCopied] = useState(false);
  const [idCopied, setIdCopied] = useState();

  const IconVoucher = () => {
    return (
      <svg
        width="110"
        height="80"
        viewBox="0 0 110 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M108.286 0H1.71446C0.765794 0 0 1.01132 0 2.26415V5.50943C0 6.6566 0.662926 7.63774 1.53159 7.75849C3.06318 7.96981 4.20615 9.64528 4.20615 11.6528C4.20615 13.6604 3.06318 15.3509 1.53159 15.5623C0.651496 15.683 0 16.6491 0 17.8113V24.3925C0 25.5547 0.651496 26.5208 1.53159 26.6415C3.06318 26.8679 4.20615 28.5434 4.20615 30.5509C4.20615 32.5585 3.06318 34.234 1.53159 34.4604C0.662926 34.5811 0 35.5472 0 36.7094V43.2906C0 44.4528 0.651496 45.4189 1.53159 45.5396C3.06318 45.7509 4.20615 47.4415 4.20615 49.4491C4.20615 51.4566 3.06318 53.1321 1.53159 53.3434C0.662926 53.4642 0 54.4453 0 55.5925V62.1887C0 63.351 0.662926 64.317 1.53159 64.4377C3.06318 64.6491 4.20615 66.3245 4.20615 68.3321C4.20615 70.3396 3.06318 72.0302 1.53159 72.2415C0.662926 72.3623 0 73.3283 0 74.4906V77.7359C0 78.9887 0.765794 80 1.71446 80H108.286C109.234 80 110 78.9887 110 77.7359V74.5057C110 73.3283 109.314 72.3472 108.423 72.2566C106.868 72.1057 105.645 70.3849 105.645 68.3321C105.645 66.2793 106.868 64.5736 108.423 64.4226C109.314 64.3321 110 63.3509 110 62.1736V55.6226C110 54.4302 109.314 53.4491 108.423 53.3585C106.868 53.2075 105.645 51.4868 105.645 49.4491C105.645 47.4113 106.868 45.6906 108.423 45.5245C109.314 45.4491 110 44.4528 110 43.2755V36.7245C110 35.5321 109.314 34.5509 108.423 34.4604C106.868 34.3094 105.645 32.5887 105.645 30.5509C105.645 28.5132 106.868 26.7925 108.423 26.6415C109.314 26.5509 110 25.5698 110 24.3774V17.8264C110 16.6491 109.314 15.6679 108.423 15.5774C106.868 15.4113 105.645 13.6906 105.645 11.6528C105.645 9.61509 106.868 7.89434 108.423 7.7434C109.314 7.65283 110 6.6717 110 5.47925V2.26415C110 1.01132 109.234 0 108.286 0Z"
          fill={appTheme.color_main_1}
        />
      </svg>
    );
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);
        setIdCopied(id);
      })
      .catch((error) => {
        console.error("Failed to copy text:", error);
      });
  };

  if (!vouchers || !vouchers.length) return null;
  return (
    <div className="home-voucher-container">
      <Link to="ma-giam-gia">
        <p className="btn-view-all" style={{ color: appTheme.color_main_1 }}>
          Xem tất cả
        </p>
      </Link>
      {vouchers.map((item, index) => {
        const {
          id,
          name,
          code,
          value_discount,
          value_limit_total,
          is_free_ship,
          discount_type,
          is_show_voucher,
          ship_discount_value,
        } = item;

        const renderInfoVoucher = () => {
          if (discount_type) {
            return (
              <div>
                {!value_discount ? (
                  <p className="voucher-detail">
                    Mã giảm {value_discount}% cho đơn từ{" "}
                    {value_limit_total ? formatPriceV2(value_limit_total) : 0}đ
                  </p>
                ) : (
                  <p className="voucher-detail">
                    Mã giảm {value_discount}% cho đơn từ{" "}
                    {value_limit_total ? formatPriceV2(value_limit_total) : 0}đ
                  </p>
                )}
              </div>
            );
          }

          if (is_free_ship !== null) {
            return (
              <p className="voucher-detail">
                {is_free_ship
                  ? "Miễn phí vận chuyển"
                  : `Giảm ${formatPriceV2(
                      ship_discount_value
                    )}đ phí vận chuyển`}
              </p>
            );
          }

          return (
            <div>
              {!value_discount ? (
                <p className="voucher-detail">
                  Mã giảm cho đơn từ{" "}
                  {value_limit_total ? formatPriceV2(value_limit_total) : 0}đ
                </p>
              ) : (
                <p className="voucher-detail">
                  Mã giảm {formatPriceV2(value_discount)}đ cho đơn từ{" "}
                  {value_limit_total ? formatPriceV2(value_limit_total) : 0}đ
                </p>
              )}
            </div>
          );
        };

        if (!is_show_voucher) return null;
        if (index > 3) return null;
        return (
          <div key={id} className="home-voucher">
            <div className="icon-voucher">
              <IconVoucher />
              <p className="voucher-name">{name}</p>
            </div>
            <div className="voucher-content">
              <div>
                <p
                  className="voucher-code"
                  style={{
                    color: appTheme.color_main_1,
                  }}
                >
                  NHẬP MÃ: {code}
                </p>
                {renderInfoVoucher()}
              </div>
              <div>
                <p
                  className="copy-code"
                  onClick={() => copyToClipboard(code, id)}
                >
                  {isCopied && id === idCopied
                    ? "Đã sao chép mã"
                    : "Sao chép mã ngay"}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
