import { constants as c } from "../constants";
import { appServices } from "./appServices";
import { DeviceUUID } from "device-uuid";
const uuid = new DeviceUUID().get();

try {
  var tokenInfo = JSON.parse(localStorage.getItem("tokenInfo"));
} catch (error) {
  var tokenInfo = null;
  window.localStorage.removeItem("tokenInfo");
}

function getInfoLocal() {
  var data = {};

  const tokenInfo = JSON.parse(localStorage.getItem("tokenInfo"));

  var code_voucher = localStorage.getItem("code_voucher");
  var total_shipping_fee = tokenInfo
    ? localStorage.getItem("total_shipping_fee")
    : 0;

  if (code_voucher || total_shipping_fee) {
    var total_shipping_fee = JSON.parse(total_shipping_fee);

    var code_voucher = JSON.parse(code_voucher);

    data = {
      code_voucher: code_voucher || null,
      total_shipping_fee: total_shipping_fee || 0,
    };
  }
  return data;
}

const store_code = appServices.store_code;
function addCart(product) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "customer-token": tokenInfo ? tokenInfo.token : "",
      "device-id": `${store_code}-${uuid}`,
    },
    body: JSON.stringify(product),
  };
  return fetch(
    `${c.API_URL}/customer/${store_code}/carts/items`,
    requestOptions
  )
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      return json;
    })
    .catch((err) => {
      console.log(err);
      return {};
    });
}

function purchase(order_code) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "customer-token": tokenInfo ? tokenInfo.token : "",
      "device-id": `${store_code}-${uuid}`,
    },
  };
  return fetch(
    `${c.API_URL}/customer/${store_code}/purchase/pay/${order_code}`,
    requestOptions
  )
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      return json;
    })
    .catch((err) => {
      console.log(err);
      return {};
    });
}

function changeNumberInCart(product) {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "customer-token": tokenInfo ? tokenInfo.token : "",
      "device-id": `${store_code}-${uuid}`,
    },
    body: JSON.stringify(product),
  };
  return fetch(
    `${c.API_URL}/customer/${store_code}/carts/items`,
    requestOptions
  )
    .then((res) => res.json())
    .then((json) => {
      console.log(product);
      console.log(json);
      return json;
    })
    .catch((err) => {
      console.log(err);
      return {};
    });
}

function getCartInfo(data) {
  const requestOptions = {
    method: "POST",
    body: JSON.stringify({
      ...getInfoLocal(),
      ...data,
    }),
    headers: {
      "Content-Type": "application/json",
      "customer-token": tokenInfo ? tokenInfo.token : "",
      "device-id": `${store_code}-${uuid}`,
    },
  };
  return fetch(`${c.API_URL}/customer/${store_code}/carts`, requestOptions)
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      return json;
    })
    .catch((err) => {
      console.log(err);
      return {};
    });
}

function getBillHistory(data) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "customer-token": tokenInfo ? tokenInfo.token : "",
    },
  };
  return fetch(
    `${c.API_URL}/customer/${store_code}/carts/orders/status_records/${data}`,
    requestOptions
  )
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      return json;
    })
    .catch((err) => {
      console.log(err);
      return {};
    });
}

function getPayHistory(data) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "customer-token": tokenInfo ? tokenInfo.token : "",
    },
  };
  return fetch(
    `${c.API_URL}/customer/${store_code}/orders/history_pay/${data}`,
    requestOptions
  )
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      return json;
    })
    .catch((err) => {
      console.log(err);
      return {};
    });
}

