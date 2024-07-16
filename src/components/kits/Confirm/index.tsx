import { Box, DialogActions, Typography } from "@mui/material";
import { TConfirm } from "./index.types";
import Button from "../Button";
import Modal from "../Modal";
import FlexBox from "../FlexBox";

const ConfirmModal: TConfirm = ({
  open,
  handleClose,
  cancelTitle,
  agreeTitle,
  title,
  agreeHandler,
  cancelHandler,
  loading,
  description,
}) => {
  return (
    <Modal open={open} handleClose={handleClose} title={title} p={4} gap={5}>
      <Box>
        {description && <Typography>{description}</Typography>}
        <FlexBox pt={2} gap={2}>
          <Button fullWidth onClick={cancelHandler} color="error">
            {cancelTitle}
          </Button>
          <Button fullWidth loading={loading} onClick={agreeHandler}>
            {agreeTitle}
          </Button>
        </FlexBox>
      </Box>
    </Modal>
  );
};

export default ConfirmModal;
