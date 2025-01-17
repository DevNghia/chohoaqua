import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { appActions } from "../../../actions/appActions";
import { userActions } from "../../../actions/userActions";
import { constants as c } from "../../../constants";
import { formatPrice } from "../../../helper";
import ProductCard from "../../ProductCard";
import { AsyncPaginate } from "react-select-async-paginate";
import { productServices as s } from "../../../services/productServices";


import moment from "moment"
export default function Login(props) {


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
    console.log(name, id)
    var _productCalculates = [...productCalculates]
    if (name == "price") {
      for (const [index, item] of productCalculates.entries()) {
        if (item.value === id) {
          _productCalculates[index].product.price = value
        }
      }
    }
    setProductCalculates(_productCalculates)
  }

  function showProductCaculates() {
    var result = productCalculates.map((product, index) => {

      return (
        <tr>
          <td>{index + 1}</td>
          <td>{product.product?.name}</td>
          <td ><input className="price" name="price" value={product.product?.price} onChange={(e) => onChange(e, product.value)} /></td>
          <td><input className="size" name="size" value={product.product?.size ?? 1} /></td>
          <td>{formatPrice(product.product?.price * (product.product?.size ?? 1))}</td>
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


    <div className="modal center">
      <div className="login-popup calculate" >
        <h3 style={{ fontSize: "18px", marginBottom: "20px" }}>Báo giá sản phẩm</h3>
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
        <div className="form-control">
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

                <th>Tến sản phẩm</th>
                <th className="price">Giá (VND)</th>
                <th className="size">DVT (m<sup>2</sup>)</th>
                <th>Thành tiền</th>
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
              <td style={{ width: "80px" , fontWeight : "500" }} >Tổng tiền</td>
              <td colSpan={3}></td>

              <td className="total" >{formatPrice(getTotal())}</td>

            </tr>
            </tfoot>
          </table>
        </div>          <button className="close-btn" onClick={props.handleClose}>
          <i className="fas fa-times"></i>
        </button>

      </div>
    </div>
  )
}