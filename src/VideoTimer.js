import React from "react";
import ReactPlayer from "react-player";
import { formatRelativeWithOptions } from "date-fns/esm/fp";

const Player = p => {
  const props = {
    returnResult: r => console.log("result", r),
    url: "https://www.youtube.com/watch?v=Vr6NgrB-zHw",
    checkTime: false,
    diag: formatRelativeWithOptions,
    ...p
  };
  const [playing, setPlaying] = React.useState(true);
  const [result, setResult] = React.useState({});
  //See if URL points to a valid site
  const { url, returnResult } = props;
  if (!props.checkTime) {
    if (props.diag) {
      return <React.Fragment />;
    } else {
      return "";
    }
  }
  if (!ReactPlayer.canPlay(url)) {
    returnResult({ playable: false });
    return JSON.stringify(result);
  }
  // if it points to a valid site then we need to play it

  // const [theUrl,setTheUrl] = React.useState(url)
  const FRACTION = 0.1;

  //get a ref to the player so we can control it
  let player;
  const setRef = element => {
    player = element;
  };

  //if the player is ready, seek
  const movePlayer = () => {
    console.log("seeking");
    player.seekTo(FRACTION, "fraction");
  };
  const getProgress = p => {
    console.log("isPlaying", playing);
    setPlaying(false);
    console.log("prpgress", p);
    const progress = { playable: true, duration: p.playedSeconds / FRACTION };
    setResult(progress);
    returnResult(progress);
  };
  const isError = () => {
    setPlaying(false);
  };

  return (
    <React.Fragment>
      {props.diag ? "Result " + JSON.stringify(result) : ""}
      <div style={{ display: "none" }}>
        <ReactPlayer
          ref={setRef}
          url={url}
          controls={true}
          onError={isError}
          onReady={movePlayer}
          onProgress={getProgress}
          // playing={playing}
          // onReady={getDuration}
          // onProgress={getDuration}
          // volume={0}
          muted={true}
        />
      </div>
    </React.Fragment>
  );
};

export default Player;
