import React from "react";
import { Typography } from "@material-ui/core";
import Player from "./Player";

import { connect } from "react-redux";
import FormX from "./Components/FormX";
import StorageProvider from "../src/redux/storage/index";
import Snackbar from "./Components/Snackbar";
import { makeAction } from "./redux/reducers";
import { addToCollection } from "./FireStore";
import useLocalStorage from "react-use-localstorage";
import ListX from "./Components/ListX";
let clearRefs = () => console.log("old proc");
const listProps = {
  height: 200,
  width: 300,
  itemSize: 40,
  itemCount: 200,
  itemStyle: { color: "red" },
  itemData: {
    includeAll: true,
    titles: [
      "This is the other or",
      "this is the second",
      "this is the thirdrd"
    ],
    returnList: list => {
      console.log([...list]);
    }
  }
};

const Playback = () => {
  const fields = [{ name: "time", placeholder: "Time", type: "date" }];
  const onClick = () => {};
  const record = {};

  return (
    <React.Fragment>
      {/* <Typography variant="h4">Playback Page</Typography>; */}
      <FormX
        formTitle="Media time"
        fields={fields}
        onClick={onClick}
        record={record}
        button="Select"
      />
      <ListX {...listProps} />
      {/* <Player url="https://www.youtube.com/watch?v=Vr6NgrB-zHw" /> */}
    </React.Fragment>
  );
};

export default Playback;
