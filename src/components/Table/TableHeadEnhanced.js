import PropTypes from "prop-types";
import { visuallyHidden } from "@mui/utils";
import Box from "@mui/material/Box";
import { TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";

const TableHeadEnhanced = (props) => {
    const { order, orderBy, onRequestSort, daysInMonth } = props;
  
    return (
      <TableHead >
        <TableRow hover>
          <TableCell sx={{ fontWeight: "bold"}}>
            <TableSortLabel
              active={orderBy === "userName"}
              direction={orderBy === "userName" ? order : "asc"}
              onClick={() => onRequestSort("userName")}
            >
              User Name
              {orderBy === "userName" && (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              )}
            </TableSortLabel>
          </TableCell>
          {daysInMonth.map((day, i) => {
            return (
              <TableCell sx={{ fontWeight: "bold" }} align="center" key={i}>
                <TableSortLabel
                  active={orderBy === i}
                  direction={orderBy === i ? order : "asc"}
                  onClick={() => onRequestSort(i)}
                >
                  {day}
                  {orderBy === i && (
                    <Box component="span" sx={visuallyHidden}>
                      {order === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </Box>
                  )}
                </TableSortLabel>
              </TableCell>
            );
          })}
          <TableCell>
            <TableSortLabel
              active={orderBy === "totalScreenTime"}
              direction={orderBy === "totalScreenTime" ? order : "asc"}
              onClick={() => onRequestSort("totalScreenTime")}
            >
              Monthly total (hh:mm)
              {orderBy === "totalScreenTime" && (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              )}
            </TableSortLabel>
          </TableCell>
        </TableRow>
      </TableHead>
    );
  };
  
  TableHeadEnhanced.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
  };

export default TableHeadEnhanced;