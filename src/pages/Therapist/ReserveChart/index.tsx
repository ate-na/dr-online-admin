import { useGetTherapistSchedulesPerDayQuery } from "../../../api/therapistSchedule";
import Modal from "../../../components/kits/Modal";
import { TReserveChart } from "./index.types";

const ReserveChart: TReserveChart = ({
  open = false,
  handleClose,
  therapistId,
}) => {
  const { data } = useGetTherapistSchedulesPerDayQuery(therapistId);

  return (
    <Modal
      title="چارت رزرو های این پزشک"
      open={open}
      handleClose={handleClose}
    ></Modal>
  );
};

export default ReserveChart;
