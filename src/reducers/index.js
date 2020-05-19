import { combineReducers } from "redux";
import products from "./products";
import detail from "./detail";
import search from "./search";
import ui from "./ui";

const myReducers = combineReducers({
  products: products,
  detail: detail,
  search: search,
  ui: ui,
});

export default myReducers;
