/* eslint-disable no-use-before-define */
import React, { Fragment, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';

import { activeVacancies } from '../../api/Vacancies/activeVacancies';

import Positions from './Positions';
import FiltersUsers from '../FiltersUsers';

const useFetch = (callback) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);

    const fetchData = async (filters) => {
        setLoading(true);
        try {
            const listData = await callback(filters);
            setData(listData);
        } catch {
            setError('Wow! A wild error appeared.');
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, data, fetchData };
};

const PositionOverview = () => {
    const [filters, setFilters] = useState({
        functie: null,
        typecontract: null
    });
    const { data: listPositions, fetchData, ...rest } = useFetch(activeVacancies, filters);
    const { register, handleSubmit: handleSubmitSearch, formState: formStateSearch } = useForm();
    const { errors: errorsSearch, isDirty } = formStateSearch;

    const handleChange = (data) => {
        setFilters((prevState) => ({
            ...prevState,
            ...data,
        }));
    };

    useEffect(() => {
        fetchData(filters)
    }, [filters]);

    return (
        <Fragment>
            <Grid container sx={{ my: 3, display: 'flex', justifyContent: 'center' }}>
                <Grid item xs={12} sm={12} md={8}>
                    <Box
                        component="form"
                        onSubmit={handleSubmitSearch(handleChange)}
                        sx={{ display: 'flex', gap: '10px' }}
                    >
                        <TextField
                            {...register('name', {
                                minLength: {
                                    value: 3,
                                    message: 'Minimaal drie characters nodig.',
                                },
                            })}
                            error={!!errorsSearch?.name}
                            helperText={errorsSearch?.name?.message}
                            placeholder="Zoek vacature"
                            fullWidth
                        />
                        <Button variant="contained" color="secondary" size="large" type="submit" disabled={!isDirty}>
                            Zoek
                        </Button>
                    </Box>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={4}>
                    <FiltersUsers setFilters={setFilters} />
                </Grid>
                <Grid item xs={12} sm={12} md={8}>
                    <Positions {...rest} data={listPositions} />
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default PositionOverview;
