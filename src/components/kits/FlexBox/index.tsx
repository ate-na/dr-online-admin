import { TCustomFlexBoxFC } from "./index.type";
import { Box } from "@mui/material";

const FlexBox: TCustomFlexBoxFC = ({
  children,
  alignItems = "center",
  justifyContent = "center",
  flexDirection = "row",
  ...props
}) => {
  return (
    <Box
      height="100%"
      width="100%"
      display="flex"
      justifyContent={justifyContent}
      alignItems={alignItems}
      flexDirection={flexDirection}
      {...props}
    >
      {children}
    </Box>
  );
};

export default FlexBox;
