import { TLocationType } from "./index.types";
import Table from "../../components/kits/Table";

import { columns } from "./index.constant";
import { useState } from "react";
import CreateLocation from "./CreateDialog";
import {
  useDeleteLocationMutation,
  useGetLocationsQuery,
  useUpdateLocationMutation,
} from "../../api/location";
import { LinearProgress } from "@mui/material";
import ConfirmModal from "../../components/kits/Confirm";
import { ILocation } from "../../types/location.model";
import useErrorHandling from "../../hooks/test";

const Location: TLocationType = () => {
  const [openDeleteDialg, setOpenDeleteDialg] = useState<ILocation | undefined>(
    undefined
  );
  const [CreateDialogOpen, setCreateDialogOpen] = useState<boolean>(false);

  const [updateDialogOpen, setUpdateDialogOpen] = useState<
    ILocation | undefined
  >(undefined);

  const [handleSubmitDeleteHandler, dataDleted] = useDeleteLocationMutation();
  const [handleSubmitUpdateHandler, updateData] = useUpdateLocationMutation();

  const { data, isLoading } = useGetLocationsQuery();

  useErrorHandling({
    isError: !!dataDleted.isError || !!updateData.isError,
    isSuccess: !!dataDleted.isSuccess || !!updateData.isSuccess,
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
    console.log("called", openDeleteDialg);
    setOpenDeleteDialg(() => undefined);
  };

  const HandleEdit = (data: ILocation) => {
    console.log(data);
    setUpdateDialogOpen(() => data);
  };

  const HandleCreateButton = () => {
    console.log("called");
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
        dataKey="id"
        isDelete={true}
        isEdit={true}
        handleDelete={HandleDelete}
        handleEdit={HandleEdit}
        createLabel="افزودن آدرس جدید"
        isCreateButton={true}
        handleCreateButton={HandleCreateButton}
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
