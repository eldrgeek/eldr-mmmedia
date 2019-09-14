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
  const [timing, setTiming] = React.useState(false);

  const [record, setRecord] = React.useState({ title: "aaa" });
  const submitRegtration = () => {
    setTiming(true);
  };
  const getDuration = time => {
    setTiming(false);
    updateField("duration", time);
  };
  const updateField = (name, value) => {
    console.log(name, value);
    let newrecord = { ...record };
    newrecord[name] = value;
    setRecord(newrecord);
  };
  return (
    <React.Fragment>
      <Typography variant="h4">Register new media</Typography>
      <div className={classes.container}>
        <Input
          placeholder="Title"
          value={record.title}
          onChange={e => updateField("title", e.target.value)}
          // value={""}
          className={classes.input}
        />
        <Input
          placeholder="URL"
          onChange={e => updateField("url", e.target.value)}
          className={classes.input}
          inputProps={{
            "aria-label": "description"
          }}
        />
        <Input
          placeholder="Time"
          className={classes.input}
          onChange={e => updateField("time", e.target.value)}
          // disabled
          inputProps={{
            "aria-label": "description"
          }}
        />
        <Input
          placeholder="place"
          onChange={e => updateField("place", e.target.value)}
          className={classes.input}
          inputProps={{
            "aria-label": "description"
          }}
        />
      </div>
      <div>
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={submitRegtration}
        >
          Submit
        </Button>
      </div>
    </React.Fragment>
  );
}
