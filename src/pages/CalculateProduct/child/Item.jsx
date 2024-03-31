import React, { useEffect, useMemo, useState } from "react"
import { formatPrice, formatNoD, formatNumber } from "../../../helper";
import DistributeItem from "./DistributeItem";

function Item(props) {
    const { productCalculates, setProductCalculates, product, index } = props
    let {
        price,
        product_discount,
        quantity_in_stock,
        quantity_in_stock_with_distribute,
        images,
        id,
        name,
        distributes,
        _distributes,

        check_inventory,
    } = product;

    const [newDistribute, setNewDistribute] = useState(
        props.distributes_selected && props.distributes_selected[0]
            ? props.distributes_selected[0].value
            : ""
    );
    function handleChangeDistribute() {
        // if (
        //     oldDistribute.value === newDistribute &&
        //     oldDistribute.sub_element_distributes === newSubDistribute
        // )
        //     return;
        props.onShowDistribute();

    }

    function removeDistribute(e, id, element, sub) {
        var { name, value } = e.target
        var _productCalculates = [...productCalculates]
        for (var [index, item] of productCalculates.entries()) {
            if (item.value == id) {
                for (var [_index, _item] of item.product?._distributes.entries()) {
                    if (element == _item.element_distribute_name && sub == _item.sub_element_distribute_name) {
                        if (_item.checked == true) {
                            _productCalculates[index].product._distributes[_index].checked = false
                        }
                        else {
                            // _productCalculates[index].product._distributes[_index].quantity = _item.quantity + 1
                        }
                    }
                }
            }

        }
        props.setProductCalculates(_productCalculates)
    }

    function onChangeDis(e, id, element, sub) {
        var { name, value } = e.target
        var _productCalculates = [...productCalculates]
        for (var [index, item] of productCalculates.entries()) {
            if (item.value == id) {
                for (var [_index, _item] of item.product?._distributes.entries()) {
                    if (element == _item.element_distribute_name && sub == _item.sub_element_distribute_name) {
                        if (_item.checked == true) {
                            if (name == "price" || name == "quantity") {
                                value = Number(formatNumber(value))
                                _productCalculates[index].product._distributes[_index][name] = value

                            }
                            else {
                                if (name == "width" || name == "height") {
                                    var _productCalculates = [...productCalculates]
                                    _productCalculates[index].product._distributes[_index][name] = Number(value)

                                }
                            }
                        }

                    }
                }
            }

        }
        props.setProductCalculates(_productCalculates)
    }

    function onChange(e, id) {
        var { name, value } = e.target

        if (name == "price" || name == "_quantity") {
            value = Number(formatNumber(value))
            var _productCalculates = [...productCalculates]
            console.log(_productCalculates, value)
            for (const [index, item] of productCalculates.entries()) {
                if (item.value === id) {
                    console.log(item)
                    _productCalculates[index].product[name] = value
                }
            }
        }
        else {
            if (name == "width" || name == "height") {
                var _productCalculates = [...productCalculates]
                for (const [index, item] of productCalculates.entries()) {
                    if (item.value === id) {
                        _productCalculates[index].product[name] = Number(value)
                    }
                }
            }
        }
        console.log(_productCalculates)
        props.setProductCalculates(_productCalculates)
    }





    console.log(product)
    function showListName(data, _index) {
        var result = null
        var data = data.filter(
            (v) => v.checked === true

        )
        var count = data.length
        console.log(count)
        result = data.map((element, index) => {
            if (element.checked === true) {

                if (element.sub_element_distribute_name != null) {
                    return (
                        <tr>
                            {index == 0 && <td rowSpan={count}>{_index}</td>}
                            {index == 0 && <td className="product-name" rowSpan={count}> {element?.name}</td>}


                            {/* <td>
                                <div className="size" style={{ display: "flex", justifyContent: "center" }}>

                                    <input type="number" placeholder="Dài" name="width" value={element?.width ?? 1} onChange={(e) => onChangeDis(e, element.id,element.element_distribute_name , element.sub_element_distribute_name)} />
                                    <span style={{ margin: "auto 0px" }}>x</span>
                                    <input type="number" placeholder="Rộng" name="height" value={element?.height ?? 1} onChange={(e) => onChangeDis(e, element.id,element.element_distribute_name , element.sub_element_distribute_name)} />
                                </div>
                            </td> */}
                            <td className=""><input className="quantity" type="number" name="width" value={element?.width ?? 1} onChange={(e) => onChangeDis(e, element.id, element.element_distribute_name, element.sub_element_distribute_name)} /></td>
                            <td className=""><input className="quantity" type="number" name="height" value={element?.height ?? 1} onChange={(e) => onChangeDis(e, element.id, element.element_distribute_name, element.sub_element_distribute_name)} /></td>
                            <td className="area" >{((element.height ?? 1) * (element.width ?? 1)).toFixed(2)}</td>
                            <td className="choose-distribute">
                                <div className="group-distribute"><span> {element.element_distribute_name},{element.sub_element_distribute_name} </span><i onClick={(e) => removeDistribute(e, element.id, element.element_distribute_name, element.sub_element_distribute_name)} class="fa fa-times-circle-o remove-icon icon-distribute"></i></div>
                                {index == count - 1 &&
                                    <div className="remove-distribute" ><i onClick={props.onShowDistribute}
                                        class="fa fa-plus-circle add-icon icon-distribute"></i>
                                    </div>
                                }
                                {index == count - 1 &&
                                    <DistributeItem
                                        isShowDistribute={props.isShowDistribute}
                                        handleChangeDistribute={handleChangeDistribute}
                                        distributes={_distributes}
                                        setNewDistribute={setNewDistribute}
                                        newDistribute={newDistribute}
                                        cancelDistribute={props.cancelDistribute}
                                        changeDistribute={props.changeDistribute}
                                    />
                                }


                            </td>

                            <td className="price"><input className="price-input" name="price" value={formatNoD(element?.price)} onChange={(e) => onChangeDis(e, element.id, element.element_distribute_name, element.sub_element_distribute_name)} /></td>
                            <td className=""><input className="quantity" type="number" name="quantity" value={element?.quantity ?? 1} onChange={(e) => onChangeDis(e, element.id, element.element_distribute_name, element.sub_element_distribute_name)} /></td>
                            <td className="price-after">{formatPrice((element?.price * ((element?.width ?? 1) * (element?.height ?? 1))) * (element?.quantity ?? 1))}</td>
                        </tr >
                        // {/* <div className="group-distribute"><span>{element.element_distribute_name},{element.sub_element_distribute_name} </span><i class="fa fa-times-circle-o remove-icon icon-distribute"></i></div> */}
                    )
                }
                else {
                    return (
                        <tr>
                            {index == 0 && <td rowSpan={count}>{_index}</td>}
                            {index == 0 && <td className="product-name" rowSpan={count}> {element?.name}</td>}


                            {/* <td>
                                <div className="size" style={{ display: "flex", justifyContent: "center" }}>

                                    <input type="number" placeholder="Dài" name="width" value={element?.width ?? 1} onChange={(e) => onChangeDis(e, element.id,element.element_distribute_name , element.sub_element_distribute_name)} />
                                    <span style={{ margin: "auto 0px" }}>x</span>
                                    <input type="number" placeholder="Rộng" name="height" value={element?.height ?? 1} onChange={(e) => onChangeDis(e, element.id,element.element_distribute_name , element.sub_element_distribute_name)} />
                                </div>
                            </td> */}
                            <td className=""><input className="quantity" type="number" name="width" value={element?.width ?? 1} onChange={(e) => onChangeDis(e, element.id, element.element_distribute_name, element.sub_element_distribute_name)} /></td>
                            <td className=""><input className="quantity" type="number" name="height" value={element?.height ?? 1} onChange={(e) => onChangeDis(e, element.id, element.element_distribute_name, element.sub_element_distribute_name)} /></td>
                            <td className="area" >{((element.height ?? 1) * (element.width ?? 1)).toFixed(2)}</td>
                            <td className="choose-distribute">

                                <div className="group-distribute"><span> {element.element_distribute_name} </span><i onClick={(e) => removeDistribute(e, element.id, element.element_distribute_name, element.sub_element_distribute_name)} class="fa fa-times-circle-o remove-icon icon-distribute"></i></div>

                                {index == count - 1 && <div className="remove-distribute" ><i onClick={props.onShowDistribute}
                                    class="fa fa-plus-circle add-icon icon-distribute"></i>
                                </div>
                                }
                                {index == count - 1 && <DistributeItem
                                    product={product}
                                    isShowDistribute={props.isShowDistribute}
                                    handleChangeDistribute={handleChangeDistribute}
                                    distributes={_distributes}
                                    setNewDistribute={setNewDistribute}
                                    newDistribute={newDistribute}
                                    cancelDistribute={props.cancelDistribute}
                                    changeDistribute={props.changeDistribute}
                                />}


                            </td>

                            <td className="price"><input className="price-input" name="price" value={formatNoD(element?.price)} onChange={(e) => onChangeDis(e, element.id, element.element_distribute_name, element.sub_element_distribute_name)} /></td>
                            <td className=""><input className="quantity" type="number" name="quantity" value={element?.quantity ?? 1} onChange={(e) => onChangeDis(e, element.id, element.element_distribute_name, element.sub_element_distribute_name)} /></td>
                            <td className="price-after">{formatPrice((element?.price * ((element?.width ?? 1) * (element?.height ?? 1))) * (element?.quantity ?? 1))}</td>
                        </tr >
                    )
                }
            }

        })
        return result
    }

    console.log(product)
    return (
        <React.Fragment>
            {
                product._distributes?.length > 0 ? showListName(_distributes, index + 1)
                    : (
                        <tr>
                            <td>{index + 1}</td>
                            <td className="product-name">{product?.name}</td>

                            {/* <td>
                                <div className="size" style={{ display: "flex", justifyContent: "center" }}>

                                    <input type="number" placeholder="Dài" name="width" value={product?.width ?? 1} onChange={(e) => onChange(e, product.id)} />
                                    <span style={{ margin: "auto 0px" }}>x</span>
                                    <input type="number" placeholder="Rộng" name="height" value={product?.height ?? 1} onChange={(e) => onChange(e, product.id)} />
                                </div>
                            </td> */}
                            <td className=""><input className="quantity" type="number" name="width" value={product?.width ?? 1} onChange={(e) => onChange(e, product.id)} /></td>
                            <td className=""><input className="quantity" type="number" name="height" value={product?.height ?? 1} onChange={(e) => onChange(e, product.id)} /></td>
                            <td className="area" >{(product.height ?? 1) * (product.width ?? 1)}</td>
                            <td className="">

                            </td>

                            <td className="price"><input className="price-input" name="price" value={formatNoD(product?.price)} onChange={(e) => onChange(e, product.id)} /></td>
                            <td className=""><input className="quantity" type="text" name="_quantity" value={product?._quantity ?? 1} onChange={(e) => onChange(e, product.id)} /></td>
                            <td className="price-after">{formatPrice((product?.price * ((product?.width ?? 1) * (product?.height ?? 1))) * (product?._quantity ?? 1))}</td>
                        </tr>
                    )

            }



        </React.Fragment>
    )
}
export default Item