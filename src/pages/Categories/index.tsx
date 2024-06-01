import { useGetCategoriesQuery } from "../../api/categories";
import Table from "../../components/kits/Table";
import { Categorycolumns } from "./index.constant";
import { TCategoryType } from "./index.types";

const Categories: TCategoryType = () => {
  const { data, isLoading } = useGetCategoriesQuery("");

  return (
    <>
      <Table
        columns={Categorycolumns}
        dataKey="id"
        rows={data?.content || []}
        loading={isLoading}
        
      />
    </>
  );
};
export default Categories;
