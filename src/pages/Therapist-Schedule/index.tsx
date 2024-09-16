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
import CreateTherapistSchedule from "./CreateTherapistSchedule";
import { useGetTherapistByIdQuery } from "../../api/therapist";

const TherapistScheduleChart: TTherapistSchedulesChart = ({}) => {
  const { therapistId, day } = useParams<{
    day: string;
    therapistId: string;
  }>();
  const [openDeleteDialog, setOpenDeleteDialog] = useState<
    ITherapistSchedules | undefined
  >();
  const [openCreateDialog, setOpenCreateDialog] = useState<boolean>(false);
  const { data, refetch, isLoading } = useGetTherapistSchedulesChartDetailQuery(
    {
      therapist: therapistId ? +therapistId : undefined,
      day: day ? +day : undefined,
    }
  );
  const [submit, deleteData] = useDeleteTherapistScheduleMutation();

  const { data: therapist } = useGetTherapistByIdQuery(
    +(therapistId as any) || 0
  );

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

  const handleCreateButton = () => {
    setOpenCreateDialog(() => true);
  };

  console.log("therapist", therapist);

  const title = () => {
    return `چارت رزرو ${therapist?.firstName} ${
      therapist?.lastName
    } در روز های ${getDaysOfWeekTransalate(day ? +day : undefined)}`;
  };

  return (
    <>
      <Table
        dataKey="id"
        rows={data?.content || []}
        title={title()}
        columns={TherapistScheduleColumns}
        refetch={refetch}
        count={data?.count}
        loading={isLoading}
        isDelete={true}
        handleDelete={handleDelete}
        totalPage={data?.count}
        isCreateButton={true}
        createLabel="ساخت آیتم جدید"
        handleCreateButton={handleCreateButton}
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
      <CreateTherapistSchedule
        therapist={therapist}
        dayOfWeek={day ? +day : undefined}
        open={openCreateDialog}
        handleClose={() => setOpenCreateDialog(() => false)}
      />
    </>
  );
};

export default TherapistScheduleChart;
