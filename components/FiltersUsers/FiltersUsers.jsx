import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Skeleton from '@mui/material/Skeleton';
import { useForm, Controller } from 'react-hook-form';

import ModalCode from 'Components/ModalCode';
import { fetchListTypeContracts } from '../../api/Filters/fetchFilters';
import { fetchStatusOfApplicationVacancy } from '../../api/Vacancies/StatusOfApplicationVacancy';
import PositionDetailsModal from '../PositionDetailsModal';

const initialValues = {
    typecontract: null ?? '',
};

const FiltersUsers = ({ setFilters }) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [errorFilters, setErrorFilters] = useState(null);
    const [loadingFilters, setLoadingFilters] = useState(false);
    const [openDetails, setOpenDetails] = useState(false);
    const [offer, setOffer] = useState(false);
    const { handleSubmit, formState, control, getValues, reset } = useForm({
        defaultValues: initialValues,
    });
    // const { errors } = formState;
    const [dataFilters, setDataFilters] = useState({
        type_contract: [],
    });

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleOpenDetails = () => setOpenDetails(true);
    const handleCloseDetails = () => setOpenDetails(false);

    const onSubmit = async (data) => {
        const { code, lastname } = data;
        setLoading(true);
        try {
            const info = await fetchStatusOfApplicationVacancy({ code, lastname });
            setOffer(info);
            handleClose();
            handleOpenDetails();
            setError(null);
        } catch {
            setError('Er is geen vacature gevonden die overeenkomt met de geselecteerde filtermogelijkheden');
        } finally {
            setLoading(false);
        }
    };

    const getFilters = async () => {
        setLoadingFilters(true);
        try {
            const listTypeContracts = await fetchListTypeContracts();
            setDataFilters((prevState) => ({
                ...prevState,
                type_contract: listTypeContracts,
            }));
        } catch {
            setErrorFilters('Geen filters gevonden!');
        } finally {
            setLoadingFilters(false);
        }
    };

    useEffect(() => {
        getFilters();
    }, []);

    const onSubmitFilter = (data) => {
        const { company, ...rest } = data;
        const info = {
            ...rest,
            'company[]': company?.id,
        };
        setFilters((prevState) => ({
            ...prevState,
            ...info,
        }));
    };

    const handleReset = () => {
        reset(initialValues);
        setFilters(initialValues);
    };

    const disabledButton = () => {
        return Object.entries(getValues()).every(([, value]) => value === null || value === '');
    };

    return (
        <Fragment>
            <Card sx={{ p: 2, boxShadow: 3, mt: 2 }}>
                <Typography sx={{ mb: 2 }} variant="h2">
                    Filters
                </Typography>
                {errorFilters && (
                    <Typography sx={{ mb: 2 }} variant="p">
                        Geen filters gevonden!
                    </Typography>
                )}
                {loadingFilters && !errorFilters && (
                    <Typography variant="h2">
                        <Skeleton sx={{ height: 60 }} />
                        <Skeleton sx={{ height: 60 }} />
                        <Skeleton sx={{ height: 60 }} />
                    </Typography>
                )}
                {!loadingFilters && !errorFilters && (
                    <Box component="form" onSubmit={handleSubmit(onSubmitFilter)}>
                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <InputLabel>Type contract</InputLabel>
                            <Controller
                                name="typecontract"
                                control={control}
                                render={({ field }) => (
                                    <Select label="Type contract" {...field}>
                                        {dataFilters.type_contract?.map(({ id, name }) => (
                                            <MenuItem key={id} value={id}>
                                                {name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                )}
                            />
                        </FormControl>
                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <Controller
                                name="company"
                                control={control}
                                render={({ field: { value, ref, onChange, ...field } }) => (
                                    <Autocomplete
                                        {...field}
                                        onChange={(e, data) => onChange(data)}
                                        freeSolo
                                        disableClearable
                                        options={dataFilters.companies}
                                        getOptionLabel={(option) => option?.name || ''}
                                        renderInput={(params) => (
                                            <TextField inputRef={ref} {...params} label="Hiring Manager" />
                                        )}
                                    />
                                )}
                            />
                        </FormControl>
                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <Controller
                                name="job_title"
                                control={control}
                                render={({ field: { ref, onChange, ...field } }) => (
                                    <Autocomplete
                                        {...field}
                                        onChange={(e, data) => onChange(data)}
                                        freeSolo
                                        disableClearable
                                        options={dataFilters.locations?.map((location) => location.job_title)}
                                        renderInput={(params) => (
                                            <TextField inputRef={ref} {...params} label="Positie" />
                                        )}
                                    />
                                )}
                            />
                        </FormControl>
                        <Button
                            sx={{ mb: 2 }}
                            disabled={!formState.isDirty}
                            variant="contained"
                            color="secondary"
                            size="large"
                            fullWidth
                            type="submit"
                        >
                            Filter selectie
                        </Button>
                        <Button disabled={disabledButton()} fullWidth onClick={handleReset}>
                            Reset filters
                        </Button>
                    </Box>
                )}
            </Card>
            <Button sx={{ mt: 3 }} onClick={handleOpen} fullWidth variant="outlined">
                Status van eerdere selectie
            </Button>
            <ModalCode open={open} handleClose={handleClose} onSubmit={onSubmit} loading={loading} error={error} />
            {openDetails && (
                <PositionDetailsModal showDetail={openDetails} handleOpenClose={handleCloseDetails} vacancyInfo={offer} />
            )}
        </Fragment>
    );
};

FiltersUsers.propTypes = {
    setFilters: PropTypes.func.isRequired,
};

export default FiltersUsers;