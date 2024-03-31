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
  const bonusProductLadder = useSelector((state) => state.bonusProduct.bonusProductLadderPopup);
  var {
    discount_type,
    value_discount,
    start_time,
    end_time,
    amount,
    bonus_products_ladder,
    value_limit_total,
  } = bonusProductLadder
  var select_products = bonus_products_ladder[0]?.product
  var select_name = null
  if(select_products)
  {
    select_name = select_products.name
    select_products = [select_products]
  }

  var products = []
  var productsBonus = []
  console.log(select_products)
  if(select_products?.length > 0)
  {
    select_products.forEach(element => {
      products.push(element)
    });
  }


  console.log(products);
  if(bonus_products_ladder?.length > 0)
  {
    bonus_products_ladder.forEach(element => {
      productsBonus.push({...element.bo_product , from_quantity : element.from_quantity , bo_quantity : element.bo_quantity})
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


  var value_discount = discount_type == 0 ? formatPrice(value_discount) : value_discount + "%"
  var startTime = moment(start_time).format("DD-MM-YYYY HH:mm:ss")
  var endTime = moment(end_time).format("DD-MM-YYYY HH:mm:ss")
  var amountbonusProductLadder = amount
  var valueLimitTotal = formatPrice(value_limit_total)
  var nameListProduct =  " "
  if(products?.length > 0)
  {
    products.forEach((element, index) => {
      if(index == products.length - 1)
      nameListProduct  = " " +  element.name + nameListProduct
      else
      nameListProduct  =  nameListProduct + ", " +  element.name

    });
  }

  var nameListProductBonus =  []
  if(productsBonus?.length > 0 && select_name !== null)
  {
    productsBonus.forEach((element, index) => {
      console.log("hee" , element)
      if(index == productsBonus.length - 1)
      nameListProductBonus.push(<div style = {{marginTop : "8px"}}>- {`Mua ${element.from_quantity} sản phẩm ${select_name} - Tặng  ${element.bo_quantity}`+ " " +element.name + ","}</div>)
      else
      nameListProductBonus.push(<div style = {{marginTop : "8px"}}>- {`Mua ${element.from_quantity} sản phẩm ${select_name} - Tặng ${element.bo_quantity}`+ " " +element.name + ","}</div>)

    });
  }

  console.log("thưởng" , productsBonus);

  var nameListProductBonus1 =  " "
  var x  = ""
  if(productsBonus?.length > 0)
  {
    productsBonus.forEach((element, index) => {
    
      
      if(index == productsBonus.length - 1)
      nameListProductBonus1 = " " +  element.name + nameListProductBonus1 
            else
      nameListProductBonus1  =  nameListProductBonus1 + ", " +  element.name

    });
  }

  console.log(nameListProductBonus1);

  return (
    <>
      {
        bonusProductLadder.id ?
        <div className="modal center popup-voucher-modal">
        <div className="login-popup popup-voucher" >
          <h3 style = {{fontSize : "18px"}}>Chi tiết thưởng sản phẩm</h3>
          <div className="form-control">
            <label htmlFor="" >Ưu đãi</label>
            <p >{nameListProductBonus}</p>
          </div>
          <div className="form-control">
            <label htmlFor="" >Thưởng các sản phẩm sau:</label>
            <p >{nameListProductBonus1}</p>
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
            <p >Số lượng giới hạn: {amountbonusProductLadder}</p>
            <p >Chỉ áp dụng cho sản phẩm sau:{nameListProduct}</p>
  
            <p >HSD: {startTime} - {endTime}</p>
  
          </div>
          <label htmlFor="" >Các sản phẩm áp dụng thưởng sản phẩm</label>

          <div className="row products-popup-voucher" style = {{
            flexWrap : "wrap"
          }}>
        {
          products.map((v, i) =>
            <ProductCard
            handleClose={props.handleClose}
            style = {{width : "49%" , marginTop : "7px"}}
              key={i}
              product={{...v ,
                has_in_bonus_product : true}}
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