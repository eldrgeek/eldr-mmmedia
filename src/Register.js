import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FormX from "./Components/FormX";
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

  const submitRegtration = () => {
    setTiming(true);
  };
  const getDuration = time => {
    setTiming(false);
    updateField("duration", time);
  };
  const record = {};

  const fields = [
    { name: "title", placeholder: "Title" },
    { name: "url", placeholder: "URL" },
    { name: "time", placeholder: "Time" },
    { name: "location", placeholder: "Location" }
  ];

  const onClick = () => {};

  return (
    <React.Fragment>
      <FormX
        formTitle="Register"
        fields={fields}
        onClick={onClick}
        record={record}
        onClick={onClick}
      />
    </React.Fragment>
  );
}
