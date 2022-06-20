import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import { Chip, IconButton, Typography } from '@mui/material';
import { helpColor, sum } from '../PositionOverview/helpers';

import ApplyApplicantForm from '../ApplyApplicantForm';

const PositionDetailsModal = ({ showDetail, handleOpenClose, vacancyInfo }) => {
    const {
        id,
        daterequest,
        description,
        skills,
        functie,
        typecontract,
        status,
        refnummer,
        hiringmanager,
        tracking_code,
        recruitment_status,
        candidate_evaluations,
    } = vacancyInfo;

    const [openApplyModal, setOpenApplyModal] = useState(false);

    return (
        <Dialog open={showDetail} onClose={handleOpenClose}>
            <IconButton
                aria-label="close"
                onClick={handleOpenClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                }}
            >
                <CloseIcon />
            </IconButton>
            <Box component="div" sx={{ padding: '20px', minWidth: 550 }}>
                <Box
                    component="div"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                        marginTop: '15px',
                    }}
                >
                    <DialogTitle sx={{ textAlign: 'center', padding: '5px', fontWeight: 600 }}>{functie}</DialogTitle>
                    <Typography variant="h3" component="h3" sx={{ fontSize: '13px' }}>
                        {refnummer}
                    </Typography>
                </Box>
                <Box component="div">
                    <DialogContent>
                        <Typography variant="h2" component="h2">
                            Beschrijving
                        </Typography>
                        <Typography variant="p" component="p" sx={{ marginTop: '10px' }}>
                            {description}
                        </Typography>
                        <Typography variant="h2" component="h2" sx={{ marginTop: '20px' }}>
                            Skills en vaardigheden
                        </Typography>
                        <Box sx={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap', gap: '10px'}}>
                            {skills?.map((skill) => (
                                <Chip label={skill} key={skill} variant="outlined" color="secondary" />
                            ))}
                        </Box>
                        <Typography variant="h2" component="h2" sx={{ marginTop: '20px' }}>
                            Functiedetails
                        </Typography>
                        <ul>
                            <li>
                                <Typography variant="p" component="p" sx={{ marginTop: '10px' }}>
                                    <b>Type contract: </b>
                                    {typecontract}
                                </Typography>
                            </li>
                            <li>
                                <Typography variant="p" component="p" sx={{ marginTop: '10px' }}>
                                    <b>Job Requisition Status: </b>
                                    {status}
                                </Typography>
                            </li>
                            <li>
                                <Typography variant="p" component="p" sx={{ marginTop: '10px' }}>
                                    <b>Publicatiedatum: </b>
                                    {daterequest}
                                </Typography>
                            </li>
                            <li>
                                <Typography variant="p" component="p" sx={{ marginTop: '10px' }}>
                                    <b>Hiring Manager: </b>
                                    {hiringmanager}
                                </Typography>
                            </li>
                            {recruitment_status && (
                                <li>
                                    <div
                                        style={{
                                            display: 'flex',
                                            gap: '10px',
                                            alignItems: 'center',
                                            marginTop: '10px',
                                        }}
                                    >
                                        <Typography variant="p" component="p">
                                            <b>Sollicitatie status: </b>
                                        </Typography>
                                        <Chip
                                            label={recruitment_status?.name}
                                            color={helpColor(recruitment_status?.id)}
                                        />
                                    </div>
                                </li>
                            )}
                        </ul>
                        {!!candidate_evaluations?.length && (
                            <div
                                style={{
                                    marginTop: '20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Typography variant="h2" component="h2">
                                    Laatste evaluatie
                                </Typography>
                                <Chip color="primary" size="large" label={`${sum(candidate_evaluations[0])} / 5`} />
                            </div>
                        )}
                    </DialogContent>
                    {!tracking_code && (
                        <DialogActions sx={{ display: 'flex', justifyContent: 'space-around', mb: 3 }}>
                            <Button 
                                // onClick={() => setOpenApplyModal(true)} 
                                size="large" 
                                variant="contained">
                                Aanmelden
                            </Button>
                        </DialogActions>
                    )}
                </Box>
            </Box>
            <ApplyApplicantForm open={openApplyModal} setOpen={setOpenApplyModal} id={id} />
        </Dialog>
    );
};

PositionDetailsModal.propTypes = {
    handleOpenClose: PropTypes.func.isRequired,
    showDetail: PropTypes.bool.isRequired,
    vacancyInfo: PropTypes.shape({
        id: PropTypes.number.isRequired,
        recruitment_status: PropTypes.shape({
            name: PropTypes.string,
            id: PropTypes.number,
        }),
        candidate_evaluations: PropTypes.arrayOf(
            PropTypes.shape({
                candidate_id: PropTypes.number,
                candidate_name: PropTypes.string,
            }),
        ),
        description: PropTypes.string,
        skills: PropTypes.arrayOf(PropTypes.string),
        functie: PropTypes.string,
        status: PropTypes.bool,
        typecontract: PropTypes.string,
        daterequest: PropTypes.string,
        refnummer: PropTypes.string,
        hiringmanager: PropTypes.string,
        created_at: PropTypes.string,
        updated_at: PropTypes.string,
        tracking_code: PropTypes.string,
        candidate_id: PropTypes.number,
    }).isRequired,
};

export default PositionDetailsModal;