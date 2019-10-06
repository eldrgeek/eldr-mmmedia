import React from "react";
import { Typography } from "@material-ui/core";
import Player from "./Player";

import { connect } from "react-redux";
import FormX from "./Components/FormX";
import StorageProvider from "../src/redux/storage/index";
import Snackbar from "./Components/Snackbar";
import { makeAction } from "./redux/reducers";
import { addToCollection } from "./Database/FireStore";
import useLocalStorage from "react-use-localstorage";
import ListX from "./Components/ListX";
import { getClipsForTime } from "/src/Database/DatabaseFunctions";
let clearRefs = () => console.log("old proc");
const cl = console.log.bind(console);
let diag = cl;
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
  // diag("parent", )
  const fields = [{ name: "time", placeholder: "Time", type: "date" }];
  const onClick = () => {
    getClipsForTime(new Date(2018, 1, 1, 1, 0, 2));
  };
  const record = {};
  return (
    <React.Fragment>
      {/* <Typography variant="h4">Playback Page</Typography>; */}
      ref={e => console.log("ref", e.parent)}
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
