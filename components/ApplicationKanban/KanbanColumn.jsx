import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Box, Typography, Card } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { CardCandidate } from 'Components/CardCandidateList/CardCandidate';
import { LoadingCardsSkeleton } from 'Components/CardCandidateList/CardCandidateSkeleton';

export const KanbanColumn = ({ columnData: { name, data } }) => {
    return (
        <Box>
            <Typography variant="h2" align="center" sx={{ mb: 2 }}>
                {name}
            </Typography>
            <Card sx={{ maxHeight: 700, overflow: 'auto' }} elevation={3}>
                {data.length > 0 ? (
                    data.map((app) => (
                        <Grid sx={{ mb: 2 }} key={uuidv4()}>
                            <CardCandidate
                                key={app.id}
                                candidate={app}
                                isStatus={false}
                                isList={false}
                            />
                        </Grid>
                    ))
                ) : (
                    <LoadingCardsSkeleton />
                )}
            </Card>
        </Box>
    );
};

KanbanColumn.propTypes = {
    columnData: PropTypes.shape({
        name: PropTypes.string.isRequired,
        data: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string.isRequired,
                lastname: PropTypes.string.isRequired,
                job_title: PropTypes.string,
                email: PropTypes.string.isRequired,
                country: PropTypes.string.isRequired,
                recruitment_status: PropTypes.shape({
                    name: PropTypes.string,
                }).isRequired,
            }).isRequired,
        ),
    }).isRequired,
};