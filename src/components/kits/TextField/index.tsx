import { TextField as MuiTextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { TTextFieldFC } from "./index.type";



const TextField: TTextFieldFC = ({
  helperText,
  icon,
  label,
  name,
  control,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const error = fieldState?.error?.message;
        return (
          <MuiTextField
            fullWidth
            error={!!error}
            {...field}
            label={label}
            helperText={error || helperText}
            InputProps={{
              startAdornment: icon,
            }}
          />
        );
      }}
    />
  );
};


export default TextField