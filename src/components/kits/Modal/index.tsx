import FlexBox from "../FlexBox";
import { TModal } from "./index.types";
import {
  Box,
  Icon,
  IconButton,
  Modal as MuiModal,
  Typography,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

const Modal: TModal = ({
  open,
  handleClose,
  title,
  bgcolor = "#282E34",
  children,
}) => {
  return (
    <MuiModal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: bgcolor,
          width: "500px",
          padding: "30px",
          borderRadius: "4px",
          maxHeight: "800px",
          overflowY: "auto",
        }}
      >
        <FlexBox justifyContent="space-between" padding={1}>
          <Typography variant="body1" fontWeight="bold" component={"h2"}>
            {title}
          </Typography>
          <IconButton onClick={handleClose}>
            <ClearIcon />
          </IconButton>
        </FlexBox>
        {children}
      </Box>
    </MuiModal>
  );
};

export default Modal;
