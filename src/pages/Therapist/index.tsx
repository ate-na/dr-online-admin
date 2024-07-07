import { useState } from "react";
import { useGetAllTherapistQuery } from "../../api/therapist";
import Table from "../../components/kits/Table";
import useGetSearchParamsFilter from "../../hooks/useGetSearchParamsFilter";
import { TherapistColumns } from "./index.constant";
import { TTherapistFC } from "./index.types";
import { ITherapist } from "../../types/therapist.modal";
import { useSearchParams } from "react-router-dom";
import CreateOrEdit from "./CreateOrEdit";
import FilterTherapist from "./Filter";
import DetailModal from "./Detail";
import ConfirmModal from "../../components/kits/Confirm";

export enum Actions {
  CREATE = "Create",
  EDIT = "Edit",
  DELETE = "Delete",
  CHART = "Chart",
  DETAIL = "Detail",
  FILTER = "Filter",
}

const Therapists: TTherapistFC = () => {
  const { data, refetch } = useGetAllTherapistQuery(
    useGetSearchParamsFilter({ isObject: false })
  );

  const [_, setSearchParams] = useSearchParams();

  const [openCreateDialog, setOpenCreateDialog] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<ITherapist>();
  const [openEditDialog, setOpenEditDialog] = useState<
    ITherapist | undefined
  >();
  const [openFilterDialog, setOpenFilterDialog] = useState<boolean>();
  const [openDetailDialog, setOpenDetailDialog] = useState<
    ITherapist | undefined
  >(undefined);

  const [openChartReserveDetail, setOpenChartReserveDetail] = useState<
    ITherapist | undefined
  >();

  const openCreateDialogHandler = () => {
    setOpenCreateDialog(() => true);
  };
  const openEditDialogHandler = (data: ITherapist) => {
    setOpenEditDialog(() => data);
  };
  const onCloseOpenOrEditDialog = () => {
    setOpenCreateDialog(() => false);
    setOpenEditDialog(() => undefined);
  };
  const openDeleteDialogHandler = (data: ITherapist) => {
    setOpenDeleteDialog(() => data);
  };
  const openFilterDialogHandler = () => {
    setOpenFilterDialog(() => true);
  };
  const closeFilterDialogHandler = () => {
    setOpenFilterDialog(() => false);
  };
  const clearFilterHandler = () => {
    setSearchParams(() => "");
  };

  const openDetailDialogHandler = (value: ITherapist) => {
    setOpenDetailDialog(() => value);
  };

  const handleCloseDetailDialog = () => {
    setOpenDetailDialog(() => undefined);
  };

  const onDeleteItemHandler = () => {
    console.log("delete", openDeleteDialog);
  };

  const onCancelHandler = () => {};

  const handleClickBtn = (type: Actions, value?: ITherapist | undefined) => {
    switch (type) {
      case Actions.CHART:
        setOpenChartReserveDetail(() => value);
        break;
      case Actions.DETAIL:
        setOpenDetailDialog(() => value);
        break;
      case Actions.CREATE:
        setOpenCreateDialog(() => true);
        break;
      case Actions.EDIT:
        setOpenEditDialog(() => value);
        break;
      case Actions.DELETE:
        setOpenDeleteDialog(() => value);
        break;
      case Actions.FILTER:
        setOpenFilterDialog(() => true);
        break;
    }
  };

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
        handleCreateButton={handleClickBtn.bind(null, Actions.CREATE) as any}
        handleFilter={handleClickBtn.bind(null, Actions.FILTER)}
        handleResetFilter={clearFilterHandler}
        isEdit={true}
        handleEdit={handleClickBtn.bind(null, Actions.EDIT)}
        isDelete={true}
        handleDelete={openDeleteDialogHandler}
        additionalButtons={[
          {
            name: "جزییات",
            label: "جزییات",
            handleClick: handleClickBtn.bind(null, Actions.DETAIL),
            color: "warning",
          },
          {
            name: "چاپ رزرو",
            label: "چاپ رزرو",
            handleClick: handleClickBtn.bind(null, Actions.CHART),
            color: "info",
          },
        ]}
      />
      <CreateOrEdit
        open={openCreateDialog}
        handleClose={onCloseOpenOrEditDialog}
      />
      <FilterTherapist
        open={openFilterDialog}
        handleClose={closeFilterDialogHandler}
      />
      <DetailModal
        open={!!openDetailDialog}
        data={openDetailDialog}
        handleClose={handleCloseDetailDialog}
      />
      <ConfirmModal
        agreeHandler={onDeleteItemHandler}
        cancelHandler={onCancelHandler}
        handleClose={onCancelHandler}
        agreeTitle=""
        cancelTitle=""
        open={!!openDeleteDialog}
        title=""
      />
    </>
  );
};
export default Therapists;
