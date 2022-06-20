import React from 'react';

import PropTypes from 'prop-types';

import { Button, Box, Typography, Card, Chip, Avatar } from '@mui/material';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import MailRoundedIcon from '@mui/icons-material/MailRounded';
import AddCircleOutlineSharpIcon from '@mui/icons-material/AddCircleOutlineSharp';

import { LinkStyled } from './styles';

export const CardCandidate = ({ candidate, isStatus, isList }) => {
    return (
        <Card sx={{ p: 2, m: 1 }} elevation={3}>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: '0.5fr 2fr 0.3fr',
                    mb: 4,
                    alignItems: 'center',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        ml: isStatus ? 'none': '0.5rem',
                    }}
                >
                    <Avatar alt="Candidate Avatar" sx={{ mr: 2}}>
                        <AccountCircleRoundedIcon />
                    </Avatar>
                </Box>
                <Box>
                    <Typography variant="h3">
                        {candidate.name} {candidate.lastname}
                    </Typography>
                    <Typography variant="body2">{candidate.job_title}</Typography>
                </Box>
                {isStatus && !isList && (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection: 'column',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography variant="body2">Status</Typography>
                        <Chip label={candidate.recruitment_status.name} color="secondary" size="small" />
                    </Box>
                )}
                {!isStatus && (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection: 'column',
                        }}
                    >
                        <LinkStyled to={`/postulants/${candidate.recruitment_status.name}/${candidate.id}`}>
                            <AddCircleOutlineSharpIcon />
                        </LinkStyled>
                    </Box>
                )}
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        mx: !isStatus ? 'none' : '1rem',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            gap: 2,
                        }}
                    >
                        <MailRoundedIcon />
                        <Typography variant="body2" sx={{ py: 0.3 }}>
                            {candidate.email}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Card>
    );
};

CardCandidate.propTypes = {
    candidate: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        name: PropTypes.string.isRequired,
        lastname: PropTypes.string.isRequired,
        job_title: PropTypes.string,
        email: PropTypes.string.isRequired,
        country: PropTypes.string.isRequired,
        recruitment_status: PropTypes.shape({
            name: PropTypes.string,
        }).isRequired,
    }),
    isStatus: PropTypes.bool.isRequired,
    isList: PropTypes.bool.isRequired,
};

CardCandidate.defaultProps = {
    candidate: {
        job_title: '',
    },
};