// console.log('loading actions');
export const changeUserName = ({ state }, name) => {
  state.partialUserName = name;
};

export const setUser = ({ state }) => {
  state.userName = state.partialUserName;
  state.partialUserName = "";
};

export const snackbar = {
  show({ state }, variant = "info") {
    state.snackbar.open = true;
    state.snackbar.variant = variant;
  },
  close({ state }) {
    state.snackbar.open = false;
  }
};
