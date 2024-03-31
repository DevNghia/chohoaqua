import { combineReducers } from "redux";
import { app } from "./app";
import { product } from "./product";
import { category } from "./category";
import { news } from "./news";
import { user } from "./user";
import { branch } from "./branch";
import { cart } from "./cart";
import { combo } from "./combo";
import { voucher } from "./voucher";
import { bonusProduct } from "./bonusProduct";

import { collaborator } from "./collaborator";
import { agency } from "./agency";
import { search } from "./search";
const rootReducer = combineReducers({
  app,
  news,
  user,
  branch,
  cart,
  combo,
  product,
  voucher,
  category,
  agency,
  collaborator,
  search,
  bonusProduct,
});

export default rootReducer;
