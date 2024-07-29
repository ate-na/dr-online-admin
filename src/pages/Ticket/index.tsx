import { useReducer } from "react";
import { useGetAllTicketsQuery } from "../../api/ticket";
import Table from "../../components/kits/Table";
import useGetSearchParamsFilter from "../../hooks/useGetSearchParamsFilter";
import { initalState, reducer, ticketColumns } from "./index.contant";
import { Actions, TTicket } from "./index.types";
import { ITicket } from "../../types/ticket.modal";

const Tickets: TTicket = () => {
  const [state, dispatch] = useReducer(reducer, initalState);

  const { refetch, data, isLoading } = useGetAllTicketsQuery(
    useGetSearchParamsFilter({ isObject: false })
  );

  const handleClose = () => {};

  const handleOpen = (
    action: Actions,
    value: ITicket | undefined | boolean,
  ) => {
    console.log("the value is", value, action);
  };

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
        handleDelete={handleOpen.bind(null,Actions.DELETE)}
      />
    </>
  );
};
export default Tickets;
