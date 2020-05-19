import * as types from "./../constants/ActionTypes";
import callAPI from "./../utities/callAPI";

export const fetchproduct = (products) => {
  return {
    type: types.FETCH_PRODUCT,
    products: products,
  };
};

export const fetchproductRequest = () => {
  return (dispatch) => {
    dispatch(showloading());

    return callAPI("bags", "GET", null)
      .then((res) => {
        dispatch(fetchproduct(res.data));
      })
      .finally(() => {
        dispatch(hideloading());
      });
  };
};

export const detailproductRequest = (id) => {
  return (dispatch) => {
    dispatch(showloading());
    return callAPI(`bags/${id}`, "GET", null).then((res) => {
      dispatch(detailproduct(res));
      dispatch(hideloading());
    });
  };
};

export const detailproduct = (products) => {
  return {
    type: types.DETAIL_PRODUCT,
    products: products,
  };
};

//add to cart

export const addtocart = (products, quantity) => {
  return {
    type: types.ADD_TO_CART,
    products: products,
    quantity: quantity,
  };
};

//update quantity
export const updatequantity = (products, quantity) => {
  return {
    type: types.UPDATE_QUANTITY,
    products: products,
    quantity: quantity,
  };
};

//update price

export const updateprice = (products) => {
  return {
    type: types.UPDATE_PRICE,
    products: products,
  };
};

//delete item

export const deleteitem = (products) => {
  return {
    type: types.DELETE_ITEM,
    products: products,
  };
};

export const deleteitemall = (products) => {
  return {
    type: types.DELETE_ITEM_ALL,
    products: products,
  };
};

//search
export const search = (keyword) => {
  return {
    type: types.SEARCH,
    keyword: keyword,
  };
};

//loading
export const showloading = () => {
  return {
    type: types.SHOW_LOADING,
  };
};

export const hideloading = () => {
  return {
    type: types.HIDE_LOADING,
  };
};
