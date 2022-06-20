import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import { Typography, Card } from '@mui/material';
import { faCircle, faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { LoadingPositionDetails } from 'Components/PositionDetails/PositionDetailsSkeleton';

export const PositionDetails = ({ positionInfo }) => {
    const { functie, description, status, refnummer, daterequest, typecontract, skills, hiringmanager } = positionInfo;
    const data = Object.keys(positionInfo);

    return (
        <Card elevation={3}>
            {data.length > 0 ? (
                <Paper sx={{ p: 2 }}>
                    <Typography variant="h3" mb={2}>
                        {functie}
                    </Typography>
                    <FontAwesomeIcon
                        icon={faCheckCircle}
                        size="xs"
                        className="is-clickable"
                    />
                    <FontAwesomeIcon
                        icon={faCircle}
                        size="xs"
                        className="is-clickable"
                    />
                    <Divider />
                    <Typography variant="h3" my={2}>
                        Functieomschrijving
                    </Typography>
                    <Typography variant="body2" mb={2}>
                        {description}
                    </Typography>
                    <Typography variant="h3" mb={1}>
                        Status
                    </Typography>
                    <Chip label={status ? 'Actief' : 'Inactief'} color="secondary" sx={{ mb: 2 }} />
                    <Divider />
                    <Typography variant="h3" mt={3} mb={1}>
                        Specificaties
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }} mb={1}>
                        <Typography variant="body2">Referentienummer</Typography>
                        <Typography variant="body2">{refnummer}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }} mb={1}>
                        <Typography variant="body2">Publicatiedatum</Typography>
                        <Typography variant="body2">{daterequest}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }} mb={1}>
                        <Typography variant="body2">Hiring Manager</Typography>
                        <Typography variant="body2">{hiringmanager}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }} mb={1}>
                        <Typography variant="body2">Type contract</Typography>
                        <Typography variant="body2">{typecontract}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }} mb={1}>
                        <Typography variant="body2">Skills</Typography>
                        {skills !== undefined ? (
                            <Box>
                                {skills?.map((skill) => {
                                    return (
                                        <Chip
                                            sx={{ mb: 0.2, ml: 0.2 }}
                                            label={skill}
                                            size="small"
                                            variant="outlined"
                                            color="secondary"
                                            key={uuidv4()}
                                        />
                                    );
                                })}
                            </Box>
                        ) : (
                            <Box />
                        )}
                    </Box>
                </Paper>
            ) : (
                <LoadingPositionDetails />
            )}
        </Card>
    );
};

PositionDetails.propTypes = {
    positionInfo: PropTypes.shape({
        id: PropTypes.number,
        functie: PropTypes.string,
        description: PropTypes.string,
        status: PropTypes.bool,
        daterequest: PropTypes.string,
        typecontract: PropTypes.string,
        refnummer: PropTypes.string,
        skills: PropTypes.string,
        hiringmanager: PropTypes.number,
    }).isRequired,
};