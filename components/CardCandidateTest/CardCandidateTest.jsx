import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Progress } from "react-sweet-progress";
import "./styleProgress.scss";
import { Box } from '@mui/system';
import MailRoundedIcon from "@mui/icons-material/MailRounded";
import { Button, Chip, Typography, Card } from '@mui/material';
import Divider from "@mui/material/Divider";
import { LinkStyled } from './styles';
import { Accordion } from "./Accordion";

export const CardCandidate = ({ candidate }) => {
    const getColor = (value) => {
        const hue = Math.round(value);
        return ["hsl(", hue, ", 50%, 50%)"].join("");
    };

    const [expanded, setExpanded] = useState(false);

    const toggleExpansion = () => {
        setExpanded((prevExpanded) => !prevExpanded);
    };

    return (
        <Card sx={{ p: 1, m: 1 }} elevation={5}>
            <div className='columns is-clickable' onClick={() => toggleExpansion()}>
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "0.5fr 2fr 0.3fr",
                        mb: 4,
                        alignItems: "center"
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            ml: "0.5rem"
                        }}
                    >
                        <div className='column is-one-fifth progress-bar-container is-inline-block'>
                            <Progress
                                theme={{
                                    active: {
                                        symbol: candidate.score + "%",
                                        trailColor: "white",
                                        color: getColor(candidate.score),
                                    },
                                    success: {
                                        symbol: candidate.score + "%",
                                        trailColor: "lime",
                                        color: "green",
                                    },
                                }}
                                type="circle"
                                percent={candidate.score}
                            />
                        </div>
                    </Box>
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: "0.5fr 2fr 0.3fr",
                            alignItems: "center"
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                ml: "0.5rem"
                            }}
                        />
                        <Box>
                            <Typography variant="h5">{candidate.personal_details ? candidate.personal_details?.name : ""}</Typography>
                            <Typography variant="body2">{candidate.education ? candidate.education[0] : ""}</Typography>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            mx: "1rem"
                        }}
                    >
                        <Typography variant="body2">Aangemeld op</Typography>
                        16-05-2022
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "flex-start",
                                gap: 2
                            }}
                        />
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "flex-start",
                                gap: 2
                            }}
                        />
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "flex-end",
                        justifyContent: "space-between"
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "column",
                            justifyContent: "center"
                        }}
                    >
                        <Typography variant="body2">Status</Typography>
                        <Chip label="Applied" color="secondary" size="small" />
                    </Box>
                    <Button size="large" onClick={() => window.location.assign(`${process.env.EVALUATIONS_URL}${candidate.personal_details.id}`)} variant="contained">
                        Details
                    </Button>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                        justifyContent: "center"
                    }}
                >
                    <Accordion expanded={expanded} sx={{ justifyContent: 'center' }} onClick={() => toggleExpansion()}>
                        <Typography variant="h6" component="h2">
                            Skills en vaardigheden
                        </Typography>
                        <Divider />
                        <Box 
                            sx={{
                            marginTop: "10px",
                            flexWrap: "wrap",
                            gap: "10px"
                        }}
                    >
                        {candidate.skills?.map((skill) => (
                            <Chip
                                label={skill}
                                key={skill}
                                variant="outlined"
                                color="secondary"
                            />
                        ))}
                    </Box>
                    <Typography variant="h6" component="h2" sx={{ marginTop: "20px" }}>
                        Werkervaring
                    </Typography>
                    <Divider />
                    <Box
                        sx={{
                            justifyContent: "flex-start",
                            gap: 2,
                            alignItems: "center"
                        }}
                    >
                        {candidate.experience?.map((exp) => (
                            <p>{exp}</p>
                        ))}
                    </Box>
                    <Typography variant="h6" component="h2" sx={{ marginTop: "20px" }}>
                        Diploma
                    </Typography>
                    <Divider />
                    <Box
                        sx={{
                            justifyContent: "flex-start",
                            gap: 2,
                            alignItems: "center"
                        }}
                    >
                        {candidate.domein ? candidate.domein[0] : ""}
                    </Box>
                    <Typography variant="h6" component="h2" sx={{ marginTop: "20px" }}>
                        Aangeleverde documenten
                    </Typography>
                    <Divider />
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop: "10px",
                            marginRight: "30px",
                            gap: 2
                        }}
                    >
                        <MailRoundedIcon />
                        <Typography variant="body2" sx={{ py: 0.3 }}>
                            CV
                        </Typography>
                        <Typography>{candidate.personal_details.email}</Typography>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            marginRight: "30px",
                            gap: 2
                        }}
                    >
                        <MailRoundedIcon />
                        <Typography variant="body2" sx={{ py: 0.3 }}>
                            Motivatiebrief
                        </Typography>
                    </Box>
                    </Accordion>
                </Box>
            </div>
        </Card>
    );
};

CardCandidate.propTypes = {
    candidate: PropTypes.shape({
        personal_details: PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
            name: PropTypes.string,
            email: PropTypes.string,
            mobile_number: PropTypes.string
        }).isRequired,
        education: PropTypes.string.isRequired,
        domein: PropTypes.string.isRequired,
        total_experience: PropTypes.number.isRequired,
        skills: PropTypes.arrayOf(PropTypes.string),
        score: PropTypes.number.isRequired,
        experience: PropTypes.number.isRequired,
    })
};

CardCandidate.defaultProps = {
    candidate: {
        score: 0,
    },
}; 