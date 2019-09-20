import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InputX from "./InputX";
import ButtonX from "./ButtonX";
import DateX from "./DateX";
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
const refs = {};

export default p => {
  // if(props.testing) props
  let props = {
    record: {},
    classes: useStyles(),
    formTitle: "Formy",
    onClick: () => {
      console.log(props.record);
    },
    fields: [
      { name: "name", placeholder: "place" },
      { name: "name1", placeholder: "place1", type: "date" }
    ],
    ...p
  };
  // const classes = useStyles();
  const clearRefs = () => {
    console.log("clear refs");
    props.fields.map(field => {
      const ref = refs[field.name];
      if (ref) {
        console.log("clear", field.name);
        ref.value = "";
      }
    });
  };

  return (
    <React.Fragment>
      <Typography className={props.classes.centered} variant="h4">
        {props.formTitle}
      </Typography>
      <div className={props.classes.centered}>
        {props.fields.map((field, id) => {
          if (field.type !== "date")
            return (
              <InputX
                key={id}
                name={field.name}
                placeholder={field.placeholder}
                record={props.record}
                getRef={(name, ref) => (refs[name] = ref)}
              />
            );
          return <DateX />;
        })}
        )}
      </div>
      <div className={props.classes.centered}>
        <ButtonX
          text={props.button}
          className={props.classes.centered}
          onClick={() => props.onClick(clearRefs)}
        />
      </div>
    </React.Fragment>
  );
};
