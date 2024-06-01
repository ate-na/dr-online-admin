import {
  TableHead,
  Table as MuiTable,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Typography,
  LinearProgress,
  Pagination,
} from "@mui/material";
import { TTable } from "./index.types";
import FlexBox from "../FlexBox";

const Table: TTable<any> = ({
  columns,
  rows,
  dataKey,
  isDelete,
  isEdit,
  handleDelete,
  handleEdit,
  title,
  isCreateButton,
  handleCreateButton,
  createLabel,
  loading,
  handleChangePage,
  currentPage,
  totalPage = 10,
}) => {
  const pages =
    totalPage % 10 > 5 || totalPage % 10 === 0
      ? Math.round(totalPage / 10)
      : Math.round(totalPage / 10) + 1;
  return (
    <>
      <FlexBox justifyContent="space-between" mb={2}>
        <Typography width={"100%"}>{title}</Typography>
        <FlexBox justifyContent="flex-end">
          {isCreateButton && (
            <Button onClick={handleCreateButton}>{createLabel}</Button>
          )}
        </FlexBox>
      </FlexBox>
      <MuiTable>
        <TableHead>
          <TableRow>
            {columns.map((element) => (
              <TableCell key={element.label} component={"th"}>
                {element.name}
              </TableCell>
            ))}
            <TableCell component={"th"}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((e) => {
            return (
              <TableRow key={e?.[dataKey]}>
                {columns.map((el) => (
                  <TableCell component={"td"}>{e?.[el.label]}</TableCell>
                ))}
                <TableCell component={"td"}>
                  <FlexBox gap={2}>
                    {isDelete && (
                      <Button
                        onClick={handleDelete?.bind(null, e)}
                        color="error"
                      >
                        حذف
                      </Button>
                    )}
                    {isEdit && (
                      <Button onClick={handleEdit?.bind(null, e)}>
                        ویرایش
                      </Button>
                    )}
                  </FlexBox>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </MuiTable>
      <FlexBox justifyContent="center" width={"100%"}>
        <Pagination
          color="secondary"
          page={currentPage}
          count={pages}
          onChange={(_, page: number) => handleChangePage(page)}
        />
      </FlexBox>
      {loading && <LinearProgress />}
    </>
  );
};

export default Table;
