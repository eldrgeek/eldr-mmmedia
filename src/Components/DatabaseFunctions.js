/*
This contains a bunch of database functoions
*/
import React from "react";
import { Button, DialogContentText } from "@material-ui/core";
import {
  addSeconds,
  addMinutes,
  addHours,
  getYear,
  getMonth,
  getDate,
  getHours,
  differenceInHours,
  differenceInMinutes
} from "date-fns";
import { firebase, db, addToCollection } from "../FireStore";

const addToBucket = async (clip, diag) => {
  //adds references to document in the propoer time buckets
  const time = clip.time;
  const duration = clip.duration;

  const bucketStart = new Date(
    getYear(time),
    getMonth(time),
    getDate(time),
    getHours(time)
  );

  const endTime = addSeconds(time, duration);
  const bucketEnd = addHours(bucketStart, 1);
  const clipRef = await addToCollection("clips", clip);

  const mergeIntoBucket = async time => {
    const bucketString = time => {
      return `${getYear(time)} ${getMonth(time)} ${getDate(time)} ${getHours(
        time
      )}`;
    };
    const ref = db.collection("buckets").doc(bucketString(time));
    console.log(ref);
    return ref
      .update({
        id: "this",
        clips: firebase.firestore.FieldValue.arrayUnion(clipRef)
      })
      .then(function(bucketRef) {
        console.log("written");
        console.log("Bucket written with ID: ", bucketRef);
        return bucketRef;
      })
      .catch(function(error) {
        console.log("error", error);
        diag("Error adding to bucket: ", error);
      });
  };
  //now compute whether the document overflows the first bucket
  let numberOfBuckets = 1;
  if (endTime > bucketEnd) {
    //this clip goes past the bucket
    const firstBucketTime = differenceInMinutes(bucketEnd, time);

    const nextStart = addMinutes(time, firstBucketTime);
    numberOfBuckets = differenceInHours(endTime, nextStart) + 1 + 1;
    // diag({firstBucketTime,numberOfBuckets})
  }

  for (let i = 0; i < numberOfBuckets; i++) {
    mergeIntoBucket(addHours(bucketStart, i));
  }
};
let tried = false;
export default () => {
  const [status, setStatus] = React.useState("no state");
  const add = () =>
    addToBucket(
      {
        time: new Date(2018, 1, 1, 1),
        duration: 60 * 60 - 1,
        title: "The thing",
        location: "Bpston"
      },
      setStatus
    );
  if (!tried) setTimeout(add, 1100);
  tried = true;
  const displayStatus = status => {
    switch (typeof status) {
      case "string":
        return "string " + status;
      case "object":
        try {
          return "object " + JSON.stringify(status);
        } catch (e) {
          return e;
        }
      case "number":
        return status;
      case "undefined":
        return "undefined";
      default:
        return "UNKNOWN STATUS " + typeof status;
    }
  };
  return (
    <React.Fragment>
      {displayStatus(status)}
      <Button onClick={add}>Add</Button>
    </React.Fragment>
  );
};
export { addToBucket };
