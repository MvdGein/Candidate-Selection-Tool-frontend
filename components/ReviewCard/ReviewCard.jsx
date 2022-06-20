import React, { useState } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
    Box,
    Card,
    Rating,
    Typography,
    CardHeader,
    CardContent,
    CardActions,
    ToggleButtonGroup,
    ToggleButton,
} from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { UtilityModal } from '../UtilityModal';
import { SubmitModal } from '../SubmitModal';
import config from '../../config';

const StyledRating = styled(Rating)`
    font-size: 1rem;
`;

const HeaderReview = ({ rating }) => (
    <Box>
        <Typography sx={{ ml: 3 }} variant="subtitle1">
            {rating > 0 ? rating.toFixed(1) : 'NA'}
        </Typography>
        <StyledRating name="read-only" value={rating > 0 ? rating : 0} readOnly />
    </Box>
);

const SubheaderReview = ({ created_at, job_title }) => (
    <Box>
        <Typography variant="body2">{job_title}</Typography>
        <Typography variant="body2">
            {moment(created_at).format('MMM DD, YYYY')}
        </Typography>
    </Box>
);

const ActionsReview = ({ review_id, utility_counter, handleReload }) => {
    const [utilityError, setUtilityError] = useState(false);
    const [utilitySuccess, setUtilitySuccess] = useState(false);
    const [utility, setUtility] = useState('');
    const [openSuccessModal, setOpenSuccessModal] = useState(false);

    const handleLikes = (e, newValue) => {
        const route = `increase-${newValue === 'like' ? 'utility' : 'non-utility'}-rating`;
        const url = `${config.api}candidate-evaluations/${review_id}/${route}`;
        fetch(url, {
            method: 'PATCH',
            headers: config.headers,
        })
            .then((res) => res.json())
            .then((data) => (data?.id ? setUtilitySuccess(true) : setUtilityError(true)))
            .catch(() => setUtilityError(true));
        setUtility(newValue);
        handleReload();
    };

    const handleCloseSended = () => {
        setOpenSuccessModal(false);
    };

    const handleUtilityModal = () => {
        setUtilityError(false);
        setUtilitySuccess(false);
    };

    return (
        <CardContent>
            <Typography variant="body1">Was deze evaluatie nuttig?</Typography>
            <CardActions disableSpacing>
                <ToggleButtonGroup
                    exclusive
                    color="primary"
                    value={utility}
                    sx={{ '.MuiToggleButtonGroup-grouped': { border: 'none' } }}
                    onChange={handleLikes}
                >
                    <ToggleButton title={utility_counter} value="like">
                        <ThumbUpAltIcon />
                        <Typography variant="button2">Ja</Typography>
                    </ToggleButton>
                </ToggleButtonGroup>
            </CardActions>
            <UtilityModal
                handleClose={handleUtilityModal}
                open={utilityError || utilitySuccess}
                message={utilitySuccess ? 'Dank voor uw medewerking! :)' : 'Een probleem heeft zich voorgespeeld, probeer het a.u.b. opnieuw'}
            />
            <SubmitModal
                open={openSuccessModal}
                handleClose={handleCloseSended}
                message="Dit rapport is verzonden."
            />
        </CardContent>
    );
};

const ReviewCard = ({ review, handleReload }) => {
    const {
        job_title,
        created_at,
        id,
        content_type,
        utility_counter,
        rating,
    } = review;

    return (
        <Card sx={{ border: 1, minHeight: 350, maxHeight: 350 }}>
            <CardHeader
                title={<HeaderReview rating={rating || -1} />}
                subheader={
                    <SubheaderReview
                        created_at={created_at}
                        job_title={job_title}
                    />
                }
            />
            <CardContent sx={{ minHeight: 100, maxHeight: 100 }}>
                <Typography variant="body1">{content_type}</Typography>
            </CardContent>
            <ActionsReview
                review_id={id}
                utility_counter={utility_counter}
                handleReload={handleReload}
            />
        </Card>
    );
};

HeaderReview.propTypes = {
    rating: PropTypes.number.isRequired,
};

SubheaderReview.propTypes = {
    created_at: PropTypes.string.isRequired,
    job_title: PropTypes.string.isRequired,
};

ActionsReview.propTypes = {
    review_id: PropTypes.number.isRequired,
    utility_counter: PropTypes.number.isRequired,
    handleReload: PropTypes.func.isRequired,
};

ReviewCard.propTypes = {
    review: PropTypes.shape({
        id: PropTypes.number.isRequired,
        content_type: PropTypes.string.isRequired,
        created_at: PropTypes.string.isRequired,
        job_title: PropTypes.string.isRequired,
        utility_counter: PropTypes.number.isRequired,
        rating: PropTypes.number,
    }).isRequired,
    handleReload: PropTypes.func.isRequired,
};

export default ReviewCard;
