import { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  Paper,
} from "@mui/material";
import TablePaginationActions from './TablePaginationActions';
import TableHeadEnhanced from './TableHeadEnhanced';

import "./table.css";
import { Typography } from "@mui/material";
import SearchBar from "../SearchBar/SearchBar";

const TableView = ({ daysInMonth, tableContent }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [prevContent, setPrevCont] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("userName");

  const getFormatedTime = (differenceMinutes) => {
    const durationHours = Math.floor(differenceMinutes / 60);
    const durationMinutes = differenceMinutes % 60;
    return `${durationHours}:${durationMinutes}`;
  };

  const onUpdateSearch = (searchTerm) => setSearchTerm(searchTerm);

  const searchEmp = (items, term) => {
    if (term.length === 0) {
      return tableContent;
    }
    return items.filter((item) => {
      return item.userName.indexOf(term) > -1;
    });
  };

  const handleSort = (orderByProp) => {
    const isAsc = orderBy === orderByProp && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(orderByProp);
  };

  const visibleData = useMemo(() => {
    const filteredData = searchEmp(tableContent, searchTerm);

    return filteredData.sort((a, b) => {
      if (order === "asc") {
        switch (orderBy) {
          case "userName":
            return a[orderBy].toLowerCase() > b[orderBy].toLowerCase() ? 1 : -1;
          case "totalScreenTime":
            return a[orderBy] > b[orderBy] ? 1 : -1;
          default:
            return a.days[orderBy] > b.days[orderBy] ? 1 : -1;
        }
      }

      switch (orderBy) {
        case "userName":
          return a[orderBy].toLowerCase() > b[orderBy].toLowerCase() ? -1 : 1;
        case "totalScreenTime":
          return a[orderBy] > b[orderBy] ? -1 : 1;
        default:
          return a.days[orderBy] > b.days[orderBy] ? -1 : 1;
      }
    });
  }, [tableContent, searchTerm, order, orderBy]);

  useEffect(() => {
    if (visibleData.length !== prevContent.length) {
      setPrevCont(visibleData);
      setPage(0);
    }
  }, [visibleData]);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tableContent.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer>
        <div className="table__toolbar">
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant="h6"
            id="tableTitle"
            component="div"
            className="table__title"
          >
            Employee Time Tracking
          </Typography>
          <SearchBar onUpdateSearch={onUpdateSearch} />
        </div>
        <Table stickyHeader aria-label="sticky table">
          <TableHeadEnhanced
            order={order}
            orderBy={orderBy}
            onRequestSort={handleSort}
            daysInMonth={daysInMonth}
          />
          <TableBody>
            {(rowsPerPage > 0
              ? visibleData.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : visibleData
            ).map((userData) => (
              <TableRow key={userData.id}>
                <TableCell component="th" scope="row">
                  {userData.userName}
                </TableCell>
                {userData.days.map((day, i) => (
                  <TableCell
                    align="center"
                    key={`${userData.id}-${i}`}
                    padding="normal"
                  >
                    {getFormatedTime(userData.days[i])}
                  </TableCell>
                ))}
                <TableCell component="th" scope="row">
                  {getFormatedTime(userData.totalScreenTime)}
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[8, 16, 32, { label: "All", value: -1 }]}
              colSpan={3}
              count={tableContent.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  "aria-label": "rows per page",
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </TableContainer>
    </Paper>
  );
};

export default TableView;
