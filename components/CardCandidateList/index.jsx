import React from 'react';
import PropTypes from 'prop-types';

import { Card } from '@mui/material';
import { LoadingCardsSkeleton } from '../../src/components/CardCandidateList/CardCandidateSkeleton';

import { CardCandidate } from './CardCandidate';

export const Candidates = ({ data }) => {
    return (
        <Card sx={{ maxHeight: 500, overflow: 'auto' }} elevation={3}>
            {data.length > 0 ? (
                data?.map((candidate) => (
                    <CardCandidate key={candidate.id} candidate={candidate} isStatus isList />
                ))
            ) : (
                <LoadingCardsSkeleton />
            )}
        </Card>
    );
};

Candidates.propTypes = {
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
};

Candidates.defaultProps = {
    data: {
        job_title: '',
    },
};