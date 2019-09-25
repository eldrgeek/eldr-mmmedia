import { Provider } from "react-redux";
import React from "react";
import rootReducer from "../reducers";
import { createStore } from "redux";
const store = createStore(rootReducer);

const StoreProvider = ({ children }) => {
  return <Provider store={store}> {children} </Provider>;
};

export default StoreProvider;
