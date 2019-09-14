import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  }
}));
export default p => {
  const props = {
    onClick: () => console.log("click"),
    classes: useStyles(),
    text: "testing",
    ...p
  };
  return (
    <Button
      size="small"
      variant="contained"
      color="primary"
      className={props.classes.margin}
      onClick={props.onClick}
    >
      {props.text}
    </Button>
  );
};
