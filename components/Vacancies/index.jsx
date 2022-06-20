import React, { useState, useEffect, Fragment } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

// import { Button } from '@mui/material';
// import Container from '@mui/material/Container';
// import JobOffers from 'Components/JobOffers';
import fetchVacanciesByUser from '../../api/Vacancies/fetchVacanciesByUser';

import { Filters } from './Filters';
import { NoVacancies } from './NoVacancies';
import { SkeletonVacancy } from './SkeletonVacancy';
import { VacancyCard } from './VacancyCard';
import { VacancyCardGeneral } from './VacancyCardGeneral';
import { Title, Header } from './styles';
import fetchAllVacancy from '../../api/Vacancies/allVacancies';

export const Vacancies = () => {
    const [data, setData] = useState([]);
    const [allVacancies, setAllVacancies] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth0();

    useEffect(() => {
        fetchVacanciesByUser(user.sub).then((response) => {
            setLoading(false);
            setData(response);
        });
    }, [user.sub]);

    useEffect(() => {
        fetchAllVacancy(user.sub)
        .then((response) => {
            setAllVacancies(response);
        });
    }, [user.sub]);

    return (
        <Fragment>
            <Filters />
            <Header>
                <Title>Mijn vacatures</Title>
            </Header>

            {loading && <SkeletonVacancy />}

            {data.length > 0 &&
                data.map((vacancy) => (
                    <VacancyCard
                        title={vacancy.functie}
                        date={new Date()}
                        checked={vacancy.status}
                        salary={vacancy.daterequest}
                        modality={vacancy.typecontract}
                        applies={5}
                        description={vacancy.description}
                        id={vacancy.id}
                        key={vacancy.id}
                    />
                ))}
            {data.length === 0 && !loading && <NoVacancies />}
            <Header>
                <Title>Alle vacatures</Title>
            </Header>

            {allVacancies.length > 0 &&
                allVacancies.map((vacancy) => (
                    <VacancyCardGeneral
                        title={vacancy.functie}
                        date={new Date()}
                        checked={vacancy.status}
                        salary={vacancy.daterequest}
                        modality={vacancy.typecontract}
                        applies={1}
                        description={vacancy.description}
                        id={vacancy.id}
                        key={vacancy.id}
                    />
                ))}

            {allVacancies.length === 0 && !loading && <NoVacancies />}
        </Fragment>
    );
};