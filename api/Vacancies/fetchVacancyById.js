import axiosClient from '../axiosClient';

export default async function fetchVacancyById(id) {
    try {
        const data = await axiosClient.get(`/vacancies/${id}`);
        const vacancy = data.data[0];

        return {
            id: vacancy.id,
            refnummer: vacancy.refnummer,
            functie: vacancy.functie,
            user_id: vacancy.user_id,
            description: vacancy.description,
            status: vacancy.status,
            'type-contract': vacancy.typecontract,
            typecontract: vacancy.typecontract,
            daterequest: vacancy.daterequest,
            skills: vacancy.skills,
            hiringmanager: vacancy.hiringmanager
        };
    } catch (error) {
        console.log(error);
    }
}