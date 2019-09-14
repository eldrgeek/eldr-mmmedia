import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Input } from "@material-ui/core";
//import { Button } from "@material-ui/core";
const useStyles = makeStyles(theme => ({
  input: {
    margin: theme.spacing(1)
  }
}));

export default p => {
  const props = {
    record: { a: 1 },
    name: "none",
    onClick: () => console.log("click", JSON.stringify(props.record)),
    classes: useStyles(),
    placeholder: "placeholder",
    text: "testing",
    ...p
  };

  const updateField = (name, value) => {
    console.log(name, value);
    props.record[name] = value;
    // setRecord(newrecord);
    // console.log(props.record)
  };

  return (
    <Input
      placeholder={props.placeholder}
      onChange={e => updateField(props.name, e.target.value)}
      // value={""}
      className={props.classes.input}
    />
  );
};
