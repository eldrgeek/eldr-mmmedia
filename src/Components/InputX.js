import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
//import { Button } from "@material-ui/core";
const useStyles = makeStyles(theme => ({
  input: {
    margin: theme.spacing(1)
  }
}));

export default p => {
  const props = {
    record: { none: "init" },
    refs: {},
    name: "none",
    onClick: () => console.log("click", JSON.stringify(props.record)),
    classes: useStyles(),
    placeholder: "placeholder",
    getRef: (name, ref) => {
      console.log(ref, name, ref);
    },
    text: "testing",
    ...p
  };

  const updateField = (name, value) => {
    console.log(name, value);
    props.record[name] = value;

    // setRecord(newrecord);
    // console.log(props.record)
  };
  let input;
  const handleClear = () => {
    // input.value = ""
    console.log("clear");
    props.refs[props.name].value = "";
    // props.refs[props.name] = ""
  };
  console.log("prop", props.record[props.name]);

  return (
    <React.Fragment>
      <TextField
        label={"Enter " + props.placeholder}
        margin="normal"
        // value={props.record[props.name]}
        // placeholder={props.placeholder}
        onChange={e => updateField(props.name, e.target.value)}
        // value={""}
        className={props.classes.input}
        inputRef={el => props.getRef(props.name, el)}
      />
      {/* 
      <Button variant="contained" onClick={handleClear} className="materialBtn">
        Clear
      </Button> */}
    </React.Fragment>
  );
};
