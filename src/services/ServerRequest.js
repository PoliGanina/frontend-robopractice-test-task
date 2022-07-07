import { useQuery } from 'react-query';
import axios from 'axios';

const _transformData = (userScreenTime) => {
    return {
        id: userScreenTime.id,
        userName: userScreenTime.Fullname,
        days: userScreenTime.Days,
    }
}

export const useGetData = () => 
  useQuery('screenTimeData', () => axios
  .get('http://localhost:8080/api/users')
  .then((res) => res.data.map(_transformData)));