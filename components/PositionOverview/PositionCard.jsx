import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import PositionDetailsModal from 'Components/PositionDetailsModal';

const PositionCard = ({ position }) => {
    const [showDetail, setShowDetail] = useState(false);
    const handleOpenClose = () => setShowDetail(!showDetail);

    return (
        <Card sx={{ p:2, boxShadow: 3, mt: 2 }}>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={12} md={10}>
                    <Typography sx={{ mb: 4 }} variant="h2">
                        {position.functie}
                    </Typography>
                    <Typography sx={{ mb: 4 }}>{position.description}</Typography>
                    <Typography>{position.daterequest}</Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={2} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Button onClick={handleOpenClose} variant="contained" color="secondary" size="large">
                        Details
                    </Button>
                </Grid>
            </Grid>
            <PositionDetailsModal showDetail={showDetail} handleOpenClose={handleOpenClose} vacancyInfo={position} />
        </Card>
    );
};

PositionCard.propTypes = {
    position: PropTypes.shape({
        functie: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        daterequest: PropTypes.string.isRequired,
    }).isRequired,
};

export default PositionCard; 