import axiosSecondClient from "../axiosSecondClient";

export const fetchCandidateById = async (id) => {
    const data = await axiosSecondClient.get(`/candidates/${id}`);

    return data.data; 
}