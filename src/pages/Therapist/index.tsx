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

const Therapists: TTherapistFC = () => {
  const { data, refetch } = useGetAllTherapistQuery(
    useGetSearchParamsFilter({ isObject: false })
  );

  const [_, setSearchParams] = useSearchParams();

  const [openCreateDialog, setOpenCreateDialog] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<ITherapist>();
  const [openEditDialog, setOpenEditDialog] = useState<ITherapist>();
  const [openFilterDialog, setOpenFilterDialog] = useState<boolean>();



  const openCreateDialogHandler = () => {
    setOpenCreateDialog(() => true);
  };
  const openEditDialogHandler = (data: ITherapist) => {
    setOpenEditDialog(() => data);
  };
  const onCloseOpenOrEditDialog = () => {
    setOpenCreateDialog(() => false);
    setOpenEditDialog(() => {});
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
        handleCreateButton={openCreateDialogHandler}
        handleFilter={openFilterDialogHandler}
        handleResetFilter={clearFilterHandler}
        isEdit={true}
        handleEdit={openEditDialogHandler}
        isDelete={true}
        handleDelete={openDeleteDialogHandler}
      />
      <CreateOrEdit
        open={openCreateDialog}
        handleClose={onCloseOpenOrEditDialog}
      />
      <FilterTherapist
        open={openFilterDialog}
        handleClose={closeFilterDialogHandler}
      />
    </>
  );
};
export default Therapists;
