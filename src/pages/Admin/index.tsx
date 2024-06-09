import { useState } from "react";
import { useDeleteAdminMutation, useGetAllAdminQuery } from "../../api/admin";
import Table from "../../components/kits/Table";
import { TAdmin } from "./index.types";
import { IAdmin } from "../../types/admin.modal";
import ConfirmModal from "../../components/kits/Confirm";
import useErrorHandling from "../../hooks/useErrorHandling";
import { useSearchParams } from "react-router-dom";
import useGetSearchParamsFilter from "../../hooks/useGetSearchParamsFilter";
import ChangePasswordDialog from "../../components/ui/ChangePassword";
import { Admincolumns } from "./index.constants";
import CreateOrEditAdmin from "./CreateOrEditAdmin";
import FilterAdminDialog from "./FilterAdmin";

const Admin: TAdmin = () => {
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
  const [openFilterModal, setOpenFilterModal] = useState<boolean>(false);
  const [openChangePasswordDialog, setOpenChangePasswordDialog] =
    useState<IAdmin>();
  const [openEditModal, setOpenEditModal] = useState<IAdmin>();
  const [openDelete, setOpenDelete] = useState<IAdmin>();

  const [_, setSearchParams] = useSearchParams();

  const { data, isLoading, refetch } = useGetAllAdminQuery(
    useGetSearchParamsFilter({ isObject: false })
  );
  const [onDeleteSubmit, deletedData] = useDeleteAdminMutation();

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
  const handleEdit = (data: IAdmin) => {
    setOpenEditModal(() => data);
  };
  const handleDelete = (data: IAdmin) => {
    setOpenDelete(() => data);
  };

  const deleteItemHandler = () => {
    if (openDelete?.id) onDeleteSubmit(openDelete?.id);
    setOpenDelete(() => undefined);
  };

  const cancelItemHandler = () => {
    setOpenDelete(() => undefined);
  };

  const changePasswordHandler = (data: IAdmin) => {
    console.log("the admin is", data);
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
        createLabel="ساخت ادمین جدید"
        handleCreateButton={handleCreateButton}
        handleResetFilter={clearFilterHandler}
        handleFilter={filterHandler}
        additionalButtons={[
          {
            name: "ویرایش پسوورد",
            label: "ویرایش پسوورد",
            handleClick: changePasswordHandler,
            color: "secondary",
          },
        ]}
        title="ادمین ها"
        isDelete={true}
        columns={Admincolumns}
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
export default Admin;
