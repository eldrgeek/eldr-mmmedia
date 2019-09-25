import React from "react";
import { connect } from "react-redux";
import FormX from "./Components/FormX";
import StorageProvider from "../src/redux/storage/index";
import Snackbar from "./Components/Snackbar";
import { makeAction } from "./redux/reducers/user";
import { addToCollection } from "./FireStore";
import useLocalStorage from "react-use-localstorage";
import UserName from "./Components/UserName";

let clearRefs = () => console.log("old proc");

function LoginImpl(p) {
  console.log("Props are ::", p);
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
    p.setUser(refs.user.value);
  };
  return (
    <React.Fragment>
      <UserName />
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

const mapDispatchToProps = dispatch => {
  return {
    setUser: e => dispatch(makeAction("SET_USER", { name: e }))
  };
};
export const Login = connect(
  null,
  mapDispatchToProps
)(LoginImpl);

const ProvidedElement = () => (
  <StorageProvider>
    <Login a={10} />
  </StorageProvider>
);

export default ProvidedElement;
