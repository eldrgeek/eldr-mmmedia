/*VideoTImer discovers the amount of time that it
takes for a video. Invocation:
<VideoTimer >
  url={URL to time},
  returnResult={callback to get the result}
</VideoTimer>


The callback rountine returnResult has the signature
  returnResult = (result, setURL) =>

The result has the form:
{playable:false} or
{playable: true, duration:<duration in seconds}

setURL lets you set a new URL after the result is obtained

*/

import React from "react";
import ReactPlayer from "react-player";
import { formatRelativeWithOptions } from "date-fns/esm/fp";

const Player = p => {
  const props = {
    returnResult: r => console.log("result", r),
    url: "https://www.youtube.com/watch?v=Vr6NgrB-zHw",
    checkTime: true,
    diag: formatRelativeWithOptions,
    ...p
  };

  const [playing, setPlaying] = React.useState(true);
  const [result, setResult] = React.useState({});
  const [theURL, settheURL] = React.useState(props.url);
  const updateURL = url => {
    console.log("updated url");
    settheURL(url);
  };

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
    returnResult({ playable: false }, updateURL);
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
    player.seekTo(FRACTION, "fraction");
  };
  const getProgress = p => {
    // console.log("isPlaying", playing);
    setPlaying(false);
    // console.log("prpgress", p);
    const progress = { playable: true, duration: p.playedSeconds / FRACTION };
    setResult(progress);
    returnResult(progress, updateURL);
  };
  const isError = () => {
    setPlaying(false);
  };

  return (
    <React.Fragment>
      {props.diag ? "Result " + JSON.stringify(result) : ""}
      <div style={{ display: "none" }}>
        <ReactPlayer
          key={theURL}
          ref={setRef}
          url={theURL}
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
//test framework
// const props = {
//   url: "https://www.youtube.com/watch?v=X1mp1j0ef8c",
//   returnResult: (result, updateURL) => {
//     console.log("RESULT IS ", result);
//     if (props.url != url2) {

//       props.url = url2
//       updateURL(url2)
//     }

//   }
// }
// const Tester = (test) => {

// return <Player {...props} >

//   </Player>
// }

// const url2= "https://www.youtube.com/watch?v=Vr6NgrB-zHw"
export default Player;
