import React, { useEffect, useMemo, useState } from "react"

import { useSelector, useDispatch } from "react-redux";
import { formatPrice, formatNoD, formatNumber } from "../../helper";
import { AsyncPaginate } from "react-select-async-paginate";
import { productServices as s } from "../../services/productServices";
import ReactToPrint from 'react-to-print';

import "./style.css"
const Footer = React.lazy(() => import('../../components/Footer'));

function CalculateProductPage(props) {

  const appTheme = useSelector((state) => state.app.appTheme);
  const infoStore = useSelector((state) => state.app.infoStore);



  const dispatch = useDispatch();
  const [select_product, setSelectProduct] = useState([]);
  const [productCalculates, setProductCalculates] = useState([]);


  async function loadProducts(search, loadedOptions, { page }) {
    console.log("da vaoooo")
    const res = await s
      .getAllProducts(`?page=${page}`);
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

  function getProductCalCulate(products) {
    var _productCalculates = [...productCalculates]
    for (const [index, item] of products.entries()) {
      if (hasItem(item) === false) {
        _productCalculates.push(item)
        continue;
      }
    }
    console.log(_productCalculates)
    var cutProductCalculates = _productCalculates.filter(
      (v) => products.filter(
        (_v) => v.value == _v.value
      ).length > 0
    )
    console.log(cutProductCalculates);
    setProductCalculates(cutProductCalculates)
  }

  function onChangeAsync(select) {
    setSelectProduct(select)
    getProductCalCulate(select)
  }

  function onChange(e, id) {
    var { name, value } = e.target
    value = formatNumber(value)
    console.log(name, id)
    var _productCalculates = [...productCalculates]
    for (const [index, item] of productCalculates.entries()) {
      if (item.value === id) {
        _productCalculates[index].product[name] = value
      }
    }


    setProductCalculates(_productCalculates)
  }

  function showProductCaculates() {
    var result = productCalculates.map((product, index) => {

      return (
        <tr>
          <td>{index + 1}</td>
          <td className="product-name">{product.product?.name}</td>
          <td ><input className="price" name="price" value={formatNoD(product.product?.price)} onChange={(e) => onChange(e, product.value)} /></td>
          <td><input className="size" name="size" value={formatNoD(product.product?.size ?? 1)} onChange={(e) => onChange(e, product.value)} /></td>
          <td className="price-after">{formatPrice(product.product?.price * (product.product?.size ?? 1))}</td>
        </tr>

      )
    })
    return result ?? null
  }

  function getTotal() {
    var total = 0
    for (const [index, item] of productCalculates.entries()) {
      total = total + (item.product.price * (item.product.size ?? 1))
    }
    return total
  }
  return (
    <React.Fragment>
      <div className="calculate-container">
        <div className="login-popup calculate" >
          <div className = "group-header">
            <h3 style={{ fontSize: "18px", marginBottom: "20px" }}>Báo giá sản phẩm</h3>
            <a className="print-calculate">In báo giá</a>
          </div>
          <div className="form-control" style={{ display: "flex" }}>
            <p htmlFor="" >Tên Shop:</p>
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
          <div class="table-responsive">
            <table class="table table-border " id="dataTable" width="100%" cellspacing="0">
              <thead>
                <tr>
                  <th>STT</th>
                  {/* <th>ID</th> */}

                  <th style={{ textAlign: "left" }}>Tến sản phẩm</th>
                  <th style={{ textAlign: "right" }} className="">Giá (VND)</th>
                  <th className="size">DVT (m<sup>2</sup>)</th>
                  <th style={{ textAlign: "right" }}>Thành tiền</th>
                </tr>
              </thead>

              <tbody>


                {showProductCaculates()}
                {/* <tr>
                <td>1</td>
                <td>Sản phẩm A</td>
                <td><input value={100.000} /></td>
                <td><input value={20} /></td>
                <td>100.000đ</td>

              </tr> */}

              </tbody>

              <tfoot><tr>
                <td style={{ width: "80px" }} ></td>
                <td style={{ textAlign: "left" }} colSpan={3}>Tổng tiền</td>

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