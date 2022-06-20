import React from 'react';
import PropTypes from 'prop-types';

import { Box, Card, CardContent, Typography } from '@mui/material';

export const HomeStatsCard = ({ stat, title }) => {
    return (
        <Box>
            <Card sx={{ width: 170 }} elevation={3}>
                <CardContent>
                    <Typography variant="h2" align="left">
                        {stat}
                    </Typography>
                    <Typography>{title}</Typography>
                </CardContent>
            </Card>
        </Box>
    );
};

HomeStatsCard.propTypes = {
    stat: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
};