import { useGetTherapistSchedulesChartDetailQuery } from "../../../api/therapistSchedule";
import Table from "../../../components/kits/Table";
import { TherapistScheduleColumns } from "./index.constant";
import { TTherapistSchedulesChart } from "./inex.types";

const TherapistScheduleChart: TTherapistSchedulesChart = ({}) => {
  const { data, refetch, isLoading } = useGetTherapistSchedulesChartDetailQuery(
    {
      therapist: 24,
      day: 1,
    }
  );
  return (
    <Table
      dataKey="id"
      rows={data?.content || []}
      title="چارت رزرو نیلوفر نیک پوری در روز دوشنبه"
      columns={TherapistScheduleColumns}
      refetch={refetch}
      count={data?.count}
      loading={isLoading}
      isDelete={true}
      totalPage={data?.count}
    />
  );
};

export default TherapistScheduleChart;
