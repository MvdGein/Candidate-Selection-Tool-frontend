import axiosClient from '../axiosClient';

export default async function fetchAllVacancy(userId) {
    try {
        const data = await axiosClient.get('/vacancies');
        const userAll = data.data?.filter((vacancy) => vacancy.user_id !== userId);
        return userAll;
    } catch (error) {
        console.log(error);
    }
}
