import FlexBox from "../../../components/kits/FlexBox";
import Modal from "../../../components/kits/Modal";
import { TDetailTherapistModal } from "./index.types";
import { MdPerson } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { MdWc } from "react-icons/md";
import {
  getDegreeEnum,
  getGenderEnum,
} from "../../../utils/getEnumTransformer";
import { MdWorkspacePremium } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineCategory } from "react-icons/md";
import { Avatar, Chip } from "@mui/material";
import { MdDisplaySettings } from "react-icons/md";
import { Typography } from "@mui/material";

const DetailModal: TDetailTherapistModal = ({
  open = false,
  handleClose,
  data,
}) => {
  console.log("the data is", data);
  return (
    <Modal title="جزییات پزشک" open={open} handleClose={handleClose}>
      <Avatar
        sx={{ width: 60, height: 60 }}
        src={"https://pyschologist-api.liara.run" + data?.image}
      />
      <FlexBox gap={1} justifyContent={"flex-start"} flexDirection={"column"}>
        <FlexBox
          gap={0.5}
          flexDirection={"row"}
          height={"fit-content"}
          justifyContent="flex-start"
        >
          <MdPerson size={20} />
          <Typography>
            نام و نام خانوادگی پزشک : {`${data?.firstName} ${data?.lastName}`}
          </Typography>
        </FlexBox>
        <FlexBox
          gap={0.5}
          flexDirection={"row"}
          height={"fit-content"}
          justifyContent="flex-start"
        >
          <FaPhoneAlt size={17} />
          <Typography>
            شماره تماس های پزشک : {`${data?.phone}-${data?.phone2}`}
          </Typography>
        </FlexBox>
        <FlexBox
          gap={0.5}
          flexDirection={"row"}
          height={"fit-content"}
          justifyContent="flex-start"
        >
          <MdWc size={20} />
          جنسیت پزشک : {getGenderEnum(data?.gender)}
        </FlexBox>
        <FlexBox
          gap={0.5}
          flexDirection={"row"}
          height={"fit-content"}
          justifyContent="flex-start"
        >
          <MdWorkspacePremium size={20} />
          <Typography>
            مدرک تحصیلی: {getDegreeEnum(data?.degreeOfEducation)}
          </Typography>
        </FlexBox>
        <FlexBox
          gap={0.5}
          flexDirection={"row"}
          height={"fit-content"}
          justifyContent="flex-start"
        >
          <FaLocationDot size={20} />
          <Typography>آدرس خونه : {data?.address}</Typography>
        </FlexBox>
        <FlexBox
          gap={0.5}
          flexDirection={"row"}
          height={"fit-content"}
          justifyContent="flex-start"
        >
          <MdOutlineCategory size={20} />
          زمینه های تخصص پزشک :{" "}
          {data?.workingFields?.map((e) => (
            <Chip label={`${e.faName}`} />
          ))}
        </FlexBox>
        <FlexBox
          gap={0.5}
          flexDirection={"row"}
          height={"fit-content"}
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <MdDisplaySettings
            size={80}
            display={"inline-block"}
            height={"1rem"}
          />
          بیوگرافی پزشک : {data?.bio}
        </FlexBox>
      </FlexBox>
    </Modal>
  );
};

export default DetailModal;
