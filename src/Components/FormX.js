import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InputX from "./InputX";
import ButtonX from "./ButtonX";
//import { Button } from "@material-ui/core";
const useStyles = makeStyles(theme => ({
  centered: {
    textAlign: "center"
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  }
}));

export default p => {
  // if(props.testing) props
  let props = {
    record: {},
    classes: useStyles(),
    formTitle: "Form",
    onClick: () => {
      console.log(record);
    },
    fields: [{ name: "name", placeholder: "place" }],
    ...p
  };
  const classes = useStyles();
  const record = {};
  return (
    <React.Fragment>
      <Typography className={classes.centered} variant="h4">
        {props.formTitle}
      </Typography>
      <div className={classes.container}>
        {props.fields.map(field => (
          <InputX
            name={field.name}
            placeholder={field.placeholder}
            record={props.record}
          />
        ))}
      </div>
      <ButtonX onClick={props.onClick} />
    </React.Fragment>
  );
};
