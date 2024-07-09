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

const Therapists: TTherapistFC = () => {
  const { data, refetch } = useGetAllTherapistQuery(
    useGetSearchParamsFilter({ isObject: false })
  );
  const [state, dispatch] = useReducer(reducer, intialState);

  const [handleDelete, { isSuccess: isDeleteSuccess, isError: isDeleteError }] =
    useDeleteTherapitMutation();

  const handleOpenDialog = (type: Actions, value?: ITherapist | undefined) => {
    dispatch({
      type,
      payload: typeof value === typeof undefined ? true : value,
    });
  };

  const handleCloseDialog = (type: Actions) => {
    if (type === Actions.FILTER || type === Actions.DELETE) {
      dispatch({ type, payload: false });
    } else {
      dispatch({ type, payload: undefined });
    }
  };

  const agreeDeleteHandler = () => {
    if (state?.openDeleteDialog?.id) handleDelete(state?.openDeleteDialog?.id);
    handleCloseDialog(Actions.DELETE);
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
        handleResetFilter={handleCloseDialog.bind(null, Actions.FILTER)}
        isEdit={true}
        handleEdit={handleOpenDialog.bind(null, Actions.EDIT)}
        isDelete={true}
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
        ]}
      />
      <CreateOrEdit
        open={state.openCreateDialog}
        handleClose={handleCloseDialog.bind(null, Actions.CREATE)}
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
      <ReserveChart
        open={!!state.openChartReserveDetail}
        therapistId={state.openChartReserveDetail?.id as any}
        handleClose={handleCloseDialog.bind(null, Actions.CHART)}
      />
    </>
  );
};
export default Therapists;
