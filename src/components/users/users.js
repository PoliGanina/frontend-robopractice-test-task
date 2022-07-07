import { useMemo } from "react";
import { useGetData } from "../../services/ServerRequest";
import BasicTable from "../Table/Table";
import { getAllDaysInMonth, getUsersTableData } from "./users.utils";

const UsersList = () => {
  const { data = [], isFetching } = useGetData();
  const tableData = useMemo(() => getUsersTableData(data), [data]);

  const daysInMonth = useMemo(() => {
    const checkDate = tableData.length > 0 ? new Date(tableData[0].days[0].date) : null;
    return checkDate ? getAllDaysInMonth(checkDate.getFullYear(), checkDate.getMonth()) : [...Array(30).keys(),30].slice(1);
  }, [tableData]);

  console.log(daysInMonth);

  return (
    <BasicTable daysInMonth={daysInMonth}/>
  )
};

export default UsersList;
