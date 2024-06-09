import { useState } from "react";
import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "../../api/categories";
import Table from "../../components/kits/Table";
import CreateCategory from "./CreateCategory";
import { Categorycolumns } from "./index.constant";
import { TCategoryType } from "./index.types";
import ConfirmModal from "../../components/kits/Confirm";
import { ICategory } from "../../types/category.modal";
import useErrorHandling from "../../hooks/useErrorHandling";
import FilterCategoryForm from "./FilterCategory";
import { useSearchParams } from "react-router-dom";
import useGetSearchParamsFilter from "../../hooks/useGetSearchParamsFilter";
const Categories: TCategoryType = () => {
  const [openDeleteDialg, setOpenDeleteDialg] = useState<ICategory | undefined>(
    undefined
  );

  const [handleSubmitDeleteHandler, deleteData] = useDeleteCategoryMutation();
  const { data, isLoading, refetch } = useGetCategoriesQuery(
    useGetSearchParamsFilter({ isObject: false })
  );
  const [openCreateForm, setOpenCreateForm] = useState<boolean>(false);
  const [updateCreateForm, setUpdateCreateForm] = useState<ICategory>();
  const [openFilterDialg, setOpenFilterDialog] = useState<boolean>(false);
  const [_, setSearchParams] = useSearchParams();

  useErrorHandling({
    isError: deleteData.isError,
    isSuccess: deleteData.isSuccess,
  });
  const clearFilterHandler = () => {
    console.log("clearFilterHandler");
    setSearchParams(() => {});
  };

  const handleCloseFilterDialog = () => {
    setOpenFilterDialog(() => false);
  };

  const handleSubmit = () => {
    refetch();
  };

  const filterTableHandler = () => {
    setOpenFilterDialog(() => true);
  };
  const addNewCategoryHandler = () => {
    console.log("addNewCategoryHandler");
    setOpenCreateForm(() => true);
  };
  const handleCloseCreateForm = () => {
    console.log("handleCloseCreateForm");
    setOpenCreateForm(() => false);
    setUpdateCreateForm(() => {});
  };

  const HandleDelete = (data: ICategory) => {
    setOpenDeleteDialg(data);
  };

  const deleteItemHandler = async () => {
    //Delete Handler
    if (openDeleteDialg) {
      await handleSubmitDeleteHandler(+openDeleteDialg?.id);
      setOpenDeleteDialg(() => undefined);
    } else {
      setOpenDeleteDialg(() => undefined);
    }
  };
  const cancelDeleteHandler = () => {
    console.log("called", openDeleteDialg);
    setOpenDeleteDialg(() => undefined);
  };

  const handleEdit = (data: ICategory) => {
    setUpdateCreateForm(data);
  };

  return (
    <>
      <Table
        columns={Categorycolumns}
        dataKey="id"
        rows={data?.content || []}
        totalPage={data?.count || 10}
        loading={isLoading}
        isDelete={true}
        isEdit={true}
        refetch={refetch}
        handleEdit={handleEdit}
        handleDelete={HandleDelete}
        isCreateButton={true}
        createLabel="افزودن زمینه تخصصی"
        handleCreateButton={addNewCategoryHandler}
        handleFilter={filterTableHandler}
        handleResetFilter={clearFilterHandler}
      />
      <CreateCategory
        handleClose={handleCloseCreateForm}
        open={openCreateForm || !!updateCreateForm}
        data={updateCreateForm}
      />
      <ConfirmModal
        open={!!openDeleteDialg}
        title="آیا از حذف این آیتم اطمینان دارید ؟"
        agreeTitle="بله اطمینان دارم"
        cancelTitle="خیر لغو درخواست"
        agreeHandler={deleteItemHandler}
        cancelHandler={cancelDeleteHandler}
        handleClose={cancelDeleteHandler}
        loading={deleteData.isLoading}
      />
      <FilterCategoryForm
        open={!!openFilterDialg}
        handleClose={handleCloseFilterDialog}
        handleSubmit={handleSubmit}
      />
    </>
  );
};
export default Categories;
