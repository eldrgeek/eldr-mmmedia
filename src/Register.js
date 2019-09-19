import React from "react";
import FormX from "./Components/FormX";
import { addToCollection } from "./FireStore";
import VideoTimer from "./VideoTimer";
export default function Register() {
  const [timing, setTiming] = React.useState(false);
  const [status, setStatus] = React.useState(false);
  const [checkTime, setCheckTime] = React.useState(false);
  const submitRegtration = () => {
    setTiming(true);
  };
  const getDuration = time => {
    setTiming(false);
    updateField("duration", time);
  };
  const record = {};
  const fields = [
    { name: "title", placeholder: "Title" },
    { name: "url", placeholder: "URL" },
    { name: "time", placeholder: "Time" },
    { name: "location", placeholder: "Location" }
  ];

  const returnResult = result => {
    setStatus("return " + JSON.stringify(result));
    setCheckTime(false);
  };
  const onClick = () => {
    setStatus("clicked");
    setCheckTime(true);
    // record.url = "https://www.youtube.com/watch?v=Vr6NgrB-zHw";
    // addToCollection("media", record);
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
