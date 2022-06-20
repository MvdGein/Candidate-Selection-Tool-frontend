import * as React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

export const VacancyContentCard = ({ vacancy, applications, date }) => {
    const label = `${applications} aangemeld`;

    return (
        <Box sx={{ display: 'grid', gridTemplateColumns: '2fr 1fr 0.7fr', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box>
                    <Typography>{vacancy}</Typography>
                    <Chip label={label} variant="outlined" sx={{ mt: 0.5 }} />
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

VacancyContentCard.propTypes = {
    vacancy: PropTypes.string.isRequired,
    applications: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
};