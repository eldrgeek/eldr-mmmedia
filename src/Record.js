import React from "react";
import FormX from "./Components/FormX";
import Snackbar from "./Components/Snackbar";
import { addToCollection } from "./Database/FireStore";
import VideoTimer from "./VideoTimer";
// import d, { getYear, getMonth, getDay, getHour } from "date-fns";
import { getYear, getMonth, getDate, getHours } from "date-fns";

let clearRefs = () => console.log("old proc");
export default function Record() {
  const [status, setStatus] = React.useState(false);
  const [snackbar, setSnackbar] = React.useState({ open: true });
  const [open, setOpen] = React.useState(false);

  const [record, setRecord] = React.useState({});
  const [bucket, setBucket] = React.useState("no bucket");
  const fields = [{ name: "title", placeholder: "Title" }];

  const returnResult = result => {
    setStatus("return " + JSON.stringify(result));
    // console.log("result", result);

    if (!result.playable) {
      setSnackbar({
        variant: "error",
        message: "Media is not playable",
        open: true,
        timeout: 2000
      });
      setOpen(true);
    } else {
      const date = record.time;
      setBucket(
        new Date(getYear(date), getMonth(date), getDate(date), getHours(date))
      );
      addToCollection("media", record);
      setRecord({});
      // console.log("gonaclear")
      // console.log(clearRefs + "")
      clearRefs();
      setStatus("Record added");
      // console.log("cleared")
      setSnackbar({
        variant: "success",
        message: "Record written",
        open: true,
        timeout: 2000
      });
      setOpen(true);
    }
    setCheckTime(false);
  };
  const onClick = refProc => {
    clearRefs = refProc;
    // console.log("refproc", refProc + "")
    setStatus("clicked");
    setCheckTime(true);
    // record.url = "https://www.youtube.com/watch?v=Vr6NgrB-zHw";
    setOpen(true);
    setStatus(JSON.stringify(record));
  };
  return (
    <React.Fragment>
      <FormX
        formTitle="Record"
        fields={fields}
        onClick={onClick}
        record={record}
        button="Record"
      />
      {/* {status} */}
      <br />
      {/* {bucket.toString()} */}
      {!open ? "" : <Snackbar {...snackbar} />}
    </React.Fragment>
  );
}
