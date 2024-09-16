import { TLocationType } from "./index.types";
import Table from "../../components/kits/Table";

import { columns } from "./index.constant";
import { useState } from "react";
import CreateLocation from "./CreateDialog";
import {
  useDeleteLocationMutation,
  useGetLocationsQuery,
} from "../../api/location";
import { LinearProgress } from "@mui/material";
import ConfirmModal from "../../components/kits/Confirm";
import { ILocation } from "../../types/location.model";
import useErrorHandling from "../../hooks/useErrorHandling";
import { useSearchParams } from "react-router-dom";
import { getSearchParamsFilters } from "../../utils/searchParamsData";

const Location: TLocationType = () => {
  const [openDeleteDialg, setOpenDeleteDialg] = useState<ILocation | undefined>(
    undefined
  );
  const [CreateDialogOpen, setCreateDialogOpen] = useState<boolean>(false);

  const [updateDialogOpen, setUpdateDialogOpen] = useState<
    ILocation | undefined
  >(undefined);

  const [handleSubmitDeleteHandler, dataDleted] = useDeleteLocationMutation();

  const [searchParams, _] = useSearchParams();

  const { data, isLoading, refetch } = useGetLocationsQuery(
    getSearchParamsFilters(searchParams)
  );

  useErrorHandling({
    isError: !!dataDleted.isError,
    isSuccess: !!dataDleted.isSuccess,
  });
  const HandleDelete = (data: ILocation) => {
    setOpenDeleteDialg(data);
  };

  const deleteItemHandler = () => {
    //Delete Handler
    if (openDeleteDialg) {
      handleSubmitDeleteHandler(openDeleteDialg?.id);
    }
    setOpenDeleteDialg(() => undefined);
  };
  const cancelDeleteHandler = () => {
    setOpenDeleteDialg(() => undefined);
  };

  const HandleEdit = (data: ILocation) => {
    setUpdateDialogOpen(() => data);
  };

  const HandleCreateButton = () => {
    setCreateDialogOpen(() => true);
  };

  const HandleClose = () => {
    setCreateDialogOpen(() => false);
    setUpdateDialogOpen(() => undefined);
  };

  if (isLoading) return <LinearProgress />;

  return (
    <>
      <CreateLocation
        open={CreateDialogOpen || !!updateDialogOpen}
        data={updateDialogOpen}
        handleClose={HandleClose}
      />
      <Table
        loading={isLoading}
        title="لیست آدرس ها"
        columns={columns}
        rows={data?.content || []}
        count={data?.count || 10}
        dataKey="id"
        isDelete={true}
        isEdit={true}
        handleDelete={HandleDelete}
        handleEdit={HandleEdit}
        createLabel="افزودن آدرس جدید"
        isCreateButton={true}
        handleCreateButton={HandleCreateButton}
        refetch={refetch}
        totalPage={data?.count}
      />
      <ConfirmModal
        open={!!openDeleteDialg}
        title="آیا از حذف این آیتم اطمینان دارید ؟"
        agreeTitle="بله اطمینان دارم"
        cancelTitle="خیر لغو درخواست"
        agreeHandler={deleteItemHandler}
        cancelHandler={cancelDeleteHandler}
        handleClose={cancelDeleteHandler}
      />
    </>
  );
};

export default Location;
