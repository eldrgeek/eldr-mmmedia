import React from "react";
import FormX from "./Components/FormX";
import Snackbar from "./Components/Snackbar";
import { addToCollection } from "./FireStore";

let clearRefs = () => console.log("old proc");
export default function Register() {
  const [snackbar, setSnackbar] = React.useState({ open: true });
  const [open, setOpen] = React.useState(false);

  const [record, setRecord] = React.useState({});
  const fields = [{ name: "user", placeholder: "User" }];

  const returnResult = result => {
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
      // setBucket(
      //   new Date(getYear(date), getMonth(date), getDate(date), getHours(date))
      // );
      addToCollection("media", record);
      setRecord({});
      // console.log("gonaclear")
      // console.log(clearRefs + "")
      clearRefs();

      // console.log("cleared")
      setSnackbar({
        variant: "success",
        message: "Record written",
        open: true,
        timeout: 2000
      });
      setOpen(true);
    }
  };
  const onClick = refProc => {
    clearRefs = refProc;
    setOpen(true);
  };
  return (
    <React.Fragment>
      <FormX
        formTitle="Log in"
        fields={fields}
        onClick={onClick}
        record={record}
        button="Login"
      />
      {/* {status} */}
      <br />
      {/* {bucket.toString()} */}
      {!open ? "" : <Snackbar {...snackbar} />}
    </React.Fragment>
  );
}
