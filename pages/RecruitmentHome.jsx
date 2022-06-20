import React from 'react';
import { Container, Grid } from '@mui/material';

import { HomeStatsCard } from 'Components/HomeStatsCard';
import { MainScheduleOverview } from 'Components/MainScheduleOverview';

import { NewCandidates } from 'Components/NewCandidates';

import { NewVacancies } from 'Components/NewVacancies';

const fakeStats = [
    {
        id: 1,
        stat: 2,
        title: 'Vacatures actief',
    },
    {
        id: 2,
        stat: 0,
        title: 'Vacatures inactief',
    },
    {
        id: 3,
        stat: 3,
        title: 'Acties vereist',
    },
    {
        id: 4,
        stat: 6,
        title: 'Aanmeldingen',
    },
];

export const RecruitmentHome = () => {
    return (
        <Container sx={{ pt: 2 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Grid container justifyContent="flex-end" spacing={4}>
                        {fakeStats.map(({ id, stat, title }) => (
                            <Grid item xs={6} sm={3} md={2} key={id}>
                                <HomeStatsCard stat={stat} title={title} />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12} sx={{ py: 2 }}>
                    <MainScheduleOverview />
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <NewCandidates />
                </Grid>
                <Grid item xs={12} md={6}>
                    <NewVacancies />
                </Grid>
            </Grid>
        </Container>
    );
};