function getShipmentFee(idAddress, data) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "customer-token": tokenInfo ? tokenInfo.token : "",
      "device-id": `${store_code}-${uuid}`,
    },
    body: data
      ? JSON.stringify(data)
      : JSON.stringify({
          id_address_customer: idAddress,
        }),
  };
  return fetch(
    `${c.API_URL}/customer/${store_code}/carts/calculate_fee`,
    requestOptions
  )
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      return json;
    })
    .catch((err) => {
      console.log(err);
      return {};
    });
}
function postShipmentFeeForEachService(idAddress, data, idService, branch_id) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "customer-token": tokenInfo ? tokenInfo.token : "",
      "device-id": `${store_code}-${uuid}`,
    },
    body: data
      ? JSON.stringify(data)
      : JSON.stringify({
          id_address_customer: idAddress,
          branch_id: branch_id,
        }),
  };

  return fetch(
    `${c.API_URL}/customer/${store_code}/carts/calculate_fee/${idService}`,
    requestOptions
  )
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      return json;
    })
    .catch((err) => {
      console.log(err);
      return {};
    });
}
function postListShipperFee(idAddress, data, branch_id) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "customer-token": tokenInfo ? tokenInfo.token : "",
      "device-id": `${store_code}-${uuid}`,
    },
    body: data
      ? JSON.stringify(data)
      : JSON.stringify({
          id_address_customer: idAddress,
          branch_id: branch_id,
        }),
  };
  return fetch(
    `${c.API_URL}/customer/${store_code}/shipment/list_shipper`,
    requestOptions
  )
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      return json;
    })
    .catch((err) => {
      console.log(err);
      return {};
    });
}
function getPaymentMethods() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "customer-token": tokenInfo ? tokenInfo.token : "",
    },
  };
  return fetch(
    `${c.API_URL}/customer/${store_code}/payment_methods`,
    requestOptions
  )
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      return json;
    })
    .catch((err) => {
      console.log(err);
      return {};
    });
}
function order(orderInfo) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "customer-token": tokenInfo ? tokenInfo.token : "",
      "device-id": `${store_code}-${uuid}`,
    },
    body: JSON.stringify(orderInfo),
  };
  return fetch(
    `${c.API_URL}/customer/${store_code}/carts/orders`,
    requestOptions
  )
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      return json;
    })
    .catch((err) => {
      console.log(err);
      return {};
    });
}
function getOrdersList(query) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "customer-token": tokenInfo ? tokenInfo.token : "",
      "device-id": `${store_code}-${uuid}`,
    },
  };
  return fetch(
    `${c.API_URL}/customer/${store_code}/carts/orders${query}`,
    requestOptions
  )
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      return json;
    })
    .catch((err) => {
      console.log(err);
      return {};
    });
}
function getOrderInfo(orderCode) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "customer-token": tokenInfo ? tokenInfo.token : "",
      "device-id": `${store_code}-${uuid}`,
    },
  };
  return fetch(
    `${c.API_URL}/customer/${store_code}/carts/orders/${orderCode}`,
    requestOptions
  )
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      return json;
    })
    .catch((err) => {
      console.log(err);
      return {};
    });
}
function cancelOrder(info) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "customer-token": tokenInfo ? tokenInfo.token : "",
      "device-id": `${store_code}-${uuid}`,
    },
    body: JSON.stringify(info),
  };
  return fetch(
    `${c.API_URL}/customer/${store_code}/carts/orders/cancel`,
    requestOptions
  )
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      return json;
    })
    .catch((err) => {
      console.log(err);
      return {};
    });
}
function changePaymentMethod(info) {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "customer-token": tokenInfo ? tokenInfo.token : "",
      "device-id": `${store_code}-${uuid}`,
    },
    body: JSON.stringify({
      payment_method_id: info.paymentMethodId,
      payment_partner_id: info.paymentPartnerId,
    }),
  };
  return fetch(
    `${c.API_URL}/customer/${store_code}/carts/orders/change_payment_method/${info.orderCode}`,
    requestOptions
  )
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      return json;
    })
    .catch((err) => {
      console.log(err);
      return {};
    });
}
function applyDiscount(info) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "customer-token": tokenInfo ? tokenInfo.token : "",
      "device-id": `${store_code}-${uuid}`,
    },
    body: JSON.stringify({ ...getInfoLocal(), ...info }),
  };
  return fetch(`${c.API_URL}/customer/${store_code}/carts`, requestOptions)
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      return json;
    })
    .catch((err) => {
      console.log(err);
      return {};
    });
}
export const cartServices = {
  order,
  addCart,
  getCartInfo,
  getShipmentFee,
  postListShipperFee,
  postShipmentFeeForEachService,
  getPaymentMethods,
  changeNumberInCart,
  getOrdersList,
  getOrderInfo,
  applyDiscount,
  cancelOrder,
  changePaymentMethod,
  purchase,
  getBillHistory,
  getPayHistory,
};
