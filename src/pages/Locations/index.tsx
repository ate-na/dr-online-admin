import { TLocationType } from "./index.types";
import Table from "../../components/kits/Table";
import { columns, rows } from "./index.constant";
import { useState } from "react";
import CreateLocation from "./CreateDialog";
import { useGetLocationsQuery } from "../../api/location";
import { LinearProgress } from "@mui/material";
import { ILocation } from "../../types/location.model";

const Location: TLocationType = () => {
  const [CreateDialogOpen, setCreateDialogOpen] = useState(false);

  const { data, isLoading } = useGetLocationsQuery();

  const HandleDelete = (data: Record<string, any>) => {
    console.log(data);
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

  if(isLoading) return <LinearProgress/>

  return (
    <>
      <CreateLocation open={CreateDialogOpen} handleClose={HandleClose} />
      <Table
        loading={isLoading}
        title="لیست آدرس ها"
        columns={columns}
        rows={data.content as ILocation[]}
        dataKey="id"
        isDelete={true}
        isEdit={true}
        handleDelete={HandleDelete}
        handleEdit={HandleEdit}
        createLabel="افزودن آدرس جدید"
        isCreateButton={true}
        handleCreateButton={HandleCreateButton}
      />
    </>
  );
};

export default Location;
