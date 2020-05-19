import * as types from "./../constants/ActionTypes";

var initialstate = [];

const products = (state = initialstate, action) => {
  switch (action.type) {
    case types.FETCH_PRODUCT:
      state = action.products;
      return [...state];

    // case types.UPDATE_QUANTITY:
    // detail.quantity = quantity;

    // var index = -1;
    // index = findIndexProduct(state, products);
    // console.log(state[index].quantity);
    // if (index !== -1) {
    //   state[index].quantity = quantity;
    // }
    // if ((localStorage.getItem("CART"), detail.quantity > 0)) {}
    // localStorage.setItem("CART", JSON.stringify(state));

    // return [...state];

    default:
      return [...state];
  }
};

export default products;
