import React from 'react';

import Typography from '@mui/material/Typography';

export const NoVacancies = () => {
    return (
        <Typography variant="h6" sx={{ textAlign: 'center', mt: 4 }}>
            Er zijn geen vacatures gevonden!
        </Typography>
    );
};