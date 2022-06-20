import React from 'react';
import PropTypes from 'prop-types';

import { Card } from '@mui/material';
import { LoadingCardsSkeleton } from './CardCandidateSkeleton';

import { CardCandidate } from './CardCandidateTest';

export const CandidatesTest = ({ data }) => {
    return (
        <Card sx={{ maxHeight: 500, overflow: 'auto', width: "100%" }} elevation={3}>
            {data.length > 0 ? (
                data?.map((candidate) => (
                    <CardCandidate key={candidate.id} candidate={candidate} />
                ))
            ) : (
                <LoadingCardsSkeleton />
            )}
        </Card>
    );
};

CandidatesTest.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            personal_details: PropTypes.shape({
                name: PropTypes.string,
                email: PropTypes.string,
                mobile_number: PropTypes.string,
            }).isRequired,
            education: PropTypes.string.isRequired,
            total_experience: PropTypes.number.isRequired,
            skills: PropTypes.arrayOf(PropTypes.string),
            score: PropTypes.number.isRequired,
            experience: PropTypes.number.isRequired,
        }).isRequired,
    ),
};

CandidatesTest.defaultProps = {
    data: {
        score: 0,
    },
};