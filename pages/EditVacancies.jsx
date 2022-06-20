import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { FormVacancies } from 'Components/FormVacancies';

import { fetchVacancyById, updateVacancyDetails } from '../api/Vacancies';

export const EditVacancies = () => {
    const { id } = useParams();
    const [currentVacancy, setCurrentVacancy] = useState({});
    
    const onSubmitUpdate = (data) => updateVacancyDetails(data);

    useEffect(() => {
        fetchVacancyById(id).then(setCurrentVacancy).catch(console.error);
    }, [id]);

    return (
        <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
            <Paper sx={{ p: 3 }}>
                <Typography variant="h1" align="center" sx={{ mb: 2}}>
                    Bewerk de vacature
                </Typography>

                <FormVacancies mainButtonText='Opslaan' defaultValues={currentVacancy} onSubmit={onSubmitUpdate} /> 
            </Paper>
        </Container>
    );
};