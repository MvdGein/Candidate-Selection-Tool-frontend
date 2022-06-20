/* eslint-disable camelcase */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { registerCandidate } from '../../api/Candidates';
import { SubmitForm } from '../SubmitForm';
import ApplyApplicantModal from './ApplyApplicantModal';

const initialState = {
    vacancy_id: null,
    name: '',
    lastname: '',
    email: '',
    country: null,
    cv_file: null,
    motivation_letter_file: '',
    job_title: '',
    linkedin_url: '',
};

const ApplyApplicantForm = ({ open, setOpen, id }) => {
    const [candidateData, setCandidateData] = useState({ ...initialState, vacancy_id: id });
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [sended, setSended] = useState(false);

    const handleCloseSended = () => {
        setOpen(false);
        setSended(false);
    };

    const handleClose = () => setOpen(false);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setCandidateData({ ...candidateData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const {
            vacancy_id,
            name,
            lastname,
            email,
            country,
            cv_file,
            motivation_letter_file,
            job_title,
            linkedin_url,
        } = candidateData;

        const data = new FormData();
        data.append('vacancy_id', vacancy_id);
        data.append('name', name);
        data.append('lastname', lastname);
        data.append('email', email);
        data.append('country', country?.country);
        data.append('cv_file', cv_file);
        data.append('motivation_letter_file', motivation_letter_file);
        data.append('job_title', job_title);
        data.append('linkedin_url', linkedin_url);

        setSended(true);
        setOpen(true);

        registerCandidate(data)
            .then((res) => {
                if (res.status === 201) {
                    setIsLoading(false);
                    setError(false);
                } else {
                    setIsLoading(false);
                    setError(true);
                }
                setCandidateData(initialState);
            })
            .catch(() => {
                setIsLoading(false);
                setError(true);
            });
    };

    return !sended ? (
        <ApplyApplicantModal
            open={open}
            handleClose={handleClose}
            handleSubmit={handleSubmit}
            handleInput={handleInput}
            setCandidateData={setCandidateData}
            candidateData={candidateData}
        />
    ) : (
        <SubmitForm open={open} loading={isLoading} error={error} handleClose={handleCloseSended} />
    );
};

ApplyApplicantForm.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
};

export default ApplyApplicantForm;