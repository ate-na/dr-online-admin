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
import { AdditionalActions, IColumns, TTable } from "./index.types";
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
  handleFilter,
  handleResetFilter,
  refetch,
  totalPage = 10,
  additionalButtons,
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
  const prepareTabelCellData = (el: IColumns, values: any) => {
    const value = values?.[el?.label];
    if (el.isImage && value)
      return (
        <img
          style={{ width: "4rem" }}
          src={"https://pyschologist-api.liara.run/upload/" + value}
        />
      );
    else if (el.isImage && !value) return "no image";
    else if (typeof value === "boolean")
      return value ? el.onLabel : el.offLable;
    else if (el.transform) return el.transform(values);
    else if (!value) return "no data";
    else return value;
  };
  return (
    <>
      <FlexBox justifyContent="space-between" mb={2}>
        <Typography>{title}</Typography>
        <FlexBox justifyContent="flex-end">
          {isCreateButton && !handleFilter && !handleResetFilter && (
            <Button onClick={handleCreateButton}>{createLabel}</Button>
          )}
          {isCreateButton && handleFilter && handleResetFilter && (
            <ButtonGroup variant="contained" aria-label="Basic button group">
              <Button onClick={handleCreateButton}>{createLabel}</Button>
              <Button onClick={handleFilter}>{"فیلتر جدول"}</Button>
              <Button onClick={handleResetFilter}>{"پاک کردن فیلترها"}</Button>
            </ButtonGroup>
          )}
        </FlexBox>
      </FlexBox>
      <MuiTable>
        <TableHead>
          <TableRow>
            {columns.map((element) => (
              <TableCell
                sx={{ textAlign: "center" }}
                key={element.label}
                component={"th"}
              >
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
                  <TableCell sx={{ textAlign: "center" }} component={"td"}>
                    {prepareTabelCellData(el, e)}
                  </TableCell>
                ))}
                <TableCell sx={{ textAlign: "center" }} component={"td"}>
                  <FlexBox gap={2} justifyContent={"center"}>
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
                    {additionalButtons &&
                      additionalButtons.length > 0 &&
                      additionalButtons.map((el: AdditionalActions) => (
                        <Button
                          color={el.color || "primary"}
                          onClick={() => el.handleClick(e)}
                        >
                          {el.name}
                        </Button>
                      ))}
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
