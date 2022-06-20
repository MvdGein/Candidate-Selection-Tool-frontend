import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import moment from 'moment';
import { Button, Grid } from '@mui/material';
import { SubmitModal } from '../SubmitModal';
import CandidateReviewModal from './CandidateReviewModal';
import api from '../../services/api';

const CandidateReviewForm = ({ candidate_id, vacancy_id, handleReload }) => {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const [modalError, setModalError] = useState('');
    const [sended, setSended] = useState(false);

    const initialReviewState = {
        candidate_id,
        vacancy_id,
        job_title: '',
        employee_email: '',
        content_type: '',
        ambition_rating: '',
        management_capability_rating: '',
        career_development_rating: '',
        skill_capability_rating: '',
    };

    const [review, setReview] = useState(initialReviewState);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleCloseSended = () => {
        setOpen(false);
        setSended(false);
    };

    const handleInput = (e) => {
        const { name, value } = e.target;
        setReview({...review, [name]: value });
    };

    const handleSubmit = () => {
        setSended(true);
        setIsLoading(true);
        api.candidateEvaluations
            .sendReview(candidate_id, review)
            .then((res) => {
                if (res && res.ok) {
                    setIsLoading(false);
                    setError(false);
                } else {
                    setIsLoading(false);
                    setError(true);
                }
                setReview(initialReviewState);
                handleReload();
            })
            .catch(() => {
                setIsLoading(false);
                setError(true);
            });
    };

    const handleValidate = (e) => {
        e.preventDefault();
        const {
            ambition_rating,
            management_capability_rating,
            career_development_rating,
            skill_capability_rating,
        } = review;

        if (
            !ambition_rating ||
            !management_capability_rating ||
            !career_development_rating ||
            !skill_capability_rating
        ) {
            setModalError('Gelieve alle velden in te vullen');
        } else {
            setModalError('');
            handleSubmit();
        }
    };

    return (
        <div>
            <Grid item md={12} sx={{ display: 'grid', justifyContent: 'flex-end' }}>
                <Button onClick={handleOpen} variant="outlined">
                    Voeg een evaluatie toe
                </Button>
            </Grid>
            {!sended ? (
                <CandidateReviewModal
                    open={open}
                    handleClose={handleClose}
                    handleValidate={handleValidate}
                    modalError={modalError}
                    review={review}
                    handleInput={handleInput}
                />
            ) : (
                <SubmitModal open={open} loading={isLoading} error={error} handleClose={handleCloseSended} />
            )}
        </div>
    );
};

CandidateReviewForm.propTypes = {
    candidate_id: PropTypes.number.isRequired,
    vacancy_id: PropTypes.number.isRequired,
    handleReload: PropTypes.func.isRequired,
};

export default CandidateReviewForm;