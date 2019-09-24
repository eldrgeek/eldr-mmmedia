import React from "react";
import FormX from "./Components/FormX";
import Snackbar from "./Components/Snackbar";
import { addToCollection } from "./FireStore";
import useLocalStorage from "react-use-localstorage";
let clearRefs = () => console.log("old proc");
export default function Register() {
  const [snackbar, setSnackbar] = React.useState({ open: true });
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = useLocalStorage(
    "userName",
    window.localStorage.getItem("userName")
  );

  const [record, setRecord] = React.useState({});
  const fields = [{ name: "user", placeholder: "User" }];

  const returnResult = result => {
    // console.log("cleared")
    // setSnackbar({
    //   variant: "success",
    //   message: "Record written",
    //   open: true,
    //   timeout: 2000
    // });
    // setOpen(true);
  };
  const onClick = (refProc, refs) => {
    setUser(refs.user.value);
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
