import FlexBox from "../FlexBox";
import { TModal } from "./index.types";
import { IconButton, Modal as MuiModal, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

const Modal: TModal = ({
  open,
  handleClose,
  title,
  height = "50%",
  width = "40%",
  justifyContent = "flex-start",
  flexDirection = "column",
  alignItems = "flex-start",
  bgcolor = "#282E34",
  children,
}) => {
  return (
    <MuiModal open={open} onClose={handleClose}>
      <FlexBox>
        <FlexBox
          flexDirection={flexDirection}
          justifyContent={justifyContent}
          alignItems={alignItems}
          gap={2}
          bgcolor={bgcolor}
          p={4}
          width={width}
          height={height}
          borderRadius={2}
        >
          <FlexBox justifyContent="space-between">
            <Typography variant="h5" component={"h2"}>
              {title}
            </Typography>
            <IconButton onClick={handleClose}>
              <ClearIcon />
            </IconButton>
          </FlexBox>
          {children}
        </FlexBox>
      </FlexBox>
    </MuiModal>
  );
};

export default Modal;
