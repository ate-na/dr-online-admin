import { Box, Modal, Typography } from "@mui/material";
import { TCreateLocation } from "./index.types";
import FlexBox from "../../../components/kits/FlexBox";
import Select from "../../../components/kits/Select";
import { useForm } from "react-hook-form";

const CreateLocation: TCreateLocation = ({ open = false, handleClose }) => {
  const { control } = useForm();
  return (
    <Modal open={open} onClose={handleClose}>
      <FlexBox>
        <FlexBox
          flexDirection={"column"}
          justifyContent={"flex-start"}
          alignItems="flex-start"
          gap={2}
          bgcolor={"black"}
          p={4}
          width={"40%"}
          height={"50%"}
          borderRadius={2}
        >
          <Typography variant="h5" component={"h2"}>
            ساخت آدرس جدید
          </Typography>
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
        </FlexBox>
      </FlexBox>
    </Modal>
  );
};

export default CreateLocation;
