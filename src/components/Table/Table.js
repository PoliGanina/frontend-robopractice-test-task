import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const TableView = ({ daysInMonth, tableContent, isFetching }) => {
  console.log(tableContent);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>UserName</TableCell>
            {daysInMonth.map((day, i) => {
              return (
                <TableCell align="right" key={i}>
                  {day}
                </TableCell>
              );
            })}
            <TableCell>TOTAL (hh:mm)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            tableContent.map((userData) => (
            <TableRow key={userData.id}>
              <TableCell component="th" scope="row">
                {userData.userName}
              </TableCell>
                {userData.days.map((day,i) =>
                <TableCell align="right">{userData.days[i]}</TableCell>
              )}
              <TableCell component="th" scope="row">
                {userData.totalScreenTime}
              </TableCell>
            </TableRow>
          ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableView;
