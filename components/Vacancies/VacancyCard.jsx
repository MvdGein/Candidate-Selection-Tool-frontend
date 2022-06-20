import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useAuth0 } from '@auth0/auth0-react';

import { Button, Card, FormControlLabel, Grid, Switch } from '@mui/material';
// import Box from '@mui/material/Box';

import { VacancyToInactive } from '../../api/Vacancies/VacancyToInactive';
import { VacancyToActive } from '../../api/Vacancies/VacancyToActive';
import { sendDescription } from '../../api/Vacancies';
import { Tag, Title, Body, LinkStyled } from './vacancyStyles';

export const VacancyCard = ({ title, checked, modality, applies, description, id }) => {
    const [status, setStatus] = useState(checked);
    const { isAuthenticated } = useAuth0();
    // Check de status of handle to 'flow' the applicant insights
    const handleStatus = () => {
        if (status) {
            VacancyToInactive(id);
            setStatus(false);
        } else {
            VacancyToActive(id);
            setStatus(true);
        }
    };    

    return (
        <Card sx={{ p: 2, boxShadow: 3, mt: 2 }}>
            <Grid container spacing={2}>
                <Grid item xs={8} sm={10} md={10}>
                    <Title>{title}</Title>
                </Grid>
                <Grid item xs={4} sm={2} md={2}>
                    <Tag>{applies} aangemeld </Tag>
                </Grid>
                <Grid item xs={12} md={2}>
                    {isAuthenticated && (
                        <FormControlLabel
                            sx={{ mr: 2 }}
                            control={<Switch checked={status} onChange={handleStatus} />}
                            label="Vacature actief"
                        />
                    )}
                </Grid>
                <Grid item xs={12} md={2}>
                    <Tag>{modality}</Tag>
                </Grid>
                <Grid item xs={12}>
                    <Body sx={{ m: 5 }}>{description}</Body>
                </Grid>
                {isAuthenticated && (
                    <Grid item xs={10.5}>
                        <Button type="button" variant="contained">
                            <LinkStyled color="#FFF" to={`/vacancies/${id}/edit`}>
                                Bewerk
                            </LinkStyled>
                        </Button>
                    </Grid>
                )}
                {isAuthenticated && (
                        <Grid item xs={1.5}>
                            <Button type="button" color="secondary" onClick={() => { sendDescription({description}); }} variant="outlined">
                                <LinkStyled color="rgb(25, 118, 210)" to={`/vacancies/${id}`}>
                                    Matchen
                                </LinkStyled>
                            </Button>
                        </Grid>
                )}
            </Grid>
        </Card>
    );
};

VacancyCard.propTypes = {
    title: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    // salary: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    modality: PropTypes.string.isRequired,
    applies: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    description: PropTypes.string.isRequired,
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};