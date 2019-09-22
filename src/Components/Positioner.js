import React from "react";
import { Button } from "@material-ui/core";
import { usePosition } from "use-position";

const Positioner = p => {
  const { latitude, longitude, timestamp, accuracy, error } = usePosition(); //true, { enableHighAccuracy: true });

  const props = {
    onClick: () => console.log("click"),
    text: "testing",
    ...p
  };
  return (
    <React.Fragment>
      <code>
        latitude: {latitude}
        <br />
        longitude: {longitude}
        <br />
        timestamp: {timestamp}
        <br />
        accuracy: {accuracy && `${accuracy}m`}
        <br />
        error: {error}
      </code>
      {/* <Button
      size="small"
      variant="contained"
      color="primary"
      onClick={props.onClick}
    >
      {props.text}
      </Button> */}
    </React.Fragment>
  );
};
export default Positioner;
