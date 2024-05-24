import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
} from "@mui/material";
import { TSelect } from "./index.types";
import { Controller } from "react-hook-form";

const Select: TSelect = ({ items, selectLabel, helperText = "",name,control }) => {
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
                fullWidth
                label={selectLabel}
                error={!!error}
                {...field}
              >
                {items.map((element) => (
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
