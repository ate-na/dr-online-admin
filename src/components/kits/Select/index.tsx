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
}) => {
  console.log(disabled);
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
              >
                {items.map((element) => (
                  <MenuItem key={element.label} value={element.value}>
                    {element.label}
                  </MenuItem>
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
