import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
} from "@mui/material";
import { TSelect } from "./index.types";
import { Controller } from "react-hook-form";

const Select: TSelect = ({
  items,
  selectLabel,
  helperText = "",
  name,
  control,
  disabled = false,
  defaultValue,
  multiple = false,
}) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => {
          const error = fieldState?.error?.message;
          return (
            <FormControl fullWidth>
              <InputLabel>{selectLabel}</InputLabel>
              <MuiSelect
                defaultValue={defaultValue}
                disabled={disabled}
                fullWidth
                label={selectLabel}
                error={!!error}
                {...field}
                multiple={multiple}
              >
                {items.map((element) => (
                  // <MenuItem href="/" key={element.label} value={element.value}>
                  //   {element.label}
                  // </MenuItem>
                  <MenuItem value={element.value}>{element.label}</MenuItem>
                ))}
              </MuiSelect>
              <FormHelperText>{helperText || error}</FormHelperText>
            </FormControl>
          );
        }}
      />
    </>
  );
};
export default Select;
