import axiosSecondClient from '../axiosSecondClient';

export const getApplicantsTest = async (id) => {
    const data = await axiosSecondClient.get(`/dummy/${id}`);

    return data.data;
};