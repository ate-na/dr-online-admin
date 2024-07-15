import { useState } from "react";
import {
  useDeleteTherapistScheduleMutation,
  useGetTherapistSchedulesChartDetailQuery,
} from "../../api/therapistSchedule";
import Table from "../../components/kits/Table";
import { TherapistScheduleColumns } from "./index.constant";
import { TTherapistSchedulesChart } from "./inex.types";
import { ITherapistSchedules } from "../../types/therapist.modal";
import ConfirmModal from "../../components/kits/Confirm";
import { useParams } from "react-router-dom";
import { getDaysOfWeekTransalate } from "../../utils/getEnumTransformer";

const TherapistScheduleChart: TTherapistSchedulesChart = ({}) => {
  const params = useParams();
  console.log("searchParams", params);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<
    ITherapistSchedules | undefined
  >();
  const { data, refetch, isLoading } = useGetTherapistSchedulesChartDetailQuery(
    {
      therapist: +params.therapistId as any,
      day: +params.day as any,
    }
  );
  const [submit, deleteData] = useDeleteTherapistScheduleMutation();

  const handleDelete = (value: ITherapistSchedules) => {
    setOpenDeleteDialog(() => value);
  };

  const cancelHandler = () => {
    setOpenDeleteDialog(() => undefined);
  };

  const deleteHandler = () => {
    if (openDeleteDialog?.id) submit(openDeleteDialog?.id);
    setOpenDeleteDialog(() => undefined);
  };

  const handleClose = () => {
    setOpenDeleteDialog(() => undefined);
  };

  return (
    <>
      <Table
        dataKey="id"
        rows={data?.content || []}
        title={`چارت رزرو نیلوفر نیک پوری در روز ${getDaysOfWeekTransalate(
          +params.day
        )}`}
        columns={TherapistScheduleColumns}
        refetch={refetch}
        count={data?.count}
        loading={isLoading}
        isDelete={true}
        handleDelete={handleDelete}
        totalPage={data?.count}
      />
      <ConfirmModal
        agreeHandler={deleteHandler}
        cancelHandler={cancelHandler}
        cancelTitle="خیر لغودرخواست"
        agreeTitle="بله اطمینان دارم"
        handleClose={handleClose}
        title="آیا از حذف این آیتم اطمینان دارید؟"
        open={!!openDeleteDialog}
        loading={deleteData.isLoading}
      />
    </>
  );
};

export default TherapistScheduleChart;
