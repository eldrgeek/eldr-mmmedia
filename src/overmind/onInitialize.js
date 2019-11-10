export const onInitialize = ({ state, actions, effects }, instance) => {
  state.todos = effects.storage.getTodos();
  // console.log('on initializw');

  // effects.router.initialize({
  //   '/': () => actions.changeFilter('all'),
  //   '/login': () => actions.changeFilter('active'),
  //   '/completed': () => actions.changeFilter('completed'),
  // });
};
