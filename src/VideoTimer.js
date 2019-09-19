import React from "react";
import ReactPlayer from "react-player";

const Player = p => {
  const props = {
    returnResult: r => console.log("result", r),
    url: "https://www.youtube.com/watch?v=Vr6NgrB-zHw",
    ...p
  };
  const [playing, setPlaying] = React.useState(true);
  const [result, setResult] = React.useState({});
  //See if URL points to a valid site
  const { url, returnResult } = props;
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
    setResult({ playable: true, duration: p.playedSeconds / FRACTION });
    returnResult(result);
  };
  const isError = () => {
    setPlaying(false);
  };

  return (
    <React.Fragment>
      Result{JSON.stringify(result)}
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
      ;
    </React.Fragment>
  );
};

export default Player;
