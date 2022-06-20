import axiosClient from '../axiosClient';

export const VacancyToInactive = (id) => {
    return axiosClient.patch(`/vacancies-status-inactive/${id}`);
};