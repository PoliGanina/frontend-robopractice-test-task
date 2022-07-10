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
        const dayOfMonth = new Date(info.Date).getDate();

        return { date: dayOfMonth, differenceMinutes };
      }),
    };
  });



export const getDataWithAvailiability = (tableData, daysInMonth) =>
  tableData.map(({ days, ...rest }) => {
    const totalScreenTime = days.reduceRight(
      (acc, date) => acc + date.differenceMinutes,
      0
    );
    const arrScreenTime = daysInMonth.map((day) => {
      const relevantDay = days.find((item) => item.date === day);
      return relevantDay ? relevantDay.differenceMinutes: 0;
    });

    return {
      days: arrScreenTime,
      ...rest,
      totalScreenTime: totalScreenTime,
    };
  });

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
