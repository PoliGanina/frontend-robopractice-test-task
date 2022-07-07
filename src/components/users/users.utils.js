import { parse } from "date-fns";
import differenceInMinutes from "date-fns/differenceInMinutes";

export const getUsersTableData = (data) =>
  data.map(({ days, ...rest }) => {
    return {
      ...rest,
      days: days.map((info) => {
        const startDate = parse(info.Start, "HH-mm", new Date());
        const endDate = parse(info.End, "HH-mm", new Date());

        const differenceMinutes = differenceInMinutes(endDate, startDate);

        const durationHours = Math.floor(differenceMinutes / 60);
        const durationMinutes = differenceMinutes % 60;
        const screenTimeDaily = `${durationHours}:${durationMinutes}`;

        return { date: info.Date, differenceMinutes, screenTimeDaily };
      }),
    };
  });

export const getUsersScreenTime = (data) => {
    data.map(({userName, days}) => {
        return {
            userName: userName,
        }
    })
}

export const getAllDaysInMonth = (year, month) => {
  const date = new Date(year, month, 1);

  const days = [];

  while (date.getMonth() === month) {
    const day = date.getDate();
    days.push(day);
    date.setDate(date.getDate() + 1);
  }

  return days;
};

export const getTableColumns = (daysInMonth) => [
    {Header: 'User', id: 'userName', accessor: ({userName}) => userName},
    ...daysInMonth.map((day) => ({Header: day, id: 'userName', accessor: ({userName}) => userName}))

    ]
