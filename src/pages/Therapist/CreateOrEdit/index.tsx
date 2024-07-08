import { useForm } from "react-hook-form";
import FlexBox from "../../../components/kits/FlexBox";
import Modal from "../../../components/kits/Modal";
import { TCreateOrEditFC, TCreateOrEditFormValidation } from "./index.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { therapistValidation } from "./index.constant";
import TextField from "../../../components/kits/TextField";
import Select from "../../../components/kits/Select";
import {
  EDegtreeOfEducationItems,
  GenderItems,
} from "../../../types/therapist.modal";
import {
  useGetCategoriesQuery,
  useUploadIconsMutation,
} from "../../../api/categories";
import Button from "../../../components/kits/Button";
import {
  useCreateTherapistMutation,
  useDeleteTherapitMutation,
} from "../../../api/therapist";
import { Avatar, IconButton } from "@mui/material";
import { useRef, useState } from "react";
import { createAvatarStyle } from "./index.styles";
import toast from "react-hot-toast";
import useErrorHandling from "../../../hooks/useErrorHandling";

const CreateOrEdit: TCreateOrEditFC = ({ open = false, handleClose }) => {
  const ref = useRef<HTMLInputElement>(null);
  const [imageSrc, setImageSrc] = useState<string>("");

  const { control, handleSubmit } = useForm<TCreateOrEditFormValidation>({
    resolver: zodResolver(therapistValidation),
  });

  const { data: categories, isLoading: isCategoryLoading } =
    useGetCategoriesQuery("");

  const [submit, { isSuccess: isSubmitSuccess, isError: isSubmitError }] =
    useCreateTherapistMutation();
  const [uploadFile, {}] = useUploadIconsMutation();

  const { classes } = createAvatarStyle();


  const onSubmitHandler = handleSubmit(
    async (value) => {
      console.log("the value is", value);
      if (
        value &&
        imageSrc &&
        ref.current?.files &&
        ref.current?.files?.length > 0
      ) {
        const res = await uploadFile({ icon: ref.current.files[0] });
        if (!res?.data) toast.error("فرایند با شکست مواجه شد");
        const workfiled = categories?.content.find(
          (e) => e.faName.trim() === value.workingFields.trim()
        )?.id;
        const workingFields = workfiled ? [workfiled] : [];

        if (res.data?.fileName)
          submit({
            ...value,
            image: res.data?.fileName,
            workingFields: workingFields,
          });
        handleClose();
      } else {
        toast.error("پروفایل پزشک ضروری است");
      }
    },
    (error) => {
      console.log("the error is", error);
    }
  );
  useErrorHandling({ isError: isSubmitError, isSuccess: isSubmitSuccess });

  const handleOnChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e?.target?.files && e?.target?.files.length > 0)
      setImageSrc(() => URL.createObjectURL(e?.target?.files[0]));

    console.log(imageSrc);
  };
  return (
    <Modal
      title="ساخت پزشک جدید"
      open={open}
      handleClose={handleClose}
      height="85%"
    >
      <form
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
        onSubmit={onSubmitHandler}
      >
        <FlexBox textAlign={"center"}>
          <input
            ref={ref}
            accept="image/*"
            style={{ display: "none" }}
            id="icon-button-file"
            type="file"
            onChange={handleOnChangeImage}
          />
          <label htmlFor="icon-button-file">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <Avatar src={imageSrc} className={classes.avatar} />
            </IconButton>
          </label>
        </FlexBox>
        <FlexBox height={"10%"} gap={2}>
          <TextField
            control={control}
            helperText=""
            label="نام پزشک"
            name="firstName"
          />
          <TextField
            control={control}
            helperText=""
            label="نام خانوادگی پزشک"
            name="lastName"
          />
        </FlexBox>
        <FlexBox gap={2} height={"10%"}>
          <TextField
            control={control}
            helperText=""
            label="شماره تماس ۱"
            name="phone"
          />
          <TextField
            control={control}
            helperText=""
            label="شماره تماس ۲"
            name="phone2"
          />
        </FlexBox>
        <FlexBox gap={2} height={"10%"}>
          <Select
            control={control}
            name="degreeOfEducation"
            selectLabel="مدرک تحصیلی پزشک"
            items={EDegtreeOfEducationItems}
          />
          <Select
            control={control}
            name="workingFields"
            selectLabel="زمینه کاری پزشک"
            items={
              (categories?.content &&
                categories?.content.map((e) => ({
                  label: e.faName,
                  value: e.faName,
                }))) ||
              []
            }
            disabled={isCategoryLoading}
          />
        </FlexBox>
        <Select
          control={control}
          name="gender"
          items={GenderItems}
          selectLabel="جنسیت پزشک"
        />
        <TextField
          control={control}
          name="address"
          helperText=""
          label="آدرس پزشک"
          multiline={true}
          rows={3}
        />
        <TextField
          control={control}
          name="bio"
          helperText=""
          label="بیوگرافی"
          multiline={true}
          rows={3}
        />
        <Button type="submit">ساخت پزشک جدید</Button>
      </form>
    </Modal>
  );
};

export default CreateOrEdit;
