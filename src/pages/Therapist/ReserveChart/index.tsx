import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import { useGetTherapistSchedulesPerDayQuery } from "../../../api/therapistSchedule";
import FlexBox from "../../../components/kits/FlexBox";
import Modal from "../../../components/kits/Modal";
import { TReserveChart } from "./index.types";
import { getDaysOfWeekTransalate } from "../../../utils/getEnumTransformer";
import { useNavigate } from "react-router-dom";

const ReserveChart: TReserveChart = ({
  open = false,
  handleClose,
  therapistId,
}) => {
  const { data, isLoading } = useGetTherapistSchedulesPerDayQuery(therapistId);
  const navigate = useNavigate();
  return (
    <Modal
      width="fit-content"
      flexDirection={"row"}
      title="چارت رزرو های این پزشک"
      open={open}
      handleClose={handleClose}
    >
      {isLoading && (
        <Box display={"flex"} justifyContent={"center"}>
          <Typography>درحال برگزاری</Typography>
          <CircularProgress />
        </Box>
      )}
      {!isLoading && (
        <Grid container spacing={2}>
          {data?.map((el) => (
            <Grid item xs={4}>
              <FlexBox
                padding={2}
                flexDirection={"column"}
                alignItems="flex-start"
                gap={4}
                borderRadius={"4px"}
                sx={{ background: "#1d232a" }}
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
            </Grid>
          ))}
        </Grid>
      )}
    </Modal>
  );
};

export default ReserveChart;
