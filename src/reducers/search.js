import * as types from "./../constants/ActionTypes";

var initialstate = "";

const search = (state = initialstate, action) => {
  switch (action.type) {
    case types.SEARCH:
      console.log(action);
      return action.keyword;
    default:
      return state;
  }
};

export default search;
