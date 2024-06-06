import { TCreateLocation } from "./index.types";
import Select from "../../../components/kits/Select";
import { useForm } from "react-hook-form";
import TextField from "../../../components/kits/TextField";
import Modal from "../../../components/kits/Modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { locationFormValidation } from "./index.constants";
import useCities from "../../../hooks/useCities";
import {
  useCreateLocationMutation,
  useUpdateLocationMutation,
} from "../../../api/location";
import Button from "../../../components/kits/Button";
import useErrorHandling from "../../../hooks/useErrorHandling";
import { useEffect } from "react";
import { ILocation } from "../../../types/location.model";

const CreateLocation: TCreateLocation = ({
  open = false,
  handleClose,
  data,
}) => {
  const { cities, cityLoading } = useCities();
  console.log(" the data", { ...data });
  const { control, handleSubmit, reset, setValue } = useForm<Partial<ILocation>>({
    resolver: zodResolver(locationFormValidation),
  });

  const [submit, createSubmitData] = useCreateLocationMutation();
  const [handleSubmitUpdateHandler, updateData] = useUpdateLocationMutation();

  useEffect(() => {
    if (data) {
      setValue("address", data.address);
      setValue("city", data.city);
    }
    console.log("dataaaa is", data);
  }, [data]);

  useErrorHandling({
    isError: createSubmitData.isError || updateData.isError,
    isSuccess: createSubmitData.isSuccess || updateData.isSuccess,
  });

  const onSubmit = handleSubmit(
    async (value: any) => {
      console.log("value is", value);
      if (data && data.id) {
        await handleSubmitUpdateHandler({ ...value, id: data?.id });
      } else {
        await submit(value);
      }
     reset();
      handleClose();
    },
    (err) => {
      console.log(err);
    }
  );

  const onCloseHanlder=()=>{
    reset({address:undefined,id:undefined,city:undefined})
    handleClose()
  }

  return (
    <Modal
      title="ساخت آدرس جدید"
      flexDirection={"column"}
      justifyContent={"flex-start"}
      alignItems="flex-start"
      bgcolor={"#282E34"}
      p={2}
      width={"40%"}
      height={"50%"}
      open={open}
      handleClose={onCloseHanlder}
    >
      <form
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
        onSubmit={onSubmit}
      >
        <Select
          disabled={cityLoading}
          control={control}
          name="city"
          items={cities.map((e) => ({ value: e.id, label: e.name }))}
          selectLabel="شهر"
        />
        <TextField
          control={control}
          name="address"
          label="آدرس محلی"
          helperText=""
          rows={5}
          multiline
        />
        <Button type="submit" fullWidth loading={!!createSubmitData?.isLoading}>
          ذخیره سازی تغییرات
        </Button>
      </form>
    </Modal>
  );
};

export default CreateLocation;
