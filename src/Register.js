import React from "react";
import FormX from "./Components/FormX";
import { addToCollection } from "./FireStore";
import VideoTimer from "./VideoTimer";

let clearRefs = () => console.log("old proc");
export default function Register() {
  const [timing, setTiming] = React.useState(false);
  const [status, setStatus] = React.useState(false);
  const [checkTime, setCheckTime] = React.useState(false);

  const [record, setRecord] = React.useState({});
  const fields = [
    { name: "title", placeholder: "Title" },
    { name: "url", placeholder: "URL" },
    { name: "location", placeholder: "Location" },
    { name: "time", placeholder: "Time", type: "date" }
  ];

  const returnResult = result => {
    setStatus("return " + JSON.stringify(result));
    if (result.playable) {
      addToCollection("media", record);
      setRecord({});
      // console.log("gonaclear")
      // console.log(clearRefs + "")
      clearRefs();
      setStatus("Record added");
      // console.log("cleared")
    }
    setCheckTime(false);
  };
  const onClick = refProc => {
    clearRefs = refProc;
    // console.log("refproc", refProc + "")
    setStatus("clicked");
    setCheckTime(true);
    // record.url = "https://www.youtube.com/watch?v=Vr6NgrB-zHw";

    setStatus(JSON.stringify(record));
  };
  return (
    <React.Fragment>
      <FormX
        formTitle="Register"
        fields={fields}
        onClick={onClick}
        record={record}
        button="add media"
      />
      {status}
      <VideoTimer
        url="https://www.youtube.com/watch?v=Vr6NgrB-zHw" //{record.url}
        checkTime={checkTime}
        diag={true}
        returnResult={returnResult}
      />
    </React.Fragment>
  );
}
