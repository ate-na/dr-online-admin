import { DialogActions } from "@mui/material";
import { TConfirm } from "./index.types";
import Button from "../Button";
import Modal from "../Modal";

const ConfirmModal: TConfirm = ({
  open,
  handleClose,
  cancelTitle,
  agreeTitle,
  title,
  agreeHandler,
  cancelHandler,
  loading,
}) => {
  console.log("modal", open);
  return (
    <Modal
      open={open}
      handleClose={handleClose}
      title={title}
      height="25%"
      p={4}
      gap={5}
    >
      <DialogActions sx={{ width: "100%" }}>
        <Button fullWidth onClick={cancelHandler} size="small">
          {cancelTitle}
        </Button>
        <Button fullWidth loading={loading} onClick={agreeHandler} size="small">
          {agreeTitle}
        </Button>
      </DialogActions>
    </Modal>
  );
};

export default ConfirmModal;
