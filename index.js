import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Button } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "./src/styles.css";
import Register from "./src/Register";
import Playback from "./src/Playback";
import Login from "./src/Login";
import Record from "./src/Record";
// import Upload from ".src/Upload";
import AppBar from "./src/Components/MMMAppBar";
import Snackbar from "./src/Components/Snackbar";
import { UserName } from "./src/Components/UserName";
import StoreProvider from "../src/redux/storage";
import useLocalStorage from "react-use-localstorage";
import Cookie from "cookies-js";

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));

function MainApp() {
  const classes = useStyles();
  const [form, setForm] = React.useState("");
  const [user, setUser] = useLocalStorage(
    "userName",
    window.localStorage.getItem("userName") || "none"
  );

  const changeForm = newForm => {
    if (form === newForm) {
      setForm("");
      setUser(window.localStorage.getItem("userName") || "none");
    } else {
      setForm(newForm);
    }
  };

  const pages = {
    login: { component: <Login /> },
    register: { component: <Register /> },
    record: { component: <Record /> },
    play: { component: <Playback /> }
  };

  return (
    <div className="App">
      <AppBar propthing="prop" changeForm={changeForm} />

      {/* {"" + JSON.stringify(Cookie.get("peer"))} */}

      {Object.keys(pages).map((key, i) => {
        return <div> {key === form ? pages[key].component : ""} </div>;
      })}
      {form === "" ? (
        <div>
          <Typography variant="h4">MMMedia</Typography>
          <UserName />
        </div>
      ) : (
        ""
      )}
      {/* <Player /> */}
      {/* {!open ? "" : <Snackbar {...snackbar} />} */}
    </div>
  );
}

const App = () => {
  console.log(StoreProvider);
  return (
    <StoreProvider>
      <MainApp />
    </StoreProvider>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
