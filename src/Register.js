import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import { Button } from "@material-ui/core";
const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  input: {
    margin: theme.spacing(1)
  }
}));

export default function Register() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography variant="h4">Register new media</Typography>
      <div className={classes.container}>
        <Input placeholder="Title" className={classes.input} />
        <Input
          placeholder="URL"
          className={classes.input}
          inputProps={{
            "aria-label": "description"
          }}
        />
        <Input
          value="Time"
          className={classes.input}
          disabled
          inputProps={{
            "aria-label": "description"
          }}
        />
        <Input
          placeholder="place"
          className={classes.input}
          inputProps={{
            "aria-label": "description"
          }}
        />
      </div>
      <div>
        <Button size="small" variant="contained" color="primary">
          Submit
        </Button>
      </div>
    </React.Fragment>
  );
}
