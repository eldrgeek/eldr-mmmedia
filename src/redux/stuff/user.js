const initialState = {
  name: "none",
  songs: 10
};

const defs = {
  SET_USER: {
    params: "name",
    reducer: (state, action) => ({ ...state, name: action.name })
  },
  LOGOUT: {
    reducer: (state, action) => ({ ...state, name: undefined })
  }
};

export default { initialState, defs };
