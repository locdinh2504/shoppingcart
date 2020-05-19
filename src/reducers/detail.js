import * as types from "./../constants/ActionTypes";

var data = JSON.parse(localStorage.getItem("CART"));
var initialstate = data ? data : [];
const detail = (state = initialstate, action) => {
  var { products, quantity } = action;
  var index = -1;
  switch (action.type) {
    case types.DETAIL_PRODUCT:
      return state;
    case types.UPDATE_QUANTITY:
      if (quantity > 0) {
        var priceTotal = products.price * quantity;
        index = state.findIndex((x) => x.products.id === products.id);
        if (index !== -1) {
          state[index].quantity = quantity;
          state[index].price = priceTotal;
        }
      }
      return [...state];
    case types.ADD_TO_CART:
      var priceTotal = products.price * quantity;
      index = state.findIndex((x) => x.products.id === products.id);
      if (index === -1) {
        state.push({
          products,
          quantity,
          price: priceTotal,
        });
      }

      localStorage.setItem("CART", JSON.stringify(state));

      return [...state];

    case types.DELETE_ITEM:
      index = state.findIndex((x) => x.products.id === products.id);
      if (index !== -1) {
        state.splice(index, 1);
      }
      localStorage.setItem("CART", JSON.stringify(state));

      return [...state];
    case types.DELETE_ITEM_ALL:
      state.splice([]);

      localStorage.removeItem("CART");

      return [...state];
    default:
      return [...state];
  }
};

var findIndexProduct = (detail, products) => {
  var index = -1;
  if (detail.length > 0) {
    for (var i = 0; i < detail.length; i++) {
      if (detail[i].products.id === products.id) {
        console.log(detail[0].products.id);
        index = i;
        break;
      }
    }
  }
  return index;
};
export default detail;
