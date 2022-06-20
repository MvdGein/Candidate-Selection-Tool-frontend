import axiosClient from "../axiosClient";

export default function fetchAllCandidateScores() {
    return axiosClient
    .get('/dummy')
    .catch((err) => err);
}