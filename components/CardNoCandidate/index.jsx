import React from 'react';
import PropTypes from 'prop-types';

import { Box, Typography, Card, Avatar } from '@mui/material';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

export const CardNoCandidate = ({ message }) => {
    return (
        <Card sx={{ p: 2, mb: 2 }} elevation={3}>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: '0.5fr 2fr 0.3fr',
                    mb: 4,
                    alignItems: 'center',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Avatar alt="Candidate Avatar" sx={{ mr: 2 }}>
                        <AccountCircleRoundedIcon />    
                    </Avatar> 
                </Box>
                <Box>
                    <Typography variant="h3">{message}</Typography>
                </Box>
            </Box>
        </Card>
    );
};

CardNoCandidate.propTypes = {
    message: PropTypes.string.isRequired,
};