import React from "react";
import { Typography } from "@material-ui/core";
import Player from "./Player";
const Playback = () => {
  return (
    <React.Fragment>
      <Typography variant="h4">Playback Page</Typography>;<Player />
    </React.Fragment>
  );
};

export default Playback;
