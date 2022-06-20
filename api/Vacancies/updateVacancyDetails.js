import axiosClient from '../axiosClient';

export default function updateVacancyDetails({ id, ...data }) {
    const formatData = {
        refnummer: data.refnummer,
        functie: data.functie,
        user_id: data.user_id,
        description: data.description,
        status: data.status,
        typecontract: data.typecontract,
        daterequest: data.daterequest,
        skills: data.skills.join(),
        hiringmanager: data.hiringmanager
    };

    return axiosClient.put(`/vacancies/${id}`, formatData);
}