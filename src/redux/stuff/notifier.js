const initialState = {
  notification: ""
};

const defs = {
  SET_PROGRESS: {
    params: "name",
    reducer: (state, action) => ({ ...state, notification: "progress" })
  },
  SET_ERROR: {
    params: "error",
    reducer: (state, action) => ({ ...state, notification: "error" })
  }
};

export default { initialState, defs };
