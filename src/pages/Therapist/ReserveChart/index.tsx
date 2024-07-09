import { Box, Button, Typography } from "@mui/material";
import { useGetTherapistSchedulesPerDayQuery } from "../../../api/therapistSchedule";
import FlexBox from "../../../components/kits/FlexBox";
import Modal from "../../../components/kits/Modal";
import { TReserveChart } from "./index.types";
import { getDaysOfWeek } from "../../../utils/getEnumTransformer";

const ReserveChart: TReserveChart = ({
  open = false,
  handleClose,
  therapistId,
}) => {
  const { data } = useGetTherapistSchedulesPerDayQuery(therapistId);
  console.log("the open is", open, data, therapistId);
  return (
    <Modal title="چارت رزرو های این پزشک" open={open} handleClose={handleClose}>
      <FlexBox
        padding={2}
        flexDirection={"column"}
        alignItems="flex-start"
        gap={4}
        borderRadius={"4px"}
        sx={{ background: "#1d232a", width: "14rem", height: "9rem" }}
      >
        <Box>
          <Typography>{getDaysOfWeek[1]}</Typography>
          <Typography>تعداد رزوهای روز: 1</Typography>
        </Box>
        <Button fullWidth>نمایش کلی چارت</Button>
      </FlexBox>
    </Modal>
  );
};

export default ReserveChart;
