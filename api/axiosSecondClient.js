import axios from 'axios';

const axiosSecondClient = axios.create();

axiosSecondClient.defaults.baseURL = process.env.EVALUATIONS_API;

axiosSecondClient.defaults.header = {
    'Content-Type': 'application/json',
};

export default axiosSecondClient;