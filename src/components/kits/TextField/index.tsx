import { TextField as MuiTextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { TTextFieldFC } from "./index.type";

const TextField: TTextFieldFC = ({
  helperText,
  icon,
  label,
  name,
  control,
  rows = 1,
  multiline = false,
  type = "text",
  disabled = false,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const error = fieldState?.error?.message;
        return (
          <MuiTextField
            disabled={disabled}
            fullWidth
            error={!!error}
            type={type}
            {...field}
            label={label}
            helperText={error || helperText}
            InputProps={{
              startAdornment: icon,
            }}
            rows={rows}
            multiline={multiline}
            sx={{ color: "red" }}
          />
        );
      }}
    />
  );
};

export default TextField;
