import React from "react";
let cl = console.log.bind(console);


export let log = (...args) => {
  cl(...args);
};
let Console = () => {
  return <div>"est"</div>;
};
export default Console;

let getLine = () => {
  function getErrorObject() {
    try {
      throw Error("");
    } catch (err) {
      return err;
    }
  }

  
  var err = getErrorObject();
  var caller_line = err.stack.split("\n")[3];
  var index = caller_line.indexOf("at ");
  var clean = caller_line.slice(index + 2, caller_line.length);
  return caller_line;
};
log(__filename, getLine())
log(__filename, getLine())


  // StackTrace.get()
  //   .then(callback)
  //   .catch(errback);
