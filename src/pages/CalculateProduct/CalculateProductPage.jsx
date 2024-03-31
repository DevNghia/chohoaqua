import React, { useEffect, useMemo, useState } from "react"

import { useSelector, useDispatch } from "react-redux";
import { formatPrice, formatNoD, formatNumber } from "../../helper";
import { AsyncPaginate } from "react-select-async-paginate";
import { productServices as s } from "../../services/productServices";
import ReactToPrint from 'react-to-print';
import Item from "./child/Item"

import "./style.css"
const Footer = React.lazy(() => import('../../components/Footer'));

function CalculateProductPage(props) {

  const appTheme = useSelector((state) => state.app.appTheme);
  const infoStore = useSelector((state) => state.app.infoStore);
  const [currentShowDistributeItem, setCurrentShowDistributeItem] = useState("");



  const dispatch = useDispatch();
  const [select_product, setSelectProduct] = useState([]);
  const [productCalculates, setProductCalculates] = useState([]);
  const [discount, setDiscount] = useState(0);

  var componentRef = null

  async function loadProducts(search, loadedOptions, { page }) {
    console.log("da vaoooo")
    const res = await s
      .getAllProducts(`?page=${page}&search=${search}`);
    console.log(res);
    if (res.code != 200) {
      return {
        options: [],
        hasMore: false,
      }
    }

    return {
      options: res.data.data.map((i) => {
        return { value: i.id, label: `${i.name}`, product: i };
      }),

      hasMore: res.data.data.length == 20,
      additional: {
        page: page + 1,
      },
    };
  };

  function hasItem(value) {
    if (productCalculates?.length == 0) {
      return false;
    }
    for (const [index, item] of productCalculates.entries()) {
      console.log(item)
      if (item.product.id === value.product.id)
        return true
    }
    return false
  }

  function hasItemToRemove() {

  }

  function getistribute(listDistribute, product) {
    var result = []
    if (typeof listDistribute == "undefined" || listDistribute.length === 0) {
      return result
    }
    if (listDistribute.element_distributes) {
      var newListDistribute = []
      listDistribute.element_distributes.map((element, _index) => {
        if (typeof element.sub_element_distributes != "undefined") {
          if (listDistribute.element_distributes[0].sub_element_distributes.length > 0) {
            listDistribute.element_distributes[0].sub_element_distributes.map((sub_element, index) => {
              var checked = false
              if (_index === 0 && index === 0)
                checked = true
              result.push({

                "id": product.id,
                "quantity": 1,
                "distribute_name": listDistribute.name,
                "element_distribute_name": element.name,
                "sub_element_distribute_name": sub_element.name,
                "sku": product.sku,
                "name": product.name,
                "price": sub_element.price,

                "checked": checked


              })

            })
          }
          else {
            var checked = false
            if (_index === 0)
              checked = true
            result.push({

              "id": product.id,
              "quantity": 1,
              "distribute_name": listDistribute.name,
              "element_distribute_name": element.name,
              "sub_element_distribute_name": null,
              "price": element.price,

              "sku": product.sku,
              "name": product.name,
              "checked": checked


            })


          }
        }
      })
    }
    console.log(result)
    return result
  }

  function getProductCalCulate(products) {
    var _productCalculates = [...productCalculates]
    var cutProductCalculates = []
    for (const [index, item] of products.entries()) {
      var data = { ...item.product }
      var listDistribute = data.distributes !== null && data.distributes.length > 0 ? data.distributes[0] : []
      console.log(listDistribute)
      if (data.distributes?.length > 0 && (hasItem(item) === false)) {
        var newProduct = getistribute(listDistribute, data)
        var newItem = { ...item }
        console.log(newItem)
        newItem.product._distributes = newProduct
        _productCalculates.push(newItem)
        continue;
      }
      else {
        if (hasItem(item) === false) {

          _productCalculates.push(item)
          continue;
        }
      }

    }
    console.log(_productCalculates)

    cutProductCalculates = _productCalculates.filter(
      (v) => products.filter(
        (_v) => v.value == _v.value
      ).length > 0
    )
    // else{
    //   for (const [index, item] of products.entries()) {
    //     if (hasItem(item) === false) {
    //       _productCalculates.push(item)
    //       continue;
    //     }
    //   }
    //   console.log(_productCalculates)
    //    cutProductCalculates = _productCalculates.filter(
    //     (v) => products.filter(
    //       (_v) => v.value == _v.value
    //     ).length > 0
    //   )
    // }
    setProductCalculates(cutProductCalculates)
  }

  function onChangeAsync(select) {
    setSelectProduct(select)

    getProductCalCulate(select)
  }

  function onChangeDiscount(e) {
    var { name, value } = e.target
    var _value = formatNumber(value)
    console.log(_value)
    setDiscount(_value)
  }


  function onChange(e, id) {
    var { name, value } = e.target
    if (name == "price" || name == "_quantity") {
      value = formatNumber(value)
      var _productCalculates = [...productCalculates]
      for (const [index, item] of productCalculates.entries()) {
        if (item.value === id) {
          _productCalculates[index].product[name] = value
        }
      }
    }
    else {
      if (name == "width" || name == "height") {
        var _productCalculates = [...productCalculates]
        for (const [index, item] of productCalculates.entries()) {
          if (item.value === id) {
            _productCalculates[index].product[name] = value
          }
        }
      }
    }

    setProductCalculates(_productCalculates)
  }

  function changeDistribute(element, sub, id) {
    var _productCalculates = [...productCalculates]
    for (var [index, item] of productCalculates.entries()) {
      if (item.value == id) {
        for (var [_index, _item] of item.product?._distributes.entries()) {
          if (element == _item.element_distribute_name && sub == _item.sub_element_distribute_name) {
            if (_item.checked == false) {
              _productCalculates[index].product._distributes[_index].checked = true
            }
            else {
              _productCalculates[index].product._distributes[_index].quantity = Number(_item.quantity + 1)
            }
          }
        }
      }

    }
    setProductCalculates(_productCalculates)
  }

  function showProductCaculates() {
    var result = productCalculates?.map((item, index) => {
      return <Item
        changeDistribute={changeDistribute}
        index={index}
        product={item.product}
        productCalculates={productCalculates}
        setProductCalculates={setProductCalculates}

        isShowDistribute={item.product.id === currentShowDistributeItem}
        cancelDistribute={() => setCurrentShowDistributeItem("")}
        onShowDistribute={() => setCurrentShowDistributeItem(item.product.id)}>
      </Item>
      // return (
      //   <tr>
      //     <td>{index + 1}</td>
      //     <td className="product-name">{product.product?.name}</td>
      //     <td className="product-name"><div className="group-distribute"><span>Phân loại A</span><i class="fa fa-times-circle-o remove-icon icon-distribute" aria-hidden="true"></i></div>
      //       <div className="remove-distribute" ><i  onClick={onShowDistribute} class="fa fa-plus-circle add-icon icon-distribute" aria-hidden="true"></i></div></td>

      //     <td ><input className="price" name="price" value={formatNoD(product.product?.price)} onChange={(e) => onChange(e, product.value)} /></td>
      //     <td>
      //       <div className="size" style={{ display: "flex", justifyContent: "center" }}>

      //         <input type="number" placeholder="Dài" name="width" value={product.product?.width ?? 1} onChange={(e) => onChange(e, product.value)} />
      //         <span style={{ margin: "auto 0px" }}>x</span>
      //         <input type="number" placeholder="Rộng" name="height" value={product.product?.height ?? 1} onChange={(e) => onChange(e, product.value)} />
      //       </div>
      //     </td>
      //     <td className=""><input className="quantity" type="number" name="_quantity" value={product.product?._quantity ?? 1} onChange={(e) => onChange(e, product.value)} /></td>
      //     <td className="price-after">{formatPrice((product.product?.price * ((product.product?.width ?? 1) * (product.product?.height ?? 1))) * (product.product?._quantity ?? 1))}</td>
      //   </tr>

      // )
    })
    return result ?? null
  }

  function getTotal() {
    var total = 0
    console.log(productCalculates)
    if (productCalculates?.length > 0) {
      for (const [index, item] of productCalculates.entries()) {
        if (item.product._distributes?.length > 0) {
          console.log(item)
          item.product._distributes.forEach(element => {
            console.log(element)
            if (element.checked === true) {
              var price = element.price ?? 0
              var width = element.width ?? 1
              var height = element.height ?? 1
              var quantity = element.quantity ?? 1

              total = total + price * width * height * quantity

            }
          });
        }
        else {
          var price = item.product.price ?? 0
          var width = item.product.width ?? 1
          var height = item.product.height ?? 1
          var _quantity = item.product._quantity ?? 1

          total = total + price * width * height * _quantity
        }
      }
      total = total - discount
    }
    console.log(total)
    return total
  }

  console.log(discount)
  return (
    <React.Fragment>
      <div className="calculate-container" ref={el => (componentRef = el)}
      >
        <div className=" calculate" >
          <div className="group-header">
            <h3 style={{ fontSize: "20px", margin: "auto", "text-transform": "uppercase" }}>Báo giá sản phẩm</h3>
            <ReactToPrint
              trigger={() => {

                return <a className="print-calculate">In báo giá</a>

              }}
              content={() => componentRef}
            />
          </div>
          <div className="form-control" style={{ display: "flex" }}>
            <p htmlFor="" >Công ty:</p>
            <span>          {infoStore.name}
            </span>
          </div>
          <div className="form-control" style={{ display: "flex" }}>
            <p htmlFor="" >Số điện thoại:</p>
            <span>         {infoStore.user?.phone_number}
            </span>
          </div>
          <div className="form-control" style={{ display: "flex" }}>
            <p htmlFor="" >Địa chỉ:</p>
            <span>         {infoStore.address}
            </span>
          </div>
          <div className="form-control select-product">
            <p htmlFor="" >Chọn sản phẩm báo giá:</p>
            <div style={{ marginTop: "10px" }}>
              <AsyncPaginate
                placeholder="Chọn sản phẩm"
                value={select_product}
                loadOptions={loadProducts}
                name="recipientReferences1"
                onChange={onChangeAsync}
                additional={{
                  page: 1,
                }}
                isMulti
                debounceTimeout={500}
                isClearable
                isSearchable
              />
            </div>
          </div>
          <div class="table-responsive" >
            <table class="table table-border " id="dataTable" width="100%" style={{ minWidth: "400px" , marginTop : "10px" }} cellspacing="0">
              <thead>
                <tr>
                  <th>STT</th>
                  {/* <th>ID</th> */}

                  <th style={{ textAlign: "left" }}>Tến sản phẩm</th>

                  <th className="quantity">Rộng (m)</th>
                  <th className="quantity">Cao (m)</th>
                  <th className="quantity">Diện tích (m²)</th>
                  <th style={{ textAlign: "left" }}>Phân loại</th>

                  <th style={{ textAlign: "right" }} className="">Giá (VND)</th>
                  <th className="quantity">Số lượng</th>

                  <th style={{ textAlign: "right" }}>Thành tiền</th>
                </tr>
              </thead>

              <tbody className="show-data">


                {showProductCaculates()}
                {/* <tr>
                <td>1</td>
                <td>Sản phẩm A</td>
                <td><input value={100.000} /></td>
                <td><input value={20} /></td>
                <td>100.000đ</td>

              </tr> */}

              </tbody>

              <tfoot>
                <tr>
                  <td  ></td>
                  <td style={{ textAlign: "left", fontWeight: "500" }} colSpan={7}>Chiết khấu</td>

                  <td className="total" ><input className="discount" type="" name="discount" value={formatNoD(0 - discount)} onChange={onChangeDiscount} /></td>

                </tr>
                <tr>
                  <td  ></td>
                  <td style={{ textAlign: "left", fontWeight: "500" }} colSpan={7}>Tổng tiền</td>

                  <td className="total" >{formatPrice(getTotal())}</td>

                </tr>
              </tfoot>
            </table>
          </div>
          {/* <button className="close-btn" onClick={props.handleClose}>
          <i className="fas fa-times"></i>
        </button> */}

        </div>
      </div>
      <Footer />




    </React.Fragment>
  )
}
export default CalculateProductPage