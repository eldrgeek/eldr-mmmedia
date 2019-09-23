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
  differenceInMinutes,
  isWithinInterval
} from "date-fns";
import { firebase, db, addToCollection } from "../FireStore";
const getBucketStart = time => {
  return new Date(getYear(time), getMonth(time), getDate(time), getHours(time));
};
const composeBucketString = time => {
  return `${getYear(time)} ${getMonth(time)} ${getDate(time)} ${getHours(
    time
  )}`;
};
const addToBucket = async (clip, diag) => {
  //adds references to document in the propoer time buckets
  const time = clip.time;
  const duration = clip.duration;

  const bucketStart = getBucketStart(time);

  const endTime = addSeconds(time, duration);
  const bucketEnd = addHours(bucketStart, 1);
  const clipRef = await addToCollection("clips", clip);

  const mergeIntoBucket = async time => {
    console.log("merge");
    const ref = await db.collection("buckets").doc(composeBucketString(time));
    console.log(ref);
    await ref
      .get()
      .then(function(doc) {
        if (!doc.exists) {
          console.log("DOc set");
          ref.set({ clips: [clipRef] });
        } else {
          ref
            .update({
              clips: firebase.firestore.FieldValue.arrayUnion(clipRef)
            })
            .then(function() {
              console.log("written");
              diag("written");
              console.log("Bucket written with ID: ");
              return true;
            })
            .catch(function(error) {
              console.log("error" + error);
              diag("Error adding to bucket: " + error);
              return false;
            });
        }
      })
      .catch(e => {
        console.log("error2 " + e);
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

  const get = () => getClipsForTime(new Date(2018, 1, 1, 1), setStatus);
  if (!tried) setTimeout(get, 1100);

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

const getClipsForBucket = async (time, diag) => {
  const bucketString = composeBucketString(getBucketStart(time));
  var docRef = db.collection("buckets").doc(bucketString);
  return new Promise((resolve, reject) => {
    docRef.get().then(function(doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        resolve(doc.data().clips);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        resolve([]);
      }
    });
  }).catch(function(error) {
    console.log("Error getting document:" + error);
  });
};
const getClipsForTime = async (refTime, diag) => {
  await getClipsForBucket(refTime, diag).then(async clips => {
    const qualifyingClips = await clips.filter(async clip => {
      const clipData = clip.get().then(doc => {
        console.log("here");
        if (doc.exists) {
          console.log("data", doc.data());
          const { time, duration } = doc.data();
          return isWithinInterval(refTime, {
            start: time,
            end: addSeconds(time, duration)
          });
        } else {
          console.log("not");
          return false;
        }
      });
    });
    console.log("quals", qualifyingClips);
    return qualifyingClips;
  });
};
