import * as types from "./../constants/ActionTypes";

const initialstate = {
  showloading: false,
};

const ui = (state = initialstate, action) => {
  switch (action.type) {
    case types.SHOW_LOADING:
      return {
        ...state,
        showloading: true,
      };
    case types.HIDE_LOADING:
      return {
        ...state,
        showloading: false,
      };

    default:
      return state;
  }
};

export default ui;
