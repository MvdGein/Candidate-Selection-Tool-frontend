import axios from 'axios';

export const activeVacancies = async (params) => {
    const data = await axios.post('http://127.0.0.1:8000/api/v1/filter', null, { params });
    const statusActive = data.data?.filter((vacancy) => vacancy.status === true);
    return statusActive;
};