import { Button } from "@mui/material";
import { TCreateLocation } from "./index.types";
import Select from "../../../components/kits/Select";
import { useForm } from "react-hook-form";
import TextField from "../../../components/kits/TextField";
import Modal from "../../../components/kits/Modal";

const CreateLocation: TCreateLocation = ({ open = false, handleClose }) => {
  const { control } = useForm();
  return (
    <Modal
      title="ساخت آدرس جدید"
      flexDirection={"column"}
      justifyContent={"flex-start"}
      alignItems="flex-start"
      bgcolor={"#282E34"}
      p={4}
      width={"40%"}
      height={"50%"}
      open={open}
      handleClose={handleClose}
    >
      <Select
        control={control}
        name="city"
        items={[
          { label: "تهران", value: 0 },
          { label: "مشهد", value: 1 },
          { label: "شیراز", value: 2 },
        ]}
        selectLabel="شهر"
      />
      <TextField
        control={control}
        name="location-form"
        label="آدرس محلی"
        helperText=""
        rows={5}
        multiline
      />
      <Button type="submit" fullWidth>
        ذخیره سازی تغییرات
      </Button>
    </Modal>
  );
};

export default CreateLocation;
