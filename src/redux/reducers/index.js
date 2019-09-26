import { combineReducers } from "redux";
import userSpec from "./user";
import notifierSpec from "./notifier";
import { makeReducer, combineSpecs } from "./utils";

export const makeAction = combineSpecs(userSpec, notifierSpec);

const user = makeReducer(userSpec);
const notifier = makeReducer(notifierSpec);

export default combineReducers({
  user,
  notifier
});
