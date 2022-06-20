import axiosClient from "../axiosClient";

export default function fetchAllTypesOfContract() {
    return axiosClient
        .get('/types-contract')
        .then((res) => res.data)
        .catch((err) => err);
}