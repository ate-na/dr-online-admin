import { useGetAllTicketsQuery } from "../../api/ticket";
import Table from "../../components/kits/Table";
import useGetSearchParamsFilter from "../../hooks/useGetSearchParamsFilter";
import { ticketColumns } from "./index.contant";
import { TTicket } from "./index.types";

const Tickets: TTicket = () => {
  const { refetch, data,isLoading } = useGetAllTicketsQuery(
    useGetSearchParamsFilter({ isObject: false })
  );

  return (
    <>
      <Table
        title={`صفحه تیکت و پشتیبانی (${data?.count})`}
        columns={ticketColumns}
        dataKey="id"
        refetch={refetch}
        rows={data?.content || []}
        totalPage={data?.count}
        count={data?.count}
        isDelete={true}
        loading={isLoading}
      />
    </>
  );
};
export default Tickets;
