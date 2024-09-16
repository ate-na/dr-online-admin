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
  useUpdateTherapistMutation,
} from "../../../api/therapist";
import { Avatar, IconButton } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { createAvatarStyle } from "./index.styles";
import toast from "react-hot-toast";
import useErrorHandling from "../../../hooks/useErrorHandling";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { IError } from "../../../types/base.modal";

const CreateOrEdit: TCreateOrEditFC = ({ open = false, handleClose, data }) => {
  const ref = useRef<HTMLInputElement>(null);
  const [imageSrc, setImageSrc] = useState<string>("");

  const { control, handleSubmit, reset } = useForm<TCreateOrEditFormValidation>(
    {
      resolver: zodResolver(therapistValidation),
      values: {
        ...(data as any),
        workingFields: data
          ? (data?.workingFields as any).map((e: any) => ({
              label: e.faName,
              value: e.value,
            }))
          : undefined,
      },
    }
  );

  const { data: categories, isLoading: isCategoryLoading } =
    useGetCategoriesQuery("limit=1000");

  const [
    submit,
    {
      isSuccess: isSubmitSuccess,
      isError: isSubmitError,
      isLoading: isSubmitLoading,
      error,
    },
  ] = useCreateTherapistMutation();
  const [
    uploadFile,
    { isLoading: isUploadIconLoading, error: isUploadImageError },
  ] = useUploadIconsMutation();

  const [handleUpdate, updateData] = useUpdateTherapistMutation(
    data?.id as any
  );

  const { classes } = createAvatarStyle();

  const CATEGORY_SELECT_OPTIONS = categories?.content.map((e) => ({
    value: e.id,
    label: e.faName,
  }));

  useEffect(() => {
    console.log("envvv", import.meta.env.BASE_URL);
    setImageSrc(() =>
      data?.image ? `https://pyschologist-api.liara.run${data?.image}` : ""
    );
  }, [data]);

  const onSubmitHandler = handleSubmit(
    async (value) => {
      if (!data) {
        if (
          value &&
          imageSrc &&
          ref.current?.files &&
          ref.current?.files?.length > 0
        ) {
          const res = await uploadFile({ icon: ref.current.files[0] });
          if (!res?.data) toast.error("فرایند با شکست مواجه شد");

          console.log("valuesss", value);

          if (res.data?.fileName)
            submit({
              ...value,
              image: `/upload/${res.data?.fileName}`,
              password: value.phone,
            });
          handleClose();
          reset();
          setImageSrc(() => "");
        } else {
          toast.error("پروفایل پزشک ضروری است");
        }
      } else if (data) {
        let res: any;
        if (ref.current?.files && ref.current.files.length > 0) {
          res = await uploadFile({ icon: ref.current.files[0] });
        }
        console.log("value workfile", categories, value.workingFields);

        const workfiled = categories?.content.find((e) =>
          value.workingFields.find((el) => e.id === el)
        )?.id;

        const workingFields = workfiled ? [workfiled] : [];

        const body: any = {
          ...value,
          id: data.id,
          workingFields: workingFields,
        };
        if (res?.data?.fileName) {
          body.image = `/upload/${res?.data?.fileName}`;
        }
        handleUpdate(body);
        handleClose();
        reset();
        setImageSrc(() => "");
      }
    },
    (error) => {
      console.log("the error is", error);
    }
  );
  useErrorHandling({
    isError: isSubmitError || updateData.isError,
    isSuccess: isSubmitSuccess || updateData.isError,
    errorMessage:
      ((error as FetchBaseQueryError)?.data as IError)?.message ||
      ((isUploadImageError as FetchBaseQueryError)?.data as IError)?.message ||
      ((updateData.error as FetchBaseQueryError)?.data as IError)?.message,
  });

  const handleOnChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target?.files; // Safely get the files
    if (files && files[0]) {
      setImageSrc(() => URL.createObjectURL(files[0]));
    }
  };
  return (
    <Modal title="ساخت پزشک جدید" open={open} handleClose={handleClose}>
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
            items={CATEGORY_SELECT_OPTIONS || []}
            disabled={isCategoryLoading}
            multiple={true}
            defaultValue={[]}
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
        <Button
          loading={
            isSubmitLoading || isUploadIconLoading || updateData.isLoading
          }
          type="submit"
        >
          ساخت پزشک جدید
        </Button>
      </form>
    </Modal>
  );
};

export default CreateOrEdit;
