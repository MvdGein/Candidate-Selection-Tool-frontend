import axiosClient from "../axiosClient";

export const fetchListTypeContracts = async () => {
    const data = await axiosClient.get('/types-contract');
    return data.data.data;
}