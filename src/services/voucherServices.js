import { constants as c } from '../constants';
import { appServices } from './appServices';
const store_code = appServices.store_code;

try {
  var tokenInfo = JSON.parse(localStorage.getItem('tokenInfo'));
} catch (error) {
  var tokenInfo = null;
  window.localStorage.removeItem('tokenInfo');
}

function getAllVoucher() {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'customer-token': tokenInfo ? tokenInfo.token : '',
    },
  };
  return fetch(`${c.API_URL}/customer/${store_code}/vouchers`, requestOptions)
    .then((res) => res.json())
    .then((json) => {
      return json;
    })
    .catch((err) => {
      return {};
    });
}

function getListProductByVourcherId(vourcher_id, page, search_value) {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'customer-token': tokenInfo ? tokenInfo.token : '',
    },
  };
  return fetch(
    `${c.API_URL}/customer/${store_code}/vouchers/${vourcher_id}/products?limit=15${
      search_value ? `&search=${search_value}` : ''
    }${page ? `&page=${page}` : ''}`,
    requestOptions,
  )
    .then((res) => res.json())
    .then((json) => {
      return json;
    })
    .catch((err) => {
      return {};
    });
}

export const voucherServices = {
  getAllVoucher,
  getListProductByVourcherId,
};
