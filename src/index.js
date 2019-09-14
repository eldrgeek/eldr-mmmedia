import React, { useState } from "react";
import ReactDOM from "react-dom";
import Player from "./Player.js";
import { Button } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "./styles.css";
import Register from "./Register";
import Playback from "./Playback";

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
  const [register, setRegister] = useState(false);
  const [playback, setPlayback] = useState(false);
  const openRegister = () => {
    if (!register) {
      setRegister(true);
      setPlayback(false);
    } else setRegister(false);
  };
  const openPlayback = () => {
    if (!playback) {
      setRegister(false);
      setPlayback(true);
    } else setPlayback(false);
  };
  return (
    <div className="App">
      <Typography variant="h4">MMMedia</Typography>
      <Button
        className={classes.margin}
        size="small"
        variant="contained"
        color="primary"
        onClick={openRegister}
      >
        {" "}
        Register{" "}
      </Button>

      <Button
        className={classes.margin}
        size="small"
        variant="contained"
        color="primary"
        onClick={openPlayback}
      >
        Playback
      </Button>
      {register ? <Register /> : ""}
      {playback ? <Playback /> : ""}
      {/* <Player /> */}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
