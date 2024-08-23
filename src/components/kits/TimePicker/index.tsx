import { Controller } from "react-hook-form";
import { TTimePicker } from "./index.types";
import { TimePicker as MuiTimePicker } from "@mui/x-date-pickers/TimePicker";

const TimePicker: TTimePicker = ({
  control,
  name,
  disabled = false,
  label,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        return <MuiTimePicker disabled={disabled} {...field} label={label} />;
      }}
    />
  );
};
export default TimePicker;
