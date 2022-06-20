import axiosClient from '../axiosClient';

export default async function fetchVacanciesByUser(userId) {
    try {
        const data = await axiosClient.get(`/vacancies?user_id=${userId}`);
        const vacancies = data.data;

        return vacancies;
    } catch (error) {
        console.log(error);
    }
}


