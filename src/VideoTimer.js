import React from "react";
import ReactPlayer from "react-player";

const Player = ({ url, returnTime }) => {
  if (!url) url = "https://www.youtube.com/watch?v=Vr6NgrB-zHw";

  let player;
  const [duration, setDuration] = React.useState("unknown");
  const FRACTION = 0.1;
  const setRef = element => {
    window.xxx = element;
    console.log("ref", element);
    player = element;
  };
  const movePlayer = () => {
    console.log("seeking");
    player.seekTo(FRACTION, "fraction");
  };
  const getProgress = p => {
    console.log("prpgress", p);
    if (returnTime) returnTime(p.playedSeconds / FRACTION);
  };

  return (
    <React.Fragment>
      Duration {duration}
      <ReactPlayer
        ref={setRef}
        url={url}
        controls={true}
        onError={() => console.log("error")}
        onReady={movePlayer}
        onProgress={getProgress}
        // playing
        // onReady={getDuration}
        // onProgress={getDuration}
        // volume={0}
        muted={true}
      />
      ;
    </React.Fragment>
  );
};

export default Player;
