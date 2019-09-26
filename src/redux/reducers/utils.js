const combineActions = defs => {
  return (name, params) => {
    const action = defs[name];
    if (action) {
      return { type: name, ...params };
    } else {
      console.log("No action " + name);
    }
  };
};

export const makeReducer = spec => {
  return (state = spec.initialState, action) => {
    console.log("reducer state", JSON.stringify(state));
    const definition = spec.defs[action.type];
    if (definition) {
      return definition.reducer(state, action);
    } else {
      return state;
    }
  };
};

export const combineSpecs = (...defs) => {
  console.log(defs);
  const combinedDefs = Object.assign({}, ...defs.map(def => def.defs));
  return combineActions(combinedDefs);
};
