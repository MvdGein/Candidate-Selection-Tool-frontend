import React from 'react';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export const Filters = () => {
    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }} component="form">
            <TextField id="outlined-uncontrolled" label="Type contract" />
            <TextField id="outlined-uncontrolled" label="Hiring Manager" />
            <TextField id="outlined-uncontrolled" label="Functietitel" />
            <TextField id="outlined-uncontrolled" label="Meer filters" />
            <Button type="button" variant="contained">
                Zoek
            </Button>
        </Box>
    );
};