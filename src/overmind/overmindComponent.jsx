import React from "react";
import { render } from "react-dom";
import { Provider } from "overmind-react";
import { app } from "./index";
import { useApp } from "./index";

const overmindComponent = Element => {
  const rootElement = document.getElementById("root");
  render(
    <Provider value={app}>
      <Element isModule={true} />
    </Provider>,
    rootElement
  );
};
const useComponentTest = (props, testRoutines, timeout = 4000) => {
  if (!Array.isArray(testRoutines)) testRoutines = [testRoutines];
  const [first, setFirst] = React.useState(true);
  if (props.isModule && first) {
    for (let index = 0; index < testRoutines.length; index++) {
      if (index === 0) {
        testRoutines[index]();
      } else {
        setTimeout(testRoutines[index], index * timeout);
      }
    }
    setFirst(false);
  }
};
export { overmindComponent, React, useApp, useComponentTest };
export default () => {
  return <h4>component does not render</h4>;
};
