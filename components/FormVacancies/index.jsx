import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';

import { initialValues } from 'Constants/formVacancies';
import { InputText } from 'Components/Commons/InputText';
import { Select } from 'Components/Commons/Select';
import { Tags } from 'Components/Commons/Tags';

import { fetchAllSkills } from '../../api/skills';
import { fetchAllTypesOfContract } from '../../api/TypeOfContracts';

export const FormVacancies = ({ mainButtonText, defaultValues, onSubmit }) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [skillsList, setSkills] = useState([]);
    const [typesOfContractList, setTypesOfContract] = useState([]);
    const { user } = useAuth0();
    const navigate = useNavigate();

    const { handleSubmit, control, reset } = useForm({ defaultValues: initialValues });

    useEffect(() => {
        Promise.all([fetchAllSkills(), fetchAllTypesOfContract()])
            .then(([skills, typesContract]) => {
                setSkills(skills.data);
                setTypesOfContract(typesContract.data);
            })
            .catch(() => {
                setMessage('Er ontstond een fout bij het ovpragen van de data');
                setOpen(true);
            });
    }, []);
    
    useEffect(() => {
        reset(defaultValues);
    }, [reset, defaultValues]);

    const handleForm = (data) => {
        onSubmit({ user_id: user.sub, ...data })
            .then(navigate('/vacancies'))
            .catch(() => {
                setMessage('Een fout is ontstaan bij het aanmaken van de vacature');
                setOpen(true);
            });
    };

    return (
        <React.Fragment>
            <Box component="form" onSubmit={handleSubmit(handleForm)}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <InputText
                            name="functie"
                            label="Vacaturenaam"
                            helperText="Gelieve de vacaturenaam in te voeren"
                            control={control}
                            autofocus
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <InputText
                            name="refnummer"
                            label="Referentienummer"
                            helperText="Please enter the reference number of the vacancy"
                            control={control}
                            autofocus
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Select
                            name="type-work"
                            label="Type contract"
                            helperText="Please select an option"
                            control={control}
                            options={typesOfContractList}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <InputText
                            name="hiringmanager"
                            label="Hiring Manager"
                            helperText="Please enter the hiring manager"
                            control={control}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <InputText
                            name="description"
                            label="Functieomschrijving"
                            rows={4}
                            multiline
                            helperText="Please enter the description of the vacancy"
                            control={control}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Tags
                            name="skills"
                            label="Skills en vaardigheden"
                            helperText="Please select the skills and abilities"
                            control={control}
                            options={skillsList}
                            required
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Box sx={{ display: 'flex', justifyContent: 'end', gap: '20px' }}>
                            <Link to="/vacancies">
                                <Button variant="contained" color="error">
                                    Annuleer
                                </Button>
                            </Link>
                            <Button variant="contained" color="primary" type="submit">
                                {mainButtonText}
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert severity="error">
                    <AlertTitle>Oeps! Er heeft een error plaatsgevonden!</AlertTitle>
                    {message}
                </Alert>
            </Snackbar>
        </React.Fragment>
    );
};

FormVacancies.propTypes = {
    mainButtonText: PropTypes.string.isRequired,
    defaultValues: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        functie: PropTypes.string,
        refnummer: PropTypes.string,
        description: PropTypes.string,
        typecontract: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        hiringmanager: PropTypes.string,
        'type-work': PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        skills: PropTypes.arrayOf(PropTypes.string),
    }),
    onSubmit: PropTypes.func.isRequired,
};

FormVacancies.defaultProps = {
    defaultValues: initialValues,
};