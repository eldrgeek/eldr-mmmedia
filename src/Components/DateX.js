import "date-fns";
import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker
} from "@material-ui/pickers";

export default function MaterialUIPickers(props) {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const updateRecord = date => {
    if (props.record) {
      props.record[props.name] = date;
    }
  };
  updateRecord(selectedDate);
  function handleDateChange(date) {
    setSelectedDate(date);
    updateRecord(date);
  }
  let key = props.key || "1";
  const handleError = error => {
    console.log("DateX error", error);
  };
  return (
    <div key={key}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDateTimePicker
          value={selectedDate}
          onChange={handleDateChange}
          margin="normal"
          id="date-picker-dialog"
          format="MM/dd/yyyy HH:mm"
          style={{ width: "200px" }}
          label="Choose date and time"
          onError={handleError}
          onAccept={handleDateChange}
        />
      </MuiPickersUtilsProvider>
    </div>
  );
}
