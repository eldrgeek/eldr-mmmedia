import React from "react";
import { Button } from "@material-ui/core";
import { db } from "../FireStore";
import { addToBucket } from "./DatabaseFunctions";
import testData from "../TestData";
function deleteCollection(db, collectionPath, batchSize) {
  let collectionRef = db.collection(collectionPath);
  // let query = collectionRef.orderBy('__name__').limit(batchSize);
  let query = collectionRef.limit(batchSize);

  return new Promise((resolve, reject) => {
    deleteQueryBatch(db, query, batchSize, resolve, reject);
  });
}

function deleteQueryBatch(db, query, batchSize, resolve, reject) {
  query
    .get()
    .then(snapshot => {
      // When there are no documents left, we are done
      if (snapshot.size == 0) {
        return 0;
      }

      // Delete documents in a batch
      let batch = db.batch();
      snapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
      });

      return batch.commit().then(() => {
        return snapshot.size;
      });
    })
    .then(numDeleted => {
      if (numDeleted === 0) {
        resolve();
        return;
      }

      // Recurse on the next process tick, to avoid
      // exploding the stack.
      process.nextTick(() => {
        deleteQueryBatch(db, query, batchSize, resolve, reject);
      });
    })
    .catch(reject);
}

const deleteAll = () => {
  deleteCollection(db, "clips", 20);
  deleteCollection(db, "buckets", 20);
};
const addAll = () => {
  testData.forEach(clip => {
    addToBucket(clip, d => console.log(d));
  });
};

export default () => {
  return (
    <React.Fragment>
      <Button onClick={addAll}>Add</Button>
      <Button onClick={deleteAll}>Delete</Button>
    </React.Fragment>
  );
};
