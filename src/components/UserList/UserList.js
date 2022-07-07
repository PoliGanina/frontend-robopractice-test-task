import { differenceInMinutes, parse } from "date-fns";
import { useMemo } from "react";
import { useGetData } from "../../services/ServerRequest";

const UserList = () => {
  const { data = [], isFetching } = useGetData();
  const tableData = useMemo(
    () =>
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
      }),
    [data]
  );

};

export default UserList;
