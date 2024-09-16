import { useReducer } from "react";
import {
  useGetOrdersQuery,
  useUpdateStatusOrderMutation,
} from "../../api/orders";
import Table from "../../components/kits/Table";
import { Actions, intialState, OrderColumns, reducer } from "./index.constant";
import { TOrders } from "./index.types";
import { useSearchParams } from "react-router-dom";
import { IOrderEntity, OrderStatus } from "../../types/order.modal";
import ConfirmModal from "../../components/kits/Confirm";
import toast from "react-hot-toast";
import useErrorHandling from "../../hooks/useErrorHandling";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { IError } from "../../types/base.modal";
import FilterDialog from "./FilterDialog";
import useGetSearchParamsFilter from "../../hooks/useGetSearchParamsFilter";
import CreateOrder from "./CreateDialog";

const Orders: TOrders = () => {
  const { data, isLoading, refetch } = useGetOrdersQuery(
    useGetSearchParamsFilter({ isObject: true })
  );
  const [state, dispatch] = useReducer(reducer, intialState);

  const [_, setSearchParams] = useSearchParams();

  const [updateStatus, updateStatusData] = useUpdateStatusOrderMutation();

  useErrorHandling({
    isError: updateStatusData.isError,
    isSuccess: updateStatusData.isSuccess,
    errorMessage: (
      (updateStatusData.error as FetchBaseQueryError)?.data as IError
    )?.message,
  });

  const handleClose = (type: Actions) => {
    dispatch({
      type: type,
      payload:
        type === Actions.CREATE || type === Actions.FILTER ? false : undefined,
    });
  };

  const resetFilterHandler = () => {
    setSearchParams(() => "");
  };

  const handleCloseConfirm = () => {
    !!state.openCancelDialog
      ? handleClose(Actions.CANCEL)
      : handleClose(Actions.DONE);
  };

  const handleOpenDialog = (
    type: Actions,
    value?: IOrderEntity | undefined
  ) => {
    if (type === Actions.HEALTHFILE) {
      if (value?.status !== OrderStatus.Done) {
        toast.error(
          "برای نمایش پرونده سلامت باید وضعیت رزرو به اتمام رسیده باشد"
        );
        return;
      }
    }
    const notValid = value && handleValidationOpen(type, value);
    if (notValid) return;
    dispatch({
      type: type,
      payload:
        type === Actions.CREATE || type === Actions.FILTER ? true : value,
    });
  };

  const agreeConfirmHandler = () => {
    updateStatus({
      id: state.openCancelDialog?.id || (state.openDoneDialog?.id as number),
      status: !!state.openCancelDialog ? OrderStatus.Cancel : OrderStatus.Done,
    });
    handleClose(state.openCancelDialog ? Actions.CANCEL : Actions.DONE);
  };

  const handleValidationOpen = (type: Actions, value: IOrderEntity) => {
    if (type === Actions.CANCEL) {
      if (value.status !== OrderStatus.Pending) {
        toast.error(
          "برای به کنسل کردن این رزرو باید وضعیت رزرو درحال انتظار باشد"
        );
        return true;
      }
    } else if (type === Actions.DONE) {
      if (value.status !== OrderStatus.Pending) {
        toast.error("این رزرو قبلا به اتمام رسیده است");
        return true;
      }
    }
  };

  return (
    <>
      <Table
        rows={data?.content || []}
        dataKey="id"
        title="رزروها"
        count={data?.count}
        totalPage={data?.count}
        refetch={refetch}
        columns={OrderColumns}
        isCreateButton={true}
        createLabel="رزرو جدید"
        handleCreateButton={handleOpenDialog.bind(null, Actions.CREATE) as any}
        handleFilter={handleOpenDialog.bind(null, Actions.FILTER)}
        handleResetFilter={resetFilterHandler}
        loading={isLoading}
        additionalButtons={[
          {
            name: "کنسل کردن",
            label: "کنسل کردن",
            handleClick: handleOpenDialog.bind(null, Actions.CANCEL),
            color: "error",
          },
          {
            name: "انجام شده",
            label: "انجام شده",
            handleClick: handleOpenDialog.bind(null, Actions.DONE),
            color: "primary",
          },
          {
            name: "پرونده سلامت",
            label: "پرونده سلامت",
            handleClick: handleOpenDialog.bind(null, Actions.HEALTHFILE),
            color: "warning",
          },
        ]}
      />
      <ConfirmModal
        agreeTitle="بله اطمینان دارم"
        cancelTitle="خیر لغو درخواست"
        open={!!state.openCancelDialog || !!state.openDoneDialog}
        cancelHandler={handleCloseConfirm}
        agreeHandler={agreeConfirmHandler}
        handleClose={handleCloseConfirm}
        title={
          !!state.openCancelDialog ? "کنسل کردن" : "تغییر وضعیت به اتمام رسیده"
        }
        description={
          !!state.openCancelDialog
            ? "آیا از کنسل کردن این رزرو اطمینان دارید"
            : "آیا از تغییر وضعیت رزرو به به اتمام رسیده اطمینان دارید ؟؟؟"
        }
      />
      <ConfirmModal
        open={!!state.openHealthFileDialog}
        handleClose={handleClose.bind(null, Actions.HEALTHFILE)}
        title="پرونده سلامت"
        description="شما لیستی از داکیومنت های آپلود شده برای این نوبت رزرو را مشاهده میکنید, برای دیدن فایل داکیومنت کلیک کنید"
      />
      <FilterDialog
        open={state.openFilterDialog}
        handleClose={handleClose.bind(null, Actions.FILTER)}
      />
      <CreateOrder
        handleClose={handleClose.bind(null, Actions.CREATE)}
        open={!!state.openCreateDialog}
      />
    </>
  );
};

export default Orders;
