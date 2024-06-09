import { TButton } from "./index.types";
import { CircularProgress, Button as MuiButton } from "@mui/material";

const Button: TButton = ({
  loading = false,
  loadingText = "",
  children,
  size = "large",
  fullWidth = true,
  color = "primary",
  variant = "contained",
  ...attributeProps
}) => {
  return (
    <MuiButton
      color={color}
      size={size}
      variant={variant}
      fullWidth={fullWidth}
      loadingSpinnerSize
      {...attributeProps}
      disabled={attributeProps.disabled || loading}
    >
      {loading && (
        <CircularProgress sx={{ marginInlineEnd: "8px" }} size={20} />
      )}
      {children}
    </MuiButton>
  );
};
export default Button;
