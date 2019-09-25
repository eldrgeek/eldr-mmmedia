const ActionTypes = {
  SET_USER: "SET_USER"
};

export const action = actionType => {
  ActionTypes[actionType] = actionType;
};

export const SET_USER = "SET_USER";

export default ActionTypes;
