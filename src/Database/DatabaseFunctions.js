/*
This contains a database functoions to add a clip
to the database and to the relevant buckets
*/
import React from "react";
import testData from "../TestData";
import { Button } from "@material-ui/core";
import VideoTimer from "../VideoTimer";
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
import { firebase, db, addToCollection } from "./FireStore";
let cl = console.log.bind(console);

/////////////////////////////////////////
//given a DateTime, get the time of the hour
//in which that time appears
const getBucketStart = time => {
  cl({ time });
  return new Date(getYear(time), getMonth(time), getDate(time), getHours(time));
};

//Given a time compose a string to use as the key for the bucket
const composeBucketString = time => {
  return `${getYear(time)} ${getMonth(time)} ${getDate(time)} ${getHours(
    time
  )}`;
};

//given a clip, add it f
const addToBucket = async (clip, diag) => {
  //adds references to document in the propoer time buckets
  const time = clip.time;
  const duration = clip.duration;

  const bucketStart = getBucketStart(time);

  const endTime = addSeconds(time, duration);
  const bucketEnd = addHours(bucketStart, 1);
  const clipRef = await addToCollection("clips", clip);

  const mergeIntoBucket = async time => {
    // console.log("merge");
    const ref = await db.collection("buckets").doc(composeBucketString(time));
    // console.log(ref);
    await ref
      .get()
      .then(function(doc) {
        if (!doc.exists) {
          // console.log("DOc set");
          ref.set({ clips: [clipRef] });
        } else {
          ref
            .update({
              clips: firebase.firestore.FieldValue.arrayUnion(clipRef)
            })
            .then(function() {
              // console.log("written");
              diag("written");
              // console.log("Bucket written with ID: ");
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
let index = 0;
export default () => {
  const [status, setStatus] = React.useState("no state");
  const [url, setURL] = React.useState(undefined);
  const returnResult = (result, newURL) => {
    // console.log("returned ", result);
    index++;
    // console.log(index, testData[index].url);
    setURL(testData[index].url);
  };

  const add = () => {
    index = 0;
    console.log(testData[0].url);
    setURL(testData[0].url);
  };
  // console.log("addint", JSON.stringify(testData));
  // addToBucket(
  //   {
  //     time: new Date(2018, 1, 1, 1, 0, 10),
  //     duration: 60 * 60 - 10,
  //     title: "The thing",
  //     location: "Bpston"
  //   },
  //   setStatus
  // );

  const get = async () => {
    getClipsForTime(new Date(2018, 1, 1, 1, 0, 2), setStatus);
  }; // if (!tried) setTimeout(get, 1100);

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
      <Button onClick={get}>Get</Button>
      <Button onClick={add}>Add</Button>
      {url === undefined ? (
        ""
      ) : (
        <VideoTimer key={url} url={url} returnResult={returnResult} />
      )}
    </React.Fragment>
  );
};

const getClipsForBucket = async (time, diag) => {
  if (!diag) diag = console.log.bind(console);
  cl({ time });
  const bucketString = composeBucketString(getBucketStart(time));
  var docRef = db.collection("buckets").doc(bucketString);
  return new Promise((resolve, reject) => {
    docRef.get().then(function(doc) {
      if (doc.exists) {
        // console.log("Document data:", doc.data());
        resolve(doc.data().clips);
      } else {
        // doc.data() will be undefined in this case
        // console.log("No such document!");
        resolve([]);
      }
    });
  }).catch(function(error) {
    console.log("Error getting document:" + error);
  });
};
const getClipsForTime = async (refTime, diag) => {
  console.log(refTime);
  const clips = await getClipsForBucket(refTime, diag);
  // console.log(clips);
  const qualifingClips = clips.map(clip => {
    return new Promise((resolve, reject) => {
      console.log({ clip });
      clip.get().then(doc => {
        cl({ doc });
        if (doc.exists) {
          // console.log("data", doc.data());
          const { time, duration } = doc.data();
          const timeDate = time.toDate();
          console.log({ refTime, timeDate, duration });
          console.log("addseconds", addSeconds(time.toDate(), duration));
          if (
            isWithinInterval(refTime, {
              start: timeDate,
              end: addSeconds(timeDate, duration)
            })
          )
            resolve(doc);
        } else {
          console.log("not");
          resolve(undefined);
        }
      });
    });
  });
  let resolvedClips = await Promise.all(qualifingClips);
  console.log(
    "resolved list",
    resolvedClips.map(clip => JSON.stringify(clip.data()))
  );
  return resolvedClips;
};

export { addToBucket, getClipsForBucket, getClipsForTime };
