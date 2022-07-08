import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const TableView = ({ daysInMonth, tableData, isFetching }) => {
 console.log(tableData)
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
          </TableRow>
        </TableHead>
        <TableBody>
          {
            tableData.map((userData) => (
            <TableRow key={userData.id}>
              <TableCell component="th" scope="row">
                {userData.userName}
              </TableCell>
                {userData.days.map((day, daysInMonth, i) =>
                day[i] === userData.days[i].data ? 
                (<TableCell align="right">
                    {userData.days[i].screenTimeDaily}
                  </TableCell>) : 
                (<TableCell align="right">0</TableCell>)
              )}
            </TableRow>
          ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableView;
