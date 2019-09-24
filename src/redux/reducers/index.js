import { combineReducers } from "redux";

// export default combineReducers({
//   // todos,
//   // visibilityFilter
// })
const initialState = {
  user: "none"
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.user };
    default:
      return state;
  }
};
