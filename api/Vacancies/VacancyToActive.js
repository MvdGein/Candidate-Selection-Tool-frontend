import axiosClient from "../axiosClient";

export const VacancyToActive = (id) => {
    return axiosClient.patch(`/vacancies-status-active/${id}`);
};