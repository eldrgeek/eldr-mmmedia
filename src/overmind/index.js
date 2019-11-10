import { createHook } from "overmind-react";
import { state } from "./state";
import { onInitialize } from "./onInitialize";
import * as actions from "./actions";
import * as effects from "./effects";
import { createOvermind, json } from "overmind";

export let useApp;
export let app;
// console.log('loading index');
const config = {
  onInitialize,
  state,
  actions,
  effects
};

const initialize = () => {
  // console.log('running iniializer');
  // debugger;
  app = createOvermind(config, {
    // devtools: 'localhost:8080',
  });

  console.log(JSON.stringify(json(app.state)));
  if (app.dispose) app.dispose();
  app.dispose = app.reaction(
    ({ todos }) => todos,
    //Fix bug passing todos
    todos => effects.storage.saveTodos(todos),
    { nested: true }
  );
  useApp = createHook();
};

// if (!module.hot) {
initialize();
// } else {}
//   module.hot.dispose(data => {
//     data.app = app;
//     data.useApp = useApp;
//   });

//   if (!module.hot.data) {
//     initialize()
//   } else {
//     app = module.hot.data.app;
//     useApp = module.hot.data.useApp;
//   }
// }
