import { useMemo } from "react";
import { useGetData } from "../../services/ServerRequest";
import TableView from "../Table/Table";
import Spinner from "../Spinner/Spinner";
import { useState } from "react";
import {
  getAllDaysInMonth,
  getDataWithAvailiability,
  getUsersTableData,
} from "./users.utils";
import SearchBar from "../SearchBar/SearchBar";

const UsersList = () => {
  const [ searchTerm, setSearchTerm ] = useState('');

  const { data = [], isFetching } = useGetData();
  const tableData = useMemo(() => getUsersTableData(data), [data]);

  const daysInMonth = useMemo(() => {
    const checkDate =
      tableData.length > 0 ? new Date(tableData[0].days[0].date) : null;
    return checkDate
      ? getAllDaysInMonth(checkDate.getFullYear(), checkDate.getMonth())
      : [...Array(30).keys(), 30].slice(1);
  }, [tableData]);

  const tableContent = isFetching
    ? console.log("isFetching")
    : getDataWithAvailiability(tableData, daysInMonth);

  const onUpdateSearch = (searchTerm) => setSearchTerm(searchTerm);

  const searchEmp = (items, term) => {
    if (term.length === 0) {
        return tableContent;
    }
    return items.filter(item => {
        return item.userName.indexOf(term) > -1
    })
  }
  
  const visibleData = searchEmp(tableContent, searchTerm);
  
  const spinner = isFetching ? <Spinner /> : null;
  const content = isFetching ? null : (
    <TableView
      daysInMonth={daysInMonth}
      tableContent={visibleData}
      isFetching={isFetching}
    />
  );
  return (
    <>
      <SearchBar onUpdateSearch={onUpdateSearch}/>
      {spinner}
      {content}
    </>
  );
};

export default UsersList;
