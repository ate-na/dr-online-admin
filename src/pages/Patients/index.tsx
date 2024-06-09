import { useState } from "react";
import Table from "../../components/kits/Table";
import { TPatient } from "./index.types";
import ConfirmModal from "../../components/kits/Confirm";
import useErrorHandling from "../../hooks/useErrorHandling";
import { useSearchParams } from "react-router-dom";
import useGetSearchParamsFilter from "../../hooks/useGetSearchParamsFilter";
import ChangePasswordDialog from "../../components/ui/ChangePassword";
import { PatientColumns } from "./index.constants";
import CreateOrEditAdmin from "./CreateOrEditPatient";
import FilterAdminDialog from "./FilterPatient";
import { IPatient } from "../../types/patient.modal";
import {
  useGetAllPatientQuery,
  useDeletePatientMutation,
} from "../../api/patients";

const Patient: TPatient = () => {
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
  const [openFilterModal, setOpenFilterModal] = useState<boolean>(false);
  const [openChangePasswordDialog, setOpenChangePasswordDialog] =
    useState<IPatient>();
  const [openEditModal, setOpenEditModal] = useState<IPatient>();
  const [openDelete, setOpenDelete] = useState<IPatient>();

  const [_, setSearchParams] = useSearchParams();

  const { data, isLoading, refetch } = useGetAllPatientQuery(
    useGetSearchParamsFilter({ isObject: false })
  );
  const [onDeleteSubmit, deletedData] = useDeletePatientMutation();

  const handleCreateButton = () => {
    setOpenCreateModal(() => true);
  };

  const handleCloseCreateOrEdit = () => {
    setOpenCreateModal(() => false);
    setOpenEditModal(() => undefined);
  };

  const handleCloseFilterDialog = () => {
    setOpenFilterModal(() => false);
  };

  const clearFilterHandler = () => {
    setSearchParams(() => {});
  };
  const filterHandler = () => {
    setOpenFilterModal(() => true);
  };
  const handleEdit = (data: IPatient) => {
    setOpenEditModal(() => data);
  };
  const handleDelete = (data: IPatient) => {
    setOpenDelete(() => data);
  };

  const deleteItemHandler = () => {
    if (openDelete?.id) onDeleteSubmit(openDelete?.id);
    setOpenDelete(() => undefined);
  };

  const cancelItemHandler = () => {
    setOpenDelete(() => undefined);
  };

  const changePasswordHandler = (data: IPatient) => {
    setOpenChangePasswordDialog(() => data);
  };
  const handleCloseChangePassword = () => {
    setOpenChangePasswordDialog(() => undefined);
  };

  useErrorHandling({
    isError: deletedData.isError,
    isSuccess: deletedData.isSuccess,
    isLoading: deletedData.isLoading,
  });

  return (
    <>
      <Table
        dataKey="id"
        refetch={refetch}
        isEdit={true}
        loading={isLoading}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        isCreateButton={true}
        createLabel="ایجاد بیمار جدید"
        handleCreateButton={handleCreateButton}
        handleFilter={filterHandler}
        handleResetFilter={clearFilterHandler}
        additionalButtons={[
          {
            name: "ویرایش پسوورد",
            label: "ویرایش پسوورد",
            handleClick: changePasswordHandler,
            color: "secondary",
          },
        ]}
        title="بیماران"
        isDelete={true}
        columns={PatientColumns}
        rows={data?.content || []}
        count={data?.count || 10}
        totalPage={data?.count || 10}
      />
      <ConfirmModal
        open={!!openDelete}
        title="آیا از حذف این آیتم اطمینان دارید ؟"
        agreeTitle="بله اطمینان دارم"
        cancelTitle="خیر لغو درخواست"
        agreeHandler={deleteItemHandler}
        cancelHandler={cancelItemHandler}
        handleClose={cancelItemHandler}
        loading={deletedData?.isLoading}
      />
      <CreateOrEditAdmin
        open={openCreateModal || !!openEditModal}
        handleClose={handleCloseCreateOrEdit}
        data={openEditModal}
      />
      <FilterAdminDialog
        open={openFilterModal}
        handleClose={handleCloseFilterDialog}
      />
      <ChangePasswordDialog
        open={!!openChangePasswordDialog}
        handleClose={handleCloseChangePassword}
        data={openChangePasswordDialog}
      />
    </>
  );
  // return <></>;
};
export default Patient;
