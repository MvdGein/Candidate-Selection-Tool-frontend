import axiosClient from "../axiosClient"

export default function fetchAllSkills() {
    return axiosClient
        .get('/skills')
        .then((res) => res.data)
        .catch((err) => err);
}