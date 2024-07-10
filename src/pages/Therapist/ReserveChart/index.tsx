import { Box, Button, Typography } from "@mui/material";
import { useGetTherapistSchedulesPerDayQuery } from "../../../api/therapistSchedule";
import FlexBox from "../../../components/kits/FlexBox";
import Modal from "../../../components/kits/Modal";
import { TReserveChart } from "./index.types";
import {
  getDaysOfWeek,
  getDaysOfWeekTransalate,
} from "../../../utils/getEnumTransformer";
import { useNavigate } from "react-router-dom";

const ReserveChart: TReserveChart = ({
  open = false,
  handleClose,
  therapistId,
}) => {
  const { data } = useGetTherapistSchedulesPerDayQuery(therapistId);
  const navigate = useNavigate();
  return (
    <Modal
      width="fit-content"
      flexDirection={"row"}
      title="چارت رزرو های این پزشک"
      open={open}
      handleClose={handleClose}
    >
      <Box
        paddingTop={2}
        display={"flex"}
        gap={2}
        flexDirection={"row"}
        flexWrap={"wrap"}
        flexBasis={40}
        paddingX={4}
      >
        {data?.map((el) => (
          <FlexBox
            padding={2}
            flexDirection={"column"}
            alignItems="flex-start"
            gap={4}
            borderRadius={"4px"}
            sx={{ background: "#1d232a", width: "15rem", height: "9rem" }}
          >
            <Box>
              <Typography>{getDaysOfWeekTransalate(el.day)}</Typography>
              <Typography>تعداد رزوهای روز: {el.items.length}</Typography>
            </Box>
            <Button
              fullWidth
              onClick={() =>
                navigate(`/therapists/schedules/${therapistId}/${el.day}`)
              }
            >
              نمایش کلی چارت
            </Button>
          </FlexBox>
        ))}
      </Box>
    </Modal>
  );
};

export default ReserveChart;
