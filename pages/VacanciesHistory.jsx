import React from 'react';

import Container from '@mui/material/Container';

import { Vacancies } from '../components/Vacancies';

export const VacanciesHistory = () => {
    return (
        <Container sx={{ my: 2 }}>
            <Vacancies />
        </Container>
    );
};