import React from "react";
import { Typography } from "@material-ui/core";
import Player from "./Player";
const Playback = () => {
  return (
    <React.Fragment>
      <Typography variant="h4">Playback Page</Typography>;
      <Player url="https://www.youtube.com/watch?v=Vr6NgrB-zHw" />
    </React.Fragment>
  );
};

export default Playback;
