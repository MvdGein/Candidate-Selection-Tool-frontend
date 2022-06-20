import React from 'react';
import { Container, Grid, Typography } from '@mui/material';

import { CardCandidate } from '../components/CardCandidateList/CardCandidate';
import { PositionDetails } from '../components/PositionDetails/index';
import { RecruitmentProcess } from '../components/RecruitmentProcess';
import { OtherPostulations } from '../components/OtherPostulations';

const PositionCardData = {
    id: 1,
    name: 'UX Design',
    user_id: '1',
    startDate: '1991-02-25 00:37:33',
    description:
        'Saepe explicabo aut odio earum hic qui optio et. Ab ea necessitatibus quia inventore ut et. Possimus labore blanditiis debitis enim perspiciatis sit sint illum. Libero et ratione voluptates dolorem quibusdam aut.',
    status: true,
    salary: '9085960',
    company_id: 1,
    typeWork: '2',
    job_location: '83005 Dayana Forks Apt. 953',
    skills: 'typescript,javascript,css',
    hoursWeek: '16',
    experience: '6',
    created_at: '2022-02-15T02:17:33.000000Z',
    updated_at: '2022-02-15T05:39:05.000000Z',
    company: {
        id: 1,
        name: 'Perry Hansen',
    },
};

const CandidateData = {
    id: 1,
    name: 'John Doe',
    profile: 'Fullstack Developer',
    email: 'john@doe.com',
    phone: '5712345678500',
    location: {
        city: 'Bogota',
        country: 'Colombia',
    },
    status: 'Aangemeld',
};

export const StatusDetail = () => {
    return (
        <Container sx={{ pt: 2 }}>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={4}>
                    <Typography variant="h2" mb={2}>
                        Postulant
                    </Typography>
                    <Grid sx={{ mb: 3 }}>
                        <CardCandidate {...CandidateData} isStatus />
                    </Grid>
                    <Grid>
                        <Typography variant="h2" mb={2}>
                            Vacaturedetails
                        </Typography>
                        <PositionDetails {...PositionCardData} />
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <RecruitmentProcess />
                    <OtherPostulations />
                </Grid>
            </Grid>
        </Container>
    );
};