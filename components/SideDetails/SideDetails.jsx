import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import StarIcon from '@mui/icons-material/Star';
import { Grid, Box, Typography, Button, SwipeableDrawer } from '@mui/material';

import { RatingContent } from '../RatingContent';

import { useMediaQueryContext } from '../../context/MediaQueryContext';

const globalStyles = (isMobile) => ({
    '.MuiDrawer-root > .MuiPaper-root': {
        height: '30rem',
        top: '20%',
        borderRadius: '20px',
        width: isMobile.small ? '90%' : '25rem',
    },
});

const GridContainer = styled(Grid)(() => ({
    display: 'flex',
    flexDirection: 'column',
    padding: '30px 30px',
    height: '100%',
    justifyContent: 'space-between',
}));

const GridFlex = styled(Grid)(() => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
}));

const SideDetails = ({ info }) => {
    const [open, setOpen] = useState(false);

    const isMobile = useMediaQueryContext();

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    return (
        <Box>
            <Global styles={globalStyles(isMobile)} />
            <Box sx={{ position: 'fixed', top: '50%', right: '0' }}>
                <Button onClick={toggleDrawer(true)} role="button">
                    <ArrowLeftIcon sx={{ fontSize: '3rem' }} />
                </Button>
            </Box>
            <SwipeableDrawer
                anchor="right"
                open={open}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                disableSwipeToOpen={false}
                ModalProps={{
                    keepMounted: true,
                }}
            >
                <GridContainer container>
                    <GridFlex item>
                        <Grid>
                            <Typography variant="h2" fontSize={25} fontWeight={800}>
                                Algemene beoordeling
                            </Typography>
                            <Typography variant="body1" fontSize={16}>
                                Gebaseerd op {info.total_evaluations} reviews
                            </Typography>
                        </Grid>
                        <GridFlex item>
                            <Typography variant="h1" fontSize={25} margin="0 7px">
                                {info.candidate_rating}
                            </Typography>
                            <StarIcon sx={{ color: '#edd309', fontSize: '30px' }} />
                        </GridFlex>
                    </GridFlex>
                    <Grid item>
                        <Typography variant="h2" fontSize={17} fontWeight={700}>
                            Beoordeling op categorie
                        </Typography>
                        <RatingContent title="Ambitieaansluiting" rating={info.gral_ambition_rating} />
                        <RatingContent title="Managementvaardigheden" rating={info.gral_management_capability_rating} />
                        <RatingContent title="Carrièreontwikkeling" rating={info.gral_career_development_rating} />
                        <RatingContent title="Skillaansluiting" rating={info.gral_skill_capability_rating} />
                    </Grid>
                </GridContainer>
            </SwipeableDrawer>
        </Box>
    );
};

SideDetails.propTypes = {
    info: PropTypes.shape({
        candidate_information: PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            lastname: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
            linkedin_url: PropTypes.string.isRequired,
            country: PropTypes.string.isRequired,
            job_title: PropTypes.string.isRequired,
        }).isRequired,
        candidate_rating: PropTypes.number.isRequired,
        total_evaluations: PropTypes.number.isRequired,
        gral_ambition_rating: PropTypes.number.isRequired,
        gral_management_capability_rating: PropTypes.number.isRequired,
        gral_career_development_rating: PropTypes.number.isRequired,
        gral_skill_capability_rating: PropTypes.number.isRequired,
    }).isRequired,
};

export default SideDetails;
