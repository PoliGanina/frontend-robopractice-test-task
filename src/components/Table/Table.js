import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {TablePaginationActions} from "./Table.utils";


const TableView = ({ daysInMonth, tableContent }) => {
    
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);

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
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="table">
        <TableHead>
          <TableRow>
            <TableCell>UserName</TableCell>
            {daysInMonth.map((day, i) => {
              return (
                <TableCell align="center" key={i}>
                  {day}
                </TableCell>
              );
            })}
            <TableCell>TOTAL (hh:mm)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? tableContent.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : tableContent
          ).map((userData) => (
            <TableRow key={userData.id} style={{ height: 50 }}>
              <TableCell component="th" scope="row" className='resizable'>
                {userData.userName}
              </TableCell>
              {userData.days.map((day, i) => (
                <TableCell align="center" key={`${userData.id}-${i}`}>
                  {userData.days[i]}
                </TableCell>
              ))}
              <TableCell component="th" scope="row">
                {userData.totalScreenTime}
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
  );
};

export default TableView;
