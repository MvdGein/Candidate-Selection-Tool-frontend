import axiosSecondClient from "../axiosSecondClient";

export default function registerCandidate(data) {
    return axiosSecondClient.post('candidates', data, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })

}