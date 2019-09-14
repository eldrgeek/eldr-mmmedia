import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const testProps = (props, defaults) => {};
//import { Button } from "@material-ui/core";
const useStyles = makeStyles(theme => ({
  centered: {
    textAlign: "center"
  }
}));

export default props => {
  // if(props.testing) props
  let p = { ...props, a: "b" };
  const classes = useStyles();
  return (
    <Typography className={classes.centered} variant="h4">
      Title
    </Typography>
  );
};
