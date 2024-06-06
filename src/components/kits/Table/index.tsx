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
  ButtonGroup,
} from "@mui/material";
import { TTable } from "./index.types";
import FlexBox from "../FlexBox";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

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
  // handleChangePage,
  // currentPage,
  refetch,
  totalPage = 10,
  additionalActions,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [_, setSearchPrams] = useSearchParams();


  const pages =
    totalPage % 10 > 5 || totalPage % 10 === 0
      ? Math.round(totalPage / 10)
      : Math.round(totalPage / 10) + 1;

  const handleChangePage = (page: number) => {
    setCurrentPage(() => page);
    setSearchPrams((search) => ({ ...search, page: page }));
    refetch();
  };
  // console.log("pagesss", pages, totalPage);
  return (
    <>
      <FlexBox justifyContent="space-between" mb={2}>
        <Typography width={"100%"}>{title}</Typography>
        <FlexBox justifyContent="flex-end">
          {isCreateButton && (
            <Button onClick={handleCreateButton}>{createLabel}</Button>
          )}
          {!!additionalActions && additionalActions?.length > 0 && (
            <ButtonGroup variant="contained" aria-label="Basic button group">
              {additionalActions?.map((e) => (
                <Button onClick={e.handleClick}>{e.name}</Button>
              ))}
            </ButtonGroup>
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
                  <TableCell component={"td"}>
                    {el.isImage && e?.[el.label] ? (
                      <img
                        style={{ width: "3rem" }}
                        src={
                          "https://pyschologist-api.liara.run/upload/" +
                          e?.[el.label]
                        }
                      />
                    ) : e?.[el.label] ? (
                      e?.[el.label]
                    ) : el.isImage ? (
                      "no icon"
                    ) : (
                      "no data"
                    )}
                  </TableCell>
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
