import { useState ,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { appActions } from "../../../actions/appActions";
import { userActions } from "../../../actions/userActions";
import { constants as c } from "../../../constants";
import { formatPrice } from "../../../helper";
import ProductCard from "../../ProductCard";

import moment from "moment"
export default function Login(props) {
  const dispatch = useDispatch();
  const combo = useSelector((state) => state.combo.comboPopup);
  var {
    discount_type,
    value_discount,
    start_time,
    end_time,
    amount,
    products_combo,
    value_limit_total
  } = combo
  console.log(combo)
  var products = []
  if(products_combo?.length > 0)
  {
    products_combo.forEach(element => {
      products.push(element.product)
    });
  }
  var value_discount = discount_type == 0 ? formatPrice(value_discount) : value_discount + "%"
  var startTime = moment(start_time).format("DD-MM-YYYY HH:mm:ss")
  var endTime = moment(end_time).format("DD-MM-YYYY HH:mm:ss")
  var amountcombo = amount
  var valueLimitTotal = formatPrice(value_limit_total)
  var nameListProduct =  " "
  if(products?.length > 0)
  {
    products.forEach((element, index) => {
      if(index == products.length - 1)
      nameListProduct  = nameListProduct + ", " + element.name + ", vv..."
      else
      nameListProduct  =  nameListProduct + ", " +  element.name

    });
  }
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside, true);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [])

  function handleClickOutside(event) {
    props.handleClose()
  }

  console.log("comboo" , products)

  return (
    <>
      {
        combo.id ?
        <div className="modal center popup-voucher-modal">
        <div className="login-popup popup-voucher" >
          <h3 style = {{fontSize : "18px"}}>Chi tiết Combo giảm giá</h3>
          <div className="form-control">
            <label htmlFor="" >Ưu đãi</label>
            <p >Giảm {value_discount} cho các sản phẩm sau: {nameListProduct}</p>
          </div>
          <div className="form-control">
            <label htmlFor="" >Có hiệu lực</label>
            <p >{startTime} - {endTime}.</p>
          </div>
          <div className="form-control">
            <label htmlFor="" >Thanh toán</label>
            <p >Mọi hình thức thanh toán</p>
          </div>
          <div className="form-control">
            <label htmlFor="" >Điều kiện sử dụng</label>
            <p >Số lượng giới hạn: {amountcombo}</p>
            <p >Chỉ áp dụng cho các sản phẩm sau:{nameListProduct}</p>
  
            <p >HSD: {startTime} - {endTime}</p>
  
          </div>
          <label htmlFor="" >Mua đủ {products?.length || 0} sản phẩm sau để được áp dụng giảm giá</label>

          <div className="row products-popup-voucher" style = {{
            flexWrap : "wrap"
          }}>
        {
          products.map((v, i) =>
            <ProductCard
            handleClose={props.handleClose}
            style = {{width : "49%" , marginTop : "7px"}}
              key={i}
              product={{...v ,  has_in_combo : true
                }}
            />
          )
        }
      </div>
          <button className="close-btn" onClick={props.handleClose}>
            <i className="fas fa-times"></i>
          </button>
         
        </div>
      </div> : null
      } 
      </>
  )
}