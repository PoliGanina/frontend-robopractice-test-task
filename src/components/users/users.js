import { useMemo } from "react";
import { useGetData } from "../../services/ServerRequest";
import TableView from "../Table/Table";
import { getAllDaysInMonth, getDataWithAvailiability, getUsersTableData } from "./users.utils";

const UsersList = () => {
  const { data = [], isFetching } = useGetData();
  const tableData = useMemo(() => getUsersTableData(data), [data]);

  const daysInMonth = useMemo(() => {
    const checkDate =
      tableData.length > 0 ? new Date(tableData[0].days[0].date) : null;
    return checkDate
      ? getAllDaysInMonth(checkDate.getFullYear(), checkDate.getMonth())
      : [...Array(30).keys(), 30].slice(1);
  }, [tableData]);

  const tableDataWithAvailiability = isFetching ? console.log('isFetching') : getDataWithAvailiability(tableData, daysInMonth);
  console.log(tableDataWithAvailiability);
  return null;
  
  return (
    <TableView
      daysInMonth={daysInMonth}
      tableData={tableData}
      isFetching={isFetching}
    />
  );
};

export default UsersList;
