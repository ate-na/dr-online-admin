import { TLocationType } from "./index.types";
import Table from "../../components/kits/Table";
import { columns, rows } from "./index.constant";
import { useState } from "react";
import CreateLocation from "./CreateDialog";

const Location: TLocationType = () => {
  const [CreateDialogOpen, setCreateDialogOpen] = useState(false);
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

  return (
    <>
      <CreateLocation open={CreateDialogOpen} handleClose={HandleClose} />
      <Table
        title="لیست آدرس ها"
        columns={columns}
        rows={rows}
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
