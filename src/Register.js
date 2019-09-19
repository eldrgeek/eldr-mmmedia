import React from "react";
import FormX from "./Components/FormX";
import { addToCollection } from "./FireStore";

export default function Register() {
  const [timing, setTiming] = React.useState(false);

  const submitRegtration = () => {
    setTiming(true);
  };
  const getDuration = time => {
    setTiming(false);
    updateField("duration", time);
  };
  const record = {};

  const fields = [
    { name: "title", placeholder: "Title" },
    { name: "url", placeholder: "URL" },
    { name: "time", placeholder: "Time" },
    { name: "location", placeholder: "Location" }
  ];

  const onClick = () => {
    addToCollection("media", record);
    console.log("cicked register", record);
  };

  return (
    <React.Fragment>
      <FormX
        formTitle="Register"
        fields={fields}
        onClick={onClick}
        record={record}
        button="add media"
      />
    </React.Fragment>
  );
}
