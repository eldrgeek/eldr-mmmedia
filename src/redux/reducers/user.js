const initialState = {
  name: "none",
  songs: 10
};

const actionDefinitions = {
  SET_USER: {
    params: "name",
    reducer: (state, action) => ({ ...state, name: action.name })
  },
  LOGOUT: {
    reducer: (state, action) => ({ ...state, name: undefined })
  }
};

const rootReducer = (state = initialState, action) => {
  const definition = actionDefinitions[action.type];
  if (definition) {
    return definition.reducer(state, action);
  } else {
    return state;
  }
};

export default rootReducer;

export const makeAction = (name, params) => {
  const action = actionDefinitions[name];
  if (action) {
    return { type: name, ...params };
  } else {
    console.log("No action " + name);
  }
};
