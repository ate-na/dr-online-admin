import { TLocationType } from "./index.types";
import Table from "../../components/kits/Table";
import Modal from "../../components/kits/Modal";

import { columns } from "./index.constant";
import { useState } from "react";
import CreateLocation from "./CreateDialog";
import { useGetLocationsQuery } from "../../api/location";
import { LinearProgress } from "@mui/material";
import ConfirmModal from "../../components/kits/Confirm";
import { ILocation } from "../../types/location.model";

const Location: TLocationType = () => {
  const [openDeleteDialg, setOpenDeleteDialg] = useState<ILocation | undefined>(
    undefined
  );
  const [CreateDialogOpen, setCreateDialogOpen] = useState<boolean>(false);

  const { data, isLoading } = useGetLocationsQuery();

  const HandleDelete = (data: ILocation) => {
    setOpenDeleteDialg(data);
  };

  const deleteItemHandler = () => {
    //Delete Handler
    setOpenDeleteDialg(() => undefined);
  };
  const cancelDeleteHandler = () => {
    console.log("called",openDeleteDialg)
    setOpenDeleteDialg(() => undefined);
  };

  const HandleEdit = (data: Record<string, any>) => {
    console.log(data);
  };

  const HandleCreateButton = () => {
    console.log("called");
    setCreateDialogOpen(() => true);
  };

  const HandleClose = () => {
    setCreateDialogOpen(() => false);
  };

  if (isLoading) return <LinearProgress />;

  return (
    <>
      <CreateLocation open={CreateDialogOpen} handleClose={HandleClose} />
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
          open={typeof openDeleteDialg !== undefined ? true : false}
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
