import axiosClient from '../axiosClient';

export default function sendDescription({ id, ...data }) {
    const formatData = {
        description: data.description,
    };

    return axiosClient.put(`/dummy/${id}`, formatData);
}