import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Grid, Typography, Avatar, Rating, Chip } from '@mui/material';
import { RadarChart } from '../Charts';
// import companyLogo from '../../assets/platzi-logo.png';

import { RatingContent } from '../RatingContent';

const skills = ["managing", "dynamic", "leadership", "agile"]

const ChartContainer = styled(Grid)`
    position: relative;
    height: 400px;
    width: 100%;

    @media (max-width: 580px) {
        width: 85vw;
    }
`;

const Overview = ({ info }) => (
    <Grid container spacing={2} textAlign="center">
        <Grid item md={3} sm={12} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar alt="Candidate Avatar" sx={{ mr: 2 }}>B
            </Avatar>
            <Grid item>
                <Typography>Deze kandidaat heeft overeenkomende kwaliteiten in skills van de betreffende functie.</Typography>
            </Grid>
            {skills?.map((skill) => (
                <Chip label={skill} key={skill} variant="outlined" color="secondary" />
            ))}
        </Grid>
        <Grid item md={6} sm={12}>
            <ChartContainer>
                <RadarChart info={info} />
            </ChartContainer>
            <Grid>
                <Typography variant="h1">{info.candidate_rating}</Typography>
                <Rating readOnly value={info.candidate_rating} precision={0.5} />
                <Typography>{info.total_evaluations}</Typography>
            </Grid>
        </Grid>
        <Grid item md={3} sm={12} xs={12}>
            <Typography variant="h1" fontSize={20} fontWeight={700}>
                Rating op categorie
            </Typography>
            <RatingContent title="Ambitieaansluiting" rating={info.gral_ambition_rating} />
            <RatingContent title="Managementvaardigheden" rating={info.gral_management_capability_rating} />
            <RatingContent title="Carrièreontwikkeling" rating={info.gral_career_development_rating} />
            <RatingContent title="Skillaansluiting" rating={info.gral_skill_capability_rating} />
        </Grid>
    </Grid>
);

Overview.propTypes = {
    info: PropTypes.shape({
        candidate_information: PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            lastname: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
            linkedin_url: PropTypes.string.isRequired,
            country: PropTypes.string.isRequired,
            job_title: PropTypes.string.isRequired,
        }).isRequired,
        candidate_rating: PropTypes.number.isRequired,
        total_evaluations: PropTypes.number.isRequired,
        gral_ambition_rating: PropTypes.number.isRequired,
        gral_management_capability_rating: PropTypes.number.isRequired,
        gral_career_development_rating: PropTypes.number.isRequired,
        gral_skill_capability_rating: PropTypes.number.isRequired,
    }).isRequired,
};

export default Overview;