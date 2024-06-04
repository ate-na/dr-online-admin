import { useForm } from "react-hook-form";
import Button from "../../../components/kits/Button";
import Modal from "../../../components/kits/Modal";
import TextField from "../../../components/kits/TextField";
import { TCreateCategory } from "./index.types";
import { createCategoryValidation } from "./index.constant";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useCreateCategoryMutation,
  useUploadIconsMutation,
} from "../../../api/categories";
import { Avatar, Box, IconButton } from "@mui/material";
import { createAvatarStyle } from "./index.style";
import { useRef, useState } from "react";
import { ICategory } from "../../../types/category.modal";
import useErrorHandling from "../../../hooks/useErrorHandling";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { IError } from "../../../types/base.modal";

const CreateCategory: TCreateCategory = ({
  open = false,
  handleClose,
  data,
}) => {
  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(createCategoryValidation),
    values: { ...data },
  });
  const ref = useRef<HTMLInputElement>(null);
  const [imageSrc, setImageSrc] = useState<string>("");
  const [submitHandler, submitData] = useCreateCategoryMutation();
  const [uploadIconHandler, uploadIconData] = useUploadIconsMutation();

  const onSubmitHandler = handleSubmit(
    async (value) => {
      if (ref?.current?.files && ref?.current.files.length > 0) {
        const formData = new FormData();
        formData.append("icon", ref.current.files[0]);
        const { data } = await uploadIconHandler({
          icon: ref.current.files[0],
        });
        console.log("data ", data);
        if (data?.fileName) {
          submitHandler({ ...value, icon: data.fileName } as any);
          reset();
          handleClose();
          setImageSrc(() => "");
        }
      } else {
        submitHandler({ ...value } as ICategory);
        reset();
        handleClose();
        setImageSrc(() => "");
      }
    },
    (error) => {
      console.log("the error is", error);
    }
  );

  const closeModal = () => {
    reset();
    setImageSrc(() => "");
    handleClose();
  };

  const handleOnChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e?.target?.files && e?.target?.files.length > 0) {
      setImageSrc(() => URL.createObjectURL(e?.target?.files[0]));
    }
    console.log(imageSrc);
  };

  useErrorHandling({
    isError: submitData.isError,
    isSuccess: submitData.isSuccess,
    errorMessage: ((submitData.error as FetchBaseQueryError)?.data as IError)
      ?.message,
  });
  console.log(
    ((submitData.error as FetchBaseQueryError)?.data as IError)?.message
  );
  const { classes } = createAvatarStyle();

  return (
    <Modal title="افزودن زمینه جدید" open={open} handleClose={closeModal}>
      <form
        style={{
          width: "100%",
          display: "flex",
          gap: "2rem",
          flexDirection: "column",
        }}
        onSubmit={onSubmitHandler}
      >
        <Box textAlign={"center"}>
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
        </Box>
        <TextField
          control={control}
          name="faName"
          label="نام فارسی زمینه تخصصی"
          helperText=""
        />
        <TextField
          control={control}
          name="enName"
          label="نام انگلیسی زمینه تخصصی"
          helperText=""
        />
        <Button
          type="submit"
          loading={uploadIconData.isLoading || submitData.isLoading}
        >
          اعمال تغییرات
        </Button>
      </form>
    </Modal>
  );
};
export default CreateCategory;
