import axios from 'axios';

export const fetchStatusOfApplicationVacancy = async ({ code, lastname }) => {
    const { data } = await axios.get(`http://127.0.0.1:8000/api/v1/candidates/${code}/${lastname}/candidate-evaluation`);
    return data;
};