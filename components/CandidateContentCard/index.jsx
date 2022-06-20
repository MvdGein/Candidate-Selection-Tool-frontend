import * as React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

export const CandidateContentCard = ({ name, vacancy, date }) => {
    return (
        <Box sx={{ display: 'grid', gridTemplateColumns: '2fr 1fr 0.7fr', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar alt="Candidate Avatar" sx={{ mr: 2 }}>
                    <AccountCircleRoundedIcon />
                </Avatar>
                <Box>
                    <Typography>{name}</Typography>
                    <Typography variant="body2">{vacancy}</Typography>
                </Box>
            </Box>
            <Box>
                <Typography variant="body2">{date}</Typography>
            </Box>
            <Button variant="contained" color="secondary" sx={{ maxHeight: 40 }}>
                Zie meer
            </Button>
        </Box>
    );
};

CandidateContentCard.propTypes = {
    name: PropTypes.string.isRequired,
    vacancy: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
};