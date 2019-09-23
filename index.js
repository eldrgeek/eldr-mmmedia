import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Button } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "./src/styles.css";
import Register from "./src/Register";
import Playback from "./src/Playback";
import Login from "./src/Login";
import Record from "./src/Record";
import Snackbar from "./src/Components/Snackbar";
const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));

function App() {
  const classes = useStyles();
  const [form, setForm] = React.useState("");

  const pages = {
    login: { component: <Login /> },
    register: { component: <Register /> },
    record: { component: <Record /> },
    play: { component: <Playback /> }
  };

  const changeForm = newForm => {
    if (form === newForm) {
      setForm("");
    } else {
      setForm(newForm);
    }
  };

  return (
    <div className="App">
      <Typography variant="h4">MMMedia</Typography>
      {Object.keys(pages).map((key, i) => {
        return (
          <Button
            key={i}
            className={classes.margin}
            size="small"
            variant="contained"
            color="primary"
            onClick={() => changeForm(key)}
          >
            {key}
          </Button>
        );
      })}
      {Object.keys(pages).map((key, i) => {
        return <div> {key === form ? pages[key].component : ""} </div>;
      })}

      {/* <Player /> */}
      {/* {!open ? "" : <Snackbar {...snackbar} />} */}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
