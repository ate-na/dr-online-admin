import { Box, Typography } from "@mui/material";
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
    <Modal open={open} handleClose={handleClose} title={title}>
      <Box>
        {description && <Typography>{description}</Typography>}
        <FlexBox pt={2} gap={2}>
          {cancelTitle && (
            <Button fullWidth onClick={cancelHandler} color="error">
              {cancelTitle}
            </Button>
          )}
          {agreeTitle && (
            <Button fullWidth loading={loading} onClick={agreeHandler}>
              {agreeTitle}
            </Button>
          )}
        </FlexBox>
      </Box>
    </Modal>
  );
};

export default ConfirmModal;
