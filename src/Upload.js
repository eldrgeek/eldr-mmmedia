import React from "react";
import { connect } from "react-redux";
import FormX from "./Components/FormX";
import StorageProvider from "../src/redux/storage/index";
import Snackbar from "./Components/Snackbar";
import { makeAction } from "./redux/reducers";
import { addToCollection } from "./FireStore";
import useLocalStorage from "react-use-localstorage";
import UserName from "./Components/UserName";
import TestData from "./TestData";
let clearRefs = () => console.log("old proc");

function UploadImpl(p) {
  console.log("Props are ::", p);
  const [snackbar, setSnackbar] = React.useState({ open: true });
  const [open, setOpen] = React.useState(false);
  const [fileName, setFileName] = useLocalStorage(
    "userName",
    window.localStorage.getItem("userName")
  );

  const [record, setRecord] = React.useState({});
  const fields = [{ name: "fileName", placeholder: "file name" }];

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
    p.setFileName(refs.fileName.value);
  };
  return (
    <React.Fragment>
      <UserName />
      <FormX
        formTitle="Upload"
        fields={fields}
        onClick={onClick}
        record={record}
        button="Upload"
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
    setFileName: e => dispatch(makeAction("SET_USER", { name: e }))
  };
};
export const Upload = connect(
  null,
  mapDispatchToProps
)(UploadImpl);

let ProvidedElement = () => (
  <StorageProvider>
    <Upload a={10} />
  </StorageProvider>
);

let Make = e => () => <StorageProvider>{e}</StorageProvider>;

ProvidedElement = Make(<Upload a={10} />);

export default ProvidedElement;
