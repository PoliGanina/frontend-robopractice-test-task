import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import { visuallyHidden } from "@mui/utils";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";

export const TablePaginationActions = (props) => {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
};

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export const EnhancedTableHead = (props) => {
  const { order, orderBy, onRequestSort, daysInMonth } = props;

  return (
    <TableHead>
      <TableRow>
        <TableCell sx={{ fontWeight: "bold" }}>
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

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
};

export const getFormatedTime = (differenceMinutes) => {
  const durationHours = Math.floor(differenceMinutes / 60);
  const durationMinutes = differenceMinutes % 60;
  return `${durationHours}:${durationMinutes}`;
};
