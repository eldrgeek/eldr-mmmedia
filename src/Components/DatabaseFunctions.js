/*
This contains a bunch of database functoions
*/
import React from "react";

import {
  addSeconds,
  addHours,
  getYear,
  getMonth,
  getDate,
  getHours
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
  const bucketEnd = addHours(time, 1);

  const clipRef = await addToCollection("clips", clip);
  diag(clipRef.toString());

  const mergeIntoBucket = time => {
    const bucketString = time => {
      `${getYear(time)}/${getMonth(time)}/${getDate(time)}/${getHours(time)}`;
    };
    return db
      .collection("buckets")
      .doc(bucketString)
      .update({
        clips: firebase.firestore.FieldValue.arrayUnion(clipRef)
      })
      .then(function(bucketRef) {
        console.log("Bucket written with ID: ", bucketRef.id);
      })
      .catch(function(error) {
        console.error("Error adding to bucket: ", error);
      });
  };

  //now compute whether the document overflows the first bucket
  const timePastBucket = endTime - bucketEnd;
  let numberOfBuckets = 1;
  if (timePastBucket > 0) {
    //this clip goes past the bucket
    numberOfBuckets = getHours(timePastBucket) + 1;
  }

  for (let i = 0; i < numberOfBuckets; i++) {
    mergeIntoBucket(addHours(bucketStart, i));
  }
};
export default () => {
  const [status, setStatus] = React.useState("no state");
  addToBucket(
    { time: Date(), duration: 30, title: "The thing", location: "Bpston" },
    setStatus
  );
  const displayStatus = status => {
    switch (typeof status) {
      case "string":
        return status;
      case "object":
        try {
          return JSON.stringify(status);
        } catch (e) {
          return e;
        }
      default:
        return typeof status;
    }
  };
  return <span>{displayStatus(status)}</span>;
};
