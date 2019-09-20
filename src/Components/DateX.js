import "date-fns";
import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";

export default function MaterialUIPickers(props) {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  function handleDateChange(date) {
    setSelectedDate(date);
  }
  let key = props.key || "1";

  return (
    <MuiPickersUtilsProvider key={key} utils={DateFnsUtils}>
      <KeyboardDatePicker
        margin="normal"
        id="date-picker-dialog"
        label="Choose date"
        format="MM/dd/yyyy"
        style={{ width: "150px" }}
        value={selectedDate}
        onChange={handleDateChange}
        KeyboardButtonProps={{
          "aria-label": "change date"
        }}
      />
      <KeyboardTimePicker
        margin="normal"
        id="time-picker"
        label="Choose time"
        style={{ width: "150px" }}
        value={selectedDate}
        onChange={handleDateChange}
        KeyboardButtonProps={{
          "aria-label": "change time"
        }}
      />
    </MuiPickersUtilsProvider>
  );
}
