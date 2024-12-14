import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";

export default function TimePickerComponent() {
  return (
    <DatePicker
      disableDayPicker
      value={new Date().getTime()}
      format="hh:mm:ss A"
      plugins={[<TimePicker />]}
    />
  );
}
