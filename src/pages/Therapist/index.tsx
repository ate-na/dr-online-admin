import { useReducer } from "react";
import {
  useDeleteTherapitMutation,
  useGetAllTherapistQuery,
} from "../../api/therapist";
import Table from "../../components/kits/Table";
import useGetSearchParamsFilter from "../../hooks/useGetSearchParamsFilter";
import { intialState, reducer, TherapistColumns } from "./index.constant";
import { Actions, TTherapistFC } from "./index.types";
import { ITherapist } from "../../types/therapist.modal";
import CreateOrEdit from "./CreateOrEdit";
import FilterTherapist from "./Filter";
import DetailModal from "./Detail";
import ConfirmModal from "../../components/kits/Confirm";
import useErrorHandling from "../../hooks/useErrorHandling";
import ReserveChart from "./ReserveChart";
import { useSearchParams } from "react-router-dom";
import ChangePasswordDialog from "../../components/ui/ChangePassword";

const Therapists: TTherapistFC = () => {
  const { data, refetch, isLoading } = useGetAllTherapistQuery(
    useGetSearchParamsFilter({ isObject: false })
  );
  const [state, dispatch] = useReducer(reducer, intialState);
  const [handleDelete, { isSuccess: isDeleteSuccess, isError: isDeleteError }] =
    useDeleteTherapitMutation();

  const [_, setSearchParam] = useSearchParams();

  const handleOpenDialog = (type: Actions, value?: ITherapist | undefined) => {
    dispatch({
      type,
      payload: typeof value === typeof undefined ? true : value,
    });
  };

  const handleCloseDialog = (type: Actions) => {
    if (type === Actions.FILTER || type === Actions.CREATE) {
      dispatch({ type, payload: false });
    } else {
      dispatch({ type, payload: undefined });
    }
  };

  const handleCloseCreateOrUpdate = () => {
    handleCloseDialog(Actions.CREATE);
    handleCloseDialog(Actions.EDIT);
  };

  const agreeDeleteHandler = () => {
    if (state?.openDeleteDialog?.id) handleDelete(state?.openDeleteDialog?.id);
    handleCloseDialog(Actions.DELETE);
  };

  const resetFilterHandler = () => {
    setSearchParam(() => "");
    handleCloseDialog(Actions.FILTER);
  };

  useErrorHandling({
    isSuccess: isDeleteSuccess,
    isError: isDeleteError,
  });

  return (
    <>
      <Table
        rows={data?.content || []}
        title="لیست پزشکان"
        count={data?.count || 10}
        columns={TherapistColumns}
        dataKey="id"
        refetch={refetch}
        totalPage={data?.count}
        isCreateButton={true}
        createLabel="ساخت پزشک جدید"
        handleCreateButton={handleOpenDialog.bind(null, Actions.CREATE) as any}
        handleFilter={handleOpenDialog.bind(null, Actions.FILTER)}
        handleResetFilter={resetFilterHandler}
        isEdit={true}
        handleEdit={handleOpenDialog.bind(null, Actions.EDIT)}
        isDelete={true}
        loading={isLoading}
        handleDelete={handleOpenDialog.bind(null, Actions.DELETE)}
        additionalButtons={[
          {
            name: "جزییات",
            label: "جزییات",
            handleClick: handleOpenDialog.bind(null, Actions.DETAIL),
            color: "warning",
          },
          {
            name: "چاپ رزرو",
            label: "چاپ رزرو",
            handleClick: handleOpenDialog.bind(null, Actions.CHART),
            color: "info",
          },
          {
            name: "ویرایش پسوورد",
            label: "ویرایش پسوورد",
            handleClick: handleOpenDialog.bind(null, Actions.CHANGE_PASSWORD),
            color: "secondary",
          },
        ]}
      />
      <CreateOrEdit
        open={state.openCreateDialog || !!state.openEditDialog}
        handleClose={handleCloseCreateOrUpdate}
        data={state.openEditDialog}
      />
      <FilterTherapist
        open={state.openFilterDialog}
        handleClose={handleCloseDialog.bind(null, Actions.FILTER)}
      />
      <DetailModal
        open={!!state.openDetailDialog}
        data={state.openDetailDialog}
        handleClose={handleCloseDialog.bind(null, Actions.DETAIL)}
      />
      <ConfirmModal
        agreeHandler={agreeDeleteHandler}
        cancelHandler={handleCloseDialog.bind(null, Actions.DELETE)}
        handleClose={handleCloseDialog.bind(null, Actions.DELETE)}
        agreeTitle="بله اطمینان دارم"
        cancelTitle="خیر لغو درخواست"
        open={!!state.openDeleteDialog}
        title="آیا از حذف این آیتم اطمینان دارید ؟"
      />
      {state.openChartReserveDetail && (
        <ReserveChart
          open={!!state.openChartReserveDetail}
          therapistId={state.openChartReserveDetail?.id as any}
          handleClose={handleCloseDialog.bind(null, Actions.CHART)}
        />
      )}
      <ChangePasswordDialog
        handleClose={handleCloseDialog.bind(null, Actions.CHANGE_PASSWORD)}
        data={state.openChangePasswordDialog}
        open={!!state.openChangePasswordDialog}
      />
    </>
  );
};
export default Therapists;
