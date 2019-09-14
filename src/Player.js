import React from "react";
import ReactPlayer from "react-player";

const Player = ({ url }) => {
  return <ReactPlayer url={url} playing />;
};

export default Player;
