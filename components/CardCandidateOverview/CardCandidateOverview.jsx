import React from 'react';
import PropTypes from 'prop-types';
import { Card, Typography, Chip } from '@mui/material';
import { Box } from '@mui/system';
    
const CardCandidateOverview = ({ data }) => (
    <Card elevation={5} sx={{ padding: '40px' }}>
        <div className='columns is-clickable' onClick={() => toggleExpansion()}>
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "0.5fr 2fr 0.3fr",
                        mb: 4,
                        alignItems: "center"
                    }}
                >
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: "0.5fr 2fr 0.3fr",
                            alignItems: "center"
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                ml: "0.5rem"
                            }}
                        />
                        <Box>
                            <Typography variant="h5">{data.candidate_information ? data.candidate_information?.name : ""}</Typography>
                            <Typography variant="body2">{data.candidate_information ? data.candidate_information.job_title : ""}</Typography>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            mx: "1rem"
                        }}
                    >
                        <Typography variant="body2">Aangemeld op</Typography>
                        16-05-2022
                        <Typography variant="body2">Laatst gewijzigd op</Typography>
                        {data.candidate_information.updated_at}
                        <Typography variant="body2">E-mailadres</Typography>
                        {data.candidate_information.email}
                        <Typography variant="body2">LinkedIn</Typography>
                        {data.candidate_information.linkedin_url}
                        <Typography variant="body2">Geboorteland</Typography>
                        {data.candidate_information.country}
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "flex-start",
                                gap: 2
                            }}
                        />
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "flex-start",
                                gap: 2
                            }}
                        />
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "flex-end",
                        justifyContent: "space-between"
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "column",
                            justifyContent: "center"
                        }}
                    >
                        <Typography variant="body2">Status</Typography>
                        <Chip label="Applied" color="secondary" size="small" />
                    </Box>
                </Box>
            </div>
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
            updated_at: PropTypes.string.isRequired,
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