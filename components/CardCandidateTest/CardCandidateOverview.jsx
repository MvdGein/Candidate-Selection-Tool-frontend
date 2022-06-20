import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardMedia, Grid, Rating, Typography } from '@mui/material';
import { Box } from '@mui/system';
import './CandidateEvaluationRate.scss'
    
const CardCandidateOverview = ({ data }) => (
    <Card elevation={0} sx={{ padding: '40px' }}>
        <Grid container spacing={2}>
            <Grid item sm={12} md={3}>
                <CardMedia
                    sx={{ borderRadius: '12px', objectFit: 'contain' }}
                    component="img"
                    alt="Rabobank_logo"
                    height="140"
                />
            </Grid>
            <Grid item sm={12} md={5}>
                <Typography variant="h1">{data.candidate_information.name}</Typography>
                <Box sx={{ display: 'flex', alignContent: 'flex-end', gap: '5px'}}>
                    <Typography variant="subtitle1">4</Typography>
                    <Rating readOnly value="4" precision={0.5} />
                </Box>
            </Grid>
        </Grid>
    </Card>
);
    
CardCandidateOverview.propTypes = {
    data: PropTypes.shape({
        candidate_information: PropTypes.shape({
            id: PropTypes.number.isRequired,
            vacancy_id: PropTypes.number.isRequired,
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
    }).isRequired
};
    
export default CardCandidateOverview;