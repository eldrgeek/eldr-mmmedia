import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InputX from "./InputX";
import ButtonX from "./ButtonX";
//import { Button } from "@material-ui/core";
const useStyles = makeStyles(theme => ({
  centered: {
    textAlign: "center",
    margin: "0 auto",
    maxWidth: "600px"
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
    formTitle: "Formy",
    onClick: () => {
      console.log(props.record);
    },
    fields: [{ name: "name", placeholder: "place" }],
    ...p
  };
  // const classes = useStyles();

  return (
    <React.Fragment>
      <Typography className={props.classes.centered} variant="h4">
        {props.formTitle}
      </Typography>
      <div className={props.classes.centered}>
        {props.fields.map((field, id) => (
          <InputX
            key={id}
            name={field.name}
            placeholder={field.placeholder}
            record={props.record}
          />
        ))}
      </div>
      <div className={props.classes.centered}>
        <ButtonX className={props.classes.centered} nClick={props.onClick} />
      </div>
    </React.Fragment>
  );
};
