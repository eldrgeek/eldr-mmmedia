import { overmindComponent, React, useApp } from "./overmind/overmindComponent";
import FormX from "./Components/FormX";
import Snackbar from "./Components/Snackbar";
import { addToCollection } from "/src/Database/FireStore";
import UserName from "./Components/UserName";

let clearRefs = () => console.log("old proc");

function Login(p) {
  const [snackbar, setSnackbar] = React.useState({ open: true });
  const [open, setOpen] = React.useState(false);

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
    console.log("Set pqge", p.setForm);
    if (p.setForm) p.setForm("");
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

// let Make = (e,props) => () => <StorageProvider >{e}</StorageProvider>;

// ProvidedElement = Make(<Login a={10} />);

export default Login;

overmindComponent(Login);
