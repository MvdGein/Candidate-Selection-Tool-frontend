import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Container, Grid, Typography, Box } from '@mui/material';
// import { Applicants } from '../components/CardApplicantList';
import { PositionDetails } from 'Components/PositionDetails/index';
import { CandidatesTest } from 'Components/CardCandidateTest';
// import { ApplicantComparison } from '../components/ApplicantComparison';
// import { RecommendedApplicant } from '../components/RecomendedApplicant';
// import { SuccessfulApplicant } from '../components/SuccessfulApplicant';
import { CardNoCandidate } from '../components/CardNoCandidate';
import { fetchVacancyById } from '../api/Vacancies';
import '../style/listCandidatesVacancies.scss';
import { fetchCandidateByVacancy } from '../api/Candidates/fetchCandidateByVacancy';
import { getApplicantsTest } from '../api/Candidates/fetchCandidateScoresTest';


export const ListCandidatesVacancies = () => {
    const { id } = useParams();
    const [data, setData] = useState({
        vacancy: {},
        postulants: [],
        candidatesTest: [],
    });

    const [hidden] = useState(true);

    const fetchData = async () => {
        try {
            const vacancy = await fetchVacancyById(id);
            const postulants = await fetchCandidateByVacancy(id);
            const candidatesTest = await getApplicantsTest(id);
            setData({ vacancy, postulants, candidatesTest });
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    return (
        <Container sx={{ mt: 5, mb: 5 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                    <Typography variant="h2" mb={2}>
                        Vacaturegegevens
                    </Typography>
                    <PositionDetails positionInfo={data.vacancy} />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Typography variant="h2" mb={2}>
                        Matchresultaten
                    </Typography>
                    {data.candidatesTest.message ? (
                        <CardNoCandidate {...data.candidatesTest} />
                    ) : (
                        <CandidatesTest data={data.candidatesTest} />
                    )}
                </Grid>
                {hidden ? (
                    <Box />
                ) : (
                    <Box>
                        <Grid item xs={3.5}>
                            <SuccessfulApplicant />
                        </Grid>
                        <Grid item xs={4}>
                            <RecommendedApplicant />
                        </Grid>
                    </Box>
                )}
            </Grid>
        </Container>
    );
};