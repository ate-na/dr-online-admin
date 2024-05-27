import {  DialogActions } from "@mui/material";
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
}) => {
    console.log("modal",open)
  return (
    <Modal
    open={open}
    handleClose={handleClose}
    title={title}
    height="20%"
    p={4}
  >
    <DialogActions sx={{width:'100%'}}>
      <Button fullWidth onClick={cancelHandler}>{cancelTitle}</Button>
      <Button fullWidth onClick={agreeHandler}>{agreeTitle}</Button>
    </DialogActions>
  </Modal>
  );
};

export default ConfirmModal;
