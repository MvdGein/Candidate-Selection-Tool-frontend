import axiosSecondClient from "../axiosSecondClient";

export const fetchCandidateByVacancy = async (id) => {
    const data = await axiosSecondClient.get(`/vacancies/${id}/candidates`);

    return data.data; 
}