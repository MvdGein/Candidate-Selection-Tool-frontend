import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { ApplicationCard } from './ApplicationCard';
import { GroupSkeleton } from './ApplicationCardSkeleton';

export const ApplicationCardList = ({
    isLoading,
    error,
    interviews,
    cancelModal,
    scheduleModal,
    notificationModal,
    setCurrentInterview,
}) => {
    if (error && !isLoading)
        return (
            <Typography variant="h6" sx={{ textAlign: 'center', mt: 4 }}>
                {error} 🥲
            </Typography>
        );

    return (
        <Fragment>
            {isLoading && <GroupSkeleton />}

            {interviews.length < 1 && !isLoading && (
                <Typography variant="h6" sx={{ textAlign: 'center', mt: 4 }}>
                    Geen sollicitaties gevonden!
                </Typography>
            )}

            {interviews.length > 0 && (
                <Grid container spacing={3} sx={{ my: 2 }}>
                    {interviews.map(
                        ({ id, active, platform, status_finished, url, type, date, vacancy, candidate_id }) => (
                            <Grid item xs={12} sm={6} lg={4} xl={4} key={id}>
                                <ApplicationCard
                                    id={id}
                                    active={active}
                                    platform={platform}
                                    statusFinished={status_finished}
                                    url={url}
                                    type={type}
                                    date={date}
                                    candidateId={candidate_id}
                                    vacancyName={vacancy.name}
                                    cancelModal={cancelModal}
                                    scheduleModal={scheduleModal}
                                    notificationModal={notificationModal}
                                    setCurrentInterview={setCurrentInterview}
                                />
                            </Grid>
                        ),
                    )}
                </Grid>
            )}
        </Fragment>
    );
};

ApplicationCardList.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    interviews: PropTypes.arrayOf(PropTypes.object).isRequired,
    cancelModal: PropTypes.func.isRequired,
    scheduleModal: PropTypes.func.isRequired,
    notificationModal: PropTypes.func.isRequired,
    setCurrentInterview: PropTypes.func.isRequired,
};

ApplicationCardList.defaultProps = {
    error: '',
